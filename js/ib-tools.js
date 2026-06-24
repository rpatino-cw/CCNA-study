/**
 * ib-tools.js
 *
 * Adapted from dc-lab-sim (https://github.com/Seanbo5386/dc-lab-sim),
 * MIT License, Copyright (c) 2026 Sean Boerhout.
 *
 * Outputs are simulated for NCP-AIN study purposes. Not real fabric data.
 *
 * Exposes: window.IBTools.run(cmdString) -> string
 *          window.IBTools.setFault(id)    -> activate a scenario fault
 *          window.IBTools.clearFault()    -> return to normal free-play
 *          window.IBTools.fabric()        -> raw FABRIC object
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
      hostname: 'dgx-h100-01',
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
        hostname: 'dgx-h100-01',
        hcas: [
          { caType: 'mlx5_0', portGuid: '0xe41d2d03007c0001', numPorts: 1, lid: 2 },
          { caType: 'mlx5_1', portGuid: '0xe41d2d03007c0002', numPorts: 1, lid: 3 }
        ]
      },
      {
        hostname: 'dgx-h100-02',
        hcas: [
          { caType: 'mlx5_0', portGuid: '0xe41d2d03007c0011', numPorts: 1, lid: 4 },
          { caType: 'mlx5_1', portGuid: '0xe41d2d03007c0012', numPorts: 1, lid: 5 }
        ]
      },
      {
        hostname: 'dgx-h100-03',
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
  // Fault state: null = normal free-play; string = active scenario ID
  // ---------------------------------------------------------------------------
  var _activeFault = null;

  // ---------------------------------------------------------------------------
  // Mutable per-port counter state for the read->fix->reverify loop.
  // Keyed by LID (number). Each entry: { counter, base, delta, reads, frozen }
  // Optional second counter: counter2, base2, delta2
  // Seeded by setFault(); reset by clearFault().
  // ---------------------------------------------------------------------------
  var _portState = {};

  // ---------------------------------------------------------------------------
  // Remedy map: action string -> { fault, lid }
  // Used by applyFix to decide if the correct remedy was applied.
  // ---------------------------------------------------------------------------
  var REMEDY_MAP = {
    'replace-cable':     { fault: 'ber',        lid: 7 },
    'resolve-sm':        { fault: 'dualmaster',  lid: null, clears: true },
    'fix-pkey':          { fault: 'pkey',        lid: 5 },
    'fix-congestion':    { fault: 'congestion',  lid: 2 },
    'reseat-link':       { fault: 'linkflap',    lid: 4 },
    'set-updn-routing':  { fault: 'creditloop',  lid: null, clears: true },
    'set-mtu-4096':      { fault: 'mtu',         lid: null, clears: true },
    'restart-sharp-am':  { fault: 'sharp',       lid: null, clears: true }
  };

  // ---------------------------------------------------------------------------
  // Scenario fault definitions.
  // Each key matches a scenario ID used in the HTML picker.
  // Each entry provides overrides for one or more command handlers.
  // ---------------------------------------------------------------------------
  var FAULT_OUTPUTS = {

    // Scenario 1: Bad cable / high BER
    'ber': {
      ibdiagnet: function (parsed) {
        // If lid 7 port state is frozen (cable replaced), report clean
        var ps7 = _portState[7];
        if (ps7 && ps7.frozen) {
          return cmdIbdiagnet(parsed);
        }
        var base = '\n';
        base += '-I- -------------------------\n';
        base += '-I- START: ibdiagnet (fabric diagnostics)\n';
        base += '-I- -------------------------\n\n';
        base += '-I- Using port 1 as the local port\n';
        base += '-I- Discovering ...\n';
        base += '-I- Discovering done. 7 nodes found (1 switch, 6 CAs)\n';
        base += '-I- 6 links discovered\n\n';
        base += '-I- Link-width check (all links):\n';
        base += '-I-   QM9700[1] -- dgx-h100-01/mlx5_0[1]   4X NDR   HEALTHY\n';
        base += '-I-   QM9700[2] -- dgx-h100-01/mlx5_1[1]   4X NDR   HEALTHY\n';
        base += '-I-   QM9700[3] -- dgx-h100-02/mlx5_0[1]   4X NDR   HEALTHY\n';
        base += '-I-   QM9700[4] -- dgx-h100-02/mlx5_1[1]   4X NDR   HEALTHY\n';
        base += '-I-   QM9700[5] -- dgx-h100-03/mlx5_0[1]   4X NDR   HEALTHY\n';
        base += '-I-   QM9700[6] -- dgx-h100-03/mlx5_1[1]   4X NDR   DEGRADED\n';
        base += '\n';
        base += '-E- BER (Bit Error Rate) check:\n';
        base += '-E-   dgx-h100-03/mlx5_1 [lid 7] port 1: BER exceeds threshold\n';
        base += '-E-   Measured BER: 3.2e-11  Threshold: 1e-12\n';
        base += '-E-   SymbolErrorCounter delta: 48712 in last 60s\n';
        base += '-E-   Recommendation: replace cable or SFP on this port\n';
        base += '\n';
        base += '-I- Credit-loop check: PASS\n';
        base += '-I- Routing check: PASS\n\n';
        base += '-I- -----------------------------------------------\n';
        base += '-W- Total critical errors: 1\n';
        base += '-W- Total warnings:        0\n';
        base += '-I- See report in /tmp/ibdiagnet2\n';
        base += '-I- Done\n';
        return base;
      },
      perfquery: function (parsed) {
        var lid = parseInt(parsed.args[0], 10) || 2;
        var port = parseInt(parsed.args[1], 10) || 1;
        var c = _perfCounters(lid, port);
        var ps = _portState[lid];
        // Compute value using current reads count, THEN increment for next call.
        // First read returns base (reads=0 -> base + delta*0 = base).
        var out = '# Port counters: Lid ' + lid + ' port ' + port + '\n';
        out += 'PortSelect:......................' + port + '\n';
        out += 'PortXmitData:....................' + c.xmitData + '\n';
        out += 'PortRcvData:...................' + c.rcvData + '\n';
        out += 'PortXmitPkts:....................' + c.xmitPkts + '\n';
        out += 'PortRcvPkts:...................' + c.rcvPkts + '\n';
        out += 'PortUnicastXmitPkts:.............' + c.xmitPkts + '\n';
        out += 'PortUnicastRcvPkts:..............' + c.rcvPkts + '\n';
        out += 'PortMulticastXmitPkts:...........0\n';
        out += 'PortMulticastRcvPkts:............0\n';
        // BER fault: elevated SymbolErrorCounter on lid 7; driven by _portState when seeded
        var symErr;
        if (ps && ps.counter === 'SymbolErrorCounter') {
          symErr = ps.base + ps.delta * ps.reads;
        } else {
          symErr = (lid === 7) ? 48712 : 0;
        }
        out += 'SymbolErrorCounter:..............' + symErr + '\n';
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
        if (ps && !ps.frozen) { ps.reads++; }
        return out;
      }
    },

    // Scenario 2: Link flap
    'linkflap': {
      perfquery: function (parsed) {
        var lid = parseInt(parsed.args[0], 10) || 2;
        var port = parseInt(parsed.args[1], 10) || 1;
        var c = _perfCounters(lid, port);
        var ps = _portState[lid];
        // Compute value using current reads count, THEN increment for next call.
        // First read returns base (reads=0 -> base + delta*0 = base).
        var out = '# Port counters: Lid ' + lid + ' port ' + port + '\n';
        out += 'PortSelect:......................' + port + '\n';
        out += 'PortXmitData:....................' + c.xmitData + '\n';
        out += 'PortRcvData:...................' + c.rcvData + '\n';
        out += 'PortXmitPkts:....................' + c.xmitPkts + '\n';
        out += 'PortRcvPkts:...................' + c.rcvPkts + '\n';
        out += 'PortUnicastXmitPkts:.............' + c.xmitPkts + '\n';
        out += 'PortUnicastRcvPkts:..............' + c.rcvPkts + '\n';
        out += 'PortMulticastXmitPkts:...........0\n';
        out += 'PortMulticastRcvPkts:............0\n';
        out += 'SymbolErrorCounter:..............0\n';
        // Link flap: high LinkErrorRecovery + LinkDowned on lid 4; driven by _portState when seeded
        var ler, ldc;
        if (ps && ps.counter === 'LinkErrorRecoveryCounter') {
          ler = ps.base + ps.delta * ps.reads;
          ldc = ps.counter2 ? (ps.base2 + ps.delta2 * ps.reads) : (lid === 4 ? 47 : 0);
        } else {
          ler = (lid === 4) ? 312 : 0;
          ldc = (lid === 4) ? 47 : 0;
        }
        out += 'LinkErrorRecoveryCounter:........' + ler + '\n';
        out += 'LinkDownedCounter:...............' + ldc + '\n';
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
        if (ps && !ps.frozen) { ps.reads++; }
        return out;
      },
      iblinkinfo: function (parsed) {
        var out = 'Switch ' + FABRIC.switchGuid + ' "' + FABRIC.switchModel + '":\n';
        out += '      ' + FABRIC.switchGuid + '         \t   1    2    dgx-h100-01/mlx5_0         [1] ==>   0xe41d2d03007c0001    [1](  4X NDR  Active/ LinkUp)\n';
        out += '      ' + FABRIC.switchGuid + '         \t   2    3    dgx-h100-01/mlx5_1         [2] ==>   0xe41d2d03007c0002    [1](  4X NDR  Active/ LinkUp)\n';
        out += '      ' + FABRIC.switchGuid + '         \t   3    4    dgx-h100-02/mlx5_0         [3] ==>   0xe41d2d03007c0011    [1](  4X NDR  Active/ Polling)\n';
        out += '      ' + FABRIC.switchGuid + '         \t   4    5    dgx-h100-02/mlx5_1         [4] ==>   0xe41d2d03007c0012    [1](  4X NDR  Active/ LinkUp)\n';
        out += '      ' + FABRIC.switchGuid + '         \t   5    6    dgx-h100-03/mlx5_0         [5] ==>   0xe41d2d03007c0021    [1](  4X NDR  Active/ LinkUp)\n';
        out += '      ' + FABRIC.switchGuid + '         \t   6    7    dgx-h100-03/mlx5_1         [6] ==>   0xe41d2d03007c0022    [1](  4X NDR  Active/ LinkUp)\n';
        return out;
      }
    },

    // Scenario 3: SM dual-master / priority conflict
    'dualmaster': {
      sminfo: function (parsed) {
        var out = 'sminfo: sm lid 1 sm guid 0xe41d2d0300100001, ';
        out += 'activity count 1234568 priority 15 state 3 SMINFO_MASTER\n';
        out += '\n';
        out += '# WARNING: A second SM was detected in the fabric:\n';
        out += 'sminfo: sm lid 8 sm guid 0xe41d2d0300200001, ';
        out += 'activity count 891023 priority 13 state 3 SMINFO_MASTER\n';
        out += '\n';
        out += '# FAULT: Two simultaneous SMINFO_MASTER SMs detected.\n';
        out += '# Both believe they are master. Fabric instability likely.\n';
        return out;
      },
      ibdiagnet: function (parsed) {
        var out = '\n';
        out += '-I- -------------------------\n';
        out += '-I- START: ibdiagnet (fabric diagnostics)\n';
        out += '-I- -------------------------\n\n';
        out += '-I- Using port 1 as the local port\n';
        out += '-I- Discovering ...\n';
        out += '-I- Discovering done. 7 nodes found (1 switch, 6 CAs)\n';
        out += '-I- 6 links discovered\n\n';
        out += '-E- SM state check:\n';
        out += '-E-   Multiple Subnet Managers detected in MASTER state\n';
        out += '-E-   LID 1  GUID 0xe41d2d0300100001  priority 15  MASTER\n';
        out += '-E-   LID 8  GUID 0xe41d2d0300200001  priority 13  MASTER\n';
        out += '-E-   Dual-master condition detected. Resolve by disabling or adjusting SM priority.\n\n';
        out += '-I- Link-width check (all links): PASS\n';
        out += '-I- Credit-loop check: PASS\n';
        out += '-I- Routing check: PASS\n\n';
        out += '-I- -----------------------------------------------\n';
        out += '-W- Total critical errors: 1\n';
        out += '-W- Total warnings:        0\n';
        out += '-I- See report in /tmp/ibdiagnet2\n';
        out += '-I- Done\n';
        return out;
      }
    },

    // Scenario 4: Congestion hotspot (PortXmitWait / incast)
    'congestion': {
      perfquery: function (parsed) {
        var lid = parseInt(parsed.args[0], 10) || 2;
        var port = parseInt(parsed.args[1], 10) || 1;
        var c = _perfCounters(lid, port);
        var ps = _portState[lid];
        // Compute value using current reads count, THEN increment for next call.
        // First read returns base (reads=0 -> base + delta*0 = base).
        var out = '# Port counters: Lid ' + lid + ' port ' + port + '\n';
        out += 'PortSelect:......................' + port + '\n';
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
        // Congestion: high PortXmitWait and PortXmitDiscards on lid 2; driven by _portState when seeded
        var xwait, xdisc;
        if (ps && ps.counter === 'PortXmitWait') {
          xwait = ps.base + ps.delta * ps.reads;
          xdisc = ps.counter2 ? (ps.base2 + ps.delta2 * ps.reads) : (lid === 2 ? 14823 : 0);
        } else {
          xwait = (lid === 2) ? 8473291 : 0;
          xdisc = (lid === 2) ? 14823 : 0;
        }
        out += 'PortXmitDiscards:................' + xdisc + '\n';
        out += 'PortXmitConstraintErrors:........0\n';
        out += 'PortRcvConstraintErrors:.........0\n';
        out += 'LocalLinkIntegrityErrors:........0\n';
        out += 'ExcessiveBufferOverrunErrors:....0\n';
        out += 'VL15Dropped:.....................0\n';
        out += 'PortXmitWait:....................' + xwait + '\n';
        if (ps && !ps.frozen) { ps.reads++; }
        return out;
      }
    },

    // Scenario 5: Credit loop (routing validation failure)
    'creditloop': {
      ibdiagnet: function (parsed) {
        var out = '\n';
        out += '-I- -------------------------\n';
        out += '-I- START: ibdiagnet (fabric diagnostics)\n';
        out += '-I- -------------------------\n\n';
        out += '-I- Using port 1 as the local port\n';
        out += '-I- Discovering ...\n';
        out += '-I- Discovering done. 7 nodes found (1 switch, 6 CAs)\n';
        out += '-I- 6 links discovered\n\n';
        out += '-I- Link-width check (all links): PASS\n\n';
        out += '-I- Credit-loop check (ibdiagnet -r):\n';
        out += '-E-   Credit loop detected in virtual lane routing\n';
        out += '-E-   Path: dgx-h100-01 -> sw-leaf-01 -> sw-spine-01 -> sw-leaf-01 -> dgx-h100-02\n';
        out += '-E-   UpDown routing violation: Down->Up->Down path forbidden\n';
        out += '-E-   Affected LIDs: 2, 4, 6\n';
        out += '-E-   Fabric may deadlock under sustained load\n\n';
        out += '-I- Routing check: FAIL\n\n';
        out += '-I- -----------------------------------------------\n';
        out += '-W- Total critical errors: 1\n';
        out += '-W- Total warnings:        0\n';
        out += '-I- See report in /tmp/ibdiagnet2\n';
        out += '-I- Done\n';
        return out;
      }
    },

    // Scenario 6: PKey mismatch
    'pkey': {
      perfquery: function (parsed) {
        var lid = parseInt(parsed.args[0], 10) || 2;
        var port = parseInt(parsed.args[1], 10) || 1;
        var c = _perfCounters(lid, port);
        var ps = _portState[lid];
        // Compute value using current reads count, THEN increment for next call.
        // First read returns base (reads=0 -> base + delta*0 = base).
        var out = '# Port counters: Lid ' + lid + ' port ' + port + '\n';
        out += 'PortSelect:......................' + port + '\n';
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
        // PKey fault: PortRcvConstraintErrors elevated on lid 5; driven by _portState when seeded
        var pkeyVal;
        if (ps && ps.counter === 'PortRcvConstraintErrors') {
          pkeyVal = ps.base + ps.delta * ps.reads;
        } else {
          pkeyVal = (lid === 5) ? 9341 : 0;
        }
        out += 'PortRcvConstraintErrors:.........' + pkeyVal + '\n';
        out += 'LocalLinkIntegrityErrors:........0\n';
        out += 'ExcessiveBufferOverrunErrors:....0\n';
        out += 'VL15Dropped:.....................0\n';
        out += 'PortXmitWait:....................0\n';
        if (ps && !ps.frozen) { ps.reads++; }
        return out;
      },
      ibdiagnet: function (parsed) {
        // If lid 5 port state is frozen (pkey fixed), report clean
        var ps5 = _portState[5];
        if (ps5 && ps5.frozen) {
          return cmdIbdiagnet(parsed);
        }
        var out = '\n';
        out += '-I- -------------------------\n';
        out += '-I- START: ibdiagnet (fabric diagnostics)\n';
        out += '-I- -------------------------\n\n';
        out += '-I- Using port 1 as the local port\n';
        out += '-I- Discovering ...\n';
        out += '-I- Discovering done. 7 nodes found (1 switch, 6 CAs)\n';
        out += '-I- 6 links discovered\n\n';
        out += '-I- Link-width check (all links): PASS\n';
        out += '-I- Credit-loop check: PASS\n';
        out += '-I- Routing check: PASS\n\n';
        out += '-W- PKey membership check:\n';
        out += '-W-   dgx-h100-02/mlx5_1 [lid 5]: PKey 0x8001 membership type FULL\n';
        out += '-W-   dgx-h100-02/mlx5_1 [lid 5]: PKey 0x7FFF membership type LIMITED\n';
        out += '-W-   Mismatch: peer uses 0x8001 FULL; this port uses 0x7FFF LIMITED\n';
        out += '-W-   bad_pkey_cntr increments expected. Traffic will be dropped.\n\n';
        out += '-I- -----------------------------------------------\n';
        out += '-W- Total critical errors: 0\n';
        out += '-W- Total warnings:        1\n';
        out += '-I- See report in /tmp/ibdiagnet2\n';
        out += '-I- Done\n';
        return out;
      }
    },

    // Scenario 7: MTU mismatch
    'mtu': {
      ibstat: function (parsed) {
        if (hasFlag(parsed.flags, 'V', 'version')) return 'ibstat 5.9-0';
        var out = '';
        // mlx5_0: normal 4096 MTU
        out += 'CA \'mlx5_0\'\n';
        out += '\tCA type: MT4129\n';
        out += '\tNumber of ports: 1\n';
        out += '\tFirmware version: 28.39.1002\n';
        out += '\tHardware version: 0\n';
        out += '\tNode GUID: 0xe41d2d03007c0001\n';
        out += '\tSystem image GUID: 0xe41d2d03007c0001\n';
        out += '\tPort 1:\n';
        out += '\t\tState: Active\n';
        out += '\t\tPhysical state: LinkUp\n';
        out += '\t\tRate: 400 Gb/sec (4X NDR)\n';
        out += '\t\tBase lid: 2\n';
        out += '\t\tLMC: 0\n';
        out += '\t\tSM lid: 1\n';
        out += '\t\tCapability mask: 0x04010000\n';
        out += '\t\tPort GUID: 0xe41d2d03007c0001\n';
        out += '\t\tLink layer: InfiniBand\n';
        out += '\t\tActive MTU: 4096\n';
        // mlx5_1: mismatched MTU 2048 vs peer 4096
        out += '\nCA \'mlx5_1\'\n';
        out += '\tCA type: MT4129\n';
        out += '\tNumber of ports: 1\n';
        out += '\tFirmware version: 28.39.1002\n';
        out += '\tHardware version: 0\n';
        out += '\tNode GUID: 0xe41d2d03007c0002\n';
        out += '\tSystem image GUID: 0xe41d2d03007c0002\n';
        out += '\tPort 1:\n';
        out += '\t\tState: Active\n';
        out += '\t\tPhysical state: LinkUp\n';
        out += '\t\tRate: 400 Gb/sec (4X NDR)\n';
        out += '\t\tBase lid: 3\n';
        out += '\t\tLMC: 0\n';
        out += '\t\tSM lid: 1\n';
        out += '\t\tCapability mask: 0x04010000\n';
        out += '\t\tPort GUID: 0xe41d2d03007c0002\n';
        out += '\t\tLink layer: InfiniBand\n';
        out += '\t\tActive MTU: 2048\n';
        out += '\t\t# WARNING: Active MTU (2048) does not match fabric MTU (4096)\n';
        return out;
      },
      ibdiagnet: function (parsed) {
        var out = '\n';
        out += '-I- -------------------------\n';
        out += '-I- START: ibdiagnet (fabric diagnostics)\n';
        out += '-I- -------------------------\n\n';
        out += '-I- Using port 1 as the local port\n';
        out += '-I- Discovering ...\n';
        out += '-I- Discovering done. 7 nodes found (1 switch, 6 CAs)\n';
        out += '-I- 6 links discovered\n\n';
        out += '-I- Link-width check (all links): PASS\n\n';
        out += '-W- MTU check:\n';
        out += '-W-   Fabric MTU: 4096 bytes\n';
        out += '-W-   dgx-h100-01/mlx5_1 [lid 3]: Active MTU 2048 -- MISMATCH\n';
        out += '-W-   MTU mismatch will cause ib_write_bw bandwidth cliff and QP errors\n\n';
        out += '-I- Credit-loop check: PASS\n';
        out += '-I- Routing check: PASS\n\n';
        out += '-I- -----------------------------------------------\n';
        out += '-W- Total critical errors: 0\n';
        out += '-W- Total warnings:        1\n';
        out += '-I- See report in /tmp/ibdiagnet2\n';
        out += '-I- Done\n';
        return out;
      }
    },

    // Scenario 8: SHARP AM failure
    'sharp': {
      ibdiagnet: function (parsed) {
        var sharFlag = hasFlag(parsed.flags, 'sharp') || (parsed.flags['sharp'] !== undefined);
        var out = '\n';
        out += '-I- -------------------------\n';
        out += '-I- START: ibdiagnet (fabric diagnostics)\n';
        out += '-I- -------------------------\n\n';
        out += '-I- Using port 1 as the local port\n';
        out += '-I- Discovering ...\n';
        out += '-I- Discovering done. 7 nodes found (1 switch, 6 CAs)\n';
        out += '-I- 6 links discovered\n\n';
        out += '-I- Link-width check (all links): PASS\n';
        out += '-I- Credit-loop check: PASS\n';
        out += '-I- Routing check: PASS\n\n';
        out += '-E- SHARP Aggregation Manager check:\n';
        out += '-E-   sharp_am.service: failed to bind on port 15500\n';
        out += '-E-   Error: EADDRINUSE -- port already in use or previous AM crashed\n';
        out += '-E-   SHARP tree not built. Collective operations (NCCL all-reduce) will fall back to point-to-point.\n';
        out += '-E-   Run: sharp_hello to test AM connectivity\n\n';
        out += '-I- -----------------------------------------------\n';
        out += '-W- Total critical errors: 1\n';
        out += '-W- Total warnings:        0\n';
        out += '-I- See report in /tmp/ibdiagnet2\n';
        out += '-I- Done\n';
        return out;
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Internal helpers (also used by fault outputs above)
  // ---------------------------------------------------------------------------

  // Build the link-local default GID from a port GUID.
  function gidFromGuid(portGuid) {
    var hex = portGuid.replace(/^0x/, '').toLowerCase();
    while (hex.length < 16) hex = '0' + hex;
    var iid = hex.slice(0, 4) + ':' + hex.slice(4, 8) + ':' +
              hex.slice(8, 12) + ':' + hex.slice(12, 16);
    return 'fe80:0000:0000:0000:' + iid;
  }

  // Format a LID as lowercase hex with 0x prefix (e.g. ibstatus style).
  function lidHex(lid) {
    return '0x' + lid.toString(16);
  }

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
  function _perfCounters(lid, portNum) {
    var seed = lid * 7919;
    return {
      xmitData: 500000000 + (seed % 500000000),
      rcvData: 450000000 + ((seed * 3) % 500000000),
      xmitPkts: 5000000 + (seed % 5000000),
      rcvPkts: 4800000 + ((seed * 3) % 5000000),
      portNum: portNum
    };
  }

  // Keep the original name for backward compat
  var perfCounters = _perfCounters;

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
  // Command implementations (normal / free-play mode)
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
        out += '\t\tRate: ' + port.rate + ' Gb/sec (4X ' + ibStandardName(port.rate) + ')\n';
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
        out += '\tdefault gid:\t ' + gidFromGuid(port.portGuid) + '\n';
        out += '\tbase lid:\t' + lidHex(port.lid) + '\n';
        out += '\tsm lid:\t\t' + lidHex(port.smLid) + '\n';
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

    var sw = FABRIC;
    var out = 'Switch ' + sw.switchGuid + ' "' + sw.switchModel + '":\n';

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

    out += '# Channel Adapters (HCAs)\n';
    FABRIC.nodes.forEach(function (node) {
      node.hcas.forEach(function (hca) {
        out += 'Ca\t' + hca.numPorts + ' "' + hca.portGuid + '"\t# "' + node.hostname + '/' + hca.caType + '"\n';
        out += '[1]\t"' + FABRIC.switchGuid + '"[' + (hca.lid - 1) + ']\t\t# lid ' + hca.lid + ' lmc 0 "' + node.hostname + '" Active\n';
        out += '\n';
      });
    });

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

    var lid = parsed.args[0] || '2';
    var portArg = parsed.args[1] || '1';
    var lidNum = parseInt(lid, 10);
    if (isNaN(lidNum)) lidNum = 2;

    var c = perfCounters(lidNum, parseInt(portArg, 10) || 1);

    // Mutable-counter climb: check _portState for this lid.
    // Compute value using current reads count, THEN increment for next call.
    // First read returns base (reads=0 -> base + delta*0 = base).
    var ps = _portState[lidNum];

    // Compute driven counter values from _portState if seeded (using reads before increment)
    var driven = {};
    if (ps) {
      driven[ps.counter] = ps.base + ps.delta * ps.reads;
      if (ps.counter2) {
        driven[ps.counter2] = ps.base2 + ps.delta2 * ps.reads;
      }
    }
    // Increment AFTER computing so next call sees a higher value
    if (ps && !ps.frozen) { ps.reads++; }

    function dv(field, fallback) {
      return (driven[field] !== undefined) ? driven[field] : fallback;
    }

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
    out += 'SymbolErrorCounter:..............' + dv('SymbolErrorCounter', 0) + '\n';
    out += 'LinkErrorRecoveryCounter:........' + dv('LinkErrorRecoveryCounter', 0) + '\n';
    out += 'LinkDownedCounter:...............' + dv('LinkDownedCounter', 0) + '\n';
    out += 'PortRcvErrors:...................0\n';
    out += 'PortRcvRemotePhysicalErrors:.....0\n';
    out += 'PortRcvSwitchRelayErrors:........0\n';
    out += 'PortXmitDiscards:................' + dv('PortXmitDiscards', 0) + '\n';
    out += 'PortXmitConstraintErrors:........0\n';
    out += 'PortRcvConstraintErrors:.........' + dv('PortRcvConstraintErrors', 0) + '\n';
    out += 'LocalLinkIntegrityErrors:........0\n';
    out += 'ExcessiveBufferOverrunErrors:....0\n';
    out += 'VL15Dropped:.....................0\n';
    out += 'PortXmitWait:....................' + dv('PortXmitWait', 0) + '\n';
    return out;
  }

  function cmdIbdiagnet(parsed) {
    if (hasFlag(parsed.flags, 'V', 'version')) return 'ibdiagnet 2.9.0';

    var totalHcas = FABRIC.nodes.reduce(function (s, n) { return s + n.hcas.length; }, 0);
    var totalLinks = totalHcas;

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
     * If a fault is active and overrides this command, returns faulty output.
     * The first token is the command name; remaining tokens are args/flags.
     */
    run: function (cmdString) {
      if (typeof cmdString !== 'string' || !cmdString.trim()) {
        return '';
      }
      var parsed = parseCmd(cmdString);

      // Check fault overrides first
      if (_activeFault && FAULT_OUTPUTS[_activeFault]) {
        var faultOverride = FAULT_OUTPUTS[_activeFault][parsed.cmd];
        if (faultOverride) {
          try {
            return faultOverride(parsed);
          } catch (e) {
            return 'Error running ' + parsed.cmd + ' (fault mode): ' + (e.message || String(e));
          }
        }
      }

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
     * setFault(id) -> activate a named fault scenario.
     * Seeds _portState for faults that have a mutable climb loop.
     * Pass null or call clearFault() to return to free-play.
     */
    setFault: function (id) {
      _activeFault = id || null;
      // Seed mutable port state for loop faults; reset first so re-seeding is clean.
      _portState = {};
      switch (id) {
        case 'ber':
          _portState[7] = { counter: 'SymbolErrorCounter', base: 48712, delta: 5200, reads: 0, frozen: false };
          break;
        case 'pkey':
          _portState[5] = { counter: 'PortRcvConstraintErrors', base: 9341, delta: 880, reads: 0, frozen: false };
          break;
        case 'congestion':
          _portState[2] = {
            counter: 'PortXmitWait', base: 8473291, delta: 240000, reads: 0, frozen: false,
            counter2: 'PortXmitDiscards', base2: 14823, delta2: 410
          };
          break;
        case 'linkflap':
          _portState[4] = {
            counter: 'LinkErrorRecoveryCounter', base: 312, delta: 18, reads: 0, frozen: false,
            counter2: 'LinkDownedCounter', base2: 47, delta2: 2
          };
          break;
        default:
          // dualmaster, creditloop, mtu, sharp: no port climb state needed
          break;
      }
    },

    /**
     * clearFault() -> deactivate any active fault; return to free-play mode.
     * Resets _portState so next setFault starts fresh.
     */
    clearFault: function () {
      _activeFault = null;
      _portState = {};
    },

    /**
     * activeFault() -> current fault ID or null.
     */
    activeFault: function () {
      return _activeFault;
    },

    /**
     * fabric() -> the raw FABRIC object for inspection or extension.
     */
    fabric: function () {
      return FABRIC;
    },

    /**
     * applyFix(lid, action) -> { ok:boolean, msg:string }
     * Freezes the climb on lid IFF action is the correct remedy for the active fault.
     * Correct fix: sets _portState[lid].frozen = true (counter holds, ibdiagnet clean).
     * Wrong action: returns ok:false, counter keeps climbing.
     * Special case: 'resolve-sm' for dualmaster clears _activeFault (no climbing port).
     */
    applyFix: function (lid, action) {
      var remedy = REMEDY_MAP[action];
      if (!remedy) {
        return { ok: false, msg: 'Unknown action: ' + action };
      }
      if (remedy.fault !== _activeFault) {
        return { ok: false, msg: 'Action "' + action + '" does not address the active fault (' + _activeFault + ')' };
      }
      // Clear-fault remedies: no climbing port, just wipe the fault state
      if (action === 'resolve-sm' || remedy.clears) {
        _activeFault = null;
        _portState = {};
        if (action === 'resolve-sm') {
          return { ok: true, msg: 'SM priority resolved. Single SMINFO_MASTER confirmed.' };
        }
        if (action === 'set-updn-routing') {
          return { ok: true, msg: 'Routing corrected, credit loop cleared.' };
        }
        if (action === 'set-mtu-4096') {
          return { ok: true, msg: 'MTU aligned to 4096, fabric consistent.' };
        }
        if (action === 'restart-sharp-am') {
          return { ok: true, msg: 'sharp_am restarted, aggregation trees rebuilt.' };
        }
        return { ok: true, msg: 'Fault cleared.' };
      }
      // For climbing-port faults, check lid matches
      if (remedy.lid !== lid) {
        return { ok: false, msg: 'Action "' + action + '" targets lid ' + remedy.lid + ', not lid ' + lid };
      }
      var ps = _portState[lid];
      if (!ps) {
        return { ok: false, msg: 'No mutable port state found for lid ' + lid };
      }
      ps.frozen = true;
      return { ok: true, msg: 'Fix applied. Counter climb frozen on lid ' + lid + '. Run ibdiagnet to verify clean.' };
    },

    /**
     * portFrozen(lid) -> boolean
     * True once applyFix has frozen the climb on this lid (correct fix was applied).
     * Used by checkObjectives() for the REVERIFY step.
     */
    portFrozen: function (lid) {
      return !!(_portState[lid] && _portState[lid].frozen);
    },

    /**
     * portReads(lid) -> number
     * Number of times this lid's perfquery has been read while broken.
     * Objective check uses portReads(lid) >= 2 to confirm "queried twice."
     */
    portReads: function (lid) {
      return _portState[lid] ? _portState[lid].reads : 0;
    }
  };

  global.IBTools = IBTools;

}(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this)));
