/* Domain 2 — Network Access — micro-topic checklists */
window.microTopicsD2 = {
  domain: { id: '2', name: 'Network Access', weight: 20 },
  topics: {
    '2.1': {
      name: 'VLANs (normal range) spanning multiple switches',
      items: {
        'VLAN fundamentals': [
          'VLAN — logical L2 broadcast domain',
          'Normal range — 1-1005 (1002-1005 reserved for legacy Token Ring/FDDI)',
          'Extended range — 1006-4094 (advanced, outside CCNA scope)',
          'Default VLAN — VLAN 1, cannot be deleted, all ports start here',
          'Native VLAN — untagged VLAN on a trunk (default 1)',
          'Management VLAN — used for switch management traffic (change from VLAN 1)',
          'VLAN scope — one IP subnet per VLAN is the convention',
        ],
        'Access ports': [
          'Carries one VLAN, untagged',
          'Config — switchport mode access + switchport access vlan <id>',
          'Voice VLAN — switchport voice vlan <id> (lets phone tag voice, PC untagged)',
          'PortFast usually applied to access ports only',
          'Verify — show interfaces switchport, show vlan brief',
        ],
        'Creating and naming VLANs': [
          'Global — vlan <id> → name <name>',
          'VLAN database file — stored in vlan.dat on flash',
          'Deleting — no vlan <id> (ports assigned stay in that VLAN — orphaned)',
          'Verify — show vlan brief, show vlan id <id>',
        ],
        'Inter-VLAN routing options': [
          'Router-on-a-stick (ROAS) — router sub-interfaces, 802.1Q on trunk',
          'L3 switch with SVIs — interface vlan <id> + ip address',
          'Routed port — no switchport + ip address (L3 point-to-point)',
          'ip routing global command required for L3 switch',
        ],
      },
    },
    '2.2': {
      name: 'Interswitch connectivity (trunks, 802.1Q, native VLAN)',
      items: {
        'Trunk fundamentals': [
          'Trunk — one link carrying many VLANs',
          '802.1Q — IEEE standard tagging (open, required for CCNA)',
          'ISL — Cisco legacy, deprecated',
          '4-byte tag inserted inside the Ethernet frame — TPID 0x8100 + priority + VLAN ID',
        ],
        'Native VLAN': [
          'Untagged VLAN on a trunk (default VLAN 1)',
          'Must match on both ends of the trunk',
          'Mismatch logs CDP error and can leak traffic between VLANs',
          'Change with switchport trunk native vlan <id>',
        ],
        'Trunk configuration': [
          'switchport mode trunk — forces trunk',
          'switchport mode dynamic desirable — actively negotiates (DTP)',
          'switchport mode dynamic auto — only trunks if asked',
          'switchport nonegotiate — disables DTP (recommended on static trunks)',
          'switchport trunk encapsulation dot1q — on dual-capable switches',
          'switchport trunk allowed vlan <list> — prune VLANs on a trunk',
        ],
        'Verification commands': [
          'show interfaces trunk — trunk ports + allowed/active VLANs',
          'show interfaces <intf> switchport — mode, native, allowed',
          'show vlan brief — which VLANs exist and their access ports',
        ],
      },
    },
    '2.3': {
      name: 'Layer 2 discovery protocols (CDP and LLDP)',
      items: {
        'CDP (Cisco Discovery Protocol)': [
          'Cisco proprietary, Layer 2, on by default on Cisco',
          'Sent every 60 s (timer), hold time 180 s',
          'Uses a multicast MAC, not IP — works even without an IP',
          'Enable/disable — cdp run (global), cdp enable (per interface)',
          'Verify — show cdp, show cdp neighbors, show cdp neighbors detail, show cdp entry *',
        ],
        'LLDP (IEEE 802.1AB)': [
          'Open standard, multi-vendor, off by default on Cisco',
          'Sent every 30 s by default, hold time 120 s',
          'Enable — lldp run (global), lldp transmit + lldp receive (per interface)',
          'Verify — show lldp, show lldp neighbors, show lldp neighbors detail',
          'LLDP-MED — extension for VoIP phones (policy, PoE info)',
        ],
        'CDP vs LLDP': [
          'CDP — Cisco only, on by default',
          'LLDP — standards-based, off by default',
          'Both reveal neighbor info — disable on untrusted ports',
        ],
      },
    },
    '2.4': {
      name: '(Layer 2/Layer 3) EtherChannel (LACP)',
      items: {
        'Purpose and benefits': [
          'Bundles links into one logical channel',
          'Higher total bandwidth',
          'Redundancy — channel stays up if one member fails',
          'STP sees the bundle as a single link — no blocking',
        ],
        'Negotiation protocols': [
          'LACP (802.3ad) — open standard; modes active, passive',
          'PAgP — Cisco proprietary; modes desirable, auto',
          'Static mode on — no negotiation, must be on/on',
          'LACP pairings that form a channel — active+active, active+passive',
          'PAgP pairings — desirable+desirable, desirable+auto',
          'Invalid — auto+auto, passive+passive',
        ],
        'Layer 2 vs Layer 3': [
          'Layer 2 — switchport, assign to VLANs or trunk',
          'Layer 3 — no switchport, assign IP on port-channel interface',
          'channel-group <#> mode <mode> applied to member interfaces',
        ],
        'Requirements for bundling': [
          'Same speed and duplex on all members',
          'Same switchport mode (access/trunk)',
          'Same allowed VLANs if trunk',
          'Same native VLAN',
          'Same STP parameters',
        ],
        'Load balancing': [
          'Default — src-dst IP or MAC (platform-dependent)',
          'port-channel load-balance <method> — set hashing method',
          'One flow uses one member (cannot exceed single-link speed)',
        ],
        'Verification': [
          'show etherchannel summary — Po state, members, flags',
          'show etherchannel port-channel',
          'show interfaces port-channel <#>',
          'show lacp neighbor / show pagp neighbor',
        ],
      },
    },
    '2.5': {
      name: 'Rapid PVST+ Spanning Tree',
      items: {
        'STP purpose': [
          'Prevent L2 loops on redundant switch links',
          'Loops cause broadcast storms, MAC table thrash, duplicate frames',
          'Rapid PVST+ — Cisco, per-VLAN RSTP instance',
        ],
        'Bridge ID and elections': [
          'Bridge ID = priority + VLAN ID (extended) + MAC',
          'Default priority 32768, configurable in increments of 4096',
          'Root bridge — lowest Bridge ID per VLAN',
          'spanning-tree vlan <id> root primary / root secondary (macros)',
          'spanning-tree vlan <id> priority <n>',
        ],
        'Port roles': [
          'Root port — best path toward root on every non-root switch',
          'Designated port — best path on each segment',
          'Alternate port — backup root path (blocks)',
          'Backup port — backup to a designated port on same switch',
          'Disabled port — administratively down',
        ],
        'Port states (Rapid PVST+ = 3)': [
          'Discarding — drops frames, no learning (replaces blocking/listening)',
          'Learning — learns MACs, does not forward',
          'Forwarding — normal traffic',
        ],
        'STP cost values (IEEE revised)': [
          '10 Mbps = 100',
          '100 Mbps = 19',
          '1 Gbps = 4',
          '10 Gbps = 2',
          '100 Gbps = 1',
        ],
        'PortFast and BPDU guard': [
          'PortFast — access port skips listening/learning, goes straight to forwarding',
          'Only on access ports to end hosts — never on trunks/switches',
          'BPDU guard — err-disables port if a BPDU arrives (protects access ports)',
          'Root guard — blocks a port that would become root (superior BPDU)',
          'Loop guard — puts port in loop-inconsistent if BPDUs stop arriving',
          'BPDU filter — stops sending/receiving BPDUs (use with extreme caution)',
        ],
        'Verification': [
          'show spanning-tree',
          'show spanning-tree vlan <id>',
          'show spanning-tree summary',
          'show spanning-tree interface <intf> detail',
        ],
      },
    },
    '2.6': {
      name: 'Cisco Wireless Architectures and AP modes',
      items: {
        'Architecture types': [
          'Autonomous — each AP is standalone with its own config',
          'Lightweight (split-MAC) — WLC + APs via CAPWAP',
          'Cloud-managed — Meraki, no on-prem controller',
          'Embedded WLC — on a Catalyst switch stack for small deployments',
        ],
        'CAPWAP basics': [
          'Control channel — UDP 5246 (encrypted with DTLS)',
          'Data channel — UDP 5247',
          'Tunnels all client traffic to the WLC by default',
        ],
        'Split-MAC functions': [
          'AP handles real-time: 802.11 transmit/receive, encryption/decryption, beacons, probe responses',
          'WLC handles: authentication, association, roaming, QoS, RRM, policy',
        ],
        'AP operational modes': [
          'Local — default, CAPWAP traffic to WLC',
          'FlexConnect — switches traffic locally when WLC is unreachable',
          'Monitor — passively scans for rogues and attacks',
          'Sniffer — forwards all captured frames to a remote analyzer',
          'Rogue detector — wired-side scan for rogue MACs',
          'Bridge / Mesh — wireless backhaul',
          'SE-Connect — RF spectrum analysis',
        ],
      },
    },
    '2.7': {
      name: 'WLAN physical infrastructure (AP, WLC, ports, LAG)',
      items: {
        'AP wiring': [
          'AP on access port — one VLAN for management (simple)',
          'AP on trunk port — multiple VLANs if AP does local switching (FlexConnect)',
          'PoE powered — 802.3af (15.4W), 802.3at (30W), 802.3bt for high-power APs',
        ],
        'WLC wiring': [
          'WLC management port for CLI/GUI access',
          'WLC uplink to core/distribution as a trunk — carries mgmt + user VLANs',
          'Dynamic interfaces on WLC map WLAN SSIDs to VLANs',
        ],
        'LAG (Link Aggregation)': [
          'Bundle WLC uplinks for throughput + redundancy',
          'On Cisco WLC, LAG is usually static (no LACP negotiation)',
          'Switch side must match — static port-channel with same allowed VLANs',
        ],
      },
    },
    '2.8': {
      name: 'Network device management access',
      items: {
        'Console access': [
          'Out-of-band, direct serial (RJ-45 rollover or USB-mini)',
          'Works even with no network',
          'Protect — line console 0, password, login, exec-timeout',
        ],
        'Telnet vs SSH': [
          'Telnet — TCP 23, plaintext, insecure (never use in production)',
          'SSH — TCP 22, encrypted, requires RSA key + domain name',
          'SSHv2 — minimum 768-bit RSA key (2048+ recommended)',
          'transport input ssh on vty lines forces SSH only',
        ],
        'HTTP vs HTTPS': [
          'HTTP — TCP 80, plaintext GUI',
          'HTTPS — TCP 443, encrypted GUI',
          'ip http server / ip http secure-server / ip http authentication local',
        ],
        'AAA protocols': [
          'TACACS+ — TCP 49, Cisco, encrypts full packet, separate AAA',
          'RADIUS — UDP 1812/1813, open standard, encrypts password only',
          'Use TACACS+ for device admin, RADIUS for network access (802.1X, VPN)',
        ],
        'Cloud-managed access': [
          'Meraki Dashboard — all config via cloud portal',
          'DNA Center — intent-based for campus',
          'No direct CLI needed for day-to-day changes',
        ],
      },
    },
    '2.9': {
      name: 'WLAN GUI configuration (WPA2 PSK)',
      items: {
        'Login to WLC': [
          'HTTPS to management IP',
          'Admin credentials',
        ],
        'WLAN creation': [
          'WLANs → Create New → Profile Name, SSID, WLAN ID',
          'General — enable status, set interface (dynamic interface → VLAN)',
        ],
        'Security settings': [
          'Layer 2: WPA+WPA2 (or WPA2/WPA3 only)',
          'Cipher — AES (CCMP); enable WPA2 policy',
          'Auth key management — PSK (personal) or 802.1X (enterprise)',
          'Enter pre-shared key',
        ],
        'QoS profiles': [
          'Platinum — voice',
          'Gold — video',
          'Silver — best effort',
          'Bronze — background',
        ],
        'Advanced options': [
          'Client exclusion — locks out clients after repeated failures',
          'P2P blocking — prevents client-to-client in the same WLAN',
          'DHCP required — forces clients to get DHCP before data',
          'Session timeout, max clients, band select',
        ],
      },
    },
  },
};
