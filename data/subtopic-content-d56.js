/**
 * subtopic-content-d56.js — Expanded study content for CCNA 200-301
 * Domains 5 (Security Fundamentals) and 6 (Automation and Programmability).
 *
 * Each entry: info, visual (animation config), hack (memory/practice/effort/meta).
 * Loaded via <script> tag; attaches to window.subtopicContentD56.
 */
window.subtopicContentD56 = {

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 5 — SECURITY FUNDAMENTALS (15%)
  ══════════════════════════════════════════════════════════════ */

  // ── 5.1 Define key security concepts ──────────────────────────

  "5.1.a": {
    info: "A threat is any potential danger that could exploit a vulnerability and cause harm to a system or network. Threats include malicious actors (hackers, insiders), malware, natural disasters, and even accidental misconfigurations. The exam expects you to distinguish threats from vulnerabilities and exploits — a threat is the WHO or WHAT that can cause damage, not the weakness itself.",
    visual: { type: "shield", params: { items: ["Attackers", "Malware", "Natural Disasters", "Insider Threats"], color: "#ef4444" } },
    hack: {
      memory: "Threat = the TIGER outside the fence. It wants in, but it needs a hole (vulnerability) to get through.",
      practice: "Create flashcards matching each security term (threat, vulnerability, exploit, mitigation) to a real-world scenario. Quiz yourself until you can classify any example instantly.",
      effort: "low",
      meta: "Most students confuse threat vs vulnerability. The exam loves scenario questions — 'Which term best describes...' — so drill the definitions cold."
    }
  },

  "5.1.b": {
    info: "A vulnerability is a weakness or flaw in a system, software, configuration, or process that can be exploited by a threat. Examples include unpatched software, default credentials, open ports, and misconfigured ACLs. Vulnerabilities exist whether or not anyone exploits them — they are passive weaknesses waiting to be found.",
    visual: { type: "shield", params: { items: ["Unpatched Software", "Default Credentials", "Open Ports", "Misconfigurations"], color: "#f59e0b" } },
    hack: {
      memory: "Vulnerability = the HOLE in the fence. The tiger (threat) gets in through the hole.",
      practice: "List 5 common network vulnerabilities on your home lab or test environment. For each, write the mitigation. This trains you to think in pairs: weakness + fix.",
      effort: "low",
      meta: "Cisco pairs vulnerability with mitigation in exam questions. If you know the weakness, you should instantly know the fix."
    }
  },

  "5.1.c": {
    info: "An exploit is the specific technique, tool, or code used to take advantage of a vulnerability. Exploits are the bridge between a vulnerability existing and actual damage occurring. Examples: a buffer overflow exploit against unpatched software, a SQL injection against a web form, or a brute-force tool cracking a weak password.",
    visual: { type: "packet-flow", params: { nodes: ["Attacker", "Exploit Code", "Vulnerability", "Compromised System"], color: "#ef4444" } },
    hack: {
      memory: "Exploit = the LOCKPICK that fits the hole. Threat has the lockpick, vulnerability is the lock, exploit is the pick doing the work.",
      practice: "Map out the attack chain: Threat -> finds Vulnerability -> uses Exploit -> causes Impact. Draw this for 3 different attack scenarios.",
      effort: "low",
      meta: "The exam tests whether you understand the attack lifecycle. Exploit is always the action, never the weakness itself."
    }
  },

  "5.1.d": {
    info: "Mitigation is any action taken to reduce the likelihood or impact of a security threat. Mitigations include patching software, configuring firewalls, enforcing strong passwords, implementing ACLs, enabling port security, and training users. Mitigation does not eliminate risk entirely — it reduces it to an acceptable level.",
    visual: { type: "shield", params: { items: ["Patching", "Firewalls", "ACLs", "Encryption", "Training"], color: "#10b981" } },
    hack: {
      memory: "Mitigation = MENDING the fence. You patch the hole so the tiger can't get through.",
      practice: "For every vulnerability you identify in labs, immediately configure the mitigation. Build muscle memory: see weakness, apply fix.",
      effort: "low",
      meta: "Cisco loves 'which is the best mitigation for X?' questions. Know the correct control for each attack type."
    }
  },

  "5.1.e": {
    info: "Phishing uses deceptive emails or messages to trick users into revealing credentials or clicking malicious links. Social engineering is the broader category — manipulating human psychology to bypass security controls. Variants include spear phishing (targeted), whaling (executive-targeted), vishing (voice), and smishing (SMS). These attacks exploit people, not technology.",
    visual: { type: "packet-flow", params: { nodes: ["Attacker", "Fake Email", "Victim Clicks", "Credentials Stolen"], color: "#f59e0b" } },
    hack: {
      memory: "PHISHing = fishing for passwords. The bait looks real, but there's a HOOK inside.",
      practice: "Review 5 real phishing email examples online (sans.org has good ones). Identify the red flags in each: urgency, spoofed sender, suspicious links.",
      effort: "low",
      meta: "User awareness is THE mitigation for social engineering. The exam tests this directly — 'what is the best defense against phishing?' = training."
    }
  },

  "5.1.f": {
    info: "Denial of Service (DoS) overwhelms a target with traffic or requests, making it unavailable to legitimate users. A single source is DoS; Distributed DoS (DDoS) uses many compromised systems (botnet) to amplify the attack. Common types: SYN flood, UDP flood, amplification attacks. DDoS is much harder to mitigate because traffic comes from thousands of different IPs.",
    visual: { type: "packet-flow", params: { nodes: ["Botnet (1000s)", "Flood Traffic", "Target Server", "Legitimate Users Blocked"], color: "#ef4444" } },
    hack: {
      memory: "DoS = one person blocking a doorway. DDoS = a flash mob blocking every entrance. The 'D' means DISTRIBUTED — many attackers.",
      practice: "Lab it: use a packet generator to simulate a SYN flood on a test server, then configure SYN cookies and rate limiting to mitigate. Observe the difference.",
      effort: "medium",
      meta: "Know the difference between DoS and DDoS for the exam. DDoS = botnet = distributed. Mitigation = rate limiting, blackholing, scrubbing centers."
    }
  },

  "5.1.g": {
    info: "Man-in-the-middle (MITM) attacks intercept communication between two parties without their knowledge. ARP spoofing sends fake ARP replies to associate the attacker's MAC with the gateway IP, redirecting traffic through the attacker. DHCP spoofing sets up a rogue DHCP server that assigns the attacker as the default gateway. Both are Layer 2 attacks mitigated by DAI and DHCP snooping.",
    visual: { type: "handshake", params: { leftLabel: "Client", rightLabel: "Server", steps: ["ARP Request (Who has GW?) ->", "<- Fake ARP Reply (Attacker's MAC)", "Traffic now flows through Attacker"] } },
    hack: {
      memory: "MITM = the postal worker who opens your mail, reads it, reseals it, and delivers it. You never know. ARP spoofing = lying about your address.",
      practice: "In a lab, enable DHCP snooping and DAI on a switch. Attempt the attack from another host and verify it gets blocked. Seeing it fail cements the config.",
      effort: "high",
      meta: "ARP spoofing + DHCP spoofing are the two MITM examples Cisco tests. The mitigations (DAI, DHCP snooping) appear in 5.7 — study them together."
    }
  },

  "5.1.h": {
    info: "Malware is malicious software designed to damage, disrupt, or gain unauthorized access. Virus: attaches to files, needs user action to spread. Worm: self-replicating, spreads without user interaction via network. Trojan: disguises as legitimate software but carries a hidden payload. Ransomware: encrypts files and demands payment for the decryption key.",
    visual: { type: "comparison", params: { left: { label: "Self-Spreading", items: ["Worm — network propagation", "No user action needed", "Consumes bandwidth"] }, right: { label: "User-Activated", items: ["Virus — attaches to files", "Trojan — disguised payload", "Ransomware — encrypts data"] } } },
    hack: {
      memory: "WORM = Wriggles On its own through the network. VIRUS = Very Infected — Requires User Start. TROJAN = Trojan Horse — looks like a gift, contains soldiers.",
      practice: "Create a comparison table: Malware Type | Spreads How | Needs User Action | Primary Damage. Fill it from memory, then verify.",
      effort: "low",
      meta: "The exam loves 'which malware type does X?' questions. The key differentiator is how it spreads: worm = automatic, virus = user action, trojan = deception."
    }
  },

  // ── 5.2 Describe security program elements ────────────────────

  "5.2.a": {
    info: "User awareness programs educate employees about security threats, policies, and best practices. This is the first line of defense against social engineering, phishing, and insider threats. Effective programs include regular training sessions, simulated phishing campaigns, and clear acceptable-use policies. The goal is to make every user a security sensor.",
    visual: { type: "hierarchy", params: { root: "Security Program", children: [{ name: "User Awareness", children: [{ name: "Phishing Simulations" }, { name: "Policy Training" }, { name: "Reporting Procedures" }] }] } },
    hack: {
      memory: "Users are the weakest link AND the first line of defense. Awareness turns liabilities into sensors.",
      practice: "Review your organization's (or a sample) acceptable use policy. Identify 3 things most employees would violate without realizing it.",
      effort: "low",
      meta: "Cisco always frames user awareness as THE answer for social engineering mitigation. If the question is about phishing defense, think training first, technology second."
    }
  },

  "5.2.b": {
    info: "Security training goes beyond basic awareness — it provides role-specific technical training for IT staff and security teams. This includes incident response procedures, secure coding practices, configuration hardening, and compliance requirements. Training should be ongoing, not a one-time event, and should include hands-on exercises and testing.",
    visual: { type: "hierarchy", params: { root: "Security Training", children: [{ name: "IT Staff", children: [{ name: "Incident Response" }, { name: "Hardening" }] }, { name: "All Employees", children: [{ name: "Policy Compliance" }, { name: "Phishing Tests" }] }] } },
    hack: {
      memory: "Awareness = knowing the stove is hot. Training = knowing HOW to put out the fire.",
      practice: "Look up a sample security training curriculum (SANS or NIST). Note the difference between awareness (everyone) and training (technical staff).",
      effort: "low",
      meta: "The exam distinguishes awareness (general users) from training (technical/role-specific). If the question specifies IT staff, the answer is training, not awareness."
    }
  },

  "5.2.c": {
    info: "Physical access controls prevent unauthorized people from entering secure areas. Badge readers use proximity cards or smart cards to authenticate entry. Mantraps (or security vestibules) are small rooms with two interlocking doors — only one opens at a time, preventing tailgating. Other controls include key locks, biometric scanners, and security guards.",
    visual: { type: "handshake", params: { leftLabel: "Person", rightLabel: "Secure Area", steps: ["Badge Scan ->", "<- Door 1 Opens", "Enter Vestibule, Door 1 Closes ->", "<- Door 2 Opens (Authenticated)"] } },
    hack: {
      memory: "MANTRAP = MAN gets TRAPPED between two doors. Like an airlock — you can't piggyback through.",
      practice: "Draw a floor plan of a secure data center entrance showing: badge reader, mantrap, camera placement, and guard station. Label each control.",
      effort: "low",
      meta: "Mantrap/security vestibule is a favorite exam question. It specifically prevents tailgating — someone following an authorized person through a door."
    }
  },

  "5.2.d": {
    info: "Surveillance systems monitor physical spaces to detect and record unauthorized activity. Security cameras (CCTV) provide visual monitoring and recording. Motion sensors detect movement in restricted areas and can trigger alarms. Together they provide deterrence (people behave when watched), detection (catch incidents in progress), and forensics (review footage after events).",
    visual: { type: "shield", params: { items: ["CCTV Cameras", "Motion Sensors", "Deterrence", "Detection", "Forensics"], color: "#6366f1" } },
    hack: {
      memory: "Cameras DETER and DETECT. Motion sensors ALERT. Together they're the eyes and ears of physical security.",
      practice: "For each physical security control, write whether it's preventive, detective, or deterrent. Most cameras serve all three roles.",
      effort: "low",
      meta: "The exam rarely goes deep on surveillance specifics. Know that cameras and motion sensors are detective/deterrent controls in physical security."
    }
  },

  "5.2.e": {
    info: "Environmental controls protect equipment from physical threats beyond human intrusion. Cable locks physically secure laptops and equipment to desks or racks. Equipment cages and locked cabinets restrict access to network gear in shared spaces. Other environmental controls include fire suppression, HVAC for temperature regulation, UPS for power protection, and proper cable management to prevent accidental disconnection.",
    visual: { type: "shield", params: { items: ["Cable Locks", "Equipment Cages", "Fire Suppression", "HVAC", "UPS"], color: "#8b5cf6" } },
    hack: {
      memory: "Environmental = protecting gear from the ENVIRONMENT and opportunistic theft. Cages for switches, locks for laptops.",
      practice: "Walk through your server room or wiring closet mentally. List every environmental control you'd want: locked rack, cable locks, HVAC, fire suppression, UPS.",
      effort: "low",
      meta: "Low exam weight but still testable. Cable locks and equipment cages are the most likely to appear. Know they're physical/environmental controls."
    }
  },

  // ── 5.3 Configure and verify device access control ────────────

  "5.3.a": {
    info: "The 'enable password' command sets a plaintext password for privileged EXEC mode. It is stored in the running-config as clear text, making it visible to anyone who can view the config. NEVER use 'enable password' in production — always use 'enable secret' instead. If both are configured, 'enable secret' takes precedence.",
    visual: { type: "comparison", params: { left: { label: "enable password", items: ["Stored in PLAINTEXT", "Visible in show run", "Type 0 — no hash", "NEVER use this"] }, right: { label: "enable secret", items: ["Stored as MD5 hash", "Hidden in show run", "Type 5 — hashed", "ALWAYS use this"] } } },
    hack: {
      memory: "enable PASSWORD = PLAIN to see (plaintext). enable SECRET = Securely encrypted. If you see 'password' in a config, that's the wrong one.",
      practice: "In a lab, configure both 'enable password cisco' and 'enable secret cisco123'. Run 'show running-config | include enable'. See the plaintext vs hash difference with your own eyes.",
      effort: "medium",
      meta: "The exam tests whether you know 'enable secret' always wins over 'enable password' when both exist. It also tests that you know Type 0 = plaintext."
    }
  },

  "5.3.b": {
    info: "The 'enable secret' command sets a hashed password for privileged EXEC mode using MD5 (Type 5) by default. The hash is stored in the config, not the plaintext password. Newer IOS versions support Type 8 (PBKDF2-SHA256) and Type 9 (scrypt) for stronger hashing. 'enable secret' always takes precedence over 'enable password' if both are configured.",
    visual: { type: "state-machine", params: { states: ["User EXEC (>)", "Privileged EXEC (#)"], active: 1, transitions: true } },
    hack: {
      memory: "SECRET = Type 5 = MD5 hash. The '5' in Type 5 helps you remember — 'Secret' has 6 letters, Type 5 is close enough. The point: it's HASHED, not plain.",
      practice: "Configure 'enable secret MyPass123' in a lab. Then 'show running-config | include enable' and observe the Type 5 hash. Try to log in with it to verify.",
      effort: "medium",
      meta: "Know the Type numbers: 0 = plaintext, 5 = MD5 (enable secret), 7 = Vigenere (service password-encryption), 8 = PBKDF2, 9 = scrypt."
    }
  },

  "5.3.c": {
    info: "The console port (line console 0) provides direct physical access to the device via a rollover cable. Securing it requires setting a password and enabling 'login' to enforce authentication. Best practice: use 'login local' with a local username/password database instead of a simple line password. You can also set an exec-timeout to automatically disconnect idle sessions.",
    visual: { type: "handshake", params: { leftLabel: "Admin (Console)", rightLabel: "Switch/Router", steps: ["Physical Cable Connected ->", "<- Password Prompt", "Correct Password ->", "<- Privileged Access"] } },
    hack: {
      memory: "Console = PHYSICAL access. Line console 0 = the ONE physical port. Always set a password — anyone with a cable can walk up to it.",
      practice: "Lab: 'line console 0 -> password cisco -> login -> exec-timeout 5 0'. Disconnect, reconnect, verify password prompt appears. Then change to 'login local' and test with a username.",
      effort: "medium",
      meta: "The exam tests the exact commands: 'line con 0', 'password X', 'login' (or 'login local'). Forgetting 'login' means the password is set but never enforced."
    }
  },

  "5.3.d": {
    info: "VTY lines (line vty 0 15) provide remote access via Telnet or SSH. There are typically 16 VTY lines (0-15), allowing up to 16 simultaneous remote sessions. Securing VTY lines requires setting a password plus 'login', or better, using 'login local' with local usernames. Best practice: restrict to SSH only with 'transport input ssh' and apply an ACL with 'access-class' to limit source IPs.",
    visual: { type: "handshake", params: { leftLabel: "Remote Admin", rightLabel: "Switch/Router", steps: ["SSH Connection ->", "<- Username Prompt", "Credentials Sent ->", "<- CLI Access Granted"] } },
    hack: {
      memory: "VTY = Virtual TeletYpe = remote access. 0 to 15 = 16 lines. No password on VTY = no remote access at all (connection refused).",
      practice: "Lab: Configure VTY with SSH only: 'line vty 0 15 -> login local -> transport input ssh -> access-class 10 in'. Test that Telnet is refused and SSH works.",
      effort: "medium",
      meta: "Critical exam topic. If VTY has no password and no 'login local', the device refuses ALL remote connections. The exam tests this 'gotcha' frequently."
    }
  },

  "5.3.e": {
    info: "The AUX port (line aux 0) provides out-of-band management access, traditionally via a modem connection for remote dial-in. It is configured similarly to the console port with password and login settings. In modern networks, AUX ports are rarely used since SSH over the management interface is preferred. Best practice: disable it with 'no exec' if not in use to prevent unauthorized access.",
    visual: { type: "comparison", params: { left: { label: "Console (con 0)", items: ["Direct physical cable", "Local access only", "Always used for setup"] }, right: { label: "AUX (aux 0)", items: ["Modem dial-in access", "Remote out-of-band", "Rarely used — disable it"] } } },
    hack: {
      memory: "AUX = AUXiliary = the backup phone line. Think of it as the old-school modem port. In 2024+, disable it if you're not using it.",
      practice: "In a lab, configure 'line aux 0 -> no exec' to disable it. Verify with 'show line'. Know how to secure it if the exam asks.",
      effort: "low",
      meta: "Low exam weight but testable. Know that AUX exists, how to secure it (same as console), and that best practice is to disable it."
    }
  },

  "5.3.f": {
    info: "Local user authentication creates username/password pairs stored on the device itself. Configure with 'username [name] privilege [0-15] secret [password]'. The 'login local' command on console/VTY lines tells the device to check credentials against this local database. Privilege levels range from 0 (minimal) to 15 (full privileged EXEC). This is more secure than line passwords because each admin has their own credentials for accountability.",
    visual: { type: "hierarchy", params: { root: "Local User Database", children: [{ name: "admin (priv 15)", children: [{ name: "Full access" }] }, { name: "helpdesk (priv 5)", children: [{ name: "Limited commands" }] }, { name: "readonly (priv 1)", children: [{ name: "Show commands only" }] }] } },
    hack: {
      memory: "LOCAL = credentials stored LOCALLY on the device. 'login local' = check the LOCAL database. Each person gets their OWN username for accountability.",
      practice: "Lab: 'username admin privilege 15 secret Cisco123' then 'line con 0 -> login local'. Test login. Then create a priv 1 user and see what commands are available.",
      effort: "medium",
      meta: "The exam expects you to know 'username X secret Y' (not 'password') and that 'login local' on the line activates it. Without 'login local', the usernames are ignored."
    }
  },

  "5.3.g": {
    info: "The 'service password-encryption' command applies a weak Type 7 Vigenere cipher to all plaintext passwords in the running config. This includes line passwords, username passwords set with 'password' (not 'secret'), and enable password. It does NOT encrypt 'enable secret' (already MD5). Type 7 is trivially reversible — it only prevents casual shoulder-surfing, not a determined attacker.",
    visual: { type: "comparison", params: { left: { label: "Without service pw-enc", items: ["password cisco (plaintext)", "Visible in show run", "Anyone can read it"] }, right: { label: "With service pw-enc", items: ["password 7 0822455D0A16", "Obfuscated in show run", "Still easily cracked"] } } },
    hack: {
      memory: "Type 7 = TRIVIALLY reversible. It's like writing your password backwards — better than nothing, but barely. Real security = Type 5 (secret).",
      practice: "Lab: Set a line password WITHOUT service password-encryption, check 'show run'. Then enable it and check again. Then Google 'Type 7 password decoder' to see how easily it cracks.",
      effort: "low",
      meta: "The exam tests: Type 7 = weak/reversible, applied by 'service password-encryption'. Type 5 = MD5, applied by 'secret' keyword. Always prefer 'secret'."
    }
  },

  "5.3.h": {
    info: "Banners display messages to users connecting to a device. MOTD (Message of the Day) appears before the login prompt to ALL connections — used for legal warnings. Login banner appears after MOTD but before authentication. EXEC banner appears after successful login. Best practice: MOTD should contain a legal disclaimer (authorized users only) but NEVER reveal the device hostname, model, or OS version.",
    visual: { type: "handshake", params: { leftLabel: "User", rightLabel: "Device", steps: ["Connect ->", "<- MOTD Banner (legal warning)", "<- Login Banner (pre-auth)", "Authenticate ->", "<- EXEC Banner (post-auth)"] } },
    hack: {
      memory: "MOTD = 'Message Of The Day' = the first thing EVERYONE sees. Login = pre-auth. EXEC = post-auth. Order: M-L-E (My Lawyer Explains).",
      practice: "Lab: Configure all three banners with 'banner motd #...#', 'banner login #...#', 'banner exec #...#'. Disconnect and reconnect to see the display order.",
      effort: "low",
      meta: "The exam tests banner order and that MOTD should never reveal device info. Legal notice in MOTD is the standard recommendation."
    }
  },

  "5.3.i": {
    info: "The 'security passwords min-length [0-16]' command enforces a minimum character length for all subsequently configured passwords on the device. It applies to enable passwords/secrets, line passwords, and local usernames. This is a global configuration command. It does NOT retroactively change existing passwords — only enforces the minimum on new ones.",
    visual: { type: "gauge", params: { level: 60, label: "Min Password Length (e.g., 10 chars)", color: "#3b82f6" } },
    hack: {
      memory: "MIN-LENGTH = the bouncer checking your ID at the door. Too short? Rejected. But existing guests (passwords) aren't kicked out.",
      practice: "Lab: 'security passwords min-length 10'. Then try to set a 5-character password and watch it get rejected. Then try a 10+ character one.",
      effort: "low",
      meta: "Quick exam point: know the exact command 'security passwords min-length X' and that it only affects NEW passwords, not existing ones."
    }
  },

  "5.3.j": {
    info: "The 'login block-for [seconds] attempts [count] within [seconds]' command provides brute-force protection by blocking login attempts after too many failures. For example, 'login block-for 120 attempts 3 within 60' blocks all logins for 120 seconds if 3 failed attempts occur within 60 seconds. You can whitelist trusted IPs with 'login quiet-mode access-class' to exclude them from lockout.",
    visual: { type: "state-machine", params: { states: ["Normal Login", "3 Failures in 60s", "BLOCKED (120s)", "Normal Login"], active: 2, transitions: true } },
    hack: {
      memory: "BLOCK-FOR = how long to lock the door. ATTEMPTS = how many wrong tries. WITHIN = the time window. Read it as a sentence: 'Block FOR 120s after 3 ATTEMPTS WITHIN 60s.'",
      practice: "Lab: Configure 'login block-for 60 attempts 3 within 30'. Intentionally fail 3 logins quickly and verify lockout. Then configure quiet-mode ACL for an admin IP.",
      effort: "medium",
      meta: "The exam tests the exact syntax and the order of parameters. Practice typing the full command from memory — block-for, attempts, within."
    }
  },

  // ── 5.4 Describe security password policy ─────────────────────

  "5.4.a": {
    info: "Password complexity requires passwords to include a mix of uppercase, lowercase, numbers, and special characters. Longer passwords are exponentially harder to crack — a 12-character complex password is orders of magnitude stronger than an 8-character one. Cisco IOS enforces minimum length via 'security passwords min-length' but does not natively enforce complexity rules — that requires AAA server policies.",
    visual: { type: "gauge", params: { level: 85, label: "Password Strength", color: "#10b981" } },
    hack: {
      memory: "Complexity = ULNS — Uppercase, Lowercase, Numbers, Symbols. A good password has all four. Length > complexity (a 16-char passphrase beats P@$$w0rd).",
      practice: "Write out the password policy you'd recommend for a network: min length, required character types, rotation period. Compare against NIST SP 800-63B guidelines.",
      effort: "low",
      meta: "The exam tests concepts, not specific complexity rules. Know that complexity + length together provide the strongest passwords."
    }
  },

  "5.4.b": {
    info: "Password management encompasses rotation policies (change every 60-90 days), expiration (passwords that expire force regular changes), and history (preventing reuse of the last N passwords). Modern guidance (NIST 800-63B) recommends AGAINST forced periodic rotation unless there's evidence of compromise, because it leads to weaker passwords (users just increment numbers). The exam may still test traditional rotation policies.",
    visual: { type: "state-machine", params: { states: ["New Password", "Active (90 days)", "Expired", "Must Change"], active: 1, transitions: true } },
    hack: {
      memory: "Rotation = CHANGE it regularly. History = CAN'T REUSE old ones. Expiration = it DIES after X days. But NIST now says: don't force rotation unless compromised.",
      practice: "Compare traditional password policy (rotate every 90 days) vs NIST 800-63B (no forced rotation). Know both for the exam but understand why the industry is shifting.",
      effort: "low",
      meta: "The exam may test traditional rotation policies even though NIST has updated guidance. Know both perspectives."
    }
  },

  "5.4.c": {
    info: "Multi-Factor Authentication (MFA) requires two or more different authentication factors: something you KNOW (password, PIN), something you HAVE (smart card, token, phone), and something you ARE (biometrics — fingerprint, face). Using two factors from the SAME category (e.g., password + PIN) is NOT true MFA — it's just two-step verification within one factor.",
    visual: { type: "shield", params: { items: ["Something You KNOW (password)", "Something You HAVE (token/phone)", "Something You ARE (biometric)"], color: "#3b82f6" } },
    hack: {
      memory: "MFA = Know-Have-Are. Think KHA. Password (Know) + Phone code (Have) = real MFA. Password + PIN = NOT MFA (both are Know).",
      practice: "Create 5 authentication scenarios and classify whether they're true MFA or not. E.g., 'password + fingerprint' = YES (Know + Are). 'Password + security question' = NO (both Know).",
      effort: "low",
      meta: "This is a guaranteed exam question. The trap: two passwords or a password + security question is NOT MFA because they're both 'something you know'."
    }
  },

  "5.4.d": {
    info: "True MFA requires factors from DIFFERENT categories — Know, Have, Are. A password (Know) plus a hardware token (Have) is true MFA. A password (Know) plus a security question (Know) is NOT — both are the same factor type. The strength of MFA comes from an attacker needing to compromise fundamentally different systems to gain access.",
    visual: { type: "comparison", params: { left: { label: "True MFA", items: ["Password + Phone OTP", "PIN + Smart Card", "Password + Fingerprint"] }, right: { label: "NOT MFA", items: ["Password + Security Q", "PIN + Password", "Two passwords"] } } },
    hack: {
      memory: "DIFFERENT categories is the key. If both factors could be stolen the same way (e.g., both written on a sticky note), it's not real MFA.",
      practice: "Quiz yourself: Is 'badge + fingerprint' MFA? Yes — Have + Are. Is 'password + passphrase' MFA? No — both Know. Run through 10 scenarios.",
      effort: "low",
      meta: "Cisco specifically tests the 'different categories' requirement. This is one of the most commonly missed questions by students who think any two credentials = MFA."
    }
  },

  "5.4.e": {
    info: "Digital certificates use Public Key Infrastructure (PKI) to verify identity. X.509 is the standard certificate format containing: subject name, public key, issuer (CA), validity period, and digital signature. A Certificate Authority (CA) is a trusted third party that signs certificates, creating a chain of trust. Certificates enable secure communication (HTTPS), VPN authentication, and code signing.",
    visual: { type: "hierarchy", params: { root: "Root CA", children: [{ name: "Intermediate CA", children: [{ name: "Server Certificate" }, { name: "Client Certificate" }] }] } },
    hack: {
      memory: "PKI = Public Key Infrastructure. CA = Certificate Authority = the notary public who stamps your ID as legitimate. X.509 = the standard format for the certificate.",
      practice: "Examine a real website's certificate chain in your browser (click the lock icon). Identify: subject, issuer, validity dates, and the chain of trust up to the root CA.",
      effort: "medium",
      meta: "The exam tests PKI concepts, not deep crypto math. Know what a CA does, what X.509 contains, and the chain of trust model."
    }
  },

  "5.4.f": {
    info: "Biometric authentication uses unique physical or behavioral characteristics to verify identity. Fingerprint scanners are the most common. Facial recognition, iris scanning, and voice recognition are also used. Biometrics are 'something you are' — the hardest factor to steal or replicate. However, they cannot be changed if compromised (you can't get new fingerprints), which is a key disadvantage.",
    visual: { type: "shield", params: { items: ["Fingerprint", "Facial Recognition", "Iris Scan", "Voice Pattern"], color: "#8b5cf6" } },
    hack: {
      memory: "Biometrics = Body metrics. Something you ARE. The catch: if your fingerprint is compromised, you can't change it like a password. That's why it's always combined with another factor.",
      practice: "List the pros and cons of each biometric type. Fingerprint: cheap, fast, but can be lifted. Iris: very accurate, but expensive. Voice: convenient, but noisy environments fail.",
      effort: "low",
      meta: "The exam tests biometrics as 'something you are' in the MFA framework. Know it's the strongest single factor but has the disadvantage of being non-changeable."
    }
  },

  // ── 5.5 Describe IPsec VPNs ──────────────────────────────────

  "5.5.a": {
    info: "Site-to-site VPNs create a permanent encrypted tunnel between two network devices (usually routers or firewalls). Traffic between the two sites flows through the tunnel automatically — no client software needed. The tunnel is always on and configured statically on both endpoints. Used to connect branch offices to headquarters over the public internet as if they were on the same private network.",
    visual: { type: "packet-flow", params: { nodes: ["Branch Router", "Encrypted Tunnel", "HQ Router"], color: "#3b82f6" } },
    hack: {
      memory: "Site-to-Site = a PERMANENT bridge between two buildings. Always on, always encrypted. Think of it as a secure highway between two offices.",
      practice: "Diagram a site-to-site VPN: Branch network -> Branch router -> Internet (encrypted tunnel) -> HQ router -> HQ network. Label the tunnel endpoints and protected subnets.",
      effort: "medium",
      meta: "The exam tests site-to-site vs remote-access. Key difference: site-to-site = always-on between routers. Remote access = on-demand from individual clients."
    }
  },

  "5.5.b": {
    info: "Remote access VPNs allow individual users to connect to the corporate network from any location using VPN client software. The connection is on-demand — the user initiates it when needed and disconnects when done. Common implementations include Cisco AnyConnect (SSL/TLS-based) and traditional IPsec-based clients. The VPN terminates at a concentrator or firewall at the corporate site.",
    visual: { type: "packet-flow", params: { nodes: ["Remote User", "VPN Client", "Internet", "VPN Concentrator", "Corporate Network"], color: "#8b5cf6" } },
    hack: {
      memory: "Remote Access = a TEMPORARY tunnel from your laptop. You DIAL IN when you need it. Like a phone call vs a leased line.",
      practice: "Compare side by side: Site-to-Site (permanent, router-to-router, no client) vs Remote Access (on-demand, client-to-router, needs software). Build a flashcard.",
      effort: "low",
      meta: "The exam gives scenarios — 'a traveling employee needs to access HQ resources' = remote access VPN. 'Two offices need constant connectivity' = site-to-site."
    }
  },

  "5.5.c": {
    info: "IPsec provides four core security services: Confidentiality (encryption — data can't be read), Integrity (hashing — data hasn't been tampered with), Authentication (proves sender identity), and Anti-replay (sequence numbers prevent replayed packets). These services are provided through combinations of AH and ESP protocols with various algorithms (AES, SHA, etc.).",
    visual: { type: "shield", params: { items: ["Confidentiality (Encryption)", "Integrity (Hashing)", "Authentication (Identity)", "Anti-Replay (Sequence #s)"], color: "#10b981" } },
    hack: {
      memory: "IPsec CIA-R: Confidentiality, Integrity, Authentication, anti-Replay. Like the CIA triad plus Replay protection. Or remember: 'CIA Rocks.'",
      practice: "For each IPsec service, write which protocol provides it: ESP = all four, AH = integrity + auth + anti-replay (no encryption). Create a matrix.",
      effort: "low",
      meta: "The exam loves asking 'which IPsec service ensures data hasn't been modified?' = Integrity. Map each service to its definition cold."
    }
  },

  "5.5.d": {
    info: "Authentication Header (AH) provides integrity, authentication, and anti-replay protection but does NOT provide encryption (no confidentiality). AH uses IP protocol number 51. It authenticates the entire packet including the IP header, which means it's incompatible with NAT (NAT changes the IP header, breaking the authentication hash). AH is rarely used in modern networks because ESP can do everything AH does plus encryption.",
    visual: { type: "encapsulation", params: { layers: [{ label: "IP Header", color: "#6366f1" }, { label: "AH Header (Proto 51)", color: "#f59e0b" }, { label: "Original Payload (NOT encrypted)", color: "#94a3b8" }] } },
    hack: {
      memory: "AH = Authentication Header = NO encryption. Protocol 51. Think: 'AH, I forgot to encrypt!' AH protects the header but leaves data readable.",
      practice: "Draw the AH packet format: [New IP | AH | Original IP + Data]. Note that data is authenticated but NOT encrypted. Compare to ESP.",
      effort: "low",
      meta: "The exam tests: AH = no encryption, protocol 51, breaks with NAT. ESP = encryption + everything AH does, protocol 50. Know the protocol numbers."
    }
  },

  "5.5.e": {
    info: "Encapsulating Security Payload (ESP) provides encryption, integrity, authentication, AND anti-replay — all four IPsec services. ESP uses IP protocol number 50. Unlike AH, ESP only authenticates the ESP header and payload (not the outer IP header), making it compatible with NAT. ESP is the standard choice for modern IPsec VPNs because it provides complete protection.",
    visual: { type: "encapsulation", params: { layers: [{ label: "IP Header", color: "#6366f1" }, { label: "ESP Header (Proto 50)", color: "#10b981" }, { label: "Encrypted Payload", color: "#3b82f6" }, { label: "ESP Trailer + Auth", color: "#10b981" }] } },
    hack: {
      memory: "ESP = Encryption + Security Payload = FULL protection. Protocol 50. ESP has EVERYTHING. AH = 51 = 'almost halfway there' (no encryption).",
      practice: "Build a comparison table: Feature | AH | ESP. Fill in: Encryption, Integrity, Auth, Anti-Replay, Protocol #, NAT Compatible. ESP wins every row except 'authenticates IP header.'",
      effort: "low",
      meta: "ESP vs AH is a classic exam question. ESP = 50 = encryption. AH = 51 = no encryption. That's the core distinction."
    }
  },

  "5.5.f": {
    info: "IKE Phase 1 establishes a secure, authenticated channel between two IPsec peers. During Phase 1, peers negotiate encryption algorithms, authenticate each other (pre-shared keys or certificates), and create the ISAKMP Security Association (SA). This SA is bidirectional and protects the Phase 2 negotiation. Phase 1 can operate in Main Mode (6 messages, more secure) or Aggressive Mode (3 messages, faster but less secure).",
    visual: { type: "handshake", params: { leftLabel: "Peer A", rightLabel: "Peer B", steps: ["Propose Algorithms ->", "<- Accept Algorithms", "Exchange Keys (DH) ->", "<- Exchange Keys (DH)", "Authenticate ->", "<- Authenticate", "ISAKMP SA Established"] } },
    hack: {
      memory: "Phase 1 = AUTHENTICATE and build the secure pipe. Think of it as introducing yourself and shaking hands before doing business (Phase 2).",
      practice: "Memorize the Phase 1 steps: 1) Negotiate algorithms, 2) DH key exchange, 3) Authenticate peers. Result: ISAKMP SA. Draw the sequence diagram.",
      effort: "medium",
      meta: "The exam tests the purpose of each phase. Phase 1 = authenticate peers and build the management tunnel. Phase 2 = negotiate the actual data tunnel."
    }
  },

  "5.5.g": {
    info: "IKE Phase 2 (Quick Mode) negotiates the IPsec Security Associations that protect the actual data traffic. Phase 2 runs inside the secure tunnel established by Phase 1. It creates two unidirectional SAs (one for each direction of traffic). Phase 2 negotiates which traffic to protect (interesting traffic), the encryption and integrity algorithms for the data tunnel, and the SA lifetime.",
    visual: { type: "handshake", params: { leftLabel: "Peer A", rightLabel: "Peer B", steps: ["Propose IPsec SAs ->", "<- Accept SAs", "Exchange nonces ->", "<- Exchange nonces", "IPsec Tunnel UP (2 unidirectional SAs)"] } },
    hack: {
      memory: "Phase 2 = QUICK Mode = quickly build the DATA tunnel. Phase 1 = management tunnel. Phase 2 = data tunnel. Two phases, two tunnels.",
      practice: "Draw both phases on one diagram: Phase 1 creates ISAKMP SA (management). Phase 2 uses that SA to negotiate IPsec SAs (data). Label which protects what.",
      effort: "medium",
      meta: "Key exam fact: Phase 1 = one bidirectional SA (ISAKMP). Phase 2 = two unidirectional SAs (one per direction). Phase 2 is called Quick Mode."
    }
  },

  "5.5.h": {
    info: "Tunnel mode encrypts the ENTIRE original IP packet (header + payload) and encapsulates it in a new IP packet with new headers. The original source and destination IPs are hidden inside the encrypted payload. This is the default mode for site-to-site VPNs because it protects internal addressing. The new outer IP header uses the tunnel endpoint addresses (router-to-router).",
    visual: { type: "encapsulation", params: { layers: [{ label: "New IP Header (Router IPs)", color: "#6366f1" }, { label: "ESP Header", color: "#10b981" }, { label: "Original IP Header (ENCRYPTED)", color: "#3b82f6" }, { label: "Original Payload (ENCRYPTED)", color: "#3b82f6" }] } },
    hack: {
      memory: "TUNNEL mode = the entire original packet goes INTO a new tunnel. Like putting a sealed letter inside a new envelope with different addresses on the outside.",
      practice: "Draw both modes side by side. Tunnel: [New IP | ESP | ENCRYPTED(Old IP + Data)]. Transport: [Original IP | ESP | ENCRYPTED(Data only)]. See what's hidden in each.",
      effort: "low",
      meta: "Tunnel mode = hides everything (default for site-to-site). Transport mode = hides payload only (used for host-to-host). The exam tests which mode hides the original IP header."
    }
  },

  "5.5.i": {
    info: "Transport mode encrypts only the PAYLOAD of the original packet, leaving the original IP header intact and visible. The source and destination IPs are not hidden. This mode is used for host-to-host communication (e.g., between a client and server on the same network) because both endpoints need to see each other's real IP addresses. Transport mode has less overhead than tunnel mode.",
    visual: { type: "encapsulation", params: { layers: [{ label: "Original IP Header (VISIBLE)", color: "#94a3b8" }, { label: "ESP Header", color: "#10b981" }, { label: "Payload (ENCRYPTED)", color: "#3b82f6" }] } },
    hack: {
      memory: "TRANSPORT mode = only the cargo (payload) is encrypted. The shipping label (IP header) stays readable. Used when both sides already know each other's address.",
      practice: "Scenario drill: 'Two routers connecting branch offices' = tunnel mode. 'Two servers communicating directly' = transport mode. Run 5 scenarios.",
      effort: "low",
      meta: "The exam tests: Tunnel = encrypts whole packet (site-to-site default). Transport = encrypts payload only (host-to-host). Most questions ask which mode hides the original IP."
    }
  },

  "5.5.j": {
    info: "GRE over IPsec combines Generic Routing Encapsulation (GRE) with IPsec to get the best of both worlds. GRE alone can encapsulate multicast, broadcast, and non-IP protocols but provides no encryption. IPsec alone provides encryption but cannot carry multicast or routing protocols (OSPF, EIGRP). GRE over IPsec wraps traffic in GRE first (enabling multicast/routing), then encrypts the GRE tunnel with IPsec.",
    visual: { type: "encapsulation", params: { layers: [{ label: "IPsec (Encryption)", color: "#10b981" }, { label: "GRE (Encapsulation)", color: "#f59e0b" }, { label: "Original Packet (Multicast/Routing)", color: "#3b82f6" }] } },
    hack: {
      memory: "GRE = the moving truck (carries anything). IPsec = the armored escort (encrypts everything). GRE over IPsec = armored moving truck. You get both transport AND protection.",
      practice: "List what GRE can do that IPsec alone cannot: multicast, broadcast, non-IP protocols, routing protocols. Then explain why combining them solves the limitation.",
      effort: "medium",
      meta: "The exam asks: 'How do you run OSPF over an IPsec VPN?' Answer: GRE over IPsec. Pure IPsec can't carry multicast — that's the key fact."
    }
  },

  // ── 5.6 Configure and verify ACLs ────────────────────────────

  "5.6.a": {
    info: "Standard ACLs filter traffic based on SOURCE IP address only. They use numbered ranges 1-99 (and expanded range 1300-1999). Because they can only match the source, they should be placed as close to the DESTINATION as possible to avoid accidentally blocking legitimate traffic to other destinations. Standard ACLs are simple but lack granularity.",
    visual: { type: "packet-flow", params: { nodes: ["Source IP", "Standard ACL (checks source only)", "Permit/Deny"], color: "#3b82f6" } },
    hack: {
      memory: "Standard = Source only. Numbers 1-99. Place near DESTINATION. Think: 'Standard is Simple — Source only, placed at the end of the path (Destination).'",
      practice: "Lab: Create 'access-list 10 permit 192.168.1.0 0.0.0.255' and apply it outbound on the interface nearest the destination. Verify with 'show access-lists'.",
      effort: "medium",
      meta: "The exam LOVES testing ACL placement. Standard = near destination. Extended = near source. This is one of the most tested concepts."
    }
  },

  "5.6.b": {
    info: "Extended ACLs can filter on source IP, destination IP, protocol (TCP/UDP/ICMP), and port numbers. They use numbered ranges 100-199 (and expanded range 2000-2699). This granularity allows precise traffic control. They should be placed as close to the SOURCE as possible to block unwanted traffic early and save bandwidth. Syntax: 'access-list [100-199] permit|deny [protocol] [source] [dest] eq [port]'.",
    visual: { type: "packet-flow", params: { nodes: ["Source IP + Port", "Extended ACL (checks src, dst, proto, port)", "Destination IP + Port"], color: "#8b5cf6" } },
    hack: {
      memory: "Extended = EVERYTHING — src, dst, protocol, port. Numbers 100-199. Place near SOURCE. Think: 'Extended has Extra fields, placed at the start (Source).'",
      practice: "Lab: 'access-list 100 permit tcp 10.0.0.0 0.0.0.255 host 192.168.1.100 eq 80'. Apply inbound on the source-side interface. Test with ping and HTTP.",
      effort: "high",
      meta: "Extended ACL syntax is heavily tested. Practice writing the full command from scratch: protocol, source+wildcard, destination+wildcard, eq port."
    }
  },

  "5.6.c": {
    info: "Named ACLs use descriptive names instead of numbers, making configurations more readable and manageable. They can be standard or extended. Configured with 'ip access-list standard|extended [name]' which enters ACL config mode. Named ACLs support sequence numbers for easier editing — you can insert, delete, or reorder individual entries without recreating the entire ACL.",
    visual: { type: "comparison", params: { left: { label: "Numbered ACL", items: ["access-list 100 permit...", "Hard to identify purpose", "Difficult to edit mid-list"] }, right: { label: "Named ACL", items: ["ip access-list ext WEB_TRAFFIC", "Self-documenting name", "Edit with sequence numbers"] } } },
    hack: {
      memory: "Named = NICE names. 'BLOCK_TELNET' is clearer than 'access-list 150'. Named ACLs also let you edit individual lines — numbered ACLs originally didn't.",
      practice: "Lab: Create a named extended ACL: 'ip access-list extended ALLOW_WEB -> 10 permit tcp any any eq 80 -> 20 permit tcp any any eq 443'. Then insert a line with 'no 20' and re-add it.",
      effort: "medium",
      meta: "The exam tests named ACL syntax and the ability to edit with sequence numbers. Modern IOS adds sequence numbers to numbered ACLs too, but named is the preferred approach."
    }
  },

  "5.6.d": {
    info: "Wildcard masks are the inverse of subnet masks and specify which bits to check (0) and which to ignore (1) when matching IP addresses in ACLs. To calculate: subtract each subnet mask octet from 255. A /24 subnet mask (255.255.255.0) becomes wildcard 0.0.0.255. A /28 (255.255.255.240) becomes 0.0.0.15. Wildcard 0s mean 'must match'; 1s mean 'don't care'.",
    visual: { type: "binary-breakdown", params: { bits: "00000000.00000000.00000000.11111111", label: "Wildcard 0.0.0.255 (/24)", highlight: [24, 25, 26, 27, 28, 29, 30, 31] } },
    hack: {
      memory: "Wildcard = 255 minus subnet mask. 0 = MUST match (check this bit). 1 = DON'T care (ignore this bit). It's the OPPOSITE of a subnet mask.",
      practice: "Convert these subnet masks to wildcards without a calculator: /24, /16, /28, /30, /27, /25. Time yourself until you can do all 6 in under 60 seconds.",
      effort: "medium",
      meta: "Wildcard math appears on nearly every exam. The fastest method: subtract each octet from 255. Practice until it's automatic. 255.255.255.0 -> 0.0.0.255."
    }
  },

  "5.6.e": {
    info: "Special wildcard masks simplify common ACL entries. Wildcard 0.0.0.0 means 'match this exact host' (every bit must match) — equivalent to the 'host' keyword. Wildcard 0.0.0.255 matches an entire /24 network (last octet is 'don't care'). Wildcard 255.255.255.255 means 'match any IP' — equivalent to the 'any' keyword. These shortcuts save typing and improve readability.",
    visual: { type: "comparison", params: { left: { label: "Long Form", items: ["10.0.0.1 0.0.0.0", "10.0.0.0 0.0.0.255", "0.0.0.0 255.255.255.255"] }, right: { label: "Shortcut", items: ["host 10.0.0.1", "10.0.0.0 0.0.0.255 (/24)", "any"] } } },
    hack: {
      memory: "0.0.0.0 = Host (all zeros = check EVERYTHING = one exact host). 255.255.255.255 = Any (all ones = check NOTHING = any address).",
      practice: "Rewrite these ACL entries using shortcuts: 'permit 10.1.1.1 0.0.0.0' -> 'permit host 10.1.1.1'. 'deny 0.0.0.0 255.255.255.255' -> 'deny any'. Practice both directions.",
      effort: "low",
      meta: "The exam uses both long-form and shortcut syntax interchangeably. Be comfortable reading either. 'host' = 0.0.0.0 wildcard. 'any' = 255.255.255.255 wildcard."
    }
  },

  "5.6.f": {
    info: "Every ACL has an invisible 'deny any' (implicit deny) at the end. If a packet doesn't match any explicit permit or deny statement, it is dropped. This means an ACL with only deny statements will block ALL traffic (the explicit denies plus the implicit deny). You must include at least one permit statement, or all traffic is blocked. The implicit deny does not appear in 'show access-lists'.",
    visual: { type: "layer-stack", params: { layers: ["permit 10.0.0.0/24", "permit 192.168.1.0/24", "deny 172.16.0.0/16", "(implicit deny any)"], highlight: 3 } },
    hack: {
      memory: "Every ACL ends with an invisible DENY ALL. If you forget to permit something, it's blocked. The wall at the end catches everything that wasn't explicitly allowed.",
      practice: "Lab: Create an ACL with only 'access-list 10 permit 10.0.0.0 0.0.0.255'. Apply it. Verify that 10.x.x.x works but ALL other traffic is blocked by the implicit deny.",
      effort: "medium",
      meta: "The implicit deny is one of the most tested ACL concepts. If a question shows an ACL without 'permit any' at the end, ask yourself: what gets blocked by the invisible last line?"
    }
  },

  "5.6.g": {
    info: "ACLs process rules top-down, and the FIRST matching rule determines the action (permit or deny). Once a match is found, processing stops — remaining rules are not evaluated. This means rule order is critical: more specific rules must come before general rules. If you put 'permit any' at the top, everything is allowed regardless of deny rules below it.",
    visual: { type: "layer-stack", params: { layers: ["Rule 1: deny host 10.0.0.5", "Rule 2: permit 10.0.0.0/24", "Rule 3: deny any (implicit)"], highlight: 0 } },
    hack: {
      memory: "First Match Wins. Like a bouncer with a checklist — checks from top to bottom, acts on the FIRST match, ignores the rest. ORDER MATTERS.",
      practice: "Write an ACL that blocks host 10.0.0.5 but allows the rest of 10.0.0.0/24. Then reverse the order and explain why it breaks. This cements the first-match concept.",
      effort: "medium",
      meta: "Exam questions present ACLs and ask 'what happens to packet X?' Trace through top-to-bottom, find the first match, and that's your answer. Don't read further."
    }
  },

  "5.6.h": {
    info: "Standard ACLs should be placed as close to the DESTINATION as possible. Because standard ACLs can only filter on source IP, placing them near the source would block that source from reaching ALL destinations, not just the intended one. By placing near the destination, you block traffic only where it's not wanted while allowing it to reach other destinations normally.",
    visual: { type: "packet-flow", params: { nodes: ["Source", "Router A", "Router B", "Standard ACL HERE (near Dest)", "Destination"], color: "#10b981" } },
    hack: {
      memory: "Standard = near Destination. 'SD' — Standard goes to Destination. If you block at the source, you block it from going EVERYWHERE.",
      practice: "Draw a network with Source, 3 routers, and 2 destinations. Place a standard ACL near the source and trace what breaks. Then move it near the destination and see the fix.",
      effort: "medium",
      meta: "ACL placement is one of the top 5 most tested CCNA topics. Standard = destination, Extended = source. Memorize this as an absolute rule."
    }
  },

  "5.6.i": {
    info: "Extended ACLs should be placed as close to the SOURCE as possible. Because extended ACLs can match on source, destination, protocol, and port, they can precisely identify and block only the specific unwanted traffic. Placing them near the source prevents that traffic from consuming bandwidth across the network. The granularity of extended ACLs makes near-source placement safe.",
    visual: { type: "packet-flow", params: { nodes: ["Source", "Extended ACL HERE (near Src)", "Router B", "Router C", "Destination"], color: "#f59e0b" } },
    hack: {
      memory: "Extended = near Source. 'ES' — Extended goes to Source. Extended is specific enough to block precisely, so kill it early and save bandwidth.",
      practice: "Given a scenario: 'Block HTTP from 10.0.0.0/24 to server 192.168.1.100.' Place the extended ACL on the router closest to 10.0.0.0/24, applied inbound.",
      effort: "medium",
      meta: "The exam will give you a network diagram and ask where to place the ACL. Standard = destination, Extended = source. This alone answers many questions."
    }
  },

  "5.6.j": {
    info: "ACLs are applied to interfaces using 'ip access-group [name|number] in|out'. 'In' filters packets entering the interface (before routing). 'Out' filters packets leaving the interface (after routing). Each interface can have one ACL per direction per protocol (one inbound, one outbound for IPv4). The direction is from the router's perspective — 'in' means traffic coming INTO the router through that interface.",
    visual: { type: "handshake", params: { leftLabel: "Inbound Traffic", rightLabel: "Router Interface", steps: ["Packet arrives ->", "<- ACL IN checks (before routing)", "Routing decision ->", "<- ACL OUT checks (after routing)", "Packet exits ->"] } },
    hack: {
      memory: "IN = packets coming INTO the router. OUT = packets going OUT of the router. Think from the ROUTER'S perspective, not the user's. One ACL per direction per interface.",
      practice: "Lab: Apply 'ip access-group 100 in' on Gi0/0. Then 'show ip interface Gi0/0' to verify. Test traffic in both directions to confirm only inbound is filtered.",
      effort: "medium",
      meta: "The exam tests direction understanding. Draw the router, label its interfaces, draw arrows for traffic flow. IN = arrow pointing at the router. OUT = arrow pointing away."
    }
  },

  "5.6.k": {
    info: "To restrict which IP addresses can access VTY lines (remote management via SSH/Telnet), use 'access-class [name|number] in' under the VTY line configuration. This is different from 'ip access-group' which is for interfaces. A standard ACL is typically used to permit only trusted management IPs. This is a critical security best practice — without it, anyone who can reach the device can attempt to log in.",
    visual: { type: "handshake", params: { leftLabel: "Admin (10.0.0.50)", rightLabel: "line vty 0 15", steps: ["SSH attempt ->", "<- access-class checks source IP", "Source in ACL? PERMIT ->", "<- Login prompt"] } },
    hack: {
      memory: "access-CLASS = for VTY lines (the 'class' of users who can connect). access-GROUP = for interfaces (groups of traffic). CLASS for CLI, GROUP for interfaces.",
      practice: "Lab: 'access-list 5 permit host 10.0.0.50 -> line vty 0 15 -> access-class 5 in'. Try SSH from 10.0.0.50 (works) and from another IP (rejected).",
      effort: "medium",
      meta: "The exam specifically tests 'access-class in' for VTY vs 'ip access-group in|out' for interfaces. Don't mix them up — it's a common trap."
    }
  },

  "5.6.l": {
    info: "Modern IOS automatically assigns sequence numbers to ACL entries (10, 20, 30...). You can insert new entries between existing ones by specifying a sequence number: 'ip access-list extended MY_ACL -> 15 permit tcp any host 10.0.0.1 eq 443'. You can delete specific entries with 'no [sequence-number]'. You can also resequence the entire ACL with 'ip access-list resequence [name] [start] [increment]'.",
    visual: { type: "layer-stack", params: { layers: ["10 deny host 10.0.0.5", "15 permit tcp any host 10.0.0.1 eq 443 (INSERTED)", "20 permit 10.0.0.0/24", "30 deny any (implicit)"], highlight: 1 } },
    hack: {
      memory: "Sequence numbers = line numbers in a text editor. Insert, delete, reorder — without rewriting the whole ACL. Edit surgically, not destructively.",
      practice: "Lab: Create a named ACL with 3 entries. Insert a new entry between line 10 and 20 using sequence 15. Delete line 20 with 'no 20'. Verify with 'show access-lists'.",
      effort: "medium",
      meta: "The exam tests that you can edit ACLs without removing and recreating them. Know the 'no [seq]' to delete and manual sequence number to insert."
    }
  },

  "5.6.m": {
    info: "Use 'show access-lists' to display all ACLs with their sequence numbers and match counts (how many packets matched each rule). 'show ip access-lists' shows only IPv4 ACLs. 'show running-config | include access' shows ACL configuration and where they're applied. 'show ip interface [intf]' shows which ACLs are applied to a specific interface and in which direction.",
    visual: { type: "comparison", params: { left: { label: "Show Commands", items: ["show access-lists", "show ip access-lists", "show ip interface Gi0/0"] }, right: { label: "What They Show", items: ["All ACLs + match counts", "IPv4 ACLs only", "ACLs applied to interface"] } } },
    hack: {
      memory: "show access-lists = see the rules + hit counts. show ip interface X = see WHERE ACLs are applied. Match counts tell you if your ACL is actually doing anything.",
      practice: "Lab: After applying an ACL, generate traffic and run 'show access-lists'. Check the match counters. If a rule shows 0 matches, it might be in the wrong order or the traffic isn't hitting it.",
      effort: "low",
      meta: "The exam shows 'show access-lists' output and asks you to interpret it. Practice reading the output format: sequence number, permit/deny, matches."
    }
  },

  // ── 5.7 Configure and verify Layer 2 security ────────────────

  "5.7.a": {
    info: "DHCP snooping is a Layer 2 security feature that acts as a firewall between untrusted hosts and trusted DHCP servers. It validates DHCP messages by categorizing switch ports as trusted (connected to legitimate DHCP servers) or untrusted (connected to end users). Untrusted ports can only send DHCP requests (Discover, Request), not server responses (Offer, ACK). This prevents rogue DHCP servers from distributing false network information.",
    visual: { type: "comparison", params: { left: { label: "Trusted Port", items: ["Connected to DHCP server", "Allows ALL DHCP messages", "Manually configured"] }, right: { label: "Untrusted Port (default)", items: ["Connected to end users", "Only allows DHCP client msgs", "Blocks rogue DHCP servers"] } } },
    hack: {
      memory: "DHCP Snooping = a SNOOPY guard checking DHCP packets. Untrusted ports can only ASK for addresses, never GIVE them. Trusted ports connect to real servers.",
      practice: "Lab: Enable DHCP snooping globally and on a VLAN. Set the server-facing port as trusted. Connect a rogue DHCP server to an untrusted port and verify it's blocked.",
      effort: "high",
      meta: "DHCP snooping is foundational — DAI depends on the snooping binding table. Learn snooping first, then DAI builds on top of it."
    }
  },

  "5.7.b": {
    info: "DHCP snooping configuration: 1) Enable globally with 'ip dhcp snooping'. 2) Enable per VLAN with 'ip dhcp snooping vlan [vlan-id]'. 3) Set trusted ports with 'ip dhcp snooping trust' on interfaces connected to legitimate DHCP servers. All other ports default to untrusted. Optionally add 'ip dhcp snooping verify mac-address' to check that the source MAC in the Ethernet frame matches the client MAC in the DHCP payload.",
    visual: { type: "hierarchy", params: { root: "ip dhcp snooping", children: [{ name: "ip dhcp snooping vlan 10,20", children: [{ name: "interface Gi0/1: trust" }, { name: "interface Gi0/2-24: untrusted (default)" }] }] } },
    hack: {
      memory: "Three steps: 1) GLOBAL enable, 2) VLAN enable, 3) TRUST the server port. Everything else is untrusted by default. Miss any step and it won't work.",
      practice: "Type the full config from memory: 'ip dhcp snooping -> ip dhcp snooping vlan 10 -> int gi0/1 -> ip dhcp snooping trust'. Practice until you can type it eyes-closed.",
      effort: "medium",
      meta: "The exam tests the exact commands and the fact that you need BOTH global AND per-VLAN enablement. Forgetting either one is a common mistake."
    }
  },

  "5.7.c": {
    info: "The DHCP snooping binding table maps MAC addresses to IP addresses learned from DHCP transactions on untrusted ports. Each entry contains: MAC address, IP address, lease time, VLAN, and interface. This table is used by DAI (Dynamic ARP Inspection) to validate ARP packets and by IP Source Guard to prevent IP spoofing. View it with 'show ip dhcp snooping binding'.",
    visual: { type: "layer-stack", params: { layers: ["MAC: aa:bb:cc:dd:ee:ff", "IP: 10.0.0.50", "VLAN: 10", "Interface: Gi0/5", "Lease: 86400 seconds"], highlight: 1 } },
    hack: {
      memory: "The binding table = DHCP snooping's memory. It records WHO got WHAT IP address on WHICH port. DAI and IP Source Guard both read this table.",
      practice: "Lab: Enable DHCP snooping, let a client get an address, then 'show ip dhcp snooping binding'. See the entry with MAC, IP, VLAN, and interface.",
      effort: "medium",
      meta: "The binding table is the link between DHCP snooping and DAI. The exam asks: 'What does DAI use to validate ARP packets?' Answer: the DHCP snooping binding table."
    }
  },

  "5.7.d": {
    info: "DHCP snooping rate limiting restricts the number of DHCP packets an untrusted port can receive per second. This prevents DHCP starvation attacks where an attacker floods DHCP Discover messages to exhaust the IP address pool. Configure with 'ip dhcp snooping limit rate [pps]' on the interface. If the rate is exceeded, the port is err-disabled. Typical rate: 10-20 packets per second for end-user ports.",
    visual: { type: "gauge", params: { level: 40, label: "Rate Limit: 15 DHCP pkts/sec", color: "#f59e0b" } },
    hack: {
      memory: "Rate limiting = speed bumps for DHCP packets. Too many too fast? Port shuts down. Prevents starvation attacks where an attacker hogs all the IPs.",
      practice: "Lab: 'int gi0/5 -> ip dhcp snooping limit rate 10'. Then generate excessive DHCP traffic and watch the port go err-disabled. Practice recovery.",
      effort: "medium",
      meta: "The exam may ask about DHCP starvation attacks and how to prevent them. Rate limiting + DHCP snooping is the answer."
    }
  },

  "5.7.e": {
    info: "Dynamic ARP Inspection (DAI) validates ARP packets on untrusted ports by checking them against the DHCP snooping binding table. It prevents ARP spoofing/poisoning attacks where an attacker sends fake ARP replies to redirect traffic (man-in-the-middle). DAI drops ARP packets that don't match the binding table's MAC-to-IP mappings. DAI requires DHCP snooping to be enabled because it relies on the binding table.",
    visual: { type: "handshake", params: { leftLabel: "Host", rightLabel: "Switch (DAI)", steps: ["ARP Reply: I am 10.0.0.1 ->", "<- Check binding table", "MAC-IP matches? PERMIT ->", "<- MAC-IP mismatch? DROP"] } },
    hack: {
      memory: "DAI = the ARP detective. It checks every ARP packet against the binding table. If the story doesn't match the records, the packet is DROPPED. Needs DHCP snooping as its source of truth.",
      practice: "Lab: Enable DHCP snooping first, then DAI. Attempt an ARP spoof from an untrusted port. Verify it's blocked with 'show ip arp inspection'.",
      effort: "high",
      meta: "DAI depends on DHCP snooping. The exam tests this dependency. If asked 'what must be enabled before DAI?' the answer is DHCP snooping."
    }
  },

  "5.7.f": {
    info: "DAI configuration: 1) DHCP snooping must be enabled first (provides the binding table). 2) Enable DAI per VLAN with 'ip arp inspection vlan [vlan-id]'. 3) Set trusted ports (uplinks, trunk ports) with 'ip arp inspection trust'. Untrusted ports (default) have all ARP packets validated against the binding table. For static IP hosts (no DHCP), configure ARP ACLs to provide manual MAC-IP bindings.",
    visual: { type: "hierarchy", params: { root: "ip arp inspection vlan 10", children: [{ name: "Trusted Ports (trunks, uplinks)", children: [{ name: "ip arp inspection trust" }] }, { name: "Untrusted Ports (default)", children: [{ name: "ARP checked vs binding table" }] }] } },
    hack: {
      memory: "DAI config mirrors DHCP snooping: enable per VLAN, trust uplinks. The pattern is identical: vlan enable + trust specific ports. Two features, same structure.",
      practice: "Configure both DHCP snooping and DAI from scratch in sequence: snooping global -> snooping vlan -> trust DHCP server port -> DAI vlan -> trust uplinks. Practice the full chain.",
      effort: "medium",
      meta: "The exam tests the full chain: DHCP snooping must be enabled BEFORE DAI. Trust the right ports on both features. They work together as a security stack."
    }
  },

  "5.7.g": {
    info: "Port security restricts which MAC addresses can send traffic through a switch port, preventing unauthorized devices from connecting. It limits the number of MAC addresses allowed per port and defines what happens when a violation occurs. Use cases: prevent unauthorized laptops on access ports, prevent MAC flooding attacks that overflow the CAM table, and enforce one-device-per-port policies.",
    visual: { type: "shield", params: { items: ["Limit MAC addresses per port", "Prevent unauthorized devices", "Stop MAC flooding attacks", "Enforce device policies"], color: "#3b82f6" } },
    hack: {
      memory: "Port security = a bouncer checking MAC IDs at the door. Only approved MACs get in. Too many strangers? The port shuts down.",
      practice: "Think through: what happens without port security during a MAC flood attack? The CAM table fills up, the switch starts flooding all frames like a hub. Port security prevents this.",
      effort: "medium",
      meta: "The exam tests port security purpose, config, and violation modes together as a group. Study them as one unit."
    }
  },

  "5.7.h": {
    info: "Port security configuration: 1) Set interface to access mode: 'switchport mode access'. 2) Enable port security: 'switchport port-security'. 3) Set max MAC addresses: 'switchport port-security maximum [count]' (default 1). 4) Optionally specify a static MAC: 'switchport port-security mac-address [mac]'. 5) Set violation mode: 'switchport port-security violation protect|restrict|shutdown'. The port must be an access port — port security doesn't work on dynamic/trunk ports.",
    visual: { type: "layer-stack", params: { layers: ["switchport mode access", "switchport port-security", "switchport port-security maximum 2", "switchport port-security violation shutdown", "switchport port-security mac-address sticky"], highlight: 1 } },
    hack: {
      memory: "Steps: ACCESS mode first, then ENABLE port-security, then MAX + VIOLATION. Access mode is the prerequisite. Without it, port security won't activate.",
      practice: "Lab: Configure a full port security setup from scratch on one interface. Connect a device, verify the learned MAC with 'show port-security interface'. Then connect a second device and trigger a violation.",
      effort: "high",
      meta: "The exam expects you to know the commands in order. The most common mistake: enabling port-security on a trunk or dynamic port — it only works on access ports."
    }
  },

  "5.7.i": {
    info: "Sticky MAC learning automatically learns MAC addresses on a port and adds them to the running-config as static entries. Configured with 'switchport port-security mac-address sticky'. This eliminates the need to manually type each allowed MAC address. Once learned, sticky MACs persist across port bounces but NOT across switch reboots — unless you save with 'copy running-config startup-config'. Sticky is the practical middle ground between fully static and fully dynamic.",
    visual: { type: "state-machine", params: { states: ["Dynamic (default — learned, lost on bounce)", "Sticky (learned, saved to running-config)", "Static (manually configured)"], active: 1, transitions: true } },
    hack: {
      memory: "STICKY = the MAC STICKS to the config like tape. Auto-learned but written to running-config. Save to startup-config to survive reboots.",
      practice: "Lab: Enable sticky, connect a device, then 'show running-config interface Gi0/1'. See the sticky MAC line auto-added. Bounce the port — it survives. Reboot without saving — it's gone.",
      effort: "medium",
      meta: "The exam asks: 'How do you automatically learn and retain MAC addresses?' Answer: sticky. Key detail: you must SAVE the config or sticky MACs are lost on reboot."
    }
  },

  "5.7.j": {
    info: "Port security violation modes define what happens when an unauthorized MAC is detected: PROTECT — drops traffic silently, no log, no alert, no counter increment. RESTRICT — drops traffic AND logs a syslog message, increments violation counter. SHUTDOWN (default) — puts the port in err-disabled state, sends SNMP trap, logs syslog. Shutdown is the most secure but requires manual intervention to restore the port.",
    visual: { type: "comparison", params: { left: { label: "Less Disruptive", items: ["PROTECT: drop silently", "RESTRICT: drop + log + count"] }, right: { label: "Most Secure", items: ["SHUTDOWN: err-disable port", "Requires manual recovery", "Default violation mode"] } } },
    hack: {
      memory: "P-R-S = Protect (silent), Restrict (report), Shutdown (slam the door). Severity increases left to right. Default is SHUTDOWN — the nuclear option.",
      practice: "Lab: Test each mode. Set 'violation protect' and connect a bad MAC — nothing visible happens. Set 'violation restrict' — see the log. Set 'violation shutdown' — port dies.",
      effort: "medium",
      meta: "The exam tests all three modes and their behaviors. Key facts: Protect = NO log. Restrict = log but port stays up. Shutdown = port goes err-disabled (default)."
    }
  },

  "5.7.k": {
    info: "When a port goes err-disabled (from port security violation, BPDU guard, etc.), it must be manually recovered by shutting it down and bringing it back up: 'shutdown' then 'no shutdown'. Alternatively, auto-recovery can be configured with 'errdisable recovery cause [reason]' and 'errdisable recovery interval [seconds]' (default 300s). The port automatically re-enables after the interval. Use 'show errdisable recovery' to check status.",
    visual: { type: "state-machine", params: { states: ["Active", "Violation Detected", "Err-Disabled", "Manual/Auto Recovery", "Active"], active: 2, transitions: true } },
    hack: {
      memory: "Err-disabled = the port is in JAIL. Manual recovery = you bail it out (shut/no shut). Auto recovery = parole after a timer. Default timer: 300 seconds (5 min).",
      practice: "Lab: Trigger an err-disabled port, then recover both ways. Manual: 'shut -> no shut'. Auto: 'errdisable recovery cause psecure-violation -> errdisable recovery interval 30'. Verify with 'show errdisable recovery'.",
      effort: "medium",
      meta: "The exam tests how to recover err-disabled ports. Know that 'shut/no shut' is manual recovery and 'errdisable recovery' enables automatic timer-based recovery."
    }
  },

  // ── 5.8 Compare AAA concepts ──────────────────────────────────

  "5.8.a": {
    info: "Authentication answers 'Who are you?' — it verifies the identity of a user, device, or system attempting to access the network. Methods include username/password, digital certificates, biometrics, and tokens. In Cisco networks, authentication is the first step of AAA — before a user can be authorized to do anything, they must first prove their identity.",
    visual: { type: "handshake", params: { leftLabel: "User", rightLabel: "AAA Server", steps: ["Username: admin ->", "Password: ******* ->", "<- Identity Verified", "<- Access Granted (Authentication PASSED)"] } },
    hack: {
      memory: "Authentication = WHO are you? Show your ID at the door. It's always the FIRST step — you can't authorize someone you haven't identified.",
      practice: "Map the AAA sequence: 1) Authentication (who?), 2) Authorization (what?), 3) Accounting (when?). Create a real-world analogy for each step.",
      effort: "low",
      meta: "The exam expects you to distinguish the three A's clearly. Authentication = identity. Authorization = permissions. Accounting = logging."
    }
  },

  "5.8.b": {
    info: "Authorization answers 'What can you do?' — it determines what resources and commands an authenticated user is permitted to access. After identity is verified, authorization policies define the user's privilege level, which commands they can run, which networks they can access, and what services are available. Authorization without authentication is meaningless — you must know WHO before deciding WHAT they can do.",
    visual: { type: "hierarchy", params: { root: "Authenticated User", children: [{ name: "Admin (Priv 15)", children: [{ name: "All commands" }, { name: "All interfaces" }] }, { name: "Helpdesk (Priv 5)", children: [{ name: "show commands only" }, { name: "No config mode" }] }] } },
    hack: {
      memory: "Authorization = WHAT can you do? You're in the building (authenticated), but which doors are you allowed to open? Your badge level determines your access.",
      practice: "Configure TACACS+ authorization on a lab device that gives different command sets based on username. Test that admin gets full access and helpdesk gets limited show commands.",
      effort: "medium",
      meta: "The exam tests authorization as 'privilege levels and command restrictions.' Know that authorization defines WHAT the user can do after proving WHO they are."
    }
  },

  "5.8.c": {
    info: "Accounting answers 'What did you do?' — it tracks and logs all user activity for auditing, billing, and forensics. Accounting records include login/logout times, commands entered, data transferred, and resources accessed. This creates an audit trail that is essential for compliance (SOX, HIPAA) and incident investigation. Accounting data is typically sent to a TACACS+ or RADIUS server for centralized logging.",
    visual: { type: "layer-stack", params: { layers: ["User logged in: 09:15:00", "Command: show running-config", "Command: configure terminal", "Command: interface Gi0/1", "User logged out: 10:30:00"], highlight: 2 } },
    hack: {
      memory: "Accounting = the SECURITY CAMERA recording everything. Who logged in, what they typed, when they left. The audit trail that answers 'what happened?'",
      practice: "Enable accounting on a lab device: 'aaa accounting exec default start-stop group tacacs+'. Log in, run commands, and review the accounting records on the server.",
      effort: "medium",
      meta: "The exam tests: Authentication = identity, Authorization = permissions, Accounting = logging. Accounting is often forgotten but is critical for compliance."
    }
  },

  "5.8.d": {
    info: "TACACS+ is Cisco proprietary, uses TCP port 49, encrypts the ENTIRE packet payload (not just the password), and separates authentication, authorization, and accounting into distinct processes. This separation allows granular control — you can authenticate against one server and authorize against another. TACACS+ is the preferred protocol for device administration (managing routers and switches) because of its per-command authorization capability.",
    visual: { type: "shield", params: { items: ["TCP Port 49", "Full Packet Encryption", "Separates AAA Functions", "Cisco Proprietary", "Best for Device Admin"], color: "#6366f1" } },
    hack: {
      memory: "TACACS+ = TCP 49, Total encryption, Three separate AAA functions. The T's: TCP, Total encryption, Three functions separated. Cisco-made for Cisco gear.",
      practice: "Build a comparison table: TACACS+ vs RADIUS across 6 attributes: port, protocol, encryption, AAA separation, standard, best use case. Fill from memory.",
      effort: "medium",
      meta: "TACACS+ vs RADIUS is one of the most tested AAA topics. The exam gives scenarios — 'which protocol for device admin?' = TACACS+. 'Which for network access?' = RADIUS."
    }
  },

  "5.8.e": {
    info: "RADIUS is an open standard (RFC 2865/2866), uses UDP ports 1812 (authentication/authorization) and 1813 (accounting), and encrypts only the password field — the rest of the packet is plaintext. RADIUS combines authentication and authorization into a single process (they cannot be separated). It is the standard for network access control (802.1X, VPN, wireless) and is supported by virtually all vendors.",
    visual: { type: "shield", params: { items: ["UDP 1812/1813", "Password-Only Encryption", "Combines Auth + Authz", "Open Standard (RFC)", "Best for Network Access"], color: "#0ea5e9" } },
    hack: {
      memory: "RADIUS = Remote Access Dial-In User Service. UDP 1812/1813. Open standard. Encrypts password only. Combines auth+authz. Think: R = Remote access = RADIUS.",
      practice: "Set up a RADIUS server (FreeRADIUS or NPS) and configure a switch for 802.1X with RADIUS. This is the #1 real-world RADIUS use case.",
      effort: "medium",
      meta: "Key exam facts: RADIUS = UDP, open standard, password-only encryption, combines auth+authz. TACACS+ = TCP, Cisco, full encryption, separates AAA."
    }
  },

  "5.8.f": {
    info: "TACACS+ is preferred for device administration (managing routers, switches, firewalls) because it supports per-command authorization — controlling exactly which CLI commands each admin can run. RADIUS is preferred for network access (802.1X wired/wireless, VPN authentication) because it's an open standard supported by all vendors and integrates with 802.1X supplicants. In practice, many organizations use both: TACACS+ for admin access, RADIUS for user access.",
    visual: { type: "comparison", params: { left: { label: "TACACS+ — Device Admin", items: ["Per-command authorization", "Full encryption", "Router/switch management", "Cisco proprietary"] }, right: { label: "RADIUS — Network Access", items: ["802.1X / wireless / VPN", "Open standard", "Multi-vendor support", "User network auth"] } } },
    hack: {
      memory: "TACACS+ = managing the DEVICES (admin CLI). RADIUS = managing USER ACCESS to the network. Devices = TACACS+. Users = RADIUS.",
      practice: "Scenario drill: 'Company needs to control which show commands the helpdesk can run' = TACACS+ (per-command auth). 'Company needs 802.1X for wireless' = RADIUS.",
      effort: "low",
      meta: "This is how the exam frames it: use case determines protocol. Device admin = TACACS+. Network access = RADIUS. Both can coexist."
    }
  },

  // ── 5.9 Describe wireless security protocols ──────────────────

  "5.9.a": {
    info: "WEP (Wired Equivalent Privacy) was the original 802.11 security standard using RC4 stream cipher with a 24-bit initialization vector (IV). The 24-bit IV is critically short — it repeats after approximately 16 million frames, allowing attackers to crack the key in minutes using tools like aircrack-ng. WEP is completely broken and should never be used. It was deprecated in 2004 by WPA.",
    visual: { type: "gauge", params: { level: 10, label: "WEP Security Level: BROKEN", color: "#ef4444" } },
    hack: {
      memory: "WEP = Weak Encryption Protocol (not really, but that's how to remember it). 24-bit IV = too short = repeats = cracked. WEP is DEAD — never use it.",
      practice: "Memorize the wireless security timeline: WEP (broken) -> WPA (TKIP, deprecated) -> WPA2 (AES/CCMP, current) -> WPA3 (SAE, newest). Know what each adds.",
      effort: "low",
      meta: "The exam tests why WEP is broken: 24-bit IV is too short and reuses keys. Don't just know 'WEP is bad' — know WHY (IV length)."
    }
  },

  "5.9.b": {
    info: "WPA (Wi-Fi Protected Access) was a temporary fix for WEP's flaws, using TKIP (Temporal Key Integrity Protocol) which dynamically changes encryption keys per packet. TKIP still uses RC4 but adds a longer 48-bit IV, a message integrity check (MIC/Michael), and per-packet key mixing. WPA/TKIP is now deprecated because TKIP itself has known vulnerabilities. It was replaced by WPA2 with AES/CCMP.",
    visual: { type: "state-machine", params: { states: ["WEP (RC4, 24-bit IV)", "WPA (TKIP, 48-bit IV)", "WPA2 (AES/CCMP)", "WPA3 (SAE/OWE)"], active: 1, transitions: true } },
    hack: {
      memory: "WPA = the band-aid over WEP. TKIP = Temporary Key Integrity Protocol — even the name says it's temporary. It fixed the IV problem but TKIP itself is now cracked.",
      practice: "Compare WEP vs WPA: both use RC4, but WPA adds TKIP (longer IV, per-packet keys, MIC). Then compare WPA vs WPA2: WPA2 replaces RC4/TKIP with AES/CCMP entirely.",
      effort: "low",
      meta: "The exam tests the evolution: WEP -> WPA -> WPA2 -> WPA3. Know which cipher each uses: WEP = RC4, WPA = TKIP/RC4, WPA2 = AES/CCMP, WPA3 = SAE."
    }
  },

  "5.9.c": {
    info: "WPA2 is the current wireless security standard using AES (Advanced Encryption Standard) with CCMP (Counter Mode with CBC-MAC Protocol) for encryption and integrity. AES is a strong block cipher that replaced the weak RC4 stream cipher. WPA2 is mandatory for Wi-Fi Alliance certification since 2006. It supports both Personal mode (PSK) and Enterprise mode (802.1X). WPA2 remains secure when properly configured with strong passwords.",
    visual: { type: "shield", params: { items: ["AES Encryption (128-bit)", "CCMP Integrity", "Current Standard", "Personal (PSK) + Enterprise (802.1X)"], color: "#10b981" } },
    hack: {
      memory: "WPA2 = AES + CCMP = the current gold standard. AES = Advanced Encryption Standard = the one that hasn't been cracked. CCMP provides both encryption AND integrity.",
      practice: "Configure a WPA2-PSK WLAN in a lab or simulator. Then configure WPA2-Enterprise with a RADIUS server. Understanding both modes is essential.",
      effort: "medium",
      meta: "WPA2 is the most heavily tested wireless security standard. Know: AES/CCMP, Personal vs Enterprise, and that it's the minimum acceptable standard today."
    }
  },

  "5.9.d": {
    info: "WPA3 is the newest wireless security standard, adding SAE (Simultaneous Authentication of Equals) which replaces the PSK 4-way handshake with a more secure key exchange resistant to offline dictionary attacks. OWE (Opportunistic Wireless Encryption) provides encryption on open networks without requiring a password. WPA3-Enterprise adds optional 192-bit cryptographic suite for high-security environments (government, finance).",
    visual: { type: "comparison", params: { left: { label: "WPA2", items: ["PSK (4-way handshake)", "Vulnerable to offline attacks", "Open networks = no encryption", "128-bit security"] }, right: { label: "WPA3", items: ["SAE (Dragonfly handshake)", "Resists offline dictionary attacks", "OWE encrypts open networks", "192-bit enterprise option"] } } },
    hack: {
      memory: "WPA3: SAE = Secure Authentication of Equals (no more cracking handshakes offline). OWE = Open Wireless Encryption (even Starbucks WiFi gets encrypted). 192-bit = enterprise fortress mode.",
      practice: "List the 3 key WPA3 improvements: 1) SAE replaces PSK handshake, 2) OWE encrypts open networks, 3) 192-bit enterprise option. Know what each solves.",
      effort: "low",
      meta: "WPA3 is newer exam content (added in CCNA 200-301 v1.1). Know SAE, OWE, and 192-bit. The exam tests what WPA3 ADDS over WPA2."
    }
  },

  "5.9.e": {
    info: "Personal mode (PSK — Pre-Shared Key) uses a shared password that all users entering the WLAN must know. The password is configured on the access point and entered by each connecting device. PSK is simple to deploy but less secure for enterprise use because everyone shares the same password — if one person leaks it, the whole network is compromised. Best for home and small office environments.",
    visual: { type: "handshake", params: { leftLabel: "Client", rightLabel: "AP", steps: ["I know the PSK ->", "<- I know the PSK too", "4-way handshake (derive keys) ->", "<- Encrypted session established"] } },
    hack: {
      memory: "Personal = PASSWORD. Everyone uses the SAME key. Like a house key — if you share it with 50 people, security is only as strong as the most careless person.",
      practice: "Configure WPA2-Personal on a lab AP. Connect with the PSK. Then change the PSK and verify old devices can't connect. Understand the management burden with many users.",
      effort: "low",
      meta: "The exam tests: Personal = PSK = shared password = home/small office. Enterprise = 802.1X = individual credentials = corporate. Scenario determines which is correct."
    }
  },

  "5.9.f": {
    info: "Enterprise mode uses 802.1X with a RADIUS server for individual user authentication. Each user has unique credentials (username/password, certificate, or both). The authentication process involves three parties: the supplicant (client), the authenticator (AP/switch), and the authentication server (RADIUS). Enterprise mode provides per-user accountability, dynamic key assignment, and centralized credential management. Required for corporate environments.",
    visual: { type: "packet-flow", params: { nodes: ["Supplicant (Client)", "Authenticator (AP)", "RADIUS Server"], color: "#6366f1" } },
    hack: {
      memory: "Enterprise = 802.1X = RADIUS = INDIVIDUAL credentials. Three players: Supplicant (client), Authenticator (AP), Server (RADIUS). Think: S-A-S.",
      practice: "Set up 802.1X in a lab: configure the switch/AP as authenticator, point it to a RADIUS server, and test with a supplicant. This is the #1 enterprise wireless security config.",
      effort: "high",
      meta: "The exam tests the 802.1X roles (supplicant, authenticator, server) and that Enterprise mode uses RADIUS. Know all three roles and which device fills each."
    }
  },

  // ── 5.10 Configure WLAN with WPA2 PSK ────────────────────────

  "5.10.a": {
    info: "The Wireless LAN Controller (WLC) is managed via HTTPS (web GUI) by navigating to the WLC's management IP address in a browser. Initial setup may use a console cable for first-time configuration. The WLC GUI provides a centralized dashboard for creating WLANs, managing APs, configuring security policies, monitoring clients, and troubleshooting. SSH/CLI access is also available for advanced configuration.",
    visual: { type: "packet-flow", params: { nodes: ["Admin Browser (HTTPS)", "WLC Management IP", "WLC Dashboard"], color: "#3b82f6" } },
    hack: {
      memory: "WLC access = HTTPS to the management IP. Just like any web-managed device. Console for initial setup, HTTPS for day-to-day management.",
      practice: "If you have access to a WLC simulator (Cisco CML or Packet Tracer), navigate the GUI. Know where WLANs, Security, and Interfaces tabs are located.",
      effort: "low",
      meta: "The exam tests WLC management basics. Know: HTTPS for GUI access, console for initial setup, and the general GUI layout."
    }
  },

  "5.10.b": {
    info: "Creating a WLAN on the WLC requires specifying: a profile name (internal identifier), an SSID (the network name clients see), and a WLAN ID (unique number 1-512). The profile name and SSID can be different — the profile name is for admin identification, while the SSID is broadcast to clients. Navigate to WLANs > Create New > enter Profile Name, SSID, and ID > Apply.",
    visual: { type: "hierarchy", params: { root: "Create WLAN", children: [{ name: "Profile Name (internal)", children: [{ name: "e.g., Corporate-WiFi" }] }, { name: "SSID (client-facing)", children: [{ name: "e.g., CorpNet" }] }, { name: "WLAN ID (1-512)", children: [{ name: "e.g., 1" }] }] } },
    hack: {
      memory: "WLAN needs 3 things: Profile (admin name), SSID (user name), ID (number). Think PNI — Profile, Network name (SSID), ID number.",
      practice: "In a WLC simulator, create 3 WLANs with different profiles, SSIDs, and IDs. Verify each appears in the WLAN list. Practice the GUI workflow until it's muscle memory.",
      effort: "medium",
      meta: "The exam may show a WLC screenshot and ask you to identify or create a WLAN. Know the three required fields: profile name, SSID, and WLAN ID."
    }
  },

  "5.10.c": {
    info: "To configure WPA2 PSK security on a WLAN: navigate to the WLAN's Security tab > Layer 2 Security > select WPA+WPA2. Under WPA2 Policy, enable WPA2 and select AES as the encryption method. Under Auth Key Management, select PSK and enter the pre-shared key. The PSK should be at least 12 characters with complexity. AES/CCMP is the required encryption — TKIP is deprecated.",
    visual: { type: "layer-stack", params: { layers: ["Layer 2 Security: WPA+WPA2", "WPA2 Policy: Enabled", "Encryption: AES (CCMP)", "Auth Key Mgmt: PSK", "Pre-Shared Key: ************"], highlight: 2 } },
    hack: {
      memory: "Security config order: WPA+WPA2 mode -> Enable WPA2 -> AES encryption -> PSK auth -> Enter the key. Think: Mode, Version, Cipher, Auth, Key (MVCAK).",
      practice: "Walk through the WLC security tab in a simulator. Set WPA+WPA2, enable WPA2, select AES, choose PSK, enter a key. Connect a client and verify it works.",
      effort: "medium",
      meta: "The exam may show a WLC security configuration and ask what's wrong or what to change. Know the correct settings: WPA2 + AES + PSK."
    }
  },

  "5.10.d": {
    info: "Each WLAN must be mapped to an interface (which maps to a VLAN) to determine which network segment wireless clients are placed on. In the WLC, navigate to the WLAN's General tab and select the interface from the dropdown. This maps WLAN traffic to a specific VLAN — for example, mapping the 'Guest' WLAN to the 'guest-vlan' interface (VLAN 100). Multiple WLANs can map to different VLANs for traffic segmentation.",
    visual: { type: "packet-flow", params: { nodes: ["WLAN (SSID: Guest)", "WLC Interface", "VLAN 100", "Guest Network"], color: "#f59e0b" } },
    hack: {
      memory: "WLAN -> Interface -> VLAN. The interface is the bridge between the wireless world and the wired VLAN. Like assigning a port to a VLAN, but for wireless.",
      practice: "In a simulator, create two WLANs mapped to two different VLANs. Connect clients to each and verify they get IPs from the correct DHCP scope.",
      effort: "medium",
      meta: "The exam tests that WLANs must be mapped to interfaces/VLANs. Know that interface mapping controls which VLAN wireless clients land on."
    }
  },

  "5.10.e": {
    info: "After configuration, the WLAN must be enabled (Status: Enabled) for clients to see and connect to it. By default, newly created WLANs may be disabled. Enable it from the WLAN's General tab by checking 'Status: Enabled' and clicking Apply. Verify the WLAN is operational by checking: the SSID appears in the WLAN list as enabled, APs are broadcasting it, and clients can associate and authenticate successfully.",
    visual: { type: "state-machine", params: { states: ["Created (Disabled)", "Status: Enabled", "APs Broadcasting", "Clients Connecting"], active: 1, transitions: true } },
    hack: {
      memory: "Don't forget to flip the SWITCH. Creating a WLAN doesn't enable it. The #1 mistake: configure everything perfectly but forget to enable the WLAN.",
      practice: "Create a WLAN, leave it disabled, try to connect (fails). Enable it, try again (works). This experience burns the lesson in better than reading about it.",
      effort: "low",
      meta: "Simple exam question: 'Users can't see the new SSID, what's wrong?' Check if the WLAN status is Enabled. It's an easy point if you remember."
    }
  },

  /* ══════════════════════════════════════════════════════════════
     DOMAIN 6 — AUTOMATION AND PROGRAMMABILITY (10%)
  ══════════════════════════════════════════════════════════════ */

  // ── 6.1 Explain how automation impacts network management ────

  "6.1.a": {
    info: "Network automation reduces human error by eliminating manual CLI configuration that is prone to typos, copy-paste mistakes, and inconsistent implementations. Automated scripts and tools execute the same commands exactly the same way every time. Studies show that 40-80% of network outages are caused by human configuration errors. Automation doesn't eliminate errors entirely — it shifts them to the template/script level where they can be caught once and fixed everywhere.",
    visual: { type: "comparison", params: { left: { label: "Manual CLI", items: ["Typos in configs", "Inconsistent commands", "40-80% of outages", "One device at a time"] }, right: { label: "Automated", items: ["Exact same config every time", "Template-driven consistency", "Errors caught in testing", "Hundreds of devices at once"] } } },
    hack: {
      memory: "Humans make typos. Scripts don't. One bad 'no shut' vs 'shut' on the wrong interface takes down a site. Automation runs the TESTED playbook every time.",
      practice: "Write a simple Ansible playbook that configures an interface. Now imagine typing those same commands manually on 200 switches. That's why automation exists.",
      effort: "low",
      meta: "The exam tests automation benefits conceptually. The key stat: most network outages are caused by human error, and automation directly addresses this."
    }
  },

  "6.1.b": {
    info: "Automation dramatically speeds up provisioning — deploying new devices, services, or configurations. What takes hours manually (SSH into each device, type commands, verify) can be done in minutes or seconds with automation. Zero-touch provisioning (ZTP) allows new devices to automatically download their configuration when connected to the network. This is critical for organizations deploying hundreds or thousands of devices.",
    visual: { type: "comparison", params: { left: { label: "Manual Provisioning", items: ["SSH to each device", "Type commands one by one", "Hours for 10 switches", "Days for a new site"] }, right: { label: "Automated Provisioning", items: ["Push config to all at once", "ZTP on boot", "Minutes for 10 switches", "Hours for a new site"] } } },
    hack: {
      memory: "Manual = hours per device. Automated = seconds per device. Multiply by 500 devices and the math speaks for itself.",
      practice: "Research ZTP (Zero-Touch Provisioning) for Cisco devices. Understand the concept: device boots, gets config from DHCP/TFTP, no engineer needed on-site.",
      effort: "low",
      meta: "The exam tests speed as a key automation benefit. ZTP is the ultimate example — new device, plug it in, config appears automatically."
    }
  },

  "6.1.c": {
    info: "Automation enables scalability by allowing the same configuration changes to be applied across thousands of devices simultaneously. Without automation, scaling a network requires proportionally more engineers and more time. With automation, one engineer can manage thousands of devices using templates, scripts, and orchestration tools. The effort to configure 10 devices vs 10,000 devices becomes nearly the same.",
    visual: { type: "gauge", params: { level: 90, label: "Scalability: 10 to 10,000 devices", color: "#10b981" } },
    hack: {
      memory: "Without automation: 10 devices = 1 engineer. 10,000 devices = 1,000 engineers. With automation: 10,000 devices = still 1 engineer + good scripts.",
      practice: "Think about your largest network. How long would it take to change an NTP server on every device manually? Now imagine one Ansible command doing it in 5 minutes.",
      effort: "low",
      meta: "Scalability is automation's strongest argument for large enterprises. The exam frames it as 'what benefit does automation provide for growing networks?'"
    }
  },

  "6.1.d": {
    info: "Automation ensures consistency and compliance by applying identical configurations from validated templates. Every device gets the exact same security policies, SNMP settings, ACLs, and banners. Compliance checking can be automated — scripts regularly audit device configs against the desired state and flag or auto-remediate drift. This is essential for regulatory compliance (PCI-DSS, HIPAA, SOX) where configuration consistency must be provable.",
    visual: { type: "shield", params: { items: ["Identical configs everywhere", "Template-driven deployment", "Automated compliance audits", "Drift detection + remediation"], color: "#3b82f6" } },
    hack: {
      memory: "Consistency = every device looks the same. Compliance = you can PROVE it. Automation gives you both — deploy from templates, audit automatically.",
      practice: "Write a compliance check script concept: pull running-config from all devices, compare against a golden template, report differences. This is real-world network automation.",
      effort: "low",
      meta: "The exam tests consistency as a key automation benefit. Know that templates ensure identical configs, and automated audits ensure configs don't drift."
    }
  },

  "6.1.e": {
    info: "Self-healing networks use automation to detect failures and automatically take corrective action without human intervention. Examples: automatically rerouting traffic around a failed link, restarting a crashed service, or rolling back a bad configuration change. Event-driven automation triggers scripts based on syslog messages, SNMP traps, or streaming telemetry. The goal is to reduce Mean Time To Repair (MTTR) from hours to seconds.",
    visual: { type: "state-machine", params: { states: ["Normal Operation", "Failure Detected", "Auto-Remediation", "Service Restored"], active: 2, transitions: true } },
    hack: {
      memory: "Self-healing = the network is its own doctor. Detect the problem, diagnose it, fix it — all before a human even gets paged. Like auto-pilot for networks.",
      practice: "Design a self-healing scenario: link goes down -> syslog trigger -> script activates backup path -> alert sent to NOC. Map out the automation chain.",
      effort: "low",
      meta: "Self-healing is a newer exam concept. The exam tests it conceptually — know that event-driven automation can detect and fix issues without human intervention."
    }
  },

  // ── 6.2 Compare traditional vs controller-based networking ────

  "6.2.a": {
    info: "Traditional networking uses a distributed control plane — every device independently makes its own forwarding decisions using protocols like OSPF, EIGRP, and STP. Configuration is done device-by-device via CLI (SSH/Telnet/Console). Each device maintains its own routing tables, MAC tables, and policies. Changes require touching each device individually. This model is well-understood but doesn't scale well for large, dynamic environments.",
    visual: { type: "comparison", params: { left: { label: "Traditional", items: ["Distributed control plane", "CLI per device", "Each device decides independently", "Config changes = per device"] }, right: { label: "Controller-Based", items: ["Centralized control plane", "API-driven", "Controller decides for all", "Config changes = one place"] } } },
    hack: {
      memory: "Traditional = every device is its own boss. Like a company with no manager — each employee decides independently. Works for small teams, chaos at scale.",
      practice: "List the management challenges of a 500-device traditional network: config consistency, change windows, troubleshooting across devices. This motivates why SDN exists.",
      effort: "low",
      meta: "The exam contrasts traditional vs SDN. Traditional = distributed, CLI, per-device. SDN = centralized, API, controller-managed."
    }
  },

  "6.2.b": {
    info: "Controller-based networking (SDN) centralizes the control plane into a software controller that makes forwarding decisions for all network devices. The data plane remains on each device (they still forward packets), but the controller tells them HOW to forward. Configuration is done through the controller's API or GUI, not device-by-device CLI. This provides a single point of management, network-wide visibility, and programmability via APIs.",
    visual: { type: "hierarchy", params: { root: "SDN Controller", children: [{ name: "Switch 1 (data plane)", children: [{ name: "Forwards per controller rules" }] }, { name: "Switch 2 (data plane)", children: [{ name: "Forwards per controller rules" }] }, { name: "Switch 3 (data plane)", children: [{ name: "Forwards per controller rules" }] }] } },
    hack: {
      memory: "SDN = the BRAIN (controller) tells the HANDS (switches) what to do. The brain sees the whole body; each hand only knows its own fingers. Centralized intelligence.",
      practice: "Draw the SDN architecture: Controller at the top, switches below. Label: northbound APIs (apps to controller), southbound APIs (controller to devices). This diagram appears on the exam.",
      effort: "medium",
      meta: "The exam heavily tests SDN architecture. Know: controller = centralized control plane, devices = data plane only, communication via southbound APIs (OpenFlow, NETCONF)."
    }
  },

  "6.2.c": {
    info: "SDN provides a 'single pane of glass' — one unified dashboard to view and manage the entire network. Benefits include: network-wide visibility (see all devices, links, and traffic from one place), simplified troubleshooting (end-to-end path analysis), consistent policy enforcement, rapid provisioning, and the ability to program network behavior via APIs. The controller's network-wide view enables optimizations impossible with distributed control.",
    visual: { type: "shield", params: { items: ["Single pane of glass", "Network-wide visibility", "API programmability", "Consistent policy", "Rapid provisioning"], color: "#10b981" } },
    hack: {
      memory: "Single pane of glass = one window to see EVERYTHING. No more SSH into 50 devices to troubleshoot one flow. The controller sees it all.",
      practice: "If you've used any network controller (Meraki, DNA Center, UniFi), recall the dashboard experience. Compare it to logging into individual switches via CLI.",
      effort: "low",
      meta: "The exam asks about SDN benefits. 'Single pane of glass' is the buzzword — centralized visibility and management. Know this phrase."
    }
  },

  "6.2.d": {
    info: "Cisco DNA Center (now Cisco Catalyst Center) is Cisco's enterprise SDN controller for campus networks. It provides intent-based networking — you define the desired network state (intent) and DNA Center translates it into device configurations. Features include: automated provisioning, network assurance (AI-driven analytics), policy-based segmentation (SD-Access), software image management (SWIM), and integration with ISE for security. It uses NETCONF/YANG and REST APIs.",
    visual: { type: "hierarchy", params: { root: "Cisco DNA Center", children: [{ name: "Design", children: [{ name: "Network hierarchy" }] }, { name: "Policy", children: [{ name: "SD-Access segmentation" }] }, { name: "Provision", children: [{ name: "Device deployment" }] }, { name: "Assurance", children: [{ name: "AI/ML analytics" }] }] } },
    hack: {
      memory: "DNA Center = Cisco's SDN brain for campus networks. Four pillars: Design, Policy, Provision, Assurance (DPPA). Intent-based = tell it WHAT you want, not HOW.",
      practice: "Review the DNA Center GUI layout (Cisco has free sandbox environments at devnetsandbox.cisco.com). Know the four workflow areas: Design, Policy, Provision, Assurance.",
      effort: "medium",
      meta: "DNA Center is testable on the CCNA. Know it's intent-based, uses REST APIs, and the four workflow areas. You won't configure it on the exam but must know what it does."
    }
  },

  // ── 6.3 Describe SDN architecture ─────────────────────────────

  "6.3.a": {
    info: "SDN fundamentally separates the control plane (decision-making logic — routing protocols, path computation, policy) from the data plane (packet forwarding based on the control plane's instructions). In traditional networking, both planes exist on every device. In SDN, the control plane is extracted and centralized in a controller. The data plane remains distributed on network devices, which become simple forwarding engines.",
    visual: { type: "layer-stack", params: { layers: ["Application Plane (business apps)", "Control Plane (SDN Controller)", "Data Plane (switches/routers — forwarding only)"], highlight: 1 } },
    hack: {
      memory: "Control plane = the GPS telling you where to turn. Data plane = your legs doing the walking. SDN = one GPS for all walkers instead of each person figuring out directions alone.",
      practice: "List 3 functions of each plane. Control: routing decisions, ACL logic, path computation. Data: packet forwarding, encapsulation, queuing. Know which plane does what.",
      effort: "low",
      meta: "This is THE foundational SDN concept. The exam tests it directly: 'What does SDN separate?' = control plane from data plane."
    }
  },

  "6.3.b": {
    info: "Northbound APIs (NBIs) connect the controller to applications and management tools above it — they allow software to program the network. Southbound APIs (SBIs) connect the controller to network devices below it — they allow the controller to push configurations and receive state information. Common southbound protocols: OpenFlow, NETCONF, RESTCONF, SNMP. Common northbound interfaces: REST APIs (JSON/XML). Think: North = up to apps, South = down to devices.",
    visual: { type: "layer-stack", params: { layers: ["Applications (Northbound APIs — REST)", "SDN Controller", "Network Devices (Southbound APIs — OpenFlow, NETCONF)"], highlight: 1 } },
    hack: {
      memory: "Northbound = up to APPS (North = up on the map). Southbound = down to DEVICES (South = down on the map). NBI = REST APIs. SBI = OpenFlow/NETCONF.",
      practice: "Draw the three-layer SDN diagram and label: App layer (top), Controller (middle), Infrastructure (bottom). Draw arrows: NBI up, SBI down. Label the protocols.",
      effort: "low",
      meta: "Northbound vs Southbound is a guaranteed exam question. Draw the diagram once and never forget it. North = apps, South = devices."
    }
  },

  "6.3.c": {
    info: "The underlay is the physical network infrastructure — the actual routers, switches, cables, and physical connections that carry traffic. It provides IP reachability between all network devices. In an SD-Access or VXLAN deployment, the underlay handles the physical routing (often using IS-IS or OSPF) while the overlay creates virtual networks on top. The underlay must be properly designed and operational before any overlay can function.",
    visual: { type: "layer-stack", params: { layers: ["Overlay (virtual networks)", "Underlay (physical network)"], highlight: 1 } },
    hack: {
      memory: "Underlay = the ROAD (physical infrastructure). Overlay = the LANES painted on the road (virtual networks). You need the road before you can paint lanes.",
      practice: "Think of your home network: the physical cables and switches = underlay. VLANs running on top = a simple form of overlay. Scale this concept to data center VXLAN fabrics.",
      effort: "low",
      meta: "The exam tests underlay vs overlay vs fabric. Underlay = physical. Overlay = virtual. Fabric = both together. Simple but must be memorized."
    }
  },

  "6.3.d": {
    info: "The overlay is a virtual network built on top of the physical underlay using encapsulation protocols like VXLAN (Virtual Extensible LAN). Overlay networks create logical topologies that are independent of the physical topology — devices can appear to be on the same network segment even if they're physically in different buildings or data centers. VXLAN uses a 24-bit VNI (VXLAN Network Identifier) supporting up to 16 million virtual networks vs. VLAN's 4,096 limit.",
    visual: { type: "encapsulation", params: { layers: [{ label: "Outer IP/UDP Header (Underlay)", color: "#6366f1" }, { label: "VXLAN Header (VNI)", color: "#f59e0b" }, { label: "Original Frame (Overlay)", color: "#3b82f6" }] } },
    hack: {
      memory: "VXLAN = VLAN eXtended. 24-bit VNI = 16 million virtual networks (vs VLAN's 4,096). The overlay is like a VPN — a virtual network riding on the physical one.",
      practice: "Compare VLAN (12-bit ID, 4096 max, L2 only) vs VXLAN (24-bit VNI, 16M max, L2 over L3). Understand why data centers need VXLAN's scale.",
      effort: "medium",
      meta: "The exam tests VXLAN as THE overlay technology. Know: 24-bit VNI, 16 million segments, L2 over L3 encapsulation. Compare against VLAN's 4,096 limit."
    }
  },

  "6.3.e": {
    info: "A network fabric is the combination of the underlay (physical infrastructure) and overlay (virtual networks) working together as an integrated, programmable system. In Cisco SD-Access, the fabric includes VXLAN overlay, IS-IS underlay, LISP for endpoint mapping, and CTS (Cisco TrustSec) for segmentation. The fabric provides automated provisioning, segmentation, and policy enforcement across the entire network as a single system rather than individual devices.",
    visual: { type: "layer-stack", params: { layers: ["Policy & Segmentation (CTS/SGT)", "Virtual Networks (VXLAN Overlay)", "Endpoint Mapping (LISP)", "Physical Network (IS-IS Underlay)"], highlight: 1 } },
    hack: {
      memory: "Fabric = Underlay + Overlay = the WHOLE system working together. Like fabric in clothing — individual threads (underlay) woven together into a unified material (fabric).",
      practice: "List the components of Cisco SD-Access fabric: IS-IS (underlay routing), VXLAN (overlay encapsulation), LISP (endpoint discovery), CTS/SGT (segmentation). Know each role.",
      effort: "medium",
      meta: "The exam defines fabric as underlay + overlay combined. For Cisco specifically, know SD-Access = IS-IS + VXLAN + LISP. You won't configure it but must describe it."
    }
  },

  // ── 6.4 Explain AI and ML in network operations ───────────────

  "6.4.a": {
    info: "Generative AI in networking creates configurations, documentation, and troubleshooting steps from natural language input. An engineer can describe intent ('block HTTP traffic from the guest VLAN to the server VLAN') and generative AI produces the ACL configuration. It can also generate network documentation, compliance reports, and change requests. This is an emerging CCNA topic reflecting the industry's adoption of AI assistants for network operations.",
    visual: { type: "packet-flow", params: { nodes: ["Natural Language Intent", "Generative AI", "Network Configuration"], color: "#8b5cf6" } },
    hack: {
      memory: "Generative AI = tell it WHAT you want in plain English, it GENERATES the config. Like a translator between human intent and CLI commands.",
      practice: "Try using an AI assistant to generate a Cisco ACL from a plain English description. Compare the output to what you'd write manually. Note accuracy and limitations.",
      effort: "low",
      meta: "New exam topic in CCNA 200-301 v1.1. The exam tests conceptual understanding — what generative AI does for networking, not how to build AI models."
    }
  },

  "6.4.b": {
    info: "Predictive AI uses machine learning to forecast future network events based on historical data. Anomaly detection identifies unusual patterns that may indicate security breaches, failing hardware, or performance degradation. Capacity forecasting predicts when bandwidth, storage, or compute resources will be exhausted, enabling proactive upgrades. Predictive AI shifts operations from reactive (fix after failure) to proactive (fix before failure).",
    visual: { type: "state-machine", params: { states: ["Collect Data", "Train ML Model", "Detect Anomalies", "Predict Failures", "Proactive Action"], active: 3, transitions: true } },
    hack: {
      memory: "Predictive AI = a weather forecast for your network. It looks at patterns in historical data and predicts storms (failures) before they hit.",
      practice: "Think about what predictive analytics could detect on your network: a switch whose CPU usage is slowly climbing toward 100%, an interface with increasing CRC errors, bandwidth trending toward capacity.",
      effort: "low",
      meta: "The exam tests: predictive AI = forecasting, anomaly detection, proactive operations. Know the difference between predictive (forecasts) and generative (creates)."
    }
  },

  "6.4.c": {
    info: "ML-driven monitoring learns the normal baseline behavior of your network and automatically detects deviations that may indicate problems. Unlike static thresholds (alert when CPU > 80%), ML-based monitoring understands that 85% CPU might be normal at 2 PM on Monday but abnormal at 3 AM on Sunday. It adapts to seasonal patterns, growth trends, and normal variations. Cisco DNA Center Assurance uses this approach for network health scoring.",
    visual: { type: "comparison", params: { left: { label: "Static Thresholds", items: ["CPU > 80% = alert", "Same threshold 24/7", "Many false positives", "Misses slow degradation"] }, right: { label: "ML Baseline", items: ["Learns normal patterns", "Context-aware alerts", "Fewer false positives", "Detects slow drift"] } } },
    hack: {
      memory: "ML monitoring LEARNS what's normal. Static thresholds are dumb alarms. ML says 'this is unusual FOR THIS TIME AND CONTEXT.' Much smarter, fewer false alarms.",
      practice: "Compare two alerting approaches for a web server: static (CPU > 80% = alert) vs ML-based (CPU is 30% higher than usual for this time of day). Which gives fewer false positives?",
      effort: "low",
      meta: "The exam tests the concept of ML baselines vs static thresholds. Know that ML adapts to normal patterns and detects contextual anomalies."
    }
  },

  "6.4.d": {
    info: "AIOps (Artificial Intelligence for IT Operations) applies AI/ML to automate root cause analysis, event correlation, and remediation. When an incident occurs, AIOps correlates thousands of events across multiple systems to identify the root cause — something that would take a human team hours. It can automatically suggest or execute fixes. Cisco DNA Center's AI-driven network assurance and issue resolution is a practical AIOps example in networking.",
    visual: { type: "hierarchy", params: { root: "AIOps", children: [{ name: "Event Correlation", children: [{ name: "1000s of alerts -> 1 root cause" }] }, { name: "Root Cause Analysis", children: [{ name: "ML identifies source" }] }, { name: "Auto-Remediation", children: [{ name: "Suggested/automated fixes" }] }] } },
    hack: {
      memory: "AIOps = AI that does what a NOC team does: correlate alerts, find root cause, suggest fixes. Instead of 500 alerts and 3 hours of troubleshooting, AIOps says 'it's this switch port.'",
      practice: "Research Cisco DNA Center Assurance features. See how it correlates wireless client issues (authentication, DHCP, association) into root cause recommendations.",
      effort: "low",
      meta: "AIOps is a newer exam concept. Know: event correlation, automated root cause analysis, and proactive remediation. Cisco DNA Center Assurance is the concrete example."
    }
  },

  // ── 6.5 Describe REST-based APIs ──────────────────────────────

  "6.5.a": {
    info: "REST (Representational State Transfer) APIs follow key principles: Stateless (each request contains all information needed — server doesn't remember previous requests), Client-Server (separation of concerns), Uniform Interface (standardized URIs for resources), and Cacheable (responses can be cached for performance). Resources are identified by URIs (e.g., /api/v1/devices/123). REST uses standard HTTP methods and is the dominant API style for network automation and SDN controllers.",
    visual: { type: "handshake", params: { leftLabel: "Client", rightLabel: "REST API Server", steps: ["GET /api/v1/devices ->", "<- 200 OK + JSON data", "POST /api/v1/devices (new device) ->", "<- 201 Created + device JSON", "DELETE /api/v1/devices/5 ->", "<- 204 No Content"] } },
    hack: {
      memory: "REST = Stateless + URI + HTTP verbs + JSON. Each request is INDEPENDENT — the server has amnesia between requests. Everything the server needs is in the request itself.",
      practice: "Use curl or Postman to hit a public REST API (e.g., jsonplaceholder.typicode.com). Make GET, POST, PUT, DELETE requests. See how URIs identify resources.",
      effort: "medium",
      meta: "REST principles are heavily tested. Know: stateless, client-server, URI-based resources, HTTP verbs. The exam may ask 'what makes an API RESTful?'"
    }
  },

  "6.5.b": {
    info: "HTTP verbs map to CRUD operations: GET = Read (retrieve data), POST = Create (new resource), PUT = Update/Replace (entire resource), PATCH = Update/Modify (partial resource), DELETE = Delete (remove resource). GET is safe and idempotent (doesn't change data). POST is not idempotent (calling it twice creates two resources). PUT is idempotent (calling it twice with the same data has the same result). These verbs tell the server what ACTION to perform on the resource identified by the URI.",
    visual: { type: "comparison", params: { left: { label: "HTTP Verb", items: ["GET", "POST", "PUT / PATCH", "DELETE"] }, right: { label: "CRUD Operation", items: ["Read", "Create", "Update", "Delete"] } } },
    hack: {
      memory: "CRUD = Create-Read-Update-Delete. HTTP = POST-GET-PUT-DELETE. Map them: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE. PGPD matches CRUD.",
      practice: "Build a mental table: GET /devices = list all devices. POST /devices = create new device. PUT /devices/5 = replace device 5. DELETE /devices/5 = remove device 5.",
      effort: "low",
      meta: "The CRUD-to-HTTP mapping is guaranteed on the exam. Memorize it cold: POST=Create, GET=Read, PUT=Update, DELETE=Delete."
    }
  },

  "6.5.c": {
    info: "HTTP status codes indicate the result of an API request. 200 OK = success (GET returned data). 201 Created = new resource created (POST success). 400 Bad Request = client sent invalid data. 401 Unauthorized = authentication required or failed. 403 Forbidden = authenticated but not authorized. 404 Not Found = resource doesn't exist. 500 Internal Server Error = server-side failure. Pattern: 2xx = success, 4xx = client error, 5xx = server error.",
    visual: { type: "layer-stack", params: { layers: ["2xx: Success (200 OK, 201 Created)", "3xx: Redirection", "4xx: Client Error (400, 401, 403, 404)", "5xx: Server Error (500)"], highlight: 0 } },
    hack: {
      memory: "2xx = 'Too good' (success). 4xx = 'FOURbidden/YOUR fault' (client error). 5xx = 'Server FIVE alarm fire' (server error). 200=OK, 201=Created, 401=Unauthorized, 404=Not Found.",
      practice: "Make API calls that intentionally trigger different status codes: a valid GET (200), POST to create (201), bad JSON (400), wrong auth (401), non-existent resource (404).",
      effort: "low",
      meta: "The exam tests specific codes: 200, 201, 400, 401, 403, 404, 500. Know what each means and whether it's a client or server error."
    }
  },

  "6.5.d": {
    info: "REST API authentication methods: API Key — a simple token sent in the header or query parameter, identifies the caller. Bearer Token — an access token (often JWT) sent in the Authorization header as 'Bearer [token]'. OAuth 2.0 — a full authorization framework where users grant limited access to their resources without sharing credentials, using access tokens and refresh tokens. OAuth 2.0 is the most secure and flexible, commonly used by enterprise APIs.",
    visual: { type: "hierarchy", params: { root: "API Authentication", children: [{ name: "API Key", children: [{ name: "Simple header/query param" }] }, { name: "Bearer Token", children: [{ name: "Authorization: Bearer <token>" }] }, { name: "OAuth 2.0", children: [{ name: "Token exchange flow" }] }] } },
    hack: {
      memory: "API Key = your library card (simple ID). Bearer Token = your badge (proves identity). OAuth 2.0 = your company SSO (full authorization framework). Complexity increases left to right.",
      practice: "Get a free API key from a public API. Make requests with it in the header. Then try a Bearer token example. Understanding the mechanics makes the concepts stick.",
      effort: "medium",
      meta: "The exam tests what each method is and when to use it. API key = simplest. Bearer token = common for sessions. OAuth 2.0 = enterprise/delegated access."
    }
  },

  "6.5.e": {
    info: "REST APIs commonly use three data formats: JSON (JavaScript Object Notation) — lightweight, human-readable, most common for REST APIs and network automation. XML (eXtensible Markup Language) — more verbose, uses tags like HTML, common in SOAP APIs and NETCONF. YAML (YAML Ain't Markup Language) — most human-readable, uses indentation, common in Ansible playbooks and configuration files. The CCNA exam focuses primarily on JSON.",
    visual: { type: "comparison", params: { left: { label: "JSON", items: ["{ \"key\": \"value\" }", "Lightweight, most common", "REST APIs standard"] }, right: { label: "XML / YAML", items: ["<key>value</key>", "key: value (YAML)", "NETCONF / Ansible"] } } },
    hack: {
      memory: "JSON = curly braces {}. XML = angle brackets <>. YAML = indentation (no brackets). JSON is king for REST APIs. YAML is king for Ansible. XML is NETCONF's language.",
      practice: "Write the same data structure in all three formats. E.g., a device with hostname, IP, and VLAN. See how each format represents the same information differently.",
      effort: "low",
      meta: "The exam heavily focuses on JSON. Know how to read JSON syntax. Know that XML uses tags and YAML uses indentation. Be able to identify the format at a glance."
    }
  },

  "6.5.f": {
    info: "CRUD (Create, Read, Update, Delete) maps directly to REST API operations: CREATE = POST (send data in request body to create a new resource). READ = GET (retrieve resource data, no request body needed). UPDATE = PUT (replace entire resource) or PATCH (modify specific fields). DELETE = DELETE (remove the resource). The URI identifies WHICH resource, and the HTTP verb defines WHAT to do with it. This consistent mapping is what makes REST intuitive.",
    visual: { type: "comparison", params: { left: { label: "CRUD", items: ["Create", "Read", "Update (full)", "Update (partial)", "Delete"] }, right: { label: "REST", items: ["POST /api/devices", "GET /api/devices/1", "PUT /api/devices/1", "PATCH /api/devices/1", "DELETE /api/devices/1"] } } },
    hack: {
      memory: "CRUD = the four things you can do with data. REST = how you express those four things over HTTP. It's the same concept, different vocabulary.",
      practice: "Use Postman or curl to perform all four CRUD operations against a test API. Create a device (POST), read it (GET), update it (PUT), delete it (DELETE).",
      effort: "medium",
      meta: "This ties together verbs and CRUD. The exam may show an API call and ask 'what CRUD operation is this?' or vice versa. Practice translating both directions."
    }
  },

  // ── 6.6 Recognize configuration management ────────────────────

  "6.6.a": {
    info: "Ansible is an agentless automation tool that connects to devices via SSH (or NETCONF for network devices) and pushes configurations using a push model. No software needs to be installed on managed devices. Configuration is defined in YAML playbooks — human-readable files that describe the desired state. Ansible is idempotent: running a playbook twice produces the same result (it only makes changes if needed). Developed by Red Hat, it's the most popular tool for network automation.",
    visual: { type: "packet-flow", params: { nodes: ["Ansible Control Node", "SSH Push", "Network Devices"], color: "#ef4444" } },
    hack: {
      memory: "Ansible = Agentless + SSH + YAML + Push. No agents on devices, just SSH in and configure. YAML playbooks = recipes that anyone can read.",
      practice: "Install Ansible and write a simple playbook that configures a hostname on a network device (or use a sandbox). Running your first playbook is the best way to understand it.",
      effort: "medium",
      meta: "Ansible is THE most tested config management tool on the CCNA. Know: agentless, SSH, YAML, push model, idempotent. Compare against Puppet/Chef (agent-based, pull model)."
    }
  },

  "6.6.b": {
    info: "Ansible key components: Inventory — a list of managed devices (hosts) organized into groups, defined in INI or YAML format. Playbooks — YAML files containing ordered lists of tasks (plays) to execute. Modules — pre-built units of code for specific tasks (ios_config, ios_command, nxos_config). Roles — reusable, organized collections of playbooks, templates, and variables for sharing and reuse. Together they form a structured automation framework.",
    visual: { type: "hierarchy", params: { root: "Ansible", children: [{ name: "Inventory", children: [{ name: "Hosts & groups" }] }, { name: "Playbooks", children: [{ name: "YAML task lists" }] }, { name: "Modules", children: [{ name: "ios_config, nxos_config" }] }, { name: "Roles", children: [{ name: "Reusable packages" }] }] } },
    hack: {
      memory: "IPMR = Inventory (who), Playbooks (what), Modules (how), Roles (reusable packages). Inventory = guest list. Playbooks = instructions. Modules = tools. Roles = pre-packaged kits.",
      practice: "Create an Ansible directory structure: inventory file listing 3 devices, a playbook with 2 tasks, using the ios_command module. See how the components fit together.",
      effort: "medium",
      meta: "The exam tests component definitions. Know what each component does: inventory = device list, playbook = task sequence, module = action unit, role = reusable bundle."
    }
  },

  "6.6.c": {
    info: "Terraform is an Infrastructure as Code (IaC) tool by HashiCorp that manages infrastructure through declarative configuration files written in HCL (HashiCorp Configuration Language). Unlike Ansible (which focuses on configuring existing devices), Terraform excels at provisioning and lifecycle management of infrastructure — creating, modifying, and destroying cloud resources, VMs, networks, etc. Terraform maintains a state file that tracks the current state of all managed resources.",
    visual: { type: "comparison", params: { left: { label: "Ansible", items: ["Configuration management", "Push model, agentless", "YAML playbooks", "Procedural approach"] }, right: { label: "Terraform", items: ["Infrastructure provisioning", "Declarative state model", "HCL language", "State file tracking"] } } },
    hack: {
      memory: "Terraform = the ARCHITECT that builds the building (infrastructure). Ansible = the ELECTRICIAN that wires it (configuration). Terraform creates resources; Ansible configures them.",
      practice: "Read a simple Terraform HCL file that creates a cloud VM. Compare it to an Ansible playbook that configures a switch. See the difference: provisioning vs configuration.",
      effort: "medium",
      meta: "The exam tests Terraform vs Ansible. Terraform = create/destroy infrastructure (IaC). Ansible = configure existing devices. They're complementary, not competitors."
    }
  },

  "6.6.d": {
    info: "The Terraform workflow has four stages: Init — initializes the working directory, downloads provider plugins. Plan — previews what changes Terraform will make (dry run) without actually changing anything. Apply — executes the planned changes to create, modify, or destroy resources. Destroy — tears down all resources managed by the Terraform configuration. The plan stage is critical — it shows you exactly what will happen before you commit.",
    visual: { type: "state-machine", params: { states: ["terraform init", "terraform plan", "terraform apply", "terraform destroy"], active: 2, transitions: true } },
    hack: {
      memory: "Init, Plan, Apply, Destroy = IPAD. Init = download tools. Plan = preview changes. Apply = do it. Destroy = tear it down. Always PLAN before you APPLY.",
      practice: "Walk through the workflow mentally: init (setup) -> plan (dry run) -> apply (execute) -> destroy (cleanup). Know what each command does and when to use it.",
      effort: "low",
      meta: "The exam tests the four Terraform stages in order. Know: init = setup, plan = preview, apply = execute, destroy = teardown. Plan is the safety net."
    }
  },

  "6.6.e": {
    info: "Ansible vs Terraform: Ansible is best for configuration management (configuring existing devices — setting hostnames, ACLs, VLANs) using a procedural, push model with SSH. Terraform is best for infrastructure provisioning (creating and managing cloud resources — VMs, networks, load balancers) using a declarative, state-based model. Many organizations use BOTH: Terraform to create the infrastructure, then Ansible to configure it. They solve different problems.",
    visual: { type: "comparison", params: { left: { label: "Ansible", items: ["Config management", "Procedural (do this, then this)", "Agentless / SSH", "YAML playbooks", "Best for: network device config"] }, right: { label: "Terraform", items: ["Infrastructure provisioning", "Declarative (desired state)", "State file tracking", "HCL language", "Best for: cloud infra creation"] } } },
    hack: {
      memory: "Terraform BUILDS the house. Ansible FURNISHES the house. You need both. Terraform = infrastructure. Ansible = configuration. Use the right tool for the job.",
      practice: "Given a scenario, choose the tool: 'Deploy 50 VMs in AWS' = Terraform. 'Configure OSPF on 50 routers' = Ansible. 'Create a VPC with subnets' = Terraform. 'Push ACLs to switches' = Ansible.",
      effort: "low",
      meta: "The exam gives use-case scenarios and asks which tool to use. Infrastructure creation = Terraform. Device configuration = Ansible. This is a common question format."
    }
  },

  "6.6.f": {
    info: "Puppet and Chef are agent-based configuration management tools that use a pull model. An agent installed on each managed device periodically checks in with a central server to pull its desired configuration and apply it locally. Puppet uses a declarative DSL (Puppet language). Chef uses Ruby-based recipes. Both enforce desired state continuously — if someone manually changes a config, the agent pulls the correct config and reverts the change. They are less common in network automation than Ansible.",
    visual: { type: "comparison", params: { left: { label: "Ansible (Push)", items: ["Agentless — SSH", "Runs on demand", "YAML playbooks", "Most popular for networking"] }, right: { label: "Puppet/Chef (Pull)", items: ["Agent installed on device", "Periodic pull from server", "DSL / Ruby recipes", "More common for servers"] } } },
    hack: {
      memory: "Push (Ansible) = YOU send the config. Pull (Puppet/Chef) = the DEVICE asks for the config. Push = on-demand. Pull = periodic check-in. Ansible = no agent. Puppet/Chef = agent required.",
      practice: "Compare all three: Ansible (agentless/push/YAML), Puppet (agent/pull/DSL), Chef (agent/pull/Ruby). Build a 3-column comparison table.",
      effort: "low",
      meta: "The exam tests push vs pull and agent vs agentless. Ansible = agentless push (most popular for network). Puppet/Chef = agent-based pull (more for servers)."
    }
  },

  // ── 6.7 Recognize JSON-encoded data ───────────────────────────

  "6.7.a": {
    info: "A JSON object is enclosed in curly braces { } and contains key-value pairs separated by commas. Keys must be strings in double quotes. Values can be strings, numbers, booleans, null, arrays, or nested objects. Example: {\"hostname\": \"SW1\", \"ip\": \"10.0.0.1\", \"vlans\": [10, 20]}. JSON objects represent structured data — similar to a Python dictionary or JavaScript object. They are the fundamental building block of JSON data.",
    visual: { type: "encapsulation", params: { layers: [{ label: "{ } JSON Object (curly braces)", color: "#f59e0b" }, { label: "\"key\": \"value\" pairs", color: "#3b82f6" }, { label: "Separated by commas", color: "#10b981" }] } },
    hack: {
      memory: "Curly braces = Object = key:value pairs. Think of { } as a container/box holding labeled items. Every key is a string in double quotes.",
      practice: "Write a JSON object representing a network device: hostname, management IP, model, serial number, list of interfaces. Validate it at jsonlint.com.",
      effort: "low",
      meta: "The exam shows JSON snippets and asks you to identify objects vs arrays or find specific values. Practice reading JSON until it's as natural as reading a config file."
    }
  },

  "6.7.b": {
    info: "A JSON array is enclosed in square brackets [ ] and contains an ordered list of values separated by commas. Values can be any JSON type: strings, numbers, objects, other arrays, booleans, or null. Arrays can contain mixed types but typically hold similar items. Example: {\"vlans\": [10, 20, 30]} or {\"devices\": [{\"name\": \"SW1\"}, {\"name\": \"SW2\"}]}. Arrays are used for lists, collections, and sequences of data.",
    visual: { type: "encapsulation", params: { layers: [{ label: "[ ] JSON Array (square brackets)", color: "#8b5cf6" }, { label: "Ordered list of values", color: "#3b82f6" }, { label: "Separated by commas", color: "#10b981" }] } },
    hack: {
      memory: "Square brackets = Array = ordered list. [ ] looks like a shelf holding items in order. { } = one thing with properties. [ ] = many things in a list.",
      practice: "Write a JSON array of 3 device objects, each with hostname and IP. Then write an array of just VLAN numbers. Practice both object-arrays and simple arrays.",
      effort: "low",
      meta: "The exam tests: { } = object, [ ] = array. If you see curly braces, it's an object. Square brackets, it's an array. Know the visual difference instantly."
    }
  },

  "6.7.c": {
    info: "JSON supports six data types: String — text in double quotes (\"hello\"). Number — integer or decimal, no quotes (42, 3.14). Boolean — true or false, no quotes (true). Null — represents empty/no value (null). Object — nested { } with key-value pairs. Array — nested [ ] with ordered values. Note: JSON has no date type, no comment syntax, and no distinction between integer and float — all numbers are the same type.",
    visual: { type: "layer-stack", params: { layers: ["String: \"hello\"", "Number: 42 or 3.14", "Boolean: true / false", "Null: null", "Object: { } (nested)", "Array: [ ] (nested)"], highlight: 0 } },
    hack: {
      memory: "6 types: String, Number, Boolean, Null, Object, Array. SNBNOA. Strings get quotes, Numbers/Booleans/Null do NOT. Objects and Arrays nest infinitely.",
      practice: "Write a JSON document that uses all 6 types in one structure. Include a string, number, boolean, null, nested object, and array. Validate it.",
      effort: "low",
      meta: "The exam may ask 'which is a valid JSON data type?' Know all six. The trap: there's no 'date' type and no 'undefined' (that's JavaScript, not JSON)."
    }
  },

  "6.7.d": {
    info: "JSON supports nesting — objects can contain other objects or arrays, and arrays can contain objects or other arrays, to any depth. This allows complex hierarchical data structures. Example: a network device object containing an array of interfaces, where each interface is an object with its own properties (name, IP, status, VLAN). Nesting is how JSON represents real-world hierarchical relationships. Access nested data with dot notation or bracket notation: device.interfaces[0].ip.",
    visual: { type: "hierarchy", params: { root: "{ device }", children: [{ name: "hostname: \"SW1\"" }, { name: "interfaces: [...]", children: [{ name: "{ name: \"Gi0/1\", ip: \"10.0.0.1\" }" }, { name: "{ name: \"Gi0/2\", ip: \"10.0.0.2\" }" }] }] } },
    hack: {
      memory: "Nesting = Russian dolls. Objects inside objects inside arrays. To read nested JSON, follow the path: device -> interfaces -> [0] -> ip. Each arrow goes one level deeper.",
      practice: "Given nested JSON, practice extracting specific values. E.g., 'What is the IP of the first interface?' Follow the path through the nesting levels.",
      effort: "low",
      meta: "The exam shows nested JSON and asks you to identify the value at a specific path. Practice reading nested structures and tracing paths to specific values."
    }
  },

  "6.7.e": {
    info: "Valid JSON has strict syntax rules: all keys MUST be in double quotes (single quotes are invalid). No trailing commas (a comma after the last item is invalid). No comments (// and /* */ are not allowed in JSON). Strings use double quotes only (not single quotes). Numbers cannot have leading zeros (01 is invalid, 0.1 is valid). Boolean values are lowercase only (true/false, not True/False). Understanding valid vs invalid JSON is essential for debugging API responses.",
    visual: { type: "comparison", params: { left: { label: "VALID JSON", items: ["{\"name\": \"SW1\"}", "{\"vlans\": [10, 20]}", "{\"enabled\": true}"] }, right: { label: "INVALID JSON", items: ["{'name': 'SW1'} (single quotes)", "{\"vlans\": [10, 20,]} (trailing comma)", "{\"enabled\": True} (capital T)"] } } },
    hack: {
      memory: "JSON rules: DOUBLE quotes only, NO trailing commas, NO comments, lowercase true/false/null. If it breaks, check these four things first.",
      practice: "Write 5 invalid JSON examples and fix each one. Include: single quotes, trailing comma, comment, capitalized True, missing quotes on a key. Use jsonlint.com to validate.",
      effort: "low",
      meta: "The exam shows JSON and asks 'which is valid?' The traps are: single quotes, trailing commas, comments, and capitalized booleans. Know what makes JSON invalid."
    }
  }

};
