# NCP-AIN Study Track — Content Backlog (research 2026-06-18)

Source: 6 parallel research agents. All claims tagged [know]/[inferred] in agent reports.
Exam blueprint (official, [know]): Spectrum 30% · InfiniBand 30% · Troubleshooting Tools 20% · Automation 10% · K8s 5% · AI DC Design 5%. 70-75 Q, 120 min, $400, Certiverse, valid 2yr, prereq 2-3yr DC ops.
URL: https://www.nvidia.com/en-us/learn/certification/ai-networking-professional/

Current coverage: 23 pillar theory cards + 2 basic console labs (IB diag, NVUE). Strong theory, thin on SCENARIOS.

---

## TIER 1 — Troubleshooting scenario labs (highest ROI: 20% domain + embedded in both 30% domains)

Turn the two existing consoles into scenario-driven labs (symptom -> which command reveals -> fix).

### IB scenarios (add to ncp-ain-ib-lab.html / ib-tools.js)
1. Bad cable / high BER — ibdiagnet `-E- BER exceeds threshold` (default 1e-12), mlxlink FEC histogram, SymbolErrorCounter
2. Link flap — perfquery LinkDownedCounter/LinkErrorRecoveryCounter, iblinkinfo, opensm.log
3. SM dual-master / priority conflict — sminfo + saquery -s; priority 15 master / 13 standby; lower GUID tiebreak
4. Congestion hotspot (incast) — PortXmitWait + PortXmitDiscards; IB FECN/BECN credit-based vs RoCE DCQCN
5. Credit loop — ibdiagnet -r routing validation; UpDown routing forbids Down-then-Up
6. PKey mismatch — saquery --pkey, PortRcvConstraintErrors, bad_pkey_cntr; full vs limited member
7. MTU mismatch — ibstat active MTU (256/512/1024/2048/4096); ib_write_bw -a bandwidth cliff
8. SHARP AM failure — sharp_am.service bind error, ibdiagnet --sharp, sharp_hello test

### Spectrum scenarios (add to ncp-ain-spectrum-lab.html)
1. PFC priority mismatch (switch SP3 vs host SP2) — tx-roce no-buffer-discard climbing + tx-pfc pause-packets=0; fix mlnx_qos --pfc 0,0,0,1...
2. DSCP trust mismatch (trust pcp vs pcp,dscp) — rx-roce no-buffer-discard; nv unset interface qos mapping
3. ECN thresholds too high — sparse tx-ecn-marked then PFC storm; default Kmin 146KB / Kmax 1.43MB TC3; DCQCN flow
4. PFC watchdog deadlock — `nv show interface qos pfc-watchdog` DEADLOCK status; polling 100ms x robustness 3
5. Buffer pool over-allocation — lossless 90% starves BGP; rebalance 40/60 lossy/lossless
6. Adaptive routing per-interface missing — global on but per-iface off; NCCL busbw low; link-util-threshold 70
7. BGP-EVPN VNI/RT mismatch — nv show evpn vni, type-2/3/5 route troubleshooting

Counter reference card (drill): SymbolError, LinkErrorRecovery, LinkDowned, PortXmitWait, PortXmitDiscards, PortRcvConstraintErrors, bad_pkey_cntr.

---

## TIER 2 — New console labs to add (permissive sources, cheap to port)

- **nccl-tests all_reduce_perf** output sim (BSD-3) — busbw/algbw table; pass = busbw >=92% line rate. Teaches collective validation.
- **ib_write_bw / perftest** sim (BSD path) — #bytes/#iter/BW avg; HDR 190+ Gb/s, NDR 380+ Gb/s.
- **WJH drop console** — L1/L2/Router/Buffer/ACL/Tunnel drop taxonomy (20% troubleshooting domain).
- **NetQ console** — `netq check roce` 5 sub-tests (mode/classification/congestion/flow-control/ETS), `netq show wjh-drop`.
- **UFM REST/telemetry console** — schema from Mellanox/ufm_sdk_3.0 (BSD-3): /ufmRest/resources/ports|links, monitoring/snapshot.
- Data sources to mine (format only, synthesize own): ForceInjection/AI-fundermentals (Apache, verbatim ibstat), guilbaults/infiniband-exporter (Apache, ibqueryerrors fields), Cumulus docs nv show evpn samples. AVOID code from: ibsim (GPL2), ib_d3viz (GPL3), InfiniBand-Topology-Builder (no license).

---

## TIER 3 — Coverage gaps (new pillar/theory cards)

- **Spectrum-X Security** (uncovered sub-domain of 30%): ACLs (/etc/cumulus/acl, cl-acltool), NVUE RBAC, SSH key-only mgmt hardening, port security, VRF-per-tenant.
- **Automation (10%, thin)**: NVUE declarative config (startup.yaml, nv config apply/diff/history rollback), ZTP, Ansible nvidia.nvue multi-switch inventory.
- **K8s Integration (5%)**: Network Operator verify, NicClusterPolicy CRD, IPoIB CNI, MACVLAN+RDMA shared mode, GPUDirect RDMA in pods.
- **BlueField/SuperNIC modes**: DPU vs NIC vs embedded-CPU, mlxconfig, DOCA install sequence.
- **IB SM HA**: redundant SM failover, UFM Cyber-AI threat detection.
- **AI DC Design (5%)**: collectives (all-reduce/all-gather) -> topology/bandwidth requirements, oversubscription ratios.

---

## TIER 4 — Resource hub additions (link from ncp-ain-hub.html)

Official prep path:
- NVIDIA Academy: InfiniBand Essentials (free), IB Network Administration, Cumulus Linux Professional, Spectrum-X Platform Administration, Working with UFM
- Docs: Cumulus Linux 5.16 guide, NVUE reference, UFM Enterprise v6.23.1, DOCA/BlueField, IB Cluster Bring-Up Procedure PDF
- **DSX Air** (dsx-air.nvidia.com) — FREE NVIDIA network sim (Spectrum-X, Cumulus, NetQ); needs free NGC account. Real hands-on.
- Whitepaper: Spectrum-X architecture; blog "Optimize Large-Scale AI Workloads with Spectrum-X"
- Reference arch: DGX SuperPOD B300 (Spectrum-4) / H200
- GTC on-demand: S62293 (2024), S71145 "Wired for AI 100K+ GPU" (2025)
- Free practice: NVIDIA LaunchPad; dclabsim.com (NCP-AII focus, IB/troubleshoot overlap)
- WARN section: braindump sites (certshero, validexamdumps, marks4sure, etc.) violate cert agreement — avoid.

---

## Advice / needs surfaced

- Professional tier: hands-on CLI familiarity is the differentiator. Scenario drills > definitions. (matches existing card style.)
- Romeo (CoreWeave DCT, 2-3yr DC ops) meets the prereq profile.
- No first-hand NCP-AIN pass reports public yet (new cert). Sibling NCP-AII = 40-50 hrs study; estimate 6-10 weeks w/ networking background. Spectrum-X + IB operational depth is the difficulty wall.
- Reddit blocked on this box (confirmed) — community sweep used Medium/forums/blogs instead.
