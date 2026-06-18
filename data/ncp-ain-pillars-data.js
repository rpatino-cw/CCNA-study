/* ══════════════════════════════════════════════════════════════════════
   ncp-ain-pillars-data.js  SINGLE SOURCE OF TRUTH for NVIDIA NCP-AIN
   23 pillars (P1-P2). Domain weights from NCP-AIN official blueprint.
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

    // ── D1 AI DC Design ───────────────────────────────────────
    { n:1, tier:'P2', obj:'1.1', dom:1, freq:40, load:32, title:'AI Factory Architecture: rail-optimized fat-tree',
      dims:['concept','scope'],
      bullets:[
        'AI Factory: purpose-built infrastructure unit for large-scale GPU cluster training workloads',
        'Rail-optimized fat-tree: each GPU NIC connects to a distinct leaf switch rail; maximizes GPU-to-GPU bandwidth',
        'Scalable unit: compute plane (GPU nodes) + storage plane + out-of-band management network',
        'NVIDIA Air: cloud-hosted network emulation platform; simulate NCP-AIN topologies before lab deployment',
        'Fat-tree provides 1:1 non-blocking bisection bandwidth when rail-optimized; critical for collective ops (AllReduce)'
      ] },

    // ── D3 InfiniBand ─────────────────────────────────────────
    { n:2, tier:'P1', obj:'3.1', dom:3, freq:78, load:72, title:'IB link speeds: SDR through XDR (4x lane series)',
      dims:['concept','scope'],
      bullets:[
        'All speeds are for the 4x port width (standard HCA/switch port). Per-lane speed doubles each generation.',
        '<code>SDR</code> = 10 Gb/s (2.5 Gb/s per lane, NRZ)',
        '<code>DDR</code> = 20 Gb/s (5 Gb/s per lane, NRZ)',
        '<code>QDR</code> = 40 Gb/s (10 Gb/s per lane, NRZ)',
        '<code>FDR</code> = 56 Gb/s (14 Gb/s per lane, NRZ) -- introduced at FDR due to 14G signaling',
        '<code>EDR</code> = 100 Gb/s (25 Gb/s per lane, NRZ)',
        '<code>HDR</code> = 200 Gb/s (50 Gb/s per lane, PAM4)',
        '<code>NDR</code> = 400 Gb/s (100 Gb/s per lane, PAM4) -- OSFP twin-port: one OSFP = two NDR400 ports',
        '<code>XDR</code> = 800 Gb/s (200 Gb/s per lane, PAM4) -- emerging; ConnectX-8 / Quantum-3',
        'NDR uses PAM4 modulation (4-level pulse amplitude); enables 100G per lane on same fiber as EDR at 25G',
        'OSFP twin-port: a single OSFP transceiver presents two independent NDR400 logical ports to the ASIC'
      ] },

    { n:3, tier:'P1', obj:'3.2', dom:3, freq:75, load:68, title:'Quantum-2 QM9700 vs QM9790: 64x NDR400, 25.6 Tbps',
      dims:['concept','scope'],
      bullets:[
        'Both are 1U, 64-port NDR400 switches; aggregate bandwidth = 64 x 400 Gb/s = <code>25.6 Tbps</code>',
        '<code>QM9700</code> = managed switch: runs Subnet Manager internally, supports UFM, full IB management stack',
        '<code>QM9790</code> = unmanaged (self-contained) switch: no SM on-board; requires external opensm or UFM to manage the fabric',
        'QM9790 is lower-cost and commonly used for fixed-size leaf/spine pods where a central UFM manages all switches',
        '64 ports at NDR400 (4x 100G PAM4); OSFP transceivers; line-rate non-blocking switching'
      ] },

    { n:4, tier:'P1', obj:'3.3', dom:3, freq:80, load:74, title:'Subnet Manager: LIDs, GIDs, SM priority, sweep',
      dims:['concept','scope'],
      bullets:[
        'The Subnet Manager (SM) is the IB control plane: assigns LIDs, configures routing tables (LFTs), manages fabric events',
        '<code>LID (Local Identifier)</code>: 16-bit address scoped to the subnet. Unicast range: <code>0x0001 to 0xBFFF</code> (48000 addresses). Multicast range: <code>0xC000 to 0xFFFE</code> (16000 addresses).',
        '<code>GID (Global Identifier)</code>: 128-bit address = 64-bit subnet prefix + 64-bit GUID (port-unique); used for global routing and record keeping',
        'SM priority: 4-bit field, values 0-15; <code>highest numeric priority wins</code> the master SM election. Tie-break: lowest GUID becomes master.',
        'Master SM runs; all others become standby and monitor via periodic polls',
        'Sweep types: <code>light sweep</code> (periodic, default <code>10 seconds</code>) polls SM peers; <code>heavy sweep</code> re-discovers all nodes and reconfigures LFTs after topology change',
        'Default subnet MTU: <code>4096 bytes</code>',
        'Implementations: <code>opensm</code> (open-source, runs on Linux host), <code>UFM</code> (NVIDIA Unified Fabric Manager, required for advanced features like SHARP and telemetry)'
      ] },

    { n:5, tier:'P1', obj:'3.4', dom:3, freq:72, load:65, title:'Virtual Lanes and SL/QoS: VL0-VL15, credit-based flow control',
      dims:['concept','scope'],
      bullets:[
        'IB defines <code>16 Virtual Lanes</code> per physical link: VL0 through VL14 carry data; <code>VL15</code> is reserved for SM/management traffic only',
        'VL15 never competes with data traffic; ensures SM communications are always delivered even under fabric congestion',
        '<code>SL (Service Level)</code>: 16 service levels (SL0-SL15), specified by the application in send requests',
        'SL-to-VL mapping (SL2VL): configured by the SM; maps each SL to a physical VL for QoS differentiation',
        'Flow control: <code>credit-based</code>; receiver grants credits to sender; sender only transmits when it holds credits for the destination buffer; prevents head-of-line blocking',
        'Multiple VLs allow concurrent independent flows on a single link, avoiding head-of-line blocking between QoS classes'
      ] },

    { n:6, tier:'P1', obj:'3.5', dom:3, freq:68, load:60, title:'PKeys: 16-bit partition keys, full/limited member, multi-tenancy',
      dims:['concept','scope'],
      bullets:[
        '<code>PKey (Partition Key)</code>: 16-bit value used to segment an IB subnet into logical partitions for multi-tenancy',
        'High bit = membership type: <code>1 = full member</code> (can communicate with all members), <code>0 = limited member</code> (can only communicate with full members of same partition)',
        'Default PKey: <code>0x7FFF</code> (full membership bit = 0 in the low 15 bits; value = 0xFFFF with high bit = full)',
        'Actually: default PKey is <code>0xFFFF</code> (full member, partition 0x7FFF). Low 15 bits = <code>0x7FFF</code>.',
        'SM assigns PKeys to ports via <code>PortInfo</code>; each port may belong to multiple partitions',
        'PKey isolation: nodes in different partitions cannot communicate even if physically reachable; used for tenant isolation in shared IB fabrics'
      ] },

    { n:7, tier:'P1', obj:'3.6', dom:3, freq:74, load:66, title:'IB routing and Adaptive Routing: fat-tree min-hop, AR by credit',
      dims:['concept','scope'],
      bullets:[
        'IB routing is table-driven: the SM programs <code>Linear Forwarding Tables (LFTs)</code> in each switch; each entry maps a destination LID to an output port',
        'Fat-tree algorithm: <code>up-down routing</code> -- traffic goes up toward the spine then down to the destination; min-hop path; no cycles',
        'Rail-optimized topology: each GPU NIC is connected to a different leaf switch; all-to-all collectives distribute across all rails simultaneously',
        '<code>Adaptive Routing (AR)</code>: hardware dynamically selects among equal-cost paths based on <code>per-output-port credit availability</code>; avoids congested paths in real time without SM intervention',
        'AR is distinct from ECMP (which is per-flow static hash); AR is per-packet or per-burst within a flow',
        'Dragonfly+ topology: high-radix switches interconnected as groups; AR is essential for load balancing in dragonfly fabrics',
        'LFT programming: SM uses <code>ibstat / ibroute</code> for inspection; AR configuration via UFM or switch CLI'
      ] },

    { n:8, tier:'P1', obj:'3.7', dom:3, freq:65, load:58, title:'SHARP in-network compute: AllReduce offload, aggregation tree',
      dims:['concept','scope'],
      bullets:[
        '<code>SHARP (Scalable Hierarchical Aggregation and Reduction Protocol)</code>: offloads collective operations (AllReduce, AllGather, Barrier) to the IB switch ASICs',
        'Without SHARP: AllReduce requires all data to flow to a root node, aggregate, then scatter back -- O(N) traffic',
        'With SHARP: switches along the aggregation tree perform the reduction in-flight; data never leaves the network fabric for aggregation',
        'Requires <code>UFM</code> to configure and manage SHARP aggregation trees; not supported with opensm alone',
        'SHARP aggregation trees are provisioned by UFM based on the job topology; supports multiple concurrent SHARP sessions',
        'Benefit: dramatic reduction in AllReduce latency for large AI training jobs; scales better than NCCL-only collectives for large cluster sizes',
        'SHARP vs NCCL: NCCL runs on the GPU/CPU and uses the network as a pipe; SHARP moves compute INTO the network switches'
      ] },

    // ── D2 Spectrum (Ethernet) ────────────────────────────────
    { n:9, tier:'P1', obj:'2.1', dom:2, freq:76, load:70, title:'Spectrum-4 ASIC: 51.2 Tbps, SN5600 64x800G, Spectrum-X',
      dims:['concept','scope'],
      bullets:[
        '<code>Spectrum-4</code>: NVIDIA\'s 4th-gen Ethernet switch ASIC; aggregate bandwidth = <code>51.2 Tbps</code>',
        '<code>SN5600</code>: 1U switch built on Spectrum-4; <code>64 ports at 800G</code> (64 x 800 Gb/s = 51.2 Tbps)',
        '<code>Spectrum-X</code>: platform combining Spectrum-4 switches + ConnectX-7 SmartNICs + NVIDIA software stack; optimized end-to-end for AI/ML Ethernet fabrics with RoCEv2',
        'Spectrum-4 natively supports RoCEv2, PFC, ECN, DCQCN, and Adaptive Routing for lossless AI workloads',
        'Compare: Spectrum-4 = 51.2 Tbps (800G Ethernet); Quantum-2 = 25.6 Tbps (NDR400 InfiniBand)'
      ] },

    { n:10, tier:'P1', obj:'2.2', dom:2, freq:80, load:74, title:'RoCEv2: RDMA over UDP 4791, routable L3, GPUDirect RDMA',
      dims:['concept','scope'],
      bullets:[
        '<code>RoCEv2 (RDMA over Converged Ethernet v2)</code>: encapsulates IB transport payload in <code>UDP, destination port 4791</code>; adds an IP header for L3 routability',
        'RoCEv1 was L2-only (Ethertype 0x8915); RoCEv2 is L3-routable, enabling multi-subnet RDMA',
        'Transport types: <code>RC (Reliable Connected)</code> -- per-flow ACK/retransmit; <code>UC (Unreliable Connected)</code>; <code>UD (Unreliable Datagram)</code>',
        'RC is used for most GPU-to-GPU traffic (guarantees delivery); UD used for multicast-style operations',
        '<code>GPUDirect RDMA</code>: GPU memory is directly DMA-able by the NIC; CPU is bypassed; data path: GPU VRAM --> PCIe --> NIC --> wire (and reverse)',
        '<code>Lossless requirement</code>: RoCEv2 RC transport has no built-in retransmit buffer at scale; fabric MUST be lossless (PFC or ECN+DCQCN) to prevent go-back-N retransmit storms',
        'RoCEv2 enables Spectrum-X (Ethernet) fabrics to deliver IB-class RDMA performance for AI training',
        'Key numbers: <code>UDP 4791</code>, <code>L3 routable</code>, requires lossless fabric, GPUDirect bypasses CPU'
      ] },

    { n:11, tier:'P1', obj:'2.3', dom:2, freq:82, load:76, title:'PFC + ECN + DCQCN: lossless Ethernet congestion pipeline',
      dims:['concept','scope'],
      bullets:[
        '<code>PFC (Priority Flow Control, 802.1Qbb)</code>: link-level PAUSE on a per-priority basis; when a switch buffer fills for a given priority, it sends a PAUSE frame to the upstream sender on that priority only; prevents drop but adds latency',
        'PFC operates at L2 (link-by-link); it is reactive -- triggers only when the buffer is near-full (watermark threshold)',
        '<code>ECN (Explicit Congestion Notification)</code>: switch marks the <code>CE (Congestion Experienced)</code> bit in the IP header when queue depth exceeds a threshold; end-hosts detect the mark and reduce send rate proactively',
        'ECN is proactive -- it signals congestion before the buffer overflows, allowing rate reduction before PFC triggers',
        '<code>DCQCN (Data Center Quantized Congestion Notification)</code>: algorithm implemented in the NIC firmware; combines ECN with a rate control loop; NIC receives a <code>CNP (Congestion Notification Packet)</code> from the receiver and exponentially reduces its injection rate',
        'Correct watermark order: <code>ECN mark threshold</code> (lowest) --> <code>DCQCN rate reduction</code> --> <code>PFC PAUSE trigger</code> (last resort, highest watermark)',
        'Best practice: tune ECN/DCQCN so PFC is rarely triggered; PFC head-of-line blocking degrades non-congested flows on the same priority',
        'Key values on Spectrum: ECN min threshold (e.g., 150 KB), ECN max (e.g., 1.5 MB), PFC xoff threshold (e.g., 1 MB higher than ECN max)'
      ] },

    { n:12, tier:'P2', obj:'2.4', dom:2, freq:52, load:44, title:'BGP-EVPN multi-tenancy with VXLAN VNI',
      dims:['concept','scope'],
      bullets:[
        'BGP-EVPN (Ethernet VPN, RFC 7432) is the control plane for VXLAN overlays on Spectrum-based fabrics',
        'EVPN distributes MAC/IP bindings via BGP route types: Type 2 (MAC+IP), Type 3 (multicast join), Type 5 (IP prefix)',
        'VNI (VXLAN Network Identifier): 24-bit identifier maps to a tenant segment; each tenant VLAN = one VNI',
        'VXLAN encapsulates L2 frames in UDP (port 4789); VTEP endpoints terminate tunnels at the leaf switches',
        'Spectrum switches support BGP-EVPN natively via Cumulus Linux or NVUE; standard multi-vendor protocol'
      ] },

    { n:13, tier:'P2', obj:'2.5', dom:2, freq:48, load:40, title:'Adaptive Routing on Spectrum complements DCQCN',
      dims:['concept','scope'],
      bullets:[
        'Spectrum-4 supports hardware Adaptive Routing (AR): dynamically selects among equal-cost paths per packet/burst based on egress queue depth',
        'AR reduces hot-spotting in fat-tree topologies without requiring per-flow ECMP hash tuning',
        'Works alongside DCQCN: AR spreads load before congestion builds; DCQCN handles residual congestion via rate control',
        'Configured via NVUE or Cumulus Linux; integrated with UFM telemetry to monitor load balance effectiveness'
      ] },

    // ── DPU/Host ──────────────────────────────────────────────
    { n:14, tier:'P1', obj:'3.8', dom:3, freq:70, load:62, title:'BlueField-3 DPU vs SuperNIC vs ConnectX-7/8: GPUDirect path',
      dims:['concept','scope'],
      bullets:[
        '<code>ConnectX-7/8</code>: pure NIC (Smart NIC without on-board ARM cores); provides RDMA, RoCEv2, GPUDirect; the standard GPU cluster NIC',
        '<code>BlueField-3 DPU</code>: ConnectX-7 NIC + ARM Cortex-A78 cores + on-board SoC; offloads networking/storage/security from the host CPU; runs its own OS (BFB image)',
        '<code>SuperNIC</code>: NVIDIA\'s positioning for ConnectX-7/8 in AI fabric context; NIC-class device (no ARM cores) tuned for AI training (400G / 800G); bridges NIC and DPU feature sets depending on configuration',
        'GPUDirect RDMA path: GPU VRAM -> PCIe bus -> NIC (ConnectX/BF3) -> wire; <code>CPU is not in the data path</code>',
        '<code>NCCL (NVIDIA Collective Communications Library)</code>: GPU collective library that uses RoCEv2/IB + GPUDirect for AllReduce; runs above the NIC transport layer',
        '<code>DOCA (Data Center Infrastructure-on-a-Chip Architecture)</code>: BlueField DPU SDK; provides APIs for networking, storage, and security offload applications running on the ARM cores'
      ] },

    // ── Topology / Physical ───────────────────────────────────
    { n:15, tier:'P1', obj:'3.9', dom:3, freq:72, load:64, title:'Fat-tree 1:1 non-blocking + rail-optimized GPU topology',
      dims:['concept','scope'],
      bullets:[
        'Fat-tree: each leaf connects to every spine; provides full bisection bandwidth (1:1) with no oversubscription',
        'In an AI cluster, each GPU server has multiple NICs (e.g., 8 NICs for 8 GPUs); each NIC connects to a DIFFERENT leaf switch = rail',
        'Rail-optimized: GPU 0 of every node on rail 0 leaf, GPU 1 on rail 1 leaf, etc.; AllReduce traffic is distributed across all rails simultaneously',
        'Contrast: non-rail topology (all NICs to one leaf) creates hot-spots; rail-optimized eliminates them for collective ops',
        'Spine layer provides equal-cost paths between any two leaves; SM programs LFTs to use all spines via ECMP / AR'
      ] },

    { n:16, tier:'P2', obj:'3.10', dom:3, freq:48, load:40, title:'Transceiver types: DAC, AOC, OSFP DR4/FR4, OSFP vs QSFP112',
      dims:['concept','scope'],
      bullets:[
        '<code>DAC (Direct Attach Copper)</code>: passive or active copper cable; max reach <code>2.5 meters</code> (passive), up to ~5m active; lowest latency and cost; used within a rack or adjacent racks',
        '<code>AOC (Active Optical Cable)</code>: fiber with integrated transceivers; range <code>3 to 100 meters</code>; used for inter-rack within a row',
        '<code>OSFP DR4</code>: 8-lane parallel single-mode fiber; 4 x 100G lanes = 400G; reach up to 500m (DR) or 2km (FR)',
        '<code>OSFP FR4</code>: 4 WDM lanes x 100G = 400G; single fiber pair; reach up to 2km; suited for campus/inter-building',
        '<code>OSFP (Octal Small Form-factor Pluggable)</code>: 8-lane form factor; one OSFP can carry NDR400 (8 x 50G PAM4) or XDR (8 x 100G PAM4)',
        '<code>QSFP112</code>: 4-lane form factor; 4 x 112G PAM4 = 400G; smaller than OSFP but only 4 lanes; cannot carry NDR in twin-port config'
      ] },

    // ── UFM ───────────────────────────────────────────────────
    { n:17, tier:'P1', obj:'3.11', dom:3, freq:72, load:65, title:'UFM: telemetry, SHARP tree config, required for QM9790',
      dims:['concept','scope'],
      bullets:[
        '<code>UFM (Unified Fabric Manager)</code>: NVIDIA\'s enterprise IB fabric management platform; replaces opensm for production AI fabrics',
        'UFM vs opensm: UFM adds <code>telemetry streaming, SHARP aggregation tree management, REST API, topology visualization, predictive analytics</code>; opensm is a bare-minimum SM (LID assignment + LFT only)',
        '<code>QM9790 requires external UFM</code> (or opensm) since it has no on-board SM; QM9700 can run SM internally but UFM is still recommended for SHARP and telemetry',
        'UFM Cyber-AI: built-in anomaly detection for fabric events (BER spikes, link flaps, congestion hotspots)',
        'SHARP tree configuration is a UFM function; UFM provisions aggregation trees, allocates resources, and arbitrates between concurrent SHARP sessions',
        'UFM REST API: <code>GET /ufmRest/resources/links</code>, <code>/resources/ports</code>, <code>/resources/systems</code>; used for automation and monitoring integration'
      ] },

    // ── D4 Troubleshooting ────────────────────────────────────
    { n:18, tier:'P1', obj:'4.1', dom:4, freq:85, load:78, title:'IB diagnostic command toolkit: ibstat through perfquery',
      dims:['concept','scope'],
      bullets:[
        '<code>ibstat</code>: show local HCA port state, LID, GID, speed, width; run on compute/storage nodes',
        '<code>ibstatus</code>: brief per-port status (Active/Down, speed, width); quick health check',
        '<code>ibhosts</code>: list all host channel adapters (HCAs) in the fabric by GUID and description',
        '<code>ibswitches</code>: list all switches in the fabric by GUID and description',
        '<code>iblinkinfo</code>: per-link speed and width for every switch port; spot degraded links (e.g., 4x SDR when 4x NDR expected)',
        '<code>ibnetdiscover</code>: full fabric topology discovery; outputs all nodes, links, and GUIDs; basis for topology verification scripts',
        '<code>ibroute &lt;switch-guid&gt;</code>: dump the Linear Forwarding Table (LFT) of a switch; verify SM routing is correct',
        '<code>ibtracert &lt;src-lid&gt; &lt;dst-lid&gt;</code>: trace the path between two LIDs through the fabric; identify routing loops or dead ends',
        '<code>ibping -G &lt;dst-guid&gt;</code>: ping a remote port by GUID using IB MAD packets; verify fabric reachability',
        '<code>ibdiagnet</code>: comprehensive fabric diagnostics; checks errors, link quality, routing, SM consistency; generates a report',
        '<code>sminfo</code>: show SM state, priority, GUID, and sweep status; identify master SM',
        '<code>perfquery -x &lt;lid&gt; &lt;port&gt;</code>: read performance counters (xmit/rcv bytes, errors, discards) from a port; -x = extended 64-bit counters',
        '<code>ib_write_bw</code>: RDMA bandwidth benchmark; one side runs as server (<code>-b</code>), other as client pointing at server IP; reports Gb/s',
        '<code>ib_write_lat</code>: RDMA latency benchmark; measures round-trip time in microseconds; baseline NDR400 should be low single-digit us'
      ] },

    { n:19, tier:'P1', obj:'4.2', dom:4, freq:78, load:70, title:'Spectrum tools: WJH, NetQ, nv show, ibdump',
      dims:['concept','scope'],
      bullets:[
        '<code>WJH (What Just Happened)</code>: NVIDIA Spectrum ASIC hardware drop capture; logs every dropped packet with reason (ACL drop, buffer drop, L3 error, etc.) in real time at line rate',
        'WJH is accessed via <code>cl-netq show wjh-drop</code> or the WJH SDK; essential for diagnosing silent packet loss in RoCEv2 fabrics',
        '<code>NetQ</code>: NVIDIA network telemetry and validation platform; queries historical fabric state (<code>netq show interfaces</code>, <code>netq check bgp</code>); tracks events over time',
        '<code>cl-resource-query</code>: Cumulus Linux command; shows ASIC table utilization (FIB entries, ACL entries, port resources)',
        '<code>nv show interface &lt;name&gt; counters</code>: NVUE command for real-time interface counters (RX/TX bytes, errors, drops) on Spectrum switches',
        '<code>ibdump</code>: capture raw IB packets on a link; output is a .pcap file readable in Wireshark (with IB dissectors); used for deep protocol debugging'
      ] },

    { n:20, tier:'P2', obj:'4.3', dom:4, freq:55, load:46, title:'Bring-up and validation workflow: OFED, BER, ib_write_bw baseline',
      dims:['concept','scope'],
      bullets:[
        '<code>ofed_info -s</code>: verify OFED (OpenFabrics Enterprise Distribution) driver version on host; must match across compute nodes for compatibility',
        'BER (Bit Error Rate) threshold: fabric links must sustain <code>BER &lt;= 10^-12</code> for production readiness; higher BER indicates signal integrity issues (bad cable, dirty fiber, faulty transceiver)',
        '<code>ib_write_bw</code> baseline: run between node pairs to verify RDMA bandwidth; NDR400 4x should achieve &gt;380 Gb/s sustained; if significantly lower, suspect routing, MTU mismatch, or PFC issues',
        'Bring-up sequence: verify physical links (iblinkinfo) -> SM online (sminfo) -> all nodes visible (ibhosts) -> routing correct (ibnetdiscover/ibroute) -> RDMA perf baseline (ib_write_bw)',
        'MTU mismatch: ensure SM-configured MTU (default <code>4096</code>) matches HCA setting; mismatched MTU causes silent performance degradation'
      ] },

    // ── D5 Automation ─────────────────────────────────────────
    { n:21, tier:'P1', obj:'5.1', dom:5, freq:68, load:60, title:'NVUE CLI: nv set/unset/show/apply, Cumulus Linux',
      dims:['concept','config','scope'],
      bullets:[
        '<code>NVUE (NVIDIA User Experience)</code>: declarative CLI for Cumulus Linux on Spectrum switches; replaces legacy net commands',
        '<code>nv set &lt;object&gt; &lt;param&gt; &lt;value&gt;</code>: stage a configuration change in the candidate configuration; NOT applied yet',
        '<code>nv unset &lt;object&gt;</code>: stage removal of a configuration element',
        '<code>nv show &lt;object&gt;</code>: display current operational or candidate state',
        '<code>nv config apply</code>: commit all staged changes atomically to the running config; can be followed by <code>--confirm</code> for rollback safety',
        '<code>nv config diff</code>: show diff between candidate and running config before applying; essential for review before commit',
        '<code>nv action &lt;...&gt;</code>: trigger one-shot operational actions (e.g., restart a service, clear counters)',
        'Cumulus Linux: NVIDIA\'s Linux-based NOS for Spectrum switches; runs standard Linux userspace, FRR for routing, and NVUE for management'
      ] },

    { n:22, tier:'P2', obj:'5.2', dom:5, freq:55, load:46, title:'Ansible nvidia.nvue collection: idempotent, test in NVIDIA Air',
      dims:['concept','scope'],
      bullets:[
        'Ansible <code>nvidia.nvue</code> collection: official Ansible modules for configuring Cumulus Linux via NVUE REST API',
        'Idempotent: running the same playbook multiple times produces the same result; only applies changes when the current state differs from desired state',
        'Module pattern: <code>nvidia.nvue.nvue_config</code> accepts NVUE JSON configuration objects; the module stages and applies via the switch REST API',
        'Test environment: use <code>NVIDIA Air</code> (cloud simulation) to develop and validate playbooks before deploying to physical fabric',
        'Typical playbook flow: define desired state in vars -> apply with nvue_config module -> validate with <code>nv show</code> assertions'
      ] },

    // ── D6 Kubernetes ─────────────────────────────────────────
    { n:23, tier:'P2', obj:'6.1', dom:6, freq:55, load:46, title:'NVIDIA Network Operator: OFED, RDMA plugin, Multus, SR-IOV IB VFs',
      dims:['concept','scope'],
      bullets:[
        '<code>NVIDIA Network Operator</code>: Kubernetes operator that deploys and manages the full RDMA/RoCEv2 networking stack on GPU nodes in a K8s cluster',
        'Installs <code>DOCA-OFED</code> (NVIDIA OFED driver) as a DaemonSet on every node; ensures correct RDMA drivers without manual installation',
        '<code>RDMA device plugin</code>: exposes RDMA interfaces as Kubernetes resources (<code>rdma/rdma</code>); pods request RDMA resources the same way they request GPU or CPU',
        '<code>Multus CNI</code>: meta-CNI plugin that attaches multiple network interfaces to a pod; required to give AI pods both a cluster network interface AND an RDMA interface',
        '<code>SR-IOV</code>: PCIe virtualization; one physical NIC port is split into Virtual Functions (VFs); each pod gets its own VF for near-native RDMA performance without sharing a full physical port',
        'For IB fabrics: SR-IOV VFs are isolated via <code>PKey</code>; <code>ibKubernetes</code> daemon syncs pod PKey assignments with the IB SM (UFM or opensm)',
        'Requires <code>GPU Operator</code> to also be installed for full GPU+RDMA workload support; Network Operator and GPU Operator are separate but complementary'
      ] },

    // ── D2 Spectrum-X Security (coverage gap) ────────────────
    { n:24, tier:'P2', obj:'2.6', dom:2, freq:50, load:44, title:'Spectrum-X Security: ACLs, NVUE RBAC, VRF-per-tenant, port security',
      dims:['concept','config'],
      bullets:[
        '<code>ACL storage</code>: Cumulus Linux ACL rules live in <code>/etc/cumulus/acl/policy.d/</code>; files are processed in numeric order; <code>cl-acltool -i</code> installs (compiles) the rules into the ASIC',
        '<code>cl-acltool -L all</code>: list all active ACL rules currently programmed in the ASIC; use to verify installation without rebooting',
        'ACL rule format: INPUT/OUTPUT chain, match (SIP/DIP/port/protocol), action (ACCEPT/DROP/POLICE); POLICE rate-limits to protect the CPU for management traffic',
        '<code>NVUE RBAC</code>: role-based access control built into NVUE; built-in roles include <code>nvue-admin</code> (full config), <code>nvue-monitor</code> (read-only show commands), and <code>nvue-operator</code> (operational actions only)',
        'Assign a role: <code>nv set system aaa user &lt;user&gt; role nvue-monitor</code>; separate data-plane config rights from monitoring access in multi-team environments',
        '<code>SSH key-only hardening</code>: disable password auth in <code>/etc/ssh/sshd_config</code> (<code>PasswordAuthentication no</code>); distribute authorized_keys via Ansible or ZTP; prevents brute-force on management plane',
        '<code>Port security / MAC limiting</code>: <code>nv set interface &lt;port&gt; port-security mac-limit &lt;N&gt;</code>; limits learned MACs per port; violation action: drop or shutdown; used on server-facing ports to prevent MAC flooding attacks',
        '<code>VRF-per-tenant isolation</code>: each tenant is assigned a dedicated VRF; routing is isolated at the kernel level; inter-tenant traffic must traverse a firewall or explicit policy; <code>nv set vrf &lt;name&gt; router bgp ...</code> scopes BGP to that VRF',
        'VRF table isolation: Linux VRFs use separate routing table IDs; <code>ip route show vrf &lt;name&gt;</code> verifies table; PBR (Policy-Based Routing) can steer traffic between VRFs when needed'
      ] },

    // ── D5 Automation deep: declarative config, ZTP, Ansible (coverage gap) ──
    { n:25, tier:'P2', obj:'5.3', dom:5, freq:55, load:48, title:'NVUE declarative config: startup.yaml, config history, rollback, ZTP',
      dims:['concept','config'],
      bullets:[
        '<code>startup.yaml</code>: NVUE persists the applied configuration as a YAML file at <code>/etc/nvue.d/startup.yaml</code>; this file is loaded on boot to restore state; edit it carefully or prefer <code>nv config apply</code>',
        '<code>nv config apply --confirm &lt;N&gt;</code>: applies changes but auto-reverts after N seconds unless you confirm with <code>nv config confirm</code>; prevents a bad config from locking you out of the switch',
        '<code>nv config diff</code>: shows a structured diff between the candidate (staged) config and the running config before committing; equivalent to a dry-run',
        '<code>nv config history</code>: lists all prior apply operations with a sequence number and timestamp; each is a restorable checkpoint',
        '<code>nv config rollback &lt;N&gt;</code>: reverts the running config to the state of history entry N; no reboot required; fastest recovery from a bad change',
        '<code>Zero-Touch Provisioning (ZTP)</code>: on first boot Cumulus Linux checks for a DHCP option 239 or a well-known URL to download and execute a ZTP script; script can install startup.yaml and trigger <code>nv config apply</code>; eliminates manual day-1 config',
        'ZTP script entry point: <code>/var/lib/cumulus/ztp/cumulus-ztp.sh</code> (or URL-sourced); the switch calls the script as root, so it can install keys, set hostname, and push the full NVUE config in one pass',
        '<code>Ansible nvidia.nvue multi-switch inventory</code>: define an inventory group per fabric role (leaf, spine, border); use <code>host_vars/</code> for per-device NVUE JSON; one playbook targets all groups; idempotent because NVUE API returns current state for diff'
      ] },

    // ── D6 Kubernetes Integration deep (coverage gap) ────────
    { n:26, tier:'P2', obj:'6.2', dom:6, freq:50, load:44, title:'K8s Network Operator: NicClusterPolicy CRD, IPoIB CNI, MACVLAN RDMA, GPUDirect in pods',
      dims:['concept','scope'],
      bullets:[
        '<code>NicClusterPolicy CRD</code>: the primary custom resource consumed by NVIDIA Network Operator; a single YAML object that declares the entire desired networking stack (OFED version, device plugin config, secondary network CNI); operator reconciles cluster state to match it',
        'Deploy: <code>kubectl apply -f nicclusterpolicy.yaml</code>; verify: <code>kubectl get nicclusterpolicy -o wide</code> and check <code>State: ready</code>; each component deploys as a DaemonSet on labeled nodes',
        '<code>IPoIB CNI</code>: runs IP-over-InfiniBand for Kubernetes pods on IB fabrics; each pod gets a virtual IB interface (child of the physical ib0); required for IB-native K8s workloads where RoCEv2 is not used',
        '<code>MACVLAN with RDMA shared device plugin</code>: for Ethernet/RoCEv2 clusters; MACVLAN creates a virtual NIC on the host physical NIC for the pod; <code>rdma/rdma_shared_dev_&lt;iface&gt;</code> resource exposes the RDMA context shared across pods on the same physical port; lower isolation than SR-IOV but no VF limit',
        'Contrast: SR-IOV gives each pod a dedicated VF (strict isolation, finite VFs); MACVLAN+RDMA-shared gives a virtual MAC with shared RDMA context (flexible scale, weaker isolation)',
        '<code>GPUDirect RDMA in pods</code>: pod requests both <code>nvidia.com/gpu: 1</code> and an RDMA resource; GPU driver + NIC driver must be the same version on the node (DOCA-OFED pin enforces this); data flows GPU VRAM to wire without touching host memory or CPU',
        'Verify GPUDirect in a pod: run <code>ib_write_bw --use_cuda 0 &lt;peer-ip&gt;</code> (perftest with CUDA support); bandwidth should match the NIC line rate, not PCIe host memory bandwidth',
        'Network Operator node selector: label GPU nodes with <code>feature.node.kubernetes.io/network-infiniband.available=true</code> (via NFD, Node Feature Discovery) so the operator only installs OFED on capable nodes'
      ] },

    // ── D3 BlueField/SuperNIC operating modes (coverage gap) ─
    { n:27, tier:'P2', obj:'3.12', dom:3, freq:52, load:46, title:'BlueField DPU operating modes: NIC mode vs DPU mode, mlxconfig, DOCA install',
      dims:['concept','config'],
      bullets:[
        '<code>NIC mode (Host mode)</code>: BlueField behaves as a standard ConnectX NIC; host OS drives all traffic; ARM cores are idle or run minimal monitoring; used when DPU offload is not needed but the hardware is present',
        '<code>DPU mode (Embedded CPU mode)</code>: ARM cores run their own OS (Ubuntu BFB image) and control the data plane; host OS sees a standard NIC but the DPU intercepts and can modify all traffic; enables OVS offload, firewall, storage acceleration',
        'Mode switch: <code>mlxconfig -d /dev/mst/mt41686_pciconf0 set INTERNAL_CPU_MODEL=1</code> sets DPU mode; <code>INTERNAL_CPU_MODEL=0</code> sets NIC mode; requires power cycle to take effect',
        '<code>mlxconfig</code> tool: reads and writes non-volatile firmware configuration registers on Mellanox/NVIDIA NICs and DPUs; <code>mlxconfig -d &lt;dev&gt; query</code> shows current settings; key knobs: <code>LINK_TYPE</code> (ETH/IB), <code>NUM_OF_VFS</code>, <code>SRIOV_EN</code>',
        '<code>SuperNIC</code>: ConnectX-7/8-class device in the Spectrum-X AI context; NIC-class (no ARM cores) but firmware-tuned for 400G/800G AI fabric; acts as a "smart NIC" without the full DPU OS stack',
        '<code>DOCA install sequence</code> on BlueField: (1) flash BFB image to DPU eMMC via <code>bfb-install</code> tool on the host, (2) DPU reboots into Ubuntu BFB, (3) install <code>doca-sdk</code> apt package on the DPU OS, (4) develop/deploy DOCA applications as services on the ARM cores',
        '<code>bfb-install</code> command: <code>bfb-install --rshim /dev/rshim0 --bfb DOCA_&lt;version&gt;_BSP_&lt;version&gt;_Ubuntu.bfb</code>; rshim is the management bus between host CPU and DPU ARM; the BFB (BlueField Boot stream Binary) contains the full OS image',
        'DOCA provides APIs: <code>doca_flow</code> (packet pipeline), <code>doca_rdma</code> (RDMA ops from ARM), <code>doca_comm_channel</code> (host-to-DPU messaging); all run natively on the ARM cores with zero host CPU involvement'
      ] },

    // ── D3 IB SM High-Availability (coverage gap) ────────────
    { n:28, tier:'P2', obj:'3.13', dom:3, freq:50, load:44, title:'IB SM High-Availability: redundant SM priority, failover, UFM Cyber-AI',
      dims:['concept','scope'],
      bullets:[
        'IB supports multiple SM instances simultaneously; only ONE is <code>Master</code>; all others are <code>Standby</code>',
        'Master election: highest numeric priority (0-15) wins; <code>sminfo</code> shows current master SM priority, GUID, and state; default priority is 0 (opensm default) -- always set a higher priority explicitly in production',
        'Failover: when the master SM becomes unreachable, standby SMs detect the absence via periodic polling; the standby with the next-highest priority performs a <code>heavy sweep</code> and becomes master; convergence time: typically seconds',
        'Tiebreak rule: when two SMs have equal priority, the SM with the <code>lower GUID</code> wins the election; configure priority asymmetrically (e.g., primary=14, standby=13) to control which host is preferred master',
        'UFM HA deployment: run UFM on two hosts in active/standby; UFM uses a shared filesystem or database for state; on failover the standby UFM takes over SM and SHARP tree management without losing fabric history',
        '<code>UFM Cyber-AI</code>: integrated anomaly detection engine in UFM; monitors BER trends, link flap rates, congestion hotspots, and SM election events; generates alerts and can trigger automated remediation (e.g., isolate a flapping port)',
        'UFM Cyber-AI threat model: detects fabric-level anomalies (not host intrusions); examples: sudden BER spike on a specific fiber span, unusual traffic pattern suggesting a misconfigured host, repeated SM priority conflicts indicating rogue SM',
        'Best practice: run at least two UFM/SM instances on separate physical hosts; never run both on the same server as a GPU compute node (SM failure during training = fabric instability)'
      ] },

    // ── D1 AI DC Design: collectives, bandwidth, oversubscription (coverage gap) ──
    { n:29, tier:'P2', obj:'1.2', dom:1, freq:52, load:46, title:'AI collective ops: all-reduce topology, bandwidth requirements, oversubscription ratios',
      dims:['concept','scope'],
      bullets:[
        '<code>AllReduce</code>: the dominant collective in distributed training; every GPU contributes a gradient tensor; the result (sum or average) is returned to every GPU; total data moved = 2(N-1)/N * message_size * N, approximately 2x the tensor size for large N',
        '<code>AllGather</code>: each GPU sends its local shard; every GPU receives the full tensor; used in model parallelism (e.g., gather weights before a forward pass); data volume scales with N (number of GPUs)',
        '<code>ReduceScatter</code>: opposite of AllGather; each GPU contributes the full tensor; each GPU receives one unique shard of the reduced result; combined with AllGather = Ring-AllReduce (NCCL default algorithm)',
        'Ring-AllReduce bandwidth efficiency: 100% of bisection bandwidth used if the fabric is non-blocking and rail-optimized; any oversubscription directly reduces busbw proportionally',
        '<code>Oversubscription ratio</code>: ratio of aggregate host bandwidth to fabric bandwidth; 1:1 = non-blocking (ideal for AI training); 2:1 = half the bandwidth available to each host on average; AI training with large tensors REQUIRES 1:1 or near-1:1 to avoid stalls',
        'Rail-optimized rationale: without rail-optimization all 8 NICs on one node hash to one leaf, creating a 8:1 oversubscription at that leaf uplink; rail-optimization spreads the 8 NICs to 8 different leaves, giving each GPU its own dedicated leaf uplink = effective 1:1',
        '<code>Bandwidth requirement rule of thumb</code>: for NDR400 (400 Gb/s per NIC), AllReduce peak demand = 400 Gb/s per GPU rail; spine links must carry all-to-all traffic without queuing; fat-tree with 1:1 oversubscription means each spine link = leaf-count x (leaf-port-bandwidth / spine-port-count)',
        'Topology impact on collective latency: fat-tree 2-level (leaf+spine) = 2 hops max; dragonfly+ = 3 hops max (within group, inter-group, to destination); fewer hops = lower collective latency, critical for small-message AllReduce in transformer attention layers'
      ] }
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
