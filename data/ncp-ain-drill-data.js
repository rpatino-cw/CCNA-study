/* ══════════════════════════════════════════════════════════════════════
   ncp-ain-drill-data.js  Content pool for NCP-AIN Daily Drill.
   NVIDIA NCP-AIN v1.0 exam. 7-day rotation, date-seeded.
   Exposes: window.NCPAIN_DRILL
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── 7 rotation themes (index 0-6 = day%7 0-6) ───────────────────
  // wildcardRound: true = final block is walk-away Q/A; false = Pairs lightning
  var THEMES = [
    { id: 1, label: 'IB Core',                 badge: 'D3 30%',  wildcardRound: false },
    { id: 2, label: 'Spectrum-X / RoCE',        badge: 'D2 30%',  wildcardRound: false },
    { id: 3, label: 'Congestion: PFC/ECN/DCQCN',badge: 'D2 30%',  wildcardRound: true  },
    { id: 4, label: 'Troubleshooting Tools',    badge: 'D4 20%',  wildcardRound: false },
    { id: 5, label: 'Automation / NVUE',        badge: 'D5 10%',  wildcardRound: true  },
    { id: 6, label: 'K8s + DPU',               badge: 'D6 5%',   wildcardRound: false },
    { id: 7, label: 'Design + Collectives',     badge: 'D1+D3 5%',wildcardRound: true  }
  ];

  // ── Numbers tables: must-memorize NCP-AIN values ─────────────────
  var NUMBERS = {

    IB_SPEEDS: [
      { label: 'SDR  1x lane / 4x aggregate',    value: '2.5 / 10 Gb/s',   note: '8b/10b NRZ; 20% overhead; usable 8 Gb/s at 4x' },
      { label: 'DDR  1x lane / 4x aggregate',    value: '5 / 20 Gb/s',     note: '8b/10b NRZ; usable 16 Gb/s at 4x' },
      { label: 'QDR  1x lane / 4x aggregate',    value: '10 / 40 Gb/s',    note: '8b/10b NRZ; usable 32 Gb/s at 4x' },
      { label: 'FDR  1x lane / 4x aggregate',    value: '14.0625 / 56.25 Gb/s', note: '64b/66b NRZ; about 3% overhead; marketed as 56G' },
      { label: 'FDR10 1x lane / 4x aggregate',   value: '10.3125 / 40 Gb/s',note: '64b/66b NRZ; 40G aggregate same as QDR but different encoding' },
      { label: 'EDR  1x lane / 4x aggregate',    value: '25.78125 / 100 Gb/s', note: '64b/66b NRZ; about 3% overhead; rounds to 100G' },
      { label: 'HDR  1x lane / 4x aggregate',    value: '53.125 / 200 Gb/s',note: '256b/257b PAM4; about 0.4% overhead; effective 200G' },
      { label: 'NDR  1x lane / 4x aggregate',    value: '106.25 / 400 Gb/s',note: '256b/257b PAM4; about 0.4% overhead; effective 400G' },
      { label: 'XDR  1x lane / 4x aggregate',    value: '212.5 / 800 Gb/s', note: '256b/257b PAM4; effective 800G; requires ConnectX-8 + Quantum-X800' }
    ],

    PORTS_AND_KEYS: [
      { label: 'RoCEv2 destination port',         value: 'UDP 4791',    note: 'BTH encapsulated in IP/UDP; L3 routable' },
      { label: 'VXLAN destination port',           value: 'UDP 4789',    note: '24-bit VNI; MAC-in-UDP; used by Spectrum EVPN' },
      { label: 'SHARP AM client port',             value: 'TCP 6126',    note: 'libsharp apps connect to sharp_am on this port' },
      { label: 'RoCEv1 EtherType',                 value: '0x8915',      note: 'L2-only, no IP header; replaced by RoCEv2 for routable fabrics' },
      { label: 'PKey default partition (limited)', value: '0x7FFF',      note: 'MSB 0 = limited member; cannot talk to another limited member' },
      { label: 'PKey default partition (full)',    value: '0xFFFF',      note: 'MSB 1 = full member; 0xFFFF = full member of default partition' },
      { label: 'LID unicast range',               value: '0x0001 to 0xBFFF', note: 'About 48K unicast LIDs; 0x0000 = unassigned' },
      { label: 'SM priority range',               value: '0 to 15',     note: '4-bit field; default 0 (lowest); highest wins; tie = lower GUID' }
    ],

    MTU_VALUES: [
      { label: 'IB MTU values (enum)',    value: '256 / 512 / 1024 / 2048 / 4096 bytes', note: 'PortInfo ActiveMTU; mismatch causes ib_write_bw bandwidth cliff' },
      { label: 'Ethernet jumbo (RoCE)',   value: '9216 bytes',  note: 'Recommended MTU end-to-end for RoCEv2 lossless fabric' },
      { label: 'Default Ethernet MTU',   value: '1500 bytes',  note: 'Too small for RoCE; forces fragmentation and performance loss' }
    ],

    ECN_THRESHOLDS: [
      { label: 'ECN Kmin (TC0 and TC3)',  value: '146.48 KB',   note: 'Queue depth at which ECN marking starts (CE bit set)' },
      { label: 'ECN Kmax (TC0 and TC3)',  value: '1.43 MB',     note: 'Queue depth at which 100% of packets are CE-marked (also expressed as 1,501,500 bytes on TC3)' },
      { label: 'ECN probability at Kmax', value: '100%',        note: 'All packets CE-marked above Kmax; default nv set qos roce applies this' },
      { label: 'ECN enabled traffic classes', value: 'TC0 and TC3', note: 'Both TCs get ECN; RoCE data on TC3 (DSCP 26 / SP3)' },
      { label: 'PFC enabled switch-priority', value: 'SP3 (priority 3)', note: 'LLDP App TLV: protocol 4791 UDP priority 3; PFC pauses SP3 only' },
      { label: 'RoCE CNP traffic class',  value: 'TC6 strict priority', note: 'CNP scheduling is strict so CNPs are never delayed or dropped' },
      { label: 'RoCE data DWRR share',    value: 'TC3 DWRR 50%', note: 'Other traffic on TC0 also gets DWRR 50%' }
    ],

    SM_AND_ROUTING: [
      { label: 'SM priority range',             value: '0 to 15',       note: '4-bit; highest wins; equal priority = lower GUID wins (IB spec)' },
      { label: 'SM default priority',           value: '0',             note: 'opensm.conf sm_priority 0; always set explicitly in production' },
      { label: 'SM failover default time',      value: 'up to 40 s',    note: '10000 ms polling timeout x 4 retries; tune to shorten' },
      { label: 'SM light sweep interval',       value: '10 s',          note: 'Monitors port state; triggers heavy sweep on change; does NOT reprogram LFTs' },
      { label: 'LMC range',                     value: '0 to 7',        note: '2^LMC LIDs per port; LMC 2 = 4 LIDs per port for multipath' },
      { label: 'sminfo state codes',            value: '0/1/2/3',       note: '0=not active, 1=discovering, 2=standby, 3=MASTER' },
      { label: 'Virtual Lanes range',           value: 'VL0 to VL15',   note: 'VL0-VL14 = data (credit-controlled); VL15 = SMP management only (no credits)' },
      { label: 'QM9700 / QM9790 port count',   value: '64x NDR400',    note: 'Both: 64 logical ports from 32 OSFP cages; 25.6 Tbps unidirectional' },
      { label: 'Quantum-2 bidirectional BW',   value: '51.2 Tbps',     note: 'NVIDIA markets bidirectional (full-duplex); 25.6T unidirectional also appears in docs' }
    ],

    SPECTRUM_X: [
      { label: 'Spectrum-4 aggregate bandwidth', value: '51.2 Tbps',    note: '64 OSFP x 800GbE; SN5600 2U switch' },
      { label: 'SN5600 breakout options',         value: '128x400G or 256x100/200G', note: 'Single 800G OSFP cage splits to 2x400G or 4x200G etc.' },
      { label: 'BF3 DPU ARM core count',          value: '16 cores',     note: 'Cortex-A78; BF3 SuperNIC = 8 cores (half); ConnectX-8 = 0 cores' },
      { label: 'ib_write_bw NDR expected floor',  value: '380+ Gb/s',    note: 'Below 380 = problem; 390-395 = normal transport overhead' },
      { label: 'ib_write_bw HDR expected floor',  value: '190+ Gb/s',    note: 'HDR 200G line rate; 190 Gb/s is a passing baseline' }
    ]
  };

  // ── Confusable-pairs: reuse NCPAIN_PAIRS from pillars-data ────────
  // At runtime window.NCPAIN_PAIRS is loaded by ncp-ain-pillars-data.js
  // which is included as a plain script before this file.
  // We access it lazily via NCPAIN_DRILL.getPairs().
  function getPairs() {
    if (window.NCPAIN_PAIRS && window.NCPAIN_PAIRS.length) {
      return window.NCPAIN_PAIRS;
    }
    // Fallback inline copy for pages that do not load pillars-data.js
    return [
      { clue:'Native IB transport, subnet-scoped, no IP header', a:'InfiniBand', b:'RoCEv2', ans:'InfiniBand' },
      { clue:'RDMA over UDP 4791, L3 routable, requires lossless Ethernet', a:'InfiniBand', b:'RoCEv2', ans:'RoCEv2' },
      { clue:'Open-source SM: LID/LFT only, no SHARP, no telemetry', a:'opensm', b:'UFM', ans:'opensm' },
      { clue:'Enterprise SM: SHARP trees, telemetry, REST API, required for QM9790', a:'opensm', b:'UFM', ans:'UFM' },
      { clue:'Link-level PAUSE per priority, reactive, last-resort drop prevention', a:'PFC', b:'ECN', ans:'PFC' },
      { clue:'CE bit marked in IP header, proactive, triggers DCQCN rate reduction', a:'PFC', b:'ECN', ans:'ECN' },
      { clue:'Offloads AllReduce INTO switch ASICs via aggregation tree', a:'SHARP', b:'NCCL', ans:'SHARP' },
      { clue:'GPU collective library running on host/GPU, uses network as a transport pipe', a:'SHARP', b:'NCCL', ans:'NCCL' },
      { clue:'Every leaf connects to every spine, 1:1 non-blocking bandwidth', a:'fat-tree', b:'rail-optimized', ans:'fat-tree' },
      { clue:'Each GPU NIC connects to a DIFFERENT leaf switch to distribute collective traffic', a:'fat-tree', b:'rail-optimized', ans:'rail-optimized' },
      { clue:'Has on-board ARM cores, runs its own OS, offloads networking from host CPU', a:'BlueField DPU', b:'ConnectX NIC', ans:'BlueField DPU' },
      { clue:'Pure NIC with RDMA and GPUDirect, no on-board ARM processing cores', a:'BlueField DPU', b:'ConnectX NIC', ans:'ConnectX NIC' },
      { clue:'Passive or active copper cable, max 2.5 m, lowest latency and cost', a:'DAC', b:'AOC', ans:'DAC' },
      { clue:'Active optical cable with integrated transceivers, 3-100 m range', a:'DAC', b:'AOC', ans:'AOC' },
      { clue:'Managed IB switch with on-board SM, 64x NDR400, 25.6 Tbps', a:'QM9700', b:'QM9790', ans:'QM9700' },
      { clue:'Unmanaged IB switch, 64x NDR400, requires external SM (UFM or opensm)', a:'QM9700', b:'QM9790', ans:'QM9790' },
      { clue:'IB 128-bit address = 64-bit subnet prefix + 64-bit GUID, global scope', a:'GID', b:'LID', ans:'GID' },
      { clue:'IB 16-bit address, subnet-local, 48000 unicast addresses', a:'GID', b:'LID', ans:'LID' },
      { clue:'NVIDIA IB switch ASIC family, Quantum-2 = NDR400', a:'Quantum', b:'Spectrum', ans:'Quantum' },
      { clue:'NVIDIA Ethernet switch ASIC family, Spectrum-4 = 51.2 Tbps 800G', a:'Quantum', b:'Spectrum', ans:'Spectrum' }
    ];
  }

  // ── Traps: common exam gotchas ────────────────────────────────────
  var TRAPS = [
    { q: 'perfquery error counters saturate. Why does that matter?',
      a: 'Basic PortCounters are narrow bit-width (e.g. SymbolErrorCounter is 16-bit, max 65535; LinkErrorRecovery and LinkDowned are 8-bit, max 255). Once saturated they stop incrementing. Use perfquery -x (PortCountersExtended) for 64-bit versions on capable hardware. Always reset with perfquery -x -R before measuring.' },
    { q: 'You run nv show qos roce and see mode: lossless. Is that the default?',
      a: 'Yes. The default operational mode string is lossless. The string lossless-single-ipool only appears if explicitly configured. Many students mistake lossless-single-ipool for the default because older docs describe it differently.' },
    { q: 'ftree and updn opensm routing engines: which forbidden turn breaks which?',
      a: 'updn enforces the forbidden turn rule: a packet that has gone DOWN toward leaves cannot go back UP toward spines. The exam sometimes reverses this (claiming UP-then-DOWN is forbidden). ftree is a separate algorithm designed for symmetrical fat-trees; it does NOT enforce a forbidden turn the same way updn does.' },
    { q: 'When does nv set qos roce state enabled take effect vs nv config apply?',
      a: 'nv set builds pending config only. nv config apply activates it. On Cumulus 5.9+ config apply also saves. On 5.8 and earlier you must run nv config save separately or changes are lost on reboot. The NVUE state enabled syntax requires CL 5.15+; pre-5.15 syntax is enable on.' },
    { q: 'busbw vs algbw: which do you compare to NIC line rate?',
      a: 'busbw = algbw * 2*(n-1)/n for AllReduce. At large n (16+ GPUs) the factor approaches 2.0. Only busbw is directly comparable to the NIC line rate because it corrects for the ring send-and-receive nature of AllReduce. algbw alone is a trap metric.' },
    { q: 'QM9700 vs QM9790: which requires an external SM?',
      a: 'QM9790 is the UNMANAGED switch; it has no onboard CPU and cannot run a local SM. It MUST have an external SM (UFM or standalone opensm on a host server). QM9700 is MANAGED with an onboard SM running MLNX-OS.' },
    { q: 'VL15 and credit-based flow control: what is different about VL15?',
      a: 'VL15 is reserved for Subnet Management Packets (SMP on QP0) only. It is NOT credit-flow-controlled: no credits, best-effort, hardware priority. Only VL0 through VL14 use credit-based flow control. Mapping an SL to VL15 in the SL2VL table means DROP, not send on the management lane.' },
    { q: 'What is the GUID tiebreak rule when two opensm instances have equal priority?',
      a: 'The numerically LOWER GUID wins the master election (IB spec C14-60.2.1, opensm source osm_sminfo_rcv.c). A common exam trap is claiming the higher GUID wins.' },
    { q: 'What does the 0x7FFF PKey value actually represent?',
      a: '0x7FFF is the default partition NUMBER (the low 15 bits) for a LIMITED member. 0xFFFF is the wire PKey for a FULL member of the default partition (MSB 1 = full, low 15 bits = 0x7FFF). They are not the same partition; the MSB is the membership bit.' },
    { q: 'WJH Buffer drops vs PFC: does Buffer catch PFC holds?',
      a: 'No. WJH Buffer category covers WRED and tail drop only. PFC holds backpressure upstream instead of dropping, so they do NOT appear in WJH at all. If you see Buffer drops it means packets were actually discarded, not just paused.' },
    { q: 'NicClusterPolicy name: what happens with a wrong name?',
      a: 'The Network Operator reconciles exactly ONE NicClusterPolicy named nic-cluster-policy. Any other name is silently ignored. This is a top K8s integration trap.' },
    { q: 'DAC cable: what is the max passive NDR reach?',
      a: 'Passive DAC tops out at 2 m for NDR 400G OSFP. Active copper (ACC) reaches 3 to 5 m. Claiming 3 m for a passive DAC is a trap; the extra meter requires an active cable with equalizer ICs.' }
  ];

  // ── Walk-away Q/A: short recall pairs from pillar bullets ─────────
  var WALK_AWAY = [
    { q: 'What port and protocol does RoCEv2 use?',
      a: 'UDP destination port 4791. Packet structure: ETH + IP + UDP(4791) + BTH + Payload + ICRC. L3 routable, unlike RoCEv1 which was L2-only (EtherType 0x8915).' },
    { q: 'What is the SHARP aggregation manager port and what does it require?',
      a: 'sharp_am listens on TCP 6126 for libsharp client connections. It requires either UFM or a dedicated host running an SM. There is no sharpd on compute nodes (removed in SHARP 2.7.0).' },
    { q: 'How does the SM assign LIDs in IB?',
      a: 'The SM assigns 16-bit LIDs. Unicast range: 0x0001 to 0xBFFF (about 48K). Multicast: 0xC000 to 0xFFFE. 0x0000 = unassigned. 0xFFFF = permissive LID.' },
    { q: 'What is a light sweep vs a heavy sweep in opensm?',
      a: 'Light sweep (default 10 s) monitors port-state changes and SM peers. It does NOT reprogram LFTs. A detected change triggers a heavy sweep, which does full rediscovery and reprograms all forwarding tables.' },
    { q: 'What are the three NVUE config states in order?',
      a: 'pending (candidate, built with nv set/unset) -> applied (running, activated with nv config apply) -> startup (persisted to /etc/nvue.d/startup.yaml with nv config save or auto-saved on CL 5.9+).' },
    { q: 'What is the ECN min and max threshold for lossless RoCE on Spectrum?',
      a: 'Kmin = 146.48 KB (CE marking starts), Kmax = 1.43 MB (100% of packets marked). Both apply to TC0 and TC3. Configured automatically by nv set qos roce.' },
    { q: 'What is Spectrum-X?',
      a: 'Spectrum-X = SN5600 switch (Spectrum-4 ASIC, 51.2 Tbps, 64x800G) plus BlueField-3 SuperNIC (400G) or ConnectX-8 SuperNIC (800G) plus NVIDIA software (DOCA, NetQ, Cumulus or SONiC). It is the Ethernet AI fabric, not to be confused with Quantum-X800 (the IB AI fabric).' },
    { q: 'What is the difference between the BF3 DPU and BF3 SuperNIC in terms of ARM cores?',
      a: 'BF3 DPU = 16 ARM Cortex-A78 cores. BF3 SuperNIC = 8 ARM Cortex-A78 cores (exactly half). ConnectX-8 SuperNIC = 0 ARM cores (pure NIC with integrated PCIe Gen 6 switch).' },
    { q: 'How many GPUs and compute NICs does a DGX H100 server have, and how many rails?',
      a: '8 GPUs, 8 single-port ConnectX-7 NDR 400G compute NICs (plus 2 dual-port for storage/mgmt = 10 total). 8 rails. Each compute NIC maps to one GPU and one rail leaf.' },
    { q: 'What is the busbw correction factor for AllReduce?',
      a: 'busbw = algbw * 2*(n-1)/n. For AllReduce with 16 GPUs: factor = 2*15/16 = 1.875. At large n it approaches 2.0. Only busbw (not algbw) is directly comparable to NIC line rate.' },
    { q: 'What ibdiagnet flag checks rail-optimized topology?',
      a: 'ibdiagnet --rail_optimized. Validates all HCAs on the same ToR leaf share the same PCIe BDF in their server. Output written to ibdiagnet2.rails.' },
    { q: 'What NVUE RBAC roles are built in and what can each do?',
      a: 'system-admin: full shell + nv commands + sudo. nvue-admin: nv show/set/unset/apply, no sudo. nvue-monitor: nv show only (read-only). There is no nvue-operator role.' },
    { q: 'What does the NicClusterPolicy CRD name must be?',
      a: 'Exactly nic-cluster-policy. Any other name is silently ignored by the Network Operator.' },
    { q: 'What IPoIB vs MACVLAN choice aligns with fabric type?',
      a: 'IPoIB CNI = native InfiniBand fabrics (parent device ibs1f0). MACVLAN + shared RDMA = Ethernet/RoCEv2 fabrics. Mixing them is a setup trap.' },
    { q: 'What is the SHARPv2 vs SHARPv3 difference?',
      a: 'SHARPv2 (Quantum/HDR) = one workload at a time per fabric. SHARPv3 (Quantum-2/NDR) = multiple parallel aggregation trees (multi-tenant). Do not attribute multi-tenant support to first-gen Quantum.' }
  ];

  // ── Concepts pool (per theme, tagged) ─────────────────────────────
  var CONCEPTS = [
    // Theme 1: IB Core
    { theme: 1,
      q: 'What is the difference between a GID and a LID in InfiniBand?',
      a: 'LID: 16-bit, subnet-local address (unicast 0x0001-0xBFFF, about 48K). GID: 128-bit global address = 64-bit subnet prefix + 64-bit GUID, used for cross-subnet routing.',
      how: 'ibstat shows both the LID and the GID for a port. LIDs are assigned by the SM; GIDs are derived from the GUID which is burned into the hardware.' },
    { theme: 1,
      q: 'How does SM master election work when two opensm instances have equal priority?',
      a: 'Highest numeric priority wins (range 0-15, default 0). At equal priority, the numerically LOWER GUID becomes master (IB spec C14-60.2.1). Two unconfigured instances both at priority 0 will use GUID tiebreak.',
      how: 'sminfo shows priority and state. saquery SMIR enumerates all SMs. Always set primary=15, standby=13 to avoid GUID tiebreak in production.' },
    { theme: 1,
      q: 'What is the difference between QM9700 and QM9790?',
      a: 'QM9700 = MANAGED: has an onboard CPU, runs MLNX-OS, can run a local SM (up to 2,000 nodes out of the box). QM9790 = UNMANAGED: no onboard CPU, cannot run a local SM, MUST have an external SM (UFM or opensm).',
      how: 'ibswitches shows the switch description string. A QM9790 fabric that loses its external SM will not initialize.' },
    { theme: 1,
      q: 'What is a PKey and how do full vs limited members interact?',
      a: 'PKey (Partition Key): 16-bit field in the BTH of every IB packet. Bit 15 = membership: 1 = full, 0 = limited. Two limited members CANNOT communicate. 0x7FFF = limited member of default partition; 0xFFFF = full member.',
      how: 'perfquery shows PortRcvConstraintErrors and PortXmitConstraintErrors. Violations increment these counters. smquery partitions.conf sets membership.' },
    { theme: 1,
      q: 'What is the role of Virtual Lanes in IB, and what is special about VL15?',
      a: 'VL0-VL14 carry data traffic and are credit-flow-controlled (prevents head-of-line blocking). VL15 is reserved for Subnet Management Packets (SMP on QP0) only. VL15 has no credits, is best-effort, and has hardware priority.',
      how: 'smpquery portinfo shows VLCap and OperVLs. Mapping an SL to VL15 in the SL2VL table means DROP (not priority route to the management lane).' },

    // Theme 2: Spectrum-X / RoCE
    { theme: 2,
      q: 'What is the packet structure of a RoCEv2 frame and why is it different from RoCEv1?',
      a: 'RoCEv2: ETH + IP + UDP(4791) + BTH + Payload + ICRC. L3 routable across subnets. RoCEv1: ETH + GRH + BTH + Payload + ICRC, EtherType 0x8915, L2-only. RoCEv2 replaces the GRH with IP/UDP for routability.',
      how: 'ibdump or Wireshark can decode RoCEv2 frames. UDP dest port 4791 is the distinguishing field at L4.' },
    { theme: 2,
      q: 'What does Spectrum-X deliver over standard Ethernet for AI workloads?',
      a: 'Spectrum-X = SN5600 (Spectrum-4, 51.2 Tbps, 64x800G) + BlueField-3/ConnectX-8 SuperNIC + NVIDIA software. Up to 95% effective bandwidth vs about 60% for standard Ethernet; 1.6x higher NCCL collective performance via per-packet adaptive routing and telemetry congestion control.',
      how: 'nv show platform shows asic-model: Spectrum-4. SN5600 is the switch SKU. Key differentiators: RoCE AR, RoCE Congestion Control (NIC-side), RoCE Performance Isolation.' },
    { theme: 2,
      q: 'What is GPUDirect RDMA and what is the data path?',
      a: 'GPUDirect RDMA: the NIC DMAs directly to/from GPU VRAM over PCIe, bypassing CPU and host memory. Path: GPU VRAM -> PCIe peer-to-peer DMA -> NIC -> wire. CPU posts the Work Request (control plane) but never touches payload bytes.',
      how: 'ib_write_bw --use_cuda 0 <peer> measures GPUDirect bandwidth. The GPU and NIC must share the same PCIe root complex for full performance.' },
    { theme: 2,
      q: 'What is the default DSCP-to-switch-priority mapping for RoCE on Spectrum?',
      a: 'DSCP 26 maps to SP3 (RoCE data, TC3, DWRR 50%). DSCP 48 maps to SP6 (CNP, TC6, strict priority). Trust mode default is pcp,dscp. This is auto-configured by nv set qos roce.',
      how: 'nv show qos roce shows the full mapping including pfc-priority 3 and lldp-app-tlv protocol 4791 UDP priority 3.' },

    // Theme 3: Congestion PFC/ECN/DCQCN
    { theme: 3,
      q: 'What is the watermark ordering for RoCE congestion handling on Spectrum?',
      a: 'ECN marking fires first (proactive, CE bit set when queue exceeds Kmin 146.48 KB). DCQCN rate cut happens at the NIC (receiver sends CNP). PFC PAUSE fires last as a last resort (reactive, link-level per priority). Goal: tune ECN/DCQCN so PFC rarely fires.',
      how: 'nv show qos roce shows all thresholds. CNP uses TC6 strict priority. PFC on SP3 (priority 3) is the final backstop.' },
    { theme: 3,
      q: 'What is DCQCN and who runs it?',
      a: 'DCQCN (Data Center Quantized Congestion Notification) is a NIC-side rate-control algorithm, NOT a switch feature. The switch only signals ECN (sets the CE bit). The ConnectX NIC runs the DCQCN rate-control loop. The receiver generates the CNP (Congestion Notification Packet) to cut the sender injection rate.',
      how: 'CNP uses TC6 strict priority scheduling. The switch does not participate in the rate calculation, only in the signaling.' },
    { theme: 3,
      q: 'What exactly does nv set qos roce configure automatically?',
      a: 'One command configures: buffer pools, DSCP/PCP trust (pcp,dscp), SP-to-TC maps, PFC on SP3, ECN on TC0 and TC3 (Kmin 146.48 KB, Kmax 1.43 MB, 100% prob), CNP strict scheduling on TC6, LLDP App TLV (protocol 4791 UDP priority 3). No per-parameter tuning needed for baseline lossless.',
      how: 'nv show qos roce confirms the full applied state. Mode lossless is the default; mode lossy uses ECN only (no PFC).' },
    { theme: 3,
      q: 'What is the PFC watchdog and when does it trigger?',
      a: 'PFC watchdog detects deadlocks caused by circular PFC pause storms. Polling interval default 100 ms, robustness 3. When DEADLOCK status is detected for a TC, the switch auto-drops pause frames on that TC to break the storm.',
      how: 'nv show interface swp1 qos pfc-watchdog shows status per TC (OK or DEADLOCK) and deadlock-count. A rising deadlock-count warrants investigation of the fabric topology for circular dependencies.' },

    // Theme 4: Troubleshooting Tools
    { theme: 4,
      q: 'What does ibping -G do differently from a regular ping?',
      a: 'ibping -G treats the destination as a Port GUID (not a LID). It uses vendor Management Datagram (MADs), not ICMP. The remote node must run ibping -S (server mode) FIRST or there is no responder. It validates IB connectivity at the fabric layer.',
      how: 'ibping -G 0x0002c903... will fail if the remote does not have ibping -S running. Use ibstat or ibhosts to find the GUID of the target.' },
    { theme: 4,
      q: 'How do you interpret rising PortXmitWait vs PortXmitDiscards?',
      a: 'PortXmitWait rising WITHOUT PortXmitDiscards = congestion is building before it reaches the drop point (pause is holding back traffic). PortXmitDiscards rising = packets are being dropped at the switch (congestion exceeded the buffer). Act on PortXmitWait early to prevent drops.',
      how: 'perfquery <lid> <port> shows both counters. Use perfquery -x for 64-bit extended versions to avoid saturation at small bit widths.' },
    { theme: 4,
      q: 'What are the 6 WJH drop categories and what does each cover?',
      a: 'L1 (port down, bad signal, cable), L2 (VLAN mismatch, STP filter, SMAC=DMAC), L3 (blackhole route, TTL, checksum; legacy label: Router), Tunnel (decap error, overlay SMAC), Buffer (WRED and tail drop; NOT PFC holds), ACL (ingress/egress port and router ACL).',
      how: 'netq show wjh-drop filters by category. Buffer covers actual drops; PFC pauses are not visible in WJH because they backpressure upstream without dropping.' },
    { theme: 4,
      q: 'When do you use ibdiagnet --get_phy_info vs --ber_thresh?',
      a: '--get_phy_info is for EDR/HDR/NDR (ConnectX-5+, Quantum): shows per-lane FEC histograms. --ber_thresh is legacy (SwitchX/ConnectX-3/4 only) and the argument is the RECIPROCAL of the target BER (e.g. 1e-12 = 1000000000000). For modern hardware use --get_phy_info.',
      how: 'ibdiagnet2.log captures errors; ibdiagnet2.pm captures counters; ibdiagnet2.cables has transceiver EEPROM data. ibdiagnet --pc RESETS counters.' },

    // Theme 5: Automation / NVUE
    { theme: 5,
      q: 'What is the difference between nv config apply and nv config save?',
      a: 'nv config apply activates pending changes into the running (applied) config. nv config save writes the applied config to startup.yaml at /etc/nvue.d/startup.yaml so it survives reboot. On CL 5.9+ apply also auto-saves. On 5.8 and earlier, save is a separate required step.',
      how: 'nv config history shows all revisions. nv config apply <rev> restores a prior revision without reboot. nv config apply --confirm arms a 10-min auto-rollback.' },
    { theme: 5,
      q: 'What is the nvidia.nvue Ansible collection and how does it differ from old NCLU?',
      a: 'nvidia.nvue is the official Ansible collection for Cumulus Linux via NVUE. Key modules: nvidia.nvue.command (wraps nv CLI, Jinja2 templating, auto-dialog), nvidia.nvue.api (NVUE REST API). Idempotent: NVUE diffs desired vs running so a second run changes nothing. NCLU (net) commands are replaced by NVUE.',
      how: 'Install with ansible-galaxy collection install nvidia.nvue. Test playbooks in NVIDIA Air (free cloud sim) before deploying to hardware.' },
    { theme: 5,
      q: 'How does ZTP work on Cumulus Linux?',
      a: 'On first boot, eth0 DHCPs and requests DHCP option 239 (the provisioning-script URL). The script must contain the literal CUMULUS-AUTOPROVISIONING flag or ZTP refuses to run it. Script runs as root and can drop a startup.yaml then run nv config apply for full day-1 config.',
      how: 'ZTP can also source from USB or a local file. Check /var/log/syslog for ZTP execution status. DHCP vendor-class option 60 = cumulus-linux x86_64.' },
    { theme: 5,
      q: 'What is the nv config apply --confirm workflow?',
      a: 'nv config apply --confirm arms a default 10-minute auto-rollback countdown. If the change locks you out over the management link, the countdown reverts automatically. Keep with --confirm-yes, abort with --confirm-no, check status with --confirm-status.',
      how: 'The N in nv config apply <N> is a REVISION number from nv config history, not seconds. There is no nv config rollback command; use nv config apply <rev> instead.' },

    // Theme 6: K8s + DPU
    { theme: 6,
      q: 'What is the NicClusterPolicy and what is the correct resource name for shared RDMA?',
      a: 'NicClusterPolicy CRD: single resource named exactly nic-cluster-policy (any other name is silently ignored). Shared RDMA plugin exposes rdma/<resourceName> (e.g. rdma/rdma_shared_device_a). SR-IOV IB exposes nvidia.com/mlnxnics. Pods request the resource under resources requests/limits.',
      how: 'kubectl get nicclusterpolicy shows STATUS: ready. kubectl describe node shows capacity for rdma/rdma_shared_device_a = rdmaHcaMax (not a small VF count).' },
    { theme: 6,
      q: 'What is the difference between DPU mode and NIC mode on BlueField-3?',
      a: 'DPU mode (default for DPU products, INTERNAL_CPU_OFFLOAD_ENGINE=0): ARM owns the datapath. NIC mode (INTERNAL_CPU_OFFLOAD_ENGINE=1): ARM out of the datapath. The BF3 mode switch is INTERNAL_CPU_OFFLOAD_ENGINE, NOT INTERNAL_CPU_MODEL (the BF2 legacy knob).',
      how: 'mlxconfig -d /dev/mst/mt41692_pciconf0 query shows Default/Current/Next Boot columns. A power cycle (AC cycle) is required to land changes, not just a soft reboot.' },
    { theme: 6,
      q: 'What capability must pods have for RDMA operations?',
      a: 'IPC_LOCK capability in securityContext is required to pin memory for RDMA. Missing it is the common failure mode where the pod runs but Verbs calls fail. Pods also need Multus CNI to attach the secondary network interface.',
      how: 'kubectl exec <pod> -- ibstat confirms the RDMA device is visible inside the pod. ib_write_bw --use_cuda 0 <peer> verifies GPUDirect RDMA from inside the pod.' },

    // Theme 7: Design + Collectives
    { theme: 7,
      q: 'What makes a fat-tree topology 1:1 non-blocking?',
      a: '1:1 non-blocking requires uplinks equal to downlinks (oversubscription ratio 1:1). Oversubscription begins when uplinks are fewer than downlinks. All fat-trees are leaf-spine, but not all leaf-spine topologies are fat-trees.',
      how: 'DGX SuperPOD compute fabric is 1:1; its storage fabric is intentionally near 4:3 oversubscribed (bulk I/O tolerates blocking that collectives cannot).' },
    { theme: 7,
      q: 'Why does IB NOT use ECMP?',
      a: 'ECMP is an Ethernet/IP construct that hashes flows statically across equal-cost paths. IB routing is table-driven: the SM programs deterministic Linear Forwarding Tables (LFTs) with ibroute showing one-output-port-per-LID entries. IB load-balances via hardware Adaptive Routing (AR), which picks the egress port per packet by real-time queue depth.',
      how: 'ibdiagnet -r validates routing and detects credit loops. dump_lfts.sh or dump_fts dumps all LFTs. AR is distinct from ECMP hashing.' },
    { theme: 7,
      q: 'How does rail-optimized topology differ from a standard fat-tree?',
      a: 'Rail-optimized: NIC-0 of every DGX node connects to Leaf-0, NIC-1 to Leaf-1, etc. Same-rank GPU NICs across the cluster share one leaf. Same-rail GPU-to-GPU traffic is one hop (stays on the leaf). Cross-rail traffic traverses the spine. This distributes same-rank collective traffic optimally.',
      how: 'ibdiagnet --rail_optimized validates the cabling. Rail count equals GPU count per server. An 8-GPU DGX H100 has 8 rails.' }
  ];

  // ── Shows pool: verification commands (NCP-AIN context) ──────────
  var SHOWS = [
    { q: 'Prove an IB port is Active at NDR 400G 4x.',                a: 'ibstat mlx5_0 (or ibstatus mlx5_0); look for state: Active, rate: 400 Gb/sec (4X NDR)' },
    { q: 'Find all IB switches in the fabric with their GUIDs.',       a: 'ibswitches (lists all switches with GUID and description)' },
    { q: 'Spot degraded or narrow IB links across the whole fabric.',  a: 'iblinkinfo | grep -E "Down|Polling|1x|2x"' },
    { q: 'Dump the Linear Forwarding Table for a specific switch.',    a: 'ibroute <switch-guid> (or ibroute <lid>)' },
    { q: 'Identify the current SM master and its priority.',           a: 'sminfo (shows sm lid, guid, priority, state; state 3 = MASTER)' },
    { q: 'Enumerate all SM instances and their states.',               a: 'saquery SMIR (SMInfoRecord lists all SMs with priority and state)' },
    { q: 'Read IB error counters for a specific port.',                a: 'perfquery <lid> <port> (basic) or perfquery -x <lid> <port> (64-bit extended)' },
    { q: 'Verify RoCE mode is lossless across all fabric nodes.',      a: 'netq check roce (5 sub-tests: mode, classification, congestion, flow-control, ETS)' },
    { q: 'See current nv pending config changes before applying.',     a: 'nv config diff applied pending' },
    { q: 'Confirm NicClusterPolicy is reconciled and ready.',          a: 'kubectl get nicclusterpolicy (STATUS column should show ready)' },
    { q: 'Show SHARP aggregation nodes in the fabric.',                a: 'ibdiagnet --sharp (shows IB Aggregation Nodes count and SHARP error count)' },
    { q: 'Inspect ASIC RoCE QoS config including PFC and ECN state.', a: 'nv show qos roce (shows mode, pfc-priority, enabled-tc, thresholds, trust, lldp-app-tlv)' },
    { q: 'Check PFC watchdog deadlock status per traffic class.',      a: 'nv show interface swp1 qos pfc-watchdog (status OK or DEADLOCK per TC)' },
    { q: 'View all NVUE config revision history.',                     a: 'nv config history (lists Rev, Apply Date, Type, User, Message)' },
    { q: 'Confirm NVUE RBAC roles assigned to users.',                 a: 'nv show system aaa role (lists roles with their class/permissions)' },
    { q: 'Validate fat-tree rail-optimized cabling.',                  a: 'ibdiagnet --rail_optimized (validates HCAs on same ToR share same PCIe BDF)' }
  ];

  // ── Public API ───────────────────────────────────────────────────
  window.NCPAIN_DRILL = {
    THEMES:    THEMES,
    NUMBERS:   NUMBERS,
    CONCEPTS:  CONCEPTS,
    SHOWS:     SHOWS,
    TRAPS:     TRAPS,
    WALK_AWAY: WALK_AWAY,

    getPairs: getPairs,

    // Return the theme for a given Date object (or today). Date-seeded so
    // the same calendar day always gives the same theme.
    themeForDate: function (d) {
      d = d || new Date();
      var start = new Date(d.getFullYear(), 0, 0);
      var diff  = d - start + (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000;
      var doy   = Math.floor(diff / 86400000); // day-of-year 1..366
      return THEMES[doy % 7];                  // 0-indexed into 7 entries
    },

    conceptsForTheme: function (id) {
      return CONCEPTS.filter(function (c) { return c.theme === id; });
    }
  };
}());
