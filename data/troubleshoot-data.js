/* ══════════════════════════════════════════════════════════════════════
   troubleshoot-data.js  SINGLE SOURCE OF TRUTH for P1/P2 troubleshooting.
   Per-pillar symptom -> check command -> cause -> fix.
   Consumed by BOTH troubleshoot-method.html (teach) and
   troubleshoot-quiz.html (drill) so the two can never drift.
   Lifted verbatim from the original inline TS array in the method page.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  window.TS = [
  { tier:'P1', obj:'3.4', title:'OSPFv2 single area',
    story:"Two routers stuck in EXSTART are arguing over packet SIZE, not friendship: it is the MTU that does not match. Stuck at the door measuring the frame equals MTU. For neighbors that never form at all, run TASA: Timers, Area, Subnet, Auth must all agree, and a passive interface goes silent mid-handshake.",
    connect:[{topic:"VLANs + trunking", sharedGotcha:"A value that must be IDENTICAL on both ends or it silently fails: OSPF area/subnet here, trunk native VLAN there."}, {topic:"EtherChannel", sharedGotcha:"Both sides must agree and one must be active: two passive ends or a mismatch means nothing ever forms."}],
    faults:[
    { s:'Neighbors stuck in EXSTART / EXCHANGE', c:'<code>show ip ospf neighbor</code> shows the state never reaching Full', cause:'MTU mismatch between the two interfaces', fix:'Match the MTU on both ends, or <code>ip ospf mtu-ignore</code> on the interface' },
    { s:'Neighbor stuck in INIT (one-way hello)', c:'<code>show ip ospf neighbor</code> = INIT; <code>show ip ospf interface</code>', cause:'One side cannot hear the other: ACL, unicast issue, or one side is passive', fix:'Remove the block; ensure neither side is <code>passive-interface</code>' },
    { s:'No neighbor forms at all', c:'<code>show ip ospf interface brief</code> + <code>show ip protocols</code>', cause:'TASA mismatch: Timers (hello/dead), Area ID, Subnet/mask, or Auth', fix:'Make hello/dead, area, subnet, and auth match on both ends' },
    { s:'Route missing from the table', c:'<code>show ip route ospf</code>; <code>show ip protocols</code> network list', cause:'Wrong wildcard in the <code>network</code> statement, wrong area, or passive interface', fix:'Fix the network/wildcard, place it in the right area, un-passive the link' },
    { s:'Wrong router became DR', c:'<code>show ip ospf neighbor</code> (DR/BDR roles)', cause:'Default priority left equal, so highest RID won', fix:'Raise <code>ip ospf priority</code> on the intended DR; <code>priority 0</code> never becomes DR' } ]},

  { tier:'P1', obj:'3.1-3.2', title:'Routing table + forwarding',
    story:"The router obeys two judges in order: first the LONGEST prefix wins the match, then among equal prefixes the LOWEST administrative distance wins (OSPF 110 beats RIP 120). Metric only breaks ties inside the same protocol.",
    connect:[{topic:"Static routing", sharedGotcha:"Administrative distance decides which route installs: a floating static is just a static with a deliberately high AD."}, {topic:"ACLs", sharedGotcha:"Order and specificity decide the winner: longest-prefix-match mirrors first-match, most-specific-first for ACL lines."}],
    faults:[
    { s:'Traffic takes the wrong path', c:'<code>show ip route &lt;dest&gt;</code> to see the matched route', cause:'A more specific prefix is winning (longest prefix match runs first)', fix:'Add/adjust the prefix you actually want, or summarize correctly' },
    { s:'Two protocols offer the same route, wrong one installed', c:'<code>show ip route</code> shows the AD in [AD/metric]', cause:'Lowest administrative distance wins, not lowest metric', fix:'Adjust AD or remove the unwanted source (e.g. OSPF 110 beats RIP 120)' },
    { s:'Default route is being ignored', c:'<code>show ip route 0.0.0.0</code>', cause:'A more specific route matched the traffic first', fix:'Confirm there is no leak; default only catches the unmatched' } ]},

  { tier:'P1', obj:'3.3', title:'Static routing',
    story:"A static route only earns its place if the next-hop is actually reachable: a recursive lookup that fails leaves the route out of the table. A floating static sits on the bench with a higher AD and only enters when the primary truly withdraws.",
    connect:[{topic:"Routing table + forwarding", sharedGotcha:"Administrative distance is the lever: the floating static AD must sit above the primary so it stays dormant until failover."}, {topic:"OSPFv2 single area", sharedGotcha:"A route configured but missing from the table usually traces to reachability or syntax, not the protocol itself."}],
    faults:[
    { s:'Static route not in the routing table', c:'<code>show ip route static</code>; ping the next-hop', cause:'Next-hop is unreachable (recursive lookup fails) or exit interface is down', fix:'Make the next-hop reachable, or use exit-interface + next-hop' },
    { s:'Floating static never takes over', c:'<code>show ip route</code>; <code>show run | include ip route</code>', cause:'Its AD is higher than primary but primary never actually dropped, or AD set wrong', fix:'Set the floating AD above the primary protocol; verify the primary withdraws on failure' },
    { s:'Default route does not work', c:'<code>show run | include ip route 0.0.0.0</code>', cause:'Wrong syntax or unreachable next-hop', fix:'<code>ip route 0.0.0.0 0.0.0.0 &lt;next-hop&gt;</code> with a reachable next-hop' } ]},

  { tier:'P1', obj:'4.1', title:'NAT / PAT',
    story:"NAT must know which way is in and which way is out: tag the LAN ip nat inside and the WAN ip nat outside or nothing translates. To put many hosts behind one IP you must say overload, otherwise PAT collapses into one-host-at-a-time 1:1.",
    connect:[{topic:"ACLs", sharedGotcha:"An ACL defines which traffic qualifies: a wrong NAT ACL silently excludes hosts exactly like a wrong permit line blocks legit traffic."}, {topic:"DHCP client + relay", sharedGotcha:"An edge-router keyword must be present and pointed the right way (inside/outside vs ip helper-address) or the service silently fails for remote hosts."}],
    faults:[
    { s:'No translations happening', c:'<code>show ip nat translations</code> empty; <code>show ip nat statistics</code> misses high', cause:'Interfaces not tagged inside/outside', fix:'<code>ip nat inside</code> on the LAN side, <code>ip nat outside</code> on the WAN side' },
    { s:'Only some hosts get translated', c:'<code>show ip nat statistics</code> (the ACL it references)', cause:'The NAT ACL does not match that host/range', fix:'Fix the ACL that defines interesting (inside-local) traffic' },
    { s:'Only the first host gets out (PAT)', c:'<code>show run | include ip nat inside source</code>', cause:'Missing the <code>overload</code> keyword, so it behaves as 1:1 dynamic', fix:'Add <code>overload</code> to enable port translation (PAT)' } ]},

  { tier:'P1', obj:'2.5', title:'STP / Rapid PVST+',
    story:"Leave priorities at the default 32768 and the election is decided by the LOWEST MAC address, so the oldest junk switch can crown itself root. BPDU Guard is the bouncer: a BPDU arriving on a PortFast edge port means a rogue switch, and the port goes err-disabled.",
    connect:[{topic:"Layer 2 security", sharedGotcha:"Err-disabled recovery is the same shutdown then no shutdown ritual whether the trigger is BPDU Guard or a port-security violation."}, {topic:"EtherChannel", sharedGotcha:"STP treats a healthy bundle as one logical link: a broken or inconsistent bundle can reintroduce a loop or blocking confusion."}],
    faults:[
    { s:'Wrong switch is root bridge', c:'<code>show spanning-tree vlan &lt;x&gt;</code> (Root ID vs Bridge ID)', cause:'Priorities left default (32768), so lowest MAC won the election', fix:'<code>spanning-tree vlan x root primary</code> or lower the priority in steps of 4096' },
    { s:'Port went err-disabled', c:'<code>show interfaces status err-disabled</code>; <code>show logging</code>', cause:'BPDU Guard saw a BPDU on a PortFast edge port', fix:'Remove the rogue switch; recover with <code>shutdown</code> then <code>no shutdown</code>' },
    { s:'Broadcast storm / loop', c:'<code>show spanning-tree</code> (a blocking port unexpectedly forwarding)', cause:'STP disabled on a VLAN, or a path with no blocking port', fix:'Re-enable STP; confirm one Alternate/Blocking port per loop' } ]},

  { tier:'P1', obj:'2.1-2.2', title:'VLANs + trunking',
    story:"Same-VLAN hosts on different switches go quiet when the VLAN is pruned off the trunk or the trunk never formed: the allowed list is a guest list. A native VLAN that differs on each end of an 802.1Q trunk throws CDP mismatch warnings because untagged frames land in the wrong pool.",
    connect:[{topic:"OSPFv2 single area", sharedGotcha:"A value (native VLAN vs OSPF subnet/area) that must match on BOTH ends or the link logs a mismatch and traffic or adjacency breaks."}, {topic:"EtherChannel", sharedGotcha:"Trunk mode, VLAN, speed, and duplex must be consistent across member ports or the bundle suspends the mismatched port."}],
    faults:[
    { s:'Same-VLAN hosts on different switches cannot talk', c:'<code>show interfaces trunk</code> (allowed + active VLANs)', cause:'The VLAN is pruned off the trunk or the trunk is not forming', fix:'Add the VLAN to the trunk allowed list; force <code>switchport mode trunk</code>' },
    { s:'Native VLAN mismatch errors in log', c:'<code>show interfaces trunk</code>; CDP mismatch message', cause:'Different native VLAN on each end of the 802.1Q trunk', fix:'Set the same <code>switchport trunk native vlan</code> on both ends' },
    { s:'Host in the wrong VLAN', c:'<code>show vlan brief</code>; <code>show interfaces switchport</code>', cause:'Access port assigned to the wrong VLAN', fix:'<code>switchport access vlan &lt;id&gt;</code> on the port' },
    { s:'Inter-VLAN routing fails', c:'<code>show ip interface brief</code> (SVI/subinterface state)', cause:'ROAS subinterface missing <code>encapsulation dot1q</code>, or SVI down', fix:'Add the encapsulation/IP; ensure the SVI VLAN exists and a port is up' } ]},

  { tier:'P1', obj:'2.4', title:'EtherChannel',
    story:"A bundle will not light if both ends sit passive (passive+passive, auto+auto) or if you mix LACP with PAgP: you need an active partner and one protocol. A member shown as (s) suspended is the odd one out: speed, duplex, VLAN, or trunk mode differs.",
    connect:[{topic:"VLANs + trunking", sharedGotcha:"Every member port must carry identical trunk, VLAN, speed, and duplex or the link is suspended out of the bundle."}, {topic:"OSPFv2 single area", sharedGotcha:"Two passive ends or mismatched parameters mean nothing ever forms: one side must be active and both must agree."}],
    faults:[
    { s:'Bundle will not come up', c:'<code>show etherchannel summary</code> (port flags)', cause:'Mode mismatch: passive-passive, or LACP mixed with PAgP', fix:'Use a valid combo (active-active, active-passive, desirable-auto, on-on); never mix protocols' },
    { s:'A member port is suspended (s)', c:'<code>show etherchannel summary</code> shows <code>(s)</code> or <code>(I)</code>', cause:'Inconsistent member config: speed, duplex, VLAN, or trunk mode differ', fix:'Make every member port identical, then re-bundle' } ]},

  { tier:'P1', obj:'5.6', title:'ACLs',
    story:"An ACL reads top-down and stops at the FIRST match, so a broad rule above starves the specific rule below (hit counter stuck at zero), and the invisible deny any at the bottom drops whatever you forgot to permit. Placement is a rhyme: standard near the destination, extended near the source.",
    connect:[{topic:"NAT / PAT", sharedGotcha:"A misordered or too-narrow ACL silently drops or excludes the traffic you meant to allow, whether for filtering or for NAT matching."}, {topic:"Routing table + forwarding", sharedGotcha:"Most-specific, first-match-wins ordering governs the outcome, just like longest-prefix-match in the routing table."}],
    faults:[
    { s:'Legitimate traffic is being blocked', c:'<code>show access-lists</code> (hit counts per line)', cause:'No permit matches, so the implicit <code>deny any</code> drops it', fix:'Add the needed permit ABOVE the deny; order matters (first match wins)' },
    { s:'ACL has no effect', c:'<code>show ip interface &lt;int&gt;</code> (applied direction)', cause:'Applied on the wrong interface or wrong direction (in/out)', fix:'Standard ACL near the destination; extended near the source; correct in/out' },
    { s:'Specific rule never hit', c:'<code>show access-lists</code> hit counter stays 0', cause:'A broader rule above it matches first', fix:'Reorder: most specific entries first, general last' } ]},

  { tier:'P1', obj:'5.7', title:'Layer 2 security',
    story:"Port-security in shutdown mode err-disables the port the moment an extra or changed MAC appears, so a moved laptop kills the link. DHCP snooping drops server offers arriving on an UNtrusted port, and DAI ARP-drops valid static hosts that have no snooping binding to vouch for them.",
    connect:[{topic:"STP / Rapid PVST+", sharedGotcha:"Err-disabled recovery is identical: shutdown then no shutdown, whether triggered by BPDU Guard or port-security."}, {topic:"DHCP client + relay", sharedGotcha:"DHCP can silently die at L2: snooping drops offers on an untrusted port the same way a missing relay starves a remote subnet."}],
    faults:[
    { s:'Port err-disabled after a device moved', c:'<code>show port-security interface &lt;int&gt;</code>', cause:'Port-security violation in shutdown mode (MAC over max / changed)', fix:'Fix the MAC/max; <code>shutdown</code> then <code>no shutdown</code> to recover' },
    { s:'Clients cannot get DHCP on a secured switch', c:'<code>show ip dhcp snooping</code>', cause:'The server/uplink port is untrusted, so offers are dropped', fix:'Mark the server-facing port <code>ip dhcp snooping trust</code>' },
    { s:'Valid hosts ARP-dropped', c:'<code>show ip arp inspection</code>', cause:'DAI enabled without a DHCP snooping binding for static hosts', fix:'Add an ARP ACL / snooping binding, or trust the port' } ]},

  { tier:'P1', obj:'5.3', title:'Local device access',
    story:"login local promises a username and secret that may not exist, and plain login with no password locks you out of VTY entirely: the login method and the credential must agree. enable secret is hashed and outranks the weak cleartext enable password.",
    connect:[{topic:"SSH remote access", sharedGotcha:"VTY login fails the same way: the transport/login method and a real local username must both be in place or the session is refused."}, {topic:"ACLs", sharedGotcha:"An access policy configured but mismatched to its target (login method vs credential, ACL vs interface) silently denies the legitimate user."}],
    faults:[
    { s:'Cannot log into VTY (Telnet/SSH)', c:'<code>show run | section line vty</code>', cause:'<code>login local</code> set but no local user, or <code>login</code> with no password', fix:'Create a <code>username … secret …</code>, or set a VTY password to match the login method' },
    { s:'Enable mode not protected / not prompting', c:'<code>show run | include enable</code>', cause:'No <code>enable secret</code> configured', fix:'Set <code>enable secret</code> (hashed); it beats the weak <code>enable password</code>' } ]},

  { tier:'P1', obj:'1.8-1.9', title:'IPv6 + EUI-64',
    story:"IPv6 will not route between segments until you flip the global switch ipv6 unicast-routing: without it the router just hosts addresses. EUI-64 splits the MAC, jams FFFE into the middle, and FLIPS the 7th bit: miss either step and the interface ID is wrong.",
    connect:[{topic:"IPv4 subnetting", sharedGotcha:"A hand-computed address (EUI-64 interface ID vs network/broadcast) goes wrong by one bit or boundary and the host silently cannot communicate."}, {topic:"DHCP client + relay", sharedGotcha:"A host gets no usable address when the router is not advertising: no RA/prefix for SLAAC, no relay or server for DHCP."}],
    faults:[
    { s:'No IPv6 routing between segments', c:'<code>show ipv6 interface brief</code>; <code>show ipv6 route</code>', cause:'<code>ipv6 unicast-routing</code> not enabled globally', fix:'Enable <code>ipv6 unicast-routing</code>' },
    { s:'Host built the wrong interface ID', c:'compare the address to the MAC', cause:'EUI-64 built wrong: FFFE not inserted in the middle or 7th bit not flipped', fix:'Recompute EUI-64, or assign the address statically' },
    { s:'Host gets no SLAAC address', c:'<code>show ipv6 interface</code> (RA/prefix)', cause:'Router not sending RAs or wrong prefix', fix:'Enable the interface for IPv6 and advertise the correct /64 prefix' } ]},

  { tier:'P1', obj:'1.6', title:'IPv4 subnetting',
    story:"If the mask is wrong, the host and its gateway compute into DIFFERENT subnets and traffic dies at the doorstep. The first and last addresses are off-limits: network and broadcast are not host addresses, so a box can hold an IP and still go nowhere.",
    connect:[{topic:"IPv6 + EUI-64", sharedGotcha:"Both demand careful by-hand bit and boundary math: an off-by-one (mask vs flipped bit) makes a host that looks configured but cannot talk."}, {topic:"Routing table + forwarding", sharedGotcha:"Network boundaries and prefix length drive reachability: the same prefix math underlies longest-prefix-match routing decisions."}],
    faults:[
    { s:'Host cannot reach its default gateway', c:'recompute network + broadcast from IP and mask', cause:'Wrong mask: the host and gateway land in different subnets', fix:'Fix the mask so host and gateway share the same network' },
    { s:'Host has an address but no traffic flows', c:'check if the IP is the network or broadcast address', cause:'Assigned the network or broadcast address (unusable as a host)', fix:'Assign a valid host address inside the usable range' },
    { s:'Overlapping subnets', c:'map each subnet range on paper', cause:'VLSM allocated without taking the largest block first', fix:'Re-plan: largest subnet first, no range overlap' } ]},

  { tier:'P2', obj:'1.5', title:'TCP vs UDP + ports',
    story:"TCP makes a phone call (handshake, are you there, retries) so a blocked port gives connection refused; UDP fires a postcard and never waits, so a blocked port just times out with silence. Ping passing only proves the road is open, not that the door (the port) is.",
    connect:[{topic:"ACLs", sharedGotcha:"Both fail at the L4 port: ping/ICMP passes but an ACL silently drops the service port (22/443/53), so reachability looks fine while the app is dead."}, {topic:"SSH remote access", sharedGotcha:"SSH lives on TCP 22: refused vs timeout is the same handshake tell you use to separate a closed port from a filtered one."}],
    faults:[
    { s:'Ping works but the service is unreachable', c:'confirm the port; <code>show access-lists</code>', cause:'An ACL blocks the service port, or the wrong port is in use', fix:'Permit the correct port (SSH 22, HTTPS 443, DNS 53, etc.)' },
    { s:'App "times out" vs "refused" confusion', c:'reason about TCP vs UDP behavior', cause:'TCP is connection-oriented (handshake); UDP is connectionless (no reply expected)', fix:'Match the transport to the service; do not expect UDP to acknowledge' } ]},

  { tier:'P2', obj:'1.1', title:'Network components + PoE',
    story:"PoE is a power budget, not a faucet: af gives about 15W, at (PoE+) about 30W, bt (PoE++) up to 60-90W. A hungry AP on an af-only port browns out exactly like picking a switch (L2) to do a router's (L3) job: right device, wrong capability.",
    connect:[{topic:"Wireless principles", sharedGotcha:"The device that browns out from PoE budget is usually the AP, the same box whose radio and SSID you troubleshoot next."}, {topic:"Layer 2 security", sharedGotcha:"Same match-the-role-to-the-layer trap: L2 switch features vs L3 routing vs firewall/IPS roles get confused under exam pressure."}],
    faults:[
    { s:'AP or phone will not power on', c:'<code>show power inline</code>', cause:'PoE budget exceeded or the device needs a higher standard', fix:'Free up PoE budget or use the right standard (802.3af / at / bt)' },
    { s:'Wrong device chosen for the job', c:'reason about L2 vs L3 vs security', cause:'Switch (L2) vs router (L3) vs firewall/IPS roles confused', fix:'Match the device to the layer/function the question describes' } ]},

  { tier:'P2', obj:'1.11', title:'Wireless principles',
    story:"In 2.4 GHz only channels 1, 6, 11 do not step on each other (the only three that fit without overlap), so neighbors on 2/3/4 jam each other. SSID is the network's name you type; BSSID is the AP radio's MAC, the actual address behind that name.",
    connect:[{topic:"Network components + PoE", sharedGotcha:"The AP you are tuning channels on is the same PoE device: no power budget means no radio to set 1/6/11 on."}, {topic:"WLAN GUI (WPA2-PSK)", sharedGotcha:"Both are wireless: principles say WHY the client struggles (channel/SSID), the WLC GUI pillar is WHERE you fix auth and interface mapping."}],
    faults:[
    { s:'Slow / unreliable 2.4 GHz Wi-Fi', c:'check the channel plan', cause:'Overlapping channels (anything but 1, 6, 11)', fix:'Set non-overlapping channels 1/6/11' },
    { s:'Client cannot see the network', c:'SSID vs BSSID', cause:'SSID broadcast disabled, or confusing SSID (name) with BSSID (radio MAC)', fix:'Enable/announce the SSID; remember BSSID identifies the AP radio' } ]},

  { tier:'P2', obj:'4.8', title:'SSH remote access',
    story:"RSA keys need an identity to be born: hostname plus ip domain-name FIRST, then crypto key generate rsa, because the key is named host.domain. No name, no key, no SSH. Then the VTY line must actually let SSH in: transport input ssh plus login local plus a real user.",
    connect:[{topic:"Local device access", sharedGotcha:"Both die on login local with no username: VTY lets you in only if a local user and secret actually exist to match the login method."}, {topic:"TCP vs UDP + ports", sharedGotcha:"SSH is TCP 22: a refused-vs-timeout symptom tells you whether VTY rejected you or an ACL/port filtered you."}],
    faults:[
    { s:'SSH connection refused / key error', c:'<code>show ip ssh</code>; <code>show run | section vty</code>', cause:'No RSA key (hostname + domain-name must be set first)', fix:'Set <code>hostname</code>, <code>ip domain-name</code>, then <code>crypto key generate rsa</code>' },
    { s:'SSH still not allowed on VTY', c:'<code>show run | section line vty</code>', cause:'<code>transport input</code> lacks ssh, or no <code>login local</code>/user', fix:'<code>transport input ssh</code> + <code>login local</code> + a local username' } ]},

  { tier:'P2', obj:'4.6', title:'DHCP client + relay',
    story:"A 169.254.x.x (APIPA) address is the client shouting into an empty room: no DHCP server heard it. Routers do not forward broadcasts, so a remote subnet needs ip helper-address to relay the DISCOVER as unicast to the server.",
    connect:[{topic:"Layer 2 security", sharedGotcha:"DHCP snooping drops offers from an untrusted server/uplink port, so no DHCP can be a security feature working, not a relay problem: trust the right port."}, {topic:"IPv4 subnetting", sharedGotcha:"Pool exhaustion and conflicts trace back to a pool sized wrong for the subnet or static IPs not excluded: same subnet-math discipline."}],
    faults:[
    { s:'Client has a 169.254.x.x address', c:'<code>ipconfig</code> / <code>show ip interface</code>', cause:'APIPA: no DHCP server reachable', fix:'Restore the server path; on a remote subnet add <code>ip helper-address</code>' },
    { s:'Remote-subnet clients get nothing, local works', c:'<code>show run interface</code> (helper present?)', cause:'No DHCP relay across the router', fix:'Add <code>ip helper-address &lt;server&gt;</code> on the client-side SVI/interface' },
    { s:'Address conflicts / pool exhausted', c:'<code>show ip dhcp conflict</code>; <code>show ip dhcp binding</code>', cause:'Overlapping static IPs or too-small pool', fix:'Exclude static addresses; size the pool to the subnet' } ]},

  { tier:'P2', obj:'4.7', title:'QoS PHB',
    story:"Police is a cop who tickets and tosses the over-limit car instantly (drop, no delay); shape is a metering light that holds cars in a buffer to merge smoothly (delay, no drop). Without classify-mark-queue, voice and video just wait in the same line as a file download.",
    connect:[{topic:"TCP vs UDP + ports", sharedGotcha:"Real-time voice/video rides UDP, which never retransmits, so a dropped (policed) packet is gone for good: that is why it needs priority queuing."}, {topic:"Routing table + forwarding", sharedGotcha:"Both act at the egress interface: QoS decides the ORDER packets leave, the routing table decides WHICH interface they leave by."}],
    faults:[
    { s:'Voice/video choppy under load', c:'<code>show policy-map interface</code>', cause:'No classification/marking/queuing, so real-time traffic is not prioritized', fix:'Classify, mark (DSCP/CoS), and queue the priority traffic' },
    { s:'Traffic dropped vs delayed confusion', c:'reason policing vs shaping', cause:'Policing drops excess (no delay); shaping buffers it (adds delay)', fix:'Police to drop at the edge; shape to smooth toward a slower link' } ]},

  { tier:'P2', obj:'3.5', title:'FHRP (HSRP/VRRP/GLBP)',
    story:"FHRP is two routers sharing one virtual gateway IP. If both go Active, they have gone deaf to each other: the L2 path between them is down, so neither hears the other's hellos. HSRP and VRRP are active/standby (one forwards); only GLBP load-balances multiple active forwarders.",
    connect:[{topic:"STP / Rapid PVST+", sharedGotcha:"Both Active is an L2-path failure: the same broken or blocking L2 link that kills STP forwarding also stops FHRP hellos from passing."}, {topic:"EtherChannel", sharedGotcha:"Both bundle redundancy and break on a mismatch: FHRP needs matching group/VIP/version, EtherChannel needs matching mode/config, or it silently will not form."}],
    faults:[
    { s:'Gateway failover does not work', c:'<code>show standby brief</code>', cause:'Group number, virtual IP, or version mismatch between routers', fix:'Match group, VIP, and version; confirm they see each other' },
    { s:'Both routers think they are active', c:'<code>show standby brief</code> (two Active)', cause:'The routers cannot hear each other (L2 path down)', fix:'Fix the L2 link between them so hellos pass' },
    { s:'No load balancing across gateways', c:'<code>show glbp</code>', cause:'HSRP/VRRP are active/standby; only GLBP load-balances active gateways', fix:'Use GLBP if you need multiple active forwarders' } ]},

  { tier:'P2', obj:'2.9/5.10', title:'WLAN GUI (WPA2-PSK)',
    story:"Two different failures, two different GUI tabs: a wrong PSK fails on the Security tab (client cannot authenticate), but a client that auths yet gets no IP failed on Interface mapping (WLAN not tied to the right dynamic interface/VLAN, or disabled). Auth and addressing are separate doors.",
    connect:[{topic:"Wireless principles", sharedGotcha:"Same wireless client: principles explain channel and SSID visibility, this pillar is the WLC GUI where you fix the WPA2-PSK and VLAN binding."}, {topic:"DHCP client + relay", sharedGotcha:"Authenticated but no IP is the same broken-addressing story: here the WLAN VLAN mapping is wrong, there the DHCP relay/server path is."}],
    faults:[
    { s:'Clients cannot authenticate to the WLAN', c:'WLC GUI: WLAN Security tab', cause:'Wrong PSK, or WPA2/PSK not set correctly', fix:'Re-enter the PSK; confirm WPA2 + PSK on the Security tab' },
    { s:'WLAN exists but no client gets an IP', c:'WLC GUI: WLAN > Interface mapping', cause:'WLAN not mapped to the right interface/VLAN, or WLAN disabled', fix:'Map the WLAN to the correct dynamic interface/VLAN and enable it' } ]}
  ];
})();
