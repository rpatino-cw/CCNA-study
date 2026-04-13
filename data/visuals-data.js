window.visualsData = [
  {
    id: "osi-model-7-layers",
    title: "OSI Model — 7 Layers",
    desc: "The exam asks which layer a protocol operates at and what PDU name to use at each layer. This diagram maps every protocol to its layer and encapsulation unit.",
    domain: "1",
    topic: "1.1",
    group: "network-models",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg">
            <!-- Layers -->
            <g class="hover-group"><rect x="40" y="8" width="200" height="34" rx="4" fill="#7C3AED"/><text x="140" y="22" class="layer-label" text-anchor="middle">7 — Application</text><text x="140" y="34" class="layer-sub" text-anchor="middle">HTTP, DNS, DHCP, FTP, SMTP</text><text x="254" y="28" class="anno">Data</text></g>
            <g class="hover-group"><rect x="40" y="46" width="200" height="34" rx="4" fill="#8B5CF6"/><text x="140" y="60" class="layer-label" text-anchor="middle">6 — Presentation</text><text x="140" y="72" class="layer-sub" text-anchor="middle">SSL/TLS, JPEG, ASCII, encryption</text><text x="254" y="66" class="anno">Data</text></g>
            <g class="hover-group"><rect x="40" y="84" width="200" height="34" rx="4" fill="#A78BFA"/><text x="140" y="98" class="layer-label" text-anchor="middle">5 — Session</text><text x="140" y="110" class="layer-sub" text-anchor="middle">Session setup, NFS, RPC</text><text x="254" y="104" class="anno">Data</text></g>
            <g class="hover-group"><rect x="40" y="122" width="200" height="34" rx="4" fill="#2563EB"/><text x="140" y="136" class="layer-label" text-anchor="middle">4 — Transport</text><text x="140" y="148" class="layer-sub" text-anchor="middle">TCP, UDP — ports, segments</text><text x="254" y="142" class="anno-bold">Segment</text></g>
            <g class="hover-group"><rect x="40" y="160" width="200" height="34" rx="4" fill="#0EA5E9"/><text x="140" y="174" class="layer-label" text-anchor="middle">3 — Network</text><text x="140" y="186" class="layer-sub" text-anchor="middle">IP, ICMP, OSPF — routing, addressing</text><text x="254" y="180" class="anno-bold">Packet</text></g>
            <g class="hover-group"><rect x="40" y="198" width="200" height="34" rx="4" fill="#16A34A"/><text x="140" y="212" class="layer-label" text-anchor="middle">2 — Data Link</text><text x="140" y="224" class="layer-sub" text-anchor="middle">Ethernet, 802.11, MAC, switches</text><text x="254" y="218" class="anno-bold">Frame</text></g>
            <g class="hover-group"><rect x="40" y="236" width="200" height="34" rx="4" fill="#CA8A04"/><text x="140" y="250" class="layer-label" text-anchor="middle">1 — Physical</text><text x="140" y="262" class="layer-sub" text-anchor="middle">Cables, signals, hubs, connectors</text><text x="254" y="256" class="anno-bold">Bits</text></g>
            <!-- Encapsulation arrows -->
            <line x1="310" y1="28" x2="310" y2="256" stroke="#A8A29E" stroke-width="1" stroke-dasharray="3,3"/>
            <polygon points="306,256 314,256 310,266" fill="#A8A29E"/>
            <text x="320" y="140" class="dim-text" transform="rotate(90,320,140)">Encapsulation</text>
          </svg>`
  },
  {
    id: "tcp-ip-vs-osi-comparison",
    title: "TCP/IP vs OSI Comparison",
    desc: "Expect questions mapping OSI layers to TCP/IP layers. Know that TCP/IP merges L5-7 into Application and L1-2 into Network Access.",
    domain: "1",
    topic: "1.1",
    group: "network-models",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg">
            <!-- OSI side -->
            <text x="90" y="16" class="anno-bold" text-anchor="middle">OSI Model</text>
            <rect x="20" y="24" width="140" height="26" rx="3" fill="#7C3AED"/><text x="90" y="41" class="layer-label" text-anchor="middle">Application</text>
            <rect x="20" y="52" width="140" height="26" rx="3" fill="#8B5CF6"/><text x="90" y="69" class="layer-label" text-anchor="middle">Presentation</text>
            <rect x="20" y="80" width="140" height="26" rx="3" fill="#A78BFA"/><text x="90" y="97" class="layer-label" text-anchor="middle">Session</text>
            <rect x="20" y="114" width="140" height="30" rx="3" fill="#2563EB"/><text x="90" y="133" class="layer-label" text-anchor="middle">Transport</text>
            <rect x="20" y="150" width="140" height="30" rx="3" fill="#0EA5E9"/><text x="90" y="169" class="layer-label" text-anchor="middle">Network</text>
            <rect x="20" y="186" width="140" height="30" rx="3" fill="#16A34A"/><text x="90" y="205" class="layer-label" text-anchor="middle">Data Link</text>
            <rect x="20" y="218" width="140" height="26" rx="3" fill="#CA8A04"/><text x="90" y="235" class="layer-label" text-anchor="middle">Physical</text>

            <!-- TCP/IP side -->
            <text x="270" y="16" class="anno-bold" text-anchor="middle">TCP/IP Model</text>
            <rect x="200" y="24" width="140" height="82" rx="3" fill="#7C3AED"/><text x="270" y="65" class="layer-label" text-anchor="middle">Application</text><text x="270" y="80" class="layer-sub" text-anchor="middle">HTTP, DNS, FTP, SSH</text>
            <rect x="200" y="114" width="140" height="30" rx="3" fill="#2563EB"/><text x="270" y="133" class="layer-label" text-anchor="middle">Transport</text><text x="200" y="133" class="layer-sub" text-anchor="start"></text>
            <rect x="200" y="150" width="140" height="30" rx="3" fill="#0EA5E9"/><text x="270" y="169" class="layer-label" text-anchor="middle">Internet</text>
            <rect x="200" y="186" width="140" height="58" rx="3" fill="#16A34A"/><text x="270" y="215" class="layer-label" text-anchor="middle">Network Access</text><text x="270" y="230" class="layer-sub" text-anchor="middle">Ethernet, Wi-Fi, PPP</text>

            <!-- Mapping lines -->
            <line x1="160" y1="65" x2="200" y2="65" stroke="#D4D0C8" stroke-width="1" stroke-dasharray="4,2"/>
            <line x1="160" y1="129" x2="200" y2="129" stroke="#D4D0C8" stroke-width="1" stroke-dasharray="4,2"/>
            <line x1="160" y1="165" x2="200" y2="165" stroke="#D4D0C8" stroke-width="1" stroke-dasharray="4,2"/>
            <line x1="160" y1="215" x2="200" y2="215" stroke="#D4D0C8" stroke-width="1" stroke-dasharray="4,2"/>
          </svg>`
  },
  {
    id: "network-topologies",
    title: "Network Topologies",
    desc: "The exam tests star, mesh, and hybrid topologies. Know that star uses a central switch, full mesh needs n(n-1)/2 links, and modern campuses use hybrid star-of-stars.",
    domain: "1",
    topic: "1.2",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 310" xmlns="http://www.w3.org/2000/svg">
            <!-- Star -->
            <text x="70" y="16" class="anno-bold" text-anchor="middle">Star</text>
            <circle cx="70" cy="60" r="10" fill="#2563EB"/>
            <circle cx="35" cy="35" r="6" fill="#64748B"/><line x1="41" y1="39" x2="62" y2="53" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="105" cy="35" r="6" fill="#64748B"/><line x1="99" y1="39" x2="78" y2="53" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="35" cy="85" r="6" fill="#64748B"/><line x1="41" y1="81" x2="62" y2="67" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="105" cy="85" r="6" fill="#64748B"/><line x1="99" y1="81" x2="78" y2="67" stroke="#94A3B8" stroke-width="1.5"/>
            <circle cx="70" cy="100" r="6" fill="#64748B"/><line x1="70" y1="94" x2="70" y2="70" stroke="#94A3B8" stroke-width="1.5"/>
            <text x="70" y="60" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle" dy="3">SW</text>

            <!-- Bus -->
            <text x="200" y="16" class="anno-bold" text-anchor="middle">Bus</text>
            <line x1="160" y1="60" x2="240" y2="60" stroke="#16A34A" stroke-width="2.5"/>
            <circle cx="170" cy="60" r="5" fill="#64748B"/><circle cx="190" cy="60" r="5" fill="#64748B"/>
            <circle cx="210" cy="60" r="5" fill="#64748B"/><circle cx="230" cy="60" r="5" fill="#64748B"/>
            <line x1="155" y1="56" x2="155" y2="64" stroke="#16A34A" stroke-width="2"/>
            <line x1="245" y1="56" x2="245" y2="64" stroke="#16A34A" stroke-width="2"/>
            <text x="200" y="80" class="dim-text" text-anchor="middle">Terminators at each end</text>

            <!-- Ring -->
            <text x="320" y="16" class="anno-bold" text-anchor="middle">Ring</text>
            <circle cx="320" cy="60" r="28" fill="none" stroke="#D97706" stroke-width="1.5"/>
            <circle cx="320" cy="32" r="5" fill="#64748B"/>
            <circle cx="344" cy="48" r="5" fill="#64748B"/>
            <circle cx="344" cy="72" r="5" fill="#64748B"/>
            <circle cx="320" cy="88" r="5" fill="#64748B"/>
            <circle cx="296" cy="72" r="5" fill="#64748B"/>
            <circle cx="296" cy="48" r="5" fill="#64748B"/>
            <!-- Arrow on ring -->
            <polygon points="332,32 336,28 334,35" fill="#D97706"/>

            <!-- Mesh -->
            <text x="70" y="140" class="anno-bold" text-anchor="middle">Full Mesh</text>
            <circle cx="45" cy="165" r="6" fill="#7C3AED"/><circle cx="95" cy="165" r="6" fill="#7C3AED"/>
            <circle cx="45" cy="205" r="6" fill="#7C3AED"/><circle cx="95" cy="205" r="6" fill="#7C3AED"/>
            <line x1="45" y1="165" x2="95" y2="165" stroke="#C4B5FD" stroke-width="1"/>
            <line x1="45" y1="205" x2="95" y2="205" stroke="#C4B5FD" stroke-width="1"/>
            <line x1="45" y1="165" x2="45" y2="205" stroke="#C4B5FD" stroke-width="1"/>
            <line x1="95" y1="165" x2="95" y2="205" stroke="#C4B5FD" stroke-width="1"/>
            <line x1="45" y1="165" x2="95" y2="205" stroke="#C4B5FD" stroke-width="1"/>
            <line x1="95" y1="165" x2="45" y2="205" stroke="#C4B5FD" stroke-width="1"/>
            <text x="70" y="226" class="dim-text" text-anchor="middle">n(n-1)/2 links</text>

            <!-- Hybrid / Star-of-Stars -->
            <text x="240" y="140" class="anno-bold" text-anchor="middle">Hybrid (Star-of-Stars)</text>
            <!-- Core switch -->
            <rect x="226" y="160" width="28" height="16" rx="3" fill="#2563EB"/><text x="240" y="172" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">CORE</text>
            <!-- Distribution switches -->
            <rect x="182" y="195" width="24" height="14" rx="2" fill="#0EA5E9"/><text x="194" y="205" style="font-size:6px;fill:#fff;font-weight:600" text-anchor="middle">DSW</text>
            <rect x="274" y="195" width="24" height="14" rx="2" fill="#0EA5E9"/><text x="286" y="205" style="font-size:6px;fill:#fff;font-weight:600" text-anchor="middle">DSW</text>
            <line x1="234" y1="176" x2="200" y2="195" stroke="#94A3B8" stroke-width="1.2"/>
            <line x1="246" y1="176" x2="280" y2="195" stroke="#94A3B8" stroke-width="1.2"/>
            <!-- Access hosts left -->
            <circle cx="175" cy="230" r="4" fill="#64748B"/><line x1="190" y1="209" x2="178" y2="226" stroke="#CBD5E1" stroke-width="1"/>
            <circle cx="195" cy="234" r="4" fill="#64748B"/><line x1="196" y1="209" x2="196" y2="230" stroke="#CBD5E1" stroke-width="1"/>
            <circle cx="215" cy="230" r="4" fill="#64748B"/><line x1="202" y1="209" x2="212" y2="226" stroke="#CBD5E1" stroke-width="1"/>
            <!-- Access hosts right -->
            <circle cx="267" cy="230" r="4" fill="#64748B"/><line x1="280" y1="209" x2="270" y2="226" stroke="#CBD5E1" stroke-width="1"/>
            <circle cx="287" cy="234" r="4" fill="#64748B"/><line x1="286" y1="209" x2="287" y2="230" stroke="#CBD5E1" stroke-width="1"/>
            <circle cx="307" cy="230" r="4" fill="#64748B"/><line x1="294" y1="209" x2="304" y2="226" stroke="#CBD5E1" stroke-width="1"/>

            <!-- Legend -->
            <rect x="20" y="260" width="320" height="40" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="276" class="dim-text">Most common:</text>
            <rect x="100" y="268" width="10" height="10" rx="2" fill="#2563EB"/><text x="115" y="277" class="dim-text">Star (LAN)</text>
            <rect x="170" y="268" width="10" height="10" rx="2" fill="#7C3AED"/><text x="185" y="277" class="dim-text">Mesh (WAN)</text>
            <rect x="240" y="268" width="10" height="10" rx="2" fill="#0EA5E9"/><text x="255" y="277" class="dim-text">Hybrid (campus)</text>
            <text x="30" y="293" class="dim-text">Bus &amp; Ring: legacy — Token Ring, 10BASE2. Rarely deployed today.</text>
          </svg>`
  },
  {
    id: "ethernet-ii-frame-structure",
    title: "Ethernet II Frame Structure",
    desc: "Know the minimum (64B) and maximum (1518B) frame sizes, the Type field values (0x0800=IPv4, 0x86DD=IPv6), and that FCS uses CRC for error detection — not correction.",
    domain: "1",
    topic: "1.13",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg">
            <!-- Preamble + SFD -->
            <rect x="10" y="30" width="40" height="50" rx="2" fill="#94A3B8"/>
            <text x="30" y="52" class="pkt-label" text-anchor="middle">PRE</text>
            <text x="30" y="63" class="pkt-label" text-anchor="middle">+ SFD</text>
            <text x="30" y="95" class="dim-text" text-anchor="middle">8 B</text>

            <!-- Dest MAC -->
            <rect x="52" y="30" width="58" height="50" rx="2" fill="#2563EB"/>
            <text x="81" y="52" class="pkt-label" text-anchor="middle">Dest MAC</text>
            <text x="81" y="95" class="dim-text" text-anchor="middle">6 B</text>

            <!-- Src MAC -->
            <rect x="112" y="30" width="58" height="50" rx="2" fill="#0EA5E9"/>
            <text x="141" y="52" class="pkt-label" text-anchor="middle">Src MAC</text>
            <text x="141" y="95" class="dim-text" text-anchor="middle">6 B</text>

            <!-- Type -->
            <rect x="172" y="30" width="30" height="50" rx="2" fill="#7C3AED"/>
            <text x="187" y="55" class="pkt-label" text-anchor="middle">Type</text>
            <text x="187" y="95" class="dim-text" text-anchor="middle">2 B</text>

            <!-- Payload -->
            <rect x="204" y="30" width="100" height="50" rx="2" fill="#16A34A"/>
            <text x="254" y="50" class="pkt-label" text-anchor="middle">Payload</text>
            <text x="254" y="62" class="layer-sub" text-anchor="middle">(IP packet inside)</text>
            <text x="254" y="95" class="dim-text" text-anchor="middle">46–1500 B</text>

            <!-- FCS -->
            <rect x="306" y="30" width="44" height="50" rx="2" fill="#DC2626"/>
            <text x="328" y="55" class="pkt-label" text-anchor="middle">FCS</text>
            <text x="328" y="95" class="dim-text" text-anchor="middle">4 B</text>

            <!-- Total -->
            <line x1="52" y1="110" x2="350" y2="110" stroke="#A8A29E" stroke-width="0.5"/>
            <text x="200" y="122" class="anno" text-anchor="middle">Total: 64 – 1518 bytes (excl. preamble)</text>
            <!-- Type field values -->
            <text x="187" y="140" class="cmd-text" text-anchor="middle">0x0800 = IPv4</text>
            <text x="187" y="152" class="cmd-text" text-anchor="middle">0x86DD = IPv6</text>
          </svg>`
  },
  {
    id: "ipv4-packet-header",
    title: "IPv4 Packet Header",
    desc: "Exam tests TTL (decremented each hop), Protocol field (6=TCP, 17=UDP, 1=ICMP, 89=OSPF), and the DSCP field for QoS marking. Know the 20-byte minimum header size.",
    domain: "1",
    topic: "1.6",
    group: "ip-addressing",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg">
            <!-- Bit ruler -->
            <text x="15" y="16" class="dim-text">0</text>
            <text x="95" y="16" class="dim-text">8</text>
            <text x="180" y="16" class="dim-text">16</text>
            <text x="270" y="16" class="dim-text">24</text>
            <text x="340" y="16" class="dim-text">31</text>

            <!-- Row 1: Ver, IHL, DSCP, Total Length -->
            <rect x="15" y="22" width="40" height="28" rx="2" fill="#2563EB"/><text x="35" y="40" class="pkt-label" text-anchor="middle">Ver</text>
            <rect x="57" y="22" width="40" height="28" rx="2" fill="#3B82F6"/><text x="77" y="40" class="pkt-label" text-anchor="middle">IHL</text>
            <rect x="99" y="22" width="80" height="28" rx="2" fill="#7C3AED"/><text x="139" y="40" class="pkt-label" text-anchor="middle">DSCP / ECN</text>
            <rect x="181" y="22" width="164" height="28" rx="2" fill="#0EA5E9"/><text x="263" y="40" class="pkt-label" text-anchor="middle">Total Length</text>

            <!-- Row 2: Identification, Flags, Fragment Offset -->
            <rect x="15" y="52" width="164" height="28" rx="2" fill="#64748B"/><text x="97" y="70" class="pkt-label" text-anchor="middle">Identification</text>
            <rect x="181" y="52" width="30" height="28" rx="2" fill="#D97706"/><text x="196" y="70" class="pkt-label" text-anchor="middle">Flg</text>
            <rect x="213" y="52" width="132" height="28" rx="2" fill="#CA8A04"/><text x="279" y="70" class="pkt-label" text-anchor="middle">Fragment Offset</text>

            <!-- Row 3: TTL, Protocol, Header Checksum -->
            <rect x="15" y="82" width="82" height="28" rx="2" fill="#DC2626"/><text x="56" y="100" class="pkt-label" text-anchor="middle">TTL</text>
            <rect x="99" y="82" width="80" height="28" rx="2" fill="#16A34A"/><text x="139" y="100" class="pkt-label" text-anchor="middle">Protocol</text>
            <rect x="181" y="82" width="164" height="28" rx="2" fill="#94A3B8"/><text x="263" y="100" class="pkt-label" text-anchor="middle">Header Checksum</text>

            <!-- Row 4: Source IP -->
            <rect x="15" y="112" width="330" height="28" rx="2" fill="#2563EB"/><text x="180" y="130" class="layer-label" text-anchor="middle">Source IP Address (32 bits)</text>

            <!-- Row 5: Dest IP -->
            <rect x="15" y="142" width="330" height="28" rx="2" fill="#0EA5E9"/><text x="180" y="160" class="layer-label" text-anchor="middle">Destination IP Address (32 bits)</text>

            <!-- Key protocol numbers -->
            <text x="15" y="190" class="anno">Protocol field:</text>
            <text x="100" y="190" class="cmd-text">1=ICMP  6=TCP  17=UDP  89=OSPF</text>
          </svg>`
  },
  {
    id: "tcp-3-way-handshake",
    title: "TCP 3-Way Handshake",
    desc: "Expect questions on which flags are set at each step. SYN, SYN-ACK, ACK — know the sequence/ack numbers and that failure at any step means no connection is established.",
    domain: "1",
    topic: "1.5",
    group: "transport",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
            <!-- Client & Server pillars -->
            <rect x="40" y="10" width="70" height="28" rx="4" fill="#2563EB"/><text x="75" y="28" class="layer-label" text-anchor="middle">Client</text>
            <rect x="250" y="10" width="70" height="28" rx="4" fill="#16A34A"/><text x="285" y="28" class="layer-label" text-anchor="middle">Server</text>
            <line x1="75" y1="38" x2="75" y2="210" stroke="#2563EB" stroke-width="2"/>
            <line x1="285" y1="38" x2="285" y2="210" stroke="#16A34A" stroke-width="2"/>

            <!-- SYN -->
            <line x1="78" y1="70" x2="282" y2="90" stroke="#D97706" stroke-width="2" marker-end="url(#arrowOrange)"/>
            <rect x="130" y="64" width="100" height="20" rx="3" fill="#D97706"/><text x="180" y="78" class="pkt-label" text-anchor="middle">SYN (seq=100)</text>
            <text x="65" y="74" class="dim-text" text-anchor="end">CLOSED</text>

            <!-- SYN-ACK -->
            <line x1="282" y1="110" x2="78" y2="130" stroke="#7C3AED" stroke-width="2" marker-end="url(#arrowPurple)"/>
            <rect x="112" y="104" width="136" height="20" rx="3" fill="#7C3AED"/><text x="180" y="118" class="pkt-label" text-anchor="middle">SYN-ACK (seq=300,ack=101)</text>
            <text x="295" y="114" class="dim-text">SYN_RCVD</text>

            <!-- ACK -->
            <line x1="78" y1="150" x2="282" y2="170" stroke="#2563EB" stroke-width="2" marker-end="url(#arrowBlue)"/>
            <rect x="138" y="144" width="84" height="20" rx="3" fill="#2563EB"/><text x="180" y="158" class="pkt-label" text-anchor="middle">ACK (ack=301)</text>

            <!-- Established -->
            <rect x="60" y="185" width="240" height="20" rx="3" fill="var(--bg-recessed, #F3F0EB)" stroke="#16A34A" stroke-width="1"/>
            <text x="180" y="199" class="anno-bold" text-anchor="middle" style="fill:#16A34A">ESTABLISHED — data flows both ways</text>

            <!-- Arrow markers -->
            <defs>
              <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#D97706"/></marker>
              <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#7C3AED"/></marker>
              <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#2563EB"/></marker>
            </defs>
          </svg>`
  },
  {
    id: "subnetting-cidr-at-a-glance",
    title: "Subnetting — CIDR at a Glance",
    desc: "Subnetting is heavily tested. Know the formula: usable hosts = 2^(32-prefix) - 2. Be fast at splitting /24 into /25, /26, etc. and calculating network, broadcast, and usable range.",
    domain: "1",
    topic: "1.6",
    group: "ip-addressing",
    deepDive: "visuals/subnetting.html",
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <!-- /24 block -->
            <rect x="15" y="20" width="330" height="30" rx="3" fill="#2563EB"/>
            <text x="180" y="38" class="layer-label" text-anchor="middle">/24 — 256 addresses (254 usable)</text>
            <text x="180" y="10" class="anno-bold" text-anchor="middle">192.168.1.0</text>

            <!-- Split into /25s -->
            <rect x="15" y="62" width="163" height="26" rx="3" fill="#0EA5E9"/>
            <text x="96" y="79" class="pkt-label" text-anchor="middle">/25 — 128 addr (126 usable)</text>
            <rect x="182" y="62" width="163" height="26" rx="3" fill="#7C3AED"/>
            <text x="263" y="79" class="pkt-label" text-anchor="middle">/25 — 128 addr (126 usable)</text>
            <text x="15" y="100" class="dim-text">.0</text><text x="175" y="100" class="dim-text">.128</text>

            <!-- Split into /26s -->
            <rect x="15" y="108" width="80" height="22" rx="2" fill="#16A34A"/>
            <text x="55" y="123" class="pkt-label" text-anchor="middle">/26 (64)</text>
            <rect x="97" y="108" width="80" height="22" rx="2" fill="#CA8A04"/>
            <text x="137" y="123" class="pkt-label" text-anchor="middle">/26 (64)</text>
            <rect x="180" y="108" width="80" height="22" rx="2" fill="#DC2626"/>
            <text x="220" y="123" class="pkt-label" text-anchor="middle">/26 (64)</text>
            <rect x="263" y="108" width="82" height="22" rx="2" fill="#D97706"/>
            <text x="304" y="123" class="pkt-label" text-anchor="middle">/26 (64)</text>

            <!-- Formula -->
            <text x="15" y="152" class="anno-bold">Quick formula:</text>
            <text x="15" y="167" class="cmd-text">Hosts = 2^(32 - prefix) - 2</text>
            <text x="15" y="182" class="anno">Subtract 2 for network address + broadcast</text>
          </svg>`
  },
  {
    id: "cable-types-standards",
    title: "Cable Types & Standards",
    desc: "The exam tests cable types and distance limits. Cat5e=1G/100m, Cat6a=10G/100m. Know straight-through vs crossover vs rollover, and that Auto-MDIX makes cable type automatic on modern gear.",
    domain: "1",
    topic: "1.3",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
            <!-- UTP Copper -->
            <text x="90" y="16" class="anno-bold" text-anchor="middle">UTP Copper (RJ-45)</text>
            <rect x="10" y="24" width="160" height="22" rx="2" fill="#D97706"/><text x="90" y="39" class="pkt-label" text-anchor="middle">Cat5e — 1 Gbps / 100m</text>
            <rect x="10" y="48" width="160" height="22" rx="2" fill="#CA8A04"/><text x="90" y="63" class="pkt-label" text-anchor="middle">Cat6 — 10 Gbps / 55m</text>
            <rect x="10" y="72" width="160" height="22" rx="2" fill="#B45309"/><text x="90" y="87" class="pkt-label" text-anchor="middle">Cat6a — 10 Gbps / 100m</text>

            <!-- Fiber -->
            <text x="275" y="16" class="anno-bold" text-anchor="middle">Fiber Optic</text>
            <rect x="195" y="24" width="155" height="22" rx="2" fill="#2563EB"/><text x="272" y="39" class="pkt-label" text-anchor="middle">MMF — short range, LED</text>
            <rect x="195" y="48" width="155" height="22" rx="2" fill="#7C3AED"/><text x="272" y="63" class="pkt-label" text-anchor="middle">SMF — long range, laser</text>

            <!-- When to use -->
            <rect x="10" y="110" width="340" height="100" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="25" y="130" class="anno-bold">When to use which:</text>
            <text x="25" y="148" class="anno">Straight-through: host-to-switch, router-to-switch (different devices)</text>
            <text x="25" y="163" class="anno">Crossover: switch-to-switch, host-to-host, router-to-router (same devices)</text>
            <text x="25" y="178" class="anno">Rollover (console): PC serial → router/switch console port (RJ-45)</text>
            <text x="25" y="198" class="cmd-text">Modern devices use Auto-MDIX — cable type auto-detected</text>
          </svg>`
  },
  {
    id: "vlans-trunk-links",
    title: "VLANs & Trunk Links",
    desc: "VLAN questions test trunking (802.1Q tag insertion), native VLAN mismatches, and access vs trunk port behavior. Know that native VLAN traffic crosses the trunk untagged.",
    domain: "2",
    topic: "2.1",
    group: null,
    deepDive: "visuals/vlan.html",
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Switch A -->
            <rect x="30" y="60" width="80" height="30" rx="4" fill="#2563EB"/><text x="70" y="79" class="layer-label" text-anchor="middle">Switch A</text>
            <!-- Switch B -->
            <rect x="250" y="60" width="80" height="30" rx="4" fill="#2563EB"/><text x="290" y="79" class="layer-label" text-anchor="middle">Switch B</text>
            <!-- Trunk link -->
            <line x1="110" y1="75" x2="250" y2="75" stroke="#D97706" stroke-width="3"/>
            <text x="180" y="68" class="anno-bold" text-anchor="middle">Trunk (802.1Q)</text>

            <!-- VLAN 10 hosts -->
            <circle cx="30" cy="20" r="8" fill="#3B82F6"/><text x="30" y="23" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">10</text>
            <circle cx="60" cy="20" r="8" fill="#3B82F6"/><text x="60" y="23" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">10</text>
            <line x1="30" y1="28" x2="50" y2="60" stroke="#3B82F6" stroke-width="1"/><line x1="60" y1="28" x2="60" y2="60" stroke="#3B82F6" stroke-width="1"/>

            <!-- VLAN 20 hosts -->
            <circle cx="90" cy="20" r="8" fill="#16A34A"/><text x="90" y="23" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">20</text>
            <line x1="90" y1="28" x2="85" y2="60" stroke="#16A34A" stroke-width="1"/>

            <!-- Switch B hosts -->
            <circle cx="270" cy="20" r="8" fill="#3B82F6"/><text x="270" y="23" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">10</text>
            <circle cx="310" cy="20" r="8" fill="#16A34A"/><text x="310" y="23" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">20</text>
            <line x1="270" y1="28" x2="280" y2="60" stroke="#3B82F6" stroke-width="1"/>
            <line x1="310" y1="28" x2="300" y2="60" stroke="#16A34A" stroke-width="1"/>

            <!-- Tagged frame -->
            <rect x="90" y="110" width="180" height="24" rx="3" fill="var(--bg-recessed, #F3F0EB)" stroke="#D4D0C8" stroke-width="1"/>
            <rect x="92" y="112" width="35" height="20" rx="2" fill="#2563EB"/><text x="109" y="126" style="font-size:6.5px;fill:#fff;font-weight:600" text-anchor="middle">Dst</text>
            <rect x="129" y="112" width="35" height="20" rx="2" fill="#0EA5E9"/><text x="146" y="126" style="font-size:6.5px;fill:#fff;font-weight:600" text-anchor="middle">Src</text>
            <rect x="166" y="112" width="40" height="20" rx="2" fill="#D97706"/><text x="186" y="126" style="font-size:6.5px;fill:#fff;font-weight:700" text-anchor="middle">802.1Q</text>
            <rect x="208" y="112" width="24" height="20" rx="2" fill="#7C3AED"/><text x="220" y="126" style="font-size:6.5px;fill:#fff;font-weight:600" text-anchor="middle">Type</text>
            <rect x="234" y="112" width="34" height="20" rx="2" fill="#94A3B8"/><text x="251" y="126" style="font-size:6.5px;fill:#fff;font-weight:600" text-anchor="middle">Data</text>
            <text x="180" y="150" class="dim-text" text-anchor="middle">802.1Q tag: 4 bytes inserted after Src MAC</text>

            <!-- Native VLAN note -->
            <text x="180" y="172" class="anno" text-anchor="middle">Native VLAN traffic crosses trunk untagged</text>
            <text x="180" y="188" class="cmd-text" text-anchor="middle">switchport trunk native vlan 99</text>
          </svg>`
  },
  {
    id: "spanning-tree-protocol-stp",
    title: "Spanning Tree Protocol (STP)",
    desc: "STP questions test root bridge election (lowest BID wins), port roles (Root, Designated, Blocked), and convergence. Know that BID = priority + MAC, default priority is 32768.",
    domain: "2",
    topic: "2.5",
    group: null,
    deepDive: "visuals/stp.html",
    svg: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
            <!-- Root Bridge -->
            <rect x="130" y="10" width="100" height="32" rx="4" fill="#D97706"/>
            <text x="180" y="26" class="layer-label" text-anchor="middle">Root Bridge</text>
            <text x="180" y="36" class="layer-sub" text-anchor="middle">Lowest BID wins</text>

            <!-- Switch 1 -->
            <rect x="20" y="90" width="90" height="28" rx="4" fill="#2563EB"/>
            <text x="65" y="108" class="layer-label" text-anchor="middle">Switch 1</text>

            <!-- Switch 2 -->
            <rect x="250" y="90" width="90" height="28" rx="4" fill="#2563EB"/>
            <text x="295" y="108" class="layer-label" text-anchor="middle">Switch 2</text>

            <!-- Root to SW1 (root port on SW1) -->
            <line x1="155" y1="42" x2="80" y2="90" stroke="#16A34A" stroke-width="2"/>
            <circle cx="85" cy="85" r="7" fill="#16A34A"/><text x="85" y="88" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">RP</text>
            <circle cx="148" cy="48" r="7" fill="#D97706"/><text x="148" y="51" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">DP</text>

            <!-- Root to SW2 (root port on SW2) -->
            <line x1="205" y1="42" x2="280" y2="90" stroke="#16A34A" stroke-width="2"/>
            <circle cx="275" cy="85" r="7" fill="#16A34A"/><text x="275" y="88" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">RP</text>
            <circle cx="212" cy="48" r="7" fill="#D97706"/><text x="212" y="51" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">DP</text>

            <!-- SW1 to SW2 (blocked port) -->
            <line x1="110" y1="110" x2="250" y2="110" stroke="#DC2626" stroke-width="2" stroke-dasharray="6,3"/>
            <circle cx="115" cy="110" r="7" fill="#2563EB"/><text x="115" y="113" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">DP</text>
            <circle cx="245" cy="110" r="7" fill="#DC2626"/><text x="245" y="113" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">BP</text>

            <!-- Legend -->
            <rect x="30" y="145" width="300" height="75" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="45" y="163" class="anno-bold">Port Roles:</text>
            <circle cx="55" cy="176" r="5" fill="#16A34A"/><text x="68" y="180" class="anno">Root Port (RP) — best path to root, one per switch</text>
            <circle cx="55" cy="194" r="5" fill="#D97706"/><text x="68" y="198" class="anno">Designated Port (DP) — best port on each segment</text>
            <circle cx="55" cy="212" r="5" fill="#DC2626"/><text x="68" y="216" class="anno">Blocked Port (BP) — loop prevention, no forwarding</text>
          </svg>`
  },
  {
    id: "etherchannel-port-aggregation",
    title: "EtherChannel (Port Aggregation)",
    desc: "Know LACP (open standard, preferred) vs PAgP (Cisco proprietary). The exam tests which modes negotiate: LACP active/passive, PAgP desirable/auto. Both sides must match speed, duplex, and VLAN config.",
    domain: "2",
    topic: "2.4",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg">
            <!-- SW1 -->
            <rect x="20" y="50" width="80" height="30" rx="4" fill="#2563EB"/><text x="60" y="69" class="layer-label" text-anchor="middle">Switch A</text>
            <!-- SW2 -->
            <rect x="260" y="50" width="80" height="30" rx="4" fill="#2563EB"/><text x="300" y="69" class="layer-label" text-anchor="middle">Switch B</text>

            <!-- Physical links -->
            <line x1="100" y1="58" x2="260" y2="58" stroke="#94A3B8" stroke-width="1.5"/>
            <line x1="100" y1="65" x2="260" y2="65" stroke="#94A3B8" stroke-width="1.5"/>
            <line x1="100" y1="72" x2="260" y2="72" stroke="#94A3B8" stroke-width="1.5"/>

            <!-- Logical channel overlay -->
            <rect x="110" y="52" width="140" height="26" rx="4" fill="none" stroke="#D97706" stroke-width="2" stroke-dasharray="6,3"/>
            <text x="180" y="42" class="anno-bold" text-anchor="middle">Port-Channel 1</text>
            <text x="180" y="92" class="dim-text" text-anchor="middle">3 x 1G = 3 Gbps logical link</text>

            <!-- Negotiation protocols -->
            <rect x="30" y="115" width="300" height="46" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="45" y="133" class="anno-bold">Negotiation:</text>
            <text x="130" y="133" class="cmd-text">LACP (802.3ad)</text><text x="240" y="133" class="anno">— open standard, preferred</text>
            <text x="130" y="150" class="cmd-text">PAgP</text><text x="175" y="150" class="anno">— Cisco proprietary</text>
          </svg>`
  },
  {
    id: "router-forwarding-decision",
    title: "Router Forwarding Decision",
    desc: "The exam tests the forwarding decision: longest prefix match first, then lowest AD breaks ties. If no match and no default route, the packet is dropped and ICMP unreachable is sent.",
    domain: "3",
    topic: "3.2",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
            <!-- Packet in -->
            <rect x="10" y="10" width="80" height="24" rx="4" fill="#2563EB"/><text x="50" y="26" class="pkt-label" text-anchor="middle">Packet In</text>
            <line x1="90" y1="22" x2="120" y2="22" stroke="#2563EB" stroke-width="2" marker-end="url(#arrowBlue)"/>

            <!-- Decision diamond -->
            <polygon points="180,4 230,32 180,60 130,32" fill="var(--bg-surface, #fff)" stroke="#1C1917" stroke-width="1.5"/>
            <text x="180" y="30" class="anno-bold" text-anchor="middle" style="font-size:8px">Match in</text>
            <text x="180" y="40" class="anno-bold" text-anchor="middle" style="font-size:8px">routing table?</text>

            <!-- Yes path -->
            <line x1="230" y1="32" x2="270" y2="32" stroke="#16A34A" stroke-width="1.5"/>
            <text x="250" y="26" class="anno" style="fill:#16A34A">Yes</text>
            <rect x="270" y="16" width="80" height="32" rx="4" fill="#16A34A"/><text x="310" y="36" class="pkt-label" text-anchor="middle">Forward</text>

            <!-- No path -->
            <line x1="180" y1="60" x2="180" y2="80" stroke="#DC2626" stroke-width="1.5"/>
            <text x="190" y="74" class="anno" style="fill:#DC2626">No</text>

            <!-- Default route check -->
            <polygon points="180,80 225,105 180,130 135,105" fill="var(--bg-surface, #fff)" stroke="#1C1917" stroke-width="1.5"/>
            <text x="180" y="103" class="anno-bold" text-anchor="middle" style="font-size:8px">Default</text>
            <text x="180" y="113" class="anno-bold" text-anchor="middle" style="font-size:8px">route?</text>

            <!-- Yes: use default -->
            <line x1="225" y1="105" x2="270" y2="105" stroke="#16A34A" stroke-width="1.5"/>
            <text x="248" y="99" class="anno" style="fill:#16A34A">Yes</text>
            <rect x="270" y="92" width="80" height="26" rx="4" fill="#D97706"/><text x="310" y="109" class="pkt-label" text-anchor="middle">Use 0.0.0.0/0</text>

            <!-- No: drop -->
            <line x1="180" y1="130" x2="180" y2="150" stroke="#DC2626" stroke-width="1.5"/>
            <text x="190" y="144" class="anno" style="fill:#DC2626">No</text>
            <rect x="140" y="150" width="80" height="26" rx="4" fill="#DC2626"/><text x="180" y="167" class="pkt-label" text-anchor="middle">Drop + ICMP</text>

            <!-- Route selection order -->
            <rect x="20" y="195" width="320" height="55" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="35" y="213" class="anno-bold">Route selection order:</text>
            <text x="35" y="228" class="anno">1. Longest prefix match (most specific route wins)</text>
            <text x="35" y="243" class="anno">2. Lowest AD (administrative distance) breaks ties</text>
          </svg>`
  },
  {
    id: "ospf-areas-router-roles",
    title: "OSPF Areas & Router Roles",
    desc: "OSPF is the most tested routing protocol. Know areas (all non-backbone must connect to Area 0), DR/BDR election on broadcast segments, cost = reference BW / interface BW, and ABR vs ASBR roles.",
    domain: "3",
    topic: "3.4",
    group: null,
    deepDive: "visuals/ospf.html",
    svg: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
            <!-- Area 0 backbone -->
            <rect x="80" y="40" width="200" height="80" rx="8" fill="none" stroke="#D97706" stroke-width="2"/>
            <text x="180" y="34" class="anno-bold" text-anchor="middle" style="fill:#D97706">Area 0 (Backbone)</text>

            <!-- Internal routers in Area 0 -->
            <circle cx="130" cy="75" r="14" fill="#D97706"/><text x="130" y="79" class="pkt-label" text-anchor="middle">IR</text>
            <circle cx="230" cy="75" r="14" fill="#D97706"/><text x="230" y="79" class="pkt-label" text-anchor="middle">IR</text>
            <line x1="144" y1="75" x2="216" y2="75" stroke="#D97706" stroke-width="1.5"/>

            <!-- ABR to Area 1 -->
            <circle cx="80" cy="80" r="14" fill="#2563EB" stroke="#D97706" stroke-width="2"/><text x="80" y="84" class="pkt-label" text-anchor="middle">ABR</text>
            <rect x="10" y="130" width="110" height="60" rx="8" fill="none" stroke="#2563EB" stroke-width="2"/>
            <text x="65" y="148" class="anno-bold" text-anchor="middle" style="fill:#2563EB">Area 1</text>
            <line x1="72" y1="94" x2="55" y2="130" stroke="#2563EB" stroke-width="1.5"/>
            <circle cx="45" cy="165" r="10" fill="#2563EB"/><text x="45" y="169" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">IR</text>
            <circle cx="85" cy="165" r="10" fill="#2563EB"/><text x="85" y="169" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">IR</text>

            <!-- ABR to Area 2 -->
            <circle cx="280" cy="80" r="14" fill="#7C3AED" stroke="#D97706" stroke-width="2"/><text x="280" y="84" class="pkt-label" text-anchor="middle">ABR</text>
            <rect x="240" y="130" width="110" height="60" rx="8" fill="none" stroke="#7C3AED" stroke-width="2"/>
            <text x="295" y="148" class="anno-bold" text-anchor="middle" style="fill:#7C3AED">Area 2</text>
            <line x1="288" y1="94" x2="305" y2="130" stroke="#7C3AED" stroke-width="1.5"/>
            <circle cx="275" cy="165" r="10" fill="#7C3AED"/><text x="275" y="169" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">IR</text>
            <circle cx="315" cy="165" r="10" fill="#7C3AED"/><text x="315" y="169" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">IR</text>

            <!-- Legend -->
            <text x="20" y="215" class="anno">ABR = Area Border Router (connects non-backbone to Area 0)</text>
            <text x="20" y="228" class="anno">IR = Internal Router (all interfaces in one area)</text>
          </svg>`
  },
  {
    id: "administrative-distance-ad",
    title: "Administrative Distance (AD)",
    desc: "AD values are heavily tested. Memorize: Connected=0, Static=1, eBGP=20, EIGRP=90, OSPF=110, IS-IS=115, RIP=120, iBGP=200. When two protocols know the same route, lowest AD wins.",
    domain: "3",
    topic: "3.1",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
            <!-- Scale bar background -->
            <rect x="60" y="15" width="280" height="12" rx="3" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="45" y="24" class="dim-text" text-anchor="end">0</text>
            <text x="345" y="24" class="dim-text">255</text>
            <text x="190" y="10" class="anno-bold" text-anchor="middle">Lower = More Trusted</text>

            <!-- AD bars -->
            <rect x="60" y="38" width="4" height="18" rx="2" fill="#16A34A"/><text x="70" y="51" class="anno-bold" style="font-size:9px">Connected (0)</text>
            <rect x="60" y="60" width="7" height="18" rx="2" fill="#16A34A"/><text x="74" y="73" class="anno-bold" style="font-size:9px">Static (1)</text>
            <rect x="60" y="82" width="24" height="18" rx="2" fill="#2563EB"/><text x="90" y="95" class="anno" style="font-size:9px">eBGP (20)</text>
            <rect x="60" y="104" width="100" height="18" rx="2" fill="#D97706"/><text x="166" y="117" class="anno" style="font-size:9px">EIGRP (90)</text>
            <rect x="60" y="126" width="121" height="18" rx="2" fill="#0EA5E9"/><text x="187" y="139" class="anno" style="font-size:9px">OSPF (110)</text>
            <rect x="60" y="148" width="132" height="18" rx="2" fill="#7C3AED"/><text x="198" y="161" class="anno" style="font-size:9px">IS-IS (115)</text>
            <rect x="60" y="170" width="143" height="18" rx="2" fill="#CA8A04"/><text x="209" y="183" class="anno" style="font-size:9px">RIP (120)</text>
            <rect x="60" y="192" width="220" height="18" rx="2" fill="#DC2626"/><text x="286" y="205" class="anno" style="font-size:9px">iBGP (200)</text>
          </svg>`
  },
  {
    id: "dhcp-dora-process",
    title: "DHCP DORA Process",
    desc: "Know the DORA sequence: Discover (broadcast), Offer (unicast), Request (broadcast), Acknowledge (unicast). The exam tests which steps are broadcast vs unicast and what info the client receives (IP, mask, gateway, DNS, lease).",
    domain: "4",
    topic: "4.3",
    group: "dhcp-dns",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
            <!-- Client & Server -->
            <rect x="30" y="10" width="70" height="28" rx="4" fill="#2563EB"/><text x="65" y="28" class="layer-label" text-anchor="middle">Client</text>
            <rect x="260" y="10" width="70" height="28" rx="4" fill="#7C3AED"/><text x="295" y="28" class="layer-label" text-anchor="middle">DHCP Srv</text>
            <line x1="65" y1="38" x2="65" y2="210" stroke="#2563EB" stroke-width="2"/>
            <line x1="295" y1="38" x2="295" y2="210" stroke="#7C3AED" stroke-width="2"/>

            <!-- D - Discover -->
            <line x1="68" y1="62" x2="292" y2="78" stroke="#D97706" stroke-width="2" marker-end="url(#arrowOrange)"/>
            <rect x="120" y="56" width="120" height="18" rx="3" fill="#D97706"/><text x="180" y="69" class="pkt-label" text-anchor="middle">D — Discover (broadcast)</text>

            <!-- O - Offer -->
            <line x1="292" y1="100" x2="68" y2="116" stroke="#16A34A" stroke-width="2" marker-end="url(#arrGreen)"/>
            <rect x="120" y="94" width="120" height="18" rx="3" fill="#16A34A"/><text x="180" y="107" class="pkt-label" text-anchor="middle">O — Offer (unicast)</text>

            <!-- R - Request -->
            <line x1="68" y1="138" x2="292" y2="154" stroke="#0EA5E9" stroke-width="2" marker-end="url(#arrCyan)"/>
            <rect x="115" y="132" width="130" height="18" rx="3" fill="#0EA5E9"/><text x="180" y="145" class="pkt-label" text-anchor="middle">R — Request (broadcast)</text>

            <!-- A - Acknowledge -->
            <line x1="292" y1="176" x2="68" y2="192" stroke="#7C3AED" stroke-width="2" marker-end="url(#arrPurp)"/>
            <rect x="108" y="170" width="144" height="18" rx="3" fill="#7C3AED"/><text x="180" y="183" class="pkt-label" text-anchor="middle">A — Acknowledge (unicast)</text>

            <text x="180" y="215" class="anno" text-anchor="middle">Client now has IP, mask, gateway, DNS, and lease time</text>

            <defs>
              <marker id="arrGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#16A34A"/></marker>
              <marker id="arrCyan" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#0EA5E9"/></marker>
              <marker id="arrPurp" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0,0 8,3 0,6" fill="#7C3AED"/></marker>
            </defs>
          </svg>`
  },
  {
    id: "nat-pat-translation",
    title: "NAT / PAT Translation",
    desc: "The exam tests NAT types: Static (1:1), Dynamic (pool), and PAT/NAT overload (many:1 using port numbers). Know inside local/global vs outside local/global terminology and the show ip nat translations command.",
    domain: "4",
    topic: "4.1",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg">
            <!-- Inside network -->
            <rect x="10" y="10" width="100" height="130" rx="6" fill="var(--bg-recessed, #F3F0EB)" stroke="#2563EB" stroke-width="1"/>
            <text x="60" y="28" class="anno-bold" text-anchor="middle" style="fill:#2563EB">Inside (Private)</text>
            <text x="60" y="55" class="cmd-text" text-anchor="middle">192.168.1.10</text>
            <text x="60" y="75" class="cmd-text" text-anchor="middle">192.168.1.11</text>
            <text x="60" y="95" class="cmd-text" text-anchor="middle">192.168.1.12</text>

            <!-- Router with NAT -->
            <rect x="135" y="40" width="90" height="60" rx="6" fill="#D97706"/>
            <text x="180" y="62" class="layer-label" text-anchor="middle">Router</text>
            <text x="180" y="78" class="layer-sub" text-anchor="middle">NAT / PAT</text>

            <!-- Outside -->
            <rect x="250" y="10" width="100" height="130" rx="6" fill="var(--bg-recessed, #F3F0EB)" stroke="#16A34A" stroke-width="1"/>
            <text x="300" y="28" class="anno-bold" text-anchor="middle" style="fill:#16A34A">Outside (Public)</text>
            <text x="300" y="70" class="cmd-text" text-anchor="middle">203.0.113.5</text>

            <!-- Translation arrows -->
            <line x1="110" y1="52" x2="135" y2="60" stroke="#94A3B8" stroke-width="1"/>
            <line x1="110" y1="72" x2="135" y2="68" stroke="#94A3B8" stroke-width="1"/>
            <line x1="110" y1="92" x2="135" y2="76" stroke="#94A3B8" stroke-width="1"/>
            <line x1="225" y1="68" x2="250" y2="68" stroke="#94A3B8" stroke-width="1"/>

            <!-- PAT table -->
            <rect x="25" y="155" width="310" height="48" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="170" class="anno-bold" text-anchor="middle">PAT Translation Table</text>
            <text x="40" y="187" class="cmd-text">192.168.1.10:5001 ↔ 203.0.113.5:40001</text>
            <text x="40" y="199" class="cmd-text">192.168.1.11:5002 ↔ 203.0.113.5:40002</text>
          </svg>`
  },
  {
    id: "dns-resolution-flow",
    title: "DNS Resolution Flow",
    desc: "Know the DNS resolution hierarchy: client cache, recursive resolver, root server, TLD server, authoritative NS. The exam tests A records (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), and the role of caching.",
    domain: "4",
    topic: "4.3",
    group: "dhcp-dns",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Client -->
            <rect x="10" y="80" width="50" height="26" rx="4" fill="#2563EB"/><text x="35" y="97" class="pkt-label" text-anchor="middle">Client</text>

            <!-- Recursive resolver -->
            <rect x="90" y="80" width="60" height="26" rx="4" fill="#7C3AED"/><text x="120" y="93" class="pkt-label" text-anchor="middle">Resolver</text>
            <text x="120" y="75" class="dim-text" text-anchor="middle">ISP / 8.8.8.8</text>

            <!-- Root -->
            <rect x="180" y="15" width="50" height="22" rx="4" fill="#DC2626"/><text x="205" y="30" class="pkt-label" text-anchor="middle">Root</text>
            <text x="205" y="10" class="dim-text" text-anchor="middle">. (dot)</text>

            <!-- TLD -->
            <rect x="260" y="50" width="50" height="22" rx="4" fill="#D97706"/><text x="285" y="65" class="pkt-label" text-anchor="middle">TLD</text>
            <text x="285" y="45" class="dim-text" text-anchor="middle">.com</text>

            <!-- Authoritative -->
            <rect x="260" y="110" width="80" height="22" rx="4" fill="#16A34A"/><text x="300" y="125" class="pkt-label" text-anchor="middle">Auth NS</text>
            <text x="300" y="145" class="dim-text" text-anchor="middle">example.com</text>

            <!-- Arrows: query flow -->
            <line x1="60" y1="90" x2="90" y2="90" stroke="#94A3B8" stroke-width="1.2" marker-end="url(#arrGray)"/>
            <text x="75" y="85" class="dim-text" text-anchor="middle">1</text>
            <line x1="140" y1="85" x2="180" y2="30" stroke="#94A3B8" stroke-width="1" marker-end="url(#arrGray)"/>
            <text x="155" y="55" class="dim-text" text-anchor="middle">2</text>
            <line x1="220" y1="30" x2="260" y2="55" stroke="#94A3B8" stroke-width="1" marker-end="url(#arrGray)"/>
            <text x="245" y="38" class="dim-text" text-anchor="middle">3</text>
            <line x1="285" y1="72" x2="285" y2="110" stroke="#94A3B8" stroke-width="1" marker-end="url(#arrGray)"/>
            <text x="293" y="92" class="dim-text">4</text>
            <!-- Response back -->
            <line x1="260" y1="125" x2="150" y2="100" stroke="#16A34A" stroke-width="1.2" marker-end="url(#arrGreen)"/>
            <text x="210" y="118" class="dim-text">5</text>
            <line x1="90" y1="96" x2="60" y2="96" stroke="#16A34A" stroke-width="1.2" marker-end="url(#arrGreen)"/>
            <text x="75" y="108" class="dim-text" text-anchor="middle">6</text>

            <!-- Answer -->
            <rect x="10" y="165" width="340" height="24" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="181" class="cmd-text" text-anchor="middle">example.com → 93.184.216.34 (A record, cached)</text>

            <defs><marker id="arrGray" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#94A3B8"/></marker></defs>
          </svg>`
  },
  {
    id: "acl-processing-flow",
    title: "ACL Processing Flow",
    desc: "ACL processing is top-down, first-match. The implicit deny at the end catches everything. Know where to place standard ACLs (close to destination) vs extended ACLs (close to source).",
    domain: "5",
    topic: "5.6",
    group: null,
    deepDive: "visuals/acl.html",
    svg: `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
            <!-- Packet in -->
            <rect x="140" y="5" width="80" height="22" rx="4" fill="#2563EB"/><text x="180" y="20" class="pkt-label" text-anchor="middle">Packet</text>
            <line x1="180" y1="27" x2="180" y2="42" stroke="#2563EB" stroke-width="1.5"/>

            <!-- ACE 1 -->
            <polygon points="180,42 220,60 180,78 140,60" fill="var(--bg-surface, #fff)" stroke="#1C1917" stroke-width="1"/>
            <text x="180" y="63" class="anno-bold" text-anchor="middle" style="font-size:8px">ACE 1?</text>
            <text x="225" y="56" class="anno" style="fill:#16A34A;font-size:8px">Match</text>
            <line x1="220" y1="60" x2="270" y2="60" stroke="#16A34A" stroke-width="1.2"/>
            <rect x="270" y="50" width="60" height="20" rx="3" fill="#16A34A"/><text x="300" y="64" class="pkt-label" text-anchor="middle">Permit</text>

            <!-- No match, next ACE -->
            <line x1="180" y1="78" x2="180" y2="93" stroke="#DC2626" stroke-width="1"/>
            <text x="165" y="90" class="dim-text" style="fill:#DC2626">No</text>

            <!-- ACE 2 -->
            <polygon points="180,93 220,111 180,129 140,111" fill="var(--bg-surface, #fff)" stroke="#1C1917" stroke-width="1"/>
            <text x="180" y="114" class="anno-bold" text-anchor="middle" style="font-size:8px">ACE 2?</text>
            <text x="225" y="107" class="anno" style="fill:#DC2626;font-size:8px">Match</text>
            <line x1="220" y1="111" x2="270" y2="111" stroke="#DC2626" stroke-width="1.2"/>
            <rect x="270" y="101" width="60" height="20" rx="3" fill="#DC2626"/><text x="300" y="115" class="pkt-label" text-anchor="middle">Deny</text>

            <line x1="180" y1="129" x2="180" y2="144" stroke="#DC2626" stroke-width="1"/>
            <text x="165" y="141" class="dim-text" style="fill:#DC2626">No</text>

            <!-- ACE N -->
            <polygon points="180,144 220,162 180,180 140,162" fill="var(--bg-surface, #fff)" stroke="#1C1917" stroke-width="1"/>
            <text x="180" y="165" class="anno-bold" text-anchor="middle" style="font-size:8px">ACE N?</text>
            <line x1="180" y1="180" x2="180" y2="195" stroke="#DC2626" stroke-width="1"/>

            <!-- Implicit deny -->
            <rect x="130" y="195" width="100" height="22" rx="4" fill="#DC2626"/><text x="180" y="210" class="pkt-label" text-anchor="middle">Implicit Deny All</text>

            <!-- Standard vs Extended note -->
            <rect x="10" y="222" width="340" height="15" rx="2" fill="none"/>
            <text x="180" y="234" class="anno" text-anchor="middle">Standard ACL: src IP only | Extended ACL: src/dst IP + ports + protocol</text>
          </svg>`
  },
  {
    id: "aaa-framework",
    title: "AAA Framework",
    desc: "Know the three A's and the difference between RADIUS (UDP 1812/1813, encrypts password only) and TACACS+ (TCP 49, encrypts full payload). The exam tests when to use each.",
    domain: "5",
    topic: "5.8",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg">
            <!-- Three pillars -->
            <rect x="15" y="30" width="100" height="80" rx="6" fill="#2563EB"/>
            <text x="65" y="55" class="layer-label" text-anchor="middle">Authentication</text>
            <text x="65" y="72" class="layer-sub" text-anchor="middle">Who are you?</text>
            <text x="65" y="86" class="layer-sub" text-anchor="middle">Username/password,</text>
            <text x="65" y="98" class="layer-sub" text-anchor="middle">certificates, MFA</text>

            <rect x="130" y="30" width="100" height="80" rx="6" fill="#16A34A"/>
            <text x="180" y="55" class="layer-label" text-anchor="middle">Authorization</text>
            <text x="180" y="72" class="layer-sub" text-anchor="middle">What can you do?</text>
            <text x="180" y="86" class="layer-sub" text-anchor="middle">Privilege levels,</text>
            <text x="180" y="98" class="layer-sub" text-anchor="middle">access policies</text>

            <rect x="245" y="30" width="100" height="80" rx="6" fill="#7C3AED"/>
            <text x="295" y="55" class="layer-label" text-anchor="middle">Accounting</text>
            <text x="295" y="72" class="layer-sub" text-anchor="middle">What did you do?</text>
            <text x="295" y="86" class="layer-sub" text-anchor="middle">Logging, audit trail,</text>
            <text x="295" y="98" class="layer-sub" text-anchor="middle">session tracking</text>

            <!-- Flow arrow -->
            <line x1="115" y1="68" x2="130" y2="68" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrGray)"/>
            <line x1="230" y1="68" x2="245" y2="68" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrGray)"/>

            <!-- Servers -->
            <text x="180" y="135" class="anno-bold" text-anchor="middle">Implementations:</text>
            <text x="90" y="152" class="cmd-text" text-anchor="middle">RADIUS (UDP 1812/1813)</text>
            <text x="270" y="152" class="cmd-text" text-anchor="middle">TACACS+ (TCP 49)</text>
            <text x="180" y="167" class="dim-text" text-anchor="middle">TACACS+ encrypts full payload; RADIUS only encrypts password</text>
          </svg>`
  },
  {
    id: "switch-port-security",
    title: "Switch Port Security",
    desc: "Know all three violation modes: Protect (silent drop), Restrict (drop + log + counter), Shutdown (err-disable, default). The exam tests sticky MAC learning and the recovery command: errdisable recovery cause psecure-violation.",
    domain: "5",
    topic: "5.7",
    group: "l2-security",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg">
            <!-- Switch -->
            <rect x="140" y="10" width="80" height="30" rx="4" fill="#2563EB"/><text x="180" y="29" class="layer-label" text-anchor="middle">Switch</text>

            <!-- Allowed MAC -->
            <circle cx="80" cy="80" r="12" fill="#16A34A"/><text x="80" y="84" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">OK</text>
            <line x1="92" y1="76" x2="144" y2="35" stroke="#16A34A" stroke-width="1.5"/>
            <text x="45" y="100" class="cmd-text" text-anchor="middle">AA:BB:CC:11</text>

            <!-- Blocked MAC -->
            <circle cx="280" cy="80" r="12" fill="#DC2626"/><text x="280" y="84" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">X</text>
            <line x1="268" y1="76" x2="216" y2="35" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="4,2"/>
            <text x="315" y="100" class="cmd-text" text-anchor="middle">DD:EE:FF:99</text>

            <!-- Violation modes -->
            <rect x="15" y="120" width="330" height="62" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="138" class="anno-bold">Violation modes:</text>
            <text x="30" y="155" class="anno"><tspan fill="#16A34A" font-weight="700">Protect</tspan> — drops unknown MAC, no log, no shutdown</text>
            <text x="30" y="170" class="anno"><tspan fill="#D97706" font-weight="700">Restrict</tspan> — drops + increments violation counter + logs</text>
            <text x="30" y="185" class="anno"><tspan fill="#DC2626" font-weight="700">Shutdown</tspan> — err-disables port (default), requires manual recovery</text>
          </svg>`
  },
  {
    id: "sdn-architecture",
    title: "SDN Architecture",
    desc: "Know the three SDN layers: Application (top), Control (SDN controller), Infrastructure (data plane). The exam tests northbound APIs (REST, to apps) vs southbound APIs (NETCONF/OpenFlow, to devices).",
    domain: "6",
    topic: "6.3",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
            <!-- Application layer -->
            <rect x="30" y="10" width="300" height="40" rx="6" fill="#7C3AED"/>
            <text x="180" y="30" class="layer-label" text-anchor="middle">Application Layer</text>
            <text x="180" y="42" class="layer-sub" text-anchor="middle">Business apps, monitoring, policy engines</text>

            <!-- NBI -->
            <text x="180" y="62" class="anno-bold" text-anchor="middle" style="fill:#7C3AED">Northbound API (REST)</text>
            <line x1="180" y1="66" x2="180" y2="76" stroke="#7C3AED" stroke-width="1.5"/>

            <!-- Control layer -->
            <rect x="30" y="76" width="300" height="40" rx="6" fill="#2563EB"/>
            <text x="180" y="96" class="layer-label" text-anchor="middle">Control Layer (SDN Controller)</text>
            <text x="180" y="108" class="layer-sub" text-anchor="middle">Cisco DNA Center, OpenDaylight, APIC</text>

            <!-- SBI -->
            <text x="180" y="128" class="anno-bold" text-anchor="middle" style="fill:#2563EB">Southbound API (NETCONF, OpenFlow)</text>
            <line x1="100" y1="132" x2="100" y2="150" stroke="#2563EB" stroke-width="1.5"/>
            <line x1="180" y1="132" x2="180" y2="150" stroke="#2563EB" stroke-width="1.5"/>
            <line x1="260" y1="132" x2="260" y2="150" stroke="#2563EB" stroke-width="1.5"/>

            <!-- Infrastructure layer -->
            <rect x="30" y="150" width="300" height="40" rx="6" fill="#16A34A"/>
            <text x="180" y="170" class="layer-label" text-anchor="middle">Infrastructure Layer (Data Plane)</text>
            <text x="180" y="182" class="layer-sub" text-anchor="middle">Routers, switches, APs — forwarding only</text>

            <!-- Key difference -->
            <rect x="30" y="200" width="300" height="24" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="216" class="anno" text-anchor="middle">Traditional: each device has its own control + data plane. SDN: control is centralized.</text>
          </svg>`
  },
  {
    id: "rest-api-basics",
    title: "REST API Basics",
    desc: "The exam tests CRUD-to-HTTP mapping: GET=Read, POST=Create, PUT=Update, DELETE=Remove. Know status codes: 200 OK, 201 Created, 401 Unauthorized, 403 Forbidden, 404 Not Found. Data format is JSON.",
    domain: "6",
    topic: "6.5",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <!-- HTTP Methods -->
            <text x="15" y="18" class="anno-bold">CRUD Operations → HTTP Methods</text>
            <rect x="15" y="26" width="70" height="22" rx="3" fill="#16A34A"/><text x="50" y="41" class="pkt-label" text-anchor="middle">GET</text><text x="95" y="41" class="anno">Read / retrieve</text>
            <rect x="15" y="52" width="70" height="22" rx="3" fill="#2563EB"/><text x="50" y="67" class="pkt-label" text-anchor="middle">POST</text><text x="95" y="67" class="anno">Create new</text>
            <rect x="15" y="78" width="70" height="22" rx="3" fill="#D97706"/><text x="50" y="93" class="pkt-label" text-anchor="middle">PUT</text><text x="95" y="93" class="anno">Update / replace</text>
            <rect x="15" y="104" width="70" height="22" rx="3" fill="#DC2626"/><text x="50" y="119" class="pkt-label" text-anchor="middle">DELETE</text><text x="95" y="119" class="anno">Remove</text>

            <!-- Status codes -->
            <text x="220" y="18" class="anno-bold">Status Codes</text>
            <rect x="220" y="26" width="30" height="18" rx="2" fill="#16A34A"/><text x="235" y="39" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">200</text><text x="258" y="39" class="anno">OK</text>
            <rect x="220" y="48" width="30" height="18" rx="2" fill="#16A34A"/><text x="235" y="61" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">201</text><text x="258" y="61" class="anno">Created</text>
            <rect x="220" y="70" width="30" height="18" rx="2" fill="#D97706"/><text x="235" y="83" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">401</text><text x="258" y="83" class="anno">Unauthorized</text>
            <rect x="220" y="92" width="30" height="18" rx="2" fill="#DC2626"/><text x="235" y="105" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">403</text><text x="258" y="105" class="anno">Forbidden</text>
            <rect x="220" y="114" width="30" height="18" rx="2" fill="#DC2626"/><text x="235" y="127" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">404</text><text x="258" y="127" class="anno">Not Found</text>

            <!-- JSON example -->
            <rect x="15" y="140" width="330" height="52" rx="4" fill="#1C1917"/>
            <text x="25" y="157" style="font-size:9px;fill:#16A34A;font-family:'JetBrains Mono',monospace">GET /api/v1/devices/switches</text>
            <text x="25" y="172" style="font-size:9px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">{"hostname": "SW-CORE-01", "ip": "10.0.1.1",</text>
            <text x="30" y="185" style="font-size:9px;fill:#94A3B8;font-family:'JetBrains Mono',monospace"> "model": "C9300", "status": "reachable"}</text>
          </svg>`
  },
  {
    id: "config-management-tools",
    title: "Config Management Tools",
    desc: "For CCNA, Ansible is most relevant — agentless (SSH-based), uses YAML playbooks, push model. Know the difference vs Puppet/Chef (agent-based, pull model). The exam focuses on Ansible for network automation.",
    domain: "6",
    topic: "6.6",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg">
            <!-- Ansible (agentless) -->
            <rect x="15" y="15" width="100" height="75" rx="6" fill="#DC2626"/>
            <text x="65" y="38" class="layer-label" text-anchor="middle">Ansible</text>
            <text x="65" y="52" class="layer-sub" text-anchor="middle">Agentless (SSH)</text>
            <text x="65" y="66" class="layer-sub" text-anchor="middle">YAML playbooks</text>
            <text x="65" y="80" class="layer-sub" text-anchor="middle">Push model</text>

            <!-- Puppet -->
            <rect x="130" y="15" width="100" height="75" rx="6" fill="#D97706"/>
            <text x="180" y="38" class="layer-label" text-anchor="middle">Puppet</text>
            <text x="180" y="52" class="layer-sub" text-anchor="middle">Agent-based</text>
            <text x="180" y="66" class="layer-sub" text-anchor="middle">Puppet DSL</text>
            <text x="180" y="80" class="layer-sub" text-anchor="middle">Pull model</text>

            <!-- Chef -->
            <rect x="245" y="15" width="100" height="75" rx="6" fill="#CA8A04"/>
            <text x="295" y="38" class="layer-label" text-anchor="middle">Chef</text>
            <text x="295" y="52" class="layer-sub" text-anchor="middle">Agent-based</text>
            <text x="295" y="66" class="layer-sub" text-anchor="middle">Ruby DSL</text>
            <text x="295" y="80" class="layer-sub" text-anchor="middle">Pull model</text>

            <!-- Key for CCNA -->
            <rect x="15" y="105" width="330" height="55" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="123" class="anno-bold">For CCNA, know:</text>
            <text x="30" y="140" class="anno">Ansible is most relevant — agentless, uses SSH, YAML-based, widely used for network automation.</text>
            <text x="30" y="155" class="cmd-text">ansible-playbook -i hosts configure-vlans.yml</text>
          </svg>`
  },
  {
    id: "wireless-standards-80211",
    title: "Wireless Standards (802.11)",
    desc: "Memorize the Wi-Fi generation names: 802.11n=Wi-Fi 4, 802.11ac=Wi-Fi 5, 802.11ax=Wi-Fi 6. Know frequency bands (2.4 GHz vs 5 GHz vs both) and key features: MIMO, MU-MIMO, OFDMA.",
    domain: "2",
    topic: "1.11",
    group: "wireless",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg">
            <!-- Frequency bands -->
            <rect x="15" y="15" width="155" height="18" rx="2" fill="#2563EB" opacity="0.2"/><text x="92" y="28" class="anno-bold" text-anchor="middle" style="fill:#2563EB">2.4 GHz Band</text>
            <rect x="190" y="15" width="155" height="18" rx="2" fill="#7C3AED" opacity="0.2"/><text x="267" y="28" class="anno-bold" text-anchor="middle" style="fill:#7C3AED">5 GHz Band</text>

            <!-- Standards table -->
            <text x="15" y="52" class="anno-bold" style="font-size:8px">Standard</text>
            <text x="80" y="52" class="anno-bold" style="font-size:8px">Wi-Fi</text>
            <text x="130" y="52" class="anno-bold" style="font-size:8px">Freq</text>
            <text x="210" y="52" class="anno-bold" style="font-size:8px">Max Speed</text>
            <text x="300" y="52" class="anno-bold" style="font-size:8px">Notes</text>

            <line x1="15" y1="57" x2="345" y2="57" stroke="#D4D0C8" stroke-width="0.5"/>

            <text x="15" y="72" class="cmd-text">802.11a</text><text x="80" y="72" class="anno">—</text><text x="130" y="72" class="anno">5 GHz</text><text x="210" y="72" class="anno">54 Mbps</text><text x="300" y="72" class="dim-text">Legacy</text>
            <text x="15" y="89" class="cmd-text">802.11b</text><text x="80" y="89" class="anno">—</text><text x="130" y="89" class="anno">2.4 GHz</text><text x="210" y="89" class="anno">11 Mbps</text><text x="300" y="89" class="dim-text">Legacy</text>
            <text x="15" y="106" class="cmd-text">802.11g</text><text x="80" y="106" class="anno">—</text><text x="130" y="106" class="anno">2.4 GHz</text><text x="210" y="106" class="anno">54 Mbps</text><text x="300" y="106" class="dim-text">Legacy</text>
            <text x="15" y="123" class="cmd-text">802.11n</text><text x="80" y="123" class="anno-bold">Wi-Fi 4</text><text x="130" y="123" class="anno">Both</text><text x="210" y="123" class="anno">600 Mbps</text><text x="300" y="123" class="anno" style="fill:#16A34A">MIMO</text>
            <text x="15" y="140" class="cmd-text">802.11ac</text><text x="80" y="140" class="anno-bold">Wi-Fi 5</text><text x="130" y="140" class="anno">5 GHz</text><text x="210" y="140" class="anno">6.9 Gbps</text><text x="300" y="140" class="anno" style="fill:#16A34A">MU-MIMO</text>
            <text x="15" y="157" class="cmd-text">802.11ax</text><text x="80" y="157" class="anno-bold">Wi-Fi 6</text><text x="130" y="157" class="anno">Both</text><text x="210" y="157" class="anno">9.6 Gbps</text><text x="300" y="157" class="anno" style="fill:#16A34A">OFDMA</text>

            <rect x="15" y="168" width="330" height="18" rx="3" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="181" class="dim-text" text-anchor="middle">Exam focus: know freq bands, Wi-Fi 4/5/6 names, and MIMO vs MU-MIMO vs OFDMA</text>
          </svg>`
  },
  {
    id: "ipv6-address-structure",
    title: "IPv6 Address Structure",
    desc: "The exam tests IPv6 compression rules: drop leading zeros, use :: once for consecutive all-zero groups. Know the /64 split (prefix + interface ID) and common addresses: ::1 (loopback), FE80::/10 (link-local), FF02::1 (all nodes).",
    domain: "1",
    topic: "1.8",
    group: "ipv6",
    deepDive: "visuals/ipv6.html",
    svg: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg">
            <!-- Full address -->
            <text x="180" y="18" class="anno-bold" text-anchor="middle">Full Address (128 bits = 8 hextets)</text>
            <rect x="10" y="24" width="340" height="28" rx="3" fill="#1C1917"/>
            <text x="180" y="43" style="font-size:11px;fill:#4ADE80;font-family:'JetBrains Mono',monospace;font-weight:600" text-anchor="middle">2001:0DB8:0000:0000:0000:0000:0000:0001</text>

            <!-- Compressed -->
            <text x="180" y="72" class="anno-bold" text-anchor="middle">Compressed (:: replaces consecutive zero groups)</text>
            <rect x="80" y="78" width="200" height="28" rx="3" fill="#1C1917"/>
            <text x="180" y="97" style="font-size:13px;fill:#4ADE80;font-family:'JetBrains Mono',monospace;font-weight:700" text-anchor="middle">2001:DB8::1</text>

            <!-- Prefix / Interface ID split -->
            <text x="180" y="126" class="anno-bold" text-anchor="middle">Typical /64 split:</text>
            <rect x="30" y="132" width="150" height="24" rx="3" fill="#2563EB"/><text x="105" y="148" class="pkt-label" text-anchor="middle">Network Prefix (64 bits)</text>
            <rect x="182" y="132" width="150" height="24" rx="3" fill="#16A34A"/><text x="257" y="148" class="pkt-label" text-anchor="middle">Interface ID (64 bits)</text>
          </svg>`
  },
  {
    id: "poe-standards-power-over-ethernet",
    title: "PoE Standards — Power Over Ethernet",
    desc: "Know the IEEE standards: 802.3af (15.4W), 802.3at PoE+ (30W), 802.3bt PoE++ (60W/90W). The exam tests PSE vs PD terminology and which standard powers which device type (phone, AP, camera).",
    domain: "1",
    topic: "1.1",
    group: "poe",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg">
            <!-- Standards comparison bars -->
            <text x="15" y="16" class="anno-bold" style="font-size:10px">Standard</text>
            <text x="110" y="16" class="anno-bold" style="font-size:10px">IEEE</text>
            <text x="180" y="16" class="anno-bold" style="font-size:10px">Max Power</text>
            <text x="260" y="16" class="anno-bold" style="font-size:10px">Powers</text>
            <line x1="15" y1="22" x2="345" y2="22" stroke="#D4D0C8" stroke-width="0.5"/>

            <!-- PoE -->
            <text x="15" y="42" class="anno-bold" style="fill:#0EA5E9">PoE</text>
            <text x="110" y="42" class="cmd-text">802.3af</text>
            <rect x="180" y="30" width="46" height="16" rx="2" fill="#0EA5E9"/><text x="203" y="42" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">15.4W</text>
            <text x="260" y="42" class="anno">IP phones, basic APs</text>

            <!-- PoE+ -->
            <text x="15" y="68" class="anno-bold" style="fill:#2563EB">PoE+</text>
            <text x="110" y="68" class="cmd-text">802.3at</text>
            <rect x="180" y="56" width="90" height="16" rx="2" fill="#2563EB"/><text x="225" y="68" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">30W</text>
            <text x="260" y="68" class="anno">Dual-radio APs, cameras</text>

            <!-- PoE++ Type 3 -->
            <text x="15" y="94" class="anno-bold" style="fill:#7C3AED">PoE++ T3</text>
            <text x="110" y="94" class="cmd-text">802.3bt</text>
            <rect x="180" y="82" width="180" height="16" rx="2" fill="#7C3AED"/><text x="270" y="94" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">60W</text>
            <text x="260" y="105" class="anno">PTZ cameras, video phones</text>

            <!-- PoE++ Type 4 -->
            <text x="15" y="124" class="anno-bold" style="fill:#DC2626">PoE++ T4</text>
            <text x="110" y="124" class="cmd-text">802.3bt</text>
            <rect x="180" y="112" width="270" height="16" rx="2" fill="#DC2626"/><text x="315" y="124" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">90W</text>
            <text x="260" y="136" class="anno">Laptops, digital signs</text>

            <!-- PSE → PD flow -->
            <text x="15" y="162" class="anno-bold">How it works:</text>
            <rect x="15" y="170" width="90" height="28" rx="4" fill="#2563EB"/><text x="60" y="184" style="font-size:8px;fill:#fff;font-weight:700" text-anchor="middle">PSE (Switch)</text>
            <line x1="105" y1="184" x2="155" y2="184" stroke="#16A34A" stroke-width="2" marker-end="url(#arrGreen)"/>
            <text x="130" y="176" class="dim-text" text-anchor="middle">Power +</text>
            <text x="130" y="196" class="dim-text" text-anchor="middle">Data</text>
            <rect x="155" y="170" width="90" height="28" rx="4" fill="#16A34A"/><text x="200" y="184" style="font-size:8px;fill:#fff;font-weight:700" text-anchor="middle">PD (AP/Phone)</text>

            <text x="15" y="218" class="anno">PSE = Power Sourcing Equipment (the switch) | PD = Powered Device (AP, phone, camera)</text>
          </svg>`
  },
  {
    id: "poe-power-budget",
    title: "PoE Power Budget",
    desc: "Exam scenario: given a switch PoE budget and device wattages, calculate if the budget supports all devices. Know that exceeding the budget causes lower-priority ports to lose power. Verify with show power inline.",
    domain: "1",
    topic: "1.1",
    group: "poe",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg">
            <!-- Switch budget bar -->
            <text x="15" y="16" class="anno-bold">Switch: Catalyst 9300-48P</text>
            <text x="240" y="16" class="cmd-text">Total budget: 740W</text>
            <rect x="15" y="24" width="330" height="18" rx="3" fill="#E2DFD9"/>
            <rect x="15" y="24" width="240" height="18" rx="3" fill="#2563EB"/><text x="130" y="36" style="font-size:8px;fill:#fff;font-weight:600" text-anchor="middle">Used: 540W</text>
            <rect x="255" y="24" width="90" height="18" rx="3" fill="#16A34A" opacity="0.4"/><text x="300" y="36" style="font-size:8px;fill:#16A34A;font-weight:600" text-anchor="middle">Free: 200W</text>

            <!-- Device breakdown -->
            <text x="15" y="62" class="anno-bold">Connected devices:</text>
            <rect x="15" y="70" width="100" height="16" rx="2" fill="#0EA5E9"/><text x="65" y="82" style="font-size:7px;fill:#fff;font-weight:600" text-anchor="middle">20x IP Phones (7W)</text><text x="125" y="82" class="cmd-text">= 140W</text>
            <rect x="15" y="90" width="160" height="16" rx="2" fill="#2563EB"/><text x="95" y="102" style="font-size:7px;fill:#fff;font-weight:600" text-anchor="middle">10x APs (PoE+ 25W)</text><text x="185" y="102" class="cmd-text">= 250W</text>
            <rect x="15" y="110" width="120" height="16" rx="2" fill="#7C3AED"/><text x="75" y="122" style="font-size:7px;fill:#fff;font-weight:600" text-anchor="middle">5x Cameras (30W)</text><text x="145" y="122" class="cmd-text">= 150W</text>

            <!-- Warning -->
            <rect x="15" y="140" width="330" height="32" rx="4" fill="#FEF2F2" stroke="#FECACA"/>
            <text x="30" y="155" class="anno-bold" style="fill:#DC2626">Exam tip:</text>
            <text x="100" y="155" class="anno">If budget is exceeded, lower-priority ports lose power.</text>
            <text x="30" y="168" class="cmd-text">show power inline</text><text x="170" y="168" class="anno">← verify PoE status per port</text>
          </svg>`
  },
  {
    id: "arp-address-resolution-protocol",
    title: "ARP — Address Resolution Protocol",
    desc: "ARP is tested in the context of L2/L3 interaction. Know that ARP Request is broadcast (FF:FF:FF:FF:FF:FF) and ARP Reply is unicast. The ARP table entry times out (~300s). Gratuitous ARP announces IP changes.",
    domain: "1",
    topic: "1.13",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
            <!-- Host A -->
            <rect x="20" y="10" width="70" height="28" rx="4" fill="#2563EB"/><text x="55" y="28" class="layer-label" text-anchor="middle">Host A</text>
            <text x="55" y="50" class="cmd-text" text-anchor="middle">10.0.0.1</text>
            <text x="55" y="62" class="dim-text" text-anchor="middle">AA:AA:AA:11</text>
            <line x1="55" y1="65" x2="55" y2="170" stroke="#2563EB" stroke-width="2"/>

            <!-- Switch -->
            <rect x="150" y="90" width="60" height="24" rx="4" fill="#64748B"/><text x="180" y="106" class="pkt-label" text-anchor="middle">Switch</text>

            <!-- Host B -->
            <rect x="270" y="10" width="70" height="28" rx="4" fill="#16A34A"/><text x="305" y="28" class="layer-label" text-anchor="middle">Host B</text>
            <text x="305" y="50" class="cmd-text" text-anchor="middle">10.0.0.2</text>
            <text x="305" y="62" class="dim-text" text-anchor="middle">BB:BB:BB:22</text>
            <line x1="305" y1="65" x2="305" y2="170" stroke="#16A34A" stroke-width="2"/>

            <!-- ARP Request (broadcast) -->
            <line x1="58" y1="95" x2="148" y2="95" stroke="#D97706" stroke-width="2" marker-end="url(#arrowOrange)"/>
            <line x1="212" y1="95" x2="302" y2="95" stroke="#D97706" stroke-width="2" marker-end="url(#arrowOrange)"/>
            <rect x="90" y="76" width="180" height="16" rx="3" fill="#D97706"/><text x="180" y="88" class="pkt-label" text-anchor="middle">ARP Request: Who has 10.0.0.2? (broadcast FF:FF:FF)</text>

            <!-- ARP Reply (unicast) -->
            <line x1="302" y1="135" x2="58" y2="135" stroke="#16A34A" stroke-width="2" marker-end="url(#arrGreen)"/>
            <rect x="80" y="126" width="200" height="16" rx="3" fill="#16A34A"/><text x="180" y="138" class="pkt-label" text-anchor="middle">ARP Reply: 10.0.0.2 is at BB:BB:BB:22 (unicast)</text>

            <!-- ARP table -->
            <rect x="20" y="175" width="320" height="38" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="35" y="191" class="anno-bold">Host A's ARP table updated:</text>
            <text x="35" y="206" class="cmd-text">10.0.0.2  →  BB:BB:BB:22  (dynamic, timeout ~300s)</text>
          </svg>`
  },
  {
    id: "ntp-network-time-protocol",
    title: "NTP — Network Time Protocol",
    desc: "Know the stratum hierarchy: 0=atomic clock, 1=directly attached server, max usable=15, 16=unsynchronized. NTP uses UDP 123. Consistent timestamps are critical for syslog correlation and certificate validation.",
    domain: "4",
    topic: "4.2",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Stratum 0: Reference clock -->
            <rect x="130" y="5" width="100" height="26" rx="4" fill="#D97706"/>
            <text x="180" y="22" class="layer-label" text-anchor="middle">Stratum 0</text>
            <text x="180" y="40" class="dim-text" text-anchor="middle">Atomic clock / GPS</text>

            <!-- Stratum 1 -->
            <rect x="130" y="50" width="100" height="26" rx="4" fill="#CA8A04"/>
            <text x="180" y="67" class="layer-label" text-anchor="middle">Stratum 1</text>
            <line x1="180" y1="31" x2="180" y2="50" stroke="#D97706" stroke-width="1.5"/>
            <text x="250" y="67" class="anno">NTP server (directly attached)</text>

            <!-- Stratum 2 -->
            <circle cx="100" cy="110" r="16" fill="#2563EB"/><text x="100" y="114" class="pkt-label" text-anchor="middle">S2</text>
            <circle cx="260" cy="110" r="16" fill="#2563EB"/><text x="260" y="114" class="pkt-label" text-anchor="middle">S2</text>
            <line x1="170" y1="76" x2="108" y2="96" stroke="#CA8A04" stroke-width="1.2"/>
            <line x1="190" y1="76" x2="252" y2="96" stroke="#CA8A04" stroke-width="1.2"/>

            <!-- Stratum 3 (clients) -->
            <circle cx="60" cy="155" r="12" fill="#0EA5E9"/><text x="60" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">S3</text>
            <circle cx="140" cy="155" r="12" fill="#0EA5E9"/><text x="140" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">S3</text>
            <circle cx="220" cy="155" r="12" fill="#0EA5E9"/><text x="220" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">S3</text>
            <circle cx="300" cy="155" r="12" fill="#0EA5E9"/><text x="300" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">S3</text>
            <line x1="96" y1="126" x2="68" y2="143" stroke="#2563EB" stroke-width="1"/>
            <line x1="106" y1="126" x2="134" y2="143" stroke="#2563EB" stroke-width="1"/>
            <line x1="254" y1="126" x2="226" y2="143" stroke="#2563EB" stroke-width="1"/>
            <line x1="266" y1="126" x2="294" y2="143" stroke="#2563EB" stroke-width="1"/>

            <!-- Config -->
            <rect x="20" y="178" width="320" height="18" rx="3" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="191" class="cmd-text" text-anchor="middle">ntp server 10.0.0.1 | UDP port 123 | Max stratum: 15</text>
          </svg>`
  },
  {
    id: "fhrp-hsrp-vrrp-glbp",
    title: "FHRP — HSRP / VRRP / GLBP",
    desc: "The exam tests HSRP (Cisco, active/standby), VRRP (open standard, master/backup), and GLBP (Cisco, load balancing). Know that hosts point to the virtual IP and that higher priority wins active/master role.",
    domain: "3",
    topic: "3.5",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg">
            <!-- Virtual IP -->
            <rect x="120" y="5" width="120" height="28" rx="4" fill="#7C3AED"/>
            <text x="180" y="18" class="layer-label" text-anchor="middle">Virtual IP</text>
            <text x="180" y="28" class="layer-sub" text-anchor="middle">10.0.0.1 (gateway)</text>

            <!-- Active Router -->
            <rect x="40" y="60" width="100" height="36" rx="4" fill="#16A34A"/>
            <text x="90" y="76" class="layer-label" text-anchor="middle">Active Router</text>
            <text x="90" y="88" class="layer-sub" text-anchor="middle">10.0.0.2 (pri: 110)</text>
            <line x1="145" y1="33" x2="105" y2="60" stroke="#7C3AED" stroke-width="1.5"/>

            <!-- Standby Router -->
            <rect x="220" y="60" width="100" height="36" rx="4" fill="#D97706"/>
            <text x="270" y="76" class="layer-label" text-anchor="middle">Standby Router</text>
            <text x="270" y="88" class="layer-sub" text-anchor="middle">10.0.0.3 (pri: 100)</text>
            <line x1="215" y1="33" x2="255" y2="60" stroke="#7C3AED" stroke-width="1.5" stroke-dasharray="4,2"/>

            <!-- Hello messages -->
            <line x1="140" y1="78" x2="220" y2="78" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3,3"/>
            <text x="180" y="73" class="dim-text" text-anchor="middle">Hellos (3s)</text>

            <!-- Hosts -->
            <rect x="100" y="120" width="160" height="24" rx="4" fill="#64748B"/>
            <text x="180" y="136" class="pkt-label" text-anchor="middle">Switch (Layer 2)</text>
            <line x1="90" y1="96" x2="140" y2="120" stroke="#94A3B8" stroke-width="1.2"/>
            <line x1="270" y1="96" x2="220" y2="120" stroke="#94A3B8" stroke-width="1.2"/>

            <circle cx="120" cy="165" r="8" fill="#94A3B8"/><text x="120" y="168" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">PC</text>
            <circle cx="180" cy="165" r="8" fill="#94A3B8"/><text x="180" y="168" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">PC</text>
            <circle cx="240" cy="165" r="8" fill="#94A3B8"/><text x="240" y="168" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">PC</text>
            <line x1="120" y1="157" x2="140" y2="144" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="180" y1="157" x2="180" y2="144" stroke="#CBD5E1" stroke-width="1"/>
            <line x1="240" y1="157" x2="220" y2="144" stroke="#CBD5E1" stroke-width="1"/>
            <text x="180" y="185" class="dim-text" text-anchor="middle">Hosts point to virtual IP — never changes</text>

            <!-- Protocol comparison -->
            <rect x="15" y="195" width="330" height="48" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="210" class="anno-bold">HSRP</text><text x="70" y="210" class="anno">— Cisco proprietary, active/standby</text>
            <text x="30" y="225" class="anno-bold">VRRP</text><text x="70" y="225" class="anno">— Open standard (RFC 5798), master/backup</text>
            <text x="30" y="240" class="anno-bold">GLBP</text><text x="70" y="240" class="anno">— Cisco, load balances across multiple routers</text>
          </svg>`
  },
  {
    id: "tcp-vs-udp",
    title: "TCP vs UDP",
    desc: "The exam gives protocol names and asks TCP or UDP. Memorize: TCP — HTTP(80), HTTPS(443), SSH(22), FTP(21), Telnet(23). UDP — DNS(53), DHCP(67/68), TFTP(69), SNMP(161), NTP(123). DNS uses both.",
    domain: "1",
    topic: "1.5",
    group: "transport",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg">
            <!-- TCP -->
            <rect x="15" y="10" width="155" height="120" rx="6" fill="#2563EB"/>
            <text x="92" y="32" class="layer-label" text-anchor="middle">TCP</text>
            <text x="92" y="48" class="layer-sub" text-anchor="middle">Connection-oriented</text>
            <text x="92" y="64" class="layer-sub" text-anchor="middle">Reliable (ACKs, retransmit)</text>
            <text x="92" y="80" class="layer-sub" text-anchor="middle">Ordered delivery</text>
            <text x="92" y="96" class="layer-sub" text-anchor="middle">Flow + congestion control</text>
            <text x="92" y="112" class="layer-sub" text-anchor="middle">3-way handshake</text>
            <text x="92" y="124" class="layer-sub" text-anchor="middle">Higher overhead (20B header)</text>

            <!-- UDP -->
            <rect x="190" y="10" width="155" height="120" rx="6" fill="#16A34A"/>
            <text x="267" y="32" class="layer-label" text-anchor="middle">UDP</text>
            <text x="267" y="48" class="layer-sub" text-anchor="middle">Connectionless</text>
            <text x="267" y="64" class="layer-sub" text-anchor="middle">Unreliable (best effort)</text>
            <text x="267" y="80" class="layer-sub" text-anchor="middle">No ordering guarantee</text>
            <text x="267" y="96" class="layer-sub" text-anchor="middle">No flow control</text>
            <text x="267" y="112" class="layer-sub" text-anchor="middle">No handshake — fire & forget</text>
            <text x="267" y="124" class="layer-sub" text-anchor="middle">Low overhead (8B header)</text>

            <!-- Common protocols -->
            <text x="15" y="150" class="anno-bold">TCP protocols:</text>
            <text x="15" y="165" class="cmd-text">HTTP(80) HTTPS(443) SSH(22) FTP(21) SMTP(25) Telnet(23)</text>
            <text x="15" y="185" class="anno-bold">UDP protocols:</text>
            <text x="15" y="200" class="cmd-text">DNS(53) DHCP(67/68) TFTP(69) SNMP(161) NTP(123) Syslog(514)</text>
          </svg>`
  },
  {
    id: "inter-vlan-routing-router-on-a-stick",
    title: "Inter-VLAN Routing (Router-on-a-Stick)",
    desc: "The exam tests router-on-a-stick config: one physical link, trunk to switch, subinterfaces with encapsulation dot1Q per VLAN. Know when to use this vs a Layer 3 switch (SVI) for inter-VLAN routing.",
    domain: "3",
    topic: "2.1",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg">
            <!-- Router -->
            <rect x="140" y="5" width="80" height="30" rx="4" fill="#D97706"/><text x="180" y="24" class="layer-label" text-anchor="middle">Router</text>

            <!-- Subinterfaces -->
            <text x="110" y="50" class="cmd-text" text-anchor="end">G0/0.10</text>
            <rect x="115" y="41" width="50" height="14" rx="2" fill="#3B82F6"/><text x="140" y="51" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">VLAN 10</text>
            <text x="250" y="50" class="cmd-text">G0/0.20</text>
            <rect x="195" y="41" width="50" height="14" rx="2" fill="#16A34A"/><text x="220" y="51" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">VLAN 20</text>

            <!-- Trunk link -->
            <line x1="180" y1="55" x2="180" y2="90" stroke="#D97706" stroke-width="3"/>
            <text x="200" y="78" class="anno-bold" style="fill:#D97706">Trunk</text>

            <!-- Switch -->
            <rect x="140" y="90" width="80" height="28" rx="4" fill="#2563EB"/><text x="180" y="108" class="layer-label" text-anchor="middle">Switch</text>

            <!-- VLAN 10 hosts -->
            <circle cx="60" cy="155" r="10" fill="#3B82F6"/><text x="60" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">10</text>
            <circle cx="100" cy="155" r="10" fill="#3B82F6"/><text x="100" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">10</text>
            <line x1="155" y1="118" x2="67" y2="146" stroke="#3B82F6" stroke-width="1"/>
            <line x1="160" y1="118" x2="100" y2="146" stroke="#3B82F6" stroke-width="1"/>
            <text x="80" y="180" class="cmd-text" text-anchor="middle">10.0.10.0/24</text>

            <!-- VLAN 20 hosts -->
            <circle cx="260" cy="155" r="10" fill="#16A34A"/><text x="260" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">20</text>
            <circle cx="300" cy="155" r="10" fill="#16A34A"/><text x="300" y="159" style="font-size:7px;fill:#fff;font-weight:700" text-anchor="middle">20</text>
            <line x1="205" y1="118" x2="253" y2="146" stroke="#16A34A" stroke-width="1"/>
            <line x1="210" y1="118" x2="293" y2="146" stroke="#16A34A" stroke-width="1"/>
            <text x="280" y="180" class="cmd-text" text-anchor="middle">10.0.20.0/24</text>

            <!-- Config note -->
            <rect x="20" y="193" width="320" height="22" rx="3" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="208" class="cmd-text" text-anchor="middle">encapsulation dot1Q 10 | ip address 10.0.10.1 255.255.255.0</text>
          </svg>`
  },
  {
    id: "syslog-severity-levels",
    title: "Syslog Severity Levels",
    desc: "Memorize all 8 levels: Emergency(0), Alert(1), Critical(2), Error(3), Warning(4), Notification(5), Informational(6), Debugging(7). Mnemonic: Every Awesome Cisco Engineer Will Need Ice-cream Daily. Uses UDP 514.",
    domain: "4",
    topic: "4.5",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg">
            <text x="20" y="16" class="anno-bold">Level</text><text x="65" y="16" class="anno-bold">Keyword</text><text x="165" y="16" class="anno-bold">Description</text>
            <line x1="15" y1="22" x2="345" y2="22" stroke="#D4D0C8" stroke-width="0.5"/>

            <rect x="15" y="27" width="330" height="18" rx="2" fill="#DC262615"/>
            <text x="30" y="40" class="cmd-text">0</text><text x="65" y="40" class="anno-bold" style="fill:#DC2626">Emergency</text><text x="165" y="40" class="anno">System unusable</text>
            <rect x="15" y="47" width="330" height="18" rx="2" fill="#DC262610"/>
            <text x="30" y="60" class="cmd-text">1</text><text x="65" y="60" class="anno-bold" style="fill:#DC2626">Alert</text><text x="165" y="60" class="anno">Immediate action needed</text>
            <text x="30" y="80" class="cmd-text">2</text><text x="65" y="80" class="anno-bold" style="fill:#D97706">Critical</text><text x="165" y="80" class="anno">Critical conditions</text>
            <rect x="15" y="87" width="330" height="18" rx="2" fill="#D9770610"/>
            <text x="30" y="100" class="cmd-text">3</text><text x="65" y="100" class="anno-bold" style="fill:#D97706">Error</text><text x="165" y="100" class="anno">Error conditions</text>
            <text x="30" y="120" class="cmd-text">4</text><text x="65" y="120" class="anno-bold" style="fill:#CA8A04">Warning</text><text x="165" y="120" class="anno">Warning conditions</text>
            <rect x="15" y="127" width="330" height="18" rx="2" fill="#16A34A10"/>
            <text x="30" y="140" class="cmd-text">5</text><text x="65" y="140" class="anno-bold">Notification</text><text x="165" y="140" class="anno">Normal but significant</text>
            <text x="30" y="160" class="cmd-text">6</text><text x="65" y="160" class="anno-bold" style="fill:#2563EB">Informational</text><text x="165" y="160" class="anno">Informational messages</text>
            <rect x="15" y="167" width="330" height="18" rx="2" fill="#0EA5E910"/>
            <text x="30" y="180" class="cmd-text">7</text><text x="65" y="180" class="anno-bold" style="fill:#0EA5E9">Debugging</text><text x="165" y="180" class="anno">Debug-level messages</text>

            <!-- Mnemonic -->
            <rect x="15" y="190" width="330" height="18" rx="3" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="203" class="anno-bold" text-anchor="middle">Mnemonic: Every Awesome Cisco Engineer Will Need Ice-cream Daily</text>
          </svg>`
  },
  {
    id: "snmp-architecture",
    title: "SNMP Architecture",
    desc: "Know SNMPv2c (community strings, plaintext, insecure) vs SNMPv3 (auth + encryption). The exam tests GET/SET (manager polls agent, UDP 161) vs TRAP/INFORM (agent notifies manager, UDP 162).",
    domain: "4",
    topic: "4.4",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg">
            <!-- NMS (Manager) -->
            <rect x="120" y="5" width="120" height="32" rx="4" fill="#7C3AED"/>
            <text x="180" y="20" class="layer-label" text-anchor="middle">NMS (Manager)</text>
            <text x="180" y="30" class="layer-sub" text-anchor="middle">Polls + receives traps</text>

            <!-- Agents -->
            <rect x="15" y="80" width="70" height="28" rx="4" fill="#2563EB"/><text x="50" y="98" class="pkt-label" text-anchor="middle">Router</text>
            <rect x="105" y="80" width="70" height="28" rx="4" fill="#2563EB"/><text x="140" y="98" class="pkt-label" text-anchor="middle">Switch</text>
            <rect x="195" y="80" width="70" height="28" rx="4" fill="#2563EB"/><text x="230" y="98" class="pkt-label" text-anchor="middle">Firewall</text>
            <rect x="285" y="80" width="60" height="28" rx="4" fill="#2563EB"/><text x="315" y="98" class="pkt-label" text-anchor="middle">AP</text>

            <!-- Get/Set arrows (down) -->
            <line x1="160" y1="37" x2="55" y2="80" stroke="#16A34A" stroke-width="1.2" marker-end="url(#arrGreen)"/>
            <line x1="175" y1="37" x2="140" y2="80" stroke="#16A34A" stroke-width="1.2" marker-end="url(#arrGreen)"/>
            <line x1="185" y1="37" x2="230" y2="80" stroke="#16A34A" stroke-width="1.2" marker-end="url(#arrGreen)"/>
            <line x1="200" y1="37" x2="310" y2="80" stroke="#16A34A" stroke-width="1.2" marker-end="url(#arrGreen)"/>
            <text x="80" y="60" class="anno" style="fill:#16A34A">GET/SET</text>

            <!-- Trap arrows (up) -->
            <line x1="50" y1="80" x2="155" y2="37" stroke="#DC2626" stroke-width="1" stroke-dasharray="4,2"/>
            <line x1="230" y1="80" x2="190" y2="37" stroke="#DC2626" stroke-width="1" stroke-dasharray="4,2"/>
            <text x="270" y="60" class="anno" style="fill:#DC2626">TRAP (unsolicited)</text>

            <!-- Versions -->
            <rect x="15" y="125" width="330" height="55" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="142" class="anno-bold">Versions (know for exam):</text>
            <text x="30" y="157" class="anno"><tspan fill="#DC2626" font-weight="700">v1/v2c</tspan> — community strings (plaintext, insecure)</text>
            <text x="30" y="172" class="anno"><tspan fill="#16A34A" font-weight="700">v3</tspan> — authentication + encryption (recommended)</text>
            <text x="200" y="142" class="cmd-text">UDP 161 (polls) / 162 (traps)</text>
          </svg>`
  },
  {
    id: "ssh-vs-telnet",
    title: "SSH vs Telnet",
    desc: "The exam expects you to choose SSH over Telnet in every scenario. Know the SSH setup: hostname, domain name, RSA key generation, line vty transport input ssh. Telnet (port 23) is plaintext — never acceptable in production.",
    domain: "5",
    topic: "4.8",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg">
            <!-- Telnet -->
            <rect x="15" y="10" width="155" height="80" rx="6" fill="#DC2626"/>
            <text x="92" y="30" class="layer-label" text-anchor="middle">Telnet</text>
            <text x="92" y="46" class="layer-sub" text-anchor="middle">Port 23</text>
            <text x="92" y="62" class="layer-sub" text-anchor="middle">Plaintext — NO encryption</text>
            <text x="92" y="78" class="layer-sub" text-anchor="middle">Passwords visible on wire</text>

            <!-- SSH -->
            <rect x="190" y="10" width="155" height="80" rx="6" fill="#16A34A"/>
            <text x="267" y="30" class="layer-label" text-anchor="middle">SSH</text>
            <text x="267" y="46" class="layer-sub" text-anchor="middle">Port 22</text>
            <text x="267" y="62" class="layer-sub" text-anchor="middle">Encrypted tunnel</text>
            <text x="267" y="78" class="layer-sub" text-anchor="middle">Key exchange + auth</text>

            <!-- Config -->
            <rect x="15" y="105" width="330" height="48" rx="4" fill="#1C1917"/>
            <text x="25" y="121" style="font-size:8.5px;fill:#16A34A;font-family:'JetBrains Mono',monospace">hostname R1</text>
            <text x="25" y="135" style="font-size:8.5px;fill:#16A34A;font-family:'JetBrains Mono',monospace">ip domain-name lab.local</text>
            <text x="25" y="149" style="font-size:8.5px;fill:#16A34A;font-family:'JetBrains Mono',monospace">crypto key generate rsa modulus 2048</text>
            <text x="200" y="121" style="font-size:8.5px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">! Required for SSH</text>
            <text x="200" y="135" style="font-size:8.5px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">line vty 0 4</text>
            <text x="200" y="149" style="font-size:8.5px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">  transport input ssh</text>
          </svg>`
  },
  {
    id: "cdp-lldp-discovery-protocols",
    title: "CDP & LLDP — Discovery Protocols",
    desc: "Know CDP (Cisco proprietary) vs LLDP (IEEE 802.1AB, open standard). Both are Layer 2 only — not routed. The exam tests show cdp neighbors and show lldp neighbors output fields: device ID, local/remote port, platform.",
    domain: "1",
    topic: "2.3",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg">
            <!-- Device A -->
            <rect x="20" y="30" width="90" height="40" rx="4" fill="#2563EB"/>
            <text x="65" y="48" class="layer-label" text-anchor="middle">Switch A</text>
            <text x="65" y="62" class="layer-sub" text-anchor="middle">G0/1</text>

            <!-- Device B -->
            <rect x="250" y="30" width="90" height="40" rx="4" fill="#16A34A"/>
            <text x="295" y="48" class="layer-label" text-anchor="middle">Router B</text>
            <text x="295" y="62" class="layer-sub" text-anchor="middle">G0/0</text>

            <!-- Advertisements -->
            <line x1="110" y1="44" x2="250" y2="44" stroke="#D97706" stroke-width="1.5" marker-end="url(#arrowOrange)"/>
            <line x1="250" y1="56" x2="110" y2="56" stroke="#7C3AED" stroke-width="1.5" marker-end="url(#arrPurp)"/>
            <text x="180" y="38" class="dim-text" text-anchor="middle">CDP/LLDP advertisements (60s default)</text>

            <!-- Info exchanged -->
            <rect x="110" y="80" width="140" height="50" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#D4D0C8" stroke-width="1"/>
            <text x="180" y="95" class="anno-bold" text-anchor="middle">Info Shared:</text>
            <text x="180" y="110" class="anno" text-anchor="middle">Hostname, IP, Platform,</text>
            <text x="180" y="122" class="anno" text-anchor="middle">Port ID, VLAN, Duplex</text>

            <!-- Comparison -->
            <text x="65" y="152" class="cmd-text" text-anchor="middle">CDP: Cisco only</text>
            <text x="295" y="152" class="cmd-text" text-anchor="middle">LLDP: IEEE 802.1AB</text>
            <text x="180" y="167" class="dim-text" text-anchor="middle">show cdp neighbors | show lldp neighbors</text>
          </svg>`
  },
  {
    id: "ipv4-address-classes-private-ranges",
    title: "IPv4 Address Classes & Private Ranges",
    desc: "Memorize RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Know class boundaries (A=1-126, B=128-191, C=192-223) and that 127.x.x.x is reserved for loopback.",
    domain: "1",
    topic: "1.7",
    group: "ip-addressing",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <text x="20" y="16" class="anno-bold" style="font-size:8px">Class</text><text x="60" y="16" class="anno-bold" style="font-size:8px">Range</text><text x="170" y="16" class="anno-bold" style="font-size:8px">Default Mask</text><text x="275" y="16" class="anno-bold" style="font-size:8px">Use</text>
            <line x1="15" y1="22" x2="345" y2="22" stroke="#D4D0C8" stroke-width="0.5"/>

            <rect x="15" y="26" width="330" height="20" rx="2" fill="#2563EB15"/>
            <text x="30" y="40" class="anno-bold" style="fill:#2563EB;font-size:10px">A</text><text x="60" y="40" class="cmd-text">1.0.0.0 – 126.x.x.x</text><text x="170" y="40" class="cmd-text">/8 (255.0.0.0)</text><text x="275" y="40" class="anno">Large networks</text>

            <rect x="15" y="48" width="330" height="20" rx="2" fill="#16A34A15"/>
            <text x="30" y="62" class="anno-bold" style="fill:#16A34A;font-size:10px">B</text><text x="60" y="62" class="cmd-text">128.0.0.0 – 191.x.x.x</text><text x="170" y="62" class="cmd-text">/16 (255.255.0.0)</text><text x="275" y="62" class="anno">Medium networks</text>

            <rect x="15" y="70" width="330" height="20" rx="2" fill="#7C3AED15"/>
            <text x="30" y="84" class="anno-bold" style="fill:#7C3AED;font-size:10px">C</text><text x="60" y="84" class="cmd-text">192.0.0.0 – 223.x.x.x</text><text x="170" y="84" class="cmd-text">/24 (255.255.255.0)</text><text x="275" y="84" class="anno">Small networks</text>

            <text x="30" y="106" class="anno" style="fill:#94A3B8;font-size:9px">D</text><text x="60" y="106" class="anno" style="fill:#94A3B8">224.0.0.0 – 239.x.x.x (multicast)</text>
            <text x="30" y="120" class="anno" style="fill:#94A3B8;font-size:9px">E</text><text x="60" y="120" class="anno" style="fill:#94A3B8">240.0.0.0 – 255.x.x.x (reserved/experimental)</text>

            <!-- Private ranges -->
            <rect x="15" y="135" width="330" height="58" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="152" class="anno-bold">RFC 1918 Private Ranges (memorize these):</text>
            <text x="30" y="168" class="cmd-text">10.0.0.0/8</text><text x="140" y="168" class="anno">— Class A (1 network, 16M hosts)</text>
            <text x="30" y="181" class="cmd-text">172.16.0.0/12</text><text x="140" y="181" class="anno">— Class B (16 networks)</text>
            <text x="30" y="194" class="cmd-text">192.168.0.0/16</text><text x="140" y="194" class="anno">— Class C (256 networks)</text>
          </svg>`
  },
  {
    id: "qos-quality-of-service",
    title: "QoS — Quality of Service",
    desc: "Know the QoS pipeline: Classify, Mark, Queue, Schedule. The exam tests DSCP markings: EF(46)=voice, AF41(34)=video, DF(0)=best effort. Trust boundary is where markings are accepted — typically the access layer switch.",
    domain: "4",
    topic: "4.7",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
            <!-- Pipeline stages -->
            <text x="180" y="16" class="anno-bold" text-anchor="middle">QoS Pipeline</text>
            <rect x="15" y="24" width="72" height="28" rx="4" fill="#2563EB"/><text x="51" y="42" class="pkt-label" text-anchor="middle">Classify</text>
            <rect x="93" y="24" width="55" height="28" rx="4" fill="#7C3AED"/><text x="120" y="42" class="pkt-label" text-anchor="middle">Mark</text>
            <rect x="154" y="24" width="55" height="28" rx="4" fill="#D97706"/><text x="181" y="42" class="pkt-label" text-anchor="middle">Queue</text>
            <rect x="215" y="24" width="65" height="28" rx="4" fill="#16A34A"/><text x="247" y="42" class="pkt-label" text-anchor="middle">Schedule</text>
            <rect x="286" y="24" width="60" height="28" rx="4" fill="#DC2626"/><text x="316" y="42" class="pkt-label" text-anchor="middle">Police</text>
            <line x1="87" y1="38" x2="93" y2="38" stroke="#94A3B8" stroke-width="1.5"/>
            <line x1="148" y1="38" x2="154" y2="38" stroke="#94A3B8" stroke-width="1.5"/>
            <line x1="209" y1="38" x2="215" y2="38" stroke="#94A3B8" stroke-width="1.5"/>
            <line x1="280" y1="38" x2="286" y2="38" stroke="#94A3B8" stroke-width="1.5"/>

            <!-- DSCP values table -->
            <text x="20" y="75" class="anno-bold">Key DSCP Markings:</text>
            <rect x="15" y="82" width="80" height="20" rx="2" fill="#DC2626"/><text x="55" y="96" class="pkt-label" text-anchor="middle">EF (46)</text><text x="105" y="96" class="anno">Voice — highest priority</text>
            <rect x="15" y="106" width="80" height="20" rx="2" fill="#D97706"/><text x="55" y="120" class="pkt-label" text-anchor="middle">AF41 (34)</text><text x="105" y="120" class="anno">Video conferencing</text>
            <rect x="15" y="130" width="80" height="20" rx="2" fill="#2563EB"/><text x="55" y="144" class="pkt-label" text-anchor="middle">AF21 (18)</text><text x="105" y="144" class="anno">Business critical data</text>
            <rect x="15" y="154" width="80" height="20" rx="2" fill="#94A3B8"/><text x="55" y="168" class="pkt-label" text-anchor="middle">DF / BE (0)</text><text x="105" y="168" class="anno">Best effort (default, no priority)</text>

            <!-- Trust boundary -->
            <rect x="15" y="182" width="330" height="16" rx="3" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="194" class="dim-text" text-anchor="middle">Trust boundary: where markings are accepted vs re-marked (typically access layer)</text>
          </svg>`
  },
  {
    id: "wlc-wireless-lan-controller",
    title: "WLC — Wireless LAN Controller",
    desc: "The exam tests WLC vs autonomous AP architecture. Know CAPWAP (control + data tunnels), that WLC handles SSID/security/roaming/RF, and that lightweight APs cannot function without a WLC.",
    domain: "2",
    topic: "2.6",
    group: "wireless",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 190" xmlns="http://www.w3.org/2000/svg">
            <!-- WLC -->
            <rect x="130" y="5" width="100" height="32" rx="4" fill="#7C3AED"/>
            <text x="180" y="20" class="layer-label" text-anchor="middle">WLC</text>
            <text x="180" y="30" class="layer-sub" text-anchor="middle">Control plane</text>

            <!-- CAPWAP tunnels -->
            <line x1="155" y1="37" x2="70" y2="70" stroke="#7C3AED" stroke-width="1.5" stroke-dasharray="4,2"/>
            <line x1="180" y1="37" x2="180" y2="70" stroke="#7C3AED" stroke-width="1.5" stroke-dasharray="4,2"/>
            <line x1="205" y1="37" x2="290" y2="70" stroke="#7C3AED" stroke-width="1.5" stroke-dasharray="4,2"/>
            <text x="105" y="58" class="dim-text">CAPWAP</text>

            <!-- APs -->
            <circle cx="70" cy="85" r="15" fill="#2563EB"/><text x="70" y="89" class="pkt-label" text-anchor="middle">AP1</text>
            <circle cx="180" cy="85" r="15" fill="#2563EB"/><text x="180" y="89" class="pkt-label" text-anchor="middle">AP2</text>
            <circle cx="290" cy="85" r="15" fill="#2563EB"/><text x="290" y="89" class="pkt-label" text-anchor="middle">AP3</text>
            <text x="70" y="108" class="dim-text" text-anchor="middle">Lightweight</text>
            <text x="180" y="108" class="dim-text" text-anchor="middle">Lightweight</text>
            <text x="290" y="108" class="dim-text" text-anchor="middle">Lightweight</text>

            <!-- Wireless clients -->
            <circle cx="40" cy="135" r="6" fill="#94A3B8"/><circle cx="70" cy="140" r="6" fill="#94A3B8"/><circle cx="100" cy="135" r="6" fill="#94A3B8"/>
            <circle cx="155" cy="135" r="6" fill="#94A3B8"/><circle cx="180" cy="140" r="6" fill="#94A3B8"/><circle cx="205" cy="135" r="6" fill="#94A3B8"/>
            <circle cx="265" cy="135" r="6" fill="#94A3B8"/><circle cx="290" cy="140" r="6" fill="#94A3B8"/><circle cx="315" cy="135" r="6" fill="#94A3B8"/>

            <!-- Note -->
            <rect x="15" y="160" width="330" height="26" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="173" class="anno" text-anchor="middle">WLC handles: SSID config, security policies, roaming, RF management</text>
            <text x="180" y="183" class="dim-text" text-anchor="middle">AP handles: data forwarding, beacons, probe responses</text>
          </svg>`
  },
  {
    id: "vlsm",
    title: "VLSM — Variable Length Subnet Masking",
    desc: "The exam tests VLSM problems — carving one network into unequal subnets. Know how to allocate largest subnet first, then fill remaining space with smaller ones.",
    domain: "1",
    topic: "1.6",
    group: "ip-addressing",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 310" xmlns="http://www.w3.org/2000/svg">
            <!-- Parent network -->
            <rect x="60" y="8" width="240" height="28" rx="4" fill="#2563EB"/>
            <text x="180" y="26" class="layer-label" text-anchor="middle">192.168.1.0 /24 (256 addresses)</text>

            <!-- Branch lines -->
            <line x1="120" y1="36" x2="55" y2="65" stroke="#2563EB" stroke-width="1.5"/>
            <line x1="160" y1="36" x2="140" y2="65" stroke="#0EA5E9" stroke-width="1.5"/>
            <line x1="220" y1="36" x2="235" y2="65" stroke="#7C3AED" stroke-width="1.5"/>
            <line x1="270" y1="36" x2="320" y2="65" stroke="#16A34A" stroke-width="1.5"/>

            <!-- /26 subnet (largest first) -->
            <rect x="10" y="65" width="90" height="50" rx="4" fill="#2563EB"/>
            <text x="55" y="80" class="layer-label" text-anchor="middle">/26</text>
            <text x="55" y="92" class="layer-sub" text-anchor="middle">62 usable hosts</text>
            <text x="55" y="104" class="layer-sub" text-anchor="middle">60 needed</text>

            <!-- /27 subnet -->
            <rect x="108" y="65" width="72" height="50" rx="4" fill="#0EA5E9"/>
            <text x="144" y="80" class="layer-label" text-anchor="middle">/27</text>
            <text x="144" y="92" class="layer-sub" text-anchor="middle">30 usable</text>
            <text x="144" y="104" class="layer-sub" text-anchor="middle">30 needed</text>

            <!-- /28 subnet -->
            <rect x="200" y="65" width="72" height="50" rx="4" fill="#7C3AED"/>
            <text x="236" y="80" class="layer-label" text-anchor="middle">/28</text>
            <text x="236" y="92" class="layer-sub" text-anchor="middle">14 usable</text>
            <text x="236" y="104" class="layer-sub" text-anchor="middle">14 needed</text>

            <!-- /30 subnet -->
            <rect x="290" y="65" width="60" height="50" rx="4" fill="#16A34A"/>
            <text x="320" y="80" class="layer-label" text-anchor="middle">/30</text>
            <text x="320" y="92" class="layer-sub" text-anchor="middle">2 usable</text>
            <text x="320" y="104" class="layer-sub" text-anchor="middle">P2P link</text>

            <!-- Detail table -->
            <rect x="10" y="130" width="340" height="110" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="25" y="148" class="anno-bold" style="font-size:8px">Subnet</text>
            <text x="100" y="148" class="anno-bold" style="font-size:8px">Network</text>
            <text x="190" y="148" class="anno-bold" style="font-size:8px">Usable Range</text>
            <text x="310" y="148" class="anno-bold" style="font-size:8px">Broadcast</text>
            <line x1="20" y1="153" x2="340" y2="153" stroke="#D4D0C8" stroke-width="0.5"/>

            <text x="25" y="168" class="cmd-text" style="fill:#2563EB">/26</text>
            <text x="100" y="168" class="cmd-text">192.168.1.0</text>
            <text x="190" y="168" class="cmd-text">.1 – .62</text>
            <text x="310" y="168" class="cmd-text">.63</text>

            <text x="25" y="186" class="cmd-text" style="fill:#0EA5E9">/27</text>
            <text x="100" y="186" class="cmd-text">192.168.1.64</text>
            <text x="190" y="186" class="cmd-text">.65 – .94</text>
            <text x="310" y="186" class="cmd-text">.95</text>

            <text x="25" y="204" class="cmd-text" style="fill:#7C3AED">/28</text>
            <text x="100" y="204" class="cmd-text">192.168.1.96</text>
            <text x="190" y="204" class="cmd-text">.97 – .110</text>
            <text x="310" y="204" class="cmd-text">.111</text>

            <text x="25" y="222" class="cmd-text" style="fill:#16A34A">/30</text>
            <text x="100" y="222" class="cmd-text">192.168.1.112</text>
            <text x="190" y="222" class="cmd-text">.113 – .114</text>
            <text x="310" y="222" class="cmd-text">.115</text>

            <!-- Rule -->
            <rect x="10" y="255" width="340" height="44" rx="4" fill="#1C1917"/>
            <text x="25" y="273" style="font-size:9px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">Rule: Allocate largest subnet first,</text>
            <text x="25" y="289" style="font-size:9px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">then next largest in remaining space.</text>
          </svg>`
  },
  {
    id: "wildcard-masks",
    title: "Wildcard Masks",
    desc: "ACLs and OSPF use wildcard masks — the inverse of subnet masks. 0 means must match, 255 means don't care. Know the formula: 255.255.255.255 minus subnet mask.",
    domain: "5",
    topic: "5.6",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg">
            <!-- Title / Formula -->
            <text x="180" y="18" class="anno-bold" text-anchor="middle">Wildcard = 255.255.255.255 - Subnet Mask</text>

            <!-- Visual formula -->
            <rect x="30" y="30" width="300" height="50" rx="4" fill="#1C1917"/>
            <text x="180" y="50" style="font-size:10px;fill:#94A3B8;font-family:'JetBrains Mono',monospace" text-anchor="middle">  255.255.255.255</text>
            <text x="180" y="65" style="font-size:10px;fill:#DC2626;font-family:'JetBrains Mono',monospace" text-anchor="middle">- 255.255.255.  0   (subnet mask /24)</text>
            <line x1="70" y1="70" x2="290" y2="70" stroke="#94A3B8" stroke-width="0.5"/>
            <text x="180" y="78" style="font-size:10px;fill:#4ADE80;font-family:'JetBrains Mono',monospace" text-anchor="middle">=   0.  0.  0.255   (wildcard)</text>

            <!-- Meaning -->
            <rect x="30" y="95" width="140" height="30" rx="4" fill="#2563EB"/>
            <text x="100" y="112" class="layer-label" text-anchor="middle">0 = Must Match</text>
            <rect x="190" y="95" width="140" height="30" rx="4" fill="#DC2626"/>
            <text x="260" y="112" class="layer-label" text-anchor="middle">255 = Don't Care</text>

            <!-- Examples table -->
            <rect x="20" y="140" width="320" height="100" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="40" y="158" class="anno-bold" style="font-size:8px">CIDR</text>
            <text x="90" y="158" class="anno-bold" style="font-size:8px">Subnet Mask</text>
            <text x="210" y="158" class="anno-bold" style="font-size:8px">Wildcard Mask</text>
            <line x1="30" y1="163" x2="330" y2="163" stroke="#D4D0C8" stroke-width="0.5"/>

            <text x="40" y="178" class="cmd-text">/24</text>
            <text x="90" y="178" class="cmd-text">255.255.255.0</text>
            <text x="210" y="178" class="cmd-text" style="fill:#16A34A">0.0.0.255</text>

            <text x="40" y="196" class="cmd-text">/26</text>
            <text x="90" y="196" class="cmd-text">255.255.255.192</text>
            <text x="210" y="196" class="cmd-text" style="fill:#16A34A">0.0.0.63</text>

            <text x="40" y="214" class="cmd-text">/30</text>
            <text x="90" y="214" class="cmd-text">255.255.255.252</text>
            <text x="210" y="214" class="cmd-text" style="fill:#16A34A">0.0.0.3</text>

            <text x="40" y="232" class="cmd-text">/32</text>
            <text x="90" y="232" class="cmd-text">255.255.255.255</text>
            <text x="210" y="232" class="cmd-text" style="fill:#16A34A">0.0.0.0</text>
            <text x="300" y="232" class="dim-text">(exact host)</text>

            <!-- Usage note -->
            <text x="180" y="258" class="anno" text-anchor="middle">Used in: ACL permit/deny statements, OSPF network commands</text>
          </svg>`
  },
  {
    id: "dhcp-snooping-dai",
    title: "DHCP Snooping & DAI",
    desc: "DHCP snooping builds a binding table. DAI uses it to validate ARP. Together they stop rogue DHCP servers and ARP poisoning attacks.",
    domain: "5",
    topic: "5.7",
    group: "l2-security",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 310" xmlns="http://www.w3.org/2000/svg">
            <!-- DHCP Server (trusted) -->
            <rect x="140" y="5" width="80" height="28" rx="4" fill="#16A34A"/>
            <text x="180" y="23" class="layer-label" text-anchor="middle">DHCP Server</text>
            <text x="180" y="40" class="dim-text" text-anchor="middle">Trusted</text>

            <!-- Switch -->
            <rect x="110" y="75" width="140" height="32" rx="4" fill="#2563EB"/>
            <text x="180" y="95" class="layer-label" text-anchor="middle">Switch (Snooping ON)</text>

            <!-- Trusted port (up) -->
            <line x1="180" y1="33" x2="180" y2="75" stroke="#16A34A" stroke-width="2"/>
            <circle cx="180" cy="70" r="6" fill="#16A34A"/><text x="180" y="73" style="font-size:5px;fill:#fff;font-weight:700" text-anchor="middle">T</text>

            <!-- Untrusted ports (down) -->
            <line x1="130" y1="107" x2="80" y2="140" stroke="#DC2626" stroke-width="1.5"/>
            <line x1="180" y1="107" x2="180" y2="140" stroke="#DC2626" stroke-width="1.5"/>
            <line x1="230" y1="107" x2="280" y2="140" stroke="#DC2626" stroke-width="1.5"/>

            <!-- PCs (untrusted) -->
            <rect x="55" y="140" width="50" height="22" rx="3" fill="#64748B"/><text x="80" y="155" class="pkt-label" text-anchor="middle">PC-A</text>
            <rect x="155" y="140" width="50" height="22" rx="3" fill="#64748B"/><text x="180" y="155" class="pkt-label" text-anchor="middle">PC-B</text>
            <rect x="255" y="140" width="50" height="22" rx="3" fill="#DC2626"/><text x="280" y="155" class="pkt-label" text-anchor="middle">Rogue</text>

            <!-- Untrusted labels -->
            <text x="80" y="175" class="dim-text" text-anchor="middle">Untrusted</text>
            <text x="180" y="175" class="dim-text" text-anchor="middle">Untrusted</text>
            <text x="280" y="175" class="dim-text" text-anchor="middle">Untrusted</text>

            <!-- Block indicator on rogue -->
            <text x="315" y="150" class="anno-bold" style="fill:#DC2626;font-size:14px">X</text>
            <text x="280" y="190" class="anno" text-anchor="middle" style="fill:#DC2626;font-size:7px">DHCP Offer blocked</text>

            <!-- Binding table -->
            <rect x="20" y="205" width="320" height="55" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="220" class="anno-bold" text-anchor="middle">DHCP Snooping Binding Table</text>
            <text x="35" y="237" class="anno-bold" style="font-size:7px">MAC</text>
            <text x="110" y="237" class="anno-bold" style="font-size:7px">IP</text>
            <text x="195" y="237" class="anno-bold" style="font-size:7px">VLAN</text>
            <text x="240" y="237" class="anno-bold" style="font-size:7px">Port</text>
            <text x="290" y="237" class="anno-bold" style="font-size:7px">Lease</text>
            <text x="35" y="252" class="cmd-text" style="font-size:7px">AA:BB:CC:11</text>
            <text x="110" y="252" class="cmd-text" style="font-size:7px">10.0.0.10</text>
            <text x="195" y="252" class="cmd-text" style="font-size:7px">10</text>
            <text x="240" y="252" class="cmd-text" style="font-size:7px">Gi0/1</text>
            <text x="290" y="252" class="cmd-text" style="font-size:7px">86400</text>

            <!-- DAI note -->
            <rect x="20" y="270" width="320" height="32" rx="4" fill="#1C1917"/>
            <text x="30" y="285" style="font-size:8px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">DAI: Validates ARP against binding table</text>
            <text x="30" y="297" style="font-size:8px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">ARP with wrong MAC-IP mapping → dropped</text>
          </svg>`
  },
  {
    id: "dot1x-radius",
    title: "802.1X / RADIUS Authentication",
    desc: "Port-based access control. The switch blocks traffic until the RADIUS server authenticates the user. Know the three roles: supplicant, authenticator, authentication server.",
    domain: "5",
    topic: "5.8",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 290" xmlns="http://www.w3.org/2000/svg">
            <!-- Three roles -->
            <rect x="10" y="20" width="80" height="40" rx="4" fill="#2563EB"/>
            <text x="50" y="38" class="layer-label" text-anchor="middle">Supplicant</text>
            <text x="50" y="50" class="layer-sub" text-anchor="middle">(PC/User)</text>

            <rect x="140" y="20" width="80" height="40" rx="4" fill="#D97706"/>
            <text x="180" y="38" class="layer-label" text-anchor="middle">Authenticator</text>
            <text x="180" y="50" class="layer-sub" text-anchor="middle">(Switch)</text>

            <rect x="270" y="20" width="80" height="40" rx="4" fill="#7C3AED"/>
            <text x="310" y="38" class="layer-label" text-anchor="middle">Auth Server</text>
            <text x="310" y="50" class="layer-sub" text-anchor="middle">(RADIUS)</text>

            <!-- Timelines -->
            <line x1="50" y1="60" x2="50" y2="240" stroke="#2563EB" stroke-width="2"/>
            <line x1="180" y1="60" x2="180" y2="240" stroke="#D97706" stroke-width="2"/>
            <line x1="310" y1="60" x2="310" y2="240" stroke="#7C3AED" stroke-width="2"/>

            <!-- Port blocked -->
            <rect x="125" y="68" width="110" height="14" rx="2" fill="#DC2626"/>
            <text x="180" y="79" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">Port BLOCKED (no traffic)</text>

            <!-- Step 1: EAPOL-Start -->
            <line x1="53" y1="95" x2="177" y2="105" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arr1x)"/>
            <text x="115" y="93" class="dim-text" text-anchor="middle">1. EAPOL-Start</text>

            <!-- Step 2: EAP-Request Identity -->
            <line x1="177" y1="120" x2="53" y2="130" stroke="#D97706" stroke-width="1.5" marker-end="url(#arr1xO)"/>
            <text x="115" y="118" class="dim-text" text-anchor="middle">2. EAP-Request ID</text>

            <!-- Step 3: EAP-Response Identity -->
            <line x1="53" y1="145" x2="177" y2="155" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arr1x)"/>
            <text x="115" y="143" class="dim-text" text-anchor="middle">3. EAP-Response ID</text>

            <!-- Step 4: RADIUS Access-Request -->
            <line x1="183" y1="160" x2="307" y2="170" stroke="#D97706" stroke-width="1.5" marker-end="url(#arr1xO)"/>
            <text x="245" y="158" class="dim-text" text-anchor="middle">4. RADIUS Access-Req</text>

            <!-- Step 5: RADIUS Access-Accept -->
            <line x1="307" y1="185" x2="183" y2="195" stroke="#16A34A" stroke-width="1.5" marker-end="url(#arr1xG)"/>
            <text x="245" y="183" class="dim-text" text-anchor="middle">5. RADIUS Accept</text>

            <!-- Step 6: EAP-Success -->
            <line x1="177" y1="210" x2="53" y2="220" stroke="#16A34A" stroke-width="1.5" marker-end="url(#arr1xG)"/>
            <text x="115" y="208" class="dim-text" text-anchor="middle">6. EAP-Success</text>

            <!-- Port opened -->
            <rect x="125" y="228" width="110" height="14" rx="2" fill="#16A34A"/>
            <text x="180" y="239" style="font-size:6px;fill:#fff;font-weight:700" text-anchor="middle">Port OPEN (traffic flows)</text>

            <!-- Note -->
            <rect x="20" y="255" width="320" height="28" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="180" y="268" class="anno" text-anchor="middle">EAP over LAN (EAPOL) between supplicant and switch</text>
            <text x="180" y="279" class="anno" text-anchor="middle">RADIUS (UDP 1812) between switch and auth server</text>

            <defs>
              <marker id="arr1x" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#2563EB"/></marker>
              <marker id="arr1xO" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#D97706"/></marker>
              <marker id="arr1xG" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#16A34A"/></marker>
            </defs>
          </svg>`
  },
  {
    id: "ipsec-vpn",
    title: "IPsec VPN Tunnel",
    desc: "Site-to-site VPN encrypts traffic between two locations over the internet. Know IKE Phase 1 (SA negotiation) and Phase 2 (IPsec SA for actual data encryption).",
    domain: "5",
    topic: "5.5",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg">
            <!-- R1 -->
            <rect x="20" y="40" width="70" height="32" rx="4" fill="#2563EB"/>
            <text x="55" y="56" class="layer-label" text-anchor="middle">R1</text>
            <text x="55" y="66" class="layer-sub" text-anchor="middle">Site A</text>

            <!-- R2 -->
            <rect x="270" y="40" width="70" height="32" rx="4" fill="#16A34A"/>
            <text x="305" y="56" class="layer-label" text-anchor="middle">R2</text>
            <text x="305" y="66" class="layer-sub" text-anchor="middle">Site B</text>

            <!-- Internet cloud -->
            <ellipse cx="180" cy="56" rx="70" ry="24" fill="none" stroke="#94A3B8" stroke-width="1.5"/>
            <text x="180" y="52" class="anno" text-anchor="middle">Internet</text>
            <text x="180" y="63" class="dim-text" text-anchor="middle">(untrusted)</text>

            <!-- Encrypted tunnel -->
            <line x1="90" y1="56" x2="270" y2="56" stroke="#D97706" stroke-width="2.5" stroke-dasharray="8,4"/>
            <text x="180" y="20" class="anno-bold" text-anchor="middle" style="fill:#D97706">Encrypted IPsec Tunnel</text>

            <!-- Lock icon (simple) -->
            <rect x="172" y="28" width="16" height="10" rx="2" fill="#D97706"/>
            <rect x="175" y="23" width="10" height="8" rx="5" fill="none" stroke="#D97706" stroke-width="1.5"/>

            <!-- LAN A -->
            <circle cx="25" cy="105" r="7" fill="#64748B"/><circle cx="50" cy="105" r="7" fill="#64748B"/><circle cx="75" cy="105" r="7" fill="#64748B"/>
            <text x="50" y="123" class="cmd-text" text-anchor="middle">10.1.0.0/24</text>
            <line x1="50" y1="72" x2="50" y2="98" stroke="#94A3B8" stroke-width="1"/>

            <!-- LAN B -->
            <circle cx="285" cy="105" r="7" fill="#64748B"/><circle cx="310" cy="105" r="7" fill="#64748B"/><circle cx="335" cy="105" r="7" fill="#64748B"/>
            <text x="310" y="123" class="cmd-text" text-anchor="middle">10.2.0.0/24</text>
            <line x1="310" y1="72" x2="310" y2="98" stroke="#94A3B8" stroke-width="1"/>

            <!-- IKE Phase 1 -->
            <rect x="15" y="145" width="155" height="65" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#D97706" stroke-width="1"/>
            <text x="92" y="162" class="anno-bold" text-anchor="middle" style="fill:#D97706">IKE Phase 1</text>
            <text x="92" y="176" class="anno" text-anchor="middle">ISAKMP SA negotiation</text>
            <text x="30" y="190" class="dim-text">Auth, Encryption, Hash</text>
            <text x="30" y="202" class="dim-text">DH Group, Lifetime</text>

            <!-- IKE Phase 2 -->
            <rect x="190" y="145" width="155" height="65" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#16A34A" stroke-width="1"/>
            <text x="267" y="162" class="anno-bold" text-anchor="middle" style="fill:#16A34A">IKE Phase 2</text>
            <text x="267" y="176" class="anno" text-anchor="middle">IPsec SA (data tunnel)</text>
            <text x="205" y="190" class="dim-text">ESP (encrypt+auth) or</text>
            <text x="205" y="202" class="dim-text">AH (auth only), Transform set</text>

            <!-- Key protocols -->
            <rect x="15" y="225" width="330" height="44" rx="4" fill="#1C1917"/>
            <text x="25" y="241" style="font-size:8px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">ESP (Protocol 50): Encrypts + authenticates</text>
            <text x="25" y="256" style="font-size:8px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">AH  (Protocol 51): Authenticates only (no encryption)</text>
          </svg>`
  },
  {
    id: "static-floating-routes",
    title: "Static & Floating Static Routes",
    desc: "Static routes are manually configured (AD=1). Floating statics use a higher AD as backup — they only activate when the primary route fails.",
    domain: "3",
    topic: "3.3",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg">
            <!-- Router -->
            <rect x="140" y="10" width="80" height="32" rx="4" fill="#2563EB"/>
            <text x="180" y="30" class="layer-label" text-anchor="middle">Router R1</text>

            <!-- Destination -->
            <rect x="140" y="200" width="80" height="32" rx="4" fill="#7C3AED"/>
            <text x="180" y="216" class="layer-label" text-anchor="middle">10.0.0.0/24</text>
            <text x="180" y="226" class="layer-sub" text-anchor="middle">Destination</text>

            <!-- Primary path (green, solid) -->
            <line x1="155" y1="42" x2="80" y2="110" stroke="#16A34A" stroke-width="2.5"/>
            <line x1="80" y1="110" x2="80" y2="160" stroke="#16A34A" stroke-width="2.5"/>
            <line x1="80" y1="160" x2="155" y2="200" stroke="#16A34A" stroke-width="2.5"/>
            <rect x="30" y="105" width="90" height="22" rx="3" fill="#16A34A"/>
            <text x="75" y="120" class="pkt-label" text-anchor="middle">Primary (AD=1)</text>
            <text x="75" y="140" class="dim-text" text-anchor="middle">via 192.168.1.2</text>

            <!-- Backup path (amber, dashed) -->
            <line x1="205" y1="42" x2="280" y2="110" stroke="#D97706" stroke-width="2" stroke-dasharray="6,3"/>
            <line x1="280" y1="110" x2="280" y2="160" stroke="#D97706" stroke-width="2" stroke-dasharray="6,3"/>
            <line x1="280" y1="160" x2="205" y2="200" stroke="#D97706" stroke-width="2" stroke-dasharray="6,3"/>
            <rect x="240" y="105" width="90" height="22" rx="3" fill="#D97706"/>
            <text x="285" y="120" class="pkt-label" text-anchor="middle">Floating (AD=5)</text>
            <text x="285" y="140" class="dim-text" text-anchor="middle">via 192.168.2.2</text>

            <!-- Config commands -->
            <rect x="15" y="245" width="330" height="28" rx="4" fill="#1C1917"/>
            <text x="25" y="259" style="font-size:8px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">ip route 10.0.0.0 255.255.255.0 192.168.1.2</text>
            <text x="25" y="270" style="font-size:8px;fill:#D97706;font-family:'JetBrains Mono',monospace">ip route 10.0.0.0 255.255.255.0 192.168.2.2 5</text>

            <!-- Explanation -->
            <text x="180" y="244" class="dim-text" text-anchor="middle">AD=5 floating static stays hidden until primary fails</text>
          </svg>`
  },
  {
    id: "ipv6-slaac-ndp",
    title: "IPv6 SLAAC & NDP",
    desc: "IPv6 hosts auto-configure addresses using SLAAC — no DHCP needed. NDP replaces ARP with Neighbor Solicitation/Advertisement multicast messages.",
    domain: "1",
    topic: "1.8",
    group: "ipv6",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 310" xmlns="http://www.w3.org/2000/svg">
            <!-- Router -->
            <rect x="140" y="5" width="80" height="28" rx="4" fill="#2563EB"/>
            <text x="180" y="23" class="layer-label" text-anchor="middle">Router</text>
            <text x="180" y="40" class="dim-text" text-anchor="middle">fe80::1 (link-local)</text>

            <!-- Host -->
            <rect x="140" y="235" width="80" height="28" rx="4" fill="#16A34A"/>
            <text x="180" y="253" class="layer-label" text-anchor="middle">Host</text>

            <!-- Timelines -->
            <line x1="180" y1="33" x2="180" y2="50" stroke="#2563EB" stroke-width="2"/>
            <line x1="80" y1="55" x2="80" y2="230" stroke="#16A34A" stroke-width="2"/>
            <line x1="280" y1="55" x2="280" y2="230" stroke="#2563EB" stroke-width="2"/>

            <!-- Step 1: RS -->
            <line x1="83" y1="70" x2="277" y2="82" stroke="#16A34A" stroke-width="1.5" marker-end="url(#arrSlaac)"/>
            <rect x="120" y="60" width="120" height="16" rx="3" fill="#16A34A"/>
            <text x="180" y="72" class="pkt-label" text-anchor="middle">1. RS (Router Solicitation)</text>
            <text x="50" y="72" class="dim-text" text-anchor="end">FF02::2</text>

            <!-- Step 2: RA -->
            <line x1="277" y1="100" x2="83" y2="112" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arrSlaacB)"/>
            <rect x="110" y="92" width="140" height="16" rx="3" fill="#2563EB"/>
            <text x="180" y="104" class="pkt-label" text-anchor="middle">2. RA (prefix: 2001:DB8::/64)</text>
            <text x="310" y="104" class="dim-text">FF02::1</text>

            <!-- Step 3: Generate address -->
            <rect x="40" y="128" width="200" height="28" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#D97706" stroke-width="1"/>
            <text x="140" y="140" class="anno-bold" text-anchor="middle" style="fill:#D97706">3. Host generates address:</text>
            <text x="140" y="152" class="cmd-text" text-anchor="middle">2001:DB8::EUI-64 or ::random</text>

            <!-- Step 4: DAD -->
            <line x1="83" y1="172" x2="277" y2="184" stroke="#7C3AED" stroke-width="1.5" marker-end="url(#arrSlaacP)"/>
            <rect x="100" y="164" width="160" height="16" rx="3" fill="#7C3AED"/>
            <text x="180" y="176" class="pkt-label" text-anchor="middle">4. DAD — NS for own address</text>
            <text x="50" y="178" class="dim-text" text-anchor="end">Multicast</text>

            <!-- Step 5: No reply = unique -->
            <rect x="60" y="200" width="200" height="18" rx="3" fill="#16A34A"/>
            <text x="160" y="213" class="pkt-label" text-anchor="middle">5. No reply = address is unique, use it</text>

            <!-- NDP vs ARP comparison -->
            <rect x="15" y="272" width="330" height="32" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="286" class="anno-bold">NDP replaces ARP:</text>
            <text x="140" y="286" class="anno">NS = ARP Request (multicast, not broadcast)</text>
            <text x="140" y="298" class="anno">NA = ARP Reply (unicast)</text>

            <defs>
              <marker id="arrSlaac" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#16A34A"/></marker>
              <marker id="arrSlaacB" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#2563EB"/></marker>
              <marker id="arrSlaacP" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0,0 7,2.5 0,5" fill="#7C3AED"/></marker>
            </defs>
          </svg>`
  },
  {
    id: "rstp-states",
    title: "RSTP Port States & Roles",
    desc: "RSTP (802.1w) replaced STP's 5 states with 3 and converges in seconds instead of 30-50 seconds. Know the state mapping and the Alternate/Backup port roles.",
    domain: "2",
    topic: "2.5",
    group: null,
    deepDive: null,
    svg: `<svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg">
            <!-- STP column -->
            <text x="85" y="18" class="anno-bold" text-anchor="middle">STP (802.1D)</text>
            <text x="85" y="30" class="dim-text" text-anchor="middle">5 states, 30-50s convergence</text>

            <rect x="30" y="40" width="110" height="22" rx="3" fill="#94A3B8"/>
            <text x="85" y="55" class="pkt-label" text-anchor="middle">Disabled</text>

            <rect x="30" y="66" width="110" height="22" rx="3" fill="#DC2626"/>
            <text x="85" y="81" class="pkt-label" text-anchor="middle">Blocking</text>

            <rect x="30" y="92" width="110" height="22" rx="3" fill="#D97706"/>
            <text x="85" y="107" class="pkt-label" text-anchor="middle">Listening (15s)</text>

            <rect x="30" y="118" width="110" height="22" rx="3" fill="#CA8A04"/>
            <text x="85" y="133" class="pkt-label" text-anchor="middle">Learning (15s)</text>

            <rect x="30" y="144" width="110" height="22" rx="3" fill="#16A34A"/>
            <text x="85" y="159" class="pkt-label" text-anchor="middle">Forwarding</text>

            <!-- RSTP column -->
            <text x="275" y="18" class="anno-bold" text-anchor="middle">RSTP (802.1w)</text>
            <text x="275" y="30" class="dim-text" text-anchor="middle">3 states, ~1-2s convergence</text>

            <rect x="220" y="56" width="110" height="36" rx="3" fill="#DC2626"/>
            <text x="275" y="72" class="layer-label" text-anchor="middle">Discarding</text>
            <text x="275" y="84" class="layer-sub" text-anchor="middle">No learn, no fwd</text>

            <rect x="220" y="108" width="110" height="36" rx="3" fill="#CA8A04"/>
            <text x="275" y="124" class="layer-label" text-anchor="middle">Learning</text>
            <text x="275" y="136" class="layer-sub" text-anchor="middle">Learns MAC, no fwd</text>

            <rect x="220" y="152" width="110" height="22" rx="3" fill="#16A34A"/>
            <text x="275" y="167" class="pkt-label" text-anchor="middle">Forwarding</text>

            <!-- Mapping arrows -->
            <line x1="140" y1="51" x2="220" y2="65" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="140" y1="77" x2="220" y2="72" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="140" y1="103" x2="220" y2="78" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="140" y1="129" x2="220" y2="126" stroke="#94A3B8" stroke-width="1"/>
            <line x1="140" y1="155" x2="220" y2="163" stroke="#16A34A" stroke-width="1.5"/>

            <!-- Role comparison -->
            <rect x="15" y="190" width="330" height="100" rx="4" fill="var(--bg-recessed, #F3F0EB)"/>
            <text x="30" y="208" class="anno-bold">Port Roles:</text>
            <text x="85" y="208" class="anno-bold">STP</text>
            <text x="230" y="208" class="anno-bold">RSTP</text>
            <line x1="25" y1="213" x2="335" y2="213" stroke="#D4D0C8" stroke-width="0.5"/>

            <text x="30" y="228" class="anno" style="fill:#16A34A">Root Port</text>
            <text x="230" y="228" class="anno" style="fill:#16A34A">Root Port (same)</text>

            <text x="30" y="245" class="anno" style="fill:#D97706">Designated Port</text>
            <text x="230" y="245" class="anno" style="fill:#D97706">Designated Port (same)</text>

            <text x="30" y="262" class="anno" style="fill:#DC2626">Blocked Port</text>
            <text x="230" y="262" class="anno" style="fill:#DC2626">Alternate Port</text>
            <text x="320" y="262" class="dim-text">(backup to root)</text>

            <text x="230" y="279" class="anno" style="fill:#7C3AED">Backup Port</text>
            <text x="320" y="279" class="dim-text">(backup to designated)</text>
          </svg>`
  },
  {
    id: "wpa2-wpa3",
    title: "WPA2 / WPA3 Wireless Security",
    desc: "WPA2 uses AES-CCMP. WPA3 adds SAE (Simultaneous Authentication of Equals) for forward secrecy. Enterprise mode uses 802.1X/RADIUS instead of a shared password.",
    domain: "5",
    topic: "5.9",
    group: "wireless",
    deepDive: null,
    svg: `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg">
            <!-- Header row -->
            <rect x="15" y="10" width="100" height="28" rx="4" fill="#64748B"/>
            <text x="65" y="28" class="layer-label" text-anchor="middle"></text>
            <rect x="125" y="10" width="105" height="28" rx="4" fill="#2563EB"/>
            <text x="177" y="28" class="layer-label" text-anchor="middle">Personal</text>
            <rect x="240" y="10" width="105" height="28" rx="4" fill="#7C3AED"/>
            <text x="292" y="28" class="layer-label" text-anchor="middle">Enterprise</text>

            <!-- WPA2 row -->
            <rect x="15" y="46" width="100" height="70" rx="4" fill="#D97706"/>
            <text x="65" y="68" class="layer-label" text-anchor="middle">WPA2</text>
            <text x="65" y="82" class="layer-sub" text-anchor="middle">802.11i</text>
            <text x="65" y="96" class="layer-sub" text-anchor="middle">(current standard)</text>

            <rect x="125" y="46" width="105" height="70" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#D4D0C8" stroke-width="1"/>
            <text x="177" y="64" class="anno-bold" text-anchor="middle">PSK</text>
            <text x="177" y="78" class="anno" text-anchor="middle">Pre-Shared Key</text>
            <text x="177" y="92" class="anno" text-anchor="middle">AES-CCMP</text>
            <text x="177" y="106" class="dim-text" text-anchor="middle">Home / small office</text>

            <rect x="240" y="46" width="105" height="70" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#D4D0C8" stroke-width="1"/>
            <text x="292" y="64" class="anno-bold" text-anchor="middle">802.1X</text>
            <text x="292" y="78" class="anno" text-anchor="middle">RADIUS server</text>
            <text x="292" y="92" class="anno" text-anchor="middle">AES-CCMP</text>
            <text x="292" y="106" class="dim-text" text-anchor="middle">Corporate</text>

            <!-- WPA3 row -->
            <rect x="15" y="124" width="100" height="70" rx="4" fill="#16A34A"/>
            <text x="65" y="146" class="layer-label" text-anchor="middle">WPA3</text>
            <text x="65" y="160" class="layer-sub" text-anchor="middle">Latest</text>
            <text x="65" y="174" class="layer-sub" text-anchor="middle">(recommended)</text>

            <rect x="125" y="124" width="105" height="70" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#16A34A" stroke-width="1.5"/>
            <text x="177" y="142" class="anno-bold" text-anchor="middle" style="fill:#16A34A">SAE</text>
            <text x="177" y="156" class="anno" text-anchor="middle">Replaces PSK</text>
            <text x="177" y="170" class="anno" text-anchor="middle">AES-CCMP</text>
            <text x="177" y="184" class="dim-text" text-anchor="middle">Forward secrecy</text>

            <rect x="240" y="124" width="105" height="70" rx="4" fill="var(--bg-recessed, #F3F0EB)" stroke="#7C3AED" stroke-width="1.5"/>
            <text x="292" y="142" class="anno-bold" text-anchor="middle" style="fill:#7C3AED">802.1X</text>
            <text x="292" y="156" class="anno" text-anchor="middle">RADIUS server</text>
            <text x="292" y="170" class="anno" text-anchor="middle">192-bit suite</text>
            <text x="292" y="184" class="dim-text" text-anchor="middle">CNSA / gov-grade</text>

            <!-- Key difference callout -->
            <rect x="15" y="208" width="330" height="52" rx="4" fill="#1C1917"/>
            <text x="25" y="224" style="font-size:9px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">Key difference:</text>
            <text x="25" y="240" style="font-size:8px;fill:#94A3B8;font-family:'JetBrains Mono',monospace">WPA2-PSK: Shared password, vulnerable to offline attacks</text>
            <text x="25" y="254" style="font-size:8px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">WPA3-SAE: Per-session keys, forward secrecy (can't decrypt</text>
            <text x="25" y="265" style="font-size:8px;fill:#4ADE80;font-family:'JetBrains Mono',monospace">past traffic even if password is later compromised)</text>
          </svg>`
  }
];
