/**
 * ib-tools.js
 *
 * Adapted from dc-lab-sim (https://github.com/Seanbo5386/dc-lab-sim),
 * MIT License, Copyright (c) 2026 Sean Boerhout.
 *
 * Outputs are simulated for NCP-AIN study purposes. Not real fabric data.
 *
 * Exposes: window.IBTools.run(cmdString) -> string
 *
 * Usage:
 *   <script src="js/ib-tools.js"></script>
 *   IBTools.run('ibstat')
 *   IBTools.run('perfquery 2 1')
 */

(function (global) {
  'use strict';

  // ---------------------------------------------------------------------------
  // Sample fabric definition. Edit this object to change simulated topology.
  // ---------------------------------------------------------------------------
  var FABRIC = {
    // Local host running commands
    localHost: {
      hostname: 'dgx-node-01',
      hcas: [
        {
          caType: 'mlx5_0',
          deviceType: 'MT4129',   // ConnectX-7
          firmwareVersion: '28.39.1002',
          ports: [
            {
              portNumber: 1,
              state: 'Active',
              physicalState: 'LinkUp',
              rate: 400,
              lid: 2,
              smLid: 1,
              nodeGuid: '0xe41d2d03007c0001',
              portGuid: '0xe41d2d03007c0001',
              linkLayer: 'InfiniBand',
              errors: { symbolErrors: 0, linkDowned: 0, portRcvErrors: 0, portXmitDiscards: 0, portXmitWait: 0 }
            }
          ]
        },
        {
          caType: 'mlx5_1',
          deviceType: 'MT4129',   // ConnectX-7
          firmwareVersion: '28.39.1002',
          ports: [
            {
              portNumber: 1,
              state: 'Active',
              physicalState: 'LinkUp',
              rate: 400,
              lid: 3,
              smLid: 1,
              nodeGuid: '0xe41d2d03007c0002',
              portGuid: '0xe41d2d03007c0002',
              linkLayer: 'InfiniBand',
              errors: { symbolErrors: 0, linkDowned: 0, portRcvErrors: 0, portXmitDiscards: 0, portXmitWait: 0 }
            }
          ]
        }
      ]
    },

    // All CA (host) nodes in the fabric, including the local host
    nodes: [
      {
        hostname: 'dgx-node-01',
        hcas: [
          { caType: 'mlx5_0', portGuid: '0xe41d2d03007c0001', numPorts: 1, lid: 2 },
          { caType: 'mlx5_1', portGuid: '0xe41d2d03007c0002', numPorts: 1, lid: 3 }
        ]
      },
      {
        hostname: 'dgx-node-02',
        hcas: [
          { caType: 'mlx5_0', portGuid: '0xe41d2d03007c0011', numPorts: 1, lid: 4 },
          { caType: 'mlx5_1', portGuid: '0xe41d2d03007c0012', numPorts: 1, lid: 5 }
        ]
      },
      {
        hostname: 'dgx-node-03',
        hcas: [
          { caType: 'mlx5_0', portGuid: '0xe41d2d03007c0021', numPorts: 1, lid: 6 },
          { caType: 'mlx5_1', portGuid: '0xe41d2d03007c0022', numPorts: 1, lid: 7 }
        ]
      }
    ],

    // Quantum-2 switch acting as SM (lid 1)
    switchLid: 1,
    switchGuid: '0xe41d2d0300100001',
    switchModel: 'QM9700',
    switchDescription: 'Quantum-2 NDR 64-port InfiniBand Switch',
    switchFirmware: '31.2010.4036',

    // SM info
    smGuid: '0xe41d2d0300100001',
    smPriority: 14,
    smActivityCount: 1234568
  };

  // ---------------------------------------------------------------------------
  // Internal helpers
  // ---------------------------------------------------------------------------

  function ibStandardName(rateGbps) {
    if (rateGbps >= 1600) return 'XDR2';
    if (rateGbps >= 800)  return 'XDR';
    if (rateGbps >= 400)  return 'NDR';
    if (rateGbps >= 200)  return 'HDR';
    if (rateGbps >= 100)  return 'EDR';
    if (rateGbps >= 56)   return 'FDR';
    return 'QDR';
  }

  // Parse a command string into { cmd, args, flags }
  function parseCmd(cmdString) {
    var parts = cmdString.trim().split(/\s+/);
    var cmd = parts[0] || '';
    var args = [];
    var flags = {};
    for (var i = 1; i < parts.length; i++) {
      var p = parts[i];
      if (p[0] === '-') {
        var key = p.replace(/^-+/, '');
        flags[key] = true;
      } else {
        args.push(p);
      }
    }
    return { cmd: cmd, args: args, flags: flags };
  }

  function hasFlag(flags) {
    var keys = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < keys.length; i++) {
      if (flags[keys[i]]) return true;
    }
    return false;
  }

  // Deterministic counters from a seed (matches source logic)
  function perfCounters(lid, portNum) {
    var seed = lid * 7919;
    return {
      xmitData: 500000000 + (seed % 500000000),
      rcvData: 450000000 + ((seed * 3) % 500000000),
      xmitPkts: 5000000 + (seed % 5000000),
      rcvPkts: 4800000 + ((seed * 3) % 5000000),
      portNum: portNum
    };
  }

  // Find a node+port by LID across all fabric nodes (for ibportstate/perfquery)
  function findByLid(lidStr) {
    var lid = parseInt(lidStr, 10);
    if (isNaN(lid)) return null;
    var nodes = FABRIC.nodes;
    for (var n = 0; n < nodes.length; n++) {
      var hcas = nodes[n].hcas;
      for (var h = 0; h < hcas.length; h++) {
        if (hcas[h].lid === lid) {
          return { node: nodes[n], hca: hcas[h] };
        }
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // Command implementations
  // ---------------------------------------------------------------------------

  function cmdIbstat(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibstat 5.9-0';

    var host = FABRIC.localHost;
    var out = '';
    host.hcas.forEach(function (hca, idx) {
      if (idx > 0) out += '\n';
      out += 'CA \'' + hca.caType + '\'\n';
      out += '\tCA type: ' + hca.deviceType + '\n';
      out += '\tNumber of ports: ' + hca.ports.length + '\n';
      out += '\tFirmware version: ' + hca.firmwareVersion + '\n';
      out += '\tHardware version: 0\n';
      out += '\tNode GUID: ' + hca.ports[0].nodeGuid + '\n';
      out += '\tSystem image GUID: ' + hca.ports[0].nodeGuid + '\n';
      hca.ports.forEach(function (port) {
        out += '\tPort ' + port.portNumber + ':\n';
        out += '\t\tState: ' + port.state + '\n';
        out += '\t\tPhysical state: ' + port.physicalState + '\n';
        out += '\t\tRate: ' + port.rate + ' Gb/s (4X ' + ibStandardName(port.rate) + ')\n';
        out += '\t\tBase lid: ' + port.lid + '\n';
        out += '\t\tLMC: 0\n';
        out += '\t\tSM lid: ' + port.smLid + '\n';
        out += '\t\tCapability mask: 0x04010000\n';
        out += '\t\tPort GUID: ' + port.portGuid + '\n';
        out += '\t\tLink layer: ' + port.linkLayer + '\n';
      });
    });
    return out;
  }

  function cmdIbstatus(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibstatus 5.9-0';

    var host = FABRIC.localHost;
    var out = '';
    host.hcas.forEach(function (hca) {
      hca.ports.forEach(function (port) {
        out += 'Infiniband device \'' + hca.caType + '\' port ' + port.portNumber + ' status:\n';
        out += '\tdefault gid:\t fe80:0000:0000:0000' + port.portGuid.replace('0x', ':') + '\n';
        out += '\tbase lid:\t' + port.lid + '\n';
        out += '\tsm lid:\t\t' + port.smLid + '\n';
        out += '\tstate:\t\t4: ACTIVE\n';
        out += '\tphys state:\t5: LinkUp\n';
        out += '\trate:\t\t' + port.rate + ' Gb/sec (' + '4X ' + ibStandardName(port.rate) + ')\n';
        out += '\tlink_layer:\t' + port.linkLayer + '\n';
        out += '\n';
      });
    });
    return out.trimRight();
  }

  function cmdIblinkinfo(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'iblinkinfo 5.9-0';

    // Switch port -> CA mapping
    // Switch port 1 -> node-01 mlx5_0 (lid 2), port 2 -> node-01 mlx5_1 (lid 3)
    // port 3 -> node-02 mlx5_0 (lid 4), etc.
    var sw = FABRIC;
    var out = 'Switch 0x' + parseInt(sw.switchGuid).toString(16) + ' ' + sw.switchModel + ':\n';
    out = 'Switch ' + sw.switchGuid + ' "' + sw.switchModel + '":\n';

    var portNum = 1;
    FABRIC.nodes.forEach(function (node) {
      node.hcas.forEach(function (hca) {
        var speed = ibStandardName(400);
        out += '      ' + sw.switchGuid + '         \t   ';
        out += portNum + '    ' + hca.lid + '    ' + node.hostname + '/' + hca.caType + '         ';
        out += '[' + portNum + '] ==>';
        out += '   ' + hca.portGuid + '    [1]';
        out += '(  4X ' + speed + '  Active/ LinkUp)\n';
        portNum++;
      });
    });
    return out;
  }

  function cmdIbhosts(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibhosts 5.9-0';

    var out = '# Fabric host list:\n';
    FABRIC.nodes.forEach(function (node) {
      node.hcas.forEach(function (hca) {
        out += 'Ca\t: ' + hca.portGuid + ' ports ' + hca.numPorts + ' "' + node.hostname + ' ' + hca.caType + '"\n';
      });
    });
    out += '\n' + FABRIC.nodes.length + ' host(s) discovered\n';
    return out;
  }

  function cmdIbnetdiscover(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibnetdiscover 5.9-0';

    var out = '#\n';
    out += '# Topology file: generated by ibnetdiscover\n';
    out += '# Discovered ' + (new Date()).toUTCString() + '\n';
    out += '#\n\n';

    // Switch record
    out += '# Switches\n';
    out += 'Switch\t64 "' + FABRIC.switchGuid + '"\t# "' + FABRIC.switchModel + '" ';
    out += 'enhanced port 0 lid ' + FABRIC.switchLid + ' lmc 0\n';
    var swPort = 1;
    FABRIC.nodes.forEach(function (node) {
      node.hcas.forEach(function (hca) {
        out += '[' + swPort + ']\t"' + hca.portGuid + '"[1]\t\t# "' + node.hostname + '/' + hca.caType + '" lid ' + hca.lid + '\n';
        swPort++;
      });
    });
    out += '\n';

    // CA records
    out += '# Channel Adapters (HCAs)\n';
    FABRIC.nodes.forEach(function (node) {
      node.hcas.forEach(function (hca) {
        out += 'Ca\t' + hca.numPorts + ' "' + hca.portGuid + '"\t# "' + node.hostname + '/' + hca.caType + '"\n';
        out += '[1]\t"' + FABRIC.switchGuid + '"[' + (hca.lid - 1) + ']\t\t# lid ' + hca.lid + ' lmc 0 "' + node.hostname + '" Active\n';
        out += '\n';
      });
    });

    // Summary
    var totalHcas = FABRIC.nodes.reduce(function (s, n) { return s + n.hcas.length; }, 0);
    var totalPorts = totalHcas;
    out += '#\n';
    out += '# Summary:\n';
    out += '#   ' + totalHcas + ' HCAs\n';
    out += '#   1 Switch\n';
    out += '#   ' + totalPorts + ' active ports\n';
    out += '#\n';
    return out;
  }

  function cmdIbportstate(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibportstate 5.9-0';

    var lid = parsed.args[0] || '2';
    var portArg = parsed.args[1] || '1';
    var found = findByLid(lid);
    if (!found) {
      return 'ibportstate: failed to get port info (lid ' + lid + ' not found in fabric)';
    }
    var out = '';
    out += '# Port info: Lid ' + lid + ' port ' + portArg + '\n';
    out += 'PortInfo:\n';
    out += 'Lid:.......................' + lid + '\n';
    out += 'SMLid:.....................' + FABRIC.switchLid + '\n';
    out += 'LMC:......................0\n';
    out += 'LinkWidthEnabled:.........4X\n';
    out += 'LinkWidthSupported:........1X, 4X\n';
    out += 'LinkWidthActive:...........4X\n';
    out += 'LinkSpeedEnabled:..........NDR\n';
    out += 'LinkSpeedSupported:........SDR, DDR, QDR, FDR, EDR, HDR, NDR\n';
    out += 'LinkSpeedActive:...........NDR\n';
    out += 'LinkState:.................Active\n';
    out += 'PhysLinkState:.............LinkUp\n';
    out += 'PortPhysicalState:.........5: LinkUp\n';
    return out;
  }

  function cmdPerfquery(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'perfquery 5.9-0';

    // Accept: perfquery [lid [port]]
    var lid = parsed.args[0] || '2';
    var portArg = parsed.args[1] || '1';
    var lidNum = parseInt(lid, 10);
    if (isNaN(lidNum)) lidNum = 2;

    var c = perfCounters(lidNum, parseInt(portArg, 10) || 1);
    var out = '';
    out += '# Port counters: Lid ' + lidNum + ' port ' + c.portNum + '\n';
    out += 'PortSelect:......................' + c.portNum + '\n';
    out += 'PortXmitData:....................' + c.xmitData + '\n';
    out += 'PortRcvData:...................' + c.rcvData + '\n';
    out += 'PortXmitPkts:....................' + c.xmitPkts + '\n';
    out += 'PortRcvPkts:...................' + c.rcvPkts + '\n';
    out += 'PortUnicastXmitPkts:.............' + c.xmitPkts + '\n';
    out += 'PortUnicastRcvPkts:..............' + c.rcvPkts + '\n';
    out += 'PortMulticastXmitPkts:...........0\n';
    out += 'PortMulticastRcvPkts:............0\n';
    out += 'SymbolErrorCounter:..............0\n';
    out += 'LinkErrorRecoveryCounter:........0\n';
    out += 'LinkDownedCounter:...............0\n';
    out += 'PortRcvErrors:...................0\n';
    out += 'PortRcvRemotePhysicalErrors:.....0\n';
    out += 'PortRcvSwitchRelayErrors:........0\n';
    out += 'PortXmitDiscards:................0\n';
    out += 'PortXmitConstraintErrors:........0\n';
    out += 'PortRcvConstraintErrors:.........0\n';
    out += 'LocalLinkIntegrityErrors:........0\n';
    out += 'ExcessiveBufferOverrunErrors:....0\n';
    out += 'VL15Dropped:.....................0\n';
    out += 'PortXmitWait:....................0\n';
    return out;
  }

  function cmdIbdiagnet(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibdiagnet 2.9.0';

    var totalHcas = FABRIC.nodes.reduce(function (s, n) { return s + n.hcas.length; }, 0);
    var totalLinks = totalHcas; // each HCA has 1 link to switch

    var out = '\n';
    out += '-I- -------------------------\n';
    out += '-I- START: ibdiagnet (fabric diagnostics)\n';
    out += '-I- -------------------------\n\n';
    out += '-I- Using port 1 as the local port\n';
    out += '-I- Discovering ...\n';
    out += '-I- Discovering done. ' + (totalHcas + 1) + ' nodes found (1 switch, ' + totalHcas + ' CAs)\n';
    out += '-I- ' + totalLinks + ' links discovered\n\n';

    out += '-I- SM information:\n';
    out += '-I-   SM LID  : ' + FABRIC.switchLid + '\n';
    out += '-I-   SM GUID : ' + FABRIC.smGuid + '\n';
    out += '-I-   SM State: SMINFO_MASTER\n\n';

    out += '-I- Link-width check (all links):\n';
    FABRIC.nodes.forEach(function (node) {
      node.hcas.forEach(function (hca) {
        out += '-I-   ' + FABRIC.switchModel + '[' + (hca.lid - 1) + '] -- ' + node.hostname + '/' + hca.caType + '[1]   4X NDR   HEALTHY\n';
      });
    });
    out += '\n';

    out += '-I- Credit-loop check: PASS\n';
    out += '-I- Routing check: PASS\n\n';

    out += '-I- -----------------------------------------------\n';
    out += '-W- Total critical errors: 0\n';
    out += '-W- Total warnings:        0\n';
    out += '-I- No errors found\n';
    out += '-I- See report in /tmp/ibdiagnet2\n';
    out += '-I- Done\n';
    return out;
  }

  function cmdSminfo(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'sminfo 5.9-0';

    var out = 'sminfo: sm lid ' + FABRIC.switchLid + ' sm guid ' + FABRIC.smGuid + ', ';
    out += 'activity count ' + FABRIC.smActivityCount + ' ';
    out += 'priority ' + FABRIC.smPriority + ' state 3 SMINFO_MASTER\n';
    return out;
  }

  function cmdIbping(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibping 5.9-0';

    var targetLid = parsed.args[0] || '1';
    var count = 4;
    var out = 'Pinging lid ' + targetLid + '...\n\n';
    for (var i = 0; i < count; i++) {
      var lat = (0.42 + i * 0.03).toFixed(3);
      out += 'Pong from lid ' + targetLid + ': time ' + lat + ' ms\n';
    }
    out += '\n--- lid ' + targetLid + ' ibping statistics ---\n';
    out += count + ' packets transmitted, ' + count + ' received, 0% packet loss\n';
    out += 'rtt min/avg/max = 0.420/0.465/0.510 ms\n';
    return out;
  }

  // ---------------------------------------------------------------------------
  // Command dispatch table
  // ---------------------------------------------------------------------------
  var DISPATCH = {
    'ibstat':        cmdIbstat,
    'ibstatus':      cmdIbstatus,
    'iblinkinfo':    cmdIblinkinfo,
    'ibhosts':       cmdIbhosts,
    'ibnetdiscover': cmdIbnetdiscover,
    'ibportstate':   cmdIbportstate,
    'perfquery':     cmdPerfquery,
    'ibdiagnet':     cmdIbdiagnet,
    'sminfo':        cmdSminfo,
    'ibping':        cmdIbping
  };

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  var IBTools = {
    /**
     * run(cmdString) -> string
     *
     * Simulates an InfiniBand diagnostic command and returns its output.
     * The first token is the command name; remaining tokens are args/flags.
     */
    run: function (cmdString) {
      if (typeof cmdString !== 'string' || !cmdString.trim()) {
        return '';
      }
      var parsed = parseCmd(cmdString);
      var handler = DISPATCH[parsed.cmd];
      if (!handler) {
        return '-bash: ' + parsed.cmd + ': command not found\n' +
               'Available IB tools: ibstat ibstatus iblinkinfo ibhosts ibnetdiscover\n' +
               '                    ibportstate perfquery ibdiagnet sminfo ibping';
      }
      try {
        return handler(parsed);
      } catch (e) {
        return 'Error running ' + parsed.cmd + ': ' + (e.message || String(e));
      }
    },

    /**
     * fabric() -> the raw FABRIC object for inspection or extension.
     */
    fabric: function () {
      return FABRIC;
    }
  };

  global.IBTools = IBTools;

}(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this)));
