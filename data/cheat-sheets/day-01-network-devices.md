---
title: "Day 1 — Network Devices (Cheat Sheet)"
type: ccna-cheat-sheet
day: 1
blueprint: 1.1.a–h
source_transcript: "[[../jeremy-it-videos/001-network-devices-day-1]]"
created: 2026-04-28
updated: 2026-04-29
tags: [ccna, cheat-sheet, day-1, network-devices, blueprint-aligned]
---

# Day 1 — Network Devices (Full 1.1.a → 1.1.h)

## 🎯 What this objective covers

CCNA 200-301 v1.1 blueprint **1.1 Explain the role and function of network components**. Eight components, all on the exam:

| Sub-bullet | Component |
|---|---|
| **1.1.a** | Routers |
| **1.1.b** | Layer 2 and Layer 3 switches |
| **1.1.c** | Next-generation firewalls and IPS |
| **1.1.d** | Access points |
| **1.1.e** | Controllers (Cisco DNA Center, and WLC) |
| **1.1.f** | Endpoints |
| **1.1.g** | Servers |
| **1.1.h** | PoE |

Day 1 of Jeremy's IT Lab introduces 5 of these (a/b/c/f/g). The other three (APs, controllers, PoE) are covered in later Jeremy days but ARE part of objective 1.1 — included here so this cheat sheet matches the actual exam scope.

## 🧠 Core Concept

**A network = nodes connected to share resources.** Objective 1.1 is asking you to recognize the role and function of every device involved — from edges (endpoints, servers) through forwarding (switches, routers), through security (NGFW + IPS), through wireless (APs + controllers), through power delivery (PoE).

---

## 1.1.a — Routers

| Attribute | Detail |
|---|---|
| Layer | **Layer 3** |
| Forwards by | Destination **IP address** |
| Connects | **Different networks** (LAN ↔ LAN, LAN ↔ Internet) |
| Port count | **Few** (2 to a handful) |
| Domain effect | **Separates broadcast domains** (one per interface) |
| Decision source | **Routing table** (longest-prefix match — covered in 3.1/3.2) |

**Exam giveaway phrases:** "connect separate networks", "send over the Internet", "boundary device", "few interfaces".

**Cisco product line:** ISR (Integrated Services Router) — ISR 900/2900/4000.

### 🎯 Atomic Drill — 1.1.a (single-fact recall cards)

| ID | Fact |
|---|---|
| 1.1.a.1 | Operates at **Layer 3** (network). |
| 1.1.a.2 | Forwards by **destination IP address**. |
| 1.1.a.3 | Lookup uses **longest-prefix match** in the routing table. |
| 1.1.a.4 | Connects **different networks** (LAN↔LAN, LAN↔Internet). |
| 1.1.a.5 | **Few** interfaces (2 → handful, vs switches' many). |
| 1.1.a.6 | **Separates broadcast domains** — one per interface. |
| 1.1.a.7 | Routing table source codes: **C** (connected), **L** (local), **S** (static), **O** (OSPF), **D** (EIGRP), **B** (BGP), **i** (IS-IS). |
| 1.1.a.8 | Cisco product line: **ISR** (Integrated Services Router) — 900/2900/4000. |

**Drill rule:** if you can't recall a fact in <3 sec, mark it. Re-drill against the table above + Day 1 video.

**r/ccna gotcha:** reading `show ip route` is a recurring exam stem. Drill letter codes until reflex.

---

## 1.1.b — Layer 2 and Layer 3 Switches

| Attribute | Layer 2 switch | Layer 3 switch |
|---|---|---|
| Forwards by | **MAC address** | MAC AND IP |
| Layer | 2 | 2 + 3 |
| Inter-VLAN routing | No | **Yes (wire-speed)** |
| Port count | Many (24, 48 common) | Many |
| Collision domain | Per port | Per port |
| Broadcast domain | One (default) | One per VLAN/interface |
| Table | MAC address table | MAC table + routing table |

**L2 switch behavior:** Learns source MACs → builds MAC table → forwards by destination MAC. Unknown destination MAC = **flood** out all ports except the source port.

**L3 switch use case:** Campus distribution layer — replaces a router-on-a-stick with hardware-fast inter-VLAN routing.

**Exam giveaway phrases:** "many ports", "same LAN", "connect 30 PCs", "Layer 2", "MAC".

---

## 1.1.c — Next-Generation Firewalls + IPS

| Type | What it does |
|---|---|
| **Traditional firewall** | Packet filter (src/dst IP, ports, protocol) + stateful (tracks connection state) |
| **NGFW (Next-Gen Firewall)** | Traditional + **application awareness** + **integrated IPS** + URL filter + TLS decrypt + threat-intel |
| **IPS (Intrusion Prevention)** | **Inline** — inspects payload against signatures, **drops** matches |
| **IDS (Intrusion Detection)** | **Out-of-band** (SPAN/tap) — **alerts only**, can't block |

**Why NGFW exists:** Modern apps tunnel inside HTTPS (port 443). Port-based rules can't tell Facebook from Dropbox. NGFW identifies the app by behavior, not by port.

**Cisco product lines:**
- **Firepower** / **Cisco Secure Firewall** = NGFW
- **ASA** (5500-X / 5505) = older non-NGFW (still on the exam)

**Exam giveaway phrases:** "advanced filtering", "block by application", "inspect payload" → NGFW. "Drop malicious packet inline" → IPS. "Alert on suspicious traffic, no blocking" → IDS.

---

## 1.1.d — Access Points (APs)

| Attribute | Detail |
|---|---|
| Function | **Bridge wireless clients to wired LAN** |
| Wireless duplex | **Half-duplex** (radio is shared medium) |
| Power | Usually **PoE** (one cable to ceiling) |

**Two AP architectures (memorize):**

| Architecture | Behavior |
|---|---|
| **Autonomous AP** | Self-contained. Holds own config, does own auth, bridges locally. Each AP managed individually. |
| **Lightweight AP (LWAP)** | Dumb radio. Pairs with a **WLC** over the **CAPWAP** tunnel. Split-MAC architecture. |

**Split-MAC (lightweight model):**
- AP keeps **time-critical** functions (TX/RX, encryption, beacons)
- WLC handles **everything else** (auth, key mgmt, QoS, roaming, RF tuning)

**CAPWAP ports:** Control = UDP **5246**, Data = UDP **5247**.

**Cisco product line:** Catalyst 9120 / 9130 series APs.

---

## 1.1.e — Controllers (WLC + Cisco DNA Center)

| Controller | Scope | Manages |
|---|---|---|
| **WLC** (Wireless LAN Controller) | Wireless only | A fleet of lightweight APs |
| **Cisco DNA Center** | Whole campus | Switches, APs, WLCs, routers — wired + wireless |

**WLC duties:** SSID config, security policy, RF tuning, client association, roaming continuity, channel/power planning.

**WLC form factors:** Physical appliance (Catalyst 9800), VM, embedded in a switch.

**DNA Center model:** **Intent-based networking** — admin describes intent (who can talk to what, with what SLA, under what security). DNA Center translates intent → device configuration → pushes out. Also collects telemetry across whole network for assurance and analytics.

**Exam giveaway phrases:** "manage 200 APs from one console" → WLC. "Manage entire campus by intent" → DNA Center.

---

## 1.1.f — Endpoints

| Attribute | Detail |
|---|---|
| Definition | **Source or final destination** of traffic |
| Position | **Edges** of the network (not in the middle) |
| Examples | Laptops, desktops, phones, IP cameras, IoT sensors, printers |
| Connection | Via a **NIC** (Network Interface Card) — wired (RJ45/fiber) or wireless |

**Endpoint vs network device:**
- Switches/routers/firewalls **forward or filter** traffic.
- Endpoints **generate or consume** traffic.

**Exam trap:** If a question asks which device "joins/links/forwards" — endpoint is wrong. Endpoints are what get connected.

---

## 1.1.g — Servers

| Attribute | Detail |
|---|---|
| Definition | **Endpoint that responds to client requests** |
| Role vs hardware | **Role**, not a category of network gear |
| Common services | HTTP/HTTPS, SMB/NFS file, DB, mail, DNS, time, auth |

**Client vs server:** Same hardware can be either — role is decided per transaction (who requests vs who provides). Your laptop is a client when it loads YouTube and a server the moment a friend pulls a file off it.

**Exam giveaway phrases:** "providing", "sending the file", "AirDrop sender", "responds to clients".

---

## 1.1.h — PoE (Power over Ethernet)

| Term | Meaning |
|---|---|
| **PSE** | Power Sourcing Equipment — the switch supplying power |
| **PD** | Powered Device — the AP / IP phone / IP camera being powered |
| **Budget** | Total wattage the PSE can deliver across all PoE ports (per-switch, NOT per-port) |
| **Mode A** | Power on data pairs (1/2 + 3/6) |
| **Mode B** | Power on spare pairs (4/5 + 7/8) |

**Standards (memorize):**

| Standard | Common name | PSE max | PD usable | Pairs |
|---|---|---|---|---|
| **802.3af** | PoE | 15.4 W | ~12.95 W | 2 |
| **802.3at** | PoE+ | 30 W | ~25.5 W | 2 |
| **802.3bt** Type 3 | PoE++ / 4PPoE | 60 W | ~51 W | 4 |
| **802.3bt** Type 4 | PoE++ / 4PPoE | 100 W | ~71 W | 4 |

**Negotiation:** PSE and PD negotiate during link bring-up so the PSE only delivers what the PD needs. Switch tracks total budget.

**Exam trap:** A 24-port PoE+ switch with 370 W budget cannot fully run all 24 ports at 25.5 W simultaneously (24 × 25.5 = 612 W > 370 W).

---

## 🔗 How it all connects

```
[Endpoint] → [PoE-powered AP] → [L2 Switch] → [L3 Switch] → [Router] → [NGFW with IPS] → [Internet] → ... → [Server]
                ↑                       ↑
              [WLC]              [DNA Center sees everything]
```

---

## 🧩 Concept-pair clarifications (the high-value confusables)

| Pair | Key contrast |
|---|---|
| **L2 switch vs L3 switch** | L3 switch adds routing — does inter-VLAN forwarding at wire speed |
| **Switch vs Router** | Switch = same LAN, many ports, MAC. Router = between LANs, few ports, IP |
| **Traditional firewall vs NGFW** | NGFW adds app awareness + integrated IPS |
| **IPS vs IDS** | IPS = inline + blocks. IDS = out-of-band + alerts only |
| **Autonomous AP vs Lightweight AP** | Autonomous = self-contained. Lightweight = WLC-managed via CAPWAP |
| **WLC vs Cisco DNA Center** | WLC = wireless only. DNA = whole campus (wired + wireless) |
| **Endpoint vs Network device** | Endpoint = source/destination. Network device = forwarder/filter |
| **Client vs Server** | Role per transaction, not hardware |
| **Network firewall vs Host firewall** | Hardware appliance vs software on one PC |
| **PSE vs PD** | PSE supplies power (switch). PD consumes power (AP/phone/camera) |
| **PoE vs PoE+ vs PoE++** | 15 W vs 30 W vs 60-100 W |

---

## 🚨 Exam Traps

- **Router** is NOT for connecting many end hosts — too few ports
- **Firewall** is NOT for connecting devices — it filters, doesn't aggregate
- **Server** is NOT a networking device — it's an endpoint role
- **L2 switch alone** can NOT reach the internet — needs router or L3 switch
- **End host** describes what a device IS, not what it's DOING — when asked for function, pick client or server
- **Host-based firewall** is NOT a network firewall — it's software on one PC
- **IDS** is NOT inline — it only alerts. **IPS** is inline and blocks.
- **Autonomous APs** do NOT use a WLC — only lightweight APs do
- **PoE budget** is NOT per-port — it's per-switch total
- **Layer 2 switch** does NOT forward by IP — only L3 switch and router do
- **Half-duplex** is forced by hubs and wireless — wired switch ports are full-duplex by default

---

## 🧪 Quick-Answer Map

| Stem | Answer |
|---|---|
| Connect 30 PCs in one LAN | L2 switch |
| Connect different LANs | Router or L3 switch |
| Inter-VLAN routing at wire speed | L3 switch |
| Block Facebook inside HTTPS | NGFW (app awareness) |
| Drop a known attack signature inline | IPS |
| Alert on suspicious traffic, can't block | IDS |
| Bridge wireless clients to wired LAN | Access point |
| Manage 200 APs from one console | WLC |
| Manage entire campus by intent | Cisco DNA Center |
| Source or destination of traffic | Endpoint |
| Endpoint that responds to clients | Server |
| Power an AP through Ethernet cable | PoE (PSE → PD) |
| Friend AirDrops you a video — friend's phone is | Server (responder) |
| You watching YouTube — your device is | Client (requester) |
| Block external attacker | Firewall (NGFW for advanced) |
| Forwards data over the Internet | Router |
| Forwards by MAC inside one LAN | L2 switch |

---

## ⚡ One-Line Master Recall

**1.1 = 8 components: routers (L3), L2/L3 switches (LAN), NGFW + IPS (security), APs (wireless bridge), controllers WLC + DNA (centralized mgmt), endpoints (edges), servers (responders), PoE (power+data on one cable).**

---

## 🧾 Recap

- 1.1 is the **role and function of 8 network components** — not just routers, not just 5 devices.
- Routers connect networks; L2 switches connect a LAN; L3 switches do both.
- NGFW = traditional firewall + app awareness + IPS. IPS blocks inline; IDS only alerts.
- Lightweight APs need a WLC over CAPWAP. Autonomous APs are standalone.
- WLC manages wireless only. DNA Center manages the whole campus.
- Endpoints generate/consume traffic; servers are endpoints that respond.
- PoE delivers power + data on one cable; PSE supplies, PD consumes; standards are af/at/bt (15/30/60-100 W).

---

**Source:** Jeremy's IT Lab — Day 1 + Day 56 (wireless arch) + Day 57 (WLC config) — https://www.youtube.com/@JeremysITLab
