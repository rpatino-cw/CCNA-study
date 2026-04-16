/* Domain 5 — Security Fundamentals — micro-topic checklists */
window.microTopicsD5 = {
  domain: { id: '5', name: 'Security Fundamentals', weight: 15 },
  topics: {
    '5.1': {
      name: 'Key security concepts',
      items: {
        'Core terms': [
          'Threat — a potential danger (attacker, malware, natural disaster)',
          'Vulnerability — an exploitable weakness (unpatched, misconfig, default creds)',
          'Exploit — the code or technique that abuses a vulnerability',
          'Risk — likelihood × impact',
          'Mitigation — action that reduces risk',
          'Attack surface — total exposed entry points',
        ],
        'CIA triad': [
          'Confidentiality — only authorized parties can read',
          'Integrity — data is unchanged and trustworthy',
          'Availability — data/service is accessible when needed',
        ],
        'Common attack types': [
          'Phishing / spear phishing — email-based social engineering',
          'Social engineering — manipulate humans (pretexting, tailgating)',
          'DoS / DDoS — flood a target, deny service',
          'Man-in-the-middle — intercept/modify traffic',
          'ARP spoofing / poisoning — L2 MITM',
          'DHCP spoofing — rogue DHCP hands out malicious info',
          'MAC flooding — overflow CAM to force hub-like flooding',
          'VLAN hopping — double tagging or DTP abuse',
          'Password attacks — brute force, dictionary, credential stuffing',
        ],
        'Malware categories': [
          'Virus — attaches to a host file, needs a trigger',
          'Worm — self-propagates across the network',
          'Trojan — disguised as legitimate software',
          'Ransomware — encrypts data, demands payment',
          'Rootkit — hides at kernel level, very hard to detect',
          'Spyware / keyloggers — exfiltrate data silently',
        ],
        'Mitigations (general)': [
          'Patching — fix known vulnerabilities',
          'Segmentation — VLANs, ACLs, firewalls',
          'Encryption — in transit and at rest',
          'MFA / strong auth',
          'Least privilege',
          'User awareness training',
          'Monitoring and logging',
        ],
      },
    },
    '5.2': {
      name: 'Security program elements',
      items: {
        'User awareness and training': [
          'Awareness — recognize phishing and social engineering',
          'Training — policy compliance, secure practices',
          'Tabletop exercises and simulated phishing',
          'Ongoing, not one-time',
        ],
        'Physical access controls': [
          'Badge readers / proximity cards',
          'Mantraps / vestibules',
          'Security guards, sign-in logs',
          'Locked server rooms and equipment cages',
          'Environmental monitoring (HVAC, fire)',
        ],
        'Surveillance': [
          'CCTV / IP cameras',
          'Motion sensors',
          'Access logs and review',
        ],
      },
    },
    '5.3': {
      name: 'Device access control with local passwords',
      items: {
        'Enable password vs secret': [
          'enable password — plaintext in config (never use)',
          'enable secret — MD5 (Type 5) or stronger, always use',
        ],
        'Line-level passwords': [
          'line console 0 → password <pw> → login',
          'line vty 0 15 → password <pw> → login',
          'line aux 0 → password <pw> → login',
          'login local — use the local username database',
        ],
        'Local user accounts': [
          'username <name> secret <pw> — hashed (Type 9 or 5 depending)',
          'username <name> privilege 15 secret <pw> — full enable on login',
        ],
        'Password encryption and hashing': [
          'service password-encryption — Type 7 (weak, reversible but not plaintext)',
          'enable secret — Type 5 (MD5)',
          'enable algorithm-type scrypt / sha256 — stronger hash types on newer IOS',
        ],
        'Login protection': [
          'login block-for <sec> attempts <n> within <sec>',
          'login delay <sec>',
          'exec-timeout <min> <sec>',
          'security passwords min-length <n>',
        ],
        'Banners': [
          'banner motd # ... # — shown before login (legal warning)',
          'banner login # ... # — shown just before username prompt',
          'banner exec # ... # — shown after successful login',
          'Avoid "Welcome" — use legal/authorized-use-only language',
        ],
      },
    },
    '5.4': {
      name: 'Password policy and alternatives',
      items: {
        'Password complexity': [
          'Minimum length (12+ recommended)',
          'Mix of upper, lower, digits, symbols',
          'Block common/breached passwords',
        ],
        'Password management': [
          'Rotation policy (now often de-emphasized if MFA used)',
          'No reuse / password history',
          'Credential vaults / password managers',
        ],
        'MFA factors': [
          'Something you know — password, PIN',
          'Something you have — token, phone, smart card',
          'Something you are — fingerprint, face, iris',
          'True MFA requires factors from DIFFERENT categories',
        ],
        'Certificates': [
          'PKI — Public Key Infrastructure',
          'X.509 certificate format',
          'CA — Certificate Authority (issues and signs)',
          'Public/private key pairs',
          'Used for 802.1X EAP-TLS, HTTPS, VPN',
        ],
        'Biometrics': [
          'Fingerprint, facial, iris, voice',
          'Non-revocable — if compromised, you can\'t reset your face',
          'Best combined with other factors',
        ],
      },
    },
    '5.5': {
      name: 'IPsec remote access and site-to-site VPNs',
      items: {
        'VPN categories': [
          'Site-to-site — router/firewall to router/firewall, always on',
          'Remote access — user device to network, on demand (AnyConnect, etc.)',
        ],
        'IPsec services': [
          'Confidentiality — encryption (AES, 3DES)',
          'Integrity — hashing (SHA, MD5)',
          'Authentication — PSK or certificate',
          'Anti-replay — sequence numbers',
        ],
        'AH vs ESP': [
          'AH (IP protocol 51) — integrity + auth only, no encryption',
          'ESP (IP protocol 50) — encryption + integrity + auth',
          'ESP is the common choice',
        ],
        'IKE phases': [
          'IKE Phase 1 — establish secure management channel (ISAKMP SA)',
          'Phase 1 modes — Main (6 messages, protects identity) vs Aggressive (3)',
          'IKE Phase 2 — negotiate IPsec SAs for data (Quick Mode)',
          'IKEv2 — simpler, built-in NAT-T, MOBIKE, replaces IKEv1 in new deployments',
        ],
        'Tunnel vs transport mode': [
          'Tunnel — encrypts entire original packet + new IP header (site-to-site default)',
          'Transport — encrypts payload only, keeps original IP header (host-to-host)',
        ],
        'GRE over IPsec / DMVPN / SD-WAN (awareness)': [
          'GRE over IPsec — GRE gives multicast/routing support, IPsec gives encryption',
          'DMVPN — hub-spoke with dynamic tunnels (NHRP + mGRE + IPsec)',
          'SD-WAN — overlay WAN with policy and centralized management',
        ],
      },
    },
    '5.6': {
      name: 'Access Control Lists',
      items: {
        'ACL types': [
          'Standard — filters source IP only; numbered 1-99, 1300-1999',
          'Extended — filters source, dest, protocol, ports; 100-199, 2000-2699',
          'Named — ip access-list standard/extended <name>',
        ],
        'Wildcard masks': [
          'Inverse of subnet mask: 0 = must match, 1 = ignore',
          '0.0.0.0 — exact host match',
          '0.0.0.255 — match any host in a /24',
          '0.0.0.3 — match a /30',
          '0.0.255.255 — match a /16',
          'host <ip> shortcut = 0.0.0.0 wildcard',
          'any shortcut = 0.0.0.0 255.255.255.255',
        ],
        'Processing order': [
          'Top-down, first match wins',
          'Processing stops at first match',
          'Implicit deny any at end of every ACL',
          'Must always have at least one permit',
        ],
        'Placement rules': [
          'Standard — near destination (only knows source, don\'t block too early)',
          'Extended — near source (has dest/port granularity, block early to save bandwidth)',
        ],
        'Applying ACLs': [
          'ip access-group <name/#> in|out — on an interface',
          'access-class <name/#> in — on VTY lines',
          'Only one ACL per interface per direction per protocol',
        ],
        'Editing ACLs': [
          'Named ACLs support sequence numbers for easy edits',
          'no <seq> — remove one line',
          '<seq> permit|deny … — insert at that seq',
          'Apply resequence — ip access-list resequence <name> <start> <step>',
        ],
        'Verification': [
          'show access-lists',
          'show ip access-lists',
          'show ip interface <intf> — which ACL applied',
          'show running-config | include access-',
        ],
      },
    },
    '5.7': {
      name: 'Layer 2 security (DHCP snooping, DAI, port security)',
      items: {
        'DHCP snooping': [
          'Blocks rogue DHCP servers',
          'Trusted ports — toward the real DHCP server or uplinks',
          'Untrusted ports — access ports; drops DHCP server messages',
          'Builds binding table (MAC, IP, VLAN, port, lease)',
          'Config — ip dhcp snooping, ip dhcp snooping vlan <list>, ip dhcp snooping trust (on uplinks)',
          'Rate limiting — ip dhcp snooping limit rate <pps> on untrusted ports',
        ],
        'Dynamic ARP Inspection (DAI)': [
          'Validates ARP packets against DHCP snooping binding table',
          'Depends on DHCP snooping being configured',
          'Drops ARP with mismatched IP-to-MAC',
          'Config — ip arp inspection vlan <list>, ip arp inspection trust on uplinks',
        ],
        'Port security': [
          'Limits MACs per port — default 1',
          'switchport mode access required first',
          'switchport port-security',
          'switchport port-security maximum <n>',
          'switchport port-security mac-address <mac> — static',
          'switchport port-security mac-address sticky — auto-learn and save',
          'Aging — switchport port-security aging time <min>, type absolute|inactivity',
        ],
        'Violation modes': [
          'protect — silently drops offending frames',
          'restrict — drops + increments counter + syslog/SNMP',
          'shutdown — err-disables port (default)',
          'Recover — shut / no shut or errdisable recovery cause psecure-violation',
        ],
        'Verification': [
          'show port-security, show port-security interface <intf>',
          'show ip dhcp snooping, show ip dhcp snooping binding',
          'show ip arp inspection',
        ],
      },
    },
    '5.8': {
      name: 'AAA — authentication, authorization, accounting',
      items: {
        'Definitions': [
          'Authentication — who are you (identity proof)',
          'Authorization — what can you do (permissions, commands)',
          'Accounting — what did you do (logs, audit trail)',
        ],
        'TACACS+': [
          'TCP 49',
          'Cisco proprietary',
          'Encrypts the ENTIRE packet',
          'Separates auth, authz, accounting',
          'Good for device admin (per-command authz)',
        ],
        'RADIUS': [
          'UDP 1812 (auth), 1813 (accounting)',
          'Open standard, multi-vendor',
          'Encrypts PASSWORD only',
          'Combines auth and authz in the same packet',
          'Good for network access — 802.1X, VPN, Wi-Fi',
        ],
        'Configuration concepts': [
          'aaa new-model — enables AAA',
          'aaa authentication login default group <tacacs+|radius> local',
          'aaa authorization exec default group tacacs+ local',
          'aaa accounting exec default start-stop group tacacs+',
          'Always keep a local fallback in case server is unreachable',
        ],
      },
    },
    '5.9': {
      name: 'Wireless security (WPA, WPA2, WPA3)',
      items: {
        'Evolution': [
          'WEP — RC4, 24-bit IV, broken, never use',
          'WPA — TKIP, transitional, deprecated',
          'WPA2 — AES/CCMP, still widely required',
          'WPA3 — SAE, forward secrecy, 192-bit enterprise, OWE for open nets',
        ],
        'Modes': [
          'Personal (PSK) — single shared key',
          'Enterprise (802.1X) — per-user creds via RADIUS / EAP',
        ],
        'EAP methods (enterprise)': [
          'EAP-TLS — client + server certs, strongest',
          'PEAP — server cert, client creds inside tunnel',
          'EAP-FAST — PAC-based (Cisco)',
          'EAP-TTLS — similar to PEAP, open standard',
        ],
        'Key attacks and protections': [
          'WPA2 KRACK — patched via firmware',
          'PMF (Protected Management Frames) — protects deauth/disassoc',
          'Disable WPS — brute-force weakness',
        ],
      },
    },
    '5.10': {
      name: 'WLAN GUI config with WPA2 PSK',
      items: {
        'WLC login': [
          'HTTPS to the WLC management IP',
          'Use admin credentials',
        ],
        'Create WLAN': [
          'WLANs → Create New → Profile name, SSID, WLAN ID',
          'Enable status',
          'General tab — map to dynamic interface (VLAN)',
        ],
        'Security settings': [
          'Layer 2 Security — WPA+WPA2',
          'Cipher — AES',
          'Auth Key Mgmt — PSK',
          'Enter the pre-shared key',
        ],
        'Validate': [
          'Save and enable',
          'Associate a test client',
          'Verify on Monitor → Clients that it joined the correct VLAN',
        ],
      },
    },
  },
};
