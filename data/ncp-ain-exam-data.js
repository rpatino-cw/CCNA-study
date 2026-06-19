/* ======================================================================
   ncp-ain-exam-data.js  NCP-AIN v1.0 Mock Exam Question Bank
   53 original MCQ items. All single-answer. Multi-select deferred to v2.
   Global: window.NCPAIN_EXAM_DATA = { questions: [ ... ] }
   Domain map (pillars-data numbering):
     1 = AI DC Design (5%)
     2 = Spectrum Networking (30%)
     3 = InfiniBand Networking (30%)
     4 = Troubleshooting Tools (20%)
     5 = Automation & Config (10%)
     6 = Kubernetes Integration (5%)
   Schema per item: id, domain, pillar, obj, difficulty, type,
     question, options, correct, explanation, sourcePillar
   No em dashes or en dashes anywhere in this file.
   ====================================================================== */
window.NCPAIN_EXAM_DATA = {
  questions: [

    // ================================================================
    // DOMAIN 3 -- InfiniBand Networking (30%) -- 16 questions
    // ================================================================

    {
      id: "x001", domain: "3", pillar: 2, obj: "3.1", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer reads 'rate: 40 Gb/sec (4X)' from ibstatus but cannot tell the IB generation from the aggregate alone. Which two generations both present a 40 Gb/s 4x aggregate, differing only in encoding?",
      options: [
        "QDR (8b/10b) and FDR10 (64b/66b)",
        "DDR (8b/10b) and EDR (64b/66b)",
        "FDR (64b/66b) and HDR (256b/257b)",
        "SDR (8b/10b) and NDR (256b/257b)"
      ],
      correct: 0,
      explanation: "QDR is 10 Gb/s per lane 8b/10b (32G effective) and FDR10 is 10.3125 Gb/s per lane 64b/66b (about 39.6G effective); both read 40G at 4x. Encoding (framing) is the differentiator, not the aggregate bandwidth number.",
      sourcePillar: "P2 -- IB link speeds: SDR through XDR (4x lane series)"
    },

    {
      id: "x002", domain: "3", pillar: 4, obj: "3.3", difficulty: 2,
      type: "multiple-choice",
      question: "Two opensm instances start with no priority configured. Which one becomes the master?",
      options: [
        "The instance that started first",
        "The instance on the node with the higher GUID",
        "The instance on the node with the lower GUID",
        "Neither; the subnet stays uninitialized until priority is set"
      ],
      correct: 2,
      explanation: "Both sit at the default priority 0, so master election falls to the GUID tiebreak, and the numerically LOWER GUID wins (IB spec C14-60.2.1). A common trap claims the higher GUID or first-to-start wins. Set primary=15 / standby=13 in production to avoid relying on this tiebreak.",
      sourcePillar: "P1 -- Subnet Manager: LIDs, GIDs, SM priority, sweep"
    },

    {
      id: "x003", domain: "3", pillar: 3, obj: "3.2", difficulty: 1,
      type: "multiple-choice",
      question: "A QM9790 switch is installed and cabled, but the subnet never initializes. The fabric has no other management host. What is the most likely cause?",
      options: [
        "The QM9790 needs its onboard Subnet Manager enabled in MLNX-OS",
        "The QM9790 is externally managed and has no onboard SM, so an external opensm or UFM must run on the fabric",
        "The QM9790 ports default to Ethernet and must be switched to IB",
        "The QM9790 only supports 128 NDR200 ports and rejects NDR400 links"
      ],
      correct: 1,
      explanation: "The QM9790 is the unmanaged variant: no onboard CPU, cannot run a local SM. It MUST have an external SM (standalone opensm on a host, or UFM) or the subnet will not come up. The QM9700 is the managed twin with an onboard SM running MLNX-OS.",
      sourcePillar: "P1 -- Quantum-2 QM9700 vs QM9790: 64x NDR400, 25.6 Tbps"
    },

    {
      id: "x009", domain: "3", pillar: 2, obj: "3.1", difficulty: 3,
      type: "multiple-choice",
      question: "An NDR port shows 400 Gb/s signaling. After accounting for RS-FEC framing overhead, what is the approximate effective data bandwidth for a single NDR400 4x link?",
      options: [
        "360 Gb/s (10% overhead from 256b/257b)",
        "Close to 400 Gb/s because 256b/257b framing has about 0.4% overhead",
        "320 Gb/s (20% overhead matching SDR-era 8b/10b)",
        "392 Gb/s exactly after subtracting the 64b/66b 3% overhead"
      ],
      correct: 1,
      explanation: "NDR uses 256b/257b framing with PAM4 modulation; the overhead is about 0.4%. EDR used 64b/66b (about 3% overhead). 8b/10b (20% overhead) belongs to SDR/DDR/QDR. The 400 Gb/s NDR figure is already marketed as an effective data rate.",
      sourcePillar: "P2 -- IB link speeds: SDR through XDR (4x lane series)"
    },

    {
      id: "x010", domain: "3", pillar: 4, obj: "3.3", difficulty: 2,
      type: "multiple-choice",
      question: "What is the difference between a light sweep and a heavy sweep in opensm?",
      options: [
        "Light sweep reprogram LFTs; heavy sweep only checks port states",
        "Light sweep monitors port-state changes and SM peers but does NOT reprogram LFTs; a change triggers a heavy sweep that does full rediscovery and LFT reprogramming",
        "Light sweep runs every 30 seconds; heavy sweep runs every 10 seconds",
        "Light sweep is used only when opensm starts for the first time"
      ],
      correct: 1,
      explanation: "Light sweep (default every 10 seconds) detects state changes but leaves LFTs unchanged. A detected change triggers a heavy sweep, which rediscovers all nodes and reprograms LFTs. The interval is the light sweep interval, not a separate heavy-sweep interval.",
      sourcePillar: "P1 -- Subnet Manager: LIDs, GIDs, SM priority, sweep"
    },

    {
      id: "x011", domain: "3", pillar: 5, obj: "3.4", difficulty: 3,
      type: "multiple-choice",
      question: "A packet is sent with SL 12 and the SM has mapped SL 12 to VL15 in the SL2VL table. What happens to the packet?",
      options: [
        "The packet is delivered via the Subnet Management lane with highest priority",
        "The packet is dropped because mapping an SL to VL15 means DROP",
        "The packet is placed in the best-effort management queue and delivered slowly",
        "The packet is reclassified to VL0 automatically because VL15 is full"
      ],
      correct: 1,
      explanation: "Mapping an SL to VL15 in the SL2VL table means DROP the packet. VL15 is reserved exclusively for Subnet Management Packets (SMP/QP0) and is not available for data traffic. There is no automatic reclassification.",
      sourcePillar: "P1 -- Virtual Lanes and SL/QoS: VL0-VL15, credit-based flow control"
    },

    {
      id: "x012", domain: "3", pillar: 6, obj: "3.5", difficulty: 2,
      type: "multiple-choice",
      question: "A port holds PKey 0x7FFF and another holds PKey 0xFFFF. Can these two ports communicate on the default IB partition?",
      options: [
        "No, because 0x7FFF and 0xFFFF are two different partition identities",
        "Yes, because 0x7FFF is a limited member and 0xFFFF is a full member of the same default partition (low 15 bits = 0x7FFF in both)",
        "No, because two different PKey values always denote two different partitions",
        "Yes, but only if the SM explicitly bridges the two PKey tables together"
      ],
      correct: 1,
      explanation: "The low 15 bits identify the partition. Both 0x7FFF (bit15=0, limited) and 0xFFFF (bit15=1, full) have low 15 bits 0x7FFF, so they are the same default partition. A full member communicates with both full and limited members; two limited members cannot communicate with each other.",
      sourcePillar: "P1 -- PKeys: 16-bit partition keys, full/limited member, multi-tenancy"
    },

    {
      id: "x013", domain: "3", pillar: 7, obj: "3.6", difficulty: 3,
      type: "multiple-choice",
      question: "An engineer wants to use Adaptive Routing on an IB fat-tree fabric. Which component decides which egress port a packet takes at each hop?",
      options: [
        "The Subnet Manager, which reprograms LFT entries per packet",
        "The ECMP hash in the switch ASIC, which picks based on 5-tuple",
        "The hardware Adaptive Routing logic in the switch ASIC, which selects by real-time credit/queue depth with no per-packet SM intervention",
        "The HCA driver on the sending node, which encodes the chosen path in the GRH"
      ],
      correct: 2,
      explanation: "AR selects among equal-cost paths per packet based on real-time egress queue depth inside the switch ASIC. The SM is NOT involved per packet. ECMP is an Ethernet/IP construct and does not apply to IB. Out-of-order resequencing is handled by the HCA reorder buffer on the receiver.",
      sourcePillar: "P1 -- IB routing and Adaptive Routing: fat-tree min-hop, AR by credit"
    },

    {
      id: "x014", domain: "3", pillar: 8, obj: "3.7", difficulty: 2,
      type: "multiple-choice",
      question: "After installing SHARPv2 (Quantum/HDR generation) and enrolling all nodes, an engineer tries to run two independent AllReduce jobs simultaneously. What is the expected behavior?",
      options: [
        "Both jobs run concurrently because SHARPv2 supports multiple parallel aggregation trees",
        "Only one job can run because SHARPv2 supports one workload at a time; the second waits",
        "Both jobs run but share the same aggregation tree, causing result corruption",
        "The sharp_am arbitrates bandwidth between both jobs using weighted fair queuing"
      ],
      correct: 1,
      explanation: "SHARPv2 (Quantum/HDR) supports ONE active aggregation tree (workload) at a time. SHARPv3 (Quantum-2/NDR) adds multi-tenant parallel aggregation trees. Attributing multi-tenant SHARP to the first-gen Quantum is a common exam trap.",
      sourcePillar: "P1 -- SHARP in-network compute: AllReduce offload, aggregation tree"
    },

    {
      id: "x015", domain: "3", pillar: 14, obj: "3.8", difficulty: 2,
      type: "multiple-choice",
      question: "A ConnectX-8 SuperNIC is installed. How many ARM cores does it have?",
      options: [
        "0 -- the ConnectX-8 SuperNIC has no ARM cores and no embedded OS",
        "8 -- it is identical to the BlueField-3 SuperNIC 8-core SKU",
        "16 -- it carries the same ARM core count as the BlueField-3 DPU",
        "4 -- it has a reduced Arm cluster compared to any BlueField variant"
      ],
      correct: 0,
      explanation: "The ConnectX-8 SuperNIC has ZERO ARM cores and no embedded OS; it is a NIC with an integrated PCIe Gen 6 switch. The BlueField-3 SuperNIC has 8 Arm cores; the BlueField-3 DPU has 16. SuperNIC is two distinct products; the name alone does not imply Arm cores.",
      sourcePillar: "P1 -- BlueField-3 DPU vs SuperNIC vs ConnectX-7/8: GPUDirect path"
    },

    {
      id: "x016", domain: "3", pillar: 15, obj: "3.9", difficulty: 2,
      type: "multiple-choice",
      question: "A DGX H100 has 8 compute NICs. Each NIC connects to a different top-of-rack leaf switch. The same-index NIC on every DGX in the pod connects to the same leaf. What topology property does this describe?",
      options: [
        "Dragonfly+ global-link topology, where long-range links reduce diameter",
        "Rail-optimized fat-tree, where NIC-0 of every node goes to the same leaf (rail 0), enabling same-rank traffic to stay local",
        "Traditional leaf-spine with ECMP hash balancing flows across equal-cost paths",
        "Oversubscribed spine-core where compute downlinks exceed spine uplinks"
      ],
      correct: 1,
      explanation: "Rail-optimized topology ensures NIC-0 of every server hits the same leaf (rail 0), NIC-1 hits the same leaf (rail 1), and so on. Same-rail GPU-to-GPU traffic stays on the leaf; cross-rail traffic only climbs to a spine switch. ECMP is an Ethernet construct; IB uses AR and LFTs.",
      sourcePillar: "P1 -- Fat-tree 1:1 non-blocking + rail-optimized GPU topology"
    },

    {
      id: "x017", domain: "3", pillar: 16, obj: "3.10", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer needs to cable two NDR400 OSFP ports over 150 meters using single-mode fiber. Which transceiver type is most appropriate?",
      options: [
        "OSFP DAC (direct attach copper) passive -- zero power, reaches 150m",
        "OSFP AOC (active optical cable) -- 3 to 100m NVIDIA NDR range",
        "OSFP FR4 (CWDM4, duplex SMF) -- 2km reach, suitable for inter-building",
        "QSFP112 -- 400G max, interchangeable with OSFP in QM9700 ports"
      ],
      correct: 2,
      explanation: "OSFP FR4 uses four CWDM4 WDM wavelengths on duplex single-mode fiber with a 2km reach, covering 150m. Passive DAC tops at 2m; AOC goes to 100m for NVIDIA NDR. QSFP112 cannot seat in QM9700 (finned-top OSFP only) and maxes at 400G.",
      sourcePillar: "P2 -- Transceiver types: DAC, AOC, OSFP DR4/FR4, OSFP vs QSFP112"
    },

    {
      id: "x018", domain: "3", pillar: 17, obj: "3.11", difficulty: 2,
      type: "multiple-choice",
      question: "UFM is deployed on the fabric. What happens when 'service ufmd start' is issued?",
      options: [
        "UFM replaces the running opensm instance with its own SM engine",
        "UFM starts and uses its own built-in SM, leaving any existing opensm running separately",
        "UFM starts, and it starts and monitors an opensm instance as a separate logical block; both run concurrently",
        "UFM starts only in monitoring mode; an explicit command is needed to enable SM functionality"
      ],
      correct: 2,
      explanation: "UFM does NOT replace OpenSM. NVIDIA documentation states UFM uses the Open Fabric community OpenSM and runs it as a separate logical block. Starting ufmd starts opensm and, if configured, sharp_am together. 'UFM replaces opensm' is explicitly called out as wrong.",
      sourcePillar: "P1 -- UFM: telemetry, SHARP tree config, required for QM9790"
    },

    {
      id: "x019", domain: "3", pillar: 3, obj: "3.2", difficulty: 1,
      type: "multiple-choice",
      question: "A QM9700 switch reports 51.2 Tb/s bandwidth. Is this figure unidirectional or bidirectional?",
      options: [
        "Unidirectional; the bidirectional figure would be 25.6 Tb/s",
        "Bidirectional (full-duplex); the unidirectional figure is 25.6 Tbps",
        "Unidirectional; the bidirectional figure would be 103.2 Tb/s",
        "It is a total throughput figure that already accounts for oversubscription"
      ],
      correct: 1,
      explanation: "NVIDIA markets 51.2 Tb/s as the BIDIRECTIONAL (full-duplex) number; 64 x 400 = 25.6 Tbps is the unidirectional figure. Both numbers appear in the official documentation for the QM9700. Knowing which direction the number represents is a frequent exam trap.",
      sourcePillar: "P1 -- Quantum-2 QM9700 vs QM9790: 64x NDR400, 25.6 Tbps"
    },

    {
      id: "x020", domain: "3", pillar: 4, obj: "3.3", difficulty: 1,
      type: "multiple-choice",
      question: "Which unicast LID range is valid in an IB subnet?",
      options: [
        "0x0000 to 0xBFFF",
        "0x0001 to 0xBFFF",
        "0x0001 to 0xFFFF",
        "0xC000 to 0xFFFF"
      ],
      correct: 1,
      explanation: "Unicast LIDs run 0x0001 to 0xBFFF (about 48K). LID 0x0000 is unassigned. 0xFFFF is the permissive LID. The multicast range is 0xC000 to 0xFFFE. A port that has not yet received a LID from the SM holds 0x0000.",
      sourcePillar: "P1 -- Subnet Manager: LIDs, GIDs, SM priority, sweep"
    },

    {
      id: "x021", domain: "3", pillar: 5, obj: "3.4", difficulty: 1,
      type: "multiple-choice",
      question: "Which Virtual Lane is reserved exclusively for Subnet Management Packets (SMP on QP0)?",
      options: [
        "VL0 -- the default data virtual lane",
        "VL7 -- the highest-priority data lane",
        "VL14 -- the second-highest management lane",
        "VL15 -- reserved for SMP only, not credit-flow-controlled"
      ],
      correct: 3,
      explanation: "VL15 is the dedicated management lane for SMP (QP0). It is NOT credit-flow-controlled and has hardware priority. Data VLs are VL0 to VL14; credit-based flow control applies only to those. GMP (QP1) uses VL0 and IS flow-controlled.",
      sourcePillar: "P1 -- Virtual Lanes and SL/QoS: VL0-VL15, credit-based flow control"
    },

    // ================================================================
    // DOMAIN 2 -- Spectrum Networking (30%) -- 16 questions
    // ================================================================

    {
      id: "x004", domain: "2", pillar: 10, obj: "2.2", difficulty: 1,
      type: "multiple-choice",
      question: "Which field at Layer 4 distinguishes a RoCEv2 packet and makes it L3-routable across subnets?",
      options: [
        "EtherType 0x8915",
        "TCP destination port 4791",
        "UDP destination port 4791",
        "The GRH immediately after the Ethernet header"
      ],
      correct: 2,
      explanation: "RoCEv2 encapsulates the IB transport (BTH) in UDP destination port 4791 over IP, which is what makes it routable at L3. EtherType 0x8915 and a GRH after the Ethernet header describe RoCEv1, which was L2-only. It uses UDP, not TCP.",
      sourcePillar: "P1 -- RoCEv2: RDMA over UDP 4791, routable L3, GPUDirect RDMA"
    },

    {
      id: "x005", domain: "2", pillar: 11, obj: "2.3", difficulty: 3,
      type: "multiple-choice",
      question: "On a Spectrum lossless RoCE fabric, which component actually runs the rate-control loop that slows the sender?",
      options: [
        "The switch, by pausing the priority with PFC",
        "The switch, by computing a new rate from the ECN mark",
        "The ConnectX NIC, after the receiver returns a CNP triggered by the ECN mark",
        "The Subnet Manager, by reprogramming the VL arbitration table"
      ],
      correct: 2,
      explanation: "DCQCN is a NIC-side algorithm. The switch only signals congestion by setting the ECN CE bit; the receiver generates a CNP, and the ConnectX NIC runs the rate cut. PFC is the link-level last resort, not a rate-control loop, and the SM has no role in RoCE congestion control.",
      sourcePillar: "P1 -- PFC + ECN + DCQCN: lossless Ethernet congestion pipeline"
    },

    {
      id: "x022", domain: "2", pillar: 9, obj: "2.1", difficulty: 1,
      type: "multiple-choice",
      question: "What is the total aggregate bandwidth of the Spectrum-4 ASIC?",
      options: [
        "25.6 Tbps unidirectional",
        "51.2 Tbps",
        "115.2 Tbps (Quantum-X800 figure)",
        "12.8 Tbps per ingress pipeline"
      ],
      correct: 1,
      explanation: "Spectrum-4 has 51.2 Tbps aggregate bandwidth. The SN5600 uses Spectrum-4 and has 64 OSFP cages at 800GbE each (64 x 800 = 51.2 Tbps). 115.2 Tbps is the Quantum-X800 (Quantum-3 IB ASIC), not Spectrum-4.",
      sourcePillar: "P1 -- Spectrum-4 ASIC: 51.2 Tbps, SN5600 64x800G, Spectrum-X"
    },

    {
      id: "x023", domain: "2", pillar: 9, obj: "2.1", difficulty: 2,
      type: "multiple-choice",
      question: "Which product combination defines the Spectrum-X platform?",
      options: [
        "QM9700 switch plus ConnectX-7 NIC plus UFM",
        "SN5600 (Spectrum-4) plus BlueField-3 SuperNIC or ConnectX-8 SuperNIC plus NVIDIA software",
        "SN4600C switch plus ConnectX-6 NIC plus NVUE",
        "Quantum-X800 switch plus BlueField-3 DPU plus SHARP"
      ],
      correct: 1,
      explanation: "Spectrum-X = SN5600 (Spectrum-4 ASIC) plus a BlueField-3 SuperNIC (400G) or ConnectX-8 SuperNIC (800G) plus NVIDIA software (DOCA, NetQ, Cumulus Linux or SONiC). A plain ConnectX-7 is NOT the branded Spectrum-X endpoint. Quantum-X800 is the InfiniBand product line.",
      sourcePillar: "P1 -- Spectrum-4 ASIC: 51.2 Tbps, SN5600 64x800G, Spectrum-X"
    },

    {
      id: "x024", domain: "2", pillar: 10, obj: "2.2", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer enables 'nv set qos roce' on a Spectrum switch. What PFC switch-priority does it configure by default?",
      options: [
        "SP0",
        "SP1",
        "SP3",
        "SP6"
      ],
      correct: 2,
      explanation: "The 'nv set qos roce' command configures PFC on switch-priority SP3 by default. CNP uses SP6 with strict priority. RoCE data traffic maps to DSCP 26 and lands on SP3 (TC3, DWRR 50%). The single command auto-configures all of this including buffer pools, DSCP/PCP trust, and the LLDP App TLV.",
      sourcePillar: "P1 -- RoCEv2: RDMA over UDP 4791, routable L3, GPUDirect RDMA"
    },

    {
      id: "x025", domain: "2", pillar: 11, obj: "2.3", difficulty: 2,
      type: "multiple-choice",
      question: "What are the default ECN thresholds on TC3 after 'nv set qos roce'?",
      options: [
        "Min 64 KB, max 512 KB, probability 50%",
        "Min 146.48 KB, max 1.43 MB, probability 100%",
        "Min 256 KB, max 2 MB, probability 75%",
        "Min 1 MB, max 10 MB, probability 100%"
      ],
      correct: 1,
      explanation: "ECN defaults after 'nv set qos roce' are exactly: min-threshold 146.48 KB, max-threshold 1.43 MB (1,501,500 bytes), probability 100, enabled on TC0 AND TC3 (not TC3 alone). These numbers are absolute and appear verbatim in exam questions.",
      sourcePillar: "P1 -- PFC + ECN + DCQCN: lossless Ethernet congestion pipeline"
    },

    {
      id: "x026", domain: "2", pillar: 12, obj: "2.4", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer uses NVUE to configure EVPN on a Cumulus leaf. They run 'nv set evpn state enabled' and 'nv config apply'. They do NOT add 'advertise-all-vni'. What happens?",
      options: [
        "EVPN fails to advertise any local VNIs because advertise-all-vni is required in FRR",
        "NVUE auto-makes FRR aware of local VNIs so no separate advertise-all-vni is needed",
        "Only Type 5 IP-prefix routes are advertised; Type 2 and Type 3 require advertise-all-vni",
        "The switch defaults to advertising only the first VNI in alphabetical order"
      ],
      correct: 1,
      explanation: "With NVUE, FRR is automatically aware of local VNIs; you do NOT set advertise-all-vni. That line is needed only with raw vtysh/FRR manual configuration. Using advertise-all-vni in an NVUE-managed config is a trap for engineers coming from non-NVUE deployments.",
      sourcePillar: "P2 -- BGP-EVPN multi-tenancy with VXLAN VNI"
    },

    {
      id: "x027", domain: "2", pillar: 12, obj: "2.4", difficulty: 2,
      type: "multiple-choice",
      question: "A Cumulus leaf uses symmetric EVPN routing. The L3VNI for VRF RED is 4001. An engineer sets the L2VNI for VLAN 10 to 4001. What happens?",
      options: [
        "Both work fine; the SM differentiates them by their VLAN tags",
        "Cumulus silently fails to create the L2VNI because L3VNI and L2VNI cannot share the same VNI ID",
        "Cumulus promotes the VLAN 10 L2VNI to L3 status automatically",
        "An error is logged but both VNIs are created in a degraded state"
      ],
      correct: 1,
      explanation: "An L3VNI and an L2VNI cannot share an ID. If they do, Cumulus silently fails to create the L2VNI. The L3VNI must be unique across all VNIs on the device; always assign a separate VNI ID for each function.",
      sourcePillar: "P2 -- BGP-EVPN multi-tenancy with VXLAN VNI"
    },

    {
      id: "x028", domain: "2", pillar: 13, obj: "2.5", difficulty: 3,
      type: "multiple-choice",
      question: "Spectrum-4 Adaptive Routing is enabled on a leaf. An engineer notices packets from one RoCE flow arrive out of order at the receiver. Which component resequences them?",
      options: [
        "The Spectrum-4 ASIC tracks per-flow state and ensures in-order delivery",
        "The SM reprograms LFTs to avoid splitting a single flow across paths",
        "The BlueField-3 or ConnectX SuperNIC resequences via Direct Data Placement at the receiver",
        "The NCCL library buffers packets and sorts them before passing to the application"
      ],
      correct: 2,
      explanation: "AR can split packets of one flow across paths, causing reordering. The BlueField-3 or ConnectX SuperNIC corrects this via Direct Data Placement (DDP), a NIC-side function. The switch does not track flow state for reordering. NCCL operates above the transport, not at the packet level.",
      sourcePillar: "P2 -- Adaptive Routing on Spectrum complements RoCE congestion control"
    },

    {
      id: "x029", domain: "2", pillar: 13, obj: "2.5", difficulty: 2,
      type: "multiple-choice",
      question: "Toggling Adaptive Routing on a Spectrum-4 switch has a significant operational side effect. What is it?",
      options: [
        "It flushes the BGP RIB, requiring a neighbor reset on all peers",
        "It restarts switchd, which resets all ports and clears hardware state",
        "It triggers a full EVPN type-3 withdrawal and re-advertisement",
        "It briefly enables STP topology change notifications on all VLANs"
      ],
      correct: 1,
      explanation: "Toggling Adaptive Routing restarts switchd on Spectrum, resetting all ports and clearing hardware state. Plan this action during a maintenance window. The BGP RIB, EVPN, and STP are unrelated to the switchd restart in this context.",
      sourcePillar: "P2 -- Adaptive Routing on Spectrum complements RoCE congestion control"
    },

    {
      id: "x030", domain: "2", pillar: 24, obj: "2.6", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer wants to create an NVUE user with read-only access to the switch. Which role should they assign?",
      options: [
        "nvue-operator",
        "nvue-admin",
        "nvue-monitor",
        "system-admin"
      ],
      correct: 2,
      explanation: "The nvue-monitor role provides read-only access (nv show only). The nvue-admin role allows set/unset/apply but no sudo. The system-admin role has full access including sudo. There is no nvue-operator role; using it is a common exam trap.",
      sourcePillar: "P2 -- Spectrum-X Security: ACLs, NVUE RBAC, VRF-per-tenant, port security"
    },

    {
      id: "x031", domain: "2", pillar: 24, obj: "2.6", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer notices PFC watchdog reports DEADLOCK on TC2. What does this mean and what does the switch do?",
      options: [
        "The switch has run out of packet buffer for TC2 and starts tail-dropping",
        "Pause frames are looping and backpressure is stuck; the switch auto-drops pause frames on TC2 to break the storm",
        "TC2 is operating at full PFC utilization; this is normal under heavy load",
        "The SM has suspended SHARP aggregation on TC2 due to excessive latency"
      ],
      correct: 1,
      explanation: "PFC watchdog DEADLOCK means pause frames are looping (deadlock condition). The switch automatically drops pause frames on the affected TC to break the pause storm. Status is visible via 'nv show interface swp1 qos pfc-watchdog'. This is distinct from normal buffer pressure, which causes tail drops.",
      sourcePillar: "P2 -- Spectrum-X Security: ACLs, NVUE RBAC, VRF-per-tenant, port security"
    },

    {
      id: "x032", domain: "2", pillar: 10, obj: "2.2", difficulty: 3,
      type: "multiple-choice",
      question: "A host sends RoCEv2 traffic with DSCP 26. The Spectrum switch is configured with 'nv set qos roce'. To which traffic class and scheduling discipline does this traffic map?",
      options: [
        "TC0 with strict priority",
        "TC3 with DWRR 50%",
        "TC6 with strict priority",
        "TC1 with DWRR 25%"
      ],
      correct: 1,
      explanation: "DSCP 26 maps to SP3 (switch-priority 3) via the default DSCP-to-SP trust map. SP3 maps to TC3 with DWRR 50% scheduling. TC6 with strict priority is for CNP (DSCP 48). TC0 handles general background traffic at DWRR 50%.",
      sourcePillar: "P1 -- RoCEv2: RDMA over UDP 4791, routable L3, GPUDirect RDMA"
    },

    {
      id: "x033", domain: "2", pillar: 11, obj: "2.3", difficulty: 2,
      type: "multiple-choice",
      question: "What is the correct operational mode string reported by 'nv show qos roce' when lossless mode is active?",
      options: [
        "lossless-single-ipool",
        "lossless",
        "roce-lossless",
        "pfc-enabled"
      ],
      correct: 1,
      explanation: "The operational mode string is 'lossless'. The string 'lossless-single-ipool' only appears if explicitly configured and is not the default. Using 'lossless-single-ipool' as the default is a distractor and a trap.",
      sourcePillar: "P1 -- PFC + ECN + DCQCN: lossless Ethernet congestion pipeline"
    },

    {
      id: "x034", domain: "2", pillar: 9, obj: "2.1", difficulty: 2,
      type: "multiple-choice",
      question: "Which NVIDIA AI fabric runs RoCEv2 and which runs native InfiniBand?",
      options: [
        "Quantum-X800 runs RoCEv2; Spectrum-X runs InfiniBand",
        "Spectrum-X (SN5600 + SuperNIC) runs RoCEv2; Quantum-X800 runs native InfiniBand",
        "Both Spectrum-X and Quantum-X800 support RoCEv2 in an interoperable hybrid mode",
        "Spectrum-X runs InfiniBand on even-numbered ports and RoCEv2 on odd-numbered ports"
      ],
      correct: 1,
      explanation: "Spectrum-X (SN5600 Spectrum-4 switch + SuperNIC) is the Ethernet AI fabric running RoCEv2. Quantum-X800 (144x800G, 115.2 Tbps) is the InfiniBand AI fabric running native IB. They are separate product lines, not interchangeable or hybrid.",
      sourcePillar: "P1 -- Spectrum-4 ASIC: 51.2 Tbps, SN5600 64x800G, Spectrum-X"
    },

    {
      id: "x035", domain: "2", pillar: 12, obj: "2.4", difficulty: 1,
      type: "multiple-choice",
      question: "Which EVPN route type signals VTEP membership for BUM (Broadcast, Unknown-unicast, Multicast) handling and is NOT a data-multicast entry?",
      options: [
        "Type 2 (MAC + IP advertisement)",
        "Type 3 (IMET, Inclusive Multicast Ethernet Tag)",
        "Type 5 (IP prefix route)",
        "Type 4 (Ethernet Segment route)"
      ],
      correct: 1,
      explanation: "Type 3 (IMET) signals that a VTEP is active and ready to receive BUM traffic. It is a control-plane membership advertisement, NOT a data-multicast forwarding entry. Type 2 carries MAC+IP. Type 5 carries IP prefixes for routed traffic. Type 4 is used in EVPN multihoming.",
      sourcePillar: "P2 -- BGP-EVPN multi-tenancy with VXLAN VNI"
    },

    // ================================================================
    // DOMAIN 4 -- Troubleshooting Tools (20%) -- 10 questions
    // ================================================================

    {
      id: "x006", domain: "4", pillar: 18, obj: "4.1", difficulty: 3,
      type: "multiple-choice",
      question: "perfquery on a busy NDR port shows SymbolErrorCounter pinned at 65535 and not moving. What is the correct interpretation and next step?",
      options: [
        "The link is healthy; 65535 is the normal idle value",
        "The 16-bit basic counter has saturated; re-read with perfquery -x for the 64-bit extended counter",
        "The port is administratively down; bring it up with ibportstate",
        "The SM has not assigned a LID yet; wait for the next heavy sweep"
      ],
      correct: 1,
      explanation: "Basic PortCounters are narrow bit-width: SymbolErrorCounter is 16-bit (max 65535) and stops incrementing once saturated. Use perfquery -x (PortCountersExtended) for 64-bit versions, and perfquery -x -R to reset before measuring. A pinned max is a saturation artifact, not a healthy reading.",
      sourcePillar: "P1 -- IB diagnostic command toolkit: ibstat through perfquery"
    },

    {
      id: "x036", domain: "4", pillar: 18, obj: "4.1", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer runs ibping against a remote GUID but gets no response. The remote node is visible in ibhosts. What is the most likely cause?",
      options: [
        "ibping uses ICMP and the remote firewall is blocking it",
        "ibping -G requires the destination to run 'ibping -S' (server mode) first",
        "ibping cannot use GUIDs; it requires a LID with lowercase -g",
        "The remote HCA does not support ibping because it uses QDR or older"
      ],
      correct: 1,
      explanation: "ibping uses vendor MADs, NOT ICMP. The remote node must be running 'ibping -S' (server mode) before it can respond. Uppercase -G means the destination is interpreted as a Port GUID. Any modern HCA supports ibping via MADs.",
      sourcePillar: "P1 -- IB diagnostic command toolkit: ibstat through perfquery"
    },

    {
      id: "x037", domain: "4", pillar: 18, obj: "4.1", difficulty: 2,
      type: "multiple-choice",
      question: "A suspect IB port shows PortXmitWait rising steadily but PortXmitDiscards is zero. What does this indicate?",
      options: [
        "Packets are being dropped due to PKey violations on the transmit side",
        "Congestion is building at this port; flow is backed up but no drops yet",
        "The link is physically down and all queued packets are waiting for recovery",
        "The SM has suspended traffic on this VL while reprogramming LFTs"
      ],
      correct: 1,
      explanation: "PortXmitWait rising without PortXmitDiscards means congestion is building (the port is stalled waiting to transmit) but no packets have been dropped yet. This is the early warning signal before drops begin. PortRcvConstraintErrors rising would indicate PKey violations.",
      sourcePillar: "P1 -- IB diagnostic command toolkit: ibstat through perfquery"
    },

    {
      id: "x038", domain: "4", pillar: 19, obj: "4.2", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer uses netq to check RoCE consistency and sees 'roce mode: lossless' on leaf01 and 'roce mode: lossy' on leaf02. What category of error does this represent?",
      options: [
        "RoCE Classification Test failure (DSCP-to-SP mismatch)",
        "RoCE Flow Control Test failure (PFC priority mismatch)",
        "RoCE Mode Test failure (lossless/lossy conflict between nodes)",
        "RoCE ETS mode Test failure (TC weighting inconsistency)"
      ],
      correct: 2,
      explanation: "'netq check roce' runs five tests. A lossless/lossy mismatch between nodes is a Mode error (RoCE mode Test). A PFC priority mismatch between nodes is a Flow Control error. DSCP-to-SP drift is a Classification error. These map directly to the netq output columns.",
      sourcePillar: "P1 -- Spectrum tools: WJH, NetQ, nv show, ibdump"
    },

    {
      id: "x039", domain: "4", pillar: 19, obj: "4.2", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer enables the NetQ agent on a Spectrum switch to capture WJH drops. What happens to the local on-box WJH service?",
      options: [
        "Both the on-box WJH and the NetQ agent run simultaneously, doubling coverage",
        "The local on-box WJH service stops; the two cannot run simultaneously on the same switch",
        "The local on-box WJH service continues but only captures L1 drops",
        "The NetQ agent forwards WJH data to the on-box service for local storage"
      ],
      correct: 1,
      explanation: "WJH has two access paths: on-box via NVUE and off-box via NetQ. When the NetQ agent is enabled on a switch, the local on-box WJH service stops. They are mutually exclusive on the same switch. Choose one path per device.",
      sourcePillar: "P1 -- Spectrum tools: WJH, NetQ, nv show, ibdump"
    },

    {
      id: "x040", domain: "4", pillar: 19, obj: "4.2", difficulty: 1,
      type: "multiple-choice",
      question: "WJH classifies dropped packets into exactly how many categories, and which category covers WRED and tail drops?",
      options: [
        "4 categories; Congestion covers WRED and tail drops",
        "6 categories; Buffer covers WRED and tail drops (NOT PFC holds)",
        "6 categories; L3 (Router) covers all congestion-related drops",
        "8 categories; QoS covers WRED, tail drops, and PFC holds"
      ],
      correct: 1,
      explanation: "WJH classifies drops into exactly 6 categories: L1, L2, L3 (Router), Tunnel, Buffer, ACL. Buffer covers WRED and tail drops, but NOT PFC holds. PFC backpressures upstream instead of dropping, so it does not appear as a WJH drop.",
      sourcePillar: "P1 -- Spectrum tools: WJH, NetQ, nv show, ibdump"
    },

    {
      id: "x041", domain: "4", pillar: 20, obj: "4.3", difficulty: 3,
      type: "multiple-choice",
      question: "An ib_write_bw run on a tuned NDR400 link at large message sizes plateaus at 387 Gb/s instead of climbing above 390. What is the most likely cause?",
      options: [
        "387 Gb/s is above the 380 Gb/s floor, so this is a normal NDR result",
        "The test is using too few queue pairs (-q 1 default); increasing to -q 4 or -q 8 often closes the gap",
        "The RS-FEC overhead is greater than 256b/257b framing allows; no fix exists",
        "ib_write_bw cannot exceed 380 Gb/s because 20 Gb/s is reserved for control traffic"
      ],
      correct: 1,
      explanation: "Default -q 1 is insufficient to saturate NDR400; use -q 4 to -q 8 to fill the pipe. Results in the 380-387 Gb/s range indicate functional but sub-optimal tuning (too few QPs, or PFC pausing, or wrong GID index). Above 390 Gb/s is the normal operating range.",
      sourcePillar: "P2 -- Bring-up and validation workflow: OFED, BER, ib_write_bw baseline"
    },

    {
      id: "x042", domain: "4", pillar: 20, obj: "4.3", difficulty: 3,
      type: "multiple-choice",
      question: "An ib_write_bw -a sweep shows bandwidth plateauing near 2048 bytes message size instead of climbing to its maximum. What is the most likely root cause?",
      options: [
        "The switch fabric has an active credit loop on this path",
        "An SM/HCA MTU mismatch: the HCA is configured at 4096 bytes but the SM assigned MTU 2048",
        "The NIC is using SDR generation speed despite reporting NDR",
        "The benchmark is running in loopback mode and the cable prevents full bandwidth"
      ],
      correct: 1,
      explanation: "A bandwidth cliff in ib_write_bw -a at a specific message size indicates an MTU mismatch. If the HCA reports 4096 but the SM assigned MTU 2048, bandwidth plateaus near that boundary instead of growing with message size. Verify MTU consistency between HCA config and SM PortInfo.",
      sourcePillar: "P2 -- Bring-up and validation workflow: OFED, BER, ib_write_bw baseline"
    },

    {
      id: "x043", domain: "4", pillar: 18, obj: "4.1", difficulty: 1,
      type: "multiple-choice",
      question: "Which command shows the state, LID, GID, speed, and width of a LOCAL HCA port?",
      options: [
        "iblinkinfo",
        "ibnetdiscover",
        "ibstat or ibstatus",
        "sminfo"
      ],
      correct: 2,
      explanation: "ibstat and ibstatus both show local HCA port information: state, physical state, LID, GID, rate, and width. iblinkinfo shows all switch port links across the fabric. ibnetdiscover dumps the full topology. sminfo shows Subnet Manager state.",
      sourcePillar: "P1 -- IB diagnostic command toolkit: ibstat through perfquery"
    },

    {
      id: "x044", domain: "4", pillar: 20, obj: "4.3", difficulty: 2,
      type: "multiple-choice",
      question: "The ibdiagnet operational alarm for effective (post-FEC) BER fires at which threshold?",
      options: [
        "BER below 10^-6",
        "BER below 10^-9",
        "BER below 10^-12",
        "BER below 10^-15 (the cable qualification spec)"
      ],
      correct: 2,
      explanation: "The ibdiagnet operational alarm triggers at effective (post-FEC) BER below 10^-12. This is distinct from the cable qualification spec (10^-15). Raw pre-FEC BER can be around 10^-4 while effective post-FEC BER is well below 10^-12, thanks to RS-FEC(544,514) gain.",
      sourcePillar: "P2 -- Bring-up and validation workflow: OFED, BER, ib_write_bw baseline"
    },

    // ================================================================
    // DOMAIN 5 -- Automation & Config (10%) -- 5 questions
    // ================================================================

    {
      id: "x007", domain: "5", pillar: 21, obj: "5.1", difficulty: 2,
      type: "multiple-choice",
      question: "On Cumulus Linux 5.8, an engineer runs 'nv config apply' and the change works. After a reboot the change is gone. Why?",
      options: [
        "apply does not activate config on 5.8; only nv config commit does",
        "On 5.8 apply does not auto-save; nv config save is a separate required step to persist to startup.yaml",
        "The pending config was never built; nv set was skipped",
        "ZTP overwrote the config on boot because the script lacked the autoprovisioning flag"
      ],
      correct: 1,
      explanation: "NVUE states are pending, applied, startup. apply activates the running config, but on CL 5.8 and earlier it does NOT auto-save. You must run nv config save to write /etc/nvue.d/startup.yaml or the config is lost on reboot. CL 5.9+ auto-saves on apply.",
      sourcePillar: "P1 -- NVUE CLI: nv set/unset/show/apply, Cumulus Linux"
    },

    {
      id: "x045", domain: "5", pillar: 21, obj: "5.1", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer runs 'nv config apply --confirm' and accidentally locks themselves out via the management link. What happens automatically if they take no action?",
      options: [
        "The config is permanently applied; manual rollback requires console access",
        "After 10 minutes the config auto-rolls back to the previous applied state",
        "The switch reboots and loads the startup.yaml from before the apply",
        "opensm detects the loss and triggers a fabric sweep that restores routing"
      ],
      correct: 1,
      explanation: "'nv config apply --confirm' arms a default 10-minute auto-rollback. If no confirmation is received, the config reverts automatically. Keep it with --confirm-yes, abort with --confirm-no, check the timer with --confirm-status. This protects against locking out your own management link.",
      sourcePillar: "P1 -- NVUE CLI: nv set/unset/show/apply, Cumulus Linux"
    },

    {
      id: "x046", domain: "5", pillar: 22, obj: "5.2", difficulty: 2,
      type: "multiple-choice",
      question: "An Ansible playbook uses the 'nvidia.nvue.command' module with 'apply: true'. What does this do?",
      options: [
        "It calls nv config commit, which is the 5.8 equivalent of apply",
        "It stages a set of nv commands and then runs nv config apply at the end of the batch",
        "It applies the changes immediately without staging them in the pending config",
        "It calls the NVUE REST API to push a config revision"
      ],
      correct: 1,
      explanation: "The nvidia.nvue.command module with apply: true stages the nv set/unset commands first and then issues nv config apply at the end of the batch. 'atomic: true' adds rollback on failure. 'assume_yes: true' auto-confirms prompts. The 'api' module calls the REST API, not 'command'.",
      sourcePillar: "P2 -- Ansible nvidia.nvue collection: idempotent, test in NVIDIA Air"
    },

    {
      id: "x047", domain: "5", pillar: 25, obj: "5.3", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer wants to roll back to the last known-good config without rebooting. Which command achieves this?",
      options: [
        "nv config rollback",
        "nv config apply startup",
        "nv config reset --to-factory",
        "nv config detach startup"
      ],
      correct: 1,
      explanation: "There is NO 'nv config rollback' command. Roll back by re-applying a prior revision: 'nv config apply startup' reverts to the last saved startup config, or 'nv config apply <rev>' reverts to a specific history revision. nv config detach discards pending-but-unapplied changes, not applied ones.",
      sourcePillar: "P2 -- NVUE declarative config: startup.yaml, config history, rollback, ZTP"
    },

    {
      id: "x048", domain: "5", pillar: 25, obj: "5.3", difficulty: 1,
      type: "multiple-choice",
      question: "A ZTP script is placed on the provisioning server but the switch refuses to execute it on first boot. The script is valid bash. What is the most likely cause?",
      options: [
        "The DHCP server did not send option 239 with the script URL",
        "The script file lacks the literal 'CUMULUS-AUTOPROVISIONING' flag comment",
        "ZTP requires the script to be in Python, not bash",
        "ZTP only works if the switch is cabled and the fabric is already initialized"
      ],
      correct: 1,
      explanation: "ZTP refuses to run a script that does not contain the literal 'CUMULUS-AUTOPROVISIONING' flag (as a comment in the script). The DHCP option 239 URL points to the script, but the flag inside the script is a separate required gate. The script runs as root and can be bash or Python.",
      sourcePillar: "P2 -- NVUE declarative config: startup.yaml, config history, rollback, ZTP"
    },

    // ================================================================
    // DOMAIN 1 -- AI DC Design (5%) -- 3 questions
    // ================================================================

    {
      id: "x049", domain: "1", pillar: 1, obj: "1.1", difficulty: 2,
      type: "multiple-choice",
      question: "In a SuperPOD GB200 Scalable Unit (SU), the storage fabric is described as mildly oversubscribed while the compute IB fabric is 1:1 non-blocking. Why is this acceptable for storage?",
      options: [
        "Storage traffic uses a lower IB speed tier that inherently reduces contention",
        "Bulk I/O storage workloads tolerate some blocking that AI collectives cannot; collectives are latency-sensitive and blocking causes training stalls",
        "The storage fabric uses lossy Ethernet so any drops are retransmitted by TCP",
        "Storage oversubscription is automatically corrected by SHARP aggregation trees"
      ],
      correct: 1,
      explanation: "The compute IB fabric must be 1:1 non-blocking because AI collective operations (AllReduce, etc.) are latency-sensitive and blocking causes training stalls. Bulk storage I/O can tolerate moderate oversubscription (the GB200 RA uses approximately 5:3 blocking on the storage fabric) without impacting training throughput.",
      sourcePillar: "P2 -- AI Factory Architecture: rail-optimized fat-tree"
    },

    {
      id: "x050", domain: "1", pillar: 1, obj: "1.1", difficulty: 1,
      type: "multiple-choice",
      question: "What is NVIDIA Air and what problem does it solve for AI factory design?",
      options: [
        "Air is a hardware appliance that provides low-latency OOB management for DGX clusters",
        "Air is a free cloud-hosted 1:1 network digital twin that runs Cumulus Linux or SONiC images to validate routing and automation before hardware arrives",
        "Air is a GPU memory compression algorithm that improves NCCL AllReduce efficiency",
        "Air is the branding for the NVLink switch fabric inside a DGX GB200 NVL72 rack"
      ],
      correct: 1,
      explanation: "NVIDIA Air is a free cloud-hosted 1:1 network digital twin (not just a topology sketcher). It runs actual Cumulus Linux or SONiC images so engineers can validate routing configs, automation playbooks, and upgrades before any physical hardware arrives.",
      sourcePillar: "P2 -- AI Factory Architecture: rail-optimized fat-tree"
    },

    {
      id: "x051", domain: "1", pillar: 15, obj: "1.1", difficulty: 2,
      type: "multiple-choice",
      question: "A DGX H100 has 10 ConnectX-7 NICs total. How many are compute NICs, and how are they logically organized?",
      options: [
        "10 compute NICs, each mapped to one CPU socket",
        "8 compute NICs (one per GPU) plus 2 dual-port NICs for storage and management; the 8 compute NICs define 8 rails",
        "4 compute NICs (two per GPU pair) plus 6 for InfiniBand storage",
        "8 compute NICs (all NDR200) and 2 management NICs (NDR400)"
      ],
      correct: 1,
      explanation: "DGX H100 has 8 single-port ConnectX-7 NDR 400G compute NICs (one per GPU) plus 2 dual-port NICs for storage and management, totaling 10 NICs. Each compute NIC maps to one GPU and one rail, so the server has 8 rails connecting to 8 different top-of-rack leaf switches.",
      sourcePillar: "P1 -- Fat-tree 1:1 non-blocking + rail-optimized GPU topology"
    },

    // ================================================================
    // DOMAIN 6 -- Kubernetes Integration (5%) -- 3 questions
    // ================================================================

    {
      id: "x008", domain: "6", pillar: 23, obj: "6.1", difficulty: 2,
      type: "multiple-choice",
      question: "A NicClusterPolicy is applied and the YAML is valid, but the Network Operator never reconciles it and no RDMA resources appear on nodes. What is the most likely cause?",
      options: [
        "The CRD was named something other than nic-cluster-policy, so the operator silently ignores it",
        "The pods are missing the IPC_LOCK capability",
        "Multus CNI is not installed",
        "The nodes lack the feature.node.kubernetes.io/pci-15b3.present label"
      ],
      correct: 0,
      explanation: "The Network Operator reconciles exactly ONE NicClusterPolicy named nic-cluster-policy; any other name is silently ignored, so nothing happens and there is no error. IPC_LOCK and Multus matter for pod-side RDMA after reconciliation, and the NFD label targets SR-IOV nodes, but none of those explain a totally un-reconciled policy.",
      sourcePillar: "P2 -- Network Operator, fabric side: DOCA-OFED, SR-IOV IB VFs, ib-kubernetes"
    },

    {
      id: "x052", domain: "6", pillar: 26, obj: "6.2", difficulty: 2,
      type: "multiple-choice",
      question: "An engineer deploys an IPoIB CNI secondary network on a RoCEv2 (Ethernet) fabric. Pods get a secondary interface but RDMA performance is very low. What is the likely misconfiguration?",
      options: [
        "The rdmaHcaMax value is too low, limiting the number of sharing pods",
        "IPoIB CNI is for native InfiniBand fabrics; for Ethernet/RoCEv2 the correct choice is MACVLAN with shared RDMA",
        "The secondaryNetwork spec is missing the multus sub-field",
        "The NicClusterPolicy name is wrong, so the operator never loaded the driver"
      ],
      correct: 1,
      explanation: "IPoIB CNI is designed for native InfiniBand fabrics (using an IPoIBNetwork CR with a master IB device). For Ethernet/RoCEv2 fabrics, the correct secondary network type is MACVLAN combined with the rdmaSharedDevicePlugin. Mixing the two causes poor performance or no RDMA at all.",
      sourcePillar: "P2 -- Network Operator, pod side: NicClusterPolicy CRD, shared RDMA, IPoIB vs MACVLAN"
    },

    {
      id: "x053", domain: "6", pillar: 23, obj: "6.1", difficulty: 1,
      type: "multiple-choice",
      question: "An RDMA pod runs but Verbs calls fail with a permissions error. The pod has an RDMA resource allocated. What capability is most likely missing?",
      options: [
        "NET_ADMIN",
        "SYS_PTRACE",
        "IPC_LOCK",
        "CAP_NET_RAW"
      ],
      correct: 2,
      explanation: "RDMA verbs require pinning memory (mlock), which needs the IPC_LOCK capability in the pod's securityContext. Missing IPC_LOCK is the most common reason a pod that has the RDMA resource allocated still cannot complete Verbs calls. Add it under securityContext.capabilities.add.",
      sourcePillar: "P2 -- Network Operator, fabric side: DOCA-OFED, SR-IOV IB VFs, ib-kubernetes"
    }

  ]
};
