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
        case 'config-dhcp': return `${h}(dhcp-config)#`;
        case 'config-ext-nacl': return `${h}(config-ext-nacl)#`;
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

  // ── Lab Base Class (ES5 — labs inherit via .call() + Object.create) ──
  function LabBase(config) {
    this.devices = {};
    this.activeDeviceName = null;
    this.objectives = config.objectives || [];
    this.completedObjectives = new Set();
    this.commandLog = [];
    this.hintsRemaining = config.hintsAvailable || 3;
    this.totalHints = config.hintsAvailable || 3;
    this.terminal = null;
    this.onObjectiveComplete = config.onObjectiveComplete || function(){};
    this.onTopologyUpdate = config.onTopologyUpdate || function(){};
    this.commandHandlers = {};
    this.tabCompletions = {};
  }

  Object.defineProperty(LabBase.prototype, 'activeDevice', {
    get: function() { return this.devices[this.activeDeviceName]; }
  });

  LabBase.prototype.addDevice = function(name, type, config) {
    this.devices[name] = new Device(name, type, config);
    if (!this.activeDeviceName) this.activeDeviceName = name;
  };

  LabBase.prototype.switchDevice = function(name) {
    if (this.devices[name]) {
      this.activeDeviceName = name;
      this.devices[name].mode = 'user';
      return '\n--- Connected to ' + this.devices[name].hostname + ' ---\n';
    }
    return '% Unknown device: ' + name;
  };

  LabBase.prototype.initTerminal = function(el) {
    this.terminal = new Terminal(el, this);
    return this.terminal;
  };

  // Cisco IOS shorthand expansion. Real IOS auto-completes unique prefixes.
  // Map common abbreviations to full tokens before parsing.
  LabBase.prototype.expandShorthand = function(raw) {
    var TOKEN_MAP = {
      'sh': 'show', 'sho': 'show',
      'conf': 'configure', 'config': 'configure',
      'en': 'enable',
      'int': 'interface', 'inter': 'interface',
      'br': 'brief', 'bri': 'brief',
      'desc': 'description',
      'no': 'no',
      'run': 'running-config', 'runn': 'running-config',
      'start': 'startup-config',
      'ver': 'version',
      'neigh': 'neighbors', 'neighb': 'neighbors',
      'sum': 'summary', 'summ': 'summary',
    };
    var parts = raw.split(/\s+/);
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].toLowerCase();
      out.push(TOKEN_MAP[p] || parts[i]);
    }
    return out.join(' ');
  };

  // Default show command outputs that work in every lab. Per-lab extraCmds
  // can still override by returning a value first.
  LabBase.prototype.defaultShowCmd = function(dev, raw, lower) {
    if (!lower.startsWith('show ')) return undefined;
    // show running-config (basic device info)
    if (lower === 'show running-config' || lower === 'show run') {
      var lines = ['Building configuration...', '', 'Current configuration:', '!', 'hostname ' + dev.hostname, '!'];
      Object.keys(dev.interfaces).forEach(function(name) {
        var i = dev.interfaces[name];
        lines.push('interface ' + name);
        if (i.ip) lines.push(' ip address ' + i.ip + ' 255.255.255.0');
        if (i.mode === 'access' && i.accessVlan) lines.push(' switchport mode access\n switchport access vlan ' + i.accessVlan);
        if (i.mode === 'trunk') lines.push(' switchport mode trunk');
        lines.push(i.up ? ' no shutdown' : ' shutdown');
        lines.push('!');
      });
      lines.push('end');
      return lines.join('\n');
    }
    // show ip interface brief
    if (lower === 'show ip interface brief') {
      var rows = ['Interface                  IP-Address      OK? Method Status                Protocol'];
      var names = Object.keys(dev.interfaces);
      if (names.length === 0) {
        rows.push('GigabitEthernet0/0         unassigned      YES unset  administratively down down');
        rows.push('GigabitEthernet0/1         unassigned      YES unset  administratively down down');
      } else {
        names.forEach(function(n) {
          var i = dev.interfaces[n];
          var ip = (i.ip || 'unassigned').padEnd(15);
          var status = i.up ? 'up                    ' : 'administratively down  ';
          var proto = i.up ? 'up' : 'down';
          rows.push(n.padEnd(26) + ' ' + ip + ' YES manual ' + status + proto);
        });
      }
      return rows.join('\n');
    }
    // show ip route (skeleton — labs with routing add detail via extraCmds)
    if (lower === 'show ip route') {
      var rt = ['Codes: L - local, C - connected, S - static, O - OSPF, D - EIGRP', '       i - IS-IS, B - BGP', ''];
      Object.keys(dev.interfaces).forEach(function(n) {
        var i = dev.interfaces[n];
        if (i.ip && i.up) rt.push('C    ' + i.ip + '/24 is directly connected, ' + n);
      });
      (dev.routes || []).forEach(function(r) {
        rt.push('S    ' + r.dest + ' [1/0] via ' + r.nextHop);
      });
      return rt.join('\n');
    }
    // show vlan brief
    if (lower === 'show vlan brief' || lower === 'show vlan') {
      var v = ['VLAN Name                             Status    Ports', '---- -------------------------------- --------- -------------------------------'];
      Object.keys(dev.vlans).forEach(function(id) {
        var vl = dev.vlans[id];
        v.push(String(id).padEnd(4) + ' ' + (vl.name || '').padEnd(32) + ' active    ' + (vl.ports || []).join(', '));
      });
      return v.join('\n');
    }
    // show interfaces (terse)
    if (lower === 'show interfaces' || lower === 'show interfaces status') {
      var s = ['Port      Name               Status       Vlan       Duplex  Speed Type'];
      Object.keys(dev.interfaces).forEach(function(n) {
        var i = dev.interfaces[n];
        s.push(n.replace('GigabitEthernet', 'Gi').replace('FastEthernet', 'Fa').padEnd(9) + ' ' + ''.padEnd(18) + ' ' + (i.up ? 'connected   ' : 'notconnect  ') + ' ' + String(i.accessVlan || (i.mode === 'trunk' ? 'trunk' : '1')).padEnd(10) + ' auto    auto   10/100/1000');
      });
      return s.join('\n');
    }
    // show version (minimal)
    if (lower === 'show version') {
      return 'Cisco IOS Software, Version 15.7(3)M3\n' + dev.hostname + ' uptime is 0 minutes\nSystem image file is "flash0:/c2900-universalk9-mz.SPA.157-3.M3.bin"';
    }
    // show cdp neighbors (empty unless lab populates)
    if (lower === 'show cdp neighbors' || lower === 'show cdp neighbors detail') {
      return 'Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge\n                  S - Switch, H - Host, I - IGMP, r - Repeater\n\nDevice ID    Local Intrfce   Holdtme    Capability  Platform  Port ID\n(no entries — lab does not model neighbors)';
    }
    return undefined;
  };

  LabBase.prototype.processCommand = function(cmd) {
    if (!cmd || !cmd.trim()) return '';

    var raw = cmd.trim();
    // Expand Cisco IOS shorthand (sh ip int br → show ip interface brief)
    raw = this.expandShorthand(raw);
    var lower = raw.toLowerCase();
    this.commandLog.push({ device: this.activeDeviceName, cmd: raw, time: Date.now() });

    var dev = this.activeDevice;

    // Support `do <cmd>` from any config mode (real IOS behavior)
    if (lower.startsWith('do ') && dev.mode !== 'user' && dev.mode !== 'priv') {
      var doRaw = raw.substring(3).trim();
      var doLower = doRaw.toLowerCase();
      // Try lab handler then default show
      var doResult = this.handleCommand(dev, doRaw, doLower);
      if (doResult !== undefined) return doResult;
      var doShow = this.defaultShowCmd(dev, doRaw, doLower);
      if (doShow !== undefined) return doShow;
      return '% Invalid input detected at \'^\' marker.\n% Unrecognized command: ' + doRaw.split(' ')[0];
    }

    // Global commands
    if (lower.startsWith('connect ') || lower.startsWith('switch ')) {
      var target = raw.split(/\s+/)[1];
      return this.switchDevice(target);
    }

    // Mode navigation
    if (lower === 'enable' || lower === 'en') {
      if (dev.mode === 'user') { dev.mode = 'priv'; }
      this.checkObjectives();
      return '';
    }
    if (lower === 'configure terminal' || lower === 'conf t') {
      if (dev.mode === 'priv') { dev.mode = 'config'; this.checkObjectives(); return 'Enter configuration commands, one per line. End with CNTL/Z.'; }
      return '% Invalid input detected';
    }
    if (lower === 'exit') {
      if (dev.mode === 'config-if' || dev.mode === 'config-subif') { dev.mode = 'config'; dev.currentInterface = null; this.checkObjectives(); return ''; }
      if (dev.mode === 'config-router') { dev.mode = 'config'; this.checkObjectives(); return ''; }
      if (dev.mode === 'config-line') { dev.mode = 'config'; this.checkObjectives(); return ''; }
      if (dev.mode === 'config-vlan') { dev.mode = 'config'; this.checkObjectives(); return ''; }
      if (dev.mode === 'config-dhcp') { dev.mode = 'config'; this.checkObjectives(); return ''; }
      if (dev.mode === 'config-ext-nacl') { dev.mode = 'config'; this.checkObjectives(); return ''; }
      if (dev.mode === 'config') { dev.mode = 'priv'; this.checkObjectives(); return ''; }
      if (dev.mode === 'priv') { dev.mode = 'user'; this.checkObjectives(); return ''; }
      return '';
    }
    if (lower === 'end') {
      dev.mode = 'priv';
      dev.currentInterface = null;
      this.checkObjectives();
      return '';
    }
    if (lower === 'disable') {
      dev.mode = 'user';
      this.checkObjectives();
      return '';
    }

    // Interface selection
    var ifMatch = raw.match(/^interface\s+(.+)/i);
    if (ifMatch && (dev.mode === 'config' || dev.mode === 'config-if' || dev.mode === 'config-subif')) {
      var ifName = this.normalizeInterface(ifMatch[1].trim());
      dev.currentInterface = ifName;
      if (ifName.includes('.')) {
        dev.mode = 'config-subif';
        if (!dev.interfaces[ifName]) dev.interfaces[ifName] = { subinterface: true, up: false };
      } else {
        dev.mode = 'config-if';
        if (!dev.interfaces[ifName]) dev.interfaces[ifName] = { up: true };
      }
      this.checkObjectives();
      return '';
    }

    // VLAN creation
    var vlanMatch = raw.match(/^vlan\s+(\d+)/i);
    if (vlanMatch && dev.mode === 'config') {
      var vid = parseInt(vlanMatch[1]);
      if (!dev.vlans[vid]) dev.vlans[vid] = { name: 'VLAN' + vid, ports: [] };
      dev.mode = 'config-vlan';
      dev.custom._currentVlan = vid;
      this.checkObjectives();
      this.onTopologyUpdate();
      return '';
    }

    // VLAN name
    if (lower.startsWith('name ') && dev.mode === 'config-vlan') {
      var name = raw.substring(5).trim();
      var cvid = dev.custom._currentVlan;
      if (cvid && dev.vlans[cvid]) dev.vlans[cvid].name = name;
      this.checkObjectives();
      return '';
    }

    // Router OSPF
    var ospfMatch = raw.match(/^router\s+ospf\s+(\d+)/i);
    if (ospfMatch && dev.mode === 'config') {
      var pid = parseInt(ospfMatch[1]);
      if (!dev.ospf) dev.ospf = { processId: pid, networks: [], routerId: null };
      dev.ospf.processId = pid;
      dev.mode = 'config-router';
      this.checkObjectives();
      return '';
    }

    // Delegate to lab-specific handler
    var result = this.handleCommand(dev, raw, lower);
    if (result !== undefined) return result;

    // Default show commands (work in any lab when in priv/user)
    if ((dev.mode === 'priv' || dev.mode === 'user') && lower.startsWith('show ')) {
      var defShow = this.defaultShowCmd(dev, raw, lower);
      if (defShow !== undefined) return defShow;
    }
    // From config modes, suggest `do show ...`
    if (lower.startsWith('show ') && dev.mode !== 'priv' && dev.mode !== 'user') {
      return '% Invalid input detected at \'^\' marker.\n  (hint: use `do show ...` to run a show command from config mode, or type `end` to return to privileged EXEC)';
    }

    // Unknown command
    if (dev.mode === 'user') {
      return '% Unrecognized command "' + raw.split(' ')[0] + '"';
    }
    return '% Invalid input detected at \'^\' marker.\n% Unrecognized command: ' + raw.split(' ')[0];
  };

  // Override in subclass
  LabBase.prototype.handleCommand = function() { return undefined; };
  LabBase.prototype.checkObjectives = function() {};
  LabBase.prototype.tabComplete = function() { return null; };

  LabBase.prototype.normalizeInterface = function(name) {
    return name
      .replace(/^gi(?:gabitethernet)?/i, 'GigabitEthernet')
      .replace(/^fa(?:stethernet)?/i, 'FastEthernet')
      .replace(/^lo(?:opback)?/i, 'Loopback')
      .replace(/^vlan\s*/i, 'Vlan')
      .replace(/^(?:po|port-channel)\s*/i, 'Port-channel');
  };

  LabBase.prototype.completeObjective = function(idx) {
    if (this.completedObjectives.has(idx)) return;
    this.completedObjectives.add(idx);
    this.onObjectiveComplete(idx, this.objectives[idx]);
  };

  LabBase.prototype.getHint = function(objIdx) {
    if (this.hintsRemaining <= 0) return null;
    if (objIdx >= this.objectives.length) return null;
    this.hintsRemaining--;
    return this.objectives[objIdx].hint || 'No hint available.';
  };

  LabBase.prototype.isComplete = function() {
    return this.completedObjectives.size >= this.objectives.length;
  };

  LabBase.prototype.getProgress = function() {
    return {
      completed: this.completedObjectives.size,
      total: this.objectives.length,
      pct: Math.round((this.completedObjectives.size / this.objectives.length) * 100)
    };
  };

  // ── Expose ──────────────────────────────────────────────
  window.Lab = {
    Device,
    Terminal,
    LabBase
  };

})();
