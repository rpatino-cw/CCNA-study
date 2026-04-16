/* Domain 4 — IP Services — micro-topic checklists */
window.microTopicsD4 = {
  domain: { id: '4', name: 'IP Services', weight: 10 },
  topics: {
    '4.1': {
      name: 'Inside source NAT (static and pools)',
      items: {
        'NAT terminology': [
          'Inside local — private IP inside the network',
          'Inside global — translated public IP',
          'Outside local — public IP as seen inside',
          'Outside global — public IP on the outside',
        ],
        'NAT types': [
          'Static NAT — permanent one-to-one mapping',
          'Dynamic NAT — pool of public IPs, first-come first-served',
          'PAT (NAT overload) — many hosts share one public IP, differentiated by ports',
        ],
        'Static NAT config': [
          'ip nat inside source static <local-ip> <global-ip>',
          'ip nat inside on the LAN interface',
          'ip nat outside on the WAN interface',
        ],
        'Dynamic NAT config': [
          'ip nat pool <name> <start> <end> netmask <mask>',
          'access-list <#> permit <source>',
          'ip nat inside source list <#> pool <name>',
          'Mark interfaces inside/outside',
        ],
        'PAT config': [
          'Many-to-one — ip nat inside source list <#> interface <WAN> overload',
          'Many-to-pool — ip nat inside source list <#> pool <name> overload',
          'Port numbers differentiate flows',
        ],
        'Verification / troubleshooting': [
          'show ip nat translations',
          'show ip nat statistics',
          'debug ip nat',
          'clear ip nat translation *',
          'Common mistake — missing ip nat inside/outside on interfaces',
        ],
      },
    },
    '4.2': {
      name: 'NTP client and server',
      items: {
        'Why NTP': [
          'Accurate time for logs, certificates, authentication (Kerberos)',
          'Helps correlate events across devices',
        ],
        'Stratum concept': [
          'Stratum 0 — reference clock (atomic, GPS)',
          'Stratum 1 — directly attached to stratum 0',
          'Each additional hop adds 1',
          'Stratum 16 — unsynchronized',
        ],
        'Client / server / master': [
          'ntp server <ip> — this device is a client of that server',
          'ntp master <stratum> — this device is a local time source',
          'Use real upstream NTP whenever possible',
        ],
        'Authentication': [
          'ntp authenticate',
          'ntp authentication-key <#> md5 <key>',
          'ntp trusted-key <#>',
          'Prevents rogue NTP servers from feeding bad time',
        ],
        'Time zone / summer time': [
          'clock timezone <name> <offset>',
          'clock summer-time <name> recurring',
        ],
        'Verification': [
          'show ntp status — synchronized? stratum? reference?',
          'show ntp associations — peers and reachability',
          'show clock detail',
        ],
      },
    },
    '4.3': {
      name: 'Role of DHCP and DNS',
      items: {
        'DHCP DORA process': [
          'Discover — client broadcast',
          'Offer — server unicast (or broadcast) with a lease offer',
          'Request — client formally requests the offered lease',
          'Acknowledge — server confirms, client starts using the address',
          'Client uses UDP 68, server UDP 67',
        ],
        'DHCP options provided': [
          'IP address and mask',
          'Default gateway (option 3)',
          'DNS servers (option 6)',
          'Domain name (option 15)',
          'Lease time (option 51)',
          'TFTP/bootfile (option 150/66) for phones',
        ],
        'Lease timers': [
          'T1 (50% of lease) — client renews with original server (unicast)',
          'T2 (87.5%) — client rebinds via broadcast',
          'Expiration — address returns to pool',
        ],
        'DNS record types': [
          'A — hostname → IPv4',
          'AAAA — hostname → IPv6',
          'CNAME — alias to another hostname',
          'MX — mail server',
          'PTR — reverse (IP → hostname)',
          'NS — authoritative nameserver',
          'TXT — arbitrary text (SPF, DKIM, verifications)',
        ],
        'DNS resolution flow': [
          'Client → local resolver (recursive)',
          'Resolver walks root (.) → TLD (com.) → authoritative (example.com) — iterative',
          'Answer cached with TTL',
        ],
      },
    },
    '4.4': {
      name: 'SNMP',
      items: {
        'Architecture': [
          'Manager (NMS) polls agents',
          'Agent runs on the device',
          'MIB (Management Information Base) — hierarchical database of OIDs',
          'UDP 161 (agent), UDP 162 (traps/informs)',
        ],
        'PDUs / message types': [
          'Get — read one OID',
          'GetNext — walk a tree',
          'GetBulk — many values in one response',
          'Set — write a value',
          'Trap — unsolicited alert from agent (fire-and-forget)',
          'Inform — acknowledged trap (reliable)',
          'Response — reply from agent to manager',
        ],
        'SNMPv2c': [
          'Community strings — read-only (RO) and read-write (RW)',
          'No authentication, no encryption',
          'Plaintext over the wire',
        ],
        'SNMPv3 security levels': [
          'noAuthNoPriv — username only',
          'authNoPriv — MD5/SHA auth, no encryption',
          'authPriv — auth + DES/AES encryption (recommended)',
        ],
        'Best practices': [
          'Always prefer SNMPv3 in production',
          'Restrict SNMP with ACLs',
          'Use strong community strings on v2c if unavoidable',
        ],
      },
    },
    '4.5': {
      name: 'Syslog facilities and severity levels',
      items: {
        'Severity levels (0-7)': [
          '0 — Emergency: system unusable',
          '1 — Alert: immediate action required',
          '2 — Critical: critical conditions',
          '3 — Error: error conditions',
          '4 — Warning: warning conditions',
          '5 — Notification: normal but significant',
          '6 — Informational: informational messages',
          '7 — Debugging: debug messages',
          'Mnemonic — Every Awesome Cisco Engineer Will Need Ice cream Daily',
        ],
        'Message format': [
          '*timestamp: %FACILITY-SEVERITY-MNEMONIC: description',
          'Example — %LINEPROTO-5-UPDOWN',
        ],
        'Destinations': [
          'Console — logging console <level>',
          'Terminal monitor — terminal monitor (per VTY session)',
          'Buffer — logging buffered <size> <level>',
          'Remote syslog — logging host <ip>',
        ],
        'Useful config': [
          'service timestamps log datetime msec',
          'logging trap <level> — sets what level goes to syslog host',
          'logging source-interface <intf> — consistent source IP for logs',
        ],
      },
    },
    '4.6': {
      name: 'DHCP client and relay',
      items: {
        'Router as DHCP client': [
          'ip address dhcp on the interface',
          'Useful on WAN interfaces from an ISP',
        ],
        'DHCP relay (helper-address)': [
          'Needed because DHCP Discover is broadcast',
          'ip helper-address <server-ip> on the SVI/gateway',
          'Router rewrites broadcast to unicast toward the DHCP server',
          'Forwards other UDP protocols too (DNS, TFTP, NTP) — ip forward-protocol',
        ],
        'IOS DHCP server config': [
          'ip dhcp excluded-address <start> <end>',
          'ip dhcp pool <name>',
          'network <subnet> <mask>',
          'default-router <gw>',
          'dns-server <ip>',
          'lease <days hours minutes> (or infinite)',
          'domain-name <name>',
        ],
        'Verification': [
          'show ip dhcp binding — active leases',
          'show ip dhcp pool',
          'show ip dhcp server statistics',
          'show ip dhcp conflict',
        ],
      },
    },
    '4.7': {
      name: 'Per-hop behavior (QoS)',
      items: {
        'Classification': [
          'Identify traffic — ACL, NBAR, DSCP, interface, port',
          'Class-map — class-map match-any <name>',
        ],
        'Marking': [
          'Layer 2 — CoS (3 bits in 802.1Q tag, 0-7)',
          'Layer 3 — DSCP (6 bits in ToS byte, 0-63) or IP Precedence (3 bits)',
          'Common DSCP — EF (46) voice, AF41 video, AF31 call-signaling, CS6 routing, BE (0) best-effort',
          'policy-map <name> → class <x> → set dscp <value>',
        ],
        'Queuing': [
          'FIFO — default, one queue',
          'LLQ — low-latency queue (strict priority) for voice/video',
          'CBWFQ — bandwidth guarantees per class',
          'WFQ — fair queuing based on flows',
        ],
        'Congestion avoidance': [
          'WRED — drops packets probabilistically before queue fills',
          'Prevents tail drop and TCP global synchronization',
        ],
        'Policing vs shaping': [
          'Policing — drops or remarks excess traffic immediately (hard limit)',
          'Shaping — buffers excess and sends when bandwidth available (smooth)',
          'Policing typically ingress; shaping typically egress',
        ],
        'Trust boundaries': [
          'Ideally trust markings as close to source as possible',
          'On access switch — trust phone (mls qos trust device cisco-phone)',
          'Untrusted endpoints — re-mark at the edge',
        ],
      },
    },
    '4.8': {
      name: 'Remote access with SSH',
      items: {
        'Prerequisites': [
          'Set hostname (not "Router" or "Switch")',
          'Set ip domain-name <name>',
          'Generate RSA keys — crypto key generate rsa modulus 2048',
        ],
        'Enforce SSH only': [
          'ip ssh version 2',
          'line vty 0 15 → transport input ssh',
          'login local (uses local username database)',
        ],
        'Create a local user': [
          'username <name> privilege 15 secret <password>',
          'Avoid "password" (plaintext) — use secret (hashed)',
        ],
        'Access control': [
          'access-class <acl> in on VTY to restrict source IPs',
          'exec-timeout <min> <sec>',
          'login block-for <sec> attempts <n> within <sec>',
        ],
        'Verification': [
          'show ip ssh — version, timeout, attempts',
          'show ssh — active sessions',
          'show users',
        ],
      },
    },
    '4.9': {
      name: 'TFTP and FTP',
      items: {
        'TFTP': [
          'UDP 69',
          'No authentication, very simple',
          'Used for IOS images, configs on trusted networks',
          'copy tftp: flash:  /  copy running-config tftp:',
        ],
        'FTP': [
          'TCP 20 (data) + 21 (control)',
          'Authenticated (username/password)',
          'Active vs passive mode',
          'copy ftp: flash:',
        ],
        'SCP / SFTP': [
          'Encrypted alternatives running over SSH',
          'ip scp server enable on the device',
          'Preferred over TFTP/FTP in production',
        ],
        'Use-case summary': [
          'TFTP — quick, small, trusted LAN (image upgrade, config backup)',
          'FTP — larger transfers, needs auth',
          'SCP/SFTP — anything touching a public or untrusted network',
        ],
      },
    },
  },
};
