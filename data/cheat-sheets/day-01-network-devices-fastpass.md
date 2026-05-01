# CCNA Day 1 Cheat Sheet: Network Devices

Source video: Jeremy's IT Lab, "Free CCNA | Network Devices | Day 1 | CCNA 200-301 Complete Course"

Current CCNA fit: Cisco CCNA 200-301 v1.1, Network Fundamentals 1.1, "Explain the role and function of network components." Cisco lists routers, Layer 2 and Layer 3 switches, next-generation firewalls and IPS, access points, controllers, endpoints, servers, and PoE.

## What This Video Is About

This lesson is the foundation for the rest of networking: what a network is, what the main devices are, and what job each device performs.

The whole point: when you see a topology, you must instantly know which device connects hosts, which device connects networks, which device provides services, which device consumes services, and which device filters traffic.

If you learn only one thing: switches connect devices inside a LAN, routers connect different networks, firewalls control allowed/blocked traffic, servers provide services, and clients/endpoints use services.

## The 60-Second Survival Version

Memorize this first:

| Device | Exam translation | Fast answer |
|---|---|---|
| Client | Service consumer | Requests/uses a service |
| Server | Service provider | Provides files, web pages, apps, DNS, etc. |
| Endpoint/end host | Final source/destination device | PC, laptop, phone, printer, server |
| Switch | Same-LAN connector | Connects many hosts in one LAN |
| Router | Network-to-network connector | Connects LANs/WANs/Internet |
| Firewall | Traffic rule enforcer | Allows/denies traffic based on policy |
| NGFW | Advanced firewall | Firewall plus deeper inspection, app/user awareness, IPS-like features |
| IPS | Attack blocker | Detects and prevents malicious traffic |
| AP | Wireless entry point | Connects Wi-Fi clients to the wired LAN |
| Controller | Central manager | Manages devices like APs or network policy |
| PoE | Power over Ethernet | Sends electrical power over Ethernet cable |

High-speed exam rule:

| If the question says... | Pick... |
|---|---|
| "Connect 30 PCs in one department" | Switch |
| "Connect separate networks together" | Router |
| "Filter traffic entering/exiting the network" | Firewall |
| "Advanced firewall functions" | Next-generation firewall |
| "Device requesting a file/video/page" | Client |
| "Device sending/providing the file/video/page" | Server |
| "Wireless clients need LAN access" | Access point |
| "Power an IP phone/AP/camera through the Ethernet cable" | PoE switch |
| "Centrally manage many APs" | Wireless LAN controller |

## Core Mental Model

A network is connected nodes sharing resources.

Node means a device or participant in the network. In this video, the important nodes are clients, servers, switches, routers, and firewalls.

Do not overthink it:

Visual ID: `client-server-flow` (defined in the Visual Generation JSON near the end).

Examples:

| Situation | Client | Server |
|---|---|---|
| You watch YouTube | Your phone/PC | YouTube server |
| You receive an AirDrop video | Your iPhone | Friend's iPhone |
| PC1 requests image.jpg from PC2 | PC1 | PC2 |

Key exam trap: a device is not always one thing forever. A phone can be a client when watching YouTube and a server when sending a file to another phone.

## Topology From The Lesson

Jeremy's branch-network idea:

Visual ID: `branch-network-topology` (defined in the Visual Generation JSON near the end).

How to read it:

1. PC1 and PC2 are endpoints in the New York LAN.
2. SW1 connects New York endpoints inside the same LAN.
3. R1 connects the New York LAN to other networks.
4. The Internet/WAN is hidden as a cloud because the exact details are not important in this diagram.
5. R2 connects the Tokyo LAN to the outside network.
6. FW1/FW2 enforce security rules.
7. SRV1/SRV2 provide services.

## The "Where Does Traffic Go?" Flow

Use this decision tree when reading CCNA questions:

Visual ID: `traffic-decision-flow` (defined in the Visual Generation JSON near the end).

Same LAN example:

```text
PC1 -> SW1 -> PC2
```

Different LAN example:

```text
PC1 -> SW1 -> firewall/router -> Internet/WAN -> router/firewall -> SW2 -> SRV1
```

Exam meaning:

| Traffic type | Main device involved |
|---|---|
| Host to host in same LAN | Switch |
| Host to remote network | Router |
| Traffic allowed/denied | Firewall |
| Host requesting a service | Client |
| Host providing a service | Server |

## Clients, Servers, Endpoints

### Client

A client is a device that accesses a service made available by a server.

Plain English: the client asks.

Examples:

| Client example | What it requests |
|---|---|
| Laptop | Web page, file, email |
| Phone | Video stream, message, app data |
| Desktop PC | Printer access, shared file, DNS lookup |

Exam keywords:

- Requests
- Accesses
- Consumes
- Downloads
- Receives a service

### Server

A server is a device that provides functions or services to clients.

Plain English: the server provides.

Examples:

| Server type | Service |
|---|---|
| Web server | Web pages/apps |
| File server | Shared files |
| DNS server | Name-to-IP lookups |
| DHCP server | IP address assignment |
| Email server | Mail services |

Jeremy's key lesson: a server does not have to be a giant rack-mounted machine. A normal PC or phone can function as a server if it provides a service.

### Endpoint / End Host

An endpoint, or end host, is a device at the edge of the network that sends or receives data.

Examples:

- PCs
- Laptops
- Smartphones
- Servers
- Printers
- IP phones
- Cameras

Exam trap: "endpoint" describes where the device sits in the communication path. It does not tell you whether the device is acting as a client or server in a specific transaction.

## Switches

### What Jeremy Says

A switch aggregates endpoint connections inside a LAN. Instead of connecting every PC directly to every other PC, endpoints connect to a switch.

Switches usually have many ports, often 24 or more, so many hosts can connect.

Switches forward traffic within a LAN.

### CCNA Exam Meaning

A switch is the device you choose when the question says:

- Connect many PCs in one department
- Connect devices in the same office/floor/LAN
- Provide many Ethernet ports for endpoints
- Forward traffic inside the local network

Fast memory hook:

```text
Switch = same LAN.
Router = different networks.
```

### Layer 2 Switch vs Layer 3 Switch

Jeremy's Day 1 video focuses on switches in general. For the CCNA objective, add this:

| Type | Main job | Uses |
|---|---|---|
| Layer 2 switch | Switches frames inside the same LAN/VLAN | MAC addresses |
| Layer 3 switch | Switches like L2, but can also route between VLANs/networks | MAC + IP |

For now, do not drown in details. Just know:

- Layer 2 switches are classic LAN switches.
- Layer 3 switches can perform routing functions.
- Routers are still the cleanest exam answer for connecting separate networks unless the question specifically says Layer 3 switch or inter-VLAN routing.

### Switch Exam Traps

| Trap | Correct thinking |
|---|---|
| "A switch connects to the Internet" | Not by itself in Jeremy's basic model; use a router for Internet/WAN connectivity |
| "A switch connects different LANs" | Basic L2 switch does not; routers or L3 switches do |
| "A switch is a server" | No, it is a network infrastructure device |
| "A switch filters attacks" | That is mainly firewall/IPS territory |

## Routers

### What Jeremy Says

Routers connect LANs to other LANs and to the Internet.

Routers usually have fewer interfaces than switches.

If a host in New York needs to reach a server in Tokyo, the traffic goes from the local LAN to a router, across the Internet/WAN, then through another router to the destination LAN.

### CCNA Exam Meaning

A router is the device you choose when the question says:

- Connect separate networks
- Connect a LAN to the Internet
- Forward traffic between LANs
- Forward traffic over a WAN
- Send traffic to a remote network

Memory hook:

```text
Router = route between networks.
```

### Default Gateway

Jeremy does not go deep here yet, but this is CCNA-core:

The default gateway is the router interface a host uses to reach destinations outside its local network.

If PC1 wants to talk to PC2 in the same LAN, it does not need the default gateway.

If PC1 wants to talk to SRV1 in another LAN, it sends traffic to the default gateway.

Visual ID: `default-gateway-path` (defined in the Visual Generation JSON near the end).

Exam phrase to burn in:

```text
Remote destination? Send to default gateway.
```

## Firewalls

### What Jeremy Says

Firewalls are security devices that control traffic entering and leaving a network.

They are configured with rules that decide what traffic is allowed and what traffic is denied.

They can be placed outside the router, inside the network, or both.

### CCNA Exam Meaning

A firewall is the device you choose when the question says:

- Monitor and control network traffic
- Permit or deny traffic
- Protect internal hosts
- Filter traffic entering/exiting a network
- Enforce security policy

Memory hook:

```text
Firewall = rules decide pass or block.
```

### Network Firewall vs Host-Based Firewall

| Type | Form | Protects |
|---|---|---|
| Network firewall | Hardware/appliance or virtual network device | Network/segments |
| Host-based firewall | Software on a host | One host |

Jeremy's point: even if a network has a hardware firewall, endpoints should still have host-based firewalls as another layer of defense.

### Next-Generation Firewall

For CCNA, know the big idea:

A next-generation firewall does traditional firewall filtering plus more advanced inspection.

Common NGFW ideas:

- Application awareness
- User awareness
- Intrusion prevention features
- More detailed traffic inspection than a basic firewall

Do not memorize vendor marketing. For CCNA, "next-generation" means more advanced filtering and inspection than traditional port/IP-only firewalling.

### IPS

Cisco's current objective includes next-generation firewalls and IPS. Jeremy mentions IPS briefly.

IPS means intrusion prevention system.

Plain English: an IPS looks for malicious traffic and actively blocks/prevents it.

Contrast:

| Tool | Basic idea |
|---|---|
| IDS | Detects and alerts |
| IPS | Detects and blocks/prevents |

For CCNA, if the question says "prevent attacks in network traffic," think IPS/NGFW.

## Internet Cloud In Diagrams

Jeremy uses a cloud to represent the Internet.

Exam meaning:

The cloud hides complexity. It means "some network path exists here, but the details are not relevant to this diagram."

Clouds can represent:

- Internet
- WAN
- Provider network
- Unknown/abstracted network segment

Do not waste time trying to identify every router inside the cloud unless the question gives that detail.

## CCNA Add-Ons Jeremy Did Not Cover Deeply In This Video

These are in the current CCNA 200-301 network components objective, so know the basics before moving on.

### Access Point

An access point lets wireless clients connect to the wired LAN.

Visual ID: `wireless-ap-topology` (defined in the Visual Generation JSON near the end).

Exam shortcuts:

| Question wording | Answer |
|---|---|
| Wireless clients need to join the LAN | Access point |
| Wi-Fi coverage needed | Access point |
| Many wired Ethernet ports needed | Switch, not AP |
| Connect separate networks | Router, not AP |

Important: a home "wireless router" often combines router, switch, firewall, and AP in one box. In enterprise CCNA diagrams, these roles are usually separated.

### Wireless LAN Controller

A wireless LAN controller centrally manages multiple APs.

Why it matters:

- Central AP configuration
- SSID management
- Security settings
- Roaming support
- Monitoring

Fast memory:

```text
AP = provides Wi-Fi access.
WLC/controller = manages APs.
```

### Network Controller

A controller manages network devices or policies from a central place. In Cisco environments this can include controller-based management and automation platforms.

For this Day 1 objective, keep it simple:

```text
Controller = centralized brain/manager for network devices or services.
```

### PoE

PoE means Power over Ethernet.

It lets an Ethernet cable carry data and electrical power.

Common PoE-powered devices:

- IP phones
- Wireless access points
- Security cameras

The switch commonly provides the power.

| Term | Meaning |
|---|---|
| PSE | Power sourcing equipment, usually the switch |
| PD | Powered device, like AP/phone/camera |

Exam shortcut:

If the question says an AP, phone, or camera needs power without a separate power adapter, think PoE.

## One Picture: Who Does What?

Visual ID: `network-roles-overview` (defined in the Visual Generation JSON near the end).

Verbal version:

```text
Client asks -> switch carries inside LAN -> firewall checks rules -> router forwards to another network -> remote side delivers to server.
```

## The Exam Wants You To Separate Roles

Many real devices combine roles. Your home Wi-Fi box may be:

- Router
- Switch
- Firewall
- Wireless access point
- DHCP server

But on the CCNA, identify the function being asked about.

Ask:

1. Is the device consuming or providing a service?
2. Is traffic staying inside the same LAN?
3. Is traffic going to another network?
4. Is traffic being allowed or denied by rules?
5. Is this about wireless access?
6. Is this about centralized management?
7. Is this about power through Ethernet?

Then answer:

| Function | Device |
|---|---|
| Consumes service | Client |
| Provides service | Server |
| Same LAN connectivity | Switch |
| Different network connectivity | Router or L3 switch |
| Security filtering | Firewall/NGFW |
| Attack prevention | IPS/NGFW |
| Wireless LAN access | AP |
| Central AP/device management | Controller |
| Power over Ethernet cable | PoE switch |

## Jeremy Quiz Answers, Compressed

1. Connect 30 PCs in a department: switch.
2. Friend's iPhone sends you a video by AirDrop: friend's iPhone is the server.
3. Your phone/PC watching YouTube: client.
4. Connect separate networks together: router.
5. Old firewall upgrade with advanced functions: next-generation firewall.

## Rapid-Fire Practice

Cover the answers and answer out loud.

| Question | Answer |
|---|---|
| What connects many PCs in the same LAN? | Switch |
| What connects a LAN to another LAN? | Router |
| What connects a LAN to the Internet? | Router |
| What provides a web page? | Server |
| What requests a web page? | Client |
| What is a PC, laptop, phone, or server called generally? | Endpoint/end host |
| What controls traffic based on rules? | Firewall |
| What is a firewall with advanced inspection called? | Next-generation firewall |
| What detects and blocks attacks? | IPS |
| What gives Wi-Fi clients access to a wired LAN? | Access point |
| What centrally manages APs? | Wireless LAN controller/controller |
| What powers phones/APs/cameras through Ethernet? | PoE |
| What device usually has many ports for hosts? | Switch |
| What device usually has fewer interfaces and connects networks? | Router |
| What does the cloud symbol usually mean? | Internet/WAN/abstracted network |

## Memory Hacks

Use these under test pressure:

```text
Client = asks.
Server = answers/provides.
Switch = same LAN.
Router = remote network.
Firewall = rules.
NGFW = smarter rules/deeper inspection.
IPS = blocks attacks.
AP = Wi-Fi access.
Controller = central management.
PoE = power through Ethernet.
```

Another version:

```text
Same room/office/floor? Switch.
Different network/city/Internet? Router.
Allow or block? Firewall.
Wireless? AP.
Many APs to manage? Controller.
Needs power through network cable? PoE.
```

## What You Must Know Before Moving On

You are ready to move on when you can explain this without notes:

1. A network is connected nodes sharing resources.
2. Clients request services; servers provide services.
3. Endpoints are final devices like PCs, phones, printers, and servers.
4. A switch connects many endpoints in the same LAN.
5. A router connects different networks and sends traffic toward remote networks/Internet.
6. A firewall permits or denies traffic based on configured rules.
7. A next-generation firewall adds advanced filtering/inspection.
8. IPS prevents malicious traffic.
9. APs connect wireless clients to the LAN.
10. Controllers centrally manage network devices such as APs.
11. PoE powers devices through Ethernet.
12. The same physical device can perform multiple roles, but CCNA questions usually test the role/function.

## Checkpoint Recap

This video is not about configuring anything yet. It is about identifying the main devices in a network and knowing why each one exists.

The entire lesson boils down to role recognition:

```text
Endpoints use/provide services.
Switches connect endpoints in a LAN.
Routers connect networks.
Firewalls protect by policy.
APs add wireless access.
Controllers centralize management.
PoE sends power over Ethernet.
```

If you can look at a diagram and say "that is the client, that is the server, that switch keeps traffic inside the LAN, that router sends traffic to another network, and that firewall decides what gets through," you have the Day 1 objective handled well enough to keep moving.

## CCNA Exam Cram: Fast Recall And Traps

Use this section as the last 10-minute review before moving on. It keeps the language simple, but it stays at the CCNA level.

For this objective, Cisco is testing whether you can identify the role and function of common network components. You do not need deep configuration yet. You need fast recognition.

## Core Recall Block

Memorize this exactly:

```text
Client = requests a service.
Server = provides a service.
Endpoint = source or destination device.
Switch = connects hosts inside the same LAN.
Router = connects different networks.
Firewall = permits or denies traffic by policy.
NGFW = firewall with advanced inspection.
IPS = detects and blocks malicious traffic.
AP = connects wireless clients to the LAN.
Controller = centrally manages network devices, especially APs.
PoE = provides power over the Ethernet cable.
```

That block is the core of Network Fundamentals 1.1 for this lesson.

## Exam Trigger Words

The exam often hides the answer in the wording. Train yourself to map clue words to devices.

| Question wording | Best device/concept |
|---|---|
| Connect many PCs in the same department | Switch |
| Provide many Ethernet ports | Switch |
| Forward traffic inside one LAN | Layer 2 switch |
| Route between VLANs or networks | Router or Layer 3 switch |
| Connect separate networks | Router |
| Connect a LAN to the Internet | Router |
| Send traffic to a remote network | Default gateway/router |
| Allow, deny, inspect, or filter traffic | Firewall |
| Advanced firewall filtering | NGFW |
| Prevent attacks in traffic | IPS |
| Wireless clients joining the LAN | Access point |
| Manage many APs centrally | Wireless LAN controller |
| Power an AP, IP phone, or camera over Ethernet | PoE |
| Device requesting data | Client |
| Device providing data | Server |
| PC, phone, printer, camera, server | Endpoint/end host |

## Client, Server, Endpoint

Client and server are roles in a communication, not permanent hardware categories.

Use this test:

```text
Requester = client.
Provider = server.
```

Examples:

| Scenario | Client | Server |
|---|---|---|
| Watching YouTube | Your device | YouTube server |
| PC1 downloads image.jpg from PC2 | PC1 | PC2 |
| You receive an AirDrop file | Your iPhone | Friend's iPhone |
| A PC prints to a network printer | PC | Printer or print server |

Endpoint means the source or destination device in the network. A server can be an endpoint. A client can be an endpoint. The word endpoint tells you where the device sits in the communication path, not whether it is requesting or providing a service.

## Switch vs Router

This is the most important separation in this video.

```text
Switch = same LAN.
Router = different networks.
```

A switch is the best answer when the question is about connecting many local hosts. A router is the best answer when the question is about connecting one network to another network.

| Need | Correct choice |
|---|---|
| Connect 30 PCs in one office | Switch |
| Connect PCs to servers in the same LAN | Switch |
| Connect New York LAN to Tokyo LAN | Router |
| Connect a LAN to the Internet | Router |
| Reach a destination outside the local subnet | Default gateway/router |

Layer 2 switch vs Layer 3 switch:

| Device | CCNA-level job |
|---|---|
| Layer 2 switch | Forwards frames within a LAN/VLAN |
| Layer 3 switch | Can switch and route, often used for inter-VLAN routing |
| Router | Connects different networks/WAN/Internet |

Do not answer "Layer 3 switch" unless the question gives you wording that points to Layer 3 switching or inter-VLAN routing. For general "connect networks" questions, router is usually the clean answer.

## Router vs Firewall

Routers and firewalls can both sit at network boundaries, but they are tested differently.

```text
Router question = where should traffic go?
Firewall question = should traffic be allowed?
```

| If the question focuses on... | Think... |
|---|---|
| Path selection, remote networks, Internet/WAN | Router |
| Rules, permit/deny, filtering, protecting internal hosts | Firewall |
| Advanced filtering, application awareness, IPS features | NGFW |
| Blocking detected attacks | IPS |

A router's main job is connectivity between networks. A firewall's main job is security policy enforcement.

## Firewall, NGFW, IPS

For this objective, keep the security devices clean:

| Term | CCNA meaning |
|---|---|
| Firewall | Controls traffic based on configured rules |
| Network firewall | Filters traffic between networks |
| Host-based firewall | Software firewall on an endpoint |
| NGFW | Advanced firewall with deeper inspection/features |
| IPS | Intrusion prevention system; detects and blocks malicious traffic |

Memory hook:

```text
Firewall = policy enforcement.
NGFW = advanced policy enforcement and inspection.
IPS = attack prevention.
```

## AP, Controller, PoE

These are part of the current CCNA network components objective, even though Jeremy does not go deep on them in this video.

| Component | Role |
|---|---|
| Access point | Provides wireless clients access to the wired LAN |
| Wireless LAN controller | Centrally manages APs |
| Network controller | Centrally manages network devices/policy |
| PoE switch | Provides power to devices over Ethernet |

Fast separation:

```text
AP = wireless access.
Controller = centralized management.
PoE = power over Ethernet.
```

Common PoE-powered devices:

- Wireless access points
- IP phones
- Security cameras

## Topology Reading Pattern

When reading a diagram, identify the device role by position and traffic function.

Visual ID: `topology-reading-pattern` (defined in the Visual Generation JSON near the end).

Read the path like this:

```text
Client requests service.
Switch forwards inside the LAN.
Firewall checks policy.
Router forwards to the remote network.
Remote side delivers traffic to the server.
```

## Common CCNA Traps

| Trap | Correct answer logic |
|---|---|
| Server always means rack-mounted hardware | Wrong. Server means the device is providing a service. |
| Client means a specific device type | Wrong. Client means the device is requesting a service. |
| Switch connects different networks | Basic L2 switch connects hosts in the same LAN/VLAN. |
| Router connects 30 PCs directly | Usually wrong. A switch is used for many endpoint ports. |
| Firewall's main job is routing | Wrong. Firewall's main job is permit/deny/filter policy. |
| AP and controller are the same | Wrong. AP provides access; controller manages APs. |
| PoE means faster Ethernet | Wrong. PoE is electrical power over Ethernet cabling. |
| Endpoint means client only | Wrong. Servers are endpoints too. |

## Rapid Decision Script

Use this while practicing questions:

```text
Is it requesting something? Client.
Is it providing something? Server.
Is it an end device? Endpoint.
Is traffic staying local? Switch.
Is traffic going remote? Router/default gateway.
Is traffic being filtered? Firewall.
Is filtering advanced? NGFW.
Is an attack being stopped? IPS.
Is wireless access needed? AP.
Are many APs being managed? Controller.
Is power sent through Ethernet? PoE.
```

## Final Flashcards

| Front | Back |
|---|---|
| Client | Requests a service |
| Server | Provides a service |
| Endpoint | Source/destination device |
| Switch | Connects same-LAN hosts |
| Layer 2 switch | Forwards frames in a LAN/VLAN |
| Layer 3 switch | Can route between VLANs/networks |
| Router | Connects different networks |
| Default gateway | Router path to remote networks |
| Firewall | Allows/denies traffic by policy |
| NGFW | Advanced firewall inspection/filtering |
| IPS | Detects and blocks malicious traffic |
| AP | Connects wireless clients to LAN |
| Controller | Centralized management |
| PoE | Power over Ethernet |
| Cloud symbol | Internet/WAN/abstracted network |

## Final Recap

The goal of this lesson is role recognition. You should be able to look at a basic topology and identify what each component is responsible for.

The pass-the-question version:

```text
Clients request.
Servers provide.
Endpoints send and receive.
Switches connect hosts in the same LAN.
Routers connect different networks.
Firewalls enforce traffic policy.
NGFWs add advanced inspection.
IPS prevents attacks.
APs provide wireless access.
Controllers centralize management.
PoE powers devices over Ethernet.
```

If that list makes sense without looking anything up, you are ready to move on from this objective.

## Visual Generation JSON

Use this JSON when uploading the guide to a site or asking Claude to generate the actual visuals. Each visual should be clean, CCNA-focused, and easy to understand at a glance.

```json
{
  "visual_pack": {
    "title": "CCNA Day 1 Network Devices Visuals",
    "course_context": "Jeremy's IT Lab CCNA Day 1: Network Devices",
    "exam_context": "CCNA 200-301 Network Fundamentals 1.1: explain the role and function of network components",
    "style": {
      "tone": "clean certification study guide",
      "format": "simple diagram, not decorative art",
      "background": "white or very light neutral",
      "colors": {
        "endpoints": "light blue",
        "switches": "light green",
        "routers": "light orange",
        "firewalls": "light red",
        "wireless": "light purple",
        "clouds": "light gray"
      },
      "text_rules": [
        "Use short labels only",
        "Make arrows obvious",
        "Avoid clutter",
        "Keep every diagram readable on mobile",
        "Use CCNA terms exactly: client, server, endpoint, switch, router, firewall, NGFW, IPS, AP, controller, PoE"
      ]
    },
    "visuals": [
      {
        "id": "client-server-flow",
        "insert_after_heading": "Core Mental Model",
        "diagram_type": "left-to-right request/response flow",
        "purpose": "Show that clients request services and servers provide services.",
        "must_show": [
          "Client on the left",
          "Network in the middle",
          "Server on the right",
          "Request arrow from client to server",
          "Reply arrow from server back to client"
        ],
        "labels": [
          "Client: requests service",
          "Server: provides service",
          "Network carries traffic"
        ],
        "exam_takeaway": "Client asks; server provides."
      },
      {
        "id": "branch-network-topology",
        "insert_after_heading": "Topology From The Lesson",
        "diagram_type": "enterprise branch topology",
        "purpose": "Show how endpoints, switches, firewalls, routers, and the Internet/WAN connect two LANs.",
        "must_show": [
          "New York LAN with PC1 and PC2 connected to SW1",
          "SW1 connected to FW1",
          "FW1 connected to R1",
          "R1 connected to Internet/WAN cloud",
          "Internet/WAN cloud connected to R2",
          "R2 connected to FW2",
          "FW2 connected to SW2",
          "Tokyo LAN with SRV1 and SRV2 connected to SW2"
        ],
        "labels": [
          "Switch = same LAN",
          "Router = different networks",
          "Firewall = allow/deny policy",
          "Cloud = Internet/WAN details hidden"
        ],
        "exam_takeaway": "Switches connect local hosts; routers connect networks; firewalls control traffic."
      },
      {
        "id": "traffic-decision-flow",
        "insert_after_heading": "The \"Where Does Traffic Go?\" Flow",
        "diagram_type": "decision flowchart",
        "purpose": "Show how to decide whether traffic uses a switch, default gateway/router, or firewall policy.",
        "must_show": [
          "Start: host wants to send traffic",
          "Decision: destination in same LAN/VLAN?",
          "Yes path: send through switch",
          "No path: send to default gateway/router",
          "Decision: firewall policy allows traffic?",
          "Allowed path: router forwards toward remote network",
          "Denied path: firewall blocks/drops traffic"
        ],
        "labels": [
          "Same LAN = switch",
          "Remote network = router/default gateway",
          "Allowed or denied = firewall"
        ],
        "exam_takeaway": "Local traffic uses switching; remote traffic uses routing; security policy is enforced by firewalls."
      },
      {
        "id": "default-gateway-path",
        "insert_after_heading": "Default Gateway",
        "diagram_type": "simple path diagram",
        "purpose": "Show that a host sends remote-destination traffic to its default gateway.",
        "must_show": [
          "PC labeled 10.1.1.10",
          "Switch",
          "Router interface labeled default gateway 10.1.1.1",
          "Remote networks cloud",
          "Arrow from PC to switch to router to remote networks"
        ],
        "labels": [
          "Default gateway = router path to remote networks",
          "Same LAN traffic does not need default gateway",
          "Remote traffic goes to default gateway"
        ],
        "exam_takeaway": "Remote destination? Send to the default gateway."
      },
      {
        "id": "wireless-ap-topology",
        "insert_after_heading": "Access Point",
        "diagram_type": "wireless-to-wired topology",
        "purpose": "Show that an AP connects wireless clients to the wired LAN.",
        "must_show": [
          "Wireless client such as phone or laptop",
          "Wi-Fi signal to access point",
          "Access point connected to switch",
          "Switch connected to router",
          "Router connected to Internet cloud"
        ],
        "labels": [
          "AP = wireless access",
          "Switch = wired LAN",
          "Router = other networks/Internet"
        ],
        "exam_takeaway": "AP provides Wi-Fi access to the LAN; it is not the same role as a router."
      },
      {
        "id": "network-roles-overview",
        "insert_after_heading": "One Picture: Who Does What?",
        "diagram_type": "role overview diagram",
        "purpose": "Summarize all major Day 1 roles in one visual.",
        "must_show": [
          "Client endpoint labeled requests service",
          "Server endpoint labeled provides service",
          "Switch labeled same-LAN connectivity",
          "Firewall labeled permit/deny policy",
          "Router labeled connects networks",
          "Internet/WAN cloud labeled hidden network details",
          "Remote server endpoint"
        ],
        "labels": [
          "Endpoint = source/destination",
          "Switch = LAN",
          "Router = networks",
          "Firewall = policy"
        ],
        "exam_takeaway": "Identify devices by role, not by how fancy the hardware looks."
      },
      {
        "id": "topology-reading-pattern",
        "insert_after_heading": "Topology Reading Pattern",
        "diagram_type": "linear traffic path",
        "purpose": "Teach the standard way to read a CCNA topology from source endpoint to destination endpoint.",
        "must_show": [
          "Endpoint/client",
          "Switch",
          "Firewall",
          "Router",
          "WAN/Internet cloud",
          "Remote router or remote side",
          "Remote switch",
          "Endpoint/server"
        ],
        "labels": [
          "Client requests",
          "Switch forwards locally",
          "Firewall checks policy",
          "Router forwards remotely",
          "Server provides"
        ],
        "exam_takeaway": "Read topology diagrams by device function and traffic path."
      }
    ]
  }
}
```

## Sources

- Jeremy's IT Lab video transcript provided by the user.
- Cisco, CCNA Exam v1.1 (200-301) official exam topics: https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301-CCNA-v1.1.pdf
