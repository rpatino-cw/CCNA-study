/* ══════════════════════════════════════════════════════════════════════
   ncp-ain-pillars-data.js  SINGLE SOURCE OF TRUTH for NVIDIA NCP-AIN
   31 pillars (P1-P3). Domain weights from NCP-AIN official blueprint.
   Same value model shape as encor-pillars-data.js.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Tunable value model config ───────────────────────────────
  var VALUE_WEIGHTS = { D: 0.30, T: 0.25, F: 0.25, L: 0.20 };
  var TIER_FACTOR   = { P1: 1.0, P2: 0.70, P3: 0.45, P4: 0.25 };

  // Domain exam weights (NCP-AIN official blueprint, percent).
  // 1=AI DC Design 5%, 2=Spectrum 30%, 3=InfiniBand 30%,
  // 4=Troubleshooting 20%, 5=Automation 10%, 6=Kubernetes 5%
  var DOMAIN_WEIGHT = { 1: 5, 2: 30, 3: 30, 4: 20, 5: 10, 6: 5 };

  // ── Pillars ────────────────────────────────────────────────
  var NCPAIN_PILLARS_DATA = [
    {
        "n": 1,
        "tier": "P2",
        "obj": "1.1",
        "dom": 1,
        "freq": 40,
        "load": 32,
        "title": "AI Factory Architecture: rail-optimized fat-tree",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "AI Factory: purpose-built infrastructure unit for large-scale GPU cluster training workloads",
            "Rail-optimized fat-tree: NIC-0 of every node connects to the same leaf (rail 0), NIC-1 to the same leaf (rail 1), and so on; same-index NICs across the cluster share one rail leaf, so same-rank GPUs talk leaf-to-leaf without climbing to spine",
            "SuperPOD GB200 defines 3 to 4 distinct fabrics: compute InfiniBand, storage/in-band Ethernet, out-of-band (OOB) management, plus the multi-node NVLink (MN-NVL) domain",
            "Scalable Unit (SU) is the modular building block: on the GB200 RA an SU is 8 DGX GB200 NVL72 rack systems; the fabric scales by adding SUs (up to 16)",
            "Inside an SU a spine-leaf group uses 8 leaf switches (one per compute rack) and 6 spine switches, yielding a non-blocking full-fat tree per SU",
            "Compute IB fabric runs NDR InfiniBand at 400 Gb/s per direction per port and is 1:1 non-blocking; the storage fabric is intentionally mildly oversubscribed (blocking factor 5:3) because bulk I/O tolerates blocking that collectives cannot",
            "NVIDIA Air: free cloud-hosted 1:1 network digital twin (not just a topology sketcher); runs Cumulus Linux or SONiC images so you can validate routing, automation, and upgrades before any hardware arrives"
        ]
    },
    {
        "n": 2,
        "tier": "P1",
        "obj": "3.1",
        "dom": 3,
        "freq": 82,
        "load": 60,
        "title": "IB link speeds: SDR through XDR (4x lane series)",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "Quoted 10/20/40/56/100/200/400/800 figures are SIGNALING rates at 4x, not effective data; subtract the encoding overhead to get usable throughput",
            "<code>SDR/DDR/QDR</code> = 10/20/40 Gb/s at 4x (2.5/5/10 Gb/s per lane), 8b/10b encoding (20 percent overhead), NRZ; usable data = 8/16/32 Gb/s",
            "<code>FDR</code> = 14.0625 Gb/s per lane, 56.25 Gb/s at 4x, 64b/66b framing, NRZ; usable data about 54.54 Gb/s (marketed as 56G)",
            "<code>EDR</code> = 25.78125 Gb/s per lane, 64b/66b, NRZ; 100G rounds clean because overhead is about 3 percent",
            "<code>HDR/NDR/XDR</code> = 53.125 / 106.25 / 212.5 Gb/s per lane signaling, 256b/257b framing (about 0.4 percent overhead), PAM4; the 200/400/800 figures are already effective data rates",
            "<code>FDR10</code> trap: 10.3125 Gb/s per lane, 40 Gb/s at 4x, 64b/66b, NRZ; same 40G aggregate as QDR but QDR uses 8b/10b (32G effective) vs FDR10 64b/66b (about 39.6G), so a bare 40G readout does not tell you the generation",
            "8b/10b vs 64b/66b vs 256b/257b is FRAMING; NRZ vs PAM4 is MODULATION; do not conflate them",
            "XDR hardware = ConnectX-8 SuperNIC plus Quantum-X800 (Quantum-3 ASIC)"
        ],
        "show": "$ ibstatus mlx5_0\nInfiniband device 'mlx5_0' port 1 status:\n        rate: 400 Gb/sec (4X NDR)\n        link_layer: InfiniBand\n        state: 4: ACTIVE\n        phys state: 5: LinkUp"
    },
    {
        "n": 3,
        "tier": "P1",
        "obj": "3.2",
        "dom": 3,
        "freq": 70,
        "load": 60,
        "title": "Quantum-2 QM9700 vs QM9790: 64x NDR400, 25.6 Tbps",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "64 logical NDR400 ports come from 32 octal OSFP cages, each cage carrying 2 independent NDR400 ports; one failed cage drops 2 logical ports",
            "Bandwidth trap: 64 x 400 = 25.6 Tbps is UNIDIRECTIONAL; NVIDIA markets 51.2 Tb/s BIDIRECTIONAL (full-duplex). Both appear in the docs; know which is which",
            "<code>QM9700</code> = managed: carries the CPU that runs an on-board Subnet Manager, runs MLNX-OS, brings up to 2,000 nodes out of the box",
            "<code>QM9790</code> = externally managed (unmanaged): no on-board CPU, cannot run an SM locally, so it MUST always have an external opensm or UFM on the fabric or the subnet will not initialize",
            "Port-split: with 1:2 OSFP splitters the switch presents 128 NDR200 ports, doubling radix at half speed; 64-port and 128-port are both correct depending on split mode",
            "ASIC = Quantum-2; OSFP = Octal Small Form-Factor Pluggable; line-rate non-blocking switching"
        ],
        "show": "# ibswitches\nSwitch  : 0x002128183ea40050 ports 64 \"NVIDIA Quantum-2 QM9700\" base port 0 lid 4 lmc 0\n# field layout: Switch : <GUID> ports <N> \"<description>\" base port 0 lid <LID> lmc 0"
    },
    {
        "n": 4,
        "tier": "P1",
        "obj": "3.3",
        "dom": 3,
        "freq": 86,
        "load": 72,
        "title": "Subnet Manager: LIDs, GIDs, SM priority, sweep",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "The Subnet Manager (SM) is the IB control plane: assigns LIDs, configures Linear Forwarding Tables (LFTs), manages fabric events",
            "<code>LID</code>: 16-bit, scoped to the subnet. Unicast 0x0001 to 0xBFFF (about 48K), multicast 0xC000 to 0xFFFE (about 16K); 0x0000 unassigned, 0xFFFF is the permissive LID",
            "<code>GID</code>: 128-bit = 64-bit subnet prefix + 64-bit GUID (port-unique); used for global routing",
            "SM priority: 4-bit (0 to 15), default 0 (lowest); highest numeric wins master election, tie-break is lowest GUID. A priority-0 SM still becomes master if it is the only SM",
            "Light sweep (default 10 seconds) monitors port-state changes and SM peers; it does NOT reprogram LFTs. On a change it TRIGGERS a heavy sweep, and only the heavy sweep does full rediscovery and LFT reprogramming",
            "LMC gives 2^LMC LIDs per port for multipath (lmc=0 gives 1 LID, lmc=2 gives 4 LIDs)",
            "sminfo SM state values: 0 not active, 1 discovering, 2 standby, 3 master",
            "opensm = open-source, feature-limited; UFM adds SHARP, telemetry, REST API"
        ],
        "config": "# opensm.conf core parameters\nsm_priority 15          # 0=lowest (default), 15=highest\nsweep_interval 10       # seconds between light sweeps (default 10)\nlmc 0                   # 2^lmc LIDs per port; range 0 to 7\nrouting_engine minhop   # minhop|updn|ftree|dor|torus-2QoS|lash|dfsssp|sssp|nue|file\n\n# Equivalent CLI flags\nopensm -p 15            # sm_priority\nopensm -s 10            # sweep_interval (-s 0 disables periodic sweep)\nopensm -l 2             # lmc\nopensm -R ftree         # routing engine",
        "show": "# sminfo\nsminfo: sm lid 25 sm guid 0x21283a8620b0f0, activity count 25950 priority 15 state 3 SMINFO_MASTER\n# state 3 = master, priority 15 (matches sm_priority 15 in config); a standby would show state 2"
    },
    {
        "n": 5,
        "tier": "P1",
        "obj": "3.4",
        "dom": 3,
        "freq": 64,
        "load": 65,
        "title": "Virtual Lanes and SL/QoS: VL0-VL15, credit-based flow control",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "IB defines <code>16 Virtual Lanes</code> per link: VL0 to VL14 carry data; <code>VL15</code> is reserved for Subnet Management Packets (SMP on QP0) only",
            "VL15 is NOT credit-flow-controlled: no credits, best-effort, given hardware priority. Only VL0 to VL14 use credit-based flow control",
            "Hardware caveat: the spec allows up to 15 data VLs but real NVIDIA/Mellanox hardware commonly implements VL0 to VL7 (8 data VLs); VLCap is device-dependent",
            "<code>SL (Service Level)</code>: 4-bit packet-header field, SL0 to SL15, set by the application",
            "<code>SL2VL</code> table and two VL arbitration tables (high/low weighted round-robin) are programmed into each port by the SM. Mapping an SL to VL15 in SL2VL means DROP the packet, not send it on the management lane",
            "Credit-based flow control: credits granted in 64-byte units; a sender transmits on a VL only if it holds credits; prevents head-of-line blocking",
            "GMP (General Management Packets, QP1: SA, CM) is NOT on VL15; GMP uses VL0 and IS flow-controlled. Only SMP (QP0) uses VL15",
            "VLCap (hardware max) and OperVLs (SM-negotiated active count) are separate PortInfo fields; a link uses the minimum VLCap of both endpoints"
        ],
        "config": "# opensm QoS defaults in opensm.conf\nqos TRUE\nqos_max_vls 15\nqos_high_limit 0\nqos_vlarb_high 0:4,1:0,2:0,3:0,4:0,5:0,6:0,7:0\nqos_vlarb_low  0:0,1:4,2:4,3:4,4:4,5:4,6:4,7:4\nqos_sl2vl      0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,7\n# reading qos_sl2vl: SL0->VL0 ... SL14->VL14, SL15->VL7\n# per-device prefixes: qos_ca_ (HCA), qos_swe_ (switch ext), qos_sw0_ (switch port 0), qos_rtr_ (router)",
        "show": "# smpquery portinfo <lid>\nVLCap:...........................VL0-1\nVLHighLimit:.....................0\nVLArbHighCap:....................16\nVLArbLowCap:.....................16\nOperVLs:.........................VL0\n# port supports up to 2 VLs (VLCap VL0-1) but only VL0 is operational\n# ibstat does NOT show VL fields; use smpquery portinfo"
    },
    {
        "n": 6,
        "tier": "P1",
        "obj": "3.5",
        "dom": 3,
        "freq": 60,
        "load": 60,
        "title": "PKeys: 16-bit partition keys, full/limited member, multi-tenancy",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>PKey (Partition Key)</code>: 16-bit field in the Base Transport Header of every IB packet; segments a subnet into logical partitions for multi-tenancy",
            "Bit 15 (MSB) = membership: 1 = full (talks to full and limited), 0 = limited (talks only to full). Two limited members cannot communicate",
            "0x7FFF and 0xFFFF are NOT the same. 0x7FFF is the default partition NUMBER (the low 15 bits) and is also the wire PKey for a LIMITED member of the default partition",
            "0xFFFF is the wire PKey for a FULL member of the default partition: MSB 1 (full) + low 15 bits 0x7FFF = 0xFFFF. opensm's own port always gets 0xFFFF",
            "The low 15 bits are the partition identity; the MSB only flips full vs limited. A port can be full in one partition and limited in another at the same time",
            "The SM writes the PKeyTable attribute (a separate SMA attribute), not PortInfo itself; PortInfo holds the enforcement bits and violation counters. Each port's PKey table can hold multiple entries",
            "Violation drops the packet and increments PortRcvConstraintErrors (rx) / PortXmitConstraintErrors (tx); the device counter is bad_pkey_cntr",
            "opensm places the default PKey at block 0 index 0 (the indx0 flag in partitions.conf forces a known index)"
        ],
        "config": "# opensm partitions.conf\n# Default partition, all ports full, IPoIB enabled\nDefault=0x7fff,ipoib : ALL=full ;\n\n# Multi-tenant: default plus an isolated tenant partition\nDefault=0x7fff,ipoib : ALL=full ;\ntenant1=0x100,ipoib  : ALL=full ;\n\n# Mixed membership (specific GUIDs full, rest limited)\nShareIO=0x80 : 0x123453,0x123454,0x123455=full ;\n# syntax: PartitionName=PKey, flags : member-list ; (member is full or limited)",
        "show": "# perfquery <lid> <port>\nPortRcvConstraintErrors:.........0\nPortXmitConstraintErrors:........0\n# these increment on a PKey violation (two limited members, or a partition mismatch)\n# zero = healthy; device-level counter is bad_pkey_cntr"
    },
    {
        "n": 7,
        "tier": "P1",
        "obj": "3.6",
        "dom": 3,
        "freq": 70,
        "load": 66,
        "title": "IB routing and Adaptive Routing: fat-tree min-hop, AR by credit",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "IB routing is table-driven: the SM programs <code>Linear Forwarding Tables (LFTs)</code> in each switch; each LID-indexed entry maps a destination LID to an output port",
            "ftree (fat-tree) and updn (UpDown) are SEPARATE opensm routing engines, not the same algorithm: ftree gives congestion-free routing on a clean symmetrical fat-tree (falls back to minhop if not); updn is ranking-based and enforces a turn restriction",
            "updn deadlock rule: the forbidden turn is DOWN-then-UP. Once a packet has gone down it cannot go back up. Exam questions often reverse this",
            "opensm has 11 routing engines: minhop (default), updn, dnup, file, ftree, lash, dor, torus-2QoS, nue, dfsssp, sssp",
            "<code>Adaptive Routing (AR)</code> selects among equal-cost paths by per-output-port credit/congestion with no SM intervention per packet, but AR must first be enabled via UFM or the SM; it has a per-packet mode and a time-bounded burst mode",
            "AR is distinct from ECMP (per-flow static hash); out-of-order packets AR causes are corrected by the HCA (ConnectX) reorder buffer, not the switch",
            "ibstat does NOT show LFTs (it shows HCA port LID, state, rate only); use ibroute (one switch) or dump_lfts.sh / dump_fts (all switches). ibdiagnet -r validates routing and detects credit loops",
            "Rail-optimized topology connects each GPU NIC to a different leaf; Dragonfly+ high-radix global links need AR for load balancing"
        ],
        "config": "# opensm.conf routing engine\nrouting_engine minhop      # change to ftree for fat-tree, updn for irregular topology\nroot_guid_file /etc/opensm/guid.txt   # required by ftree to identify spine/root switches\n# CLI: opensm -R ftree (comma-separated engines try in order; add no_fallback to block minhop fallback)",
        "show": "Unicast lids [0x0-0x1f] of switch Lid 3 guid 0x0021283a8620b000:\n     Lid  Out   Destination\n         Port     Info\n0x0014 001 : (Switch portguid 0x0021283a8620b0a0)\n0x0016 002 : (Switch portguid 0x0021283a8620b0c0)\n\n$ ibdiagnet -r\n   Credit Loops Report\n   no credit loops found"
    },
    {
        "n": 8,
        "tier": "P1",
        "obj": "3.7",
        "dom": 3,
        "freq": 58,
        "load": 58,
        "title": "SHARP in-network compute: AllReduce offload, aggregation tree",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>SHARP (Scalable Hierarchical Aggregation and Reduction Protocol)</code>: performs the reduction inside the IB switch ASICs (in-network computing) so data is reduced on the way up the tree",
            "Collectives offloaded: AllReduce, Reduce, Barrier, Broadcast, plus AllGather and ReduceScatter (the last two added in NCCL 2.27, mid-2025 (July))",
            "Architecture correction: there is NO sharpd daemon on compute nodes. sharpd was removed in SHARP 2.7.0; its work now runs inside the user application process",
            "Current pieces: <code>sharp_am</code> (Aggregation Manager) on the management/UFM host builds the aggregation trees (SATs) and configures switches; <code>libsharp</code> links into MPI/NCCL apps on compute nodes",
            "sharp_am requires either UFM or a dedicated server running a Subnet Manager; it talks to libsharp clients on TCP port 6126 over socket transport by default (IPoIB/UCX optional)",
            "SHARPv2 (Quantum/HDR) runs ONE workload at a time; SHARPv3 (Quantum-2/NDR) supports multiple parallel aggregation trees (multi-tenant). Do not attribute v3 to first-gen Quantum",
            "Win: removes redundant data movement so effective AllReduce bandwidth rises above the naive ring ceiling; scales better than NCCL-only collectives at large cluster sizes"
        ],
        "config": "# /opt/ufm/files/conf/gv.cfg\nsharp_enabled = true\n\n# Aggregation Manager config location:\n#   UFM deployment:   /opt/ufm/files/conf/sharp/sharp_am.cfg\n#   standalone HPC-X: /etc/sharp/sharp_am.cfg\n# UFM service control: ufmd sharp_start | sharp_stop | sharp_restart | sharp_status",
        "show": "$ sharp_hello -d mlx5_0:1 -v 3\n  ... (tree type, tree ID, quota) ...\n  Test Passed\n\n$ ibdiagnet --sharp\n   IB Aggregation Nodes ........ <count>\n   SHARP ....................... 0 0   (no errors)"
    },
    {
        "n": 9,
        "tier": "P1",
        "obj": "2.1",
        "dom": 2,
        "freq": 66,
        "load": 58,
        "title": "Spectrum-4 ASIC: 51.2 Tbps, SN5600 64x800G, Spectrum-X",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>Spectrum-4</code>: NVIDIA's 4th-gen Ethernet switch ASIC; aggregate bandwidth = <code>51.2 Tbps</code>",
            "<code>SN5600</code>: <code>2U</code> switch built on Spectrum-4; 64 OSFP cages at 800GbE each (64 x 800 Gb/s = 51.2 Tbps), 128 MB fully shared on-chip packet buffer. Breakout: 128x400G or 256x10/25/50/100/200G",
            "<code>Spectrum-X</code> platform = SN5600 switch (Spectrum-4) plus BlueField-3 SuperNIC (400G) or ConnectX-8 SuperNIC (800G) plus NVIDIA software (DOCA, NetQ, Cumulus Linux or SONiC); the SuperNIC, not a plain ConnectX-7, is the branded endpoint",
            "Spectrum-4 natively supports RoCEv2, PFC, ECN, DCQCN, and Adaptive Routing for lossless AI workloads",
            "Performance: up to 95 percent effective bandwidth at scale (vs about 60 percent for general-purpose Ethernet) and about 1.6x higher NCCL collective performance, driven by per-packet adaptive routing plus telemetry-based congestion control",
            "Exam trap: Spectrum-X (SN5600 plus SuperNIC) is the Ethernet AI fabric running RoCEv2; Quantum-X800 (144x800G, 115.2 Tbps) is the InfiniBand AI fabric running native IB. Separate product lines"
        ],
        "config": "# ASIC identity is read-only (no NVUE command sets the ASIC type)\nnv show platform\nnv show interface --view=brief",
        "show": "cumulus@switch:mgmt:~$ nv show platform\n               operational\n-------------  -----------\nmanufacturer   NVIDIA\nsystem-type    MSN5600\nasic-model     Spectrum-4\nserial-number  MT2025XXXX\npart-number    MSN5600-VS2FO\nmemory         32768 MB\n# the asic-model: Spectrum-4 field is the key identifier"
    },
    {
        "n": 10,
        "tier": "P1",
        "obj": "2.2",
        "dom": 2,
        "freq": 85,
        "load": 74,
        "title": "RoCEv2: RDMA over UDP 4791, routable L3, GPUDirect RDMA",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>RoCEv2</code>: encapsulates the IB transport payload in <code>UDP, destination port 4791</code>, adding IP for L3 routability. Packet = ETH + IP + UDP(4791) + BTH + Payload + ICRC",
            "RoCEv1 was L2-only (EtherType 0x8915, packet ETH + GRH + BTH + Payload + ICRC); RoCEv2 replaces the GRH with the IP/UDP stack and is L3-routable across subnets",
            "Transport types: <code>RC (Reliable Connected)</code> uses Go-Back-N retransmit (a loss retransmits that packet and all subsequent); <code>UC</code>; <code>UD</code>. RC carries most GPU-to-GPU traffic",
            "<code>GPUDirect RDMA</code>: the NIC DMAs directly to/from GPU VRAM over PCIe, bypassing CPU and host memory",
            "Lossless via PFC is required for optimal operation and to avoid Go-Back-N cascades, but Cumulus also supports a lossy RoCE mode (ECN only, no PFC). One lossy hop breaks the end-to-end guarantee",
            "Spectrum DSCP-to-switch-priority defaults: DSCP 26 -> SP3 (RoCE data, TC3, DWRR 50 percent); DSCP 48 -> SP6 (CNP, TC6, strict priority). Default trust mode is pcp,dscp",
            "Lossless mode enables PFC on SP3 and ECN on TC0 and TC3 (CE bit set when queue depth exceeds 146.48 KB up to 1.43 MB at 100 percent probability)"
        ],
        "config": "# Enable lossless RoCEv2 (default mode on Spectrum)\nnv set qos roce\nnv config apply\n\n# Equivalent explicit form\nnv set qos roce mode lossless\nnv config apply\n\n# Lossy RoCE (ECN only, no PFC)\nnv set qos roce mode lossy\nnv config apply\n\n# Remove RoCE config\nnv unset qos roce\nnv config apply",
        "show": "cumulus@switch:mgmt:~$ nv show qos roce\n                    operational  applied\n------------------  -----------  --------\nenable                           on\nmode                lossless     lossless\ncongestion-control\n  congestion-mode   ECN\n  enabled-tc        0,3\n  max-threshold     1.43 MB\n  min-threshold     146.48 KB\n  probability       100\nlldp-app-tlv\n  priority          3\n  protocol-id       4791\n  selector          UDP\npfc\n  pfc-priority      3\n  rx-enabled        enabled\n  tx-enabled        enabled\ntrust\n  trust-mode        pcp,dscp"
    },
    {
        "n": 11,
        "tier": "P1",
        "obj": "2.3",
        "dom": 2,
        "freq": 85,
        "load": 76,
        "title": "PFC + ECN + DCQCN: lossless Ethernet congestion pipeline",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>PFC (Priority Flow Control)</code>: link-level PAUSE per priority; when a switch buffer fills for a priority it PAUSEs the upstream sender on that priority only; prevents drop but adds latency (the IEEE 802.1Qbb label is not printed by Cumulus)",
            "<code>ECN</code>: the switch marks the <code>CE (Congestion Experienced)</code> bit (RFC 3168) when queue depth crosses a threshold; ECN is proactive and signals before the buffer overflows",
            "<code>DCQCN</code> is a NIC-side algorithm, not a switch feature: the switch only signals ECN; the ConnectX NIC runs the rate-control loop and the receiver generates the <code>CNP (Congestion Notification Packet)</code> to cut the injection rate",
            "System watermark order (ECN mark -> DCQCN rate cut -> PFC PAUSE as last resort); tune ECN/DCQCN so PFC rarely fires, since PFC head-of-line blocking hurts non-congested flows on the same priority",
            "ECN defaults are exact and absolute bytes: min 146.48 KB, max 1.43 MB (1,501,500 bytes on TC3), probability 100, and ECN runs on TC0 AND TC3 (enabled-tc 0,3), not TC3 alone",
            "One command does it all: <code>nv set qos roce</code> auto-configures buffer pools, DSCP/PCP trust, SP-to-TC maps, PFC on SP3, ECN on TC0+TC3, CNP scheduling, and the LLDP App TLV (protocol 4791, UDP, priority 3). No per-parameter tuning for baseline lossless",
            "CNP uses TC6 with strict-priority scheduling (never delayed/dropped); RoCE data on TC3 uses DWRR 50 percent; other traffic on TC0 uses DWRR 50 percent",
            "Default operational mode string in nv show is <code>lossless</code>: SP3 gets a dedicated lossless traffic pool in lossless mode. The string <code>lossless-single-ipool</code> only appears if explicitly configured; do not treat it as the default"
        ],
        "config": "# Enable lossless RoCE (configures PFC SP3, ECN TC0+TC3, CNP, trust, pools)\nnv set qos roce\nnv config apply\n\n# Equivalent\nnv set qos roce mode lossless\nnv config apply\n\n# Change the RoCE lossless switch-priority (default 3) only if needed\nnv set qos pfc default-global switch-priority 3\nnv config apply\n# Note: there is no separate nv set qos ecn step; thresholds apply automatically",
        "show": "cumulus@switch:mgmt:~$ nv show qos roce\n                        operational            applied\n------------------  ---------------------  ---------------------\nstate                                      enabled\nmode                lossless               lossless\npfc\n  pfc-priority      3\n  rx-enabled        enabled\n  tx-enabled        enabled\n  cable-length      100\ncongestion-control\n  congestion-mode   ECN\n  enabled-tc        0,3\n  min-threshold     146.48 KB\n  max-threshold     1.43 MB\n  probability       100\ntrust\n  trust-mode        pcp,dscp\nlldp-app-tlv\n  priority          3\n  protocol-id       4791\n  selector          UDP"
    },
    {
        "n": 12,
        "tier": "P2",
        "obj": "2.4",
        "dom": 2,
        "freq": 52,
        "load": 44,
        "title": "BGP-EVPN multi-tenancy with VXLAN VNI",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "BGP-EVPN (Ethernet VPN, RFC 7432) is the control plane for VXLAN overlays on Spectrum-based fabrics",
            "EVPN route types: Type 2 (MAC+IP) and Type 3 (IMET, signals VTEP membership for BUM handling, NOT a data-multicast entry) are always present; Type 5 (IP prefix) for routed prefixes; Type 1 (Ethernet AD) and Type 4 (Ethernet Segment) exist only for EVPN multihoming (ESI all-active)",
            "VNI: 24-bit identifier maps a tenant segment; each tenant VLAN = one VNI; VXLAN encapsulates L2 frames in UDP (port 4789); VTEPs terminate tunnels at the leaf switches",
            "NVUE enable verb is <code>nv set evpn state enabled</code> (not enable on); NVUE auto-creates the shared vxlan48 device and adds VLAN-to-VNI maps to br_default, so you do NOT hand-build the VXLAN interface",
            "With NVUE you do NOT set advertise-all-vni: FRR is auto-aware of local VNIs (a trap for raw-FRR/vtysh users)",
            "Symmetric routing needs one L3VNI per tenant VRF, identical across all VTEPs; an L3VNI and an L2VNI cannot share an ID or Cumulus silently fails to create the L2VNI",
            "Type 5 IP-prefix export is not automatic: enable route-export to-evpn per VRF",
            "Spectrum switches support BGP-EVPN natively via Cumulus Linux or NVUE; standard multi-vendor protocol"
        ],
        "config": "# VLAN-to-VNI map (NVUE auto-creates vxlan48 in br_default)\nnv set bridge domain br_default vlan 10 vni 10\nnv set bridge domain br_default vlan 20 vni 20\nnv set nve vxlan source address 10.10.10.1\n\n# BGP underlay\nnv set router bgp autonomous-system 65101\nnv set router bgp router-id 10.10.10.1\nnv set vrf default router bgp neighbor swp51 remote-as external\n\n# EVPN control plane\nnv set evpn state enabled  # (Cumulus 5.15+ syntax; pre-5.15 uses enable on)\nnv set vrf default router bgp address-family l2vpn-evpn state enabled\nnv set vrf default router bgp neighbor swp51 address-family l2vpn-evpn state enabled\nnv config apply\n\n# Symmetric routing L3VNI per tenant VRF\nnv set vrf RED evpn vni 4001\nnv set vrf RED router bgp address-family ipv4-unicast route-export to-evpn state enabled\nnv config apply",
        "show": "cumulus@leaf01:~$ nv show evpn vni\nVNI  NumMacs  NumArps  NumRemVteps  TenantVrf  Bridge      Vlan\n---  -------  -------  -----------  ---------  ----------  ----\n10   7        4        1            RED        br_default  10\n20   7        4        1            RED        br_default  20\n30   7        4        1            BLUE       br_default  30\n\ncumulus@leaf01:~$ nv show evpn vni 10\n                     operational\n-----------------  ------------------\nvlan               10\nbridge-domain      br_default\ntenant-vrf         RED\nvxlan-interface    vxlan48\nremote-vtep-count  1\nlocal-vtep         10.0.1.12\nroute-target\n  [both]           65101:10"
    },
    {
        "n": 13,
        "tier": "P2",
        "obj": "2.5",
        "dom": 2,
        "freq": 48,
        "load": 40,
        "title": "Adaptive Routing on Spectrum complements RoCE congestion control",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "Spectrum-4 Adaptive Routing (AR) selects among equal-cost paths <code>per packet</code> on a one-microsecond decision interval (not configurable, and not flowlet/burst) based on real-time egress queue occupancy",
            "Exam trap: AR is not ECMP hashing. ECMP hashes a whole flow (5-tuple) to one path; AR can split packets of one flow across paths. Out-of-order packets are corrected at the receiver by the BlueField-3 / ConnectX SuperNIC via Direct Data Placement (DDP), a NIC function not a switch function",
            "AR complements RoCE congestion control: AR spreads load before congestion builds; congestion control (NIC-side) handles residual congestion via rate control",
            "GA on Spectrum-4 from Cumulus 5.6 (beta on Spectrum-2/3 in 5.5 and earlier); Spectrum-5 in newer docs",
            "Scope limits: AR supports RoCEv2 unicast and VXLAN-encapsulated RoCE on L3 interfaces in the default VRF only; NOT on subinterfaces, SVIs, bonds, bond members, and not on 800G links on Spectrum-4",
            "Toggling AR restarts switchd, which resets all ports and clears hardware state, so plan a maintenance window",
            "link-utilization-threshold default is 70 percent; the global feature flag must be on before per-interface values apply",
            "Three Spectrum-X differentiators: RoCE Adaptive Routing, RoCE Congestion Control (NIC-side, millions of events/sec), RoCE Performance Isolation"
        ],
        "config": "# Global enable (use state enabled for 5.6+; 5.8 docs show enable on/off)\nnv set router adaptive-routing state enabled  # (Cumulus 5.15+ syntax; pre-5.15 uses enable on)\n\n# Per-interface enable on each ECMP member\nnv set interface swp51 router adaptive-routing state enabled\nnv set interface swp52 router adaptive-routing state enabled\n\n# Optional link-utilization-threshold (global flag, then per-iface, default 70)\nnv set router adaptive-routing link-utilization-threshold on\nnv set interface swp51 router adaptive-routing link-utilization-threshold 70\nnv set interface swp52 router adaptive-routing link-utilization-threshold 70\nnv config apply",
        "show": "cumulus@leaf01:mgmt:~$ nv show router adaptive-routing\n        applied\n------  -------\nstate   enabled\n\ncumulus@leaf01:mgmt:~$ nv show interface swp51 router adaptive-routing\n                            applied\n--------------------------  -------\nstate                       enabled\nlink-utilization-threshold  70"
    },
    {
        "n": 14,
        "tier": "P1",
        "obj": "3.8",
        "dom": 3,
        "freq": 66,
        "load": 62,
        "title": "BlueField-3 DPU vs SuperNIC vs ConnectX-7/8: GPUDirect path",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>ConnectX-7</code>: pure NIC, ASIC family MT2910, NDR 400Gb/s, PCIe Gen 5.0 x16; no on-board ARM cores; the standard GPU cluster NIC providing RDMA, RoCEv2, GPUDirect",
            "<code>ConnectX-8</code>: PCIe Gen 6 (64GT/s), supports InfiniBand XDR, family ceiling 800Gb/s (current shipping SKUs top at 400G per port); first NIC to integrate a PCIe Gen 6 switch, consolidating NIC plus PCIe switch into one device (older generations needed a discrete external PCIe switch)",
            "<code>BlueField-3 DPU</code>: ConnectX-7 networking plus 16 Armv8.2 Cortex-A78 (Hercules) cores plus on-board SoC, device ID MT41692; runs its own Arm OS (BFB image); offloads networking/storage/security from the host CPU",
            "SuperNIC is TWO distinct products (exam trap): ConnectX-8 SuperNIC has ZERO ARM cores and no embedded OS (a NIC with an integrated PCIe Gen 6 switch for Spectrum-X east-west GPU-to-GPU traffic); BlueField-3 SuperNIC (B3140H/B3140L, 8-core SKUs) has 8 ARM Cortex-A78 cores and runs an Arm OS, exactly HALF the cores of the BF3 DPU (16-core)",
            "BF3 DPU core count is 16, BF3 SuperNIC is 8: a question citing 16 ARM cores describes a DPU variant; a BF3 SuperNIC has exactly 8",
            "GPUDirect RDMA path: GPU VRAM -> PCIe peer-to-peer DMA -> NIC -> wire; <code>CPU posts the work request (control plane) but never touches payload bytes</code>; GPU and NIC must share the same PCIe root complex for full performance (crossing two root complexes is severely limited)",
            "<code>NCCL (NVIDIA Collective Communications Library)</code>: topology-aware GPU collective library (AllReduce/AllGather) over NVLink/PCIe/RDMA; runs above the NIC transport",
            "<code>DOCA (Data Center-on-a-Chip Architecture)</code>: the BlueField/SuperNIC SDK; APIs for networking, storage, and security offload on the ARM cores",
            "BlueField-3 Separated-Host mode is officially obsolete as of BSP 4.8.0 (do not use it); only NIC mode and DPU (ECPF) mode are valid. A question offering Separated-Host as a current mode is a distractor"
        ],
        "config": "# Identify the device, then query firmware configuration\nmst start\nmst status -v\nmlxconfig -d /dev/mst/mt4129_pciconf0 query\n# mt4129 = ConnectX-7 in practice; BlueField-3 = mt41692_pciconf0",
        "show": "Device #1:\n----------\nDevice type:    ConnectX7\nName:           MCX75310AAS-NEAT\nDescription:    ConnectX-7 IB HDR/NDR 1-port OSFP; PCIe5.0 x16\nDevice:         /dev/mst/mt4129_pciconf0\n\nConfigurations:                              Current\n         LINK_TYPE_P1                        IB(1)\n         SRIOV_EN                            False(0)\n         NUM_OF_VFS                          0\n         KEEP_ETH_LINK_UP_P1                 True(1)\n# LINK_TYPE values: 1 = InfiniBand, 2 = Ethernet, 3 = VPI/auto"
    },
    {
        "n": 15,
        "tier": "P1",
        "obj": "3.9",
        "dom": 3,
        "freq": 62,
        "load": 64,
        "title": "Fat-tree 1:1 non-blocking + rail-optimized GPU topology",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "Fat-tree: each leaf connects to every spine; non-blocking (1:1) requires uplinks EQUAL to downlinks (Pe/2 each, blocking factor 1). Oversubscription begins the moment uplinks are fewer than downlinks. All fat-trees are leaf-spine, but not all leaf-spine topologies are fat-trees",
            "DGX H100 has 8 single-port ConnectX-7 NDR 400G compute NICs (plus 2 dual-port for storage/mgmt, 10 total); each compute NIC maps to one GPU and one rail",
            "Rail (ibdiagnet definition): all HCAs that connect to the same top-of-rack leaf and share the same PCIe BDF in their server. Rail 0 = NIC-0 of every server to Leaf-0; 8 GPUs to 8 rails to 8 leaf switches per Scalable Unit",
            "Compute NICs reach the leaf via PCIe Gen5 through a Cedar7 mezzanine/interposer board, NOT NVLink. NVLink is GPU-to-GPU only (via NVSwitch)",
            "Same-rail GPU-to-GPU traffic is one hop (stays on the leaf); cross-rail traffic traverses the spine. Non-blocking means the spine always has enough bandwidth, not that cross-rail is zero hops",
            "IB does NOT use ECMP (top exam trap): ECMP is an Ethernet/IP construct that hashes flows statically across equal-cost paths. The SM programs deterministic Linear Forwarding Tables (LFTs); IB load-balances via hardware Adaptive Routing (AR), which picks the egress port per packet by real-time queue depth",
            "Rail count equals GPU count per server: DGX H100 = 8 GPUs, 8 ConnectX-7 compute NICs, 8 rails. A non-rail-optimized design lets NIC-to-leaf assignment vary per server, breaking the same-leaf guarantee and adding spine hops for traffic that should be local",
            "DGX SuperPOD compute fabric is built 1:1; its storage fabric is explicitly near 4:3 oversubscribed. A leaf with 32 downlinks but 16 uplinks is 2:1 oversubscribed"
        ],
        "show": "ibdiagnet --rail_optimized\n# Validates that all HCAs on the same ToR leaf share the same PCIe BDF\n# in their server. Writes topology to ibdiagnet2.rails, warnings to ibdiagnet2.log.\nibnetdiscover\n# Dumps full fabric topology (nodes, GUIDs, LIDs, links) for manual rail-cabling verification."
    },
    {
        "n": 16,
        "tier": "P2",
        "obj": "3.10",
        "dom": 3,
        "freq": 56,
        "load": 40,
        "title": "Transceiver types: DAC, AOC, OSFP DR4/FR4, OSFP vs QSFP112",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>DAC (Direct Attach Copper)</code>: passive NDR (400G) OSFP DAC tops out at <code>2m</code> (zero power, near-zero latency); active copper (ACC) adds equalizer ICs (~1.5W) and reaches 3 to 5m. Passive DAC at 3m for NDR is a trap",
            "<code>AOC (Active Optical Cable)</code>: fiber with integrated transceivers; range 3 to 100m for NVIDIA NDR. SR4 transceiver-plus-fiber reaches 50m on OM4; integrated AOC goes to 100m",
            "<code>OSFP DR4</code>: 4 OPTICAL lanes (parallel single-mode fiber, MPO-12/APC, each 100G PAM4), reach 100m. A separate 500m variant is a distinct SKU (DR4+ or 500m module); FEC does not extend the reach of the standard 100m DR4 module to 500m. The OSFP PACKAGE has 8 ELECTRICAL lanes; a twin-port OSFP carries 2x DR4 = 8 optical total, but each DR4 port is 4 lanes",
            "<code>OSFP FR4</code>: 4 WDM wavelengths (CWDM4: 1271/1291/1311/1331nm) on duplex single-mode fiber (LC), 2km reach; suited for campus/inter-building",
            "OSFP NDR port math: NDR = 4x100G PAM4 per port = 400G (NOT 8x50G; the 8 lanes are the full twin-port OSFP electrical interface, 4 per internal port). XDR = 4x200G PAM4 = 800G per port",
            "<code>QSFP112</code>: 4 electrical lanes, 4x100G PAM4 = 400G max per port; cannot carry 800G/XDR. XDR 800G requires OSFP (8-lane) or QSFP-DD800. ConnectX-7 ships in OSFP (flat-top, single-port 400G) or QSFP112 (single-port 400G or dual-port 2x200G NDR200)",
            "OSFP-in-switch trap: QM9700 switch ports are finned-top twin-port OSFP only; a QSFP112 transceiver cannot seat in a QM9700 port. ConnectX-7 HCAs use flat-top OSFP or QSFP112 (finned-top vs flat-top differ in heat-sink arrangement)"
        ],
        "show": "Cable name    : mt4115_pciconf0_cable_0\n-------- Cable EEPROM --------\nIdentifier    : QSFP+ (0dh)\nCompliance    : 100G AOC ... worst BER of 10^(-12) or below\nVendor        : Mellanox\nSerial number : MT1602FT00022\nPart number   : MFS1200-E003\nTemperature   : 54 C\nLength        : 3 m\n\n# mlxlink cable info for an OSFP NDR 400G FR4 module:\nIdentifier       : OSFP\nCompliance       : IB NDR, 400G-FR4\nCable Type       : Optical Module (separated)\nSMF Length       : 2km\nSpeed            : 400G\nWidth            : 4x\nFEC              : Standard_RS-FEC - (544,514)\n# Width 4x confirms 4 active lanes for a single-port 400G OSFP."
    },
    {
        "n": 17,
        "tier": "P1",
        "obj": "3.11",
        "dom": 3,
        "freq": 78,
        "load": 64,
        "title": "UFM: telemetry, SHARP tree config, required for QM9790",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>UFM (Unified Fabric Manager)</code>: NVIDIA's enterprise IB fabric management platform; a layered stack, not four parallel products",
            "UFM does NOT replace OpenSM: NVIDIA docs state UFM uses the Open Fabric community OpenSM and runs it as a separate logical block. UFM starts, configures, and monitors an OpenSM instance; both run concurrently. UFM replaces opensm is wrong",
            "UFM editions are a stack: UFM Telemetry (streams 120+ counters per IB port, no routing mgmt), UFM Enterprise (adds discovery/provisioning, congestion detection, job-scheduler integration, REST API), Cyber-AI plugin (adds AI anomaly/predictive analytics into UFM Enterprise/SDN Appliance, needs a dedicated Gen 4.0 appliance), UFM-SDN Appliance (hardware form factor). AI-based predictive fault detection = Cyber-AI plugin, not Enterprise alone",
            "<code>QM9700 vs QM9790</code> (exam trap): QM9700 is MANAGED with an onboard SM (MLNX-OS, up to 2,000 nodes); QM9790 is UNMANAGED with no onboard SM and requires an external SM (UFM OR standalone opensm on a host). The exam may reverse these",
            "SHARP requires a running Aggregation Manager (sharp_am): no AM means no aggregation trees. When UFM is present it owns the sharp_am lifecycle (start/stop/monitor); starting ufmd starts opensm and sharp_am together, and UFMHealth auto-restarts sharp_am on failure",
            "UFM REST API paths: <code>GET /ufmRest/resources/ports</code>, <code>/resources/systems</code>, <code>/resources/links</code>; used for automation and monitoring integration",
            "UFM Cyber-AI plugin provides AI-driven anomaly detection and predictive/preventive maintenance, building on Telemetry and Enterprise"
        ],
        "config": "service ufmd start        # starts UFM + OpenSM + SHARP AM together\n# SHARP AM config under UFM (overrides default /etc/sharp/sharp_am.cfg):\n#   /opt/ufm/files/conf/sharp/sharp_am.cfg",
        "show": "GET /ufmRest/resources/ports\nAuthorization: Basic <base64-credentials>\nAccept: application/json\n\n{\n  \"number\": 33,\n  \"physical_state\": \"Link Up\",\n  \"logical_state\": \"Active\",\n  \"mtu\": 4096,\n  \"active_speed\": \"NDR\",\n  \"active_width\": \"4x\",\n  \"lid\": 8,\n  \"peer_node_name\": \"r-dmz-ufm131\",\n  \"node_description\": \"r-dmz-ufm-sw49:33\",\n  \"guid\": \"0002c903007b78b0\"\n}"
    },
    {
        "n": 18,
        "tier": "P1",
        "obj": "4.1",
        "dom": 4,
        "freq": 92,
        "load": 80,
        "title": "IB diagnostic command toolkit: ibstat through perfquery",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>ibstat</code> / <code>ibstatus</code>: show local HCA port state, LID, GID, speed, width; quick per-port health check",
            "<code>ibhosts</code> / <code>ibswitches</code>: list all HCAs / switches in the fabric by GUID and description",
            "<code>iblinkinfo</code>: per-link speed and width for every switch port; spot degraded or narrow links (Down, Polling, 1x, 2x)",
            "<code>ibnetdiscover</code>: full fabric topology (nodes, links, GUIDs); <code>ibroute &lt;switch-guid&gt;</code> dumps a switch LFT; <code>ibtracert &lt;src-lid&gt; &lt;dst-lid&gt;</code> traces a path",
            "<code>ibping -G &lt;dst-guid&gt;</code>: uppercase -G treats the destination as a Port GUID (not LID), uses vendor MADs not ICMP; the remote node must run <code>ibping -S</code> (server mode) FIRST",
            "<code>perfquery</code> trap: error counters (SymbolErrorCounter, LinkErrorRecoveryCounter, LinkDownedCounter, PortXmitDiscards, PortRcvConstraintErrors, PortXmitWait) live in BASIC PortCounters (no -x) and saturate at small bit widths (LinkErrorRecovery and LinkDowned at 8-bit/255, SymbolErrorCounter at 16-bit/65535). The <code>-x</code> flag (PortCountersExtended) gives 64-bit versions of both throughput and, on capable HCAs, error counters; basic PortCounters error counters still saturate when read without -x",
            "Counter-to-fault decision tree: SymbolErrorCounter climbing alone = physical/cable layer; LinkErrorRecoveryCounter rising WITHOUT LinkDownedCounter = marginal self-healing link (replace it); PortXmitWait rising WITHOUT PortXmitDiscards = congestion building before drops; PortRcvConstraintErrors rising = PKey mismatch at the receive side",
            "<code>ibdiagnet</code> BER is version-split: <code>--ber_thresh</code> applies only to legacy SwitchX/ConnectX-3/4 (argument is the RECIPROCAL of target BER, so 1e-12 = 1000000000000). For EDR/HDR/NDR (ConnectX-5+, Quantum) use <code>--get_phy_info</code> (per-lane FEC histograms). <code>--pc</code> RESETS counters",
            "ibdiagnet2 writes to /var/tmp/ibdiagnet2/: ibdiagnet2.log (errors), ibdiagnet2.pm (counters), ibdiagnet2.cables (QSFP info), ibdiagnet2.db_csv (structured CSV); -o redirects output",
            "<code>sminfo</code>: SM state, priority, GUID, sweep status; identify master SM"
        ],
        "config": "# 1. Reset fabric counters and phy-layer baseline\nibdiagnet --pc --reset_phy_info\n\n# 2. Wait 5-10 min under traffic, then full diagnostics\nibdiagnet --get_phy_info --get_cable_info --routing\n\n# 3. Spot degraded / down / narrow links\niblinkinfo | grep -E \"Down|Polling|1x|2x\"\n\n# 4. Read basic counters (errors + throughput, 8/16-bit error fields) on a suspect port\nperfquery 5 1\n# then 64-bit extended counters via PortCountersExtended (-x includes both throughput and error fields)\nperfquery -x 5 1\n\n# 5. SM state / dual-master guard\nsminfo\nsaquery SMIR\n\n# 6. Credit-loop check on legacy fabric (ibdiagnet v1)\nibdiagnet -r -u\n\n# 7. Reachability test to a GUID (run ibping -S on the destination first)\nibping -G 0x0002c903001234ab",
        "show": "# Port counters: Lid 5 port 1 (CapMask: 0x5300)\nPortSelect:......................1\nCounterSelect:...................0x1b01\nSymbolErrors:....................47\nLinkRecovers:....................3\nLinkDowned:......................0\nRcvErrors:.......................0\nXmtDiscards:.....................0\nRcvConstraintErrors:.............0\nVL15Dropped:.....................0\nXmtData:.........................8472649621\nRcvData:.........................7391204418\nXmtPkts:.........................5103211\nRcvPkts:.........................4881037\nPortXmitWait:....................182941\n\n# Reading: SymbolErrors=47 rising (physical, check cable). LinkRecovers=3 with\n# LinkDowned=0 (marginal, self-healing). PortXmitWait=182941 rising with\n# XmtDiscards=0 (congestion building, not yet dropping). RcvConstraintErrors=0 (no PKey violations)."
    },
    {
        "n": 19,
        "tier": "P1",
        "obj": "4.2",
        "dom": 4,
        "freq": 84,
        "load": 72,
        "title": "Spectrum tools: WJH, NetQ, nv show, ibdump",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>WJH (What Just Happened)</code>: NVIDIA Spectrum ASIC hardware drop capture; logs every dropped packet with its reason at line rate; essential for silent packet loss in RoCEv2 fabrics",
            "WJH has TWO access paths: on-box via NVUE <code>nv show system wjh packet-buffer</code> (CL 5.3.0+), and off-box via the NetQ CLI <code>netq show wjh-drop</code>. The tool is bare <code>netq</code>, NOT cl-netq. If the NetQ agent is enabled on a switch, the local on-box WJH service stops, so the two cannot run simultaneously on the same switch",
            "WJH classifies every drop into exactly 6 categories: L1 (port down, bad signal, cable), L2 (VLAN mismatch, STP filter, SMAC=DMAC), L3 (blackhole route, unresolved next hop, TTL, checksum; legacy NetQ shows this category as Router), Tunnel (decap error, overlay SMAC), Buffer (WRED, tail drop, latency/TC congestion), ACL (ingress/egress port and router ACL). Trap: Buffer covers WRED and tail drop but NOT PFC holds, which backpressure upstream instead of dropping",
            "<code>NetQ</code>: off-box telemetry and validation platform; queries historical fabric state and tracks events over time. <code>netq check roce</code> validates fabric-wide consistency (a Mode error = lossless/lossy conflict; a Flow Control error = inconsistent PFC priority; a Classification error = DSCP-to-switch-priority drift)",
            "Two RoCE QoS-mismatch signatures: PFC priority mismatch shows <code>tx-pfc pause-packets</code> climbing on the switch while host keeps transmitting and <code>tx-roce unicast-no-buffer-discard</code> rising (fix: align host mlnx_qos --pfc bitmap). DSCP trust mismatch shows <code>rx-roce no-buffer-discard</code> climbing with PFC pause near zero (traffic landed in the wrong TC)",
            "PFC watchdog DEADLOCK: when pause frames loop, check <code>nv show interface swp1 qos pfc-watchdog</code> (status OK or DEADLOCK per traffic class; defaults polling 100ms, robustness 3). On DEADLOCK the switch auto-drops pause frames on that TC to break the storm",
            "<code>cl-resource-query</code> is legacy-but-surviving in CL 5.x; the exam-current preferred form is NVUE <code>nv show platform asic resource global</code> (and resource acl) for ASIC table utilization",
            "<code>ibdump</code>: an OFED HOST-side tool run on the HCA (captures Verbs, IPoIB, SMP MADs to .pcap for Wireshark); it is NOT a switch-side tool like WJH"
        ],
        "config": "# 1. Fabric-wide RoCE consistency check (NetQ)\nnetq check roce\n\n# 2. WJH drops from one leaf, last 24h (NetQ)\nnetq leaf01 show wjh-drop between now and 1d\n\n# 3. Filter to buffer drops (WRED / tail-drop)\nnetq leaf01 show wjh-drop buffer between now and 1d\n\n# 4. Real-time RoCE counters on uplink (NVUE, on-box)\nnv show interface swp1s0 qos roce counters\n\n# 5. On-box WJH packet buffer (NVUE, CL 5.3+)\nnv show system wjh packet-buffer\n\n# 6. PFC watchdog state per TC\nnv show interface swp1s0 qos pfc-watchdog\n\n# 7. ASIC resource utilization (preferred NVUE form)\nnv show platform asic resource global\n\n# 8. Clear RoCE counters before re-measuring after a fix\nnv action clear interface swp1s0 qos roce counters",
        "show": "cumulus@netq-ts:~$ netq check roce\n\nroce check result summary:\nTotal nodes                             : 8\nChecked nodes                           : 8\nFailed nodes                            : 3\n\nRoCE mode Test                 : 0 warnings, 1 errors\nRoCE Classification Test       : 0 warnings, 3 errors\nRoCE Congestion Control Test   : 0 warnings, 0 errors\nRoCE Flow Control Test         : 0 warnings, 2 errors\nRoCE ETS mode Test             : passed\n\nNode Name     Attribute             Value         NetQ Agent\nleaf01        roce mode             lossless      4.12\nleaf02        roce mode             lossy         4.12    <-- MODE MISMATCH\nleaf01        pfc-priority          3             4.12\nleaf03        pfc-priority          2             4.12    <-- FLOW CONTROL MISMATCH\n\ncumulus@switch:~$ nv show interface swp1 qos pfc-watchdog\n    traffic-class  status    deadlock-count\n    -------------  --------  --------------\n    0              OK        0\n    2              DEADLOCK  2\n    7              DEADLOCK  3"
    },
    {
        "n": 20,
        "tier": "P1",
        "obj": "4.3",
        "dom": 4,
        "freq": 64,
        "load": 50,
        "title": "Bring-up and validation workflow: OFED, BER, ib_write_bw baseline",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>ofed_info -s</code>: verify OFED driver version on host; must match across compute nodes for compatibility",
            "BER: the ibdiagnet operational port-level alarm triggers at <code>BER &lt;= 10^-12</code>. Exam trap: cable/transceiver QUALIFICATION uses a stricter effective BER below 1e-15 (post-FEC). The 1e-12 alarm and the 1e-15 qualification spec are different numbers for different purposes",
            "Raw vs effective BER: raw BER = pre-FEC errors at the physical layer; effective BER = post-FEC survivors. NDR RS-FEC(544,514) gives large gain, so raw ~1e-4 can yield effective below 1e-15. The 1e-12 ibdiagnet alarm is on EFFECTIVE (post-FEC) BER",
            "<code>ib_write_bw</code> baseline: NDR400 (4x100G PAM4) raw line rate is 400 Gb/s; practical ceiling at large messages is ~390-395 Gb/s after RS-FEC/header overhead. Below 380 Gb/s = problem; 392 = a normal/correct NDR result. HDR = 200 Gb/s, baseline 190+ Gb/s",
            "Reading 380 to 395 on NDR: 380-387 Gb/s = functional but possibly sub-optimal (too few queue pairs, PFC pausing, wrong GID index, or ECN marking). Default -q 1 is too low for NDR; use -q 4 to -q 8. 390-395 Gb/s = normal transport overhead, no concern",
            "algbw vs busbw: algbw = message size / time. busbw = <code>algbw * 2*(n-1)/n</code> for all-reduce (corrects for the send-and-receive ring nature); at large n the multiplier approaches 2.0 so busbw approaches 2x algbw. Only busbw is directly comparable to ib_write_bw; algbw alone is a trap metric",
            "The busbw 92% line-rate pass rule is field/cloud-SLA lore, NOT an official NVIDIA spec (nccl-tests PERFORMANCE.md states no percentage threshold). Confirmed field practice instead: busbw variance over 10% across runs warrants investigation",
            "Reading the ib_write_bw -a cliff: -a sweeps 2 bytes to 8MB, one row per power-of-two. An SM/HCA MTU mismatch (HCA 4096 but SM 2048) makes bandwidth plateau near the lower MTU boundary instead of climbing; the cliff appears at the misconfigured MTU size",
            "Bring-up sequence: verify physical links (iblinkinfo) -> SM online (sminfo) -> all nodes visible (ibhosts) -> routing correct (ibnetdiscover/ibroute) -> RDMA perf baseline (ib_write_bw)"
        ],
        "config": "# ib_write_bw single-port NDR test (start server first, no IP arg)\n# SERVER:\nib_write_bw -d mlx5_0 -i 1 -q 4 -F --report_gbits\n# CLIENT:\nib_write_bw -d mlx5_0 -i 1 -q 4 -F --report_gbits <server_ip>\n\n# Sweep all message sizes to see the bandwidth curve / cliff\nib_write_bw -d mlx5_0 -i 1 -q 4 -a -F --report_gbits <server_ip>\n\n# NCCL all-reduce across 16 GPUs on 2 nodes (8 each)\nmpirun -np 16 -N 8 --hostfile /root/hostfile --bind-to none \\\n  -x NCCL_IB_HCA=mlx5_0 -x NCCL_DEBUG=INFO \\\n  /opt/nccl-tests/build/all_reduce_perf -b 8M -e 8G -f 2 -g 1",
        "show": " #bytes     #iterations    BW peak[Gb/sec]    BW average[Gb/sec]\n 65536      100000         388.41             387.92\n 262144     100000         392.87             392.11\n 1048576    50000          394.28             393.98\n 4194304    10000          394.68             394.52\n 8388608    5000           394.72             394.61\n# Plateau above 390 Gb/s at large messages on a properly tuned NDR400 port.\n\n# nccl all_reduce_perf (16 GPUs / 2 NDR nodes; busbw = algbw * 1.875):\n#       size      time   algbw   busbw #wrong\n     8388608     427.3   19.63   36.81      0\n   536870912    5812.4  116.02  217.54      0\n  8589934592   76142.3  178.83  335.30      0\n# Avg bus bandwidth : 219.31 GB/s (mean across all sizes; peak busbw at largest size is the acceptance metric)"
    },
    {
        "n": 21,
        "tier": "P2",
        "obj": "5.1",
        "dom": 5,
        "freq": 80,
        "load": 56,
        "title": "NVUE CLI: nv set/unset/show/apply, Cumulus Linux",
        "dims": [
            "concept",
            "config",
            "scope"
        ],
        "bullets": [
            "<code>NVUE (NVIDIA User Experience)</code>: declarative CLI for Cumulus Linux on Spectrum switches; replaces the legacy net (NCLU) commands",
            "Three config states: <code>pending -> applied -> startup</code>. <code>nv set</code>/<code>nv unset</code> build the pending (candidate) config; <code>nv config apply</code> activates it as the running (applied) config; <code>nv config save</code> writes it to startup (<code>/etc/nvue.d/startup.yaml</code>) so it survives a reboot",
            "Cumulus Linux 5.9+ enables auto-save by default, so <code>nv config apply</code> also saves. On CL 5.8 and earlier (or with auto-save disabled via <code>nv set system config auto-save state disabled</code>) you MUST run <code>nv config save</code> or lose the config on reboot. Classic exam trap",
            "<code>nv config apply --confirm</code> arms a default 10-minute auto-rollback, configurable via nv config apply --confirm &lt;time&gt; (units s/m/h); keep the config with <code>nv config apply --confirm-yes</code>, abort with <code>--confirm-no</code>, check the countdown with <code>--confirm-status</code>; protects against locking yourself out over the mgmt link",
            "<code>nv config diff applied pending</code> previews exactly what apply would change; <code>nv config detach</code> discards all pending changes since the last apply (your undo for staged-but-not-applied edits)",
            "<code>nv config show</code> dumps the full pending config as YAML; <code>nv show &lt;object&gt;</code> displays operational or candidate state for one object",
            "<code>nv action &lt;...&gt;</code>: trigger one-shot operational actions (restart a service, clear counters)",
            "Cumulus Linux: NVIDIA's Linux-based NOS for Spectrum switches; standard Linux userspace, FRR for routing, NVUE for management"
        ],
        "config": "# Stage changes in the pending (candidate) config\ncumulus@switch:mgmt:~$ nv set interface swp1 ip address 10.1.1.1/31\ncumulus@switch:mgmt:~$ nv set interface swp1 link mtu 9216\ncumulus@switch:mgmt:~$ nv unset interface swp1 link state down\n\n# Review what apply would change (pending vs applied)\ncumulus@switch:mgmt:~$ nv config diff applied pending\n\n# Activate atomically into the running config\ncumulus@switch:mgmt:~$ nv config apply\n\n# Persist to startup.yaml (auto on 5.9+, required on 5.8 and earlier)\ncumulus@switch:mgmt:~$ nv config save",
        "show": "cumulus@switch:mgmt:~$ nv config diff applied pending\n  interface:\n    swp1:\n      ip:\n        address:\n+         10.1.1.1/31: {}\n      link:\n+       mtu: 9216\n-       state:\n-         down: {}"
    },
    {
        "n": 22,
        "tier": "P2",
        "obj": "5.2",
        "dom": 5,
        "freq": 50,
        "load": 46,
        "title": "Ansible nvidia.nvue collection: idempotent, test in NVIDIA Air",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "Ansible <code>nvidia.nvue</code> collection: official modules for configuring Cumulus Linux via NVUE. Install with <code>ansible-galaxy collection install nvidia.nvue</code>",
            "There is NO <code>nvue_config</code> module (the old card name is wrong). Two high-level modules: <code>nvidia.nvue.command</code> wraps the nv CLI on the box (with Jinja2 templating and auto-dialog handling) and <code>nvidia.nvue.api</code> wraps the NVUE REST API",
            "Object modules target one resource each: <code>nvidia.nvue.interface</code>, <code>bridge</code>, <code>vlan</code>/<code>vxlan</code>, <code>router</code>, <code>vrf</code>, <code>evpn</code>, <code>mlag</code>, <code>acl</code>, <code>service</code>, <code>system</code>, and <code>config</code>",
            "<code>nvidia.nvue.command</code> key params: <code>commands:</code> (a list of nv set/unset lines), <code>template:</code> (a Jinja2 block expanded to nv commands), <code>apply: true</code> to run nv config apply at the end, <code>atomic: true</code> to roll the batch back if any line fails, <code>assume_yes: true</code> to auto-confirm prompts",
            "Idempotent: the REST path is a 3-stage transaction (create a new config revision, PATCH it with the desired NVUE JSON, apply that revision). NVUE diffs desired vs running, so a second run changes nothing",
            "Test environment: use <code>NVIDIA Air</code> (free cloud sim for Cumulus) to develop and validate playbooks before deploying to physical fabric",
            "Sample playbooks (command.yml, api.yml, interface.yml, bridge.yml) ship under <code>~/.ansible/collections/ansible_collections/nvidia/nvue/examples</code>"
        ],
        "config": "- name: Configure Cumulus leaf via NVUE\n  hosts: cumulus\n  tasks:\n    - name: Set syslog server (unset old, set new)\n      nvidia.nvue.command:\n        commands:\n          - unset service syslog default server 1.1.1.1\n          - set service syslog default server 8.8.8.8\n        atomic: true\n        assume_yes: true\n\n    - name: Push prefix-list rules from variables (Jinja2 template)\n      nvidia.nvue.command:\n        template: |\n          {% for rule in rules %}\n          set router policy prefix-list PL rule {{ rule.id }} match {{ rule.match }}\n          set router policy prefix-list PL rule {{ rule.id }} action {{ rule.action }}\n          {% endfor %}\n        apply: true\n        assume_yes: true\n      vars:\n        rules:\n          - { id: 10, match: 1.1.1.1/32, action: permit }\n          - { id: 20, match: 8.8.8.8/32, action: deny }\n\n    - name: Get the current config via NVUE REST API\n      nvidia.nvue.api:\n        operation: get\n      register: output",
        "show": "PLAY RECAP *********************************************************************\nleaf01  : ok=3  changed=1  unreachable=0  failed=0\nleaf02  : ok=3  changed=0  unreachable=0  failed=0   # second run: no change = idempotent"
    },
    {
        "n": 23,
        "tier": "P2",
        "obj": "6.1",
        "dom": 6,
        "freq": 42,
        "load": 46,
        "title": "Network Operator, fabric side: DOCA-OFED, SR-IOV IB VFs, ib-kubernetes (isolation)",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>NVIDIA Network Operator</code>: Kubernetes operator that deploys and manages the RDMA networking stack on GPU nodes. It reconciles exactly ONE NicClusterPolicy named <code>nic-cluster-policy</code>; a policy with any other name is silently ignored (exam trap)",
            "Installs the OFED driver as a DaemonSet via the <code>ofedDriver</code> spec field; the image is now <code>doca-driver</code> (e.g. doca3.1.0-25.07-0.9.7.0-0 from nvcr.io/nvidia/mellanox). The product was historically MLNX_OFED; current docs call it the DOCA-OFED / DOCA driver",
            "This card is the FABRIC/isolation side: SR-IOV gives each pod its own dedicated Virtual Function (VF) for near-native RDMA with strict isolation but a finite VF count. For IB, VFs are created by an <code>SriovNetworkNodePolicy</code> with <code>linkType: IB</code>, <code>isRdma: true</code>, <code>numVfs: N</code>",
            "SR-IOV exposes the resource <code>nvidia.com/mlnxnics</code> (NOT a generic rdma/rdma string); pods request it under resources requests/limits. Shared-mode RDMA is the scale-side alternative (card n26)",
            "<code>ib-kubernetes</code> requires UFM running on top of OpenSM (UFM specifically, not raw opensm); it reads the pod annotation <code>mellanox.infiniband.app</code> and manages GUID + PKey membership via UFM. Credentials come from a secret named <code>ib-kubernetes-ufm-secret</code>. For SR-IOV IB it enforces ONE PKey per workload pod",
            "<code>Multus CNI</code> is the enabling mechanism here: it attaches the secondary SR-IOV interface to the pod alongside the cluster network",
            "Nodes are targeted by NFD labels, not hand-labeling: <code>feature.node.kubernetes.io/pci-15b3.present: \"true\"</code> (15b3 = Mellanox/NVIDIA PCI vendor ID)",
            "RDMA pods need the <code>IPC_LOCK</code> capability in securityContext to pin memory; missing it is the common pod-runs-but-verbs-fail trap. Requires the GPU Operator alongside for GPUDirect RDMA (separate but complementary)"
        ],
        "config": "apiVersion: mellanox.com/v1alpha1\nkind: NicClusterPolicy\nmetadata:\n  name: nic-cluster-policy   # MUST be this exact name\nspec:\n  ofedDriver:\n    image: doca-driver\n    repository: nvcr.io/nvidia/mellanox\n    version: doca3.1.0-25.07-0.9.7.0-0\n  secondaryNetwork:\n    multus:\n      image: multus-cni\n      repository: nvcr.io/nvidia/mellanox\n      version: network-operator-v25.7.0\n---\napiVersion: sriovnetwork.openshift.io/v1\nkind: SriovNetworkNodePolicy\nmetadata:\n  name: infiniband-sriov\n  namespace: nvidia-network-operator\nspec:\n  deviceType: netdevice\n  nodeSelector:\n    feature.node.kubernetes.io/pci-15b3.present: \"true\"\n  nicSelector:\n    vendor: \"15b3\"\n  linkType: IB\n  isRdma: true\n  numVfs: 8\n  resourceName: mlnxnics\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: sriov-ib-test-pod\n  annotations:\n    k8s.v1.cni.cncf.io/networks: sriov-ib-network\nspec:\n  containers:\n  - name: test\n    image: mellanox/rping-test\n    securityContext:\n      capabilities:\n        add: [\"IPC_LOCK\"]\n    resources:\n      requests:\n        nvidia.com/mlnxnics: '1'\n      limits:\n        nvidia.com/mlnxnics: '1'",
        "show": "$ kubectl get nicclusterpolicy\nNAME                 STATUS\nnic-cluster-policy   ready\n\n$ kubectl describe node\nCapacity:\n  nvidia.com/gpu:       8\n  nvidia.com/mlnxnics:  8\nAllocatable:\n  nvidia.com/gpu:       8\n  nvidia.com/mlnxnics:  8\n\n$ kubectl get pods -n nvidia-network-operator\nNAME                            READY   STATUS    RESTARTS   AGE\nmofed-ubuntu22.04-xxxxx         1/1     Running   0          12m\nkube-multus-ds-xxxxx            1/1     Running   0          12m\nsriov-device-plugin-xxxxx       1/1     Running   0          11m\nib-kubernetes-xxxxxxxxxx-xxxxx  1/1     Running   0          11m"
    },
    {
        "n": 24,
        "tier": "P2",
        "obj": "2.6",
        "dom": 2,
        "freq": 46,
        "load": 44,
        "title": "Spectrum-X Security: ACLs, NVUE RBAC, VRF-per-tenant, port security",
        "dims": [
            "concept",
            "config"
        ],
        "bullets": [
            "<code>NVUE RBAC</code>: the three built-in roles are <code>system-admin</code> (nv show + set/unset + apply + sudo, full OS shell), <code>nvue-admin</code> (nv show + set/unset + apply, no sudo), and <code>nvue-monitor</code> (nv show only, read-only). There is no nvue-operator role",
            "Assign a role: <code>nv set system aaa user &lt;user&gt; role &lt;role&gt;</code>",
            "ACL storage: legacy rules live in /etc/cumulus/acl/policy.d/ and install with cl-acltool -i; cl-acltool is NOT deprecated in 5.16. The modern path is NVUE ACL (nv set acl &lt;name&gt; type ipv4 rule &lt;n&gt; match/action, then bind to an interface)",
            "NVUE ACL has two attachment points: <code>nv set interface swp1 acl NAME inbound</code> (data plane, forwarded traffic) vs <code>nv set system control-plane acl NAME inbound</code> (CPU-bound management traffic)",
            "ACL police action gives CoPP-style rate-limiting with no separate CoPP framework: action police mode packet rate 100 burst 50; good for SSH brute-force or management floods",
            "Port security: enable the feature first (<code>port-security state enabled</code>) before mac-limit applies; default mac-limit 32 (range 1 to 512); default violation-mode is restrict (drop and log), not shutdown; can set protodown for err-disable; sticky-mac learns and locks the first N MACs. Does NOT work on bond members",
            "<code>VRF-per-tenant isolation</code>: each tenant gets a dedicated VRF; routing is isolated at the kernel level; inter-tenant traffic must traverse a firewall or explicit policy. Verify with ip route show vrf &lt;name&gt;",
            "SSH key-only hardening: disable password auth (PasswordAuthentication no), distribute authorized_keys via Ansible or ZTP to stop management-plane brute-force"
        ],
        "config": "# NVUE ACL: define, match, action, bind (modern path)\nnv set acl BLOCK_TELNET type ipv4\nnv set acl BLOCK_TELNET rule 10 match ip protocol tcp\nnv set acl BLOCK_TELNET rule 10 match ip tcp dest-port 23\nnv set acl BLOCK_TELNET rule 10 action deny\nnv set acl BLOCK_TELNET rule 20 action permit\nnv set interface swp1 acl BLOCK_TELNET inbound\nnv config apply\n\n# Control-plane policing (rate-limit SSH to CPU)\nnv set acl SSH_POLICE type ipv4\nnv set acl SSH_POLICE rule 10 match ip protocol tcp\nnv set acl SSH_POLICE rule 10 match ip tcp dest-port 22\nnv set acl SSH_POLICE rule 10 action police mode packet\nnv set acl SSH_POLICE rule 10 action police rate 100\nnv set acl SSH_POLICE rule 10 action police burst 50\nnv set system control-plane acl SSH_POLICE inbound\nnv config apply\n\n# RBAC (verified role names)\nnv set system aaa user netops role nvue-admin\nnv set system aaa user monitor role nvue-monitor\nnv set system aaa user admin2 role system-admin\nnv config apply\n\n# Port security\nnv set interface swp5 port-security state enabled  # (Cumulus 5.15+ syntax; pre-5.15 uses enable on)\nnv set interface swp5 port-security mac-limit 5\nnv set interface swp5 port-security violation-mode protodown\nnv set interface swp5 port-security sticky-mac enabled\nnv config apply\n\n# VRF-per-tenant isolation\nnv set vrf TENANT1 router bgp autonomous-system 65101\nnv set vrf TENANT1 evpn vni 5001\nnv config apply",
        "show": "cumulus@switch:~$ nv show system aaa role\nRole          Class\n------------  -------\nnvue-admin    nvapply\nnvue-monitor  nvshow\nsystem-admin  nvapply\n              sudo\n\ncumulus@switch:~$ nv show interface swp5 port-security\n                operational  applied\n--------------  -----------  --------\nstate           enabled      enabled\nmac-limit       5            5\nviolation-mode  protodown    protodown\nsticky-mac      enabled      enabled"
    },
    {
        "n": 25,
        "tier": "P2",
        "obj": "5.3",
        "dom": 5,
        "freq": 52,
        "load": 48,
        "title": "NVUE declarative config: startup.yaml, config history, rollback, ZTP",
        "dims": [
            "concept",
            "config"
        ],
        "bullets": [
            "<code>startup.yaml</code>: NVUE persists the saved config as YAML at <code>/etc/nvue.d/startup.yaml</code>; loaded on boot. <code>nv config save</code> is what writes it; prefer that over editing the file by hand",
            "There is NO <code>nv config rollback</code> command. Roll back WITHOUT reboot by RE-APPLYING a prior revision: <code>nv config apply &lt;rev&gt;</code> where &lt;rev&gt; is a number from <code>nv config history</code>, or the keywords <code>applied</code>, <code>startup</code>, or <code>empty</code>",
            "<code>nv config apply --confirm</code> arms a default 10-minute auto-rollback, configurable via nv config apply --confirm &lt;time&gt; (units s/m/h); keep with <code>--confirm-yes</code>, abort with <code>--confirm-no</code>, status via <code>--confirm-status</code>. The token in <code>nv config apply &lt;N&gt;</code> is a REVISION number, not seconds",
            "<code>nv config history</code> lists every applied revision (Rev, Apply Date, Type, User, Message); diff any two with <code>nv config diff &lt;rev1&gt; &lt;rev2&gt;</code> before re-applying one",
            "<code>nv config replace &lt;file.yaml&gt;</code> (CL 5.13+) loads an entire declarative config into pending; it is a FULL replace, so the file must contain everything you want to keep",
            "<code>Zero-Touch Provisioning (ZTP)</code>: on first boot eth0 DHCPs, sending option 60 vendor-class <code>cumulus-linux x86_64</code> and REQUESTING option 239 (the provisioning-script URL); ZTP can also source from USB or a local file",
            "The ZTP script must contain the literal <code>CUMULUS-AUTOPROVISIONING</code> flag or ZTP refuses to run it; the switch runs it as root. A script can drop a startup.yaml then run nv config apply for full day-1 config",
            "Ansible multi-switch inventory: define an inventory group per fabric role (leaf, spine, border), use host_vars/ for per-device config; idempotent because NVUE diffs current vs desired state"
        ],
        "config": "# List restorable revisions\ncumulus@leaf01:mgmt:~$ nv config history\n\n# Re-apply a known-good revision (no reboot)\ncumulus@leaf01:mgmt:~$ nv config apply 24\n\n# Or revert to last-saved startup config\ncumulus@leaf01:mgmt:~$ nv config apply startup\n\n# ZTP / DHCP option 239 server snippet\noption cumulus-provision-url code 239 = text;\nsubnet 192.0.2.0 netmask 255.255.255.0 {\n  range 192.0.2.100 192.0.2.200;\n  option cumulus-provision-url \"http://192.0.2.1/provision.sh\";\n}\n\n# ZTP script header (must carry the flag)\n#!/bin/bash\n# CUMULUS-AUTOPROVISIONING\nnv config replace /tmp/startup.yaml\nnv config apply --assume-yes\nexit 0",
        "show": "cumulus@leaf01:mgmt:~$ nv config history\nRev      ID    Apply Date            Type   User      Message\n26             2024-10-17 14:48:13   CLI    cumulus   Config update by cumulus\napplied        2024-10-17 14:47:04   CLI    cumulus   Config update by cumulus\n25             2024-10-17 14:29:46   CLI    cumulus   Config update by cumulus\n24             2024-10-17 14:26:46   CLI    cumulus   Config update by cumulus\n\ncumulus@leaf01:mgmt:~$ nv config apply --confirm\nApplied configuration will be rolled back after 10 minutes unless confirmed.\nConfiguration will be rolled back at 2025-09-17T15:47:59+00:00"
    },
    {
        "n": 26,
        "tier": "P3",
        "obj": "6.2",
        "dom": 6,
        "freq": 40,
        "load": 44,
        "title": "Network Operator, pod side: NicClusterPolicy CRD, shared RDMA, IPoIB vs MACVLAN (scale)",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>NicClusterPolicy CRD</code>: the single custom resource the operator reconciles; named exactly <code>nic-cluster-policy</code>. Sub-states: <code>ofedDriver</code>, <code>rdmaSharedDevicePlugin</code>, <code>sriovDevicePlugin</code>, <code>ibKubernetes</code>, <code>secondaryNetwork</code>, <code>nvIpam</code>, <code>nicConfigurationOperator</code>. Verify with <code>kubectl get nicclusterpolicy</code> (column is STATUS, value <code>ready</code> lowercase)",
            "This card is the SCALE/consumption side: the <code>rdmaSharedDevicePlugin</code> shares one HCA context across many pods per port, exposing a resource named in its configList as <code>rdma/&lt;resourceName&gt;</code> (conventionally <code>rdma/rdma_shared_device_a</code>, NOT rdma/rdma_shared_dev_iface)",
            "<code>rdmaHcaMax</code> in the shared-device config caps how many pods can share one HCA (e.g. 63); it is the scale knob shared mode trades for SR-IOV's hard VF count. In <code>kubectl describe node</code> the capacity for rdma/rdma_shared_device_a equals rdmaHcaMax, not a small VF count",
            "IPoIB vs MACVLAN map to fabric type: <code>IPoIB CNI</code> is for native InfiniBand fabrics (an IPoIBNetwork CR whose <code>master</code> field names the parent IB device, e.g. ibs1f0); <code>MACVLAN + shared RDMA</code> is for Ethernet/RoCEv2 fabrics. Choosing IPoIB on Ethernet (or MACVLAN-RoCE on pure IB) is a setup trap",
            "IPAM is required: the secondary network does NOT get a cluster-pod IP automatically. NVIDIA examples use <code>nv-ipam</code> (the nvIpam sub-state plus IPPool CRs with subnet, perNodeBlockSize, gateway); Whereabouts is the alternative",
            "<code>GPUDirect RDMA in pods</code>: a pod requests BOTH <code>nvidia.com/gpu: 1</code> (via GPU Operator) and an RDMA resource (<code>rdma/rdma_shared_device_a: 1</code>) in the same spec; data flows GPU VRAM to wire without touching host memory or CPU. The pod also needs Multus to attach the secondary net and the <code>IPC_LOCK</code> capability",
            "Verify GPUDirect in a pod: <code>ib_write_bw --use_cuda 0 &lt;peer-ip&gt;</code>; bandwidth should match the NIC line rate, not PCIe host-memory bandwidth"
        ],
        "config": "apiVersion: mellanox.com/v1alpha1\nkind: NicClusterPolicy\nmetadata:\n  name: nic-cluster-policy\nspec:\n  ofedDriver:\n    image: doca-driver\n    repository: nvcr.io/nvidia/mellanox\n    version: doca3.1.0-25.07-0.9.7.0-0\n  rdmaSharedDevicePlugin:\n    image: k8s-rdma-shared-dev-plugin\n    repository: nvcr.io/nvidia/mellanox\n    version: network-operator-v25.7.0\n    config: |\n      {\n        \"configList\": [\n          { \"resourceName\": \"rdma_shared_device_a\",\n            \"rdmaHcaMax\": 63,\n            \"selectors\": { \"ifNames\": [\"ibs1f0\"] } }\n        ]\n      }\n  nvIpam:\n    image: nvidia-k8s-ipam\n    repository: nvcr.io/nvidia/mellanox\n    version: network-operator-v25.7.0\n  secondaryNetwork:\n    multus:\n      image: multus-cni\n      repository: nvcr.io/nvidia/mellanox\n      version: network-operator-v25.7.0\n    ipoib:\n      image: ipoib-cni\n      repository: nvcr.io/nvidia/mellanox\n      version: network-operator-v25.7.0\n---\napiVersion: mellanox.com/v1alpha1\nkind: IPoIBNetwork\nmetadata:\n  name: ipoib-network-a\nspec:\n  networkNamespace: \"default\"\n  master: \"ibs1f0\"\n  ipam: '{ \"type\": \"nv-ipam\", \"poolName\": \"ipoib-pool-a\" }'\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: ipoib-test-pod-a\n  annotations:\n    k8s.v1.cni.cncf.io/networks: ipoib-network-a\nspec:\n  containers:\n  - name: test\n    image: mellanox/rping-test\n    securityContext:\n      capabilities:\n        add: [\"IPC_LOCK\"]\n    resources:\n      requests:\n        nvidia.com/gpu: 1\n        rdma/rdma_shared_device_a: 1\n      limits:\n        nvidia.com/gpu: 1\n        rdma/rdma_shared_device_a: 1",
        "show": "$ kubectl get nicclusterpolicy\nNAME                 STATUS\nnic-cluster-policy   ready\n\n$ kubectl describe node\nCapacity:\n  nvidia.com/gpu:               8\n  rdma/rdma_shared_device_a:    63\nAllocatable:\n  nvidia.com/gpu:               8\n  rdma/rdma_shared_device_a:    63\n# capacity = rdmaHcaMax (63), NOT a small VF count\n\n$ kubectl exec -it ipoib-test-pod-a -- ibstat\nCA 'mlx5_0'\n        State: Active\n        Physical state: LinkUp\n        Rate: 200\n        Link layer: InfiniBand"
    },
    {
        "n": 27,
        "tier": "P2",
        "obj": "3.12",
        "dom": 3,
        "freq": 46,
        "load": 44,
        "title": "BlueField DPU operating modes: NIC mode vs DPU mode, mlxconfig, DOCA install",
        "dims": [
            "concept",
            "config"
        ],
        "bullets": [
            "Three official modes: <code>DPU mode</code> (a.k.a. ECPF / embedded CPU function, the DEFAULT for DPU products, ARM owns the datapath), <code>Zero-trust mode</code> (DPU mode plus host lockout, set via <code>mlxprivhost</code> NOT mlxconfig), and <code>NIC mode</code> (ARM out of the datapath). BlueField SuperNIC defaults to NIC mode",
            "CRITICAL: the BF3 mode switch is <code>INTERNAL_CPU_OFFLOAD_ENGINE</code> (0 = DPU mode, 1 = NIC mode), NOT <code>INTERNAL_CPU_MODEL</code>. INTERNAL_CPU_MODEL is the BlueField-2 legacy knob (tied to the obsolete separated-host mode); on BF3 it only sets EMBEDDED_CPU (already the default) and does not switch the mode by itself",
            "On BF3 (fw v32.38.1002+) classic NIC mode (ARM does not boot) is obsolete, replaced by <code>Enhanced NIC mode</code> (ARM boots but is out of the datapath), which also needs <code>EXP_ROM_UEFI_ARM_ENABLE=1</code>",
            "Device paths: BF3 = <code>/dev/mst/mt41692_pciconf0</code>, BF2 = <code>/dev/mst/mt41686_pciconf0</code> (the old mt41686 example was BF2). LINK_TYPE_P1: IB = 1, ETH = 2",
            "<code>mlxconfig</code>: reads/writes non-volatile firmware config registers; <code>mlxconfig -d &lt;dev&gt; query</code> shows three columns (Default, Current, Next Boot). A change is pending until Next Boot differs and a full POWER CYCLE lands it (a soft reboot does NOT apply it). Common trap: settings look applied but do nothing until an AC cycle",
            "Zero-trust mode is set with <code>mlxprivhost</code> (flags like --disable_rshim), NOT mlxconfig. Confusing mlxconfig (NVM hardware config) with mlxprivhost (host privilege lockout) is a trap",
            "<code>DOCA install</code>: <code>bfb-install --rshim rshim0 --bfb &lt;image.bfb&gt;</code> pushes a BFB bundle to the DPU over RShim (the host-to-DPU management channel at /dev/rshim0/boot). The host needs the doca-host package first; the BFB ships with the DPU OS and DOCA runtime pre-bundled",
            "DOCA provides ARM-native APIs: <code>doca_flow</code> (packet pipeline), <code>doca_rdma</code> (RDMA from ARM), <code>doca_comm_channel</code> (host-to-DPU messaging), all with zero host CPU involvement"
        ],
        "config": "mst start\nmst status                       # BF3 = mt41692_pciconf0\n\n# Query current mode-relevant fields\nmlxconfig -d /dev/mst/mt41692_pciconf0 q | grep -iE \"offload|cpu_model|link_type|uefi_arm\"\n\n# DPU mode (default: ARM owns the datapath)\nmlxconfig -d /dev/mst/mt41692_pciconf0 s INTERNAL_CPU_OFFLOAD_ENGINE=0\n\n# Enhanced NIC mode (BF3 fw >= 32.38.1002; ARM boots, out of datapath)\nmlxconfig -d /dev/mst/mt41692_pciconf0 s INTERNAL_CPU_MODEL=1 INTERNAL_CPU_OFFLOAD_ENGINE=1\nmlxconfig -d /dev/mst/mt41692_pciconf0 s EXP_ROM_UEFI_ARM_ENABLE=1\n\n# Set port link type (IB=1, ETH=2)\nmlxconfig -d /dev/mst/mt41692_pciconf0 s LINK_TYPE_P1=2\n# Full AC power cycle required for any of the above to take effect.\n\n# DOCA / OS provisioning on the DPU (run on the host)\nbfb-install --rshim rshim0 --bfb bf-bundle-2.7.0_24.04_ubuntu-22.04_prod.bfb",
        "show": "Device #1:\n----------\nDevice type:    BlueField3\nDescription:    NVIDIA BlueField-3 B3220 P-Series DPU\nImage type:     BlueField3FW\n\nConfigurations:                   Default          Current          Next Boot\nINTERNAL_CPU_MODEL                EMBEDDED_CPU(1)  EMBEDDED_CPU(1)  EMBEDDED_CPU(1)\nINTERNAL_CPU_OFFLOAD_ENGINE       ENABLED(0)       ENABLED(0)       ENABLED(0)\nEXP_ROM_UEFI_ARM_ENABLE           True(1)          True(1)          True(1)\nLINK_TYPE_P1                      ETH(2)           ETH(2)           ETH(2)\n# ENABLED(0) on INTERNAL_CPU_OFFLOAD_ENGINE = DPU mode; after switching to NIC mode the Next Boot column shows DISABLED(1)."
    },
    {
        "n": 28,
        "tier": "P1",
        "obj": "3.13",
        "dom": 3,
        "freq": 54,
        "load": 44,
        "title": "IB SM High-Availability: redundant SM priority, failover, UFM Cyber-AI",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "IB supports multiple SM instances; only ONE is <code>Master</code>, the rest are <code>Standby</code>. Priority is a 4-bit SMINFO field, range 0 to 15 (16 values), highest wins. A vendor UI capping at 13 is a product cap, not the protocol limit",
            "opensm default priority is 0 (<code>sm_priority 0</code>; CLI flag -p / --priority). Two unconfigured opensm instances both sit at 0, so the lower GUID decides the master, not whoever started first. Always set priority explicitly in production",
            "GUID tiebreak direction (top trap): at EQUAL priority the numerically <code>LOWER GUID wins</code>, not the higher (opensm source osm_sminfo_rcv.c and IB spec C14-60.2.1). Configure priority asymmetrically (primary=15, standby=13) to control the preferred master",
            "Failover is NOT instant by default: a standby polls the master every <code>sminfo_polling_timeout</code> (default 10000 ms) and declares it dead after <code>polling_retry_number</code> (default 4) misses, so up to ~40s by default; then the new master runs a HEAVY sweep that recomputes all forwarding tables (flows disrupted during recompute). Tune the two knobs to shorten",
            "Commands: <code>sminfo</code> shows SM lid/guid/priority/state (state 3 = MASTER, 2 = STANDBY); <code>saquery SMIR</code> (SMInfoRecord) enumerates all SMs with state and priority. Note <code>saquery -s</code> returns PortInfoRecords filtered by the isSM bit, not the SMInfoRecord",
            "UFM HA: an active/standby pair using DRBD block replication of <code>/opt/ufm/files</code> (SA DB, topology, state), Pacemaker/heartbeat for health, and a floating VIP. On failover the standby owns the VIP and runs opensm as master with the SA DB already synced",
            "<code>UFM Cyber-AI</code>: integrated anomaly detection in UFM; monitors BER trends, link flap rates, congestion hotspots, and SM election events; detects FABRIC-level anomalies (not host intrusions) and can trigger automated remediation such as isolating a flapping port",
            "Best practice: run at least two UFM/SM instances on separate physical hosts; never run an SM on a GPU compute node (SM failure during training = fabric instability)"
        ],
        "config": "# /etc/rdma/opensm.conf  --  PRIMARY\nsm_priority 15\nsminfo_polling_timeout 10000\npolling_retry_number 4\n\n# /etc/rdma/opensm.conf  --  STANDBY\nsm_priority 13\nsminfo_polling_timeout 10000\npolling_retry_number 4\n\n# Or via CLI:\nopensm -p 15    # primary\nopensm -p 13    # standby",
        "show": "# sminfo  (master)\nsminfo: sm lid 58 sm guid 0x3ba000100c70a, activity count 47808 priority 15 state 3 SMINFO_MASTER\n\n# saquery SMIR  (enumerate all SMs)\nSMInfoRecord dump:\n    SM_GUID..... 0x0002c9030010b250\n    Priority.... 15\n    SMState..... MASTER (3)\nSMInfoRecord dump:\n    SM_GUID..... 0x0002c9030010d840\n    Priority.... 13\n    SMState..... STANDBY (2)\n# State codes: 3 = MASTER, 2 = STANDBY"
    },
    {
        "n": 29,
        "tier": "P3",
        "obj": "1.2",
        "dom": 1,
        "freq": 44,
        "load": 46,
        "title": "AI collective ops: all-reduce topology, bandwidth, oversubscription",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>AllReduce</code>: every GPU contributes a gradient tensor and the reduced result returns to every GPU; total data moved = 2(N-1)/N * message_size, approaching about 2x the tensor size for large N",
            "Correction factors differ by collective: AllReduce = 2(N-1)/N (the only common 2x); AllGather, ReduceScatter, AlltoAll = (N-1)/N; Broadcast and Reduce = 1. Do not over-apply the 2x",
            "Ring-AllReduce = a ReduceScatter phase then an AllGather phase over a ring (NCCL default); every link is active each step",
            "algbw vs busbw: <code>algbw</code> = message_size / time (what the app sees); <code>busbw</code> = algbw times the correction factor (what the hardware link sustains). A healthy fabric shows busbw climbing to a plateau near line rate; common pass bar is busbw at or above roughly 92 to 95 percent of NIC line rate",
            "Because AllReduce moves about 2x the data, any oversubscription on the path directly caps busbw; collectives are barrier-synchronous so the whole step waits on the slowest rank. This is the design argument for a 1:1 non-blocking compute fabric",
            "Oversubscription ratio = aggregate host bandwidth to fabric bandwidth: 1:1 = non-blocking (ideal); 2:1 = half the bandwidth per host on average. Rail-optimization spreads a node's NICs across separate leaves so each GPU rail gets a dedicated uplink (effective 1:1)",
            "SHARP offload changes the math: reducing inside the IB switch (in-network computing) raises effective AllReduce busbw above the naive ring ceiling; a SuperPOD/Quantum feature",
            "Validate the real fabric with nccl-tests all_reduce_perf: sweep message sizes and read the busbw plateau against NIC line rate to confirm the topology delivers its designed non-blocking bandwidth"
        ],
        "config": "# Build NVIDIA nccl-tests (one time)\ngit clone https://github.com/NVIDIA/nccl-tests\ncd nccl-tests && make MPI=1 MPI_HOME=/usr/lib/x86_64-linux-gnu/openmpi\n\n# Single node, 8 GPUs: AllReduce sweep 8 bytes up to 8 GB\n./build/all_reduce_perf -b 8 -e 8G -f 2 -g 8\n\n# Multi-node over InfiniBand (16 GPUs across 2 nodes) via MPI,\n# pin NCCL to the IB HCAs so it does not fall back to TCP\nmpirun -np 16 -H node1:8,node2:8 \\\n  -x NCCL_IB_HCA=mlx5 \\\n  -x NCCL_DEBUG=INFO \\\n  ./build/all_reduce_perf -b 8 -e 8G -f 2 -g 1\n# flags: -b begin size, -e end size, -f 2 doubles each step, -g GPUs per thread",
        "show": "#       size         count  type   redop  root    time   algbw   busbw  #wrong\n#        (B)      (elements)                  (us)  (GB/s)  (GB/s)\n     8388608        2097152  float    sum    -1    180    46.6    81.6      0\n    33554432        8388608  float    sum    -1    310   108.2   189.4      0\n   134217728       33554432  float    sum    -1    870   154.3   270.0      0\n   536870912      134217728  float    sum    -1   3489   153.9   302.9      0\n  1073741824      268435456  float    sum    -1   6060   177.2   348.8      0\n  2147483648      536870912  float    sum    -1  11523   186.4   366.9      0\n# Avg bus bandwidth : 309.7 GB/s\n# busbw = algbw * 2*(n-1)/n; it climbs then plateaus; the plateau vs line rate is the pass/fail signal"
    },
    {
        "n": 30,
        "tier": "P2",
        "obj": "2.4-air",
        "dom": 2,
        "freq": 50,
        "load": 42,
        "title": "NVIDIA Air: digital-twin sim, validate Cumulus/SONiC before hardware",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>NVIDIA Air</code>: free cloud-hosted 1:1 network digital twin (not a topology drawing); it boots the SAME Cumulus Linux or SONiC switch images and the same NVUE config you will run on real hardware",
            "Use it to validate golden configs, NVUE templates, and Ansible playbooks BEFORE any switch arrives or before a change window, so day-1 config and upgrades are proven against the actual NOS",
            "A simulation is a topology of virtual switches plus servers; you SSH into the virtual oob-mgmt-server, then into each switch (cumulus@leaf01), and run nv set / nv config apply exactly as on metal",
            "Same artifacts move both ways: a startup.yaml or playbook validated in Air deploys unchanged to the physical fabric (and a captured production topology can be re-created in Air for repro)",
            "Scope: this is the sub-objective 2.4 design/validation tool inside the 30 percent Spectrum-Ethernet domain; it complements (does not replace) on-hardware testing for timing and optics",
            "Note: sample bandwidth and timing in Air are simulated, not a substitute for real-fabric BER or ib_write_bw numbers [inferred]"
        ],
        "show": "# Air: SSH into the management server, then the virtual leaf\nubuntu@oob-mgmt-server:~$ ssh cumulus@leaf01\ncumulus@leaf01:mgmt:~$ nv show platform\n               operational\n-------------  -----------\nsystem-type    VX             # VX = virtual (Cumulus VX image running in Air)\nasic-model     vx\n# the same nv set / nv config apply workflow runs here as on a real SN5600\n# topology and outputs here are a simulated digital twin, not real fabric data"
    },
    {
        "n": 31,
        "tier": "P2",
        "obj": "5.1-clrq",
        "dom": 4,
        "freq": 58,
        "load": 48,
        "title": "cl-resource-query: ASIC hardware table utilization (routes, hosts, MACs, ECMP, ACL)",
        "dims": [
            "concept",
            "scope"
        ],
        "bullets": [
            "<code>cl-resource-query</code>: dumps current-vs-max utilization of the Spectrum ASIC forwarding tables (IPv4/IPv6 routes, host entries, MAC entries, ECMP next-hops, ACL regions) as a count and a percent of the silicon maximum",
            "Why it matters: hardware-table overflow is SILENT. When a table hits its max the switch stops offloading new entries to the ASIC and falls back to slow-path or drops them, with no obvious log; you catch it by watching the percent-of-max column climb",
            "Exam-current preferred form is the NVUE command <code>nv show platform asic resource global</code> (and <code>nv show platform asic resource acl</code>); <code>sudo cl-resource-query</code> is the legacy alias that still works in CL 5.x",
            "Read it like a capacity gauge: any line approaching 100 percent of maximum is the table to watch (a leaf summarizing too many routes, or an ACL rule-set near the TCAM limit)",
            "Scope: this is a domain-4 troubleshooting/validation check (spot a table nearing the limit before routes stop programming); pairs with WJH (drops) and NetQ (history)",
            "Note: the counts and percentages shown are simulated representative values, not a reading off a real ASIC [inferred]"
        ],
        "show": "cumulus@leaf01:mgmt:~$ nv show platform asic resource global\n                  count  maximum  % of maximum value\n----------------  -----  -------  ------------------\nipv4-routes        18342   131072   14\nipv6-routes         4096    20480   20\nhost-entries        9011    49152   18\nmac-entries        12087    81920   15\necmp-nexthops       1842    16384   11\n\ncumulus@leaf01:mgmt:~$ sudo cl-resource-query   # legacy alias, same data\n  ACL Regions, ingress:  42,  50% of maximum\n  ACL Regions, egress:   12,  25% of maximum\n# watch the % of maximum column; a table near 100% stops offloading silently\n# (counts shown are simulated representative values, not real ASIC data)"
    }
  ];

  // ── Confusable pairs (A vs B) ──────────────────────────────
  var NCPAIN_PAIRS = [
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

  // ── Per-pillar normalized factors (each 0..1) ─────────────
  function _D(p) { return (DOMAIN_WEIGHT[p.dom] || 0) / 30; }
  function _T(p) { return TIER_FACTOR[p.tier] || 0; }
  function _F(p) { return (p.freq || 0) / 100; }
  function _L(p) { return (p.load || 0) / 100; }

  // ExamValue 0..10.
  function pillarValue(p) {
    var w = VALUE_WEIGHTS;
    var v = 10 * (w.D * _D(p) + w.T * _T(p) + w.F * _F(p) + w.L * _L(p));
    return Math.round(v * 100) / 100;
  }

  function _dimsOf(p) { return (p.dims && p.dims.length) ? p.dims : ['concept', 'scope']; }

  function _backedDimsOf(p) {
    var pc = (typeof window !== 'undefined') ? window.NCPAIN_PILLAR_CHECKS : null;
    if (!pc) { return null; }
    var authored = pc[p.n];
    if (!authored) { return []; }
    var declared = _dimsOf(p);
    var out = [];
    for (var i = 0; i < declared.length; i++) {
      if (Object.prototype.hasOwnProperty.call(authored, declared[i])) { out.push(declared[i]); }
    }
    return out;
  }

  function _applicableDims(p) {
    var backed = _backedDimsOf(p);
    if (backed === null) { return _dimsOf(p); }
    return backed;
  }

  function pillarGap(p, checks) {
    var dims = _applicableDims(p);
    var c = (checks && checks[p.n]) || {};
    var passed = 0;
    for (var i = 0; i < dims.length; i++) { if (c[dims[i]] === true) passed++; }
    return dims.length ? (1 - passed / dims.length) : 1;
  }

  function _isZeroCheck(p) {
    var backed = _backedDimsOf(p);
    return backed !== null && backed.length === 0;
  }

  function pillarROI(p, checks) {
    if (_isZeroCheck(p)) { return 0; }
    return Math.round(pillarValue(p) * pillarGap(p, checks) * 100) / 100;
  }

  function pillarMastered(p, checks) {
    return pillarGap(p, checks) === 0;
  }

  function readiness(checks) {
    var sumV = 0, sumVR = 0;
    var domV = {}, domVR = {};
    for (var i = 0; i < NCPAIN_PILLARS_DATA.length; i++) {
      var p = NCPAIN_PILLARS_DATA[i];
      if (_isZeroCheck(p)) { continue; }
      var v = pillarValue(p);
      var r = 1 - pillarGap(p, checks);
      sumV += v; sumVR += v * r;
      domV[p.dom] = (domV[p.dom] || 0) + v;
      domVR[p.dom] = (domVR[p.dom] || 0) + v * r;
    }
    var byDomain = {};
    for (var d in domV) {
      if (Object.prototype.hasOwnProperty.call(domV, d)) {
        byDomain[d] = domV[d] ? Math.round(1000 * domVR[d] / domV[d]) / 10 : 0;
      }
    }
    return {
      overall: sumV ? Math.round(1000 * sumVR / sumV) / 10 : 0,
      byDomain: byDomain
    };
  }

  var _TIER_RANK = { P1: 0, P2: 1, P3: 2, P4: 3 };
  function studyNext(checks) {
    return NCPAIN_PILLARS_DATA.filter(function (p) { return !_isZeroCheck(p); }).sort(function (a, b) {
      var ra = pillarROI(a, checks), rb = pillarROI(b, checks);
      if (rb !== ra) return rb - ra;
      var ta = _TIER_RANK[a.tier], tb = _TIER_RANK[b.tier];
      if (ta !== tb) return ta - tb;
      return a.n - b.n;
    });
  }

  // ── Expose on window ──────────────────────────────────────
  window.NCPAIN_PILLARS_DATA   = NCPAIN_PILLARS_DATA;
  window.NCPAIN_PAIRS          = NCPAIN_PAIRS;
  window.NCPAIN_VALUE_WEIGHTS  = VALUE_WEIGHTS;
  window.NCPAIN_TIER_FACTOR    = TIER_FACTOR;
  window.NCPAIN_DOMAIN_WEIGHT  = DOMAIN_WEIGHT;
  window.ncpainPillarValue     = pillarValue;
  window.ncpainPillarGap       = pillarGap;
  window.ncpainPillarROI       = pillarROI;
  window.ncpainPillarMastered  = pillarMastered;
  window.ncpainReadiness       = readiness;
  window.ncpainStudyNext       = studyNext;
  window.ncpainIsZeroCheck     = _isZeroCheck;
  window.ncpainActivePillars   = function () { return NCPAIN_PILLARS_DATA.filter(function (p) { return !_isZeroCheck(p); }); };
})();
