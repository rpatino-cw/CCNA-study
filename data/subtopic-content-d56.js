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
    info: "<p>A <strong>threat</strong> is any potential danger that could exploit a vulnerability and cause harm to a system, network, or organization. In security terminology, the threat is the <em>who</em> or <em>what</em> that poses the danger — not the weakness itself and not the technique used to attack.</p><p>Threats fall into several categories. <strong>External threats</strong> include hackers, organized crime groups, nation-state actors, and script kiddies using automated tools. <strong>Internal threats</strong> come from disgruntled employees, careless users, or contractors with excess access. <strong>Environmental threats</strong> include natural disasters (floods, earthquakes, power outages) that can destroy infrastructure. <strong>Accidental threats</strong> arise from misconfigurations, human error, and poor change management.</p><p>The CCNA exam uses a specific vocabulary chain: <strong>Threat</strong> (the actor/danger) exploits a <strong>Vulnerability</strong> (the weakness) using an <strong>Exploit</strong> (the technique/tool) to cause an <strong>Impact</strong> (the damage). Understanding this chain is essential because scenario questions will describe a situation and ask you to identify which term applies.</p><ul><li><strong>Structured threats</strong> — highly motivated, technically skilled attackers (APTs, nation-states)</li><li><strong>Unstructured threats</strong> — script kiddies, opportunistic attackers using pre-built tools</li><li><strong>Internal threats</strong> — employees, contractors, or partners with legitimate access</li></ul>",
    visual: { type: "shield", params: { items: ["Attackers", "Malware", "Natural Disasters", "Insider Threats"], color: "#ef4444" } },
    hack: {
      memory: "Threat = the TIGER outside the fence. It wants in, but it needs a hole (vulnerability) to get through. The tiger is the danger, not the hole.",
      practice: "Create flashcards with 10 scenarios. For each, classify it as a threat, vulnerability, exploit, or mitigation. Example: 'A disgruntled employee with admin access' = threat. 'An unpatched server running SMBv1' = vulnerability. Drill until instant recognition.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51 (Network Security Fundamentals). Wendell Odom OCG Chapter 27 (Security Architectures). Most students confuse threat vs vulnerability — the exam loves 'which term best describes...' scenario questions."
    }
  },

  "5.1.b": {
    info: "<p>A <strong>vulnerability</strong> is a weakness or flaw in a system, software, configuration, or process that can be exploited by a threat actor. Vulnerabilities are <em>passive</em> — they exist whether or not anyone exploits them. They represent the gap in your defenses that an attacker could use to gain unauthorized access or cause damage.</p><p>Vulnerabilities exist at every layer of the network stack:</p><ul><li><strong>Software vulnerabilities</strong> — unpatched operating systems, outdated firmware, known CVEs (Common Vulnerabilities and Exposures) in applications</li><li><strong>Configuration vulnerabilities</strong> — default credentials left unchanged, open ports with no ACLs, misconfigured firewalls, unnecessary services running</li><li><strong>Design vulnerabilities</strong> — weak encryption algorithms (WEP, DES), protocols that transmit in cleartext (Telnet, HTTP, SNMPv1/v2c)</li><li><strong>Human vulnerabilities</strong> — weak passwords, susceptibility to social engineering, lack of security awareness training</li><li><strong>Physical vulnerabilities</strong> — unlocked server rooms, exposed console ports, unmonitored wiring closets</li></ul><p>The relationship between vulnerabilities and risk is direct: <strong>Risk = Threat x Vulnerability x Impact</strong>. Reducing vulnerabilities (through patching, hardening, and proper configuration) is the most controllable way to reduce overall risk. The CCNA exam frequently pairs vulnerabilities with their specific mitigations — if you know the weakness, you should immediately know the fix.</p>",
    visual: { type: "shield", params: { items: ["Unpatched Software", "Default Credentials", "Open Ports", "Misconfigurations"], color: "#f59e0b" } },
    hack: {
      memory: "Vulnerability = the HOLE in the fence. The tiger (threat) gets in through the hole. The hole exists even if no tiger ever comes — it's still a weakness.",
      practice: "Run a mental audit of a default Cisco switch config. List 5 vulnerabilities: no enable secret, Telnet enabled, no port security, no DHCP snooping, no banners. For each, write the hardening command that fixes it.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51 (Network Security Fundamentals). Wendell Odom OCG Chapter 27. Cisco pairs vulnerability with mitigation in exam questions — know common weakness-fix pairs cold."
    }
  },

  "5.1.c": {
    info: "<p>An <strong>exploit</strong> is the specific technique, tool, code, or method used to take advantage of a vulnerability. Exploits are the <em>action</em> that bridges the gap between a vulnerability existing and actual damage occurring. Without an exploit, a vulnerability is just a theoretical weakness; the exploit makes it a real attack.</p><p>Exploits take many forms depending on the vulnerability they target:</p><ul><li><strong>Buffer overflow</strong> — sending more data than a program's buffer can hold, overwriting adjacent memory to inject malicious code or crash the application. This is one of the oldest and most dangerous exploit classes.</li><li><strong>SQL injection</strong> — inserting malicious SQL commands into web form inputs to manipulate backend databases, extract data, or bypass authentication</li><li><strong>Cross-site scripting (XSS)</strong> — injecting malicious scripts into web pages viewed by other users</li><li><strong>Brute-force attacks</strong> — systematically trying every possible password combination until the correct one is found</li><li><strong>Zero-day exploits</strong> — attacks against vulnerabilities that have no patch available yet, making them extremely dangerous</li></ul><p>The attack lifecycle follows a predictable chain: a <strong>threat actor</strong> identifies a <strong>vulnerability</strong>, develops or obtains an <strong>exploit</strong> to target it, and uses it to cause <strong>impact</strong>. Understanding this chain helps you identify where to apply mitigations — you can reduce threats (access controls), reduce vulnerabilities (patching, hardening), or disrupt exploits (IPS, firewalls).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Attacker", "Exploit Code", "Vulnerability", "Compromised System"], color: "#ef4444" } },
    hack: {
      memory: "Exploit = the LOCKPICK that fits the hole. Threat has the lockpick, vulnerability is the lock, exploit is the action of picking it. Always the ACTION, never the weakness.",
      practice: "Map three attack chains on paper: 1) Hacker -> unpatched Apache -> buffer overflow -> web server compromised. 2) Phisher -> untrained user -> fake login page -> credentials stolen. 3) Insider -> excessive privileges -> data exfiltration -> IP theft. Label each element as threat/vulnerability/exploit/impact.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. The exam tests the attack lifecycle — exploit is always the action/technique, never the weakness itself. Buffer overflow is the most commonly cited exploit example."
    }
  },

  "5.1.d": {
    info: "<p><strong>Mitigation</strong> (also called a countermeasure or control) is any action, device, procedure, or technique that reduces the likelihood or impact of a security threat. Mitigation does not eliminate risk entirely — it reduces it to an <strong>acceptable level</strong>. The goal is to make attacks more difficult, more expensive, or less rewarding for the attacker.</p><p>Mitigations are categorized by how they work:</p><ul><li><strong>Preventive controls</strong> — stop attacks before they happen: firewalls, ACLs, port security, encryption, strong authentication</li><li><strong>Detective controls</strong> — identify attacks in progress or after the fact: IDS, syslog, SNMP monitoring, security cameras</li><li><strong>Corrective controls</strong> — fix damage after an attack: backups, disaster recovery plans, incident response procedures</li><li><strong>Deterrent controls</strong> — discourage attackers from attempting: login banners, security cameras, legal warnings</li></ul><p>For the CCNA, specific mitigations map to specific threats:</p><ul><li>Social engineering/phishing → <strong>user awareness training</strong></li><li>Unauthorized access → <strong>AAA (RADIUS/TACACS+), ACLs, port security</strong></li><li>ARP spoofing → <strong>Dynamic ARP Inspection (DAI)</strong></li><li>Rogue DHCP → <strong>DHCP snooping</strong></li><li>Eavesdropping → <strong>encryption (IPsec VPN, SSH, WPA2/WPA3)</strong></li><li>Brute force → <strong>login block-for, account lockout, MFA</strong></li></ul>",
    visual: { type: "shield", params: { items: ["Patching", "Firewalls", "ACLs", "Encryption", "Training"], color: "#10b981" } },
    hack: {
      memory: "Mitigation = MENDING the fence. Patch the holes, add barbed wire, post guards. Each attack type has a specific best mitigation — learn the pairs.",
      practice: "Build a two-column flashcard deck: left side = attack type, right side = best Cisco mitigation. Phishing = training. ARP spoof = DAI. Rogue DHCP = DHCP snooping. Brute force = login block-for. Drill until automatic.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. Cisco loves 'which is the best mitigation for X?' questions. The answer is always the most SPECIFIC control, not a general one."
    }
  },

  "5.1.e": {
    info: "<p><strong>Social engineering</strong> is the broader category of attacks that manipulate human psychology to bypass security controls. Rather than attacking technology, social engineers exploit trust, fear, urgency, and helpfulness to trick people into revealing information or performing actions that compromise security. <strong>Phishing</strong> is the most common and most tested form of social engineering.</p><p>Key social engineering attack types for the CCNA:</p><ul><li><strong>Phishing</strong> — mass emails impersonating trusted entities (banks, IT department) with malicious links or attachments designed to steal credentials or install malware</li><li><strong>Spear phishing</strong> — targeted phishing aimed at a specific individual or organization, using personalized information to increase credibility</li><li><strong>Whaling</strong> — spear phishing specifically targeting executives (the 'big fish') with high-value access</li><li><strong>Vishing</strong> — voice phishing via phone calls, often impersonating IT support or authority figures</li><li><strong>Smishing</strong> — SMS/text message phishing with malicious links</li><li><strong>Pretexting</strong> — creating a fabricated scenario to manipulate the target (e.g., 'I'm from IT, I need your password to fix your account')</li><li><strong>Tailgating/piggybacking</strong> — physically following an authorized person through a secured door without badging in</li></ul><p>The critical exam point: <strong>user awareness training is the primary mitigation for social engineering</strong>. Technical controls (spam filters, URL filtering) help but cannot stop a well-crafted social engineering attack. The human is both the target and the defense — trained users become security sensors rather than security holes.</p>",
    visual: { type: "packet-flow", params: { nodes: ["Attacker", "Fake Email", "Victim Clicks", "Credentials Stolen"], color: "#f59e0b" } },
    hack: {
      memory: "PHISHing = fishing for passwords. SPEAR phishing = aimed at one fish. WHALING = going after the big fish (CEO). VISHING = Voice phishing. SMISHING = SMS phishing. Each variant starts with a clue in the name.",
      practice: "Review 5 real phishing examples at phishingquiz.withgoogle.com. For each, identify: the urgency trigger, the spoofed sender, the suspicious URL, and the action requested. Then classify each as phishing, spear phishing, or whaling.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. If the exam asks 'what is the best defense against phishing?' the answer is ALWAYS user awareness training — not a firewall, not an IPS."
    }
  },

  "5.1.f": {
    info: "<p><strong>Denial of Service (DoS)</strong> attacks overwhelm a target system with traffic or requests, consuming its resources (bandwidth, CPU, memory, connection tables) until it can no longer serve legitimate users. The goal is not to steal data but to make a service <strong>unavailable</strong>.</p><p>A <strong>single-source DoS</strong> originates from one attacker. A <strong>Distributed DoS (DDoS)</strong> uses hundreds or thousands of compromised systems (a <strong>botnet</strong>) to generate attack traffic simultaneously, making it exponentially harder to block because the traffic comes from many different legitimate-looking IP addresses.</p><p>Common DoS/DDoS attack types:</p><ul><li><strong>SYN flood</strong> — sends thousands of TCP SYN packets without completing the 3-way handshake, filling the target's connection table with half-open connections</li><li><strong>UDP flood</strong> — overwhelms a target with UDP packets to random ports, forcing the target to respond with ICMP Destination Unreachable messages</li><li><strong>ICMP flood (ping flood/smurf)</strong> — floods the target with ICMP Echo Requests, consuming bandwidth and processing power</li><li><strong>Amplification/reflection attacks</strong> — exploits protocols like DNS or NTP where a small query generates a large response, amplifying traffic volume by 50-100x when reflected off public servers toward the victim</li><li><strong>Application-layer attacks (Layer 7)</strong> — targets specific services like HTTP with legitimate-looking requests that consume server resources (Slowloris, HTTP flood)</li></ul><p>Mitigations include <strong>rate limiting</strong>, <strong>SYN cookies</strong> (for SYN floods), <strong>blackhole routing</strong> (sending attack traffic to null), <strong>scrubbing centers</strong> (cloud services like Cloudflare or Akamai that filter attack traffic), and <strong>ingress filtering</strong> (BCP38/RFC 2827 to prevent IP spoofing at network edges).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Botnet (1000s)", "Flood Traffic", "Target Server", "Legitimate Users Blocked"], color: "#ef4444" } },
    hack: {
      memory: "DoS = one person blocking a doorway. DDoS = a flash mob blocking every entrance. The 'D' means DISTRIBUTED — many zombies (botnet) attacking at once. SYN flood = most common type.",
      practice: "In Packet Tracer, configure 'ip tcp intercept' or rate limiting on a router to mitigate SYN floods. Also configure 'no ip directed-broadcast' to prevent smurf attacks. These are real Cisco mitigations.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. Know DoS vs DDoS (single vs distributed), SYN flood mechanics, and that DDoS requires distributed mitigation (scrubbing centers, not just ACLs)."
    }
  },

  "5.1.g": {
    info: "<p>A <strong>Man-in-the-Middle (MITM)</strong> attack occurs when an attacker secretly positions themselves between two communicating parties, intercepting and potentially altering traffic without either party's knowledge. The attacker can eavesdrop on confidential data, modify messages in transit, or inject malicious content.</p><p>The two primary Layer 2 MITM attacks tested on the CCNA are:</p><ul><li><strong>ARP spoofing/poisoning</strong> — the attacker sends gratuitous ARP replies to the victim claiming that the attacker's MAC address is associated with the default gateway's IP address. The victim's ARP cache gets poisoned, and all traffic intended for the gateway now flows through the attacker. The attacker forwards it onward so the connection still works, making the attack invisible to the user. Mitigation: <strong>Dynamic ARP Inspection (DAI)</strong>.</li><li><strong>DHCP spoofing</strong> — the attacker sets up a rogue DHCP server on the network that responds to DHCP Discover messages faster than the legitimate server. The rogue server assigns itself as the default gateway, DNS server, or both, redirecting all traffic through the attacker. Mitigation: <strong>DHCP snooping</strong> (only allows DHCP server messages on trusted ports).</li></ul><p>Other MITM variants include <strong>DNS spoofing</strong> (poisoning DNS responses to redirect users to fake websites) and <strong>SSL stripping</strong> (downgrading HTTPS connections to HTTP). The common thread is that the attacker intercepts the communication channel itself. Encryption (HTTPS, IPsec, SSH) is the strongest general mitigation because even if traffic is intercepted, it cannot be read or modified.</p>",
    visual: { type: "handshake", params: { leftLabel: "Client", rightLabel: "Server", steps: ["ARP Request (Who has GW?) ->", "<- Fake ARP Reply (Attacker's MAC)", "Traffic now flows through Attacker"] } },
    hack: {
      memory: "MITM = the postal worker who opens your mail, reads it, reseals it, and delivers it. You never know. ARP spoofing = lying about your address. DHCP spoofing = giving out fake directions.",
      practice: "In a Packet Tracer lab, enable DHCP snooping and DAI on a switch. Configure the server-facing port as trusted. Attempt to connect a rogue DHCP server on an untrusted port and verify it gets blocked. This ties directly into 5.7.",
      effort: "high",
      meta: "Jeremy's IT Lab Day 51 + Day 53 (DHCP Snooping/DAI). Wendell Odom OCG Chapter 27 + Chapter 30. ARP spoofing and DHCP spoofing are THE two MITM examples Cisco tests. Study mitigations (DAI, DHCP snooping) in section 5.7."
    }
  },

  "5.1.h": {
    info: "<p><strong>Malware</strong> (malicious software) is any software intentionally designed to damage, disrupt, or gain unauthorized access to computer systems. The CCNA exam tests your ability to distinguish between malware types based on their <strong>propagation method</strong> and <strong>primary behavior</strong>.</p><p>Key malware types:</p><ul><li><strong>Virus</strong> — attaches itself to legitimate files or programs. Requires <strong>user action</strong> to spread (opening an infected file, running an infected program). Cannot self-replicate across the network on its own. Example: a macro virus embedded in a Word document.</li><li><strong>Worm</strong> — <strong>self-replicating</strong> malware that spreads across networks without any user interaction. Worms exploit vulnerabilities in network services to propagate automatically. They consume bandwidth and system resources as they spread. Example: the SQL Slammer worm spread to 75,000 hosts in 10 minutes.</li><li><strong>Trojan horse</strong> — disguises itself as legitimate software to trick users into installing it. Does NOT self-replicate. Once installed, the hidden payload can create backdoors, steal data, or install additional malware. Example: a fake 'free antivirus' that actually installs a keylogger.</li><li><strong>Ransomware</strong> — encrypts the victim's files and demands payment (usually cryptocurrency) for the decryption key. Modern ransomware often combines with worm capabilities for rapid spread and adds data exfiltration ('double extortion'). Example: WannaCry, which used the EternalBlue exploit to spread as a worm.</li></ul><p>Additional malware types to know: <strong>Spyware</strong> (secretly monitors user activity), <strong>Adware</strong> (displays unwanted advertisements), <strong>Rootkit</strong> (hides deep in the OS to maintain persistent access), and <strong>Keylogger</strong> (records keystrokes to capture passwords). The primary exam differentiator is <strong>how the malware spreads</strong>: worms are automatic, viruses need user action, and trojans use deception.</p>",
    visual: { type: "comparison", params: { left: { label: "Self-Spreading", items: ["Worm — network propagation", "No user action needed", "Consumes bandwidth"] }, right: { label: "User-Activated", items: ["Virus — attaches to files", "Trojan — disguised payload", "Ransomware — encrypts data"] } } },
    hack: {
      memory: "WORM = Wriggles On its own through the network (no user needed). VIRUS = Very Infected, Requires User Start. TROJAN = looks like a gift, soldiers hide inside. RANSOM = your files are kidnapped, pay to get them back.",
      practice: "Create a comparison table from memory: Malware Type | How It Spreads | User Action Required? | Primary Damage | Example. Fill it for virus, worm, trojan, and ransomware. Then add spyware and rootkit as bonus rows.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. The exam loves 'which malware type does X?' questions. The KEY differentiator is propagation: worm = automatic, virus = user action, trojan = deception."
    }
  },

  // ── 5.2 Describe security program elements ────────────────────

  "5.2.a": {
    info: "<p><strong>User awareness programs</strong> educate all employees about security threats, organizational policies, and safe computing practices. This is the <strong>first line of defense</strong> against social engineering, phishing, and insider threats — because the most sophisticated firewall in the world cannot stop a user from voluntarily entering their credentials into a fake login page.</p><p>An effective security awareness program includes multiple components:</p><ul><li><strong>Regular training sessions</strong> — mandatory annual (or quarterly) training covering current threats, password hygiene, data handling, and the organization's acceptable use policy (AUP)</li><li><strong>Simulated phishing campaigns</strong> — sending fake phishing emails to employees to test their ability to recognize and report them, with follow-up training for those who click</li><li><strong>Clear reporting procedures</strong> — employees must know exactly how to report suspicious emails, lost devices, or potential security incidents (a helpdesk ticket, a dedicated email address, etc.)</li><li><strong>Acceptable Use Policies (AUP)</strong> — written policies defining what employees can and cannot do with company systems, including personal device use, social media, and data sharing</li></ul><p>The goal is to transform every user from a potential vulnerability into a <strong>security sensor</strong> who can recognize and report threats. The CCNA exam consistently frames user awareness as THE primary mitigation for social engineering attacks. If a question describes a phishing attack and asks for the best defense, the answer is training — not a technical control.</p>",
    visual: { type: "hierarchy", params: { root: "Security Program", children: [{ name: "User Awareness", children: [{ name: "Phishing Simulations" }, { name: "Policy Training" }, { name: "Reporting Procedures" }] }] } },
    hack: {
      memory: "Users are the weakest link AND the first line of defense. Awareness training turns liabilities into sensors. Technology can't fix a user who willingly hands over their password.",
      practice: "Download a sample Acceptable Use Policy template (SANS has free ones). Read it and identify 5 common violations: personal USB drives, sharing passwords, clicking unknown links, tailgating, using public WiFi for work. These show up as exam scenarios.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. Cisco ALWAYS frames user awareness as the answer for social engineering mitigation. If the question is about phishing defense, think training first, technology second."
    }
  },

  "5.2.b": {
    info: "<p><strong>Security training</strong> goes beyond basic awareness by providing <strong>role-specific technical education</strong> to IT staff, security teams, and personnel with elevated access. While awareness tells everyone 'the stove is hot,' training teaches the right people <em>how to put out fires</em>.</p><p>Security training includes:</p><ul><li><strong>Incident response training</strong> — teaching IT staff how to identify, contain, eradicate, and recover from security incidents following established runbooks</li><li><strong>Secure configuration and hardening</strong> — training network engineers on proper device hardening (disabling unused services, SSH over Telnet, strong passwords, ACLs)</li><li><strong>Compliance training</strong> — role-specific requirements for PCI-DSS (payment handling), HIPAA (healthcare data), SOX (financial reporting), or GDPR (data privacy)</li><li><strong>Tabletop exercises</strong> — simulated incident scenarios where teams walk through their response procedures without actual system changes</li><li><strong>Penetration testing awareness</strong> — understanding how attackers think, so defenders can anticipate and prevent attack techniques</li></ul><p>The key distinction for the exam: <strong>awareness</strong> is for ALL employees (general security hygiene), while <strong>training</strong> is for technical/specialized staff (specific skills and procedures). Training should be ongoing and include hands-on practice — a one-time presentation is awareness, not training. Organizations should also conduct <strong>regular assessments</strong> to verify that training is effective and being retained.</p>",
    visual: { type: "hierarchy", params: { root: "Security Training", children: [{ name: "IT Staff", children: [{ name: "Incident Response" }, { name: "Hardening" }] }, { name: "All Employees", children: [{ name: "Policy Compliance" }, { name: "Phishing Tests" }] }] } },
    hack: {
      memory: "Awareness = knowing the stove is hot (everyone). Training = knowing HOW to put out the fire (technical staff). Both matter, but the exam tests which is which.",
      practice: "Create two lists: 'Awareness topics' (phishing recognition, password hygiene, clean desk, reporting) and 'Training topics' (incident response, hardening configs, forensics, pen testing). If an exam question specifies IT staff, pick from the training list.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. The exam distinguishes awareness (general users) from training (technical/role-specific). If the question specifies IT staff or incident response, the answer is training."
    }
  },

  "5.2.c": {
    info: "<p><strong>Physical access controls</strong> prevent unauthorized individuals from physically entering secure areas like server rooms, wiring closets, and data centers. Physical security is the foundation of all security — if an attacker can physically touch a device, most logical security controls can be bypassed.</p><p>Key physical access controls for the CCNA:</p><ul><li><strong>Badge readers / proximity cards</strong> — use RFID or smart card technology to authenticate users at entry points. Each badge is uniquely assigned, creating an audit trail of who entered and when.</li><li><strong>Mantraps (security vestibules)</strong> — small rooms with two interlocking doors where only one door can be open at a time. A person enters through door 1, it closes and locks, then door 2 opens after authentication. This <strong>specifically prevents tailgating</strong> — an unauthorized person following an authorized person through a door.</li><li><strong>Biometric scanners</strong> — fingerprint readers, iris scanners, or facial recognition for high-security areas. These are 'something you are' and cannot be shared or stolen like a badge.</li><li><strong>Security guards</strong> — human verification at entry points, visitor escort policies, and response capability. Guards can make judgment calls that automated systems cannot.</li><li><strong>Key locks and cipher locks</strong> — mechanical or combination locks for lower-security areas like wiring closets</li></ul><p>Physical access controls follow a layered approach (defense in depth): perimeter fence → building entrance (guard + badge) → server room (mantrap + biometric) → individual rack (cage lock). Each layer adds difficulty for an unauthorized person.</p>",
    visual: { type: "handshake", params: { leftLabel: "Person", rightLabel: "Secure Area", steps: ["Badge Scan ->", "<- Door 1 Opens", "Enter Vestibule, Door 1 Closes ->", "<- Door 2 Opens (Authenticated)"] } },
    hack: {
      memory: "MANTRAP = MAN gets TRAPPED between two doors. Like an airlock — you can't piggyback through. It specifically defeats TAILGATING.",
      practice: "Draw a layered physical security diagram for a data center: perimeter fence with gate → badge reader at building entrance → mantrap at server room → biometric at rack cage. Label what each control prevents.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. Mantrap/security vestibule is a favorite exam question — it specifically prevents tailgating. Know the term 'security vestibule' as Cisco's preferred modern term."
    }
  },

  "5.2.d": {
    info: "<p><strong>Surveillance systems</strong> monitor physical spaces to detect, deter, and record unauthorized activity. They serve three security functions simultaneously: <strong>deterrence</strong> (people behave differently when they know they're being watched), <strong>detection</strong> (catching incidents in progress), and <strong>forensics</strong> (providing evidence for investigation after events).</p><p>Key surveillance components:</p><ul><li><strong>CCTV cameras (Closed-Circuit Television)</strong> — provide continuous video monitoring and recording of sensitive areas. Modern IP cameras can integrate with analytics software for motion detection, facial recognition, and behavior analysis. Coverage should include all entry/exit points, server rooms, and sensitive areas.</li><li><strong>Motion sensors</strong> — detect physical movement in restricted areas and trigger alerts or alarms. Useful for areas that should have no activity during certain hours (server rooms at night, wiring closets on weekends).</li><li><strong>Video analytics</strong> — AI-powered systems that analyze camera feeds in real-time to detect anomalies like unauthorized access, loitering, or removed objects</li><li><strong>Access logs</strong> — electronic records from badge systems showing who entered which areas and when, providing a digital audit trail</li></ul><p>In the context of security control categories: surveillance systems are primarily <strong>detective controls</strong> (they identify when something happens) and <strong>deterrent controls</strong> (they discourage bad behavior). They are NOT preventive controls — a camera cannot physically stop someone from entering an area, only record that they did.</p>",
    visual: { type: "shield", params: { items: ["CCTV Cameras", "Motion Sensors", "Deterrence", "Detection", "Forensics"], color: "#6366f1" } },
    hack: {
      memory: "Cameras have three D's: Deter, Detect, Document (forensics). Motion sensors ALERT. Together they're the eyes and ears of physical security.",
      practice: "Classify each physical security control as preventive, detective, deterrent, or corrective. Cameras = detective + deterrent. Locks = preventive. Guards = preventive + detective. Backup generator = corrective. The exam tests these categories.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. Low exam depth on surveillance specifics, but know that cameras and motion sensors are detective/deterrent controls — they record and discourage but don't physically prevent."
    }
  },

  "5.2.e": {
    info: "<p><strong>Environmental controls</strong> protect network equipment from physical and environmental threats beyond human intrusion — theft, fire, heat, power loss, and accidental damage. These controls ensure the physical infrastructure supporting the network remains operational and secure.</p><p>Key environmental controls:</p><ul><li><strong>Cable locks</strong> — physically secure laptops, monitors, and portable equipment to desks or racks using steel cables and keyed or combination locks. Prevents opportunistic theft in shared spaces.</li><li><strong>Equipment cages and locked cabinets</strong> — metal enclosures that restrict physical access to network gear (switches, routers, patch panels) in shared spaces like open offices or multi-tenant data centers. Only authorized personnel have keys.</li><li><strong>Fire suppression</strong> — FM-200 or Novec 1230 clean agent systems that extinguish fires without damaging electronics (unlike water sprinklers). Data centers require specialized suppression that won't destroy the equipment it's protecting.</li><li><strong>HVAC (Heating, Ventilation, Air Conditioning)</strong> — maintains proper temperature (64-75F / 18-24C) and humidity (40-60%) to prevent equipment overheating and component failure</li><li><strong>UPS (Uninterruptible Power Supply)</strong> — provides battery backup during power outages, giving enough time to safely shut down equipment or switch to generator power</li><li><strong>Cable management</strong> — organized cable routing prevents accidental disconnections, improves airflow for cooling, and makes troubleshooting easier</li></ul><p>Environmental controls are classified as <strong>physical/environmental security</strong> in the security framework. They protect the availability pillar of the CIA triad — ensuring equipment stays powered, cooled, and physically intact.</p>",
    visual: { type: "shield", params: { items: ["Cable Locks", "Equipment Cages", "Fire Suppression", "HVAC", "UPS"], color: "#8b5cf6" } },
    hack: {
      memory: "Environmental = protecting gear from the ENVIRONMENT: heat (HVAC), fire (suppression), power loss (UPS), theft (cages/locks). If it's not a human attack, it's an environmental threat.",
      practice: "Mental walkthrough of a proper server room: locked door (physical access), equipment cages (per-tenant), HVAC (cooling), FM-200 (fire), UPS + generator (power), cameras (surveillance), cable management (organization). List all controls.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 51. Wendell Odom OCG Chapter 27. Low exam weight but testable. Cable locks and equipment cages are the most likely to appear. Know they fall under physical/environmental controls, not logical/technical."
    }
  },

  // ── 5.3 Configure and verify device access control ────────────

  "5.3.a": {
    info: "<p>The <code>enable password</code> command sets a password for entering <strong>privileged EXEC mode</strong> (the <code>#</code> prompt). However, this password is stored in the running configuration as <strong>clear text (Type 0)</strong>, making it visible to anyone who can view the config with <code>show running-config</code>.</p><p>This is a critical security flaw — if the config is backed up to a TFTP server, emailed, or viewed by an unauthorized person, the password is immediately compromised. For this reason, <strong>never use <code>enable password</code> in production</strong>. Always use <code>enable secret</code> instead.</p><p>Key facts about <code>enable password</code>:</p><ul><li>Stored as <strong>Type 0 (plaintext)</strong> in the config — completely readable</li><li>Even with <code>service password-encryption</code> enabled, it only gets Type 7 obfuscation, which is trivially reversible</li><li>If both <code>enable password</code> and <code>enable secret</code> are configured on the same device, <strong><code>enable secret</code> always takes precedence</strong></li><li>The <code>enable password</code> is effectively ignored when <code>enable secret</code> exists — you cannot use either password interchangeably</li></ul><p>The exam frequently presents a <code>show running-config</code> output where both commands appear and asks which password the device will accept. The answer is always the <code>enable secret</code> password.</p>",
    visual: { type: "comparison", params: { left: { label: "enable password", items: ["Stored in PLAINTEXT", "Visible in show run", "Type 0 — no hash", "NEVER use this"] }, right: { label: "enable secret", items: ["Stored as MD5 hash", "Hidden in show run", "Type 5 — hashed", "ALWAYS use this"] } } },
    hack: {
      memory: "enable PASSWORD = PLAIN to see (plaintext, Type 0). enable SECRET = Securely encrypted (hashed, Type 5). If both exist, SECRET always wins. If you see 'password' in a config, that's the wrong one.",
      practice: "In Packet Tracer: configure both <code>enable password cisco</code> and <code>enable secret cisco123</code>. Run <code>show running-config | include enable</code>. Notice 'cisco' is visible but 'cisco123' is a hash. Try logging in — only 'cisco123' works.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 4 (CLI basics) + Day 52 (Device Security). Wendell Odom OCG Chapter 6 (CLI config) + Chapter 27. The exam tests that enable secret ALWAYS wins over enable password. Know Type 0 = plaintext."
    }
  },

  "5.3.b": {
    info: "<p>The <code>enable secret</code> command sets a <strong>hashed password</strong> for privileged EXEC mode. By default, it uses <strong>MD5 hashing (Type 5)</strong>, which is a one-way hash — the original password cannot be recovered from the hash stored in the config. This is fundamentally more secure than <code>enable password</code>.</p><p>Password type numbers you must know for the exam:</p><ul><li><strong>Type 0</strong> — plaintext, no protection at all (<code>enable password</code>)</li><li><strong>Type 5</strong> — MD5 hash, used by <code>enable secret</code> by default. Recognizable by the <code>$1$</code> prefix in the hash string</li><li><strong>Type 7</strong> — Vigenere cipher, applied by <code>service password-encryption</code>. Trivially reversible — NOT secure</li><li><strong>Type 8</strong> — PBKDF2-SHA-256, stronger than MD5. Available in newer IOS versions</li><li><strong>Type 9</strong> — scrypt hash, the strongest option. Requires significant computational resources to crack</li></ul><p>When you configure <code>enable secret MyPassword</code>, the device immediately hashes the password and stores only the hash. Even an administrator viewing <code>show running-config</code> cannot see the original password — they see something like <code>enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0</code>.</p><p>If both <code>enable password</code> and <code>enable secret</code> are configured, <strong><code>enable secret</code> always takes precedence</strong>. The <code>enable password</code> is effectively overridden and ignored. Cisco recommends using only <code>enable secret</code> and removing any <code>enable password</code> configuration.</p>",
    visual: { type: "state-machine", params: { states: ["User EXEC (>)", "Privileged EXEC (#)"], active: 1, transitions: true } },
    hack: {
      memory: "Type 0 = plaintext. Type 5 = MD5 (enable secret default). Type 7 = Vigenere (reversible junk). Type 8 = PBKDF2. Type 9 = scrypt (strongest). Remember: 0-5-7-8-9, and 5 is the one that matters most.",
      practice: "Configure <code>enable secret MyPass123</code> in Packet Tracer. Then <code>show running-config | include enable</code> and observe the Type 5 hash starting with <code>$1$</code>. Try to log in with 'MyPass123' — it works despite the hash.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 4 + Day 52. Wendell Odom OCG Chapter 6 + Chapter 27. Memorize Type numbers cold: 0 = plain, 5 = MD5, 7 = Vigenere (weak), 8 = PBKDF2, 9 = scrypt. The exam loves asking which type is which."
    }
  },

  "5.3.c": {
    info: "<p>The <strong>console port</strong> (<code>line console 0</code> or <code>line con 0</code>) provides direct physical access to the device via a <strong>rollover cable</strong> (RJ-45 to DB-9 or USB). This is the only way to access a device during initial setup or password recovery. Because it requires physical proximity, it's considered an out-of-band management method.</p><p>Securing the console port requires two steps — setting a password AND enabling login enforcement:</p><ul><li><code>line console 0</code> — enter console line configuration mode</li><li><code>password [password]</code> — set the console password (simple line password method)</li><li><code>login</code> — tells the device to actually prompt for the password. <strong>Without this command, the password is configured but never enforced</strong></li><li><code>exec-timeout [minutes] [seconds]</code> — automatically disconnects idle sessions (e.g., <code>exec-timeout 5 0</code> = 5 minutes). Default is 10 minutes. Setting <code>exec-timeout 0 0</code> disables the timeout (never recommended)</li></ul><p>The better approach uses <strong>local authentication</strong> instead of a simple line password:</p><ul><li><code>line console 0</code></li><li><code>login local</code> — authenticates against the local username database instead of a line password</li><li><code>exec-timeout 5 0</code></li></ul><p>Using <code>login local</code> provides individual accountability — each admin has their own username, so you can track who accessed the device via console. A simple line password is shared among all admins, eliminating accountability.</p>",
    visual: { type: "handshake", params: { leftLabel: "Admin (Console)", rightLabel: "Switch/Router", steps: ["Physical Cable Connected ->", "<- Password Prompt", "Correct Password ->", "<- Privileged Access"] } },
    hack: {
      memory: "Console = PHYSICAL access. Line console 0 = the ONE physical port. Two steps: set password + enable login. Forgetting 'login' = password exists but is never asked for. Like installing a lock but never closing the door.",
      practice: "In Packet Tracer: <code>line con 0</code> → <code>password cisco</code> → <code>login</code> → <code>exec-timeout 5 0</code>. Disconnect and reconnect — verify the prompt appears. Then switch to <code>login local</code> with a username and test.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 4 (CLI) + Day 52 (Device Security). Wendell Odom OCG Chapter 6 + Chapter 27. The exam tests exact commands. The critical 'gotcha': forgetting <code>login</code> means the password is set but never enforced."
    }
  },

  "5.3.d": {
    info: "<p><strong>VTY (Virtual Teletype) lines</strong> provide remote management access to Cisco devices via Telnet or SSH. Most devices have <strong>16 VTY lines (0-15)</strong>, allowing up to 16 simultaneous remote sessions. VTY lines are purely logical — they don't correspond to physical ports.</p><p>Securing VTY lines is critical because they're accessible from anywhere on the network:</p><ul><li><code>line vty 0 15</code> — configure all 16 VTY lines at once</li><li><code>login local</code> — authenticate against the local username database (preferred over simple <code>login</code> + <code>password</code>)</li><li><code>transport input ssh</code> — restrict access to SSH only, blocking Telnet (which sends credentials in cleartext)</li><li><code>access-class [ACL] in</code> — apply an ACL to restrict which source IP addresses can connect. This is different from <code>ip access-group</code> which applies to interfaces</li><li><code>exec-timeout 5 0</code> — disconnect idle sessions after 5 minutes</li></ul><p>Critical VTY gotcha: <strong>if no password is set and no <code>login local</code> is configured on VTY lines, the device refuses ALL remote connections</strong>. The error message is 'Password required, but none set.' This is a security feature — Cisco won't allow passwordless remote access by default.</p><p>Best practice VTY hardening combines all controls: SSH only (<code>transport input ssh</code>), local authentication (<code>login local</code>), source IP restriction (<code>access-class</code>), and idle timeout (<code>exec-timeout</code>). For SSH to work, you also need a hostname, domain name, and RSA key pair configured.</p>",
    visual: { type: "handshake", params: { leftLabel: "Remote Admin", rightLabel: "Switch/Router", steps: ["SSH Connection ->", "<- Username Prompt", "Credentials Sent ->", "<- CLI Access Granted"] } },
    hack: {
      memory: "VTY = Virtual TeletYpe = remote access. 0 to 15 = 16 lines. No password on VTY = NO remote access at all (connection refused). access-CLASS (not access-group) restricts who can SSH in.",
      practice: "Full VTY hardening lab: <code>line vty 0 15</code> → <code>login local</code> → <code>transport input ssh</code> → <code>access-class 10 in</code> → <code>exec-timeout 5 0</code>. Then test: Telnet should be refused, SSH should work only from permitted IPs.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 4 + Day 52 + Day 43 (SSH). Wendell Odom OCG Chapter 6 + Chapter 27. Critical exam topic. The 'no password = no access' gotcha is tested frequently. Know access-class (VTY) vs access-group (interfaces)."
    }
  },

  "5.3.e": {
    info: "<p>The <strong>AUX (Auxiliary) port</strong> (<code>line aux 0</code>) was designed for <strong>out-of-band management via modem</strong>, allowing administrators to dial in remotely for management when the network is down. It is configured identically to the console port — with password, login, and exec-timeout commands.</p><p>In modern networks, the AUX port is <strong>rarely used</strong> because SSH over a dedicated management network provides better remote access. The AUX port remains on devices for backward compatibility and emergency out-of-band access scenarios (when all network connectivity is lost and a modem is the only option).</p><p>Best practices for the AUX port:</p><ul><li>If not in use: disable it with <code>line aux 0</code> → <code>no exec</code> — this prevents any EXEC sessions from being established through the port</li><li>If in use: secure it the same way as the console — <code>password</code>, <code>login</code> (or <code>login local</code>), <code>exec-timeout</code>, and <code>transport input none</code> to block network protocols</li><li>Never leave it unsecured — even though modem access is rare, an attacker with physical access could connect a device to the AUX port</li></ul><p>Comparison with other management lines: <strong>Console (con 0)</strong> = direct physical cable, used for initial setup and password recovery. <strong>AUX (aux 0)</strong> = modem dial-in, rarely used. <strong>VTY (vty 0 15)</strong> = remote network access via Telnet/SSH. All three should be secured or disabled.</p>",
    visual: { type: "comparison", params: { left: { label: "Console (con 0)", items: ["Direct physical cable", "Local access only", "Always used for setup"] }, right: { label: "AUX (aux 0)", items: ["Modem dial-in access", "Remote out-of-band", "Rarely used — disable it"] } } },
    hack: {
      memory: "AUX = AUXiliary = the backup phone line. Think old-school modem port. Best practice: <code>no exec</code> to disable it. Same security config as console if you keep it.",
      practice: "In Packet Tracer: <code>line aux 0</code> → <code>no exec</code> to disable it. Verify with <code>show line</code>. Then compare all three management methods: console, AUX, VTY — know how to secure each.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. Low exam weight but testable. Know that AUX exists, it's for modem access, and best practice is <code>no exec</code> if not in use."
    }
  },

  "5.3.f": {
    info: "<p><strong>Local user authentication</strong> creates username/password pairs stored directly on the device itself, providing individual accountability for each administrator. This is significantly more secure than shared line passwords because you can track <em>who</em> logged in, not just <em>that someone</em> logged in.</p><p>Configuration commands:</p><ul><li><code>username [name] privilege [0-15] secret [password]</code> — creates a local user with a specific privilege level and an MD5-hashed password (Type 5). Always use <code>secret</code>, never <code>password</code></li><li><code>login local</code> — configured under console/VTY lines to tell the device to authenticate against the local username database</li></ul><p>Privilege levels control what commands are available:</p><ul><li><strong>Level 0</strong> — minimal commands: <code>logout</code>, <code>enable</code>, <code>disable</code>, <code>help</code>, <code>exit</code></li><li><strong>Level 1</strong> — default user EXEC level: <code>show</code> commands, <code>ping</code>, <code>traceroute</code> (the <code>&gt;</code> prompt)</li><li><strong>Level 15</strong> — full privileged EXEC: all commands including <code>configure terminal</code> (the <code>#</code> prompt)</li><li><strong>Levels 2-14</strong> — custom levels where you can assign specific commands using <code>privilege exec level [N] [command]</code></li></ul><p>Local authentication is appropriate for small networks with few devices. For larger environments, centralized authentication via <strong>RADIUS or TACACS+</strong> (covered in 5.8) is preferred because maintaining local user databases on hundreds of devices is impractical.</p>",
    visual: { type: "hierarchy", params: { root: "Local User Database", children: [{ name: "admin (priv 15)", children: [{ name: "Full access" }] }, { name: "helpdesk (priv 5)", children: [{ name: "Limited commands" }] }, { name: "readonly (priv 1)", children: [{ name: "Show commands only" }] }] } },
    hack: {
      memory: "LOCAL = credentials stored LOCALLY on the device. <code>login local</code> = check the LOCAL database. Priv 0 = almost nothing. Priv 1 = show commands. Priv 15 = god mode. Use <code>secret</code> not <code>password</code>.",
      practice: "Lab: <code>username admin privilege 15 secret Cisco123</code> then <code>line con 0</code> → <code>login local</code>. Test login. Create a priv 1 user and verify limited commands. Try <code>configure terminal</code> from priv 1 — it should be denied.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam expects <code>username X secret Y</code> (not 'password') and that <code>login local</code> activates it. Without <code>login local</code>, the local database is ignored."
    }
  },

  "5.3.g": {
    info: "<p>The <code>service password-encryption</code> global configuration command applies a <strong>weak Type 7 Vigenere cipher</strong> to all plaintext passwords currently in the running configuration and all future passwords set with the <code>password</code> keyword. It affects line passwords, username passwords (set with <code>password</code> instead of <code>secret</code>), and <code>enable password</code>.</p><p>What <code>service password-encryption</code> does and does NOT do:</p><ul><li><strong>DOES:</strong> Obfuscates Type 0 (plaintext) passwords to Type 7 — prevents casual shoulder-surfing when viewing the config</li><li><strong>DOES NOT:</strong> Affect <code>enable secret</code> (already MD5/Type 5) or any passwords configured with the <code>secret</code> keyword</li><li><strong>DOES NOT:</strong> Provide real security — Type 7 is trivially reversible with free online tools in seconds. It's a Vigenere cipher with a fixed, publicly known key</li><li><strong>DOES NOT:</strong> Un-encrypt passwords if disabled — once encrypted, passwords stay encrypted even after <code>no service password-encryption</code> (but new passwords will be plaintext)</li></ul><p>The security hierarchy from weakest to strongest: <strong>Type 0 (plaintext)</strong> → <strong>Type 7 (Vigenere, reversible)</strong> → <strong>Type 5 (MD5, one-way hash)</strong> → <strong>Type 8 (PBKDF2)</strong> → <strong>Type 9 (scrypt)</strong>. Best practice: always use the <code>secret</code> keyword for passwords (gives Type 5+), AND enable <code>service password-encryption</code> as a baseline to catch any passwords that accidentally use <code>password</code> instead.</p>",
    visual: { type: "comparison", params: { left: { label: "Without service pw-enc", items: ["password cisco (plaintext)", "Visible in show run", "Anyone can read it"] }, right: { label: "With service pw-enc", items: ["password 7 0822455D0A16", "Obfuscated in show run", "Still easily cracked"] } } },
    hack: {
      memory: "Type 7 = TRIVIALLY reversible. It's like ROT13 — better than nothing, but barely. Real security = Type 5 (<code>secret</code>). Type 7 stops shoulder-surfing, nothing more.",
      practice: "Lab: Set <code>line con 0</code> → <code>password cisco</code>. Run <code>show run</code> — see plaintext. Then <code>service password-encryption</code> → <code>show run</code> — see Type 7 hash. Google 'Type 7 decoder' and paste the hash to prove it's crackable in seconds.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 6 + 27. Type 7 = weak/reversible (Vigenere). Type 5 = MD5 (one-way). Always prefer <code>secret</code>. <code>service password-encryption</code> is a safety net, not real encryption."
    }
  },

  "5.3.h": {
    info: "<p><strong>Banners</strong> display messages to users connecting to a network device. They serve legal, informational, and security purposes. The CCNA tests three banner types and their display order.</p><p>Banner types in display order:</p><ul><li><strong>MOTD (Message of the Day)</strong> — <code>banner motd # text #</code> — displayed <strong>first</strong>, before any login prompt, to ALL connections (console, VTY, AUX). Used for <strong>legal disclaimers</strong> warning that unauthorized access is prohibited and will be prosecuted. This creates legal standing for enforcement.</li><li><strong>Login banner</strong> — <code>banner login # text #</code> — displayed <strong>after MOTD but before authentication</strong>. Used for additional pre-login notices (e.g., 'Enter your credentials to continue').</li><li><strong>EXEC banner</strong> — <code>banner exec # text #</code> — displayed <strong>after successful authentication</strong>. Used for post-login information (e.g., scheduled maintenance windows, current alerts).</li></ul><p>The delimiter character (<code>#</code> in the examples) can be any character that doesn't appear in the banner text. It marks the beginning and end of the message.</p><p>Critical security guidelines for banners:</p><ul><li><strong>DO:</strong> Include a legal warning in the MOTD ('Authorized users only. All activity is monitored and recorded.')</li><li><strong>DO NOT:</strong> Include the device hostname, model, IOS version, IP address, or location — this gives attackers reconnaissance information</li><li><strong>DO NOT:</strong> Use the word 'Welcome' — a lawyer could argue this implies invitation, weakening legal enforcement</li></ul>",
    visual: { type: "handshake", params: { leftLabel: "User", rightLabel: "Device", steps: ["Connect ->", "<- MOTD Banner (legal warning)", "<- Login Banner (pre-auth)", "Authenticate ->", "<- EXEC Banner (post-auth)"] } },
    hack: {
      memory: "Display order: M-L-E = MOTD → Login → EXEC. Mnemonic: My Lawyer Explains. MOTD = first thing everyone sees (legal warning). Login = before auth. EXEC = after auth. NEVER say 'Welcome' or reveal device info.",
      practice: "Configure all three: <code>banner motd #Unauthorized access prohibited#</code>, <code>banner login #Enter credentials#</code>, <code>banner exec #Maintenance window Sunday 2AM#</code>. Disconnect and reconnect to verify the M-L-E order.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam tests display order (MOTD → Login → EXEC) and that MOTD should contain a legal notice but NEVER device info or 'Welcome.'"
    }
  },

  "5.3.i": {
    info: "<p>The <code>security passwords min-length [0-16]</code> global configuration command enforces a <strong>minimum character length</strong> for all passwords subsequently configured on the device. This is a proactive control that prevents administrators from setting dangerously short passwords.</p><p>Key characteristics:</p><ul><li>Applies to <strong>all password types</strong>: enable passwords/secrets, line passwords, and local usernames</li><li><strong>Prospective only</strong> — does NOT retroactively reject or change existing passwords that are shorter than the new minimum. Only enforces the minimum on new or changed passwords</li><li>Valid range is <strong>0 to 16 characters</strong>. Cisco recommends a minimum of 10 characters</li><li>When a password below the minimum is attempted, IOS displays a warning but in some versions may still accept it. Use in conjunction with <code>enable secret</code> and <code>service password-encryption</code> as part of a complete password policy</li></ul><p>Example configuration:</p><ul><li><code>security passwords min-length 10</code> — rejects any new password shorter than 10 characters</li><li>After this, attempting <code>enable secret abc</code> (3 chars) will fail with: <code>% Password too short</code></li><li>But <code>enable secret MyStr0ngP@ss</code> (12 chars) will succeed</li></ul><p>This command is part of a broader password policy that should include: minimum length (this command), complexity (enforced by AAA server policies — IOS has no native complexity enforcement), rotation (managed administratively), and hashing (<code>secret</code> keyword for all passwords).</p>",
    visual: { type: "gauge", params: { level: 60, label: "Min Password Length (e.g., 10 chars)", color: "#3b82f6" } },
    hack: {
      memory: "MIN-LENGTH = the bouncer checking your ID at the door. Too short? Rejected. But existing guests (passwords already set) aren't kicked out. Only applies to NEW passwords going forward.",
      practice: "Lab: <code>security passwords min-length 10</code>. Try <code>enable secret short</code> — rejected. Try <code>enable secret LongEnough1</code> — accepted. Then check: does the old short password still work? Yes — min-length is not retroactive.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. Quick exam point: exact command is <code>security passwords min-length X</code>. Remember: only affects NEW passwords, not existing ones."
    }
  },

  "5.3.j": {
    info: "<p>The <code>login block-for [seconds] attempts [count] within [seconds]</code> global configuration command provides <strong>brute-force login protection</strong> by temporarily blocking all login attempts after too many consecutive failures within a defined time window.</p><p>Command syntax breakdown:</p><ul><li><code>login block-for 120 attempts 3 within 60</code> means: if <strong>3 failed login attempts</strong> occur <strong>within 60 seconds</strong>, <strong>block ALL logins for 120 seconds</strong></li><li><strong>block-for</strong> — the lockout duration in seconds</li><li><strong>attempts</strong> — the number of failed attempts that trigger the lockout</li><li><strong>within</strong> — the time window for counting failures</li></ul><p>During the lockout period (called <strong>quiet mode</strong>), ALL login attempts are rejected — including legitimate admin attempts. To prevent locking yourself out, configure a whitelist:</p><ul><li><code>login quiet-mode access-class [ACL-name|number]</code> — specifies an ACL of trusted source IPs that are exempt from the lockout. Admins connecting from these IPs can still log in during quiet mode</li></ul><p>Additional login enhancement commands:</p><ul><li><code>login delay [seconds]</code> — adds a delay between consecutive login attempts (slows brute-force attacks)</li><li><code>login on-failure log</code> — generates a syslog message on failed login attempts for monitoring</li><li><code>login on-success log</code> — generates a syslog message on successful logins for audit trails</li></ul><p>This feature protects VTY lines from automated brute-force password guessing attacks. Without it, an attacker can try thousands of password combinations per minute against SSH or Telnet.</p>",
    visual: { type: "state-machine", params: { states: ["Normal Login", "3 Failures in 60s", "BLOCKED (120s)", "Normal Login"], active: 2, transitions: true } },
    hack: {
      memory: "Read the command as a sentence: 'Block FOR 120 seconds after 3 ATTEMPTS WITHIN 60 seconds.' Block-for = lockout time. Attempts = threshold. Within = counting window. Quiet-mode ACL = admin escape hatch.",
      practice: "Lab: <code>login block-for 60 attempts 3 within 30</code>. Intentionally fail 3 SSH logins quickly — verify lockout. Then add <code>login quiet-mode access-class ADMIN_IPS</code> with your IP permitted and verify you can still log in during lockout.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam tests exact syntax and parameter order. Practice typing the full command from memory: block-for → attempts → within."
    }
  },

  // ── 5.4 Describe security password policy ─────────────────────

  "5.4.a": {
    info: "<p><strong>Password complexity</strong> refers to the requirements that make passwords resistant to guessing and brute-force attacks. A strong password policy combines both <strong>length</strong> and <strong>character diversity</strong> to maximize the number of possible combinations an attacker must try.</p><p>The four character categories for password complexity (<strong>ULNS</strong>):</p><ul><li><strong>Uppercase letters</strong> (A-Z) — 26 characters</li><li><strong>Lowercase letters</strong> (a-z) — 26 characters</li><li><strong>Numbers</strong> (0-9) — 10 characters</li><li><strong>Symbols/Special characters</strong> (!@#$%^&*) — approximately 32 characters</li></ul><p>Using all four categories with a 12-character password gives approximately 94^12 = 4.75 x 10^23 possible combinations — making brute-force attacks computationally infeasible. However, modern security guidance emphasizes that <strong>length matters more than complexity</strong>. A 16-character passphrase like 'correct horse battery staple' is stronger than an 8-character complex password like 'P@$$w0rd' because the longer password has more entropy despite less complexity.</p><p>Cisco IOS password controls:</p><ul><li><code>security passwords min-length [0-16]</code> — enforces minimum length on new passwords</li><li>IOS does <strong>NOT natively enforce complexity rules</strong> (no built-in requirement for mixed character types)</li><li>True complexity enforcement requires <strong>AAA server policies</strong> (RADIUS/TACACS+ servers like Cisco ISE can enforce complexity rules)</li></ul>",
    visual: { type: "gauge", params: { level: 85, label: "Password Strength", color: "#10b981" } },
    hack: {
      memory: "Complexity = ULNS — Uppercase, Lowercase, Numbers, Symbols. But length beats complexity: a 20-char passphrase > an 8-char P@$$w0rd. IOS enforces length only, not complexity — that needs a RADIUS/TACACS+ server.",
      practice: "Compare password strength: calculate time to brute-force an 8-char complex password vs a 16-char simple passphrase. Use an online calculator like howsecureismypassword.net. Understand why NIST now recommends length over complexity.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam tests concepts, not math. Know: complexity + length = strongest, IOS enforces length only, AAA servers enforce complexity."
    }
  },

  "5.4.b": {
    info: "<p><strong>Password management</strong> encompasses the policies and practices that govern the lifecycle of passwords — from creation through retirement. These policies aim to minimize the risk of password compromise over time.</p><p>Key password management elements:</p><ul><li><strong>Rotation/expiration</strong> — forcing password changes at regular intervals (traditionally every 60-90 days). The idea is that even if a password is compromised, the window of exposure is limited to the rotation period.</li><li><strong>Password history</strong> — preventing reuse of the last N passwords (e.g., 'remember last 12 passwords'). This prevents users from cycling back to favorite passwords after a forced change.</li><li><strong>Account lockout</strong> — disabling an account after N failed login attempts to prevent brute-force attacks. Cisco implements this with <code>login block-for</code>.</li><li><strong>Password aging</strong> — tracking how old a password is and forcing a change before or at expiration</li></ul><p>Important modern guidance shift: <strong>NIST SP 800-63B</strong> (2017, updated 2024) now recommends <strong>against forced periodic rotation</strong> unless there is evidence of compromise. Research shows forced rotation leads users to choose weaker, predictable passwords (Password1 → Password2 → Password3). NIST instead recommends: long passphrases, checking against known-breached password lists, and changing only when compromised.</p><p>The CCNA exam may test <strong>both</strong> traditional rotation policies AND the newer NIST guidance. Know the traditional approach (rotate every 90 days) but also understand why the industry is shifting away from it.</p>",
    visual: { type: "state-machine", params: { states: ["New Password", "Active (90 days)", "Expired", "Must Change"], active: 1, transitions: true } },
    hack: {
      memory: "Rotation = CHANGE it regularly. History = CAN'T REUSE old ones. Lockout = too many failures = account frozen. NIST says: stop forcing rotation — users just pick weaker passwords. Change only when compromised.",
      practice: "Design two password policies: 'Traditional' (rotate 90 days, history 12, lockout after 5, min 8 chars) vs 'NIST Modern' (no forced rotation, min 15 chars, check against breach lists, change on compromise). Know both for the exam.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam may test traditional rotation policies even though NIST has updated guidance. Know both perspectives and be ready for either."
    }
  },

  "5.4.c": {
    info: "<p><strong>Multi-Factor Authentication (MFA)</strong> requires two or more authentication factors from <strong>different categories</strong> to verify identity. It is one of the most effective security controls because it ensures that compromising a single factor (like stealing a password) is not enough to gain access.</p><p>The three authentication factor categories:</p><ul><li><strong>Something you KNOW</strong> — password, PIN, passphrase, security question answer. These are knowledge-based and can be forgotten, guessed, or stolen through phishing.</li><li><strong>Something you HAVE</strong> — smart card, hardware token (RSA SecurID), mobile phone (for push notifications or OTP codes), USB security key (YubiKey). These are possession-based and must be physically stolen.</li><li><strong>Something you ARE</strong> — biometrics: fingerprint, facial recognition, iris scan, voice pattern, retina scan. These are inherence-based and are the hardest to forge but cannot be changed if compromised.</li></ul><p>Critical exam distinction: using two factors from the <strong>SAME</strong> category is <strong>NOT true MFA</strong>. A password plus a security question are both 'something you know' — this is merely two-step verification, not multi-factor authentication. Both could be compromised through the same phishing attack.</p><p>True MFA examples: password (Know) + phone OTP (Have), PIN (Know) + fingerprint (Are), badge (Have) + iris scan (Are). Each combination requires the attacker to compromise fundamentally different systems.</p>",
    visual: { type: "shield", params: { items: ["Something You KNOW (password)", "Something You HAVE (token/phone)", "Something You ARE (biometric)"], color: "#3b82f6" } },
    hack: {
      memory: "MFA = Know-Have-Are (KHA). Must use DIFFERENT categories. Password (Know) + Phone OTP (Have) = real MFA. Password + Security Question = NOT MFA (both Know). Password + PIN = NOT MFA (both Know).",
      practice: "Create 10 authentication scenarios and classify each: 'Password + fingerprint' = MFA (Know + Are). 'PIN + security question' = NOT MFA (both Know). 'Badge + phone OTP' = MFA (Have + Have)? Actually NO — same category. Tricky ones build exam readiness.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. Guaranteed exam question. The trap: two passwords, password + security question, or password + PIN are all NOT MFA because they're the same factor category."
    }
  },

  "5.4.d": {
    info: "<p>This subtopic reinforces the critical concept that <strong>true MFA requires factors from DIFFERENT categories</strong>. The strength of MFA comes from the attacker needing to compromise fundamentally different systems — stealing a password (knowledge) doesn't help them bypass a fingerprint scanner (biometric), and vice versa.</p><p>Why different categories matter:</p><ul><li>A phishing attack can steal passwords AND security questions (both 'Know') in one email</li><li>A stolen laptop could have both a saved password AND a smart card inserted (Know + Have) — but the attacker still can't replicate a fingerprint (Are)</li><li>The more diverse the factors, the more independent attack vectors are required</li></ul><p>Common exam scenarios to practice:</p><ul><li><strong>Password + SMS OTP</strong> = True MFA (Know + Have). The OTP is sent to a phone you possess.</li><li><strong>Password + email OTP</strong> = Weaker MFA (Know + Have, but email may be on the same compromised device)</li><li><strong>Password + fingerprint</strong> = True MFA (Know + Are). Two completely independent systems.</li><li><strong>PIN + password</strong> = NOT MFA (Know + Know). Both are knowledge-based.</li><li><strong>Smart card + PIN</strong> = True MFA (Have + Know). The card is possession, the PIN is knowledge.</li><li><strong>Badge + fingerprint</strong> = True MFA (Have + Are). No knowledge factor but still two different categories.</li></ul><p>The CCNA exam may also mention <strong>two-factor authentication (2FA)</strong> as a specific case of MFA using exactly two factors. All 2FA is MFA, but MFA can use three or more factors for extremely high-security environments.</p>",
    visual: { type: "comparison", params: { left: { label: "True MFA", items: ["Password + Phone OTP", "PIN + Smart Card", "Password + Fingerprint"] }, right: { label: "NOT MFA", items: ["Password + Security Q", "PIN + Password", "Two passwords"] } } },
    hack: {
      memory: "Test: can BOTH factors be stolen the same way? If a phishing email could grab both → NOT MFA. If stealing one factor tells you nothing about the other → real MFA. Different CATEGORIES, not just different credentials.",
      practice: "Flash drill: 10 rapid-fire combos. For each, say 'MFA' or 'NOT MFA' instantly. Badge + PIN = MFA. Two passwords = NOT. Retina + fingerprint = NOT (both Are). Password + YubiKey = MFA. Speed matters for the exam.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. Cisco specifically tests the 'different categories' requirement. This is one of the most commonly missed questions — students think any two credentials = MFA."
    }
  },

  "5.4.e": {
    info: "<p><strong>Digital certificates</strong> use <strong>Public Key Infrastructure (PKI)</strong> to verify the identity of devices, users, and services. A certificate is essentially a digitally signed document that binds a public key to an identity, vouched for by a trusted third party called a <strong>Certificate Authority (CA)</strong>.</p><p>The <strong>X.509</strong> standard defines the certificate format. Key fields in an X.509 certificate:</p><ul><li><strong>Subject</strong> — the entity the certificate identifies (e.g., www.cisco.com)</li><li><strong>Issuer</strong> — the CA that signed the certificate</li><li><strong>Public key</strong> — the subject's public key used for encryption and verification</li><li><strong>Validity period</strong> — start date and expiration date</li><li><strong>Serial number</strong> — unique identifier assigned by the CA</li><li><strong>Digital signature</strong> — the CA's signature proving the certificate is authentic and unmodified</li></ul><p>The <strong>chain of trust</strong> works hierarchically: a <strong>Root CA</strong> (self-signed, pre-trusted) signs <strong>Intermediate CA</strong> certificates, which in turn sign <strong>end-entity certificates</strong> (server certs, client certs). Your browser trusts the root CA, which vouches for the intermediate, which vouches for the server — creating a chain of trust from the server back to a root you trust.</p><p>Certificates are used in: <strong>HTTPS/TLS</strong> (web security), <strong>IPsec VPN authentication</strong> (stronger than pre-shared keys), <strong>802.1X</strong> (EAP-TLS), <strong>SSH</strong> (certificate-based authentication), and <strong>code signing</strong> (verifying software authenticity).</p>",
    visual: { type: "hierarchy", params: { root: "Root CA", children: [{ name: "Intermediate CA", children: [{ name: "Server Certificate" }, { name: "Client Certificate" }] }] } },
    hack: {
      memory: "PKI = Public Key Infrastructure. CA = Certificate Authority = the notary who stamps your ID as legit. X.509 = the standard certificate format. Chain of trust: Root CA → Intermediate CA → End Certificate.",
      practice: "Click the lock icon on any HTTPS website in Chrome. View the certificate: find the subject, issuer, validity dates, public key, and trace the chain up to the root CA. This makes the abstract concept concrete.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam tests PKI concepts, not crypto math. Know: what a CA does, X.509 contents (subject, issuer, public key, validity), and the chain of trust model."
    }
  },

  "5.4.f": {
    info: "<p><strong>Biometric authentication</strong> uses unique physical or behavioral characteristics to verify identity. Biometrics are the <strong>'something you are'</strong> factor in MFA — the hardest factor to steal, share, or replicate because it's inherent to the individual.</p><p>Common biometric types:</p><ul><li><strong>Fingerprint scanning</strong> — the most widely deployed biometric. Fast, inexpensive, and familiar to users. Can be fooled by high-quality copies but modern sensors include liveness detection.</li><li><strong>Facial recognition</strong> — uses camera analysis of facial geometry. Convenient (touchless) but affected by lighting, aging, and can sometimes be fooled by photos or masks.</li><li><strong>Iris scanning</strong> — analyzes the unique patterns in the colored ring of the eye. Extremely accurate (1 in 1.2 million false match rate) but expensive and requires user cooperation.</li><li><strong>Retina scanning</strong> — maps blood vessel patterns in the back of the eye. The most accurate biometric but requires very close proximity to the scanner and is uncomfortable for users.</li><li><strong>Voice recognition</strong> — analyzes vocal characteristics. Convenient for phone-based authentication but affected by illness, background noise, and can be spoofed with recordings.</li></ul><p>Key advantage: biometrics cannot be forgotten (like passwords) or lost (like tokens). Key disadvantage: <strong>biometrics cannot be changed if compromised</strong>. If your fingerprint data is stolen from a database, you cannot get new fingerprints — unlike resetting a password. This is why biometrics should always be combined with another factor (MFA), never used alone.</p><p>Biometric accuracy is measured by <strong>FAR</strong> (False Acceptance Rate — accepting an impostor) and <strong>FRR</strong> (False Rejection Rate — rejecting a legitimate user). The <strong>CER</strong> (Crossover Error Rate, where FAR = FRR) indicates overall accuracy — lower CER means better biometric system.</p>",
    visual: { type: "shield", params: { items: ["Fingerprint", "Facial Recognition", "Iris Scan", "Voice Pattern"], color: "#8b5cf6" } },
    hack: {
      memory: "Biometrics = Body metrics = Something you ARE. Strongest single factor but CANNOT BE CHANGED if compromised. You can reset a password but you can't reset your fingerprint. Always pair with another factor.",
      practice: "Build a pros/cons table: Fingerprint (cheap, fast, liftable), Iris (very accurate, expensive), Face (touchless, fooled by photos), Voice (convenient, noise-sensitive). Know trade-offs for scenario questions.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 52. Wendell Odom OCG Chapter 27. The exam tests biometrics as 'something you are' in MFA. Key disadvantage = non-changeable if compromised. Know FAR/FRR/CER for bonus points."
    }
  },

  // ── 5.5 Describe IPsec VPNs ──────────────────────────────────

  "5.5.a": {
    info: "<p>A <strong>site-to-site VPN</strong> creates a <strong>permanent, encrypted tunnel</strong> between two network devices (typically routers or firewalls) at different physical locations. All traffic between the two sites flows through this tunnel automatically — no VPN client software is needed on end-user devices because the encryption happens at the network edge.</p><p>Key characteristics of site-to-site VPNs:</p><ul><li><strong>Always on</strong> — the tunnel is established when the routers boot and remains active continuously. Traffic matching the configured 'interesting traffic' ACL is automatically encrypted and sent through the tunnel.</li><li><strong>Router-to-router</strong> — encryption occurs between the two VPN endpoint devices, not on individual workstations. End users are completely unaware of the VPN.</li><li><strong>No client software</strong> — because the routers handle all encryption/decryption, user devices simply send normal unencrypted traffic to their default gateway.</li><li><strong>Statically configured</strong> — both endpoints must have matching IPsec configurations (algorithms, authentication, interesting traffic definitions).</li></ul><p>Common use cases: connecting branch offices to headquarters, linking data centers across the internet, extending private networks between business partners. The tunnel makes the remote sites appear to be on the same private network even though traffic traverses the public internet. Technologies include <strong>IPsec</strong> (most common), <strong>GRE over IPsec</strong> (when routing protocols need to cross the VPN), and <strong>DMVPN</strong> (Dynamic Multipoint VPN for hub-and-spoke topologies with many branches).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Branch Router", "Encrypted Tunnel", "HQ Router"], color: "#3b82f6" } },
    hack: {
      memory: "Site-to-Site = a PERMANENT bridge between two buildings. Always on, router-to-router, no client software. Like a dedicated highway between offices — the cars (users) don't know the road is encrypted.",
      practice: "Diagram a site-to-site VPN: Branch LAN (10.1.0.0/24) → Branch Router → Internet (encrypted tunnel) → HQ Router → HQ LAN (10.2.0.0/24). Label tunnel endpoints, protected subnets, and interesting traffic ACL.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 54 (VPN Fundamentals). Wendell Odom OCG Chapter 16. The exam tests site-to-site vs remote access. Site-to-site = always-on, router-to-router. Remote access = on-demand, client-to-router."
    }
  },

  "5.5.b": {
    info: "<p>A <strong>remote access VPN</strong> allows individual users to securely connect to the corporate network from any location over the internet using <strong>VPN client software</strong> installed on their device. Unlike site-to-site VPNs, remote access connections are <strong>on-demand</strong> — the user initiates the connection when needed and disconnects when done.</p><p>Key characteristics of remote access VPNs:</p><ul><li><strong>On-demand</strong> — the user manually connects (or auto-connects via policy) when they need corporate network access</li><li><strong>Client-to-site</strong> — encryption occurs between the user's device (running VPN client software) and a VPN concentrator/firewall at the corporate site</li><li><strong>Client software required</strong> — the user's device must have VPN client software installed (e.g., Cisco AnyConnect, GlobalProtect, or built-in OS VPN clients)</li><li><strong>Individual user authentication</strong> — each user authenticates with their own credentials (username/password, certificate, MFA), providing per-user accountability</li></ul><p>Two main implementation types:</p><ul><li><strong>IPsec-based</strong> — traditional approach using IPsec protocols. Requires dedicated client software. Provides full network-level access (Layer 3 tunnel).</li><li><strong>SSL/TLS-based (clientless or AnyConnect)</strong> — uses HTTPS (TCP 443) to establish the VPN. Clientless SSL VPN provides web-based access through a browser portal. Cisco AnyConnect provides full tunnel access over SSL/TLS. SSL VPNs work through most firewalls because they use the same port as HTTPS.</li></ul><p>Remote access VPNs are essential for remote workers, traveling employees, and BYOD scenarios where devices need secure access to corporate resources from untrusted networks (home WiFi, hotel, coffee shop).</p>",
    visual: { type: "packet-flow", params: { nodes: ["Remote User", "VPN Client", "Internet", "VPN Concentrator", "Corporate Network"], color: "#8b5cf6" } },
    hack: {
      memory: "Remote Access = TEMPORARY tunnel from your laptop. You DIAL IN when you need it, disconnect when done. Client software required. Like a phone call vs a leased line (site-to-site).",
      practice: "Build a two-column comparison flashcard: Site-to-Site (permanent, router-to-router, no client, always on) vs Remote Access (on-demand, client-to-site, needs software, user-initiated). Drill scenario questions: 'traveling employee' = remote access, 'two offices' = site-to-site.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. The exam gives scenarios: 'traveling employee needs HQ resources' = remote access VPN. 'Two offices need constant connectivity' = site-to-site VPN."
    }
  },

  "5.5.c": {
    info: "<p><strong>IPsec (Internet Protocol Security)</strong> is a framework of protocols that provides security services for IP traffic. It operates at <strong>Layer 3</strong> and can protect any protocol that runs over IP. IPsec provides four core security services:</p><ul><li><strong>Confidentiality (Encryption)</strong> — ensures data cannot be read by unauthorized parties. Achieved through encryption algorithms like <strong>AES</strong> (128, 192, or 256-bit) or the older <strong>3DES</strong>. Only the intended recipient with the correct key can decrypt the data.</li><li><strong>Integrity (Hashing)</strong> — ensures data has not been modified in transit. Achieved through hash algorithms like <strong>SHA-256</strong>, <strong>SHA-384</strong>, or the older <strong>MD5</strong>. A hash of the data is computed and verified at both ends — any modification changes the hash, revealing tampering.</li><li><strong>Authentication (Identity Verification)</strong> — proves the sender is who they claim to be. Achieved through <strong>pre-shared keys (PSK)</strong> or <strong>digital certificates</strong>. Prevents an attacker from impersonating a legitimate VPN peer.</li><li><strong>Anti-replay Protection</strong> — prevents an attacker from capturing encrypted packets and retransmitting them later. Each IPsec packet includes a <strong>sequence number</strong>; the receiver tracks sequence numbers and drops duplicates or out-of-window packets.</li></ul><p>These services are delivered by two IPsec protocols: <strong>AH (Authentication Header)</strong> and <strong>ESP (Encapsulating Security Payload)</strong>. ESP provides all four services; AH provides all except confidentiality (no encryption). The combination of IPsec with IKE (Internet Key Exchange) for key management creates a complete VPN security solution.</p>",
    visual: { type: "shield", params: { items: ["Confidentiality (Encryption)", "Integrity (Hashing)", "Authentication (Identity)", "Anti-Replay (Sequence #s)"], color: "#10b981" } },
    hack: {
      memory: "IPsec = CIA-R: Confidentiality, Integrity, Authentication, anti-Replay. Remember 'CIA Rocks.' Encryption = AES. Hashing = SHA. Authentication = PSK or certs. Anti-replay = sequence numbers.",
      practice: "Build a matrix: Security Service | What It Prevents | Algorithm | Protocol (AH/ESP). Confidentiality (eavesdropping, AES, ESP only). Integrity (tampering, SHA, both). Authentication (impersonation, PSK/certs, both). Anti-replay (replay attacks, sequence #, both).",
      effort: "low",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. The exam loves: 'which IPsec service ensures data hasn't been modified?' = Integrity. 'Which ensures data can't be read?' = Confidentiality. Map each service to its definition."
    }
  },

  "5.5.d": {
    info: "<p><strong>Authentication Header (AH)</strong> is one of the two core IPsec protocols. It provides <strong>integrity, authentication, and anti-replay protection</strong> but does <strong>NOT provide encryption (no confidentiality)</strong>. Data protected by AH alone can still be read by anyone who intercepts it — AH only proves it hasn't been tampered with and verifies the sender's identity.</p><p>AH technical details:</p><ul><li><strong>IP Protocol Number 51</strong> — AH is identified in the IP header as protocol 51 (like TCP is 6 and UDP is 17)</li><li><strong>Authenticates the ENTIRE packet</strong> — including the outer IP header (except mutable fields like TTL and header checksum). This is more thorough than ESP but creates a critical problem with NAT.</li><li><strong>Incompatible with NAT</strong> — because AH authenticates the IP header, if NAT changes the source or destination IP address, the authentication hash breaks and the packet is dropped. This is why AH is rarely used in modern networks where NAT is ubiquitous.</li><li><strong>Hash algorithms</strong> — uses HMAC-MD5 or HMAC-SHA for integrity checking</li></ul><p>AH is largely obsolete in practice because <strong>ESP can provide all the same services (integrity, authentication, anti-replay) PLUS encryption</strong>. The only theoretical advantage of AH is that it authenticates the IP header itself, but this is rarely worth the NAT incompatibility trade-off. Modern VPN deployments almost exclusively use ESP.</p>",
    visual: { type: "encapsulation", params: { layers: [{ label: "IP Header", color: "#6366f1" }, { label: "AH Header (Proto 51)", color: "#f59e0b" }, { label: "Original Payload (NOT encrypted)", color: "#94a3b8" }] } },
    hack: {
      memory: "AH = Authentication Header = NO encryption. Protocol 51. 'AH, I forgot to encrypt!' AH authenticates the IP header too, which BREAKS NAT. That's why nobody uses AH anymore.",
      practice: "Draw AH packet format: [New IP | AH | Original IP + Data (visible/readable)]. Circle what's authenticated (everything). Circle what's encrypted (nothing). Compare with ESP immediately.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. Key exam facts: AH = protocol 51, no encryption, authenticates IP header, incompatible with NAT. ESP = protocol 50, encryption + everything else."
    }
  },

  "5.5.e": {
    info: "<p><strong>Encapsulating Security Payload (ESP)</strong> is the dominant IPsec protocol, providing <strong>all four security services</strong>: confidentiality (encryption), integrity, authentication, and anti-replay protection. ESP is the standard choice for virtually all modern IPsec VPN deployments.</p><p>ESP technical details:</p><ul><li><strong>IP Protocol Number 50</strong> — ESP is identified in the IP header as protocol 50</li><li><strong>Encrypts the payload</strong> — everything after the ESP header is encrypted, including the original IP header in tunnel mode</li><li><strong>Authenticates ESP header + payload</strong> — but NOT the outer IP header. This is less comprehensive than AH's authentication scope, but critically, it means <strong>ESP is compatible with NAT</strong> because NAT changes the outer IP header (which ESP doesn't authenticate)</li><li><strong>NAT Traversal (NAT-T)</strong> — when ESP needs to traverse NAT devices, it encapsulates ESP packets inside UDP port 4500. This allows ESP to work through NAT/PAT devices that would otherwise block protocol 50</li></ul><p>ESP provides everything AH does, plus encryption:</p><ul><li>Confidentiality — <strong>AES-128, AES-256</strong> (preferred), or 3DES (legacy)</li><li>Integrity — <strong>SHA-256, SHA-384, SHA-512</strong>, or HMAC-MD5 (legacy)</li><li>Authentication — pre-shared keys or digital certificates (via IKE)</li><li>Anti-replay — sequence numbers with a sliding window</li></ul><p>Because ESP provides a superset of AH's capabilities and is NAT-compatible, it has almost entirely replaced AH in practice. The exam expects you to know that ESP = 50 = full protection, and AH = 51 = no encryption.</p>",
    visual: { type: "encapsulation", params: { layers: [{ label: "IP Header", color: "#6366f1" }, { label: "ESP Header (Proto 50)", color: "#10b981" }, { label: "Encrypted Payload", color: "#3b82f6" }, { label: "ESP Trailer + Auth", color: "#10b981" }] } },
    hack: {
      memory: "ESP = Encapsulating Security Payload = FULL protection. Protocol 50. 'ESP has Everything (50 = the whole package).' AH = 51 = 'Almost, Half-way' — no encryption. ESP works with NAT, AH doesn't.",
      practice: "Build a head-to-head table: Feature | AH (51) | ESP (50). Encryption: No/Yes. Integrity: Yes/Yes. Auth: Yes/Yes. Anti-Replay: Yes/Yes. NAT Compatible: No/Yes. Authenticates IP Header: Yes/No. ESP wins every practical category.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. ESP vs AH is a classic exam question. ESP = 50 = encryption + everything. AH = 51 = no encryption, breaks with NAT."
    }
  },

  "5.5.f": {
    info: "<p><strong>IKE (Internet Key Exchange) Phase 1</strong> establishes a secure, authenticated management channel between two IPsec peers. This channel (called the <strong>ISAKMP Security Association</strong>) protects the Phase 2 negotiation that follows. Think of Phase 1 as the two peers introducing themselves, verifying identities, and agreeing on how to communicate securely.</p><p>Phase 1 performs three key functions:</p><ul><li><strong>Algorithm negotiation</strong> — peers propose and agree on encryption algorithm (AES), hash algorithm (SHA), authentication method (PSK or certificates), and Diffie-Hellman group (for key exchange)</li><li><strong>Diffie-Hellman key exchange</strong> — peers generate a shared secret key over an insecure channel without actually transmitting the key. This is mathematically elegant — each peer contributes half the key material.</li><li><strong>Peer authentication</strong> — peers verify each other's identity using pre-shared keys (both peers know the same secret) or digital certificates (PKI-based)</li></ul><p>Phase 1 can operate in two modes:</p><ul><li><strong>Main Mode</strong> — 6 messages exchanged, provides identity protection (peer IPs are encrypted). More secure but slower.</li><li><strong>Aggressive Mode</strong> — 3 messages exchanged, faster but exposes peer identities in cleartext. Used when one peer has a dynamic IP address.</li></ul><p>The result of Phase 1 is one <strong>bidirectional ISAKMP SA</strong> — a secure management tunnel used exclusively to protect the Phase 2 negotiation. No user data flows through this SA.</p>",
    visual: { type: "handshake", params: { leftLabel: "Peer A", rightLabel: "Peer B", steps: ["Propose Algorithms ->", "<- Accept Algorithms", "Exchange Keys (DH) ->", "<- Exchange Keys (DH)", "Authenticate ->", "<- Authenticate", "ISAKMP SA Established"] } },
    hack: {
      memory: "Phase 1 = INTRODUCE yourself and SHAKE HANDS before doing business. Three steps: Negotiate (what algorithms?), Exchange keys (DH), Authenticate (prove who you are). Result = ISAKMP SA (management tunnel).",
      practice: "Draw the Phase 1 sequence: 1) Algorithm proposal/acceptance, 2) Diffie-Hellman key exchange, 3) Authentication (PSK or cert). Label the output: one bidirectional ISAKMP SA. Then draw Phase 2 beside it.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. Phase 1 = authenticate peers + build management tunnel. Phase 2 = negotiate data tunnel. The exam tests the PURPOSE of each phase."
    }
  },

  "5.5.g": {
    info: "<p><strong>IKE Phase 2 (Quick Mode)</strong> negotiates the <strong>IPsec Security Associations</strong> that will protect the actual user data traffic. Phase 2 runs <em>inside</em> the secure tunnel established by Phase 1 — the ISAKMP SA encrypts and authenticates the Phase 2 negotiation.</p><p>Phase 2 performs:</p><ul><li><strong>IPsec SA negotiation</strong> — peers agree on the encryption and integrity algorithms for the data tunnel (may differ from Phase 1 algorithms)</li><li><strong>Interesting traffic definition</strong> — peers confirm which traffic will be protected (defined by crypto ACLs that specify source/destination subnets)</li><li><strong>SA lifetime negotiation</strong> — how long the IPsec SAs are valid before rekeying (typically 3600 seconds or 4,608,000 KB of data)</li></ul><p>Key Phase 2 facts:</p><ul><li>Creates <strong>two unidirectional SAs</strong> — one for each direction of traffic (Peer A → Peer B, and Peer B → Peer A). Each SA has its own SPI (Security Parameter Index).</li><li>Phase 2 uses <strong>Quick Mode</strong> — faster than Phase 1 because it runs inside an already-secured channel</li><li>Optional <strong>Perfect Forward Secrecy (PFS)</strong> — performs a new Diffie-Hellman exchange for Phase 2 keys, ensuring that compromising Phase 1 keys doesn't compromise Phase 2 data</li></ul><p>Summary of both phases: <strong>Phase 1</strong> = one bidirectional ISAKMP SA (management). <strong>Phase 2</strong> = two unidirectional IPsec SAs (data). Phase 1 protects the negotiation of Phase 2. Phase 2 protects the actual user traffic.</p>",
    visual: { type: "handshake", params: { leftLabel: "Peer A", rightLabel: "Peer B", steps: ["Propose IPsec SAs ->", "<- Accept SAs", "Exchange nonces ->", "<- Exchange nonces", "IPsec Tunnel UP (2 unidirectional SAs)"] } },
    hack: {
      memory: "Phase 2 = QUICK Mode = quickly build the DATA tunnel. Phase 1 = 1 bidirectional SA (management). Phase 2 = 2 unidirectional SAs (data, one per direction). Two phases, different tunnel types.",
      practice: "Draw the complete IKE/IPsec flow on one page: Phase 1 → ISAKMP SA (bidirectional, management) → Phase 2 → 2 IPsec SAs (unidirectional, data). Label the purpose of each. This is the master diagram.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. Key facts: Phase 1 = one bidirectional SA (ISAKMP). Phase 2 = two unidirectional SAs (IPsec, one per direction). Phase 2 = Quick Mode."
    }
  },

  "5.5.h": {
    info: "<p><strong>Tunnel mode</strong> encrypts the <strong>ENTIRE original IP packet</strong> — both the IP header and the payload — and encapsulates it inside a completely new IP packet. The original source and destination IP addresses are hidden inside the encrypted payload, invisible to anyone inspecting the packet in transit.</p><p>Tunnel mode packet structure:</p><ul><li><strong>New outer IP header</strong> — uses the tunnel endpoint addresses (e.g., the public IPs of the two VPN routers). This is what routers on the internet use to forward the packet.</li><li><strong>ESP header</strong> — identifies this as an IPsec packet</li><li><strong>Encrypted original IP header</strong> — the real source/destination (e.g., 10.1.1.50 → 10.2.2.100) is hidden inside the encrypted payload</li><li><strong>Encrypted original payload</strong> — the actual data being transmitted</li></ul><p>Key facts about tunnel mode:</p><ul><li><strong>Default mode for site-to-site VPNs</strong> — because you want to hide internal addressing from the internet</li><li><strong>Hides the original IP addresses</strong> — an eavesdropper only sees traffic between the two router public IPs, not the actual endpoints</li><li><strong>More overhead</strong> — adds a complete new IP header (20 bytes) plus ESP header/trailer</li><li>Analogy: putting a sealed letter inside a new envelope with different addresses on the outside</li></ul>",
    visual: { type: "encapsulation", params: { layers: [{ label: "New IP Header (Router IPs)", color: "#6366f1" }, { label: "ESP Header", color: "#10b981" }, { label: "Original IP Header (ENCRYPTED)", color: "#3b82f6" }, { label: "Original Payload (ENCRYPTED)", color: "#3b82f6" }] } },
    hack: {
      memory: "TUNNEL mode = EVERYTHING hidden in the tunnel. Original IP header + payload = both encrypted. Like a sealed letter inside a new envelope. Default for site-to-site VPNs.",
      practice: "Draw side by side: Tunnel mode [New IP | ESP | Encrypted(Old IP + Data)] vs Transport mode [Original IP | ESP | Encrypted(Data only)]. Circle what's visible to an eavesdropper in each. Tunnel hides everything; transport exposes the IP header.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. Tunnel = encrypts whole packet, hides original IPs (site-to-site default). Transport = encrypts payload only (host-to-host). The exam tests which mode hides the original IP."
    }
  },

  "5.5.i": {
    info: "<p><strong>Transport mode</strong> encrypts <strong>only the payload</strong> of the original IP packet, leaving the original IP header <strong>intact and visible</strong>. The source and destination IP addresses are not hidden — anyone intercepting the packet can see who is communicating, just not the content of the communication.</p><p>Transport mode packet structure:</p><ul><li><strong>Original IP header</strong> — unchanged and visible, showing the real source and destination IPs</li><li><strong>ESP header</strong> — inserted between the IP header and the payload</li><li><strong>Encrypted payload</strong> — the original data (TCP/UDP segment and application data) is encrypted</li><li><strong>ESP trailer and authentication</strong> — integrity and authentication data</li></ul><p>Key facts about transport mode:</p><ul><li><strong>Used for host-to-host communication</strong> — when two specific devices need encrypted communication between themselves (not between networks)</li><li><strong>Both endpoints must be IPsec-capable</strong> — unlike tunnel mode where only the routers need IPsec</li><li><strong>Less overhead</strong> — no additional IP header is added (saves 20 bytes per packet)</li><li><strong>Does NOT hide addressing</strong> — an eavesdropper sees the real source and destination IPs but cannot read the data</li><li>Common use case: encrypting traffic between two servers in the same data center, or GRE tunnel protection</li></ul><p>The exam comparison: <strong>Tunnel mode</strong> = encrypts entire packet including IP header (default for site-to-site VPN). <strong>Transport mode</strong> = encrypts payload only, IP header visible (used for host-to-host or when combined with GRE).</p>",
    visual: { type: "encapsulation", params: { layers: [{ label: "Original IP Header (VISIBLE)", color: "#94a3b8" }, { label: "ESP Header", color: "#10b981" }, { label: "Payload (ENCRYPTED)", color: "#3b82f6" }] } },
    hack: {
      memory: "TRANSPORT mode = only the CARGO (payload) is encrypted. The shipping label (IP header) stays readable. Used when both hosts know each other's address and just need the data encrypted.",
      practice: "Scenario drill: 'Two routers connecting branches' = tunnel. 'Two servers in the same DC' = transport. 'Employee laptop to corporate VPN' = tunnel. 'GRE tunnel needing encryption' = transport. Run 5+ scenarios until automatic.",
      effort: "low",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. Tunnel = whole packet encrypted (site-to-site default). Transport = payload only (host-to-host). Most exam questions ask which mode hides the original IP header."
    }
  },

  "5.5.j": {
    info: "<p><strong>GRE over IPsec</strong> combines two technologies to solve a fundamental limitation: IPsec alone <strong>cannot carry multicast, broadcast, or routing protocol traffic</strong>. GRE (Generic Routing Encapsulation) handles the encapsulation of any protocol, and IPsec handles the encryption.</p><p>The problem with IPsec alone:</p><ul><li>IPsec works with unicast traffic only — it cannot encapsulate <strong>multicast</strong> packets</li><li>Routing protocols like <strong>OSPF and EIGRP</strong> use multicast for neighbor discovery and route exchange (OSPF uses 224.0.0.5/6, EIGRP uses 224.0.0.10)</li><li>Without multicast support, you cannot run dynamic routing protocols across a pure IPsec tunnel</li></ul><p>GRE solves this by encapsulating ANY protocol inside a GRE tunnel:</p><ul><li>GRE can carry <strong>multicast, broadcast, and non-IP protocols</strong></li><li>However, GRE provides <strong>zero encryption</strong> — packets are encapsulated but not protected</li></ul><p>The combination — <strong>GRE over IPsec</strong> — wraps traffic in GRE first (enabling multicast/routing protocol support), then encrypts the entire GRE tunnel with IPsec. The layering order is: Original Packet → GRE Encapsulation → IPsec Encryption → New IP Header.</p><p>An alternative technology is <strong>DMVPN (Dynamic Multipoint VPN)</strong>, which builds on GRE and IPsec to create scalable hub-and-spoke VPN topologies where spokes can dynamically create direct spoke-to-spoke tunnels. DMVPN uses mGRE (multipoint GRE) and NHRP (Next Hop Resolution Protocol).</p>",
    visual: { type: "encapsulation", params: { layers: [{ label: "IPsec (Encryption)", color: "#10b981" }, { label: "GRE (Encapsulation)", color: "#f59e0b" }, { label: "Original Packet (Multicast/Routing)", color: "#3b82f6" }] } },
    hack: {
      memory: "GRE = the moving truck (carries anything, including multicast). IPsec = the armored escort (encrypts everything). GRE over IPsec = armored moving truck. 'How do you run OSPF over a VPN?' = GRE over IPsec.",
      practice: "List what GRE adds that IPsec lacks: multicast, broadcast, non-IP protocols, routing protocols (OSPF/EIGRP). Then explain: GRE encapsulates these into unicast → IPsec encrypts the unicast. Problem solved.",
      effort: "medium",
      meta: "Jeremy's IT Lab Day 54. Wendell Odom OCG Chapter 16. Classic exam question: 'How do you run OSPF over an IPsec VPN?' Answer: GRE over IPsec. Pure IPsec can't carry multicast — GRE bridges that gap."
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
