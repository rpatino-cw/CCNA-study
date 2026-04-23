# Jeremy's IT Lab — Free CCNA 200-301 (v1.1) Complete Course — Index + Glossary

**Playlist:** https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ
**Videos:** 126
**Built:** 2026-04-22 · Romeo's CCNA study pack

---

## Artifact Layout

```
data/jeremy-transcripts/
├── MASTER_INDEX.md           ← you are here
├── domain-map.json           ← video → domain → sub-objective mapping
├── playlist-index.txt        ← raw playlist listing
├── raw/                      ← original .vtt subtitle files (126)
├── clean/                    ← plain-text transcripts (126)
├── brief-domain-1.0.md       ← per-domain briefs (video lists grouped by sub-objective)
├── brief-domain-2.0.md
├── brief-domain-3.0.md
├── brief-domain-4.0.md
├── brief-domain-5.0.md
├── brief-domain-6.0.md
└── glossary/
    ├── glossary-1.0.md       ← Network Fundamentals (10 sub-objectives, 37 videos)
    ├── glossary-2.0.md       ← Network Access (7 sub-objectives, 25 videos)
    ├── glossary-3.0.md       ← IP Connectivity (5 sub-objectives, 19 videos)
    ├── glossary-4.0.md       ← IP Services (9 sub-objectives, 22 videos)
    ├── glossary-5.0.md       ← Security Fundamentals (5 sub-objectives, 15 videos)
    └── glossary-6.0.md       ← Automation & Programmability (6 sub-objectives, 8 videos)
```

---

## CCNA 200-301 v1.1 Blueprint

| Domain | Name | Exam Weight | Videos | Sub-Obj | Glossary Entries | File |
|--------|------|-------------|--------|---------|------------------|------|
| **1.0** | Network Fundamentals | 20% | 37 | 10 | **~308** | [glossary-1.0.md](glossary/glossary-1.0.md) |
| **2.0** | Network Access | 20% | 25 | 9 | **~275** | [glossary-2.0.md](glossary/glossary-2.0.md) |
| **3.0** | IP Connectivity | 25% | 19 | 5 | **~166** | [glossary-3.0.md](glossary/glossary-3.0.md) |
| **4.0** | IP Services | 10% | 22 | 9 | **~361** | [glossary-4.0.md](glossary/glossary-4.0.md) |
| **5.0** | Security Fundamentals | 15% | 15 | 9 | **~231** | [glossary-5.0.md](glossary/glossary-5.0.md) |
| **6.0** | Automation & Programmability | 10% | 8 | 7 | **~246** | [glossary-6.0.md](glossary/glossary-6.0.md) |
| — | **Total** | 100% | **126** | **49** | **~1,587** | — |

---

## Sub-objective → Video Map (quick jump)

### 1.0 Network Fundamentals
- **1.1** Role/function of network components — Days 1
- **1.2** Network topology architectures — Days 52, 53
- **1.3** Physical interfaces & cabling — Day 2
- **1.5** TCP vs UDP — Days 3, 30
- **1.6** IPv4 addressing & subnetting — Days 7, 8, 10, 13, 14, 15
- **1.8** IPv6 addressing & prefix — Day 31
- **1.9** IPv6 address types — Days 32, 33
- **1.11** Wireless principles — Day 55
- **1.12** Virtualization (server, containers, VRF) — Day 54
- **1.13** Switching concepts — Days 5, 6, 9

### 2.0 Network Access
- **2.1** VLANs across multiple switches — Day 16
- **2.2** Interswitch connectivity (trunks, DTP, 802.1Q) — Days 17, 18, 19
- **2.3** L2 discovery (CDP, LLDP) — Day 36
- **2.4** EtherChannel (LACP) — Day 23
- **2.5** STP operations (RSTP, PVST+, PortFast, BPDU Guard) — Days 20, 21, 22
- **2.6** Wireless architectures & AP modes — Day 56
- **2.9** WLAN GUI client config — Day 58

### 3.0 IP Connectivity
- **3.1** Routing table components — Days 11, 24, 25
- **3.2** Router forwarding decision — Day 12
- **3.3** IPv4/IPv6 static routing — Days 11, 24
- **3.4** Single-area OSPFv2 — Days 26, 27, 28, Mega Lab
- **3.5** FHRP/HSRP — Day 29

### 4.0 IP Services
- **4.1** Inside source NAT (static/pool) — Days 44, 45
- **4.2** NTP (client/server) — Day 37
- **4.3** DHCP & DNS roles — Days 38, 39
- **4.4** SNMP — Day 40
- **4.5** Syslog (facilities, severity) — Day 41
- **4.6** DHCP client/relay — Day 39
- **4.7** QoS PHB (classify, mark, queue, shape, police) — Days 46, 47
- **4.8** SSH remote access — Day 42
- **4.9** TFTP/FTP — Day 43

### 5.0 Security Fundamentals
- **5.1** Threats, vulnerabilities, mitigation — Day 48
- **5.3** Local password device access — Day 4
- **5.6** Standard & extended ACLs — Days 34, 35
- **5.7** L2 security (DHCP snooping, DAI, port security) — Days 49, 50, 51
- **5.9** Wireless security (WPA/WPA2/WPA3) — Day 57

### 6.0 Automation & Programmability
- **6.1** How automation impacts network mgmt — Day 59
- **6.3** Controller-based SDN (overlay/underlay/fabric) — Day 62
- **6.4** AI/ML in network ops (agentic, GenAI, predictive) — Day 59
- **6.5** REST APIs (auth, CRUD, verbs, encoding) — Day 61
- **6.6** Config management (Ansible, Terraform) — Day 63
- **6.7** JSON-encoded data — Day 60

---

## Coverage Gaps (blueprint items Jeremy doesn't cover here)

- **1.4** Identify interface/cable issues — touched within Day 2 material
- **1.7** Need for private IPv4 — mentioned but no dedicated video
- **1.10** Verify IP parameters for Client OS — not a standalone video
- **2.7** WLAN physical infrastructure connections — partial in Day 56
- **2.8** AP/WLC management access — partial in Day 56
- **5.2** Security program elements (training, physical access) — mentioned in Day 48
- **5.4** Password policy elements / MFA / biometrics — mentioned in Day 4/48
- **5.5** IPsec remote-access / site-to-site VPNs — mentioned in Day 48, 53
- **5.8** AAA concepts — mentioned in Day 48
- **5.10** WLAN GUI WPA2 PSK config — partial in Day 58
- **6.2** Traditional vs controller-based networking — covered in Day 62 intro

**Action:** Supplement gap areas with Cisco Press CCNA official cert guide or boson practice.

---

## How to study with this pack

1. **Pick a domain or sub-objective** from the table above.
2. **Watch Jeremy's videos** for that sub-objective (links in the domain brief files).
3. **Review the glossary** for that sub-objective — every term he defines in his own words.
4. **Practice CLI** in Packet Tracer using the command lists in the glossary.
5. **Cross-check** with the CCNA_study site flashcards (`flashcards.html`) and exam sim.

---

## Per-sub-objective entry counts

### Domain 1.0 (308 entries)
| Sub | Entries | Topic |
|-----|---------|-------|
| 1.1 | 20 | Network components |
| 1.2 | 34 | Topology architectures (LAN/WAN) |
| 1.3 | 25 | Interfaces & cabling |
| 1.5 | 47 | TCP vs UDP |
| 1.6 | 46 | IPv4 addressing & subnetting |
| 1.8 | 15 | IPv6 addressing & prefix |
| 1.9 | 19 | IPv6 address types |
| 1.11 | 31 | Wireless principles |
| 1.12 | 36 | Virtualization (VM/container/VRF) |
| 1.13 | 35 | Switching concepts |

### Domain 2.0 (275 entries)
| Sub | Entries | Topic |
|-----|---------|-------|
| 2.1 | 25 | VLANs |
| 2.2 | 55 | Trunks/DTP/VTP/ROAS/SVI |
| 2.3 | 27 | CDP & LLDP |
| 2.4 | 21 | EtherChannel/LACP |
| 2.5 | 65 | STP/RSTP/PVST+/toolkit |
| 2.6 | 33 | Wireless architectures |
| 2.7 | 14 | AP/WLC physical |
| 2.8 | 13 | Management access |
| 2.9 | 22 | WLAN GUI |

### Domain 3.0 (166 entries)
| Sub | Entries | Topic |
|-----|---------|-------|
| 3.1 | 47 | Routing table |
| 3.2 | 13 | Forwarding decision |
| 3.3 | 18 | IPv4/IPv6 static routing |
| 3.4 | 61 | Single-area OSPFv2 |
| 3.5 | 27 | FHRP / HSRP |

### Domain 4.0 (361 entries)
| Sub | Entries | Topic |
|-----|---------|-------|
| 4.1 | 40 | NAT |
| 4.2 | 39 | NTP |
| 4.3 | 56 | DHCP / DNS |
| 4.4 | 30 | SNMP |
| 4.5 | 36 | Syslog |
| 4.6 | 10 | DHCP client/relay |
| 4.7 | 73 | QoS / PHB |
| 4.8 | 43 | SSH |
| 4.9 | 34 | FTP / TFTP |

### Domain 5.0 (231 entries)
| Sub | Entries | Topic |
|-----|---------|-------|
| 5.1 | 42 | Threats / vulns / exploits |
| 5.2 | 6 | Security program |
| 5.3 | 30 | Device access control |
| 5.4 | 10 | Password policies / MFA |
| 5.6 | 45 | Standard & extended ACLs |
| 5.7 | 55 | L2 security (port sec, snooping, DAI) |
| 5.8 | 8 | AAA |
| 5.9 | 35 | Wireless security (WPA/WPA2/WPA3) |

### Domain 6.0 (246 entries)
| Sub | Entries | Topic |
|-----|---------|-------|
| 6.1 | 32 | Automation basics |
| 6.2 | 17 | Controller-based vs traditional |
| 6.3 | 36 | SDN / SD-Access / fabric |
| 6.4 | 34 | AI/ML in networks |
| 6.5 | 51 | REST APIs + auth |
| 6.6 | 46 | Ansible/Puppet/Chef/Terraform |
| 6.7 | 30 | JSON / XML / YAML |

---

**Build complete 2026-04-22.** 126 videos · 49 sub-objectives · ~1,587 glossary entries · 202 KB across 6 files.
