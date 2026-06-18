/**
 * lab-engine.js — Cisco IOS CLI Simulator for hands-on labs.
 * Attaches to window.Lab
 *
 * Provides: terminal UI, command parsing, device state tracking,
 * objective validation, and hint system.
 *
 * Added (2026-06-18):
 *   - Context help: `?`, `word?`, `command ?` in processCommand
 *   - Proper abbreviation errors: invalid-input caret, ambiguous, incomplete
 *   - Additional defaultShowCmd entries: ospf database, bgp summary, bgp table,
 *     eigrp neighbors, eigrp topology, etherchannel summary, vrrp brief
 *   - Ctrl-Z (go to priv), Ctrl-C (abort/up), Ctrl-L (clear), Ctrl-U (clear line)
 *   - Unknown EXEC input prints invalid-input caret instead of silence
 */
(function () {

  // ── Context-help tables (IOS-CLI-REFERENCE.md §4) ──────────
  // Keys are the bare command/keyword strings; values are the one-line description
  // shown by `?`.  Only the modes the engine actually handles are covered.
  var HELP = {
    user: [
      'connect         Open a terminal connection',
      'disable         Turn off privileged commands',
      'disconnect      Disconnect an existing network connection',
      'enable          Turn on privileged commands',
      'exit            Exit from the EXEC',
      'logout          Exit from the EXEC',
      'ping            Send echo messages',
      'show            Show running system information',
      'ssh             Open a secure shell client connection',
      'telnet          Open a telnet connection',
      'terminal        Set terminal line parameters',
      'traceroute      Trace route to destination',
    ],
    priv: [
      'clear           Reset functions',
      'clock           Manage the system clock',
      'configure       Enter configuration mode',
      'connect         Open a terminal connection',
      'copy            Copy from one file to another',
      'debug           Debugging functions',
      'delete          Delete a file',
      'dir             List files on a filesystem',
      'disable         Turn off privileged commands',
      'disconnect      Disconnect an existing network connection',
      'enable          Turn on privileged commands',
      'erase           Erase a filesystem',
      'exit            Exit from the EXEC',
      'logout          Exit from the EXEC',
      'no              Negate a command or set its defaults',
      'ping            Send echo messages',
      'reload          Halt and perform a cold restart',
      'show            Show running system information',
      'ssh             Open a secure shell client connection',
      'telnet          Open a telnet connection',
      'terminal        Set terminal line parameters',
      'traceroute      Trace route to destination',
      'undebug         Disable debugging functions',
      'write           Write running configuration to memory or network',
    ],
    config: [
      'aaa             Authentication, Authorization and Accounting',
      'access-list     Add an access list entry',
      'banner          Define a login banner',
      'cdp             Global CDP configuration subcommands',
      'class-map       Configure QoS Class Map',
      'control-plane   Configure control-plane',
      'crypto          Encryption module',
      'enable          Modify enable password parameters',
      'hostname        Set system\'s network name',
      'interface       Select an interface to configure',
      'ip              Global IP configuration subcommands',
      'ipv6            Global IPv6 configuration subcommands',
      'line            Configure a terminal line',
      'logging         Modify message logging facilities',
      'ntp             Configure NTP',
      'policy-map      Configure QoS Policy Map',
      'router          Enable a routing process',
      'service         Modify use of network based services',
      'snmp-server     Modify SNMP parameters',
      'spanning-tree   Spanning Tree Subsystem',
      'username        Establish User Name Authentication',
      'vlan            Vlan commands',
      'vrf             Configure VRF definitions',
      '<cr>',
    ],
    show: [
      'access-lists    List access lists',
      'arp             ARP table',
      'bgp             BGP information',
      'cdp             CDP information',
      'clock           Display the system clock',
      'controllers     Interface controllers status',
      'eigrp           EIGRP information',
      'etherchannel    EtherChannel information',
      'interfaces      Interface status and configuration',
      'ip              IP information',
      'mac-address-table  MAC forwarding table',
      'ntp             NTP information',
      'ospf            OSPF information',
      'processes       Active process statistics',
      'protocols       Active network routing protocols',
      'running-config  Current operating configuration',
      'spanning-tree   Spanning tree topology',
      'standby         HSRP information',
      'startup-config  Contents of startup configuration',
      'version         System hardware and software status',
      'vlan            VTP VLAN status',
      'vrrp            VRRP information',
    ],
    'show ip': [
      'access-lists    List IP access lists',
      'arp             IP ARP table',
      'bgp             BGP information',
      'cef             Cisco Express Forwarding',
      'dhcp            DHCP information',
      'eigrp           EIGRP information',
      'interface       IP interface status and configuration',
      'nat             NAT information',
      'ospf            OSPF information',
      'protocols       Active IP routing protocol process',
      'route           IP routing table',
      'ssh             Information on SSH',
      'vrf             VRF information',
    ],
  };

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

      this._onKey = (e) => this.handleKey(e);
      this._onClick = () => this.inputEl.focus();
      this.inputEl.addEventListener('keydown', this._onKey);
      this.inputEl.focus();
      el.addEventListener('click', this._onClick);

      this.updatePrompt();
    }

    // Detach listeners so a reset/re-init doesn't leave an orphaned instance
    // driving the shared DOM input (double keystrokes, ghost prompt lines).
    destroy() {
      if (this._onKey) this.inputEl.removeEventListener('keydown', this._onKey);
      if (this._onClick) this.el.removeEventListener('click', this._onClick);
      this._onKey = this._onClick = null;
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
      } else if (e.ctrlKey) {
        // Ctrl shortcuts (real IOS behavior per IOS-CLI-REFERENCE.md §1)
        if (e.key === 'z' || e.key === 'Z') {
          // Ctrl-Z: return to privileged EXEC from any config submode
          e.preventDefault();
          const partial = this.inputEl.textContent;
          this.inputEl.textContent = '';
          this.writeLine(this.lab.activeDevice.prompt() + ' ' + partial, 'cmd');
          const dev = this.lab.activeDevice;
          if (dev.mode === 'config' || dev.mode.startsWith('config-')) {
            dev.mode = 'priv';
            dev.currentInterface = null;
            this.lab.checkObjectives && this.lab.checkObjectives();
          }
          this.updatePrompt();
          this.scrollToBottom();
        } else if (e.key === 'c' || e.key === 'C') {
          // Ctrl-C: abort current input; from config submode step up to priv EXEC
          e.preventDefault();
          this.writeLine(this.lab.activeDevice.prompt() + ' ' + this.inputEl.textContent, 'cmd');
          this.inputEl.textContent = '';
          const dev = this.lab.activeDevice;
          if (dev.mode === 'config' || dev.mode.startsWith('config-')) {
            dev.mode = 'priv';
            dev.currentInterface = null;
            this.lab.checkObjectives && this.lab.checkObjectives();
          }
          this.updatePrompt();
          this.scrollToBottom();
        } else if (e.key === 'l' || e.key === 'L') {
          // Ctrl-L: clear screen, keep prompt
          e.preventDefault();
          this.clear();
          this.scrollToBottom();
        } else if (e.key === 'u' || e.key === 'U') {
          // Ctrl-U: clear the current input line
          e.preventDefault();
          this.inputEl.textContent = '';
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

  // ── Context help helper ─────────────────────────────────────
  // Returns the string to print for a `?` query; never returns undefined.
  // Called by processCommand before any other handling.
  LabBase.prototype.iosContextHelp = function(typed, dev) {
    // Trim trailing '?' and any preceding space
    var body = typed.slice(0, -1); // everything before the '?'
    var trailingSpace = body.length > 0 && body[body.length - 1] === ' ';
    var tokens = body.trim().split(/\s+/).filter(function(t) { return t.length > 0; });

    // bare `?` or `<space>?`: list commands for current mode
    if (tokens.length === 0) {
      var modeKey = (dev.mode === 'priv') ? 'priv' : (dev.mode === 'config' || dev.mode.startsWith('config-')) ? 'config' : 'user';
      return (HELP[modeKey] || []).join('\n');
    }

    // `show ?` or `show ip ?`
    var joined = tokens.join(' ').toLowerCase();
    if (joined === 'show' && trailingSpace) return (HELP['show'] || []).join('\n');
    if (joined === 'show ip' && trailingSpace) return (HELP['show ip'] || []).join('\n');

    // `<command> ?` with trailing space: show next keywords + <cr> if runnable
    if (trailingSpace) {
      // Generic: for any recognized first token show a "<cr>" hint
      return '<cr>';
    }

    // `word?` (no trailing space): list commands/keywords starting with that prefix
    var prefix = tokens[tokens.length - 1].toLowerCase();
    var context = (dev.mode === 'priv') ? HELP['priv'] : (dev.mode === 'config' || dev.mode.startsWith('config-')) ? HELP['config'] : HELP['user'];
    var matches = (context || []).filter(function(line) {
      return line.toLowerCase().startsWith(prefix);
    });
    if (!matches.length) return '% No command found matching prefix "' + prefix + '"';
    return matches.join('\n');
  };

  // ── Abbreviation error helpers (IOS-CLI-REFERENCE.md §5) ────
  // Build a caret line pointing at the first unrecognized token.
  function caretLine(prompt, cmd, token) {
    var prefix = prompt + ' ';
    var idx = cmd.indexOf(token);
    if (idx < 0) idx = 0;
    return cmd + '\n' + ' '.repeat(prefix.length + idx) + '^';
  }

  // Detect "recognized command missing required args" cases.
  // Returns an error string if the command is incomplete, else undefined.
  function incompleteCheck(lower) {
    // `ip address` with no args
    if (lower === 'ip address' || lower === 'ip addr') return '% Incomplete command.';
    // `router ospf` or `router bgp` or `router eigrp` with no process-id/AS
    if (/^router\s+(ospf|bgp|eigrp|rip)\s*$/.test(lower)) return '% Incomplete command.';
    // `interface` with no name
    if (/^interface\s*$/.test(lower)) return '% Incomplete command.';
    return undefined;
  }

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
      'ru': 'running-config', 'run': 'running-config', 'runn': 'running-config',
      'start': 'startup-config',
      'ver': 'version',
      'ne': 'neighbors', 'nei': 'neighbors', 'neigh': 'neighbors', 'neighb': 'neighbors',
      'sum': 'summary', 'summ': 'summary',
      'vl': 'vlan',
      'det': 'detail',
      'inc': 'include',
      'sec': 'section',
      'prot': 'protocols',
      'sp': 'spanning-tree', 'span': 'spanning-tree',
      'ass': 'associations',
      'sta': 'status',
      'por': 'port-channel',
      'acc': 'access-lists',
      // Protocol abbreviations used in show sub-commands (reference §2)
      'os': 'ospf', 'dat': 'database',
      'ei': 'eigrp', 'to': 'topology',
      'bg': 'bgp',
      'eth': 'etherchannel',
      'stan': 'standby',
    };
    // Stop expanding once a free-text-consuming keyword is reached, so a
    // user-chosen value that happens to equal an abbreviation (e.g.
    // `name SEC`, `enable secret en`, `description br link`) is left intact.
    var FREETEXT_HEADS = { 'name': 1, 'description': 1, 'desc': 1, 'hostname': 1, 'banner': 1, 'password': 1, 'secret': 1 };
    var parts = raw.split(/\s+/);
    var out = [];
    var freeze = false;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].toLowerCase();
      if (freeze) { out.push(parts[i]); continue; }
      out.push(TOKEN_MAP[p] || parts[i]);
      var expanded = TOKEN_MAP[p] || p;
      if (FREETEXT_HEADS[p] || FREETEXT_HEADS[expanded]) freeze = true;
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
        rt.push('S    ' + r.net + ' [1/0] via ' + r.nh);
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
    // show cdp neighbors / detail — reads device.custom._noise.cdpNeighbors
    if (lower === 'show cdp neighbors' || lower === 'show cdp nei') {
      var nbrs = (dev.custom && dev.custom._noise && dev.custom._noise.cdpNeighbors) || [];
      var header = 'Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge\n                  S - Switch, H - Host, I - IGMP, r - Repeater\n\nDevice ID        Local Intrfce      Holdtme    Capability  Platform   Port ID';
      if (!nbrs.length) return header + '\n(no neighbors)';
      var rows = nbrs.map(function(n) {
        return (n.deviceId || 'UNKNOWN').padEnd(17) + (n.localIf || '').padEnd(19) + String(n.holdtime || 160).padEnd(11) + (n.capability || 'R').padEnd(12) + (n.platform || '4321').padEnd(11) + (n.portId || '');
      });
      return header + '\n' + rows.join('\n');
    }
    if (lower === 'show cdp neighbors detail' || lower === 'show cdp nei det') {
      var nbrs2 = (dev.custom && dev.custom._noise && dev.custom._noise.cdpNeighbors) || [];
      if (!nbrs2.length) return '(no CDP neighbors)';
      return nbrs2.map(function(n) {
        return '-------------------------\nDevice ID: ' + (n.deviceId || 'UNKNOWN') +
          '\nEntry address(es): \n  IP address: ' + (n.ip || '10.0.0.254') +
          '\nPlatform: cisco ' + (n.platform || '4321') + ',  Capabilities: ' + (n.capability || 'Router') +
          '\nInterface: ' + (n.localIf || 'Gi0/0') + ',  Port ID (outgoing port): ' + (n.portId || 'Gi0/1') +
          '\nHoldtime : ' + (n.holdtime || 160) + ' sec' +
          '\nVersion :\n  Cisco IOS Software, Version 15.7(3)M3';
      }).join('\n');
    }
    // show mac address-table — reads device.custom._noise.macTable
    if (lower === 'show mac address-table' || lower === 'show mac add' || lower === 'show mac add-table' || lower === 'show mac' || lower === 'show mac-address-table') {
      var macs = (dev.custom && dev.custom._noise && dev.custom._noise.macTable) || [];
      var mh = '          Mac Address Table\n-------------------------------------------\n\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----';
      if (!macs.length) return mh + '\nTotal Mac Addresses for this criterion: 0';
      var mrows = macs.map(function(m) {
        return ' ' + String(m.vlan || 1).padEnd(7) + (m.mac || '0000.0000.0000').padEnd(18) + (m.type || 'DYNAMIC').padEnd(12) + (m.port || 'Gi0/1');
      });
      return mh + '\n' + mrows.join('\n') + '\nTotal Mac Addresses for this criterion: ' + macs.length;
    }
    // show ip ssh — reflects current SSH config state
    if (lower === 'show ip ssh' || lower === 'show ssh') {
      var c = dev.custom || {};
      if (!c.rsaKeys) return 'SSH Disabled - version 1.99\n%Please create RSA keys (of at least 768 bits size) to enable SSH v2.\nAuthentication timeout: 120 secs; Authentication retries: 3\nMinimum expected Diffie Hellman key size : 1024 bits\nIOS Keys in SECSH format(ssh-rsa, base64 encoded): NONE';
      var dom = c.domain || 'lab.local';
      return 'SSH Enabled - version 2.0\nAuthentication methods:publickey,keyboard-interactive,password\nAuthentication Publickey Algorithms:x509v3-ssh-rsa,ssh-rsa\nHostkey Algorithms:x509v3-ssh-rsa,ssh-rsa\nEncryption Algorithms:aes128-ctr,aes192-ctr,aes256-ctr\nMAC Algorithms:hmac-sha2-256,hmac-sha2-512,hmac-sha1\nKEX Algorithms:diffie-hellman-group14-sha1\nAuthentication timeout: 120 secs; Authentication retries: 3\nMinimum expected Diffie Hellman key size : 1024 bits\nIOS Keys in SECSH format(ssh-rsa, base64 encoded): ' + (dev.hostname || 'R1') + '.' + dom;
    }
    // show running-config | section vty
    if (lower === 'show running-config | section vty' || lower === 'show running-config | sec vty') {
      var c2 = dev.custom || {};
      var lines2 = ['line vty 0 4'];
      if (c2.execTimeout) lines2.push(' exec-timeout ' + c2.execTimeout);
      if (c2.loginLocal) lines2.push(' login local');
      if (c2.vtyTransport === 'ssh') lines2.push(' transport input ssh');
      return lines2.join('\n');
    }
    // show ip ospf neighbor — reads dev.ospf; derives peers from CDP (bug #20)
    if (lower === 'show ip ospf neighbor' || lower === 'show ip ospf neighbors') {
      if (!dev.ospf || !dev.ospf.processId) return '';
      if ((dev.ospf.networks || []).length === 0) return '';
      var ospfNoise = (dev.custom && dev.custom._noise) || {};
      var ospfCdp = ospfNoise.cdpNeighbors || [];
      var ifMap = { 'Gi0/0': 'GigabitEthernet0/0', 'Gi0/1': 'GigabitEthernet0/1', 'Gi0/2': 'GigabitEthernet0/2', 'Gi0/3': 'GigabitEthernet0/3' };
      var ospfPeers = ospfCdp.filter(function (n) {
        if (!/R/.test(n.capability || '')) return false; // router peers only
        var full = ifMap[n.localIf] || n.localIf;
        var iface = dev.interfaces[full] || dev.interfaces[n.localIf];
        return iface && iface.up; // adjacency only on up links
      });
      if (!ospfPeers.length) {
        // fall back to a generic adjacency line so verify still teaches
        return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n2.2.2.2           1   FULL/DR         00:00:38    10.0.12.2       GigabitEthernet0/0';
      }
      var ospfRows = ['Neighbor ID     Pri   State           Dead Time   Address         Interface'];
      ospfPeers.forEach(function (n) {
        var full = ifMap[n.localIf] || n.localIf;
        ospfRows.push((n.ip || '0.0.0.0') + '     1   FULL/DR         00:00:38    ' + (n.ip || '') + '       ' + full);
      });
      return ospfRows.join('\n');
    }
    // show ip protocols
    if (lower === 'show ip protocols' || lower === 'show ip prot') {
      if (!dev.ospf) return '';
      var ls = ['*** IP Routing is NSF aware ***', '', 'Routing Protocol is "ospf ' + dev.ospf.processId + '"'];
      if (dev.ospf.routerId) ls.push('  Router ID ' + dev.ospf.routerId);
      ls.push('  Number of areas in this router is 1. 1 normal 0 stub 0 nssa');
      ls.push('  Routing for Networks:');
      (dev.ospf.networks || []).forEach(function(n) { ls.push('    ' + n.net + ' ' + n.wildcard + ' area ' + n.area); });
      ls.push('  Distance: (default is 110)');
      return ls.join('\n');
    }
    // show access-lists — reads dev.acls
    if (lower === 'show access-lists' || lower === 'show acc' || lower === 'show ip access-lists') {
      var acls = dev.acls || {};
      var cust = dev.custom || {};
      var lines3 = [];
      Object.keys(acls).forEach(function(id) {
        var entries = acls[id];
        if (!entries.length) return;
        var num = parseInt(id);
        if (num < 100) lines3.push('Standard IP access list ' + id);
        else lines3.push('Extended IP access list ' + id);
        entries.forEach(function(e, i) {
          var seq = (i + 1) * 10;
          if (e.dst) lines3.push('    ' + seq + ' ' + e.action + ' ip ' + e.src + ' ' + e.wildcard + ' ' + e.dst + ' ' + (e.dstWild || '0.0.0.0'));
          else lines3.push('    ' + seq + ' ' + e.action + ' ' + e.src + ' ' + e.wildcard);
        });
      });
      if (cust.namedAcl) {
        lines3.push('Extended IP access list ' + cust.namedAcl);
        if (cust.aclDeny80) lines3.push('    10 deny tcp 10.0.0.0 0.255.255.255 any eq 80');
        if (cust.aclPermitAny) lines3.push('    20 permit ip any any');
      }
      return lines3.join('\n') || '(no access-lists configured)';
    }
    // show ip nat translations / statistics — reads dev.nat
    if (lower === 'show ip nat translations' || lower === 'show ip nat tr') {
      if (!dev.nat || (!dev.nat.overload && !dev.nat.poolName)) return '';
      return 'Pro Inside global         Inside local          Outside local         Outside global\nicmp 203.0.113.1:1     192.168.1.10:1        8.8.8.8:1             8.8.8.8:1';
    }
    if (lower === 'show ip nat statistics' || lower === 'show ip nat stat') {
      if (!dev.nat) return '';
      var ins = (dev.nat.inside || []).join(', ');
      var out = (dev.nat.outside || []).join(', ');
      return 'Total active translations: 1 (0 static, 1 dynamic; 1 extended)\nOutside interfaces:\n  ' + out + '\nInside interfaces:\n  ' + ins + '\nHits: 142  Misses: 3\n' + (dev.nat.overload ? 'Dynamic mappings:\n-- Inside Source\n[Id: 1] access-list 1 interface ' + (dev.nat.outside || ['Gi0/1'])[0] + ' refcount 1' : '');
    }
    // show ip dhcp pool / binding — reads custom dhcp*
    if (lower === 'show ip dhcp pool') {
      var c3 = dev.custom || {};
      if (!c3.dhcpPool && !c3.dhcpNetwork) return '';
      return 'Pool ' + (c3.dhcpPool || 'POOL1') + ' :\n Utilization mark (high/low)    : 100 / 0\n Subnet size (first/next)       : 0 / 0\n Total addresses                : 254\n Leased addresses               : 0\n Pending event                  : none\n 1 subnet is currently in the pool :\n Current index        IP address range                    Leased addresses\n ' + (c3.dhcpNetwork || '0.0.0.0') + '       ' + (c3.dhcpNetwork || '0.0.0.0').replace(/\.0$/, '.1') + '      - ' + (c3.dhcpNetwork || '0.0.0.0').replace(/\.0$/, '.254') + '       0';
    }
    if (lower === 'show ip dhcp binding') {
      return 'Bindings from all pools not associated with VRF:\nIP address          Client-ID/              Lease expiration        Type\n                    Hardware address/\n                    User name\n(none active in lab simulation)';
    }
    // show standby brief — reads custom hsrp*
    if (lower === 'show standby brief' || lower === 'show standby br') {
      var c4 = dev.custom || {};
      if (!c4.hsrpVip) return '';
      return '                     P indicates configured to preempt.\n                     |\nInterface   Grp  Pri P State    Active          Standby         Virtual IP\n' + (dev.currentInterface || 'Gi0/0').replace('GigabitEthernet', 'Gi') + '       1    ' + (c4.hsrpPriority || 100) + ' ' + (c4.hsrpPreempt ? 'P' : ' ') + ' Active   local           unknown         ' + c4.hsrpVip;
    }
    // show ipv6 interface brief — reads dev.interfaces ipv6
    if (lower === 'show ipv6 interface brief' || lower === 'show ipv6 int br') {
      var c5 = dev.custom || {};
      var ls5 = [];
      Object.keys(dev.interfaces).forEach(function(n) {
        var i = dev.interfaces[n];
        ls5.push(n + '   [' + (i.up ? 'up/up' : 'administratively down/down') + ']');
        if (c5.ipv6Addr) ls5.push('    FE80::1');
        if (c5.ipv6Addr) ls5.push('    ' + c5.ipv6Addr);
      });
      return ls5.join('\n');
    }
    // show interfaces trunk
    if (lower === 'show interfaces trunk' || lower === 'show interface trunk' || lower === 'show int trunk' || lower === 'show interface tr' || lower === 'show int tr') {
      var ls6 = ['Port      Mode             Encapsulation  Status        Native vlan'];
      Object.keys(dev.interfaces).forEach(function(n) {
        var i = dev.interfaces[n];
        if (i.mode === 'trunk') ls6.push(n.replace('GigabitEthernet', 'Gi').padEnd(9) + ' on               ' + (i.trunkEncap || '802.1q').padEnd(15) + 'trunking      1');
      });
      if (ls6.length === 1) return '(no trunk interfaces)';
      return ls6.join('\n');
    }
    // show spanning-tree / vlan X / summary
    if (lower.startsWith('show spanning-tree')) {
      var c6 = dev.custom || {};
      var vlanMatch = lower.match(/vlan\s+(\d+)/);
      var vid = vlanMatch ? parseInt(vlanMatch[1]) : 1;
      var pri = (c6.stpPriority || 32768) + vid;
      return 'VLAN' + String(vid).padStart(4, '0') + '\n  Spanning tree enabled protocol ieee\n  Root ID    Priority    ' + pri + '\n             Address     aabb.cc00.0100\n             This bridge is the root\n             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec\n\n  Bridge ID  Priority    ' + pri + ' (priority ' + (c6.stpPriority || 32768) + ' sys-id-ext ' + vid + ')\n             Address     aabb.cc00.0100\n             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec\n             Aging Time  300 sec';
    }
    // show port-security interface
    if (lower.match(/^show port-security/)) {
      var ps = dev.portSecurity || {};
      var ifMatch = lower.match(/interface\s+(\S+)/);
      if (ifMatch) {
        var ifName = ifMatch[1].toLowerCase().replace('gi', 'GigabitEthernet').replace('fa', 'FastEthernet');
        var pInfo = ps[ifName] || ps[ifMatch[1]];
        if (!pInfo || !pInfo.enabled) return 'Port Security              : Disabled';
        return 'Port Security              : Enabled\nPort Status                : Secure-up\nViolation Mode             : ' + (pInfo.violation || 'shutdown') + '\nAging Time                 : 0 mins\nAging Type                 : Absolute\nSecureStatic Address Aging : Disabled\nMaximum MAC Addresses      : ' + (pInfo.max || 1) + '\nTotal MAC Addresses        : 0\nConfigured MAC Addresses   : 0\nSticky MAC Addresses       : 0\nLast Source Address:Vlan   : 0000.0000.0000:0\nSecurity Violation Count   : 0';
      }
      var anyEnabled = Object.values(ps).some(function(p) { return p.enabled; });
      if (!anyEnabled) return 'Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action\n(none)';
      var rows = ['Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action'];
      Object.keys(ps).forEach(function(n) {
        var p = ps[n];
        if (p.enabled) rows.push(n.replace('GigabitEthernet', 'Gi') + '          ' + (p.max || 1) + '              0            0                  ' + (p.violation || 'shutdown'));
      });
      return rows.join('\n');
    }
    // show logging
    if (lower === 'show logging' || lower === 'show log') {
      var c7 = dev.custom || {};
      var ls7 = ['Syslog logging: enabled', 'No Active Message Discriminator.', ''];
      if (c7.logHost) ls7.push('Trap logging: level ' + (c7.logTrap || 'informational') + ', ' + c7.logHost + ' (udp port 514)');
      else ls7.push('Trap logging: level informational, no logging host configured');
      return ls7.join('\n');
    }
    // show ip dhcp snooping
    if (lower === 'show ip dhcp snooping' || lower === 'show ip dhcp snoop') {
      var c8 = dev.custom || {};
      if (!c8.dhcpSnooping) return 'Switch DHCP snooping is disabled';
      return 'Switch DHCP snooping is enabled\nDHCP snooping is configured on following VLANs:\n' + (c8.dhcpSnoopingVlan || 'none') + '\nDHCP snooping is operational on following VLANs:\n' + (c8.dhcpSnoopingVlan || 'none') + '\nInterface                  Trusted    Allow option    Rate limit (pps)\n------------------------   -------    ------------    ----------------\nGigabitEthernet0/1         ' + (c8.dhcpTrusted ? 'yes' : 'no') + '        yes             unlimited';
    }
    // show ntp associations / status
    if (lower === 'show ntp associations' || lower === 'show ntp ass') {
      var c9 = dev.custom || {};
      if (!c9.ntpServer) return '';
      return '  address         ref clock       st   when   poll reach  delay  offset    disp\n*~' + c9.ntpServer + '   .GPS.            2     12     64  377  1.234   0.123   0.456\n * sys.peer, # selected, + candidate, - outlyer, x falseticker, ~ configured';
    }
    if (lower === 'show ntp status' || lower === 'show ntp stat') {
      var c10 = dev.custom || {};
      if (!c10.ntpServer) return 'Clock is unsynchronized, stratum 16, no reference clock';
      return 'Clock is synchronized, stratum 3, reference is ' + c10.ntpServer + '\nnominal freq is 250.0000 Hz, actual freq is 249.9974 Hz, precision is 2**18';
    }
    // show version (extended — replaces the minimal entry above; verbatim from reference §3)
    // Note: the minimal entry above catches it first; this block is never reached.
    // See minimal entry at ~line 547. Kept here for documentation only.

    // show ip ospf database  (`sh ip os dat`)
    if (lower === 'show ip ospf database' || lower === 'show ip ospf dat' || lower === 'show ip os dat' || lower === 'show ip os database') {
      var ospfDb = (dev.ospf && dev.ospf.routerId) || '1.1.1.1';
      var ospfPid = (dev.ospf && dev.ospf.processId) || 1;
      return '            OSPF Router with ID (' + ospfDb + ') (Process ID ' + ospfPid + ')\n' +
        '                Router Link States (Area 0)\n' +
        'Link ID         ADV Router      Age         Seq#       Checksum Link count\n' +
        '1.1.1.1         1.1.1.1         1208        0x80000003 0x00A1B2 3\n' +
        '2.2.2.2         2.2.2.2         903         0x80000005 0x00C3D4 2\n' +
        '                Net Link States (Area 0)\n' +
        'Link ID         ADV Router      Age         Seq#       Checksum\n' +
        '10.0.0.2        2.2.2.2         890         0x80000001 0x00F1A2';
    }
    // show ip bgp summary  (`sh ip bg sum` / `sh ip bgp sum`)
    if (lower === 'show ip bgp summary' || lower === 'show ip bgp sum' || lower === 'show ip bg sum' || lower === 'show ip bg summary') {
      return 'BGP router identifier 1.1.1.1, local AS number 65001\n' +
        'BGP table version is 14, main routing table version 14\n\n' +
        'Neighbor        V           AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd\n' +
        '10.0.0.2        4        65002     143     141       14    0    0 02:02:11        3\n' +
        '10.0.1.2        4        65001     201     199       14    0    0 01:55:44        4\n' +
        '172.16.0.1      4        65003       0       0        0    0    0 never    Idle';
    }
    // show ip bgp  (`sh ip bg`)
    if (lower === 'show ip bgp' || lower === 'show ip bg') {
      return 'BGP table version is 14, local router ID is 1.1.1.1\n' +
        'Status codes: s suppressed, * valid, > best, i - internal\n' +
        'Origin codes: i - IGP, e - EGP, ? - incomplete\n\n' +
        '   Network          Next Hop            Metric LocPrf Weight Path\n' +
        '*> 10.10.10.0/24    0.0.0.0                  0         32768 i\n' +
        '*> 192.168.1.0      10.0.0.2                 0             0 65002 i\n' +
        '*i 192.168.2.0      10.0.1.2                 0    100      0 65002 i';
    }
    // show ip eigrp neighbors  (`sh ip ei ne`)
    if (lower === 'show ip eigrp neighbors' || lower === 'show ip eigrp nei' || lower === 'show ip ei ne' || lower === 'show ip ei neighbors' || lower === 'show ip eigrp neigh') {
      return 'EIGRP-IPv4 Neighbors for AS(100)\n' +
        'H   Address                 Interface        Hold Uptime   SRTT   RTO  Q  Seq\n' +
        '                                             (sec)         (ms)        Cnt Num\n' +
        '0   192.168.1.2             Gi0/1              14 00:15:32   45   270  0   22\n' +
        '1   192.168.2.2             Gi0/2              11 00:10:08  120   720  0   18';
    }
    // show ip eigrp topology  (`sh ip ei to`)
    if (lower === 'show ip eigrp topology' || lower === 'show ip eigrp top' || lower === 'show ip ei to' || lower === 'show ip ei topology') {
      return 'EIGRP-IPv4 Topology Table for AS(100)/ID(1.1.1.1)\n' +
        'Codes: P - Passive, A - Active\n' +
        'P 10.0.0.0/24, 1 successors, FD is 28160\n' +
        '        via Connected, GigabitEthernet0/0\n' +
        'P 192.168.2.0/24, 1 successors, FD is 30720\n' +
        '        via 192.168.1.2 (30720/28160), GigabitEthernet0/1';
    }
    // show etherchannel summary  (`sh eth sum`)
    if (lower === 'show etherchannel summary' || lower === 'show etherchannel sum' || lower === 'show eth sum' || lower === 'show eth summary') {
      return 'Flags:  D - down  P - bundled in port-channel  S - Layer2  U - in use\n' +
        'Number of channel-groups in use: 1\n' +
        'Group  Port-channel  Protocol    Ports\n' +
        '------+-------------+-----------+-------------------------------\n' +
        '1      Po1(SU)       LACP        Gi0/1(P)    Gi0/2(P)';
    }
    // show vrrp brief  (`sh vrrp br`)
    if (lower === 'show vrrp brief' || lower === 'show vrrp br') {
      var c11 = dev.custom || {};
      if (c11.vrrpVip) {
        return 'Interface          Grp  A-F  Pri Own Pre State   Master addr     Group addr\n' +
          (dev.currentInterface || 'GigabitEthernet0/0') + ' 1    IPv4 ' +
          String(c11.vrrpPriority || 100).padStart(3) + '  N   ' +
          (c11.vrrpPreempt ? 'Y' : 'N') + '  Master  ' +
          (c11.vrrpVip || '10.0.0.1') + '(local) ' + c11.vrrpVip;
      }
      // Sample output (verbatim from reference §3)
      return 'Interface          Grp  A-F  Pri Own Pre State   Master addr     Group addr\n' +
        'GigabitEthernet0/0 1    IPv4 150  N   Y  Master  10.0.0.1(local) 10.0.0.100';
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

    // ── Context help: handle trailing `?` (IOS-CLI-REFERENCE.md §4) ──────
    // Process on submit (simplest approach; avoids keypress complexity).
    // Matches bare `?`, `word?` (no space), and `command ?` (space before ?).
    if (raw.endsWith('?')) {
      return this.iosContextHelp(raw, dev);
    }

    // ── Incomplete command detection ────────────────────────────────────
    var incompleteErr = incompleteCheck(lower);
    if (incompleteErr) return incompleteErr;

    // Support `do <cmd>` from any config mode (real IOS behavior).
    // Temporarily fake priv mode so lab extraCmds that gate on priv/user fire correctly.
    if (lower.startsWith('do ') && dev.mode !== 'user' && dev.mode !== 'priv') {
      var doRaw = raw.substring(3).trim();
      var doLower = doRaw.toLowerCase();
      // Handle do wr / do copy run start / do write directly
      if (doLower === 'wr' || doLower === 'write' || doLower === 'write memory' || doLower === 'write mem' ||
          doLower === 'copy run start' || doLower === 'copy running-config startup-config' ||
          doLower === 'copy running startup' || doLower === 'copy running-config startup') {
        if (!dev.custom) dev.custom = {};
        dev.custom.configSaved = true;
        this.checkObjectives();
        return 'Building configuration...\n[OK]';
      }
      // Save current mode + fake priv for show-handler purposes
      var savedMode = dev.mode;
      dev.mode = 'priv';
      try {
        var doResult = this.handleCommand(dev, doRaw, doLower);
        if (doResult !== undefined) { dev.mode = savedMode; this.checkObjectives(); return doResult; }
        var doShow = this.defaultShowCmd(dev, doRaw, doLower);
        if (doShow !== undefined) { dev.mode = savedMode; this.checkObjectives(); return doShow; }
      } finally { dev.mode = savedMode; }
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
    if (lower.match(/^(configure|conf)(\s+(terminal|term|t))?$/)) {
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
      if (dev.mode === 'user') { this.terminal && this.terminal.writeLine && this.terminal.writeLine('[Connection closed by foreign host]'); return ''; }
      return '';
    }
    if (lower === 'end') {
      if (dev.mode === 'config' || dev.mode.startsWith('config-')) {
        dev.mode = 'priv';
        dev.currentInterface = null;
        this.checkObjectives();
        return '';
      }
      return '% Invalid input detected at \'^\' marker.';
    }
    if (lower === 'disable') {
      // Real IOS: 'disable' is a priv-EXEC command; only priv -> user is valid.
      if (dev.mode === 'priv') {
        dev.mode = 'user';
        dev.currentInterface = null;
        dev.currentInterfaceRange = null;
        this.checkObjectives();
        return '';
      }
      if (dev.mode === 'user') return '';
      return '% Invalid input detected at \'^\' marker.';
    }

    // Save config: wr / write / write memory / copy run start / copy running-config startup-config
    if (lower === 'wr' || lower === 'write' || lower === 'write memory' || lower === 'write mem' ||
        lower === 'copy run start' || lower === 'copy running-config startup-config' ||
        lower === 'copy running startup' || lower === 'copy running-config startup' ||
        (lower === 'do wr' || lower === 'do write' || lower.startsWith('do copy run'))) {
      if (dev.mode === 'user') return '% Incomplete command';
      if (!dev.custom) dev.custom = {};
      dev.custom.configSaved = true;
      this.checkObjectives();
      return 'Building configuration...\n[OK]';
    }

    // Interface range — real IOS bundles multiple ports (e.g. EtherChannel members)
    var rangeMatch = raw.match(/^interface\s+range\s+(.+)/i);
    if (rangeMatch && (dev.mode === 'config' || dev.mode.startsWith('config-'))) {
      var spec = rangeMatch[1].trim();
      var rm = spec.match(/^(.*?)(\d+)\/(\d+)\s*-\s*(\d+)$/i);
      var members = [];
      if (rm) {
        var rangeBase = this.normalizeInterface((rm[1] + rm[2] + '/').trim()); // e.g. GigabitEthernet0/
        for (var rp = parseInt(rm[3]); rp <= parseInt(rm[4]); rp++) members.push(rangeBase + rp);
      } else {
        var self = this;
        members = spec.split(',').map(function (s) { return self.normalizeInterface(s.trim()); });
      }
      dev.currentInterfaceRange = members;
      dev.currentInterface = members[0];
      members.forEach(function (n) { if (!dev.interfaces[n]) dev.interfaces[n] = { up: false }; });
      dev.mode = 'config-if';
      this.checkObjectives();
      return '';
    }

    // Interface selection — real IOS allows from any config-* sub-mode
    var ifMatch = raw.match(/^interface\s+(.+)/i);
    if (ifMatch && (dev.mode === 'config' || dev.mode.startsWith('config-'))) {
      var ifName = this.normalizeInterface(ifMatch[1].trim());
      dev.currentInterface = ifName;
      dev.currentInterfaceRange = null; // single-interface clears any prior range
      if (ifName.includes('.')) {
        dev.mode = 'config-subif';
        if (!dev.interfaces[ifName]) dev.interfaces[ifName] = { subinterface: true, up: false };
      } else {
        dev.mode = 'config-if';
        if (!dev.interfaces[ifName]) dev.interfaces[ifName] = { up: false };
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
      if (defShow !== undefined) { this.checkObjectives(); return defShow; }
    }
    // From config modes, suggest `do show ...`
    if (lower.startsWith('show ') && dev.mode !== 'priv' && dev.mode !== 'user') {
      return '% Invalid input detected at \'^\' marker.\n  (hint: use `do show ...` to run a show command from config mode, or type `end` to return to privileged EXEC)';
    }

    // Unknown command — print IOS-style invalid-input with caret marker
    // Real IOS attempts DNS resolution for user EXEC input, but we skip that.
    var badToken = raw.split(' ')[0];
    var promptStr = dev.prompt();
    return '% Invalid input detected at \'^\' marker.\n' +
      promptStr + ' ' + raw + '\n' +
      ' '.repeat(promptStr.length + 1) + '^';
  };

  // Override in subclass
  LabBase.prototype.handleCommand = function() { return undefined; };
  LabBase.prototype.checkObjectives = function() {};
  LabBase.prototype.tabComplete = function() { return null; };

  LabBase.prototype.normalizeInterface = function(name) {
    return name
      .replace(/^gi(?:gabitethernet)?\s*/i, 'GigabitEthernet')
      .replace(/^fa(?:stethernet)?\s*/i, 'FastEthernet')
      .replace(/^se(?:rial)?\s*/i, 'Serial')
      .replace(/^lo(?:opback)?\s*/i, 'Loopback')
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
