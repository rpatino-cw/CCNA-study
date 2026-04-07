/**
 * lab-engine.js — Cisco IOS CLI Simulator for hands-on labs.
 * Attaches to window.Lab
 *
 * Provides: terminal UI, command parsing, device state tracking,
 * objective validation, and hint system.
 */
(function () {

  // ── Device Model ────────────────────────────────────────
  class Device {
    constructor(name, type, config = {}) {
      this.name = name;
      this.type = type; // 'router' | 'switch'
      this.hostname = config.hostname || name;
      this.mode = 'user'; // user, priv, config, config-if, config-router, config-line, config-vlan, config-subif
      this.currentInterface = null;
      this.vlans = config.vlans || { 1: { name: 'default', ports: [] } };
      this.interfaces = config.interfaces || {};
      this.trunks = {};
      this.ospf = config.ospf || null;
      this.acls = config.acls || {};
      this.portSecurity = {};
      this.nat = { inside: [], outside: [], overload: false, acl: null };
      this.dhcpSnooping = false;
      this.ipv6Routing = false;
      this.hsrp = {};
      this.routes = config.routes || [];
      this.runningConfig = [];
      this.custom = config.custom || {};
    }

    prompt() {
      const h = this.hostname;
      switch (this.mode) {
        case 'user': return `${h}>`;
        case 'priv': return `${h}#`;
        case 'config': return `${h}(config)#`;
        case 'config-if': return `${h}(config-if)#`;
        case 'config-subif': return `${h}(config-subif)#`;
        case 'config-router': return `${h}(config-router)#`;
        case 'config-line': return `${h}(config-line)#`;
        case 'config-vlan': return `${h}(config-vlan)#`;
        default: return `${h}#`;
      }
    }
  }

  // ── Terminal UI ─────────────────────────────────────────
  class Terminal {
    constructor(el, lab) {
      this.el = el;
      this.lab = lab;
      this.history = [];
      this.historyIdx = -1;
      this.buffer = '';
      this.outputEl = el.querySelector('.term-output');
      this.inputEl = el.querySelector('.term-input');
      this.cursorEl = el.querySelector('.term-cursor');
      this.promptEl = el.querySelector('.term-prompt');

      this.inputEl.addEventListener('keydown', (e) => this.handleKey(e));
      this.inputEl.focus();
      el.addEventListener('click', () => this.inputEl.focus());

      this.updatePrompt();
    }

    updatePrompt() {
      this.promptEl.textContent = this.lab.activeDevice.prompt() + ' ';
    }

    handleKey(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = this.inputEl.textContent.trim();
        this.inputEl.textContent = '';
        this.executeCommand(cmd);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0) {
          if (this.historyIdx < this.history.length - 1) this.historyIdx++;
          this.inputEl.textContent = this.history[this.history.length - 1 - this.historyIdx];
          this.placeCursorEnd();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIdx > 0) {
          this.historyIdx--;
          this.inputEl.textContent = this.history[this.history.length - 1 - this.historyIdx];
        } else {
          this.historyIdx = -1;
          this.inputEl.textContent = '';
        }
        this.placeCursorEnd();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        // Basic tab completion
        const partial = this.inputEl.textContent.trim();
        const completed = this.lab.tabComplete(partial);
        if (completed) {
          this.inputEl.textContent = completed;
          this.placeCursorEnd();
        }
      }
    }

    placeCursorEnd() {
      const range = document.createRange();
      const sel = window.getSelection();
      if (this.inputEl.childNodes.length > 0) {
        range.setStartAfter(this.inputEl.lastChild);
      } else {
        range.setStart(this.inputEl, 0);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    executeCommand(cmd) {
      // Echo the command
      this.writeLine(this.lab.activeDevice.prompt() + ' ' + cmd, 'cmd');

      if (cmd) {
        this.history.push(cmd);
        this.historyIdx = -1;
      }

      // Process through lab
      const output = this.lab.processCommand(cmd);
      if (output) {
        for (const line of output.split('\n')) {
          this.writeLine(line);
        }
      }

      this.updatePrompt();
      this.scrollToBottom();
    }

    writeLine(text, cls = '') {
      const div = document.createElement('div');
      div.className = 'term-line' + (cls ? ' ' + cls : '');
      div.textContent = text;
      this.outputEl.appendChild(div);
    }

    writeHTML(html) {
      const div = document.createElement('div');
      div.className = 'term-line';
      div.innerHTML = html;
      this.outputEl.appendChild(div);
    }

    clear() {
      this.outputEl.innerHTML = '';
    }

    scrollToBottom() {
      this.el.scrollTop = this.el.scrollHeight;
    }

    focus() {
      this.inputEl.focus();
    }
  }

  // ── Lab Base Class ──────────────────────────────────────
  class LabBase {
    constructor(config) {
      this.devices = {};
      this.activeDeviceName = null;
      this.objectives = config.objectives || [];
      this.completedObjectives = new Set();
      this.commandLog = [];
      this.hintsRemaining = config.hintsAvailable || 3;
      this.totalHints = config.hintsAvailable || 3;
      this.terminal = null;
      this.onObjectiveComplete = config.onObjectiveComplete || (() => {});
      this.onTopologyUpdate = config.onTopologyUpdate || (() => {});
      this.commandHandlers = {};
      this.tabCompletions = {};
    }

    get activeDevice() {
      return this.devices[this.activeDeviceName];
    }

    addDevice(name, type, config) {
      this.devices[name] = new Device(name, type, config);
      if (!this.activeDeviceName) this.activeDeviceName = name;
    }

    switchDevice(name) {
      if (this.devices[name]) {
        this.activeDeviceName = name;
        this.devices[name].mode = 'user';
        return `\n--- Connected to ${this.devices[name].hostname} ---\n`;
      }
      return `% Unknown device: ${name}`;
    }

    initTerminal(el) {
      this.terminal = new Terminal(el, this);
      return this.terminal;
    }

    processCommand(cmd) {
      if (!cmd || !cmd.trim()) return '';

      const raw = cmd.trim();
      const lower = raw.toLowerCase();
      this.commandLog.push({ device: this.activeDeviceName, cmd: raw, time: Date.now() });

      const dev = this.activeDevice;

      // Global commands
      if (lower.startsWith('connect ') || lower.startsWith('switch ')) {
        const target = raw.split(/\s+/)[1];
        return this.switchDevice(target);
      }

      // Mode navigation
      if (lower === 'enable' || lower === 'en') {
        if (dev.mode === 'user') { dev.mode = 'priv'; return ''; }
        return '';
      }
      if (lower === 'configure terminal' || lower === 'conf t') {
        if (dev.mode === 'priv') { dev.mode = 'config'; return 'Enter configuration commands, one per line. End with CNTL/Z.'; }
        return '% Invalid input detected';
      }
      if (lower === 'exit') {
        if (dev.mode === 'config-if' || dev.mode === 'config-subif') { dev.mode = 'config'; dev.currentInterface = null; return ''; }
        if (dev.mode === 'config-router') { dev.mode = 'config'; return ''; }
        if (dev.mode === 'config-line') { dev.mode = 'config'; return ''; }
        if (dev.mode === 'config-vlan') { dev.mode = 'config'; return ''; }
        if (dev.mode === 'config') { dev.mode = 'priv'; return ''; }
        if (dev.mode === 'priv') { dev.mode = 'user'; return ''; }
        return '';
      }
      if (lower === 'end') {
        dev.mode = 'priv';
        dev.currentInterface = null;
        return '';
      }
      if (lower === 'disable') {
        dev.mode = 'user';
        return '';
      }

      // Interface selection
      const ifMatch = raw.match(/^interface\s+(.+)/i);
      if (ifMatch && (dev.mode === 'config' || dev.mode === 'config-if' || dev.mode === 'config-subif')) {
        const ifName = this.normalizeInterface(ifMatch[1].trim());
        dev.currentInterface = ifName;
        if (ifName.includes('.')) {
          dev.mode = 'config-subif';
          if (!dev.interfaces[ifName]) dev.interfaces[ifName] = { subinterface: true, up: false };
        } else {
          dev.mode = 'config-if';
          if (!dev.interfaces[ifName]) dev.interfaces[ifName] = { up: true };
        }
        return '';
      }

      // VLAN creation
      const vlanMatch = raw.match(/^vlan\s+(\d+)/i);
      if (vlanMatch && dev.mode === 'config') {
        const vid = parseInt(vlanMatch[1]);
        if (!dev.vlans[vid]) dev.vlans[vid] = { name: `VLAN${vid}`, ports: [] };
        dev.mode = 'config-vlan';
        dev.custom._currentVlan = vid;
        this.checkObjectives();
        this.onTopologyUpdate();
        return '';
      }

      // VLAN name
      if (lower.startsWith('name ') && dev.mode === 'config-vlan') {
        const name = raw.substring(5).trim();
        const vid = dev.custom._currentVlan;
        if (vid && dev.vlans[vid]) dev.vlans[vid].name = name;
        this.checkObjectives();
        return '';
      }

      // Router OSPF
      const ospfMatch = raw.match(/^router\s+ospf\s+(\d+)/i);
      if (ospfMatch && dev.mode === 'config') {
        const pid = parseInt(ospfMatch[1]);
        if (!dev.ospf) dev.ospf = { processId: pid, networks: [], routerId: null };
        dev.ospf.processId = pid;
        dev.mode = 'config-router';
        this.checkObjectives();
        return '';
      }

      // Delegate to lab-specific handler
      const result = this.handleCommand(dev, raw, lower);
      if (result !== undefined) return result;

      // Unknown command
      if (dev.mode === 'user') {
        return `% Unrecognized command "${raw.split(' ')[0]}"`;
      }
      return `% Invalid input detected at '^' marker.\n% Unrecognized command: ${raw.split(' ')[0]}`;
    }

    // Override in subclass
    handleCommand(dev, raw, lower) { return undefined; }
    checkObjectives() {}
    tabComplete(partial) { return null; }

    normalizeInterface(name) {
      return name
        .replace(/^gi(?:gabitethernet)?/i, 'GigabitEthernet')
        .replace(/^fa(?:stethernet)?/i, 'FastEthernet')
        .replace(/^lo(?:opback)?/i, 'Loopback')
        .replace(/^vlan\s*/i, 'Vlan');
    }

    completeObjective(idx) {
      if (this.completedObjectives.has(idx)) return;
      this.completedObjectives.add(idx);
      this.onObjectiveComplete(idx, this.objectives[idx]);
    }

    getHint(objIdx) {
      if (this.hintsRemaining <= 0) return null;
      if (objIdx >= this.objectives.length) return null;
      this.hintsRemaining--;
      return this.objectives[objIdx].hint || 'No hint available.';
    }

    isComplete() {
      return this.completedObjectives.size >= this.objectives.length;
    }

    getProgress() {
      return {
        completed: this.completedObjectives.size,
        total: this.objectives.length,
        pct: Math.round((this.completedObjectives.size / this.objectives.length) * 100)
      };
    }
  }

  // ── Expose ──────────────────────────────────────────────
  window.Lab = {
    Device,
    Terminal,
    LabBase
  };

})();
