// AUTO-GENERATED troubleshoot engine labs. v3: all false-heals closed.
window.TLABS = [
  {
    id: "ts-l2-01", title: "STP root bridge in the wrong place", diff: "intermediate", topics: ["2.5"],
    scenario: "Users in VLAN 10 report slow file shares. NOC sees traffic from the access layer taking a non-optimal path. Distribution switch DSW1 should be the VLAN 10 root bridge, but another switch (MAC aabb.cc00.0a01, priority 4106) is winning the election. You are on DSW1. Investigate the spanning-tree state, then lower DSW1's VLAN 10 priority so it becomes root, and confirm.",
    device: {"name": "DSW1", "type": "switch", "hostname": "DSW1", "vlans": {"10": {"name": "SALES"}, "20": {"name": "VOICE"}}, "interfaces": {"GigabitEthernet1/0/1": {"up": true, "mode": "trunk"}}, "custom": {"vlan10Priority": 32768, "rogueRootPriority": 4106, "rogueRootMac": "aabb.cc00.0a01", "localMac": "aabb.cc00.0c01"}},
    objectives: [
    { text: "Investigate the VLAN 10 spanning-tree state and confirm DSW1 is not the root bridge", hint: "Compare the Root ID priority/MAC against this bridge's own ID -- show spanning-tree vlan 10", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+span(ning)?(-tree)?\s+vlan\s+10$/i.test(c.cmd);});} },
    { text: "Enter config and select the spanning-tree scope to fix the election", hint: "You set STP priority globally, not on an interface -- configure terminal", check: function(d){return d.mode==='config'||d.mode==='config-if';} },
    { text: "Lower DSW1's VLAN 10 priority so its bridge ID beats the current root", hint: "spanning-tree vlan 10 root primary (or spanning-tree vlan 10 priority 0): bridge ID adds sys-id-ext 10, so priority 4096 ties at 4106 and loses on MAC", check: function(d){return d.custom&&(Number(d.custom.vlan10Priority)+10)<Number(d.custom.rogueRootPriority);} },
    { text: "Confirm DSW1 is now the VLAN 10 root bridge", hint: "end, then show spanning-tree vlan 10. Root ID should now read 'This bridge is the root'", check: function(d,log){var won=d.custom&&(Number(d.custom.vlan10Priority)+10)<Number(d.custom.rogueRootPriority);return won&&log.some(function(c){return /^(do\s+)?sh(ow)?\s+span(ning)?(-tree)?\s+vlan\s+10$/i.test(c.cmd)&&c.time>(d.__fixTime||0);});} }
    ],
    extraCmds: function(dev,raw,lower){
  var c=dev.custom;
  // root primary -> IOS sets priority to 24576 (or 4096 below current root if needed)
  var rp=raw.match(/^spanning-tree\s+vlan\s+10\s+root\s+primary\b/i);
  if(rp&&dev.mode==='config'){
    var target=24576;
    if(Number(c.rogueRootPriority)<=target){ target=Number(c.rogueRootPriority)-4096-(Number(c.rogueRootPriority)%4096); if(target<0)target=0; }
    c.vlan10Priority=target; dev.__fixTime=Date.now(); return '';
  }
  // explicit priority (must be multiple of 4096)
  var pm=raw.match(/^spanning-tree\s+vlan\s+10\s+priority\s+(\d+)/i);
  if(pm&&dev.mode==='config'){
    c.vlan10Priority=parseInt(pm[1],10); dev.__fixTime=Date.now(); return '';
  }
  // fault-specific show: render VLAN 10 spanning-tree from current priority state
  if(/^(do\s+)?show\s+span(ning)?(-tree)?\s+vlan\s+10$/i.test(lower)){
    var localBridge=Number(c.vlan10Priority)+10; // sys-id-ext 10
    var rogue=Number(c.rogueRootPriority);
    var localWins=localBridge<rogue;
    var rootPrio=localWins?localBridge:rogue;
    var rootMac=localWins?c.localMac:c.rogueRootMac;
    var out='VLAN0010\n  Spanning tree enabled protocol ieee\n  Root ID    Priority    '+rootPrio+'\n             Address     '+rootMac+'\n';
    if(localWins){
      out+='             This bridge is the root\n';
    }else{
      out+='             Cost        4\n             Port        1 (GigabitEthernet1/0/1)\n';
    }
    out+='             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec\n\n';
    out+='  Bridge ID  Priority    '+localBridge+'  (priority '+Number(c.vlan10Priority)+' sys-id-ext 10)\n';
    out+='             Address     '+c.localMac+'\n';
    out+='             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec\n             Aging Time  300 sec\n\n';
    out+='Interface           Role Sts Cost      Prio.Nbr Type\n------------------- ---- --- --------- -------- --------------------------------\n';
    out+='Gi1/0/1             '+(localWins?'Desg':'Root')+' FWD 4         128.1    P2p\n';
    return out;
  }
  return undefined;
},
    solution: ["show spanning-tree vlan 10", "enable", "configure terminal", "spanning-tree vlan 10 root primary", "end", "show spanning-tree vlan 10"]
  },
  {
    id: "ts-l2-02", title: "BPDU Guard err-disabled an access port", diff: "beginner", topics: ["2.5"],
    scenario: "A user in conference room 2F reports their laptop has no network. Access port Gi0/15 on SW1 worked for months, the cable is plugged in, but the port shows down. The rogue bridge that tripped the policy has already been unplugged — now recover the port. Read the interface status and the log, then bounce the port to bring it back, and confirm it comes up.",
    device: {"name": "SW1", "type": "switch", "hostname": "SW1", "vlans": {"1": {"name": "default"}, "10": {"name": "users"}, "20": {"name": "voice"}}, "interfaces": {"GigabitEthernet0/15": {"up": false, "mode": "access", "accessVlan": 10, "description": "conf-room-2F", "errDisabled": true, "portfast": true, "bpduguard": true}}, "custom": {"bounced": false}},
    objectives: [
    { text: "Investigate — read the status of the affected access port", hint: "show interfaces gi0/15 status — read the Status column (err-disabled tells you IOS shut it, not a cable fault)", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/15\s+stat/i.test(c.cmd);});} },
    { text: "Investigate — read the log to confirm why the port was disabled", hint: "show logging | inc Gi0/15 — look for %SPANTREE-2-BLOCK_BPDUGUARD, that's BPDU Guard tripping", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+log(ging)?/i.test(c.cmd);});} },
    { text: "Select the port and bounce it to clear the err-disabled state", hint: "interface gi0/15 → shutdown → no shutdown (bouncing the port clears bpduguard err-disable)", check: function(d,log){var i=d.interfaces['GigabitEthernet0/15'];return i&&d.custom.bounced===true&&i.errDisabled===false&&i.up===true;} },
    { text: "Confirm the fix — the port is back up and connected", hint: "end → show interfaces gi0/15 status — Status should now read connected", check: function(d,log){var i=d.interfaces['GigabitEthernet0/15'];var fixed=i&&i.errDisabled===false&&i.up===true;return fixed&&log.some(function(c){return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/15\s+stat/i.test(c.cmd)&&c.time>=(d.__fixTime||0);});} }
    ],
    extraCmds: function(dev,raw,lower){
  var I='GigabitEthernet0/15';
  // FIX: bounce the port. shutdown then no shutdown clears bpduguard err-disable.
  if(dev.mode==='config-if'&&dev.currentInterface===I){
    if(/^shut(down)?$/i.test(lower)){
      dev.interfaces[I].up=false;
      dev.custom.shutSeen=true;
      return '';
    }
    if(/^no\s+shut(down)?$/i.test(lower)){
      if(dev.custom.shutSeen){
        dev.interfaces[I].errDisabled=false;
        dev.interfaces[I].up=true;
        dev.custom.bounced=true;
        dev.__fixTime=Date.now();
        return '\n%LINK-3-UPDOWN: Interface GigabitEthernet0/15, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/15, changed state to up';
      }
      // no shut without a prior shut won't clear err-disable
      return '';
    }
  }
  // SHOW interfaces gi0/15 status — symptom err-disabled, heals to connected
  if(/^(do\s+)?show\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/15\s+stat(us)?$/i.test(lower)){
    var i=dev.interfaces[I];
    var status=i.errDisabled?'err-disabled':(i.up?'connected':'notconnect');
    var vlan=String(i.accessVlan);
    return 'Port      Name               Status       Vlan       Duplex  Speed Type\n'
      + 'Gi0/15    '+(i.description||'').padEnd(19)+status.padEnd(13)+vlan.padEnd(11)+'auto    auto 10/100/1000BaseTX';
  }
  // SHOW logging — the BPDU Guard evidence
  if(/^(do\s+)?show\s+log(ging)?(\s*\|\s*inc(lude)?\s+gi0\/15)?$/i.test(lower)){
    var i2=dev.interfaces[I];
    var base='May 30 14:02:11.221: %SPANTREE-2-BLOCK_BPDUGUARD: Received BPDU on port Gi0/15 with BPDU Guard enabled. Disabling port.\n'
      + 'May 30 14:02:11.225: %PM-4-ERR_DISABLE: bpduguard error detected on Gi0/15, putting Gi0/15 in err-disable state\n'
      + 'May 30 14:02:13.110: %LINK-3-UPDOWN: Interface GigabitEthernet0/15, changed state to down';
    if(i2&&i2.up&&!i2.errDisabled){
      base+='\nMay 30 14:08:47.502: %LINK-3-UPDOWN: Interface GigabitEthernet0/15, changed state to up';
    }
    return base;
  }
  // SHOW interfaces status err-disabled — list view
  if(/^(do\s+)?show\s+int(erface)?(s)?\s+stat(us)?\s+err-?disabled$/i.test(lower)){
    var i3=dev.interfaces[I];
    if(i3&&i3.errDisabled){
      return 'Port      Name               Status            Reason               Err-disabled Vlans\n'
        + 'Gi0/15    '+(i3.description||'').padEnd(19)+'err-disabled      bpduguard';
    }
    return 'Port      Name               Status            Reason               Err-disabled Vlans';
  }
  return undefined;
},
    solution: ["show interfaces gi0/15 status", "show logging | inc Gi0/15", "enable", "configure terminal", "interface gi0/15", "shutdown", "no shutdown", "end", "show interfaces gi0/15 status"]
  },
  {
    id: "ts-l2-03", title: "VLAN missing from trunk allowed list", diff: "beginner", topics: ["2.2"],
    scenario: "VLAN 30 (GUEST) hosts on SW2 cannot reach the guest gateway on DSW1, yet VLAN 10 and 20 cross the same uplink trunk Gi0/1 fine and the trunk shows up/trunking. The VLAN exists locally with active ports. Investigate what the trunk is actually carrying, add VLAN 30 to the trunk's allowed list, and confirm guest traffic can now pass.",
    device: {"name": "SW2", "type": "switch", "hostname": "SW2", "vlans": {"1": {"name": "default"}, "10": {"name": "SALES"}, "20": {"name": "ENG"}, "30": {"name": "GUEST"}, "99": {"name": "MGMT"}}, "interfaces": {"GigabitEthernet0/1": {"up": true, "mode": "trunk", "nativeVlan": 1, "allowedVlans": [1, 10, 20, 99]}, "GigabitEthernet0/14": {"up": true, "mode": "access", "accessVlan": 30}, "GigabitEthernet0/15": {"up": true, "mode": "access", "accessVlan": 30}}, "custom": {"requiredVlan": 30, "trunkPort": "GigabitEthernet0/1"}},
    objectives: [
    { text: "Investigate what VLANs the uplink trunk is actually allowed to carry", hint: "show interfaces trunk - read the 'Vlans allowed on trunk' line for Gi0/1", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+tr/i.test(c.cmd); }); } },
    { text: "Enter config and select the uplink trunk interface", hint: "configure terminal -> interface gi0/1", check: function(d){ return d.mode === 'config-if' && d.currentInterface === 'GigabitEthernet0/1'; } },
    { text: "Add the GUEST VLAN to the trunk's allowed list without dropping the others", hint: "switchport trunk allowed vlan add 30", check: function(d){ var i = d.interfaces['GigabitEthernet0/1']; return i && i.allowedVlans && i.allowedVlans.indexOf(30) !== -1 && i.allowedVlans.indexOf(10) !== -1 && i.allowedVlans.indexOf(20) !== -1; } },
    { text: "Confirm VLAN 30 now appears in the trunk's allowed list", hint: "end -> show interfaces trunk", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/1']; var fixed = i && i.allowedVlans && i.allowedVlans.indexOf(30) !== -1; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+tr/i.test(c.cmd) && c.time >= (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  var tp = dev.custom.trunkPort;
  var i = dev.interfaces[tp];
  // FIX parsing: only valid while in config-if on the trunk port
  if (dev.mode === 'config-if' && dev.currentInterface === tp) {
    var addm = raw.match(/^switchport\s+trunk\s+allowed\s+vlan\s+add\s+([\d,]+)/i);
    if (addm) {
      addm[1].split(',').forEach(function(s){ var v = parseInt(s,10); if(!isNaN(v) && i.allowedVlans.indexOf(v)===-1) i.allowedVlans.push(v); });
      i.allowedVlans.sort(function(a,b){return a-b;});
      dev.__fixTime = Date.now();
      return '';
    }
    var setm = raw.match(/^switchport\s+trunk\s+allowed\s+vlan\s+([\d,]+)/i);
    if (setm) {
      i.allowedVlans = setm[1].split(',').map(function(s){return parseInt(s,10);}).filter(function(v){return !isNaN(v);});
      i.allowedVlans.sort(function(a,b){return a-b;});
      dev.__fixTime = Date.now();
      return '';
    }
  }
  // FAULT show: show interfaces trunk - renders allowed list from state
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+tr(unk)?$/i.test(lower)) {
    var allowed = (i && i.allowedVlans ? i.allowedVlans.slice().sort(function(a,b){return a-b;}) : []).join(',');
    var nv = i ? i.nativeVlan : 1;
    return 'Port        Mode             Encapsulation  Status        Native vlan\n'
      + 'Gi0/1       on               802.1q         trunking      ' + nv + '\n\n'
      + 'Port        Vlans allowed on trunk\n'
      + 'Gi0/1       ' + allowed + '\n\n'
      + 'Port        Vlans allowed and active in management domain\n'
      + 'Gi0/1       ' + allowed + '\n\n'
      + 'Port        Vlans in spanning tree forwarding state and not pruned\n'
      + 'Gi0/1       ' + allowed;
  }
  // Supporting evidence: VLAN 30 exists locally with active ports
  if (/^(do\s+)?show\s+vlan(\s+brief)?$/i.test(lower)) {
    return 'VLAN Name                             Status    Ports\n'
      + '---- -------------------------------- --------- -------------------------------\n'
      + '1    default                          active    Gi0/5, Gi0/6\n'
      + '10   SALES                            active    Gi0/10, Gi0/11\n'
      + '20   ENG                              active    Gi0/12, Gi0/13\n'
      + '30   GUEST                            active    Gi0/14, Gi0/15\n'
      + '99   MGMT                             active\n'
      + '1002 fddi-default                     act/unsup';
  }
  return undefined;
},
    solution: ["show interfaces trunk", "enable", "configure terminal", "interface gi0/1", "switchport trunk allowed vlan add 30", "end", "show interfaces trunk"]
  },
  {
    id: "ts-l2-04", title: "Trunk native VLAN mismatch (CDP syslog flood)", diff: "intermediate", topics: ["2.2", "2.4"],
    scenario: "SW1's NOC dashboard is flooded with %CDP-4-NATIVE_VLAN_MISMATCH syslogs every minute on the Gi0/2 trunk to SW2. The trunk is up and most VLANs forward, but untagged management traffic in VLAN 99 leaks into the wrong VLAN on the far side. SW2 Gi0/1 is locked at native VLAN 1. Investigate the trunk, find where SW1's native VLAN disagrees with its neighbor, correct SW1 so the two ends match, and confirm the mismatch clears.",
    device: {"name": "SW1", "type": "switch", "hostname": "SW1", "vlans": {"1": {"name": "default"}, "10": {"name": "DATA"}, "20": {"name": "VOICE"}, "30": {"name": "GUEST"}, "99": {"name": "MGMT"}}, "interfaces": {"GigabitEthernet0/2": {"up": true, "mode": "trunk", "nativeVlan": 99, "trunkEncap": "dot1q", "allowedVlans": "1,10,20,30,99", "desc": "trunk-to-SW2"}}, "custom": {"peer": "SW2", "peerPort": "GigabitEthernet0/1", "peerNative": 1}},
    objectives: [
    { text: "Investigate the trunk to read its operational native VLAN", hint: "Native VLAN lives in the trunk summary: show interfaces gi0/2 trunk", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/2\s+)?tr/i.test(c.cmd); }); } },
    { text: "Confirm the neighbor's native VLAN to prove the mismatch and its direction", hint: "CDP carries the peer native VLAN: show cdp neighbors detail", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+cdp\s+nei(ghbors?)?\s+det/i.test(c.cmd); }); } },
    { text: "Select the trunk interface in configuration mode", hint: "configure terminal then interface gi0/2", check: function(d){ return d.currentInterface === 'GigabitEthernet0/2' || (d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Set SW1's trunk native VLAN so it matches the neighbor's", hint: "switchport trunk native vlan 1", check: function(d){ var i = d.interfaces['GigabitEthernet0/2']; return i && String(i.nativeVlan) === String(d.custom.peerNative); } },
    { text: "Confirm the native VLANs now agree and the mismatch is cleared", hint: "end then show interfaces gi0/2 trunk (no CDP mismatch warning, natives equal)", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/2']; var fixed = i && String(i.nativeVlan) === String(d.custom.peerNative); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/2\s+)?tr/i.test(c.cmd) && c.time >= (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev,raw,lower){ var i = dev.interfaces['GigabitEthernet0/2']; var m = raw.match(/^switchport\s+trunk\s+native\s+vlan\s+(\d+)/i); if (m && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/2') { dev.interfaces['GigabitEthernet0/2'].nativeVlan = parseInt(m[1], 10); dev.__fixTime = Date.now(); return ''; } if (/^(do\s+)?show\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/2\s+)?tr(unk)?$/i.test(lower)) { var nv = i ? i.nativeVlan : 99; var pn = dev.custom.peerNative; var allowed = (i && i.allowedVlans) || '1,10,20,30,99'; var warn = (String(nv) !== String(pn)) ? '\n\n%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/2 (' + nv + '), with ' + dev.custom.peer + ' ' + dev.custom.peerPort + ' (' + pn + ').' : ''; return 'Port        Mode             Encapsulation  Status        Native vlan\n' + 'Gi0/2       on               802.1q         trunking      ' + nv + '\n\n' + 'Port        Vlans allowed on trunk\n' + 'Gi0/2       ' + allowed + '\n\n' + 'Port        Vlans allowed and active in management domain\n' + 'Gi0/2       ' + allowed + '\n\n' + 'Port        Vlans in spanning tree forwarding state and not pruned\n' + 'Gi0/2       ' + allowed + warn; } if (/^(do\s+)?show\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/2\s+)?sw(itchport)?$/i.test(lower)) { var snv = i ? i.nativeVlan : 99; var sallowed = (i && i.allowedVlans) || '1,10,20,30,99'; var sname = (dev.vlans && dev.vlans[String(snv)] && dev.vlans[String(snv)].name) ? dev.vlans[String(snv)].name : 'default'; return 'Name: Gi0/2\n' + 'Switchport: Enabled\n' + 'Administrative Mode: trunk\n' + 'Operational Mode: trunk\n' + 'Administrative Trunking Encapsulation: dot1q\n' + 'Operational Trunking Encapsulation: dot1q\n' + 'Negotiation of Trunking: On\n' + 'Access Mode VLAN: 1 (default)\n' + 'Trunking Native Mode VLAN: ' + snv + ' (' + sname + ')\n' + 'Administrative Native VLAN tagging: enabled\n' + 'Voice VLAN: none\n' + 'Trunking VLANs Enabled: ' + sallowed; } if (/^(do\s+)?show\s+cdp\s+nei(ghbors?)?\s+det(ail)?/i.test(lower)) { return '-------------------------\nDevice ID: ' + dev.custom.peer + '\nEntry address(es):\n  IP address: 192.168.99.12\nPlatform: cisco WS-C2960-24TT-L,  Capabilities: Switch IGMP\nInterface: GigabitEthernet0/2,  Port ID (outgoing port): ' + dev.custom.peerPort + '\nHoldtime : 167 sec\nNative VLAN: ' + dev.custom.peerNative; } if (/^(do\s+)?show\s+logging(\s+\|\s+inc\s+mismatch)?$/i.test(lower)) { var nv2 = i ? i.nativeVlan : 99; var pn2 = dev.custom.peerNative; if (String(nv2) === String(pn2)) { return 'Syslog logging: enabled\n(no native VLAN mismatch entries)'; } var lines = ['May 30 09:15:02.110','May 30 09:16:02.118','May 30 09:17:02.121'].map(function(t){ return t + ': %CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/2 (' + nv2 + '), with ' + dev.custom.peer + ' ' + dev.custom.peerPort + ' (' + pn2 + ').'; }); return lines.join('\n'); } return undefined; },
    solution: ["show interfaces gi0/2 trunk", "show cdp neighbors detail", "enable", "configure terminal", "interface gi0/2", "switchport trunk native vlan 1", "end", "show interfaces gi0/2 trunk"]
  },
  {
    id: "ts-l2-05", title: "DTP mode mismatch — no trunk forms", diff: "intermediate", topics: ["2.2"],
    scenario: "After a switch swap, the link SW1 Gi0/3 to SW3 stopped carrying VLAN 20. Hosts on VLAN 20 behind SW3 can only reach VLAN 1, yet both ports show up/up. SW1 Gi0/3 is left on its default dynamic-desirable mode and the peer will not negotiate, so the link fell back to a plain access port. Investigate the trunk state on SW1, then force Gi0/3 to a deterministic trunk so the link stops depending on DTP, and confirm the trunk comes up carrying VLAN 20.",
    device: {"name": "SW1", "type": "switch", "hostname": "SW1", "vlans": {"1": {"name": "default"}, "10": {"name": "SALES"}, "20": {"name": "ENG"}, "99": {"name": "MGMT"}}, "interfaces": {"GigabitEthernet0/3": {"up": true, "mode": "dynamic desirable", "trunkEncap": "negotiate", "opMode": "access", "accessVlan": 1, "nativeVlan": 1}}, "custom": {"peer": "SW3", "peerPort": "GigabitEthernet0/1", "peerMode": "static access"}},
    objectives: [
    { text: "Investigate the operational trunking state of the uplink to find out why no trunk is active", hint: "Read the Mode/Status columns for the uplink: show interfaces trunk (or show interfaces gi0/3 trunk)", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?(\s+gi\S*)?\s+tr/i.test(c.cmd); }); } },
    { text: "Enter config and select the uplink interface", hint: "configure terminal -> interface gi0/3", check: function(d,log){ if (d.currentInterface === 'GigabitEthernet0/3' || (d.interfaces['GigabitEthernet0/3'] && d.mode && d.mode.indexOf('config') === 0)) return true; return log && log.some(function(c){ return /^int(erface)?\s+gi\S*0\/3\b/i.test(c.cmd); }); } },
    { text: "Pin the encapsulation and force the port into a deterministic trunk so it no longer relies on DTP negotiation", hint: "switchport trunk encapsulation dot1q -> switchport mode trunk", check: function(d){ var i = d.interfaces['GigabitEthernet0/3']; return i && i.mode === 'trunk' && i.trunkEncap === 'dot1q'; } },
    { text: "Confirm the link is now trunking and VLAN 20 is allowed", hint: "end -> show interfaces trunk : Mode on, Status trunking, VLAN 20 in the allowed list", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/3']; var fixed = i && i.mode === 'trunk' && i.trunkEncap === 'dot1q'; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?(\s+gi\S*)?\s+tr/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  var i = dev.interfaces['GigabitEthernet0/3'];
  // ── Fix command 1: pin encapsulation ──
  var enc = raw.match(/^switchport\s+trunk\s+encapsulation\s+(dot1q|isl|negotiate)/i);
  if (enc && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/3') {
    var ei = dev.interfaces['GigabitEthernet0/3'];
    ei.trunkEncap = enc[1].toLowerCase();
    // If the port is already forced to trunk mode, pinning dot1q now brings the
    // trunk operationally up (handles either command order). Anything other than
    // dot1q (isl/negotiate) leaves it non-trunking.
    if (ei.mode === 'trunk') ei.opMode = (ei.trunkEncap === 'dot1q') ? 'trunk' : 'access';
    dev.__fixTime = Date.now();
    return '';
  }
  // ── Fix command 2: force trunk mode ──
  var md = raw.match(/^switchport\s+mode\s+(trunk|access|dynamic\s+(?:auto|desirable))/i);
  if (md && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/3') {
    var want = md[1].toLowerCase();
    var iface = dev.interfaces['GigabitEthernet0/3'];
    if (want === 'trunk') {
      iface.mode = 'trunk';
      // Do NOT auto-pin encapsulation here. The trunk only becomes operational
      // once 'switchport trunk encapsulation dot1q' has been issued explicitly.
      iface.opMode = (iface.trunkEncap === 'dot1q') ? 'trunk' : 'access';
    } else if (want === 'access') {
      iface.mode = 'access'; iface.opMode = 'access';
    } else {
      iface.mode = want; iface.opMode = 'access';
    }
    dev.__fixTime = Date.now();
    return '';
  }
  // ── Show: interfaces trunk (bare) vs interfaces gi0/3 trunk (per-interface) ──
  var trunkCmd = lower.match(/^(do\s+)?show\s+int(erface)?(s)?(\s+gi\S*)?\s+tr(unk)?$/i);
  if (trunkCmd) {
    var iface = dev.interfaces['GigabitEthernet0/3'];
    // Operationally trunking only when forced trunk AND dot1q pinned (opMode tracks this).
    var trunking = iface.opMode === 'trunk';
    var perIface = !!trunkCmd[4]; // captured the "(\s+gi\S*)" interface token
    if (trunking) {
      // HEALED: deterministic trunk up, all VLANs (incl 20) allowed.
      // Real IOS lists the active trunk under BOTH the bare and per-interface forms.
      return 'Port        Mode             Encapsulation  Status        Native vlan\n'
        + 'Gi0/3       on               802.1q         trunking      1\n\n'
        + 'Port        Vlans allowed on trunk\n'
        + 'Gi0/3       1-4094\n\n'
        + 'Port        Vlans allowed and active in management domain\n'
        + 'Gi0/3       1,10,20,99\n\n'
        + 'Port        Vlans in spanning tree forwarding state and not pruned\n'
        + 'Gi0/3       1,10,20,99';
    }
    // SYMPTOM: no operational trunk.
    if (perIface) {
      // Per-interface form names the port even when it is not trunking.
      return 'Port        Mode             Encapsulation  Status        Native vlan\n'
        + 'Gi0/3       desirable        802.1q         not-trunking  1\n\n'
        + 'Port        Vlans allowed on trunk\n'
        + 'Gi0/3       1\n\n'
        + 'Port        Vlans allowed and active in management domain\n'
        + 'Gi0/3       1\n\n'
        + 'Port        Vlans in spanning tree forwarding state and not pruned\n'
        + 'Gi0/3       1';
    }
    // Bare 'show interfaces trunk' with zero active trunks prints nothing on real IOS.
    return '';
  }
  // ── Show: interfaces gi0/3 switchport ──
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+gi\S*\s+sw(itchport)?$/i.test(lower)) {
    var iface = dev.interfaces['GigabitEthernet0/3'];
    var adminMode = iface.mode === 'trunk' ? 'trunk' : (iface.mode === 'access' ? 'static access' : 'dynamic desirable');
    var opMode = iface.opMode === 'trunk' ? 'trunk' : 'static access';
    var encLine = iface.trunkEncap === 'dot1q' ? 'dot1q' : (iface.trunkEncap === 'isl' ? 'isl' : 'negotiate');
    var nego = iface.mode === 'trunk' ? 'Off' : 'On';
    return 'Name: Gi0/3\n'
      + 'Switchport: Enabled\n'
      + 'Administrative Mode: ' + adminMode + '\n'
      + 'Operational Mode: ' + opMode + '\n'
      + 'Administrative Trunking Encapsulation: ' + encLine + '\n'
      + 'Operational Trunking Encapsulation: ' + (opMode === 'trunk' ? 'dot1q' : 'native') + '\n'
      + 'Negotiation of Trunking: ' + nego + '\n'
      + 'Access Mode VLAN: 1 (default)\n'
      + 'Trunking Native Mode VLAN: 1 (default)\n'
      + 'Administrative Native VLAN tagging: enabled\n'
      + 'Voice VLAN: none\n'
      + 'Trunking VLANs Enabled: ALL\n'
      + 'Pruning VLANs Enabled: 2-1001';
  }
  // ── Show: cdp neighbors detail (peer evidence — SW3 is static access) ──
  if (/^(do\s+)?show\s+cdp\s+ne(ighbors?)?(\s+det(ail)?)?(\s*\|\s*begin\s+sw3)?$/i.test(lower)) {
    return '-------------------------\n'
      + 'Device ID: SW3\n'
      + 'Platform: cisco WS-C2960-24TT-L,  Capabilities: Switch IGMP\n'
      + 'Interface: GigabitEthernet0/3,  Port ID (outgoing port): GigabitEthernet0/1\n'
      + 'Holdtime : 175 sec\n'
      + 'Native VLAN: 1\n'
      + '(SW3 Gi0/1 is configured switchport mode access, negotiation off — it will not form a trunk via DTP)';
  }
  // ── Show: interfaces gi0/3 status ──
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+gi\S*\s+stat(us)?$/i.test(lower)) {
    var iface = dev.interfaces['GigabitEthernet0/3'];
    var vcol = iface.opMode === 'trunk' ? 'trunk' : '1';
    return 'Port      Name               Status       Vlan       Duplex  Speed Type\n'
      + 'Gi0/3     to-SW3             connected    ' + vcol.padEnd(10) + ' a-full a-1000 10/100/1000BaseTX';
  }
  // ── Show: vlan brief ──
  if (/^(do\s+)?show\s+vlan(\s+brief)?$/i.test(lower)) {
    return 'VLAN Name                             Status    Ports\n'
      + '---- -------------------------------- --------- -------------------------------\n'
      + '1    default                          active    Gi0/1, Gi0/2, Gi0/4, Gi0/5\n'
      + '10   SALES                            active    Gi0/10, Gi0/11\n'
      + '20   ENG                              active    Gi0/20, Gi0/21\n'
      + '99   MGMT                             active';
  }
  return undefined;
},
    solution: ["show interfaces trunk", "enable", "configure terminal", "interface gi0/3", "switchport trunk encapsulation dot1q", "switchport mode trunk", "end", "show interfaces trunk"]
  },
  {
    id: "ts-l2-06", title: "Port-security sticky MAC err-disabled port", diff: "intermediate", topics: ["4.6"],
    scenario: "A user swapped laptops over the weekend and Monday morning has no link. SW1 port Gi0/10 shows err-disabled and the user swears nothing changed. Investigate the port-security state, clear the stale sticky MAC that is pinned to the port, then bounce the interface to recover it from err-disabled.",
    device: {"name": "SW1", "type": "switch", "hostname": "SW1", "vlans": {"10": {"name": "USERS"}}, "interfaces": {"GigabitEthernet0/10": {"up": false, "mode": "access", "accessVlan": 10, "description": "user-jdoe", "errDisabled": true, "psecEnabled": true, "psecMax": 1, "stickyMac": "aabb.cc00.1234", "lastViolationMac": "aabb.cc00.beef", "violationCount": 1}}, "routes": [], "custom": {"errReason": "psecure-violation"}},
    objectives: [
    { text: "Investigate why the port is down by reading its port-security state", hint: "Read the violation count and secure status. show port-security interface gi0/10", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+port-sec(urity)?\s+int(erface)?\s+(gi|gigabitethernet)\s*0\/10/i.test(c.cmd); }); } },
    { text: "Enter config and select the affected access port", hint: "configure terminal then interface gi0/10", check: function(d){ return d.currentInterface === 'GigabitEthernet0/10' || (d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Remove the stale sticky MAC that is pinned to the port", hint: "The old laptop's MAC is still locked in. no switchport port-security mac-address sticky aabb.cc00.1234", check: function(d){ var i=d.interfaces['GigabitEthernet0/10']; return i && !i.stickyMac; } },
    { text: "Bounce the interface to recover it from err-disabled", hint: "An err-disabled port stays down until you shut then no shut it. shutdown then no shutdown", check: function(d){ var i=d.interfaces['GigabitEthernet0/10']; return i && !i.errDisabled && i.up === true; } },
    { text: "Confirm the port is up and the violation is cleared", hint: "end then show port-security interface gi0/10", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/10']; var fixed=i && !i.errDisabled && i.up===true && !i.stickyMac; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+port-sec(urity)?\s+int(erface)?\s+(gi|gigabitethernet)\s*0\/10/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  var iface = dev.interfaces['GigabitEthernet0/10'];
  // FIX 1: remove the stale sticky MAC (explicit no-form or clear command)
  var rm = raw.match(/^no\s+switchport\s+port-security\s+mac-address\s+sticky\s+([0-9a-fA-F.]+)/i);
  if (rm && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/10') {
    if (iface && rm[1].toLowerCase() === String(iface.stickyMac).toLowerCase()) {
      iface.stickyMac = null;
      iface.violationCount = 0;
      dev.__fixTime = Date.now();
    }
    return '';
  }
  if (/^clear\s+port-security\s+sticky\s+interface\s+(gi|gigabitethernet)\s*0\/10/i.test(lower)) {
    if (iface) { iface.stickyMac = null; iface.violationCount = 0; dev.__fixTime = Date.now(); }
    return '';
  }
  // FIX 2: shutdown / no shutdown to recover from err-disabled
  if (/^shutdown$/i.test(lower) && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/10') {
    if (iface) { iface.up = false; iface.__shutSeen = true; dev.__fixTime = Date.now(); }
    return '';
  }
  if (/^no\s+shutdown$/i.test(lower) && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/10') {
    if (iface) {
      if (iface.__shutSeen && !iface.stickyMac) {
        iface.errDisabled = false;
        iface.up = true;
        dev.__fixTime = Date.now();
        return '%LINK-3-UPDOWN: Interface GigabitEthernet0/10, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/10, changed state to up';
      }
      dev.__fixTime = Date.now();
      return '';
    }
    return '';
  }
  // SHOW: port-security interface gi0/10 — symptom when broken, healed after fix
  if (/^(do\s+)?show\s+port-sec(urity)?\s+int(erface)?\s+(gi|gigabitethernet)\s*0\/10$/i.test(lower)) {
    var i = iface;
    var status = i && i.errDisabled ? 'Secure-shutdown' : 'Secure-up';
    var last = (i && i.lastViolationMac && i.errDisabled) ? (i.lastViolationMac + ':' + i.accessVlan) : '0000.0000.0000:0';
    var sticky = (i && i.stickyMac) ? 1 : 0;
    var vcount = (i && i.violationCount) ? i.violationCount : 0;
    return 'Port Security              : Enabled\n'
      + 'Port Status                : ' + status + '\n'
      + 'Violation Mode             : Shutdown\n'
      + 'Aging Time                 : 0 mins\n'
      + 'Aging Type                 : Absolute\n'
      + 'SecureStatic Address Aging : Disabled\n'
      + 'Maximum MAC Addresses      : 1\n'
      + 'Total MAC Addresses        : ' + sticky + '\n'
      + 'Configured MAC Addresses   : 0\n'
      + 'Sticky MAC Addresses       : ' + sticky + '\n'
      + 'Last Source Address:Vlan   : ' + last + '\n'
      + 'Security Violation Count   : ' + vcount;
  }
  // SHOW: interfaces status err-disabled — heals (no rows) after fix
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+status\s+err-disabled$/i.test(lower)) {
    var hdr = 'Port      Name               Status               Reason               Err-disabled Vlans\n';
    if (iface && iface.errDisabled) {
      return hdr + 'Gi0/10    user-jdoe          err-disabled         psecure-violation';
    }
    return hdr;
  }
  // SHOW: interfaces gi0/10 status — status string tracks state
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+(gi|gigabitethernet)\s*0\/10\s+status$/i.test(lower)) {
    var st = iface && iface.errDisabled ? 'err-disabled' : (iface && iface.up ? 'connected' : 'notconnect');
    return 'Port      Name               Status       Vlan       Duplex  Speed Type\n'
      + 'Gi0/10    user-jdoe          ' + st.padEnd(12) + ' 10         auto    auto 10/100/1000BaseTX';
  }
  return undefined;
},
    solution: ["show port-security interface gi0/10", "enable", "configure terminal", "interface gi0/10", "no switchport port-security mac-address sticky aabb.cc00.1234", "shutdown", "no shutdown", "end", "show port-security interface gi0/10"]
  },
  {
    id: "ts-l2-07", title: "Access port in wrong VLAN", diff: "intermediate", topics: ["2.1"],
    scenario: "A marketing intern on SW1 Gi0/11 pulls a DHCP address on the ENG subnet (192.168.20.x) instead of SALES. The patch panel label says VLAN 10 (SALES) and the cable test passes. Investigate which VLAN the port actually sits in, move Gi0/11 to the SALES VLAN, and confirm. The patch panel label is not the truth: the running config is.",
    device: {"name": "SW1", "type": "switch", "hostname": "SW1", "vlans": {"1": {"name": "default"}, "10": {"name": "SALES"}, "20": {"name": "ENG"}, "30": {"name": "GUEST"}, "99": {"name": "MGMT"}}, "interfaces": {"GigabitEthernet0/10": {"up": true, "mode": "access", "accessVlan": 10}, "GigabitEthernet0/11": {"up": true, "mode": "access", "accessVlan": 20, "description": "intern-marketing", "mac": "aabb.cc00.2222"}}, "custom": {"targetVlan": 10}},
    objectives: [
    { text: "Investigate which VLAN Gi0/11 actually sits in", hint: "show vlan brief — find which VLAN lists Gi0/11 in its Ports column", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+vlan/i.test(c.cmd); }); } },
    { text: "Confirm the port-to-VLAN binding from the running config", hint: "show running-config interface Gi0/11 — read the 'switchport access vlan' line", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+run(ning-config)?\s+int(erface)?\s+gi?(gabitethernet)?0\/11/i.test(c.cmd); }); } },
    { text: "Enter config and select Gi0/11", hint: "configure terminal → interface gi0/11", check: function(d){ return d.currentInterface === 'GigabitEthernet0/11' || (d.interfaces['GigabitEthernet0/11'] && d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Move Gi0/11 into the SALES VLAN", hint: "switchport access vlan 10", check: function(d){ var i = d.interfaces['GigabitEthernet0/11']; return i && String(i.accessVlan) === '10'; } },
    { text: "Confirm the fix — Gi0/11 now sits under the SALES VLAN", hint: "end → show vlan brief — Gi0/11 now appears under VLAN 10", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/11']; var fixed = i && String(i.accessVlan) === String(d.custom.targetVlan); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+vlan/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  var m = raw.match(/^switchport\s+access\s+vlan\s+(\d+)/i);
  if (m && dev.mode === 'config-if' && dev.currentInterface) {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    dev.interfaces[dev.currentInterface].mode = 'access';
    dev.interfaces[dev.currentInterface].accessVlan = parseInt(m[1], 10);
    dev.__fixTime = Date.now() - 1;
    return '';
  }
  var abbr = function (n) { return n.replace('GigabitEthernet', 'Gi').replace('FastEthernet', 'Fa'); };
  if (/^(do\s+)?show\s+vlan(\s+brief)?$/i.test(lower)) {
    var portsFor = function (vid) { return Object.keys(dev.interfaces).filter(function (n) { var i = dev.interfaces[n]; return i && i.mode === 'access' && String(i.accessVlan) === String(vid); }).map(abbr).join(', '); };
    var out = 'VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n';
    Object.keys(dev.vlans).forEach(function (vid) { out += vid.padEnd(5) + (dev.vlans[vid].name || '').padEnd(33) + 'active    ' + portsFor(vid) + '\n'; });
    return out;
  }
  if (/^(do\s+)?show\s+run(ning-config)?\s+int(erface)?\s+gi?(gabitethernet)?0\/11$/i.test(lower)) {
    var i = dev.interfaces['GigabitEthernet0/11'] || {};
    var av = i.accessVlan != null ? i.accessVlan : 1;
    return 'interface GigabitEthernet0/11\n description ' + (i.description || 'intern-marketing') + '\n switchport mode access\n switchport access vlan ' + av + '\n spanning-tree portfast\nend';
  }
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+gi?(gabitethernet)?0\/11\s+switchport$/i.test(lower)) {
    var s = dev.interfaces['GigabitEthernet0/11'] || {};
    var sv = s.accessVlan != null ? s.accessVlan : 1;
    var nm = (dev.vlans[String(sv)] && dev.vlans[String(sv)].name) || 'default';
    return 'Name: Gi0/11\nSwitchport: Enabled\nAdministrative Mode: static access\nOperational Mode: static access\nAdministrative Trunking Encapsulation: dot1q\nNegotiation of Trunking: Off\nAccess Mode VLAN: ' + sv + ' (' + nm + ')\nTrunking Native Mode VLAN: 1 (default)\nVoice VLAN: none';
  }
  if (/^(do\s+)?show\s+mac\s+address-table\s+int(erface)?\s+gi?(gabitethernet)?0\/11$/i.test(lower)) {
    var mi = dev.interfaces['GigabitEthernet0/11'] || {};
    var mv = mi.accessVlan != null ? mi.accessVlan : 1;
    var mac = mi.mac || 'aabb.cc00.2222';
    return '          Mac Address Table\n-------------------------------------------\n\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n  ' + String(mv).padEnd(4) + '  ' + mac + '    DYNAMIC     Gi0/11\nTotal Mac Addresses for this criterion: 1';
  }
  return undefined;
},
    solution: ["show vlan brief", "show running-config interface Gi0/11", "enable", "configure terminal", "interface gi0/11", "switchport access vlan 10", "end", "show vlan brief"]
  },
  {
    id: "ts-l2-08", title: "Orphan VLAN — access port never assigned", diff: "intermediate", topics: ["2.1"],
    scenario: "A GUEST WiFi controller is cabled into SW2 Gi0/14 for VLAN 30. The controller links up and the trunk allows VLAN 30 end-to-end, but no guest clients ever appear. VLAN 30 GUEST exists in the database yet has no member ports. Investigate where the WLC port actually lives, put it in the GUEST VLAN, and confirm VLAN 30 now owns the port.",
    device: {"name": "SW2", "type": "switch", "hostname": "SW2", "vlans": {"1": {"name": "default"}, "10": {"name": "SALES"}, "20": {"name": "ENG"}, "30": {"name": "GUEST"}, "99": {"name": "MGMT"}}, "interfaces": {"GigabitEthernet0/14": {"up": true, "mode": "access", "accessVlan": 1, "description": "guest-WLC", "portfast": true}}, "custom": {"intendedVlan": 30}},
    objectives: [
    { text: "Investigate — list the VLAN database and see which VLAN owns the WLC port", hint: "show vlan brief — VLAN 30 GUEST shows no ports, and the WLC port sits in VLAN 1", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+vlan/i.test(c.cmd); }); } },
    { text: "Enter config and select the WLC access port", hint: "configure terminal → interface gi0/14", check: function(d,log){ return d.currentInterface === 'GigabitEthernet0/14'; } },
    { text: "Assign the port to the GUEST VLAN", hint: "switchport access vlan 30", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/14']; return i && String(i.accessVlan) === '30'; } },
    { text: "Confirm the fix — VLAN 30 now lists the WLC port", hint: "end → show vlan brief — Gi0/14 now appears under VLAN 30 GUEST", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/14']; var fixed=i && String(i.accessVlan)==='30'; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+vlan/i.test(c.cmd) && c.time > (d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  var m = raw.match(/^switchport\s+access\s+vlan\s+(\d+)/i);
  if (m && dev.mode === 'config-if' && dev.currentInterface) {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    dev.interfaces[dev.currentInterface].mode = 'access';
    dev.interfaces[dev.currentInterface].accessVlan = parseInt(m[1], 10);
    dev.__fixTime = Date.now() - 1;
    return '';
  }
  var abbr = function (n) { return n.replace('GigabitEthernet', 'Gi').replace('FastEthernet', 'Fa'); };
  var portsFor = function (vid) {
    return Object.keys(dev.interfaces).filter(function (n) {
      var i = dev.interfaces[n];
      return i && i.mode === 'access' && String(i.accessVlan) === String(vid);
    }).map(abbr).join(', ');
  };
  if (/^(do\s+)?show\s+vlan(\s+brief)?$/i.test(lower)) {
    var out = 'VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n';
    Object.keys(dev.vlans).forEach(function (vid) {
      out += vid.padEnd(5) + (dev.vlans[vid].name || '').padEnd(33) + 'active    ' + portsFor(vid) + '\n';
    });
    out += '1002 fddi-default                     act/unsup';
    return out;
  }
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+gi0\/14\s+stat(us)?$/i.test(lower)) {
    var i14 = dev.interfaces['GigabitEthernet0/14'] || {};
    var v = String(i14.accessVlan || 1);
    return 'Port      Name               Status       Vlan       Duplex  Speed Type\n'
      + 'Gi0/14    guest-WLC          connected    ' + v.padEnd(10) + ' a-full a-1000 10/100/1000BaseTX';
  }
  if (/^(do\s+)?show\s+run(ning-config)?\s+int(erface)?\s+gi0\/14$/i.test(lower)) {
    var i14b = dev.interfaces['GigabitEthernet0/14'] || {};
    var vlanLine = (String(i14b.accessVlan || 1) !== '1') ? '\n switchport access vlan ' + i14b.accessVlan : '';
    return 'interface GigabitEthernet0/14\n description guest-WLC\n switchport mode access' + vlanLine + '\n spanning-tree portfast\nend';
  }
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+trunk$/i.test(lower)) {
    return 'Port        Mode             Encapsulation  Status        Native vlan\n'
      + 'Gi0/1       on               802.1q         trunking      99\n\n'
      + 'Port        Vlans allowed on trunk\n'
      + 'Gi0/1       1,10,20,30,99\n\n'
      + 'Port        Vlans in spanning tree forwarding state and not pruned\n'
      + 'Gi0/1       1,10,20,99';
  }
  return undefined;
},
    solution: ["show vlan brief", "show interfaces gi0/14 status", "enable", "configure terminal", "interface gi0/14", "switchport access vlan 30", "end", "show vlan brief"]
  },
  {
    id: "ts-l2-09", title: "EtherChannel mode mismatch (LACP vs PAgP)", diff: "advanced", topics: ["2.3"],
    scenario: "Po1 between SW1 and DSW1 is supposed to be a 2x1G LACP bundle, but after a maintenance window Po1 is down — even though both physical links (Gi1/0/23, Gi1/0/24) are up/up. You are on DSW1. Investigate the EtherChannel, find why the members will not bundle, fix DSW1 to match its peer, and confirm Po1 comes up.",
    device: {"name": "DSW1", "type": "switch", "hostname": "DSW1", "vlans": {"1": {"name": "default"}}, "interfaces": {"GigabitEthernet1/0/23": {"up": true, "mode": "trunk", "channelGroup": 1, "channelMode": "desirable"}, "GigabitEthernet1/0/24": {"up": true, "mode": "trunk", "channelGroup": 1, "channelMode": "desirable"}}, "custom": {"peerName": "SW1", "peerMode": "active", "peerProtocol": "LACP"}},
    objectives: [
    { text: "Investigate — view the EtherChannel summary and read the protocol on each side", hint: "Look at the bundle state and protocol: show etherchannel summary", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ether(channel)?\s+sum(mary)?$/i.test(c.cmd); }); } },
    { text: "Investigate — confirm which negotiation protocol the local member ports are running", hint: "PAgP keyword is 'desirable', LACP keyword is 'active': show running-config interface Gi1/0/23", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+run(ning-config)?\s+int(erface)?\s+gi?1\/0\/23$/i.test(c.cmd); }); } },
    { text: "Enter config and select both member ports", hint: "configure terminal → interface range gi1/0/23-24 (or one interface at a time)", check: function(d,log){ var members=['GigabitEthernet1/0/23','GigabitEthernet1/0/24']; var inRange=d.currentInterfaceRange && members.some(function(m){ return d.currentInterfaceRange.indexOf(m)>=0; }); var onMember=members.indexOf(d.currentInterface)>=0; return (d.mode==='config-if') && (inRange || onMember); } },
    { text: "Set DSW1's channel mode so its protocol matches the peer", hint: "Peer is LACP. Remove PAgP and use LACP: no channel-group 1 mode desirable / channel-group 1 mode active", check: function(d){ var a=d.interfaces['GigabitEthernet1/0/23'], b=d.interfaces['GigabitEthernet1/0/24']; return a&&b&&String(a.channelMode)==='active'&&String(b.channelMode)==='active'; } },
    { text: "Confirm — Po1 now bundles (P) and the protocol matches on both sides", hint: "end → show etherchannel summary — members should show (P) bundled, not (I)", check: function(d,log){ var a=d.interfaces['GigabitEthernet1/0/23'], b=d.interfaces['GigabitEthernet1/0/24']; var fixed=a&&b&&String(a.channelMode)==='active'&&String(b.channelMode)==='active'; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ether(channel)?\s+sum(mary)?$/i.test(c.cmd) && c.time>(d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  var setMode=function(ifn,mode){ if(!dev.interfaces[ifn]) dev.interfaces[ifn]={up:true,mode:'trunk',channelGroup:1}; dev.interfaces[ifn].channelMode=mode; dev.interfaces[ifn].channelGroup=1; };
  var rangeMembers=function(){
    if(dev.currentInterfaceRange && dev.currentInterfaceRange.length) return dev.currentInterfaceRange;
    if(dev.currentInterface) return [dev.currentInterface];
    return [];
  };
  // remove PAgP: no channel-group 1 mode desirable
  var noM=raw.match(/^no\s+channel-group\s+(\d+)\s+mode\s+(\w+)/i);
  if(noM && dev.mode==='config-if'){
    rangeMembers().forEach(function(n){ if(dev.interfaces[n]){ dev.interfaces[n].channelMode=undefined; } });
    return '';
  }
  // set channel mode: channel-group 1 mode active|desirable|auto|passive|on
  var m=raw.match(/^channel-group\s+(\d+)\s+mode\s+(active|desirable|auto|passive|on)/i);
  if(m && dev.mode==='config-if'){
    var mode=m[2].toLowerCase(); var grp=parseInt(m[1],10);
    var members=rangeMembers();
    members.forEach(function(n){ setMode(n,mode); dev.interfaces[n].channelGroup=grp; });
    var a=dev.interfaces['GigabitEthernet1/0/23'], b=dev.interfaces['GigabitEthernet1/0/24'];
    if(a&&b&&String(a.channelMode)==='active'&&String(b.channelMode)==='active'){ dev.__fixTime=Date.now(); }
    return '';
  }
  // protocol derived from local channel mode
  var localProto=function(){
    var a=dev.interfaces['GigabitEthernet1/0/23'];
    var cm=a?a.channelMode:undefined;
    if(cm==='active'||cm==='passive') return 'LACP';
    if(cm==='desirable'||cm==='auto') return 'PAgP';
    if(cm==='on') return '-';
    return '-';
  };
  var bundled=function(){
    var a=dev.interfaces['GigabitEthernet1/0/23'], b=dev.interfaces['GigabitEthernet1/0/24'];
    return a&&b&&localProto()===dev.custom.peerProtocol;
  };
  // show etherchannel summary
  if(/^(do\s+)?show\s+ether(channel)?\s+sum(mary)?$/i.test(lower)){
    var up=bundled();
    var poFlags=up?'(SU)':'(SD)';
    var memFlag=up?'(P)':'(I)';
    var proto=localProto();
    var out='Flags:  D - down        P - bundled in port-channel\n'
      +'        I - stand-alone s - suspended\n'
      +'        H - Hot-standby (LACP only)\n'
      +'        R - Layer3      S - Layer2\n'
      +'        U - in use      f - failed to allocate aggregator\n'
      +'        M - not in use, minimum links not met\n'
      +'        u - unsuitable for bundling\n'
      +'        w - waiting to be aggregated\n'
      +'        d - default port\n\n'
      +'Number of channel-groups in use: 1\n'
      +'Number of aggregators:           1\n\n'
      +'Group  Port-channel  Protocol    Ports\n'
      +'------+-------------+-----------+-----------------------------------------------\n'
      +'1      Po1'+poFlags+'        '+(proto+'      ').slice(0,6)+'    Gi1/0/23'+memFlag+'  Gi1/0/24'+memFlag;
    if(!up){
      out+='\n\n! Peer '+dev.custom.peerName+' shows Protocol '+dev.custom.peerProtocol+' on this group — protocols do not match, so neither side bundles.';
    }
    return out;
  }
  // show running-config interface Gi1/0/23 (or 24)
  var rc=lower.match(/^(do\s+)?show\s+run(ning-config)?\s+int(erface)?\s+gi?1\/0\/(23|24)$/i);
  if(rc){
    var num=rc[4];
    var ifn='GigabitEthernet1/0/'+num;
    var i=dev.interfaces[ifn];
    var cm=i?i.channelMode:undefined;
    var cgLine=cm?(' channel-group 1 mode '+cm+'\n'):'';
    return 'interface GigabitEthernet1/0/'+num+'\n'
      +' description po1-member-to-'+dev.custom.peerName+'\n'
      +' switchport trunk encapsulation dot1q\n'
      +' switchport mode trunk\n'
      +cgLine
      +'end';
  }
  // peer evidence: show running-config interface Gi0/23 (SW1 side)
  if(/^(do\s+)?show\s+run(ning-config)?\s+int(erface)?\s+gi?0\/(23|24)$/i.test(lower)){
    var pn=lower.match(/gi?0\/(23|24)$/i)[1];
    return 'interface GigabitEthernet0/'+pn+'\n'
      +' description po1-member-to-'+dev.custom.peerName.replace('SW1','DSW1')+'\n'
      +' switchport trunk encapsulation dot1q\n'
      +' switchport mode trunk\n'
      +' channel-group 1 mode active\n'
      +'end  ! (peer '+dev.custom.peerName+' — LACP)';
  }
  // show logging | inc EC-5
  if(/^(do\s+)?show\s+logging(\s*\|\s*(inc|include)\s+ec-?5)?$/i.test(lower) || /ec-?5/i.test(lower)){
    if(bundled()) return 'May 30 11:09:02.118: %EC-5-BUNDLE: Interface Gi1/0/23 joined port-channel Po1\nMay 30 11:09:02.121: %EC-5-BUNDLE: Interface Gi1/0/24 joined port-channel Po1';
    return 'May 30 11:02:14.221: %EC-5-CANNOT_BUNDLE2: Gi1/0/23 is not compatible with Po1 and will be suspended (flag mismatch).\nMay 30 11:02:14.225: %EC-5-CANNOT_BUNDLE2: Gi1/0/24 is not compatible with Po1 and will be suspended (flag mismatch).';
  }
  return undefined;
},
    solution: ["show etherchannel summary", "show running-config interface Gi1/0/23", "enable", "configure terminal", "interface range gi1/0/23-24", "no channel-group 1 mode desirable", "channel-group 1 mode active", "end", "show etherchannel summary"]
  },
  {
    id: "ts-l2-10", title: "MAC flapping — Layer 2 loop on PortFast edge ports", diff: "advanced", topics: ["2.5"],
    scenario: "Intermittent reachability across the floor. SW1's console keeps printing %SW_MATM-4-MACFLAP_NOTIF messages and CPU is pegged near 80%. Hosts in VLAN 10 are flapping between Gi0/5 and Gi0/6 — both are PortFast access ports with no BPDU Guard. Someone has cross-connected an unmanaged closet SWITCH into both ports, and that rogue switch is sending BPDUs into SW1's edge ports, forming a Layer 2 loop that the PortFast edge config never blocks. You cannot pull the rogue switch from here, but you can stop the loop at SW1: investigate the flap, confirm the ports are unprotected PortFast edge, then arm BPDU Guard on both access ports so the port that receives the rogue BPDU is err-disabled. Confirm the flapping stops.",
    device: {"name": "SW1", "type": "switch", "hostname": "SW1", "vlans": {"10": {"name": "USERS"}}, "interfaces": {"GigabitEthernet0/5": {"up": true, "mode": "access", "accessVlan": 10, "portfast": true, "bpduguard": false}, "GigabitEthernet0/6": {"up": true, "mode": "access", "accessVlan": 10, "portfast": true, "bpduguard": false}}, "custom": {"loopPresent": true, "rogueBpduPort": "GigabitEthernet0/6"}},
    objectives: [
    { text: "Investigate — surface the MAC flap evidence in the logs", hint: "show logging | inc MACFLAP — see which two ports the host MACs bounce between", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+logg(ing)?/i.test(c.cmd); }); } },
    { text: "Confirm both flapping ports are PortFast edge with no loop protection", hint: "show spanning-tree vlan 10 — Gi0/5 and Gi0/6 show as P2p Edge, so STP treats them as edge and never blocks the rogue BPDU", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+span(ning)?(-tree)?\s+vlan\s+10/i.test(c.cmd); }); } },
    { text: "Enter config and arm BPDU Guard on both access ports", hint: "configure terminal → interface gi0/5 → spanning-tree bpduguard enable → interface gi0/6 → spanning-tree bpduguard enable", check: function(d){ var a=d.interfaces['GigabitEthernet0/5']; var b=d.interfaces['GigabitEthernet0/6']; return !!(a&&b&&a.bpduguard===true&&b.bpduguard===true); } },
    { text: "Confirm the flapping has stopped after the fix", hint: "end → show logging | inc MACFLAP — with BPDU Guard armed the port receiving the rogue BPDU is err-disabled and the flap clears", check: function(d,log){ var a=d.interfaces['GigabitEthernet0/5']; var b=d.interfaces['GigabitEthernet0/6']; var fixed=!!(a&&b&&a.bpduguard===true&&b.bpduguard===true) && d.custom && d.custom.loopPresent===false; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+logg(ing)?/i.test(c.cmd) && c.time>=(d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  var abbr=function(n){return n.replace('GigabitEthernet','Gi').replace('FastEthernet','Fa');};
  var bg=raw.match(/^spanning-tree\s+bpduguard\s+enable$/i);
  if(bg && dev.mode==='config-if' && dev.currentInterface){
    if(!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface]={};
    dev.interfaces[dev.currentInterface].bpduguard=true;
    dev.__fixTime=Date.now();
    // BPDU Guard only err-disables a port that ACTUALLY receives a BPDU.
    // The rogue switch feeds the loop through Gi0/6, so the loop only breaks
    // once Gi0/6 is guarded. Guarding the other port alone leaves the loop up.
    var rogue=(dev.custom&&dev.custom.rogueBpduPort)||'GigabitEthernet0/6';
    var rg=dev.interfaces[rogue];
    if(rg && rg.bpduguard===true && dev.custom.loopPresent){
      dev.custom.loopPresent=false;
      rg.up=false;
      rg.errdisable=true;
      return '%SPANTREE-2-BLOCK_BPDUGUARD: Received BPDU on port '+rogue+' with BPDU Guard enabled. Disabling port.\n%PM-4-ERR_DISABLE: bpduguard error detected on '+abbr(rogue)+', putting '+abbr(rogue)+' in err-disable state\n%LINK-3-UPDOWN: Interface '+rogue+', changed state to down';
    }
    return '';
  }
  if(/^(do\s+)?show\s+logg(ing)?(\s+\|\s+(inc|include)\s+\S+)?$/i.test(lower)){
    if(dev.custom.loopPresent){
      return 'Jun 01 14:22:01.110: %SW_MATM-4-MACFLAP_NOTIF: Host aabb.cc00.dead in vlan 10 is flapping between port Gi0/5 and port Gi0/6\n'
        + 'Jun 01 14:22:04.118: %SW_MATM-4-MACFLAP_NOTIF: Host aabb.cc00.dead in vlan 10 is flapping between port Gi0/5 and port Gi0/6\n'
        + 'Jun 01 14:22:07.121: %SW_MATM-4-MACFLAP_NOTIF: Host aabb.cc00.beef in vlan 10 is flapping between port Gi0/5 and port Gi0/6';
    }
    var rogue2=(dev.custom&&dev.custom.rogueBpduPort)||'GigabitEthernet0/6';
    return 'Jun 01 14:25:33.402: %SPANTREE-2-BLOCK_BPDUGUARD: Received BPDU on port '+rogue2+' with BPDU Guard enabled. Disabling port.\n'
      + 'Jun 01 14:25:33.410: %PM-4-ERR_DISABLE: bpduguard error detected on '+abbr(rogue2)+', putting '+abbr(rogue2)+' in err-disable state\n'
      + 'Jun 01 14:25:33.418: %LINK-3-UPDOWN: Interface '+rogue2+', changed state to down\n'
      + '(no further MACFLAP notifications — loop broken)';
  }
  if(/^(do\s+)?show\s+mac.*\|\s*(inc|include)\s+gi?\s*0\/(5|6)/i.test(lower)){
    var pnum=lower.indexOf('0/6')>-1?'6':'5';
    if(dev.custom.loopPresent){
      // Same host MACs learned on BOTH ports = the canonical MAC-flap signature.
      return '  10    aabb.cc00.dead    DYNAMIC     Gi0/'+pnum+'\n'
        + '  10    aabb.cc00.beef    DYNAMIC     Gi0/'+pnum+'\n'
        + '  10    aabb.cc00.0a12    DYNAMIC     Gi0/'+pnum;
    }
    if(pnum==='6'){
      return '(Gi0/6 is err-disabled and down — no MAC entries learned on this port)';
    }
    return '  10    aabb.cc00.dead    DYNAMIC     Gi0/5\n'
      + '  10    aabb.cc00.beef    DYNAMIC     Gi0/5\n'
      + '  10    aabb.cc00.0a12    DYNAMIC     Gi0/5';
  }
  if(/^(do\s+)?show\s+int(erface)?(s)?\s+gi?\s*0\/(5|6)\s+count(ers)?$/i.test(lower)){
    var cp=lower.indexOf('0/6')>-1?'6':'5';
    if(dev.custom.loopPresent){
      // Abnormally high mcast/bcast counters = frames looping back into the switch.
      return 'Port            InOctets    InUcastPkts    InMcastPkts    InBcastPkts\n'
        + 'Gi0/'+cp+'         812441250         122441        4422180         998120\n\n'
        + 'Port           OutOctets   OutUcastPkts   OutMcastPkts   OutBcastPkts\n'
        + 'Gi0/'+cp+'         845112301         118220        4581992        1011223';
    }
    return 'Port            InOctets    InUcastPkts    InMcastPkts    InBcastPkts\n'
      + 'Gi0/'+cp+'         812512440         122512           1204            812\n\n'
      + 'Port           OutOctets   OutUcastPkts   OutMcastPkts   OutBcastPkts\n'
      + 'Gi0/'+cp+'         845190021         118291           1301            905';
  }
  if(/^(do\s+)?show\s+proc(esses)?\s+cpu(\s+sort(ed)?)?$/i.test(lower)){
    if(dev.custom.loopPresent){
      return 'CPU utilization for five seconds: 80%/12%; one minute: 78%; five minutes: 74%\n'
        + ' PID Runtime(ms)   Invoked  uSecs   5Sec   1Min   5Min TTY Process\n'
        + '  72    4412180   2210114    199 41.20% 39.88% 37.10%   0 Cat4k Mgmt LoPri\n'
        + ' 118    2201441    998120    220 22.60% 21.40% 20.05%   0 Spanning Tree\n'
        + '  88    1102230    441200    250  9.80%  9.10%  8.40%   0 IP Input';
    }
    return 'CPU utilization for five seconds: 6%/1%; one minute: 7%; five minutes: 8%\n'
      + ' PID Runtime(ms)   Invoked  uSecs   5Sec   1Min   5Min TTY Process\n'
      + '  88    1102230    441200    250  2.10%  2.40%  2.30%   0 IP Input\n'
      + ' 118    2201441    998120    220  1.40%  1.20%  1.10%   0 Spanning Tree';
  }
  if(/^(do\s+)?show\s+span(ning)?(-tree)?\s+vlan\s+10$/i.test(lower)){
    var i5=dev.interfaces['GigabitEthernet0/5'];
    var i6=dev.interfaces['GigabitEthernet0/6'];
    // Real IOS removes an err-disabled/down port from show spanning-tree entirely.
    var row=function(name,intf){
      if(intf && intf.errdisable) return null;
      return abbr(name).padEnd(20)+'Desg FWD 4         128.'+(name.indexOf('/6')>-1?'6':'5')+'    P2p Edge';
    };
    var lines=[];
    var r5=row('GigabitEthernet0/5',i5); if(r5!==null) lines.push(r5);
    var r6=row('GigabitEthernet0/6',i6); if(r6!==null) lines.push(r6);
    return 'VLAN0010\n'
      + '  Spanning tree enabled protocol ieee\n'
      + '  Root ID    Priority    32778\n'
      + '             Address     aabb.cc00.0b01\n'
      + '             This bridge is the root\n\n'
      + '  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)\n'
      + '             Address     aabb.cc00.0b01\n'
      + '             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec\n'
      + '             Aging Time  300 sec\n\n'
      + 'Interface           Role Sts Cost      Prio.Nbr Type\n'
      + '------------------- ---- --- --------- -------- --------------------------------\n'
      + lines.join('\n');
  }
  return undefined;
},
    solution: ["show logging | inc MACFLAP", "show spanning-tree vlan 10", "enable", "configure terminal", "interface gi0/5", "spanning-tree bpduguard enable", "interface gi0/6", "spanning-tree bpduguard enable", "end", "show logging | inc MACFLAP"]
  },
  {
    id: "ts-l3-01", title: "OSPF neighbor stuck in EXSTART (MTU mismatch)", diff: "intermediate", topics: ["3.4"],
    scenario: "R1 and R2 are OSPF neighbors over Gi0/0. The adjacency climbs to EXSTART and never reaches FULL, so routes are missing on both sides. NOC noticed it after a switch port-channel was rebuilt last night. Investigate R1, find why the DBD exchange is failing, fix R1's interface so it matches the peer, and confirm the neighbor reaches FULL.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.12.1", "mask": "255.255.255.0", "mtu": 1500}}, "custom": {"peerId": "2.2.2.2", "peerAddr": "10.0.12.2", "peerMtu": 9216}},
    objectives: [
    { text: "Investigate the OSPF adjacency state with the neighbor", hint: "see the stuck state and which interface — show ip ospf neighbor", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+nei/i.test(c.cmd); }); } },
    { text: "Read the interface MTU on the link to the neighbor", hint: "compare the local MTU against the peer — show interfaces gi0/0", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/0/i.test(c.cmd); }); } },
    { text: "Select the link interface and set its MTU to match the peer", hint: "interface gi0/0 → mtu 9216 (match R2's interface MTU)", check: function(d){ var i=d.interfaces['GigabitEthernet0/0']; return i && String(i.mtu)===String(d.custom.peerMtu); } },
    { text: "Confirm the neighbor now reaches FULL", hint: "end → show ip ospf neighbor — state should read FULL once MTUs match", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/0']; var fixed=i && String(i.mtu)===String(d.custom.peerMtu); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+nei/i.test(c.cmd) && c.time>(d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){ var padState=function(s){ s=String(s); while(s.length<16){ s+=' '; } return s; }; var m=raw.match(/^mtu\s+(\d+)/i); if(m && dev.mode==='config-if' && dev.currentInterface){ if(!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface]={}; dev.interfaces[dev.currentInterface].mtu=parseInt(m[1],10); dev.__fixTime=Date.now(); return ''; } if(/^(do\s+)?show\s+ip\s+ospf\s+nei(ghbor)?$/i.test(lower)){ var i=dev.interfaces['GigabitEthernet0/0']; var match=i && String(i.mtu)===String(dev.custom.peerMtu); var state=match?'FULL/DR':'EXSTART/DR'; return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n'+dev.custom.peerId+'           1   '+padState(state)+'00:00:34    '+dev.custom.peerAddr+'       GigabitEthernet0/0'; } if(/^(do\s+)?show\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/0$/i.test(lower)){ var i=dev.interfaces['GigabitEthernet0/0']; var mtu=i?i.mtu:1500; return 'GigabitEthernet0/0 is up, line protocol is up\n  Hardware is iGbE, address is 0050.7966.6800 (bia 0050.7966.6800)\n  Internet address is 10.0.12.1/24\n  MTU '+mtu+' bytes, BW 1000000 Kbit/sec, DLY 10 usec,\n     reliability 255/255, txload 1/255, rxload 1/255\n  Encapsulation ARPA, loopback not set\n  Keepalive set (10 sec)\n  Full Duplex, 1Gbps, link type is auto, media type is RJ45'; } if(/^(do\s+)?debug\s+ip\s+ospf\s+adj/i.test(lower)){ var i=dev.interfaces['GigabitEthernet0/0']; var match=i && String(i.mtu)===String(dev.custom.peerMtu); if(match){ return 'OSPF: Rcv DBD from '+dev.custom.peerId+' on GigabitEthernet0/0 seq 0x1F23 opt 0x52 flag 0x7 len 32  mtu '+dev.custom.peerMtu+' state EXSTART\nOSPF: NBR Negotiation Done. We are the SLAVE\nOSPF: Nbr '+dev.custom.peerId+' on GigabitEthernet0/0 LOADING to FULL, Loading Done'; } return 'OSPF: Rcv DBD from '+dev.custom.peerId+' on GigabitEthernet0/0 seq 0x1F23 opt 0x52 flag 0x7 len 32  mtu '+dev.custom.peerMtu+' state EXSTART\nOSPF: Nbr '+dev.custom.peerId+' has larger interface MTU\nOSPF: Retransmitting DBD to '+dev.custom.peerId+' on GigabitEthernet0/0 (1)\nOSPF: Retransmitting DBD to '+dev.custom.peerId+' on GigabitEthernet0/0 (2)\nOSPF: Nbr '+dev.custom.peerId+' on GigabitEthernet0/0 retransmits 7 — neighbor down'; } if(/^(do\s+)?show\s+log(ging)?(\s+\|\s+include\s+ospf)?$/i.test(lower)){ var i=dev.interfaces['GigabitEthernet0/0']; var match=i && String(i.mtu)===String(dev.custom.peerMtu); var fail='%OSPF-5-ADJCHG: Process 1, Nbr '+dev.custom.peerId+' on GigabitEthernet0/0 from EXSTART to DOWN, Neighbor Down: Too many retransmissions'; if(match){ return fail+'\n%OSPF-5-ADJCHG: Process 1, Nbr '+dev.custom.peerId+' on GigabitEthernet0/0 from LOADING to FULL, Loading Done'; } return fail; } return undefined; },
    solution: ["show ip ospf neighbor", "show interfaces gi0/0", "enable", "configure terminal", "interface gi0/0", "mtu 9216", "end", "show ip ospf neighbor"]
  },
  {
    id: "ts-l3-02", title: "OSPF area mismatch — no neighbor forms", diff: "beginner", topics: ["3.4"],
    scenario: "R2 and R1 share subnet 10.0.12.0/24 on Gi0/0, but no OSPF neighbor ever forms. Both OSPF processes run and the interface is up. R1 logs %OSPF-4-ERRRCV mismatched area ID from 10.0.12.2 — R2 is advertising the wrong area. Investigate R2's OSPF config, move its Gi0/0 network into the backbone (area 0), and confirm the adjacency comes up.",
    device: {"name": "R2", "type": "router", "hostname": "R2", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.12.2", "mask": "255.255.255.0"}}, "custom": {"ospfPid": 1, "routerId": "2.2.2.2", "ospfNet": "10.0.12.0", "ospfWild": "0.0.0.255", "ospfArea": 1, "peerArea": 0, "peerRid": "1.1.1.1", "peerAddr": "10.0.12.1"}},
    objectives: [
    { text: "Investigate — inspect which OSPF area R2 is advertising on its Gi0/0 network", hint: "show ip ospf interface gi0/0 — read the Area field (or: show running-config | section router ospf)", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+(int(erface)?|.*sec.*router\s+ospf)/i.test(c.cmd)||/^(do\s+)?sh(ow)?\s+run.*router\s+ospf/i.test(c.cmd);});} },
    { text: "Confirm no neighbor has formed", hint: "show ip ospf neighbor — neighbor list is empty while the area is wrong", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+nei/i.test(c.cmd);});} },
    { text: "Enter the OSPF process and put the Gi0/0 network into the backbone area", hint: "configure terminal → router ospf 1 → no network 10.0.12.0 0.0.0.255 area 1 → network 10.0.12.0 0.0.0.255 area 0", check: function(d){return d.custom.oldNetRemoved===true&&String(d.custom.ospfArea)==='0';} },
    { text: "Confirm the fix — the adjacency reaches FULL with R1", hint: "end → show ip ospf neighbor — 1.1.1.1 should now show FULL", check: function(d,log){return String(d.custom.ospfArea)===String(d.custom.peerArea)&&log.some(function(c){return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+nei/i.test(c.cmd)&&c.time>(d.__fixTime||0);});} }
    ],
    extraCmds: function(dev,raw,lower){
  var c=dev.custom;
  var fmtNbr=function(){
    if(String(c.ospfArea)!==String(c.peerArea)){
      return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n(no neighbors)';
    }
    return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n'+c.peerRid+'         1   FULL/DR         00:00:38    '+c.peerAddr+'      GigabitEthernet0/0';
  };
  // FIX parsing: no network ... area X  then  network ... area Y  (in router ospf config)
  var rem=raw.match(/^no\s+network\s+(\S+)\s+(\S+)\s+area\s+(\d+)/i);
  if(rem&&(dev.mode==='config'||dev.mode==='config-router')){
    if(rem[1]===c.ospfNet&&rem[2]===c.ospfWild&&String(parseInt(rem[3],10))===String(c.ospfArea)){ c.oldNetRemoved=true; }
    return '';
  }
  var add=raw.match(/^network\s+(\S+)\s+(\S+)\s+area\s+(\d+)/i);
  if(add&&(dev.mode==='config'||dev.mode==='config-router')){
    c.ospfNet=add[1]; c.ospfWild=add[2]; c.ospfArea=parseInt(add[3],10);
    dev.__fixTime=Date.now();
    if(String(c.ospfArea)===String(c.peerArea)){
      return '%OSPF-5-ADJCHG: Process '+c.ospfPid+', Nbr '+c.peerRid+' on GigabitEthernet0/0 from LOADING to FULL, Loading Done';
    }
    return '';
  }
  // SHOW: ip ospf neighbor
  if(/^(do\s+)?show\s+ip\s+ospf\s+nei(ghbor)?$/i.test(lower)){
    return fmtNbr();
  }
  // SHOW: ip ospf interface gi0/0  (Area field heals)
  if(/^(do\s+)?show\s+ip\s+ospf\s+int(erface)?\s+gi(gabitethernet)?0\/0$/i.test(lower)){
    return 'GigabitEthernet0/0 is up, line protocol is up\n'
      +'  Internet Address 10.0.12.2/24, Area '+c.ospfArea+', Attached via Network Statement\n'
      +'  Process ID '+c.ospfPid+', Router ID '+c.routerId+', Network Type BROADCAST, Cost: 1\n'
      +'  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n'
      +'    Hello due in 00:00:03\n'
      +'  Neighbor Count is '+(String(c.ospfArea)===String(c.peerArea)?'1':'0')
      +', Adjacent neighbor count is '+(String(c.ospfArea)===String(c.peerArea)?'1':'0');
  }
  // SHOW: running-config | section router ospf
  if(/^(do\s+)?show\s+run(ning-config)?\s*\|\s*sec(tion)?\s+router\s+ospf$/i.test(lower)){
    return 'router ospf '+c.ospfPid+'\n router-id '+c.routerId+'\n network '+c.ospfNet+' '+c.ospfWild+' area '+c.ospfArea;
  }
  // SHOW: log | include OSPF  (R1's syslog evidence, clears after fix)
  if(/^(do\s+)?show\s+log(ging)?\s*\|\s*inc(lude)?\s+ospf$/i.test(lower)){
    if(String(c.ospfArea)!==String(c.peerArea)){
      return '%OSPF-4-ERRRCV: Received invalid packet: mismatched area ID, from backbone area must be virtual-link but not found from '+dev.interfaces['GigabitEthernet0/0'].ip+', GigabitEthernet0/0';
    }
    return '%OSPF-5-ADJCHG: Process '+c.ospfPid+', Nbr '+c.peerRid+' on GigabitEthernet0/0 from LOADING to FULL, Loading Done';
  }
  return undefined;
},
    solution: ["show ip ospf interface gi0/0", "show ip ospf neighbor", "enable", "configure terminal", "router ospf 1", "no network 10.0.12.0 0.0.0.255 area 1", "network 10.0.12.0 0.0.0.255 area 0", "end", "show ip ospf neighbor"]
  },
  {
    id: "ts-l3-03", title: "OSPF hello/dead timer mismatch", diff: "intermediate", topics: ["3.4"],
    scenario: "R3 will not form an OSPF neighbor with R1 over Gi0/1. Both routers are in area 0, the interfaces are up, and the subnet matches (10.0.13.0/24), yet R1 logs %OSPF-4-ERRRCV mismatched hello parameters constantly. Investigate R3's OSPF interface timers, bring them in line with R1 (Hello 10 / Dead 40), and confirm the adjacency forms.",
    device: {"name": "R3", "type": "router", "hostname": "R3", "interfaces": {"GigabitEthernet0/1": {"up": true, "ip": "10.0.13.3", "mode": "routed", "helloInterval": 5, "deadInterval": 30}}, "routes": [], "custom": {"peerName": "R1", "peerIp": "10.0.13.1", "peerHello": 10, "peerDead": 40, "area": 0}},
    objectives: [
    { text: "Investigate the OSPF timers configured on the link to R1", hint: "OSPF prints Hello and Dead values per interface — show ip ospf interface gi0/1", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+int(erface)?(\s+gi?0\/1)?/i.test(c.cmd); }); } },
    { text: "Enter config and select the interface facing R1", hint: "configure terminal then interface gi0/1", check: function(d,log){ return d.currentInterface === 'GigabitEthernet0/1' || (d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Set the hello interval to match the peer", hint: "ip ospf hello-interval 10", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/1']; return i && String(i.helloInterval) === '10'; } },
    { text: "Set the dead interval to match the peer", hint: "ip ospf dead-interval 40", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/1']; return i && String(i.deadInterval) === '40'; } },
    { text: "Confirm the timers now match the peer and the adjacency forms", hint: "end then show ip ospf neighbor — R1 should appear in FULL", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/1']; var fixed = i && String(i.helloInterval) === String(d.custom.peerHello) && String(i.deadInterval) === String(d.custom.peerDead); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+(neigh(bor)?|int)/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  var i = dev.interfaces['GigabitEthernet0/1'];
  var hm = raw.match(/^ip\s+ospf\s+hello-interval\s+(\d+)/i);
  if (hm && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/1') {
    i.helloInterval = parseInt(hm[1], 10);
    dev.__fixTime = Date.now();
    return '';
  }
  var dm = raw.match(/^ip\s+ospf\s+dead-interval\s+(\d+)/i);
  if (dm && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/1') {
    i.deadInterval = parseInt(dm[1], 10);
    dev.__fixTime = Date.now();
    return '';
  }
  var matched = String(i.helloInterval) === String(dev.custom.peerHello) && String(i.deadInterval) === String(dev.custom.peerDead);
  if (/^(do\s+)?show\s+ip\s+ospf\s+int(erface)?(\s+gi?0\/1)?(\s*\|.*)?$/i.test(lower)) {
    return 'GigabitEthernet0/1 is up, line protocol is up\n'
      + '  Internet Address ' + i.ip + '/24, Area ' + dev.custom.area + ', Attached via Network Statement\n'
      + '  Process ID 1, Router ID 3.3.3.3, Network Type BROADCAST, Cost: 1\n'
      + '  Timer intervals configured, Hello ' + i.helloInterval + ', Dead ' + i.deadInterval + ', Wait ' + i.deadInterval + ', Retransmit 5\n'
      + '    Hello due in 00:00:0' + (i.helloInterval > 5 ? '4' : '2') + '\n'
      + '  Neighbor Count is ' + (matched ? '1' : '0') + ', Adjacent neighbor count is ' + (matched ? '1' : '0');
  }
  if (/^(do\s+)?show\s+ip\s+ospf\s+neigh(bor)?$/i.test(lower)) {
    if (matched) {
      return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n'
        + '1.1.1.1           1   FULL/DR         00:00:3' + (i.deadInterval - 1).toString().slice(-1) + '    ' + dev.custom.peerIp + '      GigabitEthernet0/1';
    }
    return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n(no neighbors)';
  }
  if (/^(do\s+)?show\s+log(ging)?(\s*\|.*)?$/i.test(lower)) {
    if (matched) return '%OSPF-5-ADJCHG: Process 1, Nbr 1.1.1.1 on GigabitEthernet0/1 from LOADING to FULL, Loading Done';
    var line = '%OSPF-4-ERRRCV: Received invalid packet: mismatched hello parameters from ' + dev.custom.peerIp + ', GigabitEthernet0/1';
    return line + '\n' + line + '\n' + line;
  }
  if (/^(do\s+)?debug\s+ip\s+ospf\s+hello$/i.test(lower)) {
    if (matched) return 'OSPF-1 HELLO Gi0/1: Rcv hello from 1.1.1.1 area ' + dev.custom.area + ' from ' + dev.custom.peerIp + '\nOSPF-1 HELLO Gi0/1: 2 Way Communication to 1.1.1.1, state 2WAY';
    return 'OSPF-1 HELLO Gi0/1: Rcv hello from 1.1.1.1 area ' + dev.custom.area + ' from ' + dev.custom.peerIp + '\n'
      + 'OSPF-1 HELLO Gi0/1: Mismatched hello parameters from ' + dev.custom.peerIp + '\n'
      + 'OSPF-1 HELLO Gi0/1: Dead R ' + dev.custom.peerDead + ' C ' + i.deadInterval + ', Hello R ' + dev.custom.peerHello + ' C ' + i.helloInterval + '  Mask R 255.255.255.0 C 255.255.255.0';
  }
  return undefined;
},
    solution: ["show ip ospf interface gi0/1", "enable", "configure terminal", "interface gi0/1", "ip ospf hello-interval 10", "ip ospf dead-interval 40", "end", "show ip ospf neighbor"]
  },
  {
    id: "ts-l3-04", title: "OSPF MD5 authentication key mismatch", diff: "advanced", topics: ["3.4"],
    scenario: "After OSPF authentication was enabled on R1 Gi0/0, the adjacency to R2 (10.0.12.2) dropped and won't re-form. Subnet, area, and timers all match. R1's interface has message-digest authentication on, but the MD5 key was fat-fingered. Investigate the logs, find the wrong key, set the correct one (CISCO123), and confirm the neighbor comes back FULL.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.12.1", "mask": "255.255.255.0", "mode": "routed", "ospfArea": 0, "ospfAuth": "message-digest", "md5KeyId": 1, "md5Key": "WRONGKEY"}, "GigabitEthernet0/1": {"up": false, "mode": "routed"}, "Loopback0": {"up": true, "ip": "1.1.1.1", "mask": "255.255.255.255", "mode": "routed"}}, "custom": {"routerId": "1.1.1.1", "peerIp": "10.0.12.2", "peerRid": "2.2.2.2", "peerKey": "CISCO123", "procId": 1}},
    objectives: [
    { text: "Investigate why the adjacency won't form by reading the OSPF authentication errors in the log", hint: "The syslog tells you exactly what R2 is complaining about: show log | include OSPF", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+log(g(ing)?)?(\s*\|.*ospf)?/i.test(c.cmd); }); } },
    { text: "Select R1's OSPF-enabled interface in config mode", hint: "configure terminal -> interface gi0/0", check: function(d){ return d.currentInterface === 'GigabitEthernet0/0' || (d.interfaces['GigabitEthernet0/0'] && d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Set the MD5 key 1 to the value the peer is using so the digests match", hint: "ip ospf message-digest-key 1 md5 CISCO123", check: function(d){ var i = d.interfaces['GigabitEthernet0/0']; return i && i.md5KeyId == 1 && String(i.md5Key) === String(d.custom.peerKey); } },
    { text: "Confirm the neighbor R2 has re-formed and reached FULL state", hint: "end -> show ip ospf neighbor", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/0']; var fixed = i && String(i.md5Key) === String(d.custom.peerKey); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ospf\s+nei(ghbor)?/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  // --- FIX: parse the MD5 key under the interface ---
  var m = raw.match(/^ip\s+ospf\s+message-digest-key\s+(\d+)\s+md5\s+(\S+)/i);
  if (m && dev.mode === 'config-if' && dev.currentInterface) {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    dev.interfaces[dev.currentInterface].md5KeyId = parseInt(m[1], 10);
    dev.interfaces[dev.currentInterface].md5Key = m[2];
    dev.__fixTime = Date.now();
    return '';
  }
  // allow toggling auth on (idempotent, already on) without erroring
  if (/^ip\s+ospf\s+authentication\s+message-digest/i.test(raw) && dev.mode === 'config-if' && dev.currentInterface) {
    dev.interfaces[dev.currentInterface].ospfAuth = 'message-digest';
    return '';
  }

  var gi0 = dev.interfaces['GigabitEthernet0/0'] || {};
  var matched = String(gi0.md5Key) === String(dev.custom.peerKey);

  // --- show ip ospf neighbor : symptom (no neighbors) -> healed (FULL) ---
  if (/^(do\s+)?show\s+ip\s+ospf\s+nei(ghbor)?$/i.test(lower)) {
    if (!matched) {
      return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n(no neighbors)';
    }
    return 'Neighbor ID     Pri   State           Dead Time   Address         Interface\n'
      + dev.custom.peerRid + '         1   FULL/DR         00:00:38    ' + dev.custom.peerIp + '      GigabitEthernet0/0';
  }

  // --- show log | include OSPF : auth-mismatch evidence from R2, clears after fix ---
  if (/^(do\s+)?show\s+log(g(ing)?)?(\s*\|\s*(include|inc|i)\s+ospf)?$/i.test(lower)) {
    if (!matched) {
      return '%OSPF-4-ERRRCV: Received invalid packet: mismatch authentication key, from ' + dev.custom.peerIp + ', GigabitEthernet0/0\n'
        + '%OSPF-4-ERRRCV: Received invalid packet: mismatch authentication key, from ' + dev.custom.peerIp + ', GigabitEthernet0/0';
    }
    return '%OSPF-5-ADJCHG: Process 1, Nbr ' + dev.custom.peerRid + ' on GigabitEthernet0/0 from LOADING to FULL, Loading Done';
  }

  // --- show running-config interface gi0/0 : reflects the current key ---
  if (/^(do\s+)?show\s+run(ning-config)?\s+int(erface)?\s+gi(gabitethernet)?0\/0$/i.test(lower)) {
    return 'interface GigabitEthernet0/0\n'
      + ' ip address ' + (gi0.ip || '10.0.12.1') + ' 255.255.255.0\n'
      + ' ip ospf message-digest-key ' + (gi0.md5KeyId || 1) + ' md5 ' + (gi0.md5Key || 'WRONGKEY') + '\n'
      + ' ip ospf authentication message-digest\n'
      + ' duplex auto\n speed auto\nend';
  }

  // --- show ip ospf interface gi0/0 : confirms area/auth, neighbor count tracks state ---
  if (/^(do\s+)?show\s+ip\s+ospf\s+int(erface)?\s+gi(gabitethernet)?0\/0$/i.test(lower)) {
    var nc = matched ? 1 : 0;
    return 'GigabitEthernet0/0 is up, line protocol is up\n'
      + '  Internet Address 10.0.12.1/24, Area 0, Attached via Network Statement\n'
      + '  Process ID 1, Router ID 1.1.1.1, Network Type BROADCAST, Cost: 1\n'
      + '  Timer intervals configured, Hello 10, Dead 40, Wait 40, Retransmit 5\n'
      + '    Hello due in 00:00:01\n'
      + '  Neighbor Count is ' + nc + ', Adjacent neighbor count is ' + nc + '\n'
      + '  Message digest authentication enabled\n'
      + '    Youngest key id is ' + (gi0.md5KeyId || 1);
  }

  return undefined;
},
    solution: ["show log | include OSPF", "show running-config interface gi0/0", "enable", "configure terminal", "interface gi0/0", "ip ospf message-digest-key 1 md5 CISCO123", "end", "show ip ospf neighbor"]
  },
  {
    id: "ts-l3-06", title: "Static route with unreachable next-hop", diff: "intermediate", topics: ["3.3"],
    scenario: "R1 has a static route to 192.168.50.0/24, and the route shows up in the RIB, yet users on R1's LAN report no connectivity to the 192.168.50.0/24 server farm. The route exists but traffic dies. Investigate why the route cannot actually forward, then repoint the static at a next-hop R1 can reach and confirm the path resolves.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.12.1", "mode": "routed"}, "GigabitEthernet0/1": {"up": true, "ip": "10.0.13.1", "mode": "routed"}, "GigabitEthernet0/2": {"up": false, "ip": "unassigned", "mode": "routed"}}, "routes": [{"net": "192.168.50.0", "mask": "255.255.255.0", "nh": "10.0.99.1"}], "custom": {"connected": ["10.0.12.0/24", "10.0.13.0/24"], "arp": ["10.0.12.2"]}},
    objectives: [
    { text: "Investigate the forwarding state of the route to the server farm to see whether the next-hop actually resolves", hint: "CEF tells you if the next-hop resolves: show ip cef 192.168.50.0", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+cef\s+192\.168\.50\.0/i.test(c.cmd); }); } },
    { text: "Confirm whether R1 even has a route toward its own next-hop address", hint: "Check recursion: show ip route 10.0.99.1", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+route\s+10\.0\.99\.1/i.test(c.cmd); }); } },
    { text: "Enter global config and repoint the static route at a next-hop on a directly connected, reachable subnet", hint: "A host on the 10.0.12.0/24 LAN is reachable (in ARP): configure terminal then ip route 192.168.50.0 255.255.255.0 10.0.12.2", check: function(d,log){ function reachable(nh){ if(!nh) return false; var arp=(d.custom&&d.custom.arp)||[]; if(arp.indexOf(nh)!==-1) return true; var conn=(d.custom&&d.custom.connected)||[]; function inNet(ip,cidr){ var p=cidr.split('/'); var net=p[0].split('.').map(Number); var bits=parseInt(p[1],10); var a=ip.split('.').map(Number); var mask=bits===0?0:(0xFFFFFFFF<<(32-bits))>>>0; var ni=((net[0]<<24)|(net[1]<<16)|(net[2]<<8)|net[3])>>>0; var ai=((a[0]<<24)|(a[1]<<16)|(a[2]<<8)|a[3])>>>0; return (ni&mask)===(ai&mask); } return conn.some(function(c){ return inNet(nh,c); }); } var r=(d.routes||[]).find(function(x){ return x.net==='192.168.50.0'; }); return !!r && reachable(r.nh); } },
    { text: "Confirm the route now resolves and CEF can forward to the server farm", hint: "end then re-run show ip cef 192.168.50.0 and look for attached/next-hop with an interface", check: function(d,log){ function reachable(nh){ if(!nh) return false; var arp=(d.custom&&d.custom.arp)||[]; if(arp.indexOf(nh)!==-1) return true; var conn=(d.custom&&d.custom.connected)||[]; function inNet(ip,cidr){ var p=cidr.split('/'); var net=p[0].split('.').map(Number); var bits=parseInt(p[1],10); var a=ip.split('.').map(Number); var mask=bits===0?0:(0xFFFFFFFF<<(32-bits))>>>0; var ni=((net[0]<<24)|(net[1]<<16)|(net[2]<<8)|net[3])>>>0; var ai=((a[0]<<24)|(a[1]<<16)|(a[2]<<8)|a[3])>>>0; return (ni&mask)===(ai&mask); } return conn.some(function(c){ return inNet(nh,c); }); } var r=(d.routes||[]).find(function(x){ return x.net==='192.168.50.0'; }); var fixed=!!r && reachable(r.nh); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+cef\s+192\.168\.50\.0/i.test(c.cmd) && c.time >= (d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  function reachable(nh){
    var arp = (dev.custom && dev.custom.arp) || [];
    if (arp.indexOf(nh) !== -1) return true;
    var conn = (dev.custom && dev.custom.connected) || [];
    function inNet(ip, cidr){
      var p = cidr.split('/'); var net = p[0].split('.').map(Number); var bits = parseInt(p[1],10);
      var a = ip.split('.').map(Number);
      var mask = bits===0?0:(0xFFFFFFFF << (32-bits))>>>0;
      var ni = ((net[0]<<24)|(net[1]<<16)|(net[2]<<8)|net[3])>>>0;
      var ai = ((a[0]<<24)|(a[1]<<16)|(a[2]<<8)|a[3])>>>0;
      return (ni & mask) === (ai & mask);
    }
    return conn.some(function(c){ return inNet(nh, c); });
  }
  function nhIface(nh){
    if (nh.indexOf('10.0.12.') === 0) return 'GigabitEthernet0/0';
    if (nh.indexOf('10.0.13.') === 0) return 'GigabitEthernet0/1';
    return null;
  }
  var route = (dev.routes||[]).find(function(x){ return x.net==='192.168.50.0'; });

  var m = raw.match(/^ip\s+route\s+192\.168\.50\.0\s+255\.255\.255\.0\s+(\d+\.\d+\.\d+\.\d+)/i);
  if (m && dev.mode === 'config'){
    var nh = m[1];
    if (route){ route.nh = nh; } else { dev.routes.push({net:'192.168.50.0',mask:'255.255.255.0',nh:nh}); }
    dev.__fixTime = Date.now();
    return '';
  }

  if (/^(do\s+)?show\s+ip\s+cef\s+192\.168\.50\.0$/i.test(lower)){
    if (!route) return '192.168.50.0/24\n  no route';
    if (reachable(route.nh)){
      return '192.168.50.0/24\n  nexthop ' + route.nh + ' ' + nhIface(route.nh);
    }
    return '192.168.50.0/24\n  nexthop ' + route.nh + '\n  unresolved (nexthop not in routing table)';
  }

  if (/^(do\s+)?ping\s+10\.0\.99\.1/i.test(lower)){
    return 'Type escape sequence to abort.\n'
      + 'Sending 5, 100-byte ICMP Echos to 10.0.99.1, timeout is 2 seconds:\n'
      + '.....\n'
      + 'Success rate is 0 percent (0/5)';
  }

  if (/^(do\s+)?ping\s+10\.0\.12\.2/i.test(lower)){
    return 'Type escape sequence to abort.\n'
      + 'Sending 5, 100-byte ICMP Echos to 10.0.12.2, timeout is 2 seconds:\n'
      + '!!!!!\n'
      + 'Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms';
  }

  if (/^(do\s+)?show\s+ip\s+route\s+10\.0\.99\.1$/i.test(lower)){
    return '% Subnet not in table';
  }

  if (/^(do\s+)?show\s+ip\s+route\s+192\.168\.50\.0$/i.test(lower)){
    if (!route) return '% Subnet not in table';
    return 'Routing entry for 192.168.50.0/24\n  Known via "static", distance 1, metric 0\n  Routing Descriptor Blocks:\n  * ' + route.nh + '\n      Route metric is 0, traffic share count is 1';
  }

  if (/^(do\s+)?show\s+ip\s+route$/i.test(lower)){
    var sline = route ? ('S     192.168.50.0/24 [1/0] via ' + route.nh) : '';
    return 'Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP\n'
      + '       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area\n\n'
      + 'Gateway of last resort is not set\n\n'
      + '      10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks\n'
      + 'C        10.0.12.0/24 is directly connected, GigabitEthernet0/0\n'
      + 'L        10.0.12.1/32 is directly connected, GigabitEthernet0/0\n'
      + 'C        10.0.13.0/24 is directly connected, GigabitEthernet0/1\n'
      + 'L        10.0.13.1/32 is directly connected, GigabitEthernet0/1\n'
      + sline;
  }

  if (/^(do\s+)?show\s+run(ning-config)?\s*\|\s*i(nc(lude)?)?\s+ip\s+route$/i.test(lower)){
    return route ? ('ip route 192.168.50.0 255.255.255.0 ' + route.nh) : '';
  }

  if (/^(do\s+)?show\s+ip\s+arp$/i.test(lower)){
    return 'Protocol  Address         Age (min)  Hardware Addr   Type   Interface\n'
      + 'Internet  10.0.12.1               -   00a0.0c12.0001  ARPA   GigabitEthernet0/0\n'
      + 'Internet  10.0.12.2              14   00a0.0c12.0002  ARPA   GigabitEthernet0/0\n'
      + 'Internet  10.0.13.1               -   00a0.0c13.0001  ARPA   GigabitEthernet0/1';
  }

  if (/^(do\s+)?show\s+ip\s+int(erface)?\s+br(ief)?$/i.test(lower)){
    return 'Interface              IP-Address      OK? Method Status                Protocol\n'
      + 'GigabitEthernet0/0     10.0.12.1       YES NVRAM  up                    up\n'
      + 'GigabitEthernet0/1     10.0.13.1       YES NVRAM  up                    up\n'
      + 'GigabitEthernet0/2     unassigned      YES NVRAM  administratively down down';
  }

  return undefined;
},
    solution: ["show ip route 192.168.50.0", "show ip cef 192.168.50.0", "show ip route 10.0.99.1", "enable", "configure terminal", "ip route 192.168.50.0 255.255.255.0 10.0.12.2", "end", "show ip cef 192.168.50.0"]
  },
  {
    id: "ts-l3-07", title: "Routing loop — static route pointing back at the peer", diff: "intermediate", topics: ["3.3"],
    scenario: "Users say 192.168.77.0/24 is unreachable. A traceroute from R1 ping-pongs between R1 (10.0.12.1) and R2 (10.0.12.2) until the TTL expires, and R1's CPU is climbing. R2 already has the correct static for this network. Investigate R1's routing table and running-config, find the bad static that bounces traffic back at R2, remove it, then confirm the loop is gone.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.12.1", "mode": "routed"}}, "routes": [{"net": "192.168.77.0", "mask": "255.255.255.0", "nh": "10.0.12.2"}], "custom": {"peerName": "R2", "peerNh": "10.0.12.1", "targetNet": "192.168.77.0", "badNh": "10.0.12.2"}},
    objectives: [
    { text: "Investigate the route — see which next-hop R1 uses for the unreachable network", hint: "show ip route 192.168.77.0 — read the next-hop in the Routing Descriptor Block", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+ip\s+route\s+192\.168\.77\.0/i.test(c.cmd);});} },
    { text: "Confirm it in the config — find the offending static route line", hint: "show running-config | include ip route — spot the static pointing at the peer", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+run(ning-config)?\s*\|\s*inc(lude)?\s+ip\s+route/i.test(c.cmd);});} },
    { text: "Enter global config mode", hint: "enable → configure terminal", check: function(d,log){return d.mode==='config'||d.mode==='config-if'||log.some(function(c){return /^conf(igure)?(\s+t(erminal)?)?$/i.test(c.cmd);});} },
    { text: "Remove the bad static so traffic stops bouncing back to the peer", hint: "no ip route 192.168.77.0 255.255.255.0 10.0.12.2", check: function(d){return !d.routes.some(function(r){return r.net==='192.168.77.0'&&r.nh==='10.0.12.2';});} },
    { text: "Confirm the fix — R1 no longer originates the bad static and the loop is broken", hint: "end → show ip route 192.168.77.0", check: function(d,log){var fixed=!d.routes.some(function(r){return r.net==='192.168.77.0'&&r.nh==='10.0.12.2';});return fixed&&log.some(function(c){return /^(do\s+)?sh(ow)?\s+ip\s+route\s+192\.168\.77\.0/i.test(c.cmd)&&c.time>=(d.__fixTime||0);});} }
    ],
    extraCmds: function(dev,raw,lower){
  var c=dev.custom;
  var hasBad=function(){return dev.routes.some(function(r){return r.net===c.targetNet&&r.nh===c.badNh;});};
  // FIX: remove the offending static route
  var m=raw.match(/^no\s+ip\s+route\s+192\.168\.77\.0\s+255\.255\.255\.0\s+10\.0\.12\.2/i);
  if(m&&(dev.mode==='config'||dev.mode==='config-if')){
    dev.routes=dev.routes.filter(function(r){return !(r.net===c.targetNet&&r.nh===c.badNh);});
    dev.__fixTime=Date.now();
    return '';
  }
  // SHOW: route detail for the target network — symptom when broken, healed after fix
  if(/^(do\s+)?show\s+ip\s+route\s+192\.168\.77\.0$/i.test(lower)){
    if(hasBad()){
      return 'Routing entry for 192.168.77.0/24\n'
        +'  Known via "static", distance 1, metric 0\n'
        +'  Routing Descriptor Blocks:\n'
        +'  * 10.0.12.2\n'
        +'      Route metric is 0, traffic share count is 1';
    }
    return '% Subnet not in table\n'
      +'% R1 no longer originates a static for 192.168.77.0/24, so it no longer bounces traffic back at the peer.\n'
      +'% Routing loop cleared. (R1 still has no path of its own to this network; add a default or learned route to forward it.)';
  }
  // SHOW: running-config static lines — symptom shows the bad line, gone after fix
  if(/^(do\s+)?show\s+run(ning-config)?\s*\|\s*inc(lude)?\s+ip\s+route$/i.test(lower)){
    if(hasBad()){
      return 'ip route 192.168.77.0 255.255.255.0 10.0.12.2';
    }
    return '';
  }
  // SHOW: traceroute — ping-pong when broken, loop gone (but no path) once fixed
  if(/^(do\s+)?trace(route)?\s+192\.168\.77\.5$/i.test(lower)){
    if(hasBad()){
      return 'Type escape sequence to abort.\n'
        +'Tracing the route to 192.168.77.5\n'
        +'  1 10.0.12.2 4 msec 0 msec 0 msec\n'
        +'  2 10.0.12.1 4 msec 0 msec 0 msec\n'
        +'  3 10.0.12.2 4 msec 0 msec 0 msec\n'
        +'  4 10.0.12.1 4 msec 0 msec 4 msec\n'
        +'  ...\n'
        +' 30 10.0.12.1 4 msec 0 msec 4 msec';
    }
    return 'Type escape sequence to abort.\n'
      +'Tracing the route to 192.168.77.5\n'
      +'  1  *  *  *  \n'
      +'% No route to host — loop is gone, R1 no longer bounces traffic to the peer.';
  }
  // SHOW: R2 evidence (peer side) — static is correct on R2
  if(/^(do\s+)?show\s+ip\s+route\s+10\.0\.12\.2$/i.test(lower)){
    return 'Routing entry for 10.0.12.0/24\n'
      +'  Known via "connected", distance 0, metric 0 (connected, via interface)\n'
      +'  Routing Descriptor Blocks:\n'
      +'  * directly connected, via GigabitEthernet0/0\n'
      +'      Route metric is 0, traffic share count is 1';
  }
  return undefined;
},
    solution: ["show ip route 192.168.77.0", "show running-config | include ip route", "enable", "configure terminal", "no ip route 192.168.77.0 255.255.255.0 10.0.12.2", "end", "show ip route 192.168.77.0"]
  },
  {
    id: "ts-l3-08", title: "ACL deny shadows the specific permit", diff: "intermediate", topics: ["5.6"],
    scenario: "Branch user 192.168.10.50 cannot reach internal server 172.16.20.10. R1 filters Gi0/1 inbound with ACL 110. NOC added a host-specific permit last week to allow this exact flow, but pings still fail with U.U.U. Read the ACL hit counters to see why the permit never fires, reposition it ahead of the deny, and confirm the flow is permitted.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "interfaces": {"GigabitEthernet0/1": {"up": true, "ip": "192.168.10.1", "mode": "access", "inAcl": "110"}}, "routes": [], "custom": {"acl110": [{"seq": 10, "action": "permit", "text": "ip 192.168.20.0 0.0.0.255 172.16.0.0 0.0.255.255", "matches": 0}, {"seq": 20, "action": "deny", "text": "ip any any", "matches": 1389}, {"seq": 30, "action": "permit", "text": "ip host 192.168.10.50 host 172.16.20.10", "matches": 0}], "aclMode": false}},
    objectives: [
    { text: "Investigate — read the ACL 110 hit counters to find which line is dropping the traffic", hint: "show access-lists 110 — the specific permit shows (0 matches) while deny ip any any racks up hits", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+(ip\s+)?access-list(s)?(\s+110)?$/i.test(c.cmd);});} },
    { text: "Enter named ACL config for list 110", hint: "configure terminal → ip access-list extended 110", check: function(d,log){return d.custom && d.custom.aclMode===true;} },
    { text: "Reposition the host-specific permit so it is evaluated before the catch-all deny", hint: "give it a sequence number lower than 20, e.g. 15 permit ip host 192.168.10.50 host 172.16.20.10", check: function(d,log){var a=d.custom&&d.custom.acl110;if(!a)return false;var permitIdx=-1,denyIdx=-1;for(var i=0;i<a.length;i++){if(a[i].action==='permit'&&/host 192\.168\.10\.50 host 172\.16\.20\.10/.test(a[i].text))permitIdx=(permitIdx===-1?a[i].seq:permitIdx);if(a[i].action==='deny'&&/any any/.test(a[i].text))denyIdx=a[i].seq;}return permitIdx>-1&&denyIdx>-1&&permitIdx<denyIdx;} },
    { text: "Confirm the fix — the specific permit now records matches and the branch user's ping recovers", hint: "end → show access-lists 110 (permit now sits above the deny) → ping 172.16.20.10 — replies succeed", check: function(d,log){var a=d.custom&&d.custom.acl110;if(!a)return false;var p=-1,de=-1;for(var i=0;i<a.length;i++){if(a[i].action==='permit'&&/host 192\.168\.10\.50 host 172\.16\.20\.10/.test(a[i].text))p=(p===-1?a[i].seq:p);if(a[i].action==='deny'&&/any any/.test(a[i].text))de=a[i].seq;}var fixed=p>-1&&de>-1&&p<de;if(!fixed)return false;var ft=d.__fixTime||0;var sawShow=log.some(function(c){return /^(do\s+)?sh(ow)?\s+(ip\s+)?access-list(s)?(\s+110)?$/i.test(c.cmd)&&c.time>ft;});var sawPing=log.some(function(c){return /^(do\s+)?ping\s+172\.16\.20\.10/i.test(c.cmd)&&c.time>ft;});return sawShow&&sawPing;} }
    ],
    extraCmds: function(dev,raw,lower){
  if(!dev.custom)dev.custom={};
  if(!dev.custom.acl110)dev.custom.acl110=[];
  // Enter named ACL config mode
  if(/^ip\s+access-list\s+extended\s+110$/i.test(raw)){
    if(dev.mode&&dev.mode.indexOf('config')===0){dev.custom.aclMode=true;return '';}
  }
  // Leaving config drops ACL sub-mode
  if(/^(exit|end)$/i.test(lower)&&dev.custom.aclMode){dev.custom.aclMode=false;}
  // Parse a sequenced permit/deny line while in ACL config mode
  var m=raw.match(/^(\d+)\s+(permit|deny)\s+(.+)$/i);
  if(m&&dev.custom.aclMode){
    var seq=parseInt(m[1],10),action=m[2].toLowerCase(),text=m[3].trim();
    var existing=dev.custom.acl110.filter(function(e){return e.seq!==seq;});
    existing.push({seq:seq,action:action,text:text,matches:0});
    existing.sort(function(a,b){return a.seq-b.seq;});
    dev.custom.acl110=existing;
    dev.__fixTime=Date.now();
    return '';
  }
  // Render show access-lists output from current ACL state, with simulated matches
  if(/^(do\s+)?show\s+(ip\s+)?access-list(s)?(\s+110)?$/i.test(lower)){
    var a=dev.custom.acl110.slice().sort(function(x,y){return x.seq-y.seq;});
    var denySeq=null,specSeq=null;
    a.forEach(function(e){if(e.action==='deny'&&/any any/.test(e.text))denySeq=e.seq;if(e.action==='permit'&&/host 192\.168\.10\.50 host 172\.16\.20\.10/.test(e.text))specSeq=e.seq;});
    var fixed=specSeq!==null&&denySeq!==null&&specSeq<denySeq;
    var out='Extended IP access list 110\n';
    a.forEach(function(e){
      var hits='';
      if(e.action==='deny'&&/any any/.test(e.text)){hits=' (1389 matches)';}
      if(e.action==='permit'&&/host 192\.168\.10\.50 host 172\.16\.20\.10/.test(e.text)){hits=fixed?' (5 matches)':' (0 matches)';}
      out+='    '+e.seq+' '+e.action+' '+e.text+hits+'\n';
    });
    return out.replace(/\n$/,'');
  }
  // Ping from the branch user: drops while shadowed, succeeds once permit precedes deny
  if(/^(do\s+)?ping\s+172\.16\.20\.10/i.test(lower)){
    var a2=dev.custom.acl110,ds=null,ss=null;
    a2.forEach(function(e){if(e.action==='deny'&&/any any/.test(e.text))ds=e.seq;if(e.action==='permit'&&/host 192\.168\.10\.50 host 172\.16\.20\.10/.test(e.text))ss=e.seq;});
    var ok=ss!==null&&ds!==null&&ss<ds;
    var body=ok?'!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/1/4 ms':'U.U.U\nSuccess rate is 0 percent (0/5)';
    return 'Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to 172.16.20.10, timeout is 2 seconds:\nPacket sent with a source address of 192.168.10.50\n'+body;
  }
  return undefined;
},
    solution: ["show access-lists 110", "enable", "configure terminal", "ip access-list extended 110", "15 permit ip host 192.168.10.50 host 172.16.20.10", "end", "show access-lists 110", "ping 172.16.20.10"]
  },
  {
    id: "ts-l3-09", title: "NAT not translating — missing ip nat inside", diff: "intermediate", topics: ["4.1"],
    scenario: "R-EDGE was configured for PAT overload to the internet, but LAN hosts on 192.168.1.0/24 (off Gi0/0) cannot reach 8.8.8.8 and the translation table is empty. The ACL and the outside interface look correct. Investigate the NAT statistics to find which interface role is missing, apply the fix on R-EDGE, and confirm hits start landing.",
    device: {"name": "R-EDGE", "type": "router", "hostname": "R-EDGE", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "192.168.1.1", "mask": "255.255.255.0", "mode": "routed", "desc": "LAN", "natInside": false}, "GigabitEthernet0/1": {"up": true, "ip": "203.0.113.2", "mask": "255.255.255.252", "mode": "routed", "desc": "WAN", "natOutside": true}}, "routes": [{"net": "0.0.0.0", "mask": "0.0.0.0", "nh": "203.0.113.1"}], "custom": {"natAcl": "1", "natAclNet": "192.168.1.0 0.0.0.255", "overloadIf": "GigabitEthernet0/1"}},
    objectives: [
    { text: "Investigate — read the NAT statistics to see which interface role is empty", hint: "Inside/Outside interface roles live here: show ip nat statistics", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+nat\s+stat/i.test(c.cmd); }); } },
    { text: "Enter config and select the LAN-facing interface", hint: "configure terminal → interface gi0/0", check: function(d){ return d.currentInterface==='GigabitEthernet0/0' || (d.interfaces['GigabitEthernet0/0'] && d.mode && d.mode.indexOf('config')===0); } },
    { text: "Mark the LAN interface as the NAT inside interface", hint: "ip nat inside", check: function(d){ var i=d.interfaces['GigabitEthernet0/0']; return !!(i && i.natInside===true); } },
    { text: "Confirm the fix — verify the inside interface now appears in the NAT statistics", hint: "end → show ip nat statistics — Gi0/0 should now be listed under Inside interfaces", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/0']; var fixed=!!(i && i.natInside===true); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+nat\s+stat/i.test(c.cmd) && c.time > (d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  // --- FIX: ip nat inside / ip nat outside on the selected interface ---
  var mi = raw.match(/^ip\s+nat\s+(inside|outside)\s*$/i);
  if (mi && dev.mode === 'config-if' && dev.currentInterface) {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    if (mi[1].toLowerCase() === 'inside') dev.interfaces[dev.currentInterface].natInside = true;
    else dev.interfaces[dev.currentInterface].natOutside = true;
    dev.__fixTime = Date.now();
    return '';
  }
  // allow removing it too (no-op for the lab but realistic)
  var mn = raw.match(/^no\s+ip\s+nat\s+(inside|outside)\s*$/i);
  if (mn && dev.mode === 'config-if' && dev.currentInterface) {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    if (mn[1].toLowerCase() === 'inside') dev.interfaces[dev.currentInterface].natInside = false;
    else dev.interfaces[dev.currentInterface].natOutside = false;
    dev.__fixTime = Date.now();
    return '';
  }
  var abbr = function (n) { return n.replace('GigabitEthernet', 'Gi').replace('FastEthernet', 'Fa'); };
  var insideIfs = function () { return Object.keys(dev.interfaces).filter(function (n) { return dev.interfaces[n] && dev.interfaces[n].natInside === true; }); };
  var outsideIfs = function () { return Object.keys(dev.interfaces).filter(function (n) { return dev.interfaces[n] && dev.interfaces[n].natOutside === true; }); };

  // --- SHOW: ip nat statistics (symptom when inside empty, heals after fix) ---
  if (/^(do\s+)?show\s+ip\s+nat\s+stat(istics)?$/i.test(lower)) {
    var ins = insideIfs(), outs = outsideIfs();
    var translated = ins.length > 0;
    var insLine = ins.length ? '\n  ' + ins.join('\n  ') : '';
    var outLine = outs.length ? '\n  ' + outs.join('\n  ') : '';
    var hits = translated ? 412 : 0;
    var miss = translated ? 6 : 0;
    var active = translated ? 3 : 0;
    return 'Total active translations: ' + active + ' (0 static, ' + active + ' dynamic; ' + active + ' extended)\n'
      + 'Peak translations: ' + (translated ? 7 : 0) + '\n'
      + 'Outside interfaces:' + outLine + '\n'
      + 'Inside interfaces:' + insLine + '\n'
      + 'Hits: ' + hits + '  Misses: ' + miss + '\n'
      + 'Expired translations: 0\n'
      + 'Dynamic mappings:\n'
      + '-- Inside Source\n'
      + '[Id: 1] access-list ' + dev.custom.natAcl + ' interface ' + dev.custom.overloadIf + ' refcount ' + active;
  }

  // --- SHOW: ip nat translations (empty when broken, populated after fix) ---
  if (/^(do\s+)?show\s+ip\s+nat\s+tr(anslations)?$/i.test(lower)) {
    var header = 'Pro Inside global         Inside local          Outside local         Outside global\n';
    if (insideIfs().length === 0) return header + '(translation table empty)';
    return header
      + 'icmp 203.0.113.2:1        192.168.1.10:1        8.8.8.8:1             8.8.8.8:1\n'
      + 'tcp 203.0.113.2:51234    192.168.1.10:51234    142.250.72.14:443     142.250.72.14:443\n'
      + 'udp 203.0.113.2:53        192.168.1.20:53       8.8.8.8:53            8.8.8.8:53';
  }

  // --- SHOW: ip interface brief (static, both up) ---
  if (/^(do\s+)?show\s+ip\s+int(erface)?\s+br(ief)?$/i.test(lower)) {
    return 'Interface              IP-Address      OK? Method Status                Protocol\n'
      + 'GigabitEthernet0/0     192.168.1.1     YES NVRAM  up                    up\n'
      + 'GigabitEthernet0/1     203.0.113.2     YES NVRAM  up                    up\n'
      + 'GigabitEthernet0/2     unassigned      YES NVRAM  administratively down  down\n'
      + 'GigabitEthernet0/3     unassigned      YES NVRAM  administratively down  down';
  }

  // --- SHOW: access-lists (ACL is correct; not the fault) ---
  if (/^(do\s+)?show\s+access-lists?$/i.test(lower)) {
    var m = insideIfs().length ? 18 : 0;
    return 'Standard IP access list ' + dev.custom.natAcl + '\n'
      + '    10 permit 192.168.1.0, wildcard bits 0.0.0.255 (' + m + ' matches)';
  }
  return undefined;
},
    solution: ["show ip nat statistics", "enable", "configure terminal", "interface gi0/0", "ip nat inside", "end", "show ip nat statistics"]
  },
  {
    id: "ts-l3-10", title: "Asymmetric routing breaks stateful NAT", diff: "advanced", topics: ["4.1", "3.3"],
    scenario: "After adding R-CORE as a backup egress, internal users report external HTTPS sessions to 198.51.100.10 hang halfway through page loads, yet pings succeed. R-EDGE now has TWO equal-cost OSPF paths to the outside, so flows hash per-flow (ECMP) across both egress paths. The NAT translation only lives on R-EDGE — when a return packet hashes to the other path, the stateful lookup fails and the session drops silently. Investigate the route and NAT state, collapse the equal-cost paths so traffic stays symmetric through R-EDGE's NAT, then confirm only one path remains.",
    device: {"name": "R-EDGE", "type": "router", "hostname": "R-EDGE", "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "192.168.1.1"}, "GigabitEthernet0/1": {"up": true, "ip": "203.0.113.2"}, "GigabitEthernet0/2": {"up": true, "ip": "10.0.99.1"}, "GigabitEthernet0/3": {"up": true, "ip": "10.0.88.1"}}, "custom": {"ospfPid": 1, "maxPaths": 4, "natInside": "192.168.1.50:51234", "natGlobal": "203.0.113.2:51234", "dst": "198.51.100.10:443"}},
    objectives: [
    { text: "Investigate how the route to the external server is being forwarded", hint: "OSPF can install multiple equal-cost paths. show ip route 198.51.100.10 — look for more than one Routing Descriptor Block / traffic share", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+route\s+198\.51\.100\.10/i.test(c.cmd); }); } },
    { text: "Inspect the NAT translation table to see where session state lives", hint: "show ip nat translations — note the single entry that only exists on this router", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+nat\s+trans/i.test(c.cmd); }); } },
    { text: "Enter OSPF router configuration", hint: "configure terminal → router ospf 1", check: function(d){ return d.mode === 'config-router' || (d.custom && d.custom.__inOspf === true); } },
    { text: "Collapse the equal-cost paths so traffic stays symmetric through this router's NAT", hint: "maximum-paths 1 — only one egress path installed means return traffic always lands on R-EDGE", check: function(d){ return d.custom && String(d.custom.maxPaths) === '1'; } },
    { text: "Confirm only a single path now forwards to the external server", hint: "end → show ip route 198.51.100.10 — a single Routing Descriptor Block, traffic share count 1", check: function(d,log){ var fixed = d.custom && String(d.custom.maxPaths)==='1'; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+route\s+198\.51\.100\.10/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  if (!dev.custom) dev.custom = {};
  // Track entry into OSPF router config so config-router objective + maximum-paths parse correctly
  var rm = raw.match(/^router\s+ospf\s+(\d+)/i);
  if (rm && dev.mode && dev.mode.indexOf('config') === 0) {
    dev.mode = 'config-router';
    dev.custom.__inOspf = true;
    dev.custom.ospfPid = parseInt(rm[1], 10);
    return '';
  }
  // Parse the fix: maximum-paths N (collapse ECMP)
  var mp = raw.match(/^maximum-paths\s+(\d+)/i);
  if (mp && (dev.mode === 'config-router' || dev.custom.__inOspf)) {
    dev.custom.maxPaths = parseInt(mp[1], 10);
    dev.__fixTime = Date.now();
    return '';
  }
  // show ip route 198.51.100.10 — symptom (2 paths) when broken, healed (1 path) after fix
  if (/^(do\s+)?show\s+ip\s+route\s+198\.51\.100\.10$/i.test(lower)) {
    var mpv = dev.custom.maxPaths == null ? 4 : dev.custom.maxPaths;
    var ecmp = (mpv > 1);
    var out = 'Routing entry for 198.51.100.0/24\n'
      + '  Known via "ospf 1", distance 110, metric 2, type intra area\n'
      + '  Last update from 10.0.99.2 on GigabitEthernet0/2, 00:05:12 ago\n'
      + '  Routing Descriptor Blocks:\n'
      + '  * 10.0.99.2, from 4.4.4.4, 00:05:12 ago, via GigabitEthernet0/2\n'
      + '      Route metric is 2, traffic share count is 1\n';
    if (ecmp) {
      out += '    10.0.88.2, from 5.5.5.5, 00:05:12 ago, via GigabitEthernet0/3\n'
        + '      Route metric is 2, traffic share count is 1\n'
        + '\n%WARN: 2 equal-cost paths installed (maximum-paths ' + mpv + ') — flows hash per-path; return traffic may bypass NAT on R-EDGE.';
    } else {
      out += '\nSingle path installed (maximum-paths 1) — all flows symmetric via GigabitEthernet0/2; NAT state on R-EDGE is always hit.';
    }
    return out;
  }
  // show ip nat translations — the one entry that only lives on R-EDGE
  if (/^(do\s+)?show\s+ip\s+nat\s+trans(lations)?$/i.test(lower)) {
    return 'Pro Inside global         Inside local          Outside local         Outside global\n'
      + 'tcp 203.0.113.2:51234     192.168.1.50:51234    198.51.100.10:443     198.51.100.10:443\n'
      + '\n(R-CORE# show ip nat translations is EMPTY — outbound created NAT state only here on R-EDGE)';
  }
  // show ip nat statistics — supporting evidence
  if (/^(do\s+)?show\s+ip\s+nat\s+stat(istics)?$/i.test(lower)) {
    return 'Total active translations: 1 (0 static, 1 dynamic; 1 extended)\n'
      + 'Outside interfaces:\n  GigabitEthernet0/1\n'
      + 'Inside interfaces:\n  GigabitEthernet0/0\n'
      + 'Hits: 482  Misses: 0\n'
      + 'Dynamic mappings:\n-- Inside Source\n[Id: 1] access-list 1 interface GigabitEthernet0/1 overload';
  }
  return undefined;
},
    solution: ["show ip route 198.51.100.10", "show ip nat translations", "enable", "configure terminal", "router ospf 1", "maximum-paths 1", "end", "show ip route 198.51.100.10"]
  },
  {
    id: "ts-svc-01", title: "VLAN 20 clients stuck on APIPA — missing DHCP relay", diff: "beginner", topics: ["4.6"],
    scenario: "New PCs in VLAN 20 on ASW1 self-assign 169.254.x.x APIPA addresses and cannot reach the network. The DHCP server lives on R1 in VLAN 10 (192.168.10.1) and is leasing VLAN 10 clients fine. DHCP DISCOVER is a broadcast — VLAN 20 hosts are on a different subnet from the server. Investigate R1's SVIs, point VLAN 20's relay at the server, and confirm.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "vlans": {"10": {"name": "SALES"}, "20": {"name": "DATA"}}, "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.0.1", "mode": "routed"}, "Vlan10": {"up": true, "ip": "192.168.10.1", "mode": "routed", "helper": "192.168.10.1"}, "Vlan20": {"up": true, "ip": "192.168.20.1", "mode": "routed"}}, "routes": [], "custom": {"dhcpServer": "192.168.10.1"}},
    objectives: [
    { text: "Investigate VLAN 20's relay configuration on R1", hint: "Read whether the SVI forwards DHCP broadcasts: show ip interface vlan20 (look at the Helper address line)", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+int(erface)?\s+vlan\s*20/i.test(c.cmd); }); } },
    { text: "Enter config and select the VLAN 20 SVI", hint: "configure terminal -> interface vlan20", check: function(d,log){ return d.currentInterface === 'Vlan20' || log.some(function(c){ return /^interface\s+vlan\s*20$/i.test(c.cmd); }); } },
    { text: "Relay VLAN 20 DHCP broadcasts to the server", hint: "ip helper-address 192.168.10.1", check: function(d,log){ var i=d.interfaces['Vlan20']; return !!(i && i.helper === d.custom.dhcpServer); } },
    { text: "Confirm the helper now points at the server", hint: "end -> show ip interface vlan20 (Helper address is now 192.168.10.1)", check: function(d,log){ var i=d.interfaces['Vlan20']; var fixed=!!(i && i.helper===d.custom.dhcpServer); return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+int(erface)?\s+vlan\s*20/i.test(c.cmd) && c.time > (d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev, raw, lower){
  var m = raw.match(/^ip\s+helper-address\s+(\d+\.\d+\.\d+\.\d+)/i);
  if (m && dev.mode === 'config-if' && dev.currentInterface) {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    dev.interfaces[dev.currentInterface].helper = m[1];
    dev.__fixTime = Date.now();
    return '';
  }
  var sviMatch = lower.match(/^(do\s+)?show\s+ip\s+int(erface)?\s+vlan\s*(\d+)$/i);
  if (sviMatch) {
    var vid = sviMatch[3];
    var name = 'Vlan' + vid;
    var i = dev.interfaces[name];
    if (!i) return name + ' is not configured.';
    var helperLine = i.helper ? ('  Helper address is ' + i.helper) : '  Helper address is not set';
    return name + ' is up, line protocol is up\n'
      + '  Internet address is ' + i.ip + '/24\n'
      + '  Broadcast address is 255.255.255.255\n'
      + '  Address determined by setup command\n'
      + '  MTU is 1500 bytes\n'
      + helperLine + '\n'
      + '  Directed broadcast forwarding is disabled\n'
      + '  Outgoing access list is not set\n'
      + '  Inbound  access list is not set\n'
      + '  Proxy ARP is enabled\n'
      + '  Local Proxy ARP is disabled\n'
      + '  Security level is default\n'
      + '  Split horizon is enabled\n'
      + '  ICMP redirects are always sent\n'
      + '  ICMP unreachables are always sent\n'
      + '  IP fast switching is enabled';
  }
  if (/^(do\s+)?show\s+ip\s+int(erface)?\s+br(ief)?$/i.test(lower)) {
    var out = 'Interface              IP-Address      OK? Method Status                Protocol\n';
    var rows = [
      ['GigabitEthernet0/0', '10.0.0.1'],
      ['Vlan10', '192.168.10.1'],
      ['Vlan20', '192.168.20.1']
    ];
    rows.forEach(function(r){
      out += r[0].padEnd(23) + r[1].padEnd(16) + 'YES NVRAM  up                    up\n';
    });
    return out;
  }
  if (/^(do\s+)?show\s+ip\s+dhcp\s+binding$/i.test(lower)) {
    return 'Bindings from all pools not associated with VRF:\n'
      + 'IP address          Client-ID/              Lease expiration        Type\n'
      + '                    Hardware address/\n'
      + '                    User name\n'
      + '192.168.10.11       0100.5056.aa11.22       May 31 2026 04:12 PM    Automatic\n'
      + '192.168.10.12       0100.5056.aa11.33       May 31 2026 04:18 PM    Automatic\n'
      + '192.168.10.13       0100.5056.aa11.44       May 31 2026 04:21 PM    Automatic';
  }
  if (/^(do\s+)?show\s+ip\s+dhcp\s+pool$/i.test(lower)) {
    return 'Pool VLAN10 :\n Total addresses                : 254\n Leased addresses               : 3\n 1 subnet is currently in the pool :\n 192.168.10.1     - 192.168.10.254    3\n\n'
      + 'Pool VLAN20 :\n Total addresses                : 254\n Leased addresses               : 0\n 1 subnet is currently in the pool :\n 192.168.20.1     - 192.168.20.254    0';
  }
  return undefined;
},
    solution: ["show ip interface vlan20", "enable", "configure terminal", "interface vlan20", "ip helper-address 192.168.10.1", "end", "show ip interface vlan20"]
  },
  {
    id: "ts-svc-02", title: "SSH refused — RSA keys never generated", diff: "beginner", topics: ["5.3"],
    scenario: "After a fresh deployment, admin Jane cannot SSH into ASW1 from her jump host — port 22 says \"Connection refused.\" Telnet also fails. She is on the management VLAN and ping to 10.0.0.5 succeeds, so this is not a reachability problem. The hostname, domain name, local username, and vty config all look right. Investigate the SSH server state, enable it, and confirm Jane can connect.",
    device: {"name": "ASW1", "type": "switch", "hostname": "ASW1", "vlans": {"1": {"name": "default"}, "10": {"name": "MGMT"}}, "interfaces": {"Vlan10": {"up": true, "ip": "10.0.0.5", "mode": "access", "accessVlan": 10}, "GigabitEthernet0/1": {"up": true, "mode": "access", "accessVlan": 10}}, "routes": [], "custom": {"domain": "corp.lab", "sshUser": "admin", "vtyTransport": "ssh", "rsaKeys": false, "modulus": 0, "sshVersion": 2}},
    objectives: [
    { text: "Investigate why the SSH server is not listening", hint: "show ip ssh — read the 'SSH Disabled' line and the IOS Keys field", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ssh$/i.test(c.cmd); }); } },
    { text: "Enter global configuration so the device can generate keys", hint: "enable -> configure terminal", check: function(d,log){ return d.mode === 'config' || d.mode === 'config-if'; } },
    { text: "Generate the crypto material the SSH daemon needs to start", hint: "crypto key generate rsa modulus 2048", check: function(d,log){ return d.custom && d.custom.rsaKeys === true && d.custom.modulus >= 768; } },
    { text: "Confirm the SSH server is now enabled and listening", hint: "end -> show ip ssh — should report 'SSH Enabled'", check: function(d,log){ var ok = d.custom && d.custom.rsaKeys === true && d.custom.modulus >= 768; return ok && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+ssh$/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  // FIX: crypto key generate rsa [modulus N] [general-keys] — generate RSA keys, start SSH server
  var m = raw.match(/^crypto\s+key\s+generate\s+rsa\b(?:.*?\bmodulus\s+(\d+))?/i);
  if (m && (dev.mode === 'config' || dev.mode === 'config-if')) {
    var mod = m[1] ? parseInt(m[1], 10) : 512;
    dev.custom.modulus = mod;
    dev.custom.rsaKeys = true;
    dev.__fixTime = Date.now();
    var warn = (mod < 768)
      ? '\n*' + 'Mar  1 00:04:12.123: %SSH-5-DISABLED: SSH 1.99 has been disabled (modulus < 768 is too small for SSHv2)'
      : '\n*' + 'Mar  1 00:04:12.123: %SSH-5-ENABLED: SSH 1.99 has been enabled';
    return 'The name for the keys will be: ASW1.' + dev.custom.domain + '\n'
      + 'Choose the size of the key modulus in the range of 360 to 4096 for your\n'
      + '  General Purpose Keys. Choosing a key modulus greater than 512 may take\n'
      + '  a few minutes.\n\n'
      + 'How many bits in the modulus [512]: ' + mod + '\n'
      + '% Generating ' + mod + ' bit RSA keys, keys will be non-exportable...\n'
      + '[OK] (elapsed time was 1 seconds)' + warn;
  }
  // SHOW: show ip ssh — symptom when no keys, healed after generation
  if (/^(do\s+)?show\s+ip\s+ssh$/i.test(lower)) {
    if (!dev.custom.rsaKeys || dev.custom.modulus < 768) {
      return 'SSH Disabled - version 2.0\n'
        + '%Please create RSA keys to enable SSH (and of atleast 768 bits for SSH v2).\n'
        + 'Authentication timeout: 120 secs; Authentication retries: 3\n'
        + 'Minimum expected Diffie Hellman key size : 1024 bits\n'
        + 'IOS Keys in SECSH format(ssh-rsa, base64 encoded): NONE';
    }
    return 'SSH Enabled - version 2.0\n'
      + 'Authentication methods:publickey,keyboard-interactive,password\n'
      + 'Authentication timeout: 120 secs; Authentication retries: 3\n'
      + 'Minimum expected Diffie Hellman key size : 1024 bits\n'
      + 'IOS Keys in SECSH format(ssh-rsa, base64 encoded): ASW1.' + dev.custom.domain;
  }
  // SHOW: show crypto key mypubkey rsa — supporting evidence
  if (/^(do\s+)?show\s+crypto\s+key\s+mypubkey\s+rsa$/i.test(lower)) {
    if (!dev.custom.rsaKeys) return '% Key pair was not found.';
    return '% Key pair was generated at: 00:04:12 UTC Mar 1 1993\n'
      + 'Key name: ASW1.' + dev.custom.domain + '\n'
      + 'Key type: RSA KEYS\n'
      + ' Storage Device: not specified\n'
      + ' Usage: General Purpose Key\n'
      + ' Key is not exportable.\n'
      + ' Key Data:\n'
      + '  30819F30 0D06092A 864886F7 0D010101 05000381 8D003081 89028181\n'
      + '  00C1A2B3 C4D5E6F7 081A2B3C 4D5E6F70 819A2B3C 4D5E6F70 81A2B3C4\n'
      + '  D5E6F708 1A2B3C4D 5E6F7081 9A2B3C4D 5E6F7081 A2B3C4D5 E6F70819\n'
      + '  2B3C4D5E 6F708102 03010001';
  }
  // SHOW: vty config — explains why telnet also fails
  if (/^(do\s+)?show\s+run(ning-config)?\s*\|\s*sec(tion)?\s+line\s+vty$/i.test(lower)) {
    return 'line vty 0 4\n login local\n transport input ssh\n!';
  }
  // SHOW: ping confirms reachability is fine
  if (/^(do\s+)?ping\s+10\.0\.0\.5$/i.test(lower)) {
    return 'Type escape sequence to abort.\n'
      + 'Sending 5, 100-byte ICMP Echos to 10.0.0.5, timeout is 2 seconds:\n'
      + '!!!!!\n'
      + 'Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms';
  }
  return undefined;
},
    solution: ["show ip ssh", "enable", "configure terminal", "crypto key generate rsa modulus 2048", "end", "show ip ssh"]
  },
  {
    id: "ts-svc-03", title: "Duplex mismatch on the uplink trunk", diff: "beginner", topics: ["1.3"],
    scenario: "Users on ASW1 report slow file transfers to the server behind DSW1. The uplink Gi0/24 on DSW1 is up/up but throughput is poor. DSW1 logs late collisions on Gi0/24 while ASW1 logs CRC errors on its end. Investigate the duplex/speed settings on the DSW1 uplink, let both sides auto-negotiate, and confirm the errors stop.",
    device: {"name": "DSW1", "type": "switch", "hostname": "DSW1", "vlans": {"1": {"name": "default"}}, "interfaces": {"GigabitEthernet0/24": {"up": true, "mode": "trunk", "duplex": "half", "speed": "100", "desc": "Uplink to ASW1"}}, "custom": {"peer": "ASW1", "peerPort": "Gi0/1"}},
    objectives: [
    { text: "Investigate the duplex and collision counters on the DSW1 uplink", hint: "show interfaces gi0/24 — read the duplex line and the late collision counter", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/24|g0\/24)/i.test(c.cmd); }); } },
    { text: "Enter config and select the uplink interface", hint: "configure terminal → interface gi0/24", check: function(d){ return d.currentInterface === 'GigabitEthernet0/24' || (d.interfaces['GigabitEthernet0/24'] && d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Remove the hardcoded duplex so the port auto-negotiates", hint: "no duplex half — clears the forced half-duplex setting", check: function(d){ var i=d.interfaces['GigabitEthernet0/24']; return i && i.duplex==='auto'; } },
    { text: "Remove the hardcoded speed so the port auto-negotiates", hint: "no speed 100 — clears the forced 100Mb speed", check: function(d){ var i=d.interfaces['GigabitEthernet0/24']; return i && i.speed==='auto'; } },
    { text: "Confirm the uplink now runs full-duplex with no late collisions", hint: "end → show interfaces gi0/24 — duplex should read Full-duplex and late collisions stop", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/24']; var fixed=i && i.duplex==='auto' && i.speed==='auto'; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/24|g0\/24)/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev,raw,lower){ var i = dev.interfaces['GigabitEthernet0/24']; var nd = raw.match(/^no\s+duplex(\s+\S+)?$/i); if (nd && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/24') { if (i) i.duplex = 'auto'; dev.__fixTime = Date.now(); return ''; } var ns = raw.match(/^no\s+speed(\s+\S+)?$/i); if (ns && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/24') { if (i) i.speed = 'auto'; dev.__fixTime = Date.now(); return ''; } var sd = raw.match(/^duplex\s+(half|full|auto)/i); if (sd && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/24') { if (i) i.duplex = sd[1].toLowerCase() === 'half' ? 'half' : (sd[1].toLowerCase() === 'full' ? 'full' : 'auto'); dev.__fixTime = Date.now(); return ''; } var ss = raw.match(/^speed\s+(10|100|1000|auto)/i); if (ss && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/24') { if (i) i.speed = ss[1].toLowerCase(); dev.__fixTime = Date.now(); return ''; } if (/^(do\s+)?show\s+int(erface)?(s)?\s+(gi(gabitethernet)?\s*0\/24|g0\/24)$/i.test(lower)) { var dup = i ? i.duplex : 'auto'; var spd = i ? i.speed : 'auto'; var healed = (dup === 'auto' && spd === 'auto'); var dupLine = healed ? 'Full-duplex, 1000Mb/s, media type is 10/100/1000BaseTX' : 'Half-duplex, 100Mb/s, media type is 10/100/1000BaseTX'; var lateCol = healed ? 0 : 421; var outErr = healed ? 0 : 8421; var col = healed ? 0 : 8421; return 'GigabitEthernet0/24 is up, line protocol is up\n  Hardware is Gigabit Ethernet, address is aabb.cc00.1818\n  Description: ' + (i && i.desc ? i.desc : 'Uplink to ASW1') + '\n  MTU 1500 bytes, BW ' + (healed ? '1000000' : '100000') + ' Kbit/sec, DLY 10 usec,\n  ' + dupLine + '\n  5 minute input rate 11000 bits/sec, 8 packets/sec\n  5 minute output rate 14000 bits/sec, 10 packets/sec\n     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n     ' + outErr + ' output errors, ' + col + ' collisions, ' + lateCol + ' late collision, 0 deferred'; } return undefined; },
    solution: ["show interfaces gi0/24", "enable", "configure terminal", "interface gi0/24", "no duplex half", "no speed 100", "end", "show interfaces gi0/24"]
  },
  {
    id: "ts-svc-04", title: "HSRP flapping from a tracked uplink", diff: "intermediate", topics: ["3.5"],
    scenario: "Users on the 192.168.50.0/24 LAN lose traffic for a few seconds every couple of minutes. R1 is the active router for HSRP group 50, but its state keeps changing. R1 tracks its upstream interface Gi0/0, and that uplink is bouncing: Gi0/0 is administratively up but its line protocol keeps dropping (a circuit/keepalive fault), dragging R1's effective priority below R2's so R2 preempts, then R1 climbs back and preempts again. Find the flap and stabilize it the right way (either repair the unstable Gi0/0 circuit so its line protocol holds up, or remove the HSRP track if the uplink instability is expected), then confirm HSRP settles into a steady Active state. Note: Gi0/0 is already admin-up, so 'no shutdown' will not fix a flapping line protocol.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "vlans": {}, "interfaces": {"GigabitEthernet0/1": {"up": true, "ip": "192.168.50.2", "mode": "routed"}, "GigabitEthernet0/0": {"up": true, "lineProto": false, "ip": "10.10.10.1", "keepalive": true}}, "routes": [], "custom": {"grp": 50, "vip": "192.168.50.1", "cfgPriority": 110, "trackDecrement": 20, "peerIp": "192.168.50.3", "peerPriority": 110, "vmac": "0000.0c07.ac32", "stateChanges": 8, "trackRemoved": false}},
    objectives: [
    { text: "Investigate the HSRP group on R1 to see how often it is changing state", hint: "show standby brief — read the State column, the state-change count, and the tracked interface", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+standby/i.test(c.cmd); }); } },
    { text: "Identify the tracked uplink and confirm its line-protocol status", hint: "show ip interface brief — Gi0/0 should read Status up but Protocol down (a flap, not a shut port)", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ip\s+int(erface)?\s+br(ief)?/i.test(c.cmd); }); } },
    { text: "Enter config and select the tracked uplink interface (or the HSRP interface if you choose to remove the track)", hint: "configure terminal → interface gi0/0 (circuit repair) or interface gi0/1 (to remove the track)", check: function(d,log){ return (d && (d.currentInterface === 'GigabitEthernet0/0' || d.currentInterface === 'GigabitEthernet0/1')) || (log && log.some(function(c){ return /^interface\s+(gigabitethernet|gi)0\/[01]$/i.test(c.cmd); })); } },
    { text: "Stabilize the flap the correct way: clear the Gi0/0 circuit fault so its line protocol holds up, OR remove the HSRP track on Gi0/1", hint: "On Gi0/0: 'no keepalive' to stop the keepalive-driven line-protocol bounce. OR on Gi0/1: 'no standby 50 track GigabitEthernet0/0 20' to drop the track. (no shutdown does nothing here.)", check: function(d){ var i=d.interfaces['GigabitEthernet0/0']; var circuitFixed = i && i.up===true && i.lineProto===true; var trackGone = d.custom && d.custom.trackRemoved===true; return circuitFixed || trackGone; } },
    { text: "Confirm HSRP on R1 is steady Active at full priority 110 with no further state churn", hint: "end → show standby brief (or show standby gi0/1) — State Active, priority 110, no STATECHANGE log", check: function(d,log){ var i=d.interfaces['GigabitEthernet0/0']; var circuitFixed = i && i.up===true && i.lineProto===true; var trackGone = d.custom && d.custom.trackRemoved===true; var fixed = circuitFixed || trackGone; if(!fixed) return false; var fixIdx=-1; for(var k=0;k<log.length;k++){ var lc=log[k].cmd.toLowerCase(); if(/^no\s+keepalive(\s+\d+)?$/.test(lc) || /^no\s+standby\s+\d+\s+track\s+/.test(lc)){ fixIdx=k; } } if(fixIdx<0) return false; for(var m=fixIdx+1;m<log.length;m++){ if(/^(do\s+)?sh(ow)?\s+standby/i.test(log[m].cmd)) return true; } return false; } }
    ],
    extraCmds: function(dev,raw,lower){
  var u=dev.interfaces['GigabitEthernet0/0'];
  var g1=dev.interfaces['GigabitEthernet0/1'];
  var c=dev.custom;

  // ---- WRONG REMEDY: no shutdown on Gi0/0 is a no-op (port is already admin-up) ----
  // The fault is a flapping LINE PROTOCOL, not an admin-down port, so re-enabling does nothing.
  if(/^no\s+shut(d(own)?)?$/i.test(raw) && dev.mode==='config-if' && dev.currentInterface==='GigabitEthernet0/0'){
    u.up=true; // already true; line protocol stays down, the flap is unresolved
    return '% GigabitEthernet0/0 is already up; line protocol still flapping (no carrier from the circuit)';
  }

  // ---- FIX A: clear the circuit fault so the line protocol holds up ----
  // 'no keepalive' stops the keepalive-driven UPDOWN bounce on the unstable circuit.
  if(/^no\s+keepalive(\s+\d+)?$/i.test(raw) && dev.mode==='config-if' && dev.currentInterface==='GigabitEthernet0/0'){
    u.keepalive=false; u.up=true; u.lineProto=true; dev.__fixTime=Date.now();
    return '%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to up (and stable)';
  }

  // ---- FIX B: remove the HSRP track on the HSRP interface (Gi0/1) ----
  // Track must name the SAME interface (Gi0/0) and group 50; the decrement is optional in the negation.
  var trk=raw.match(/^no\s+standby\s+(\d+)\s+track\s+(gigabitethernet|gi)\s*0\/0(\s+\d+)?$/i);
  if(trk && parseInt(trk[1],10)===c.grp && dev.mode==='config-if' && dev.currentInterface==='GigabitEthernet0/1'){
    c.trackRemoved=true; dev.__fixTime=Date.now();
    return ''; // track removed: effective priority no longer drops with the uplink
  }

  // helpers ----
  var uplinkHealthy=u.up && u.lineProto;                 // circuit actually stable?
  // R1's effective priority only drops while the track is still in place AND the uplink is unhealthy
  var trackActive = !c.trackRemoved;
  var effPriority = (trackActive && !uplinkHealthy) ? (c.cfgPriority - c.trackDecrement) : c.cfgPriority;
  var stable = effPriority >= c.peerPriority;            // R1 wins => steady Active
  // tracked interface state as HSRP sees it (only meaningful while the track exists)
  var trackState = uplinkHealthy ? 'Up' : 'Down';

  // ---- show ip interface brief (with or without an include filter) ----
  if(/^(do\s+)?show\s+ip\s+int(erface)?\s+br(ief)?(\s*\|\s*i(nclude)?\s+\S+)?$/i.test(lower)){
    var g1proto = g1.up ? 'up' : 'down';
    var g0proto = u.lineProto ? 'up' : 'down';
    // admin state is driven by u.up; the broken state is admin-up / proto-down (a flap), NOT admin-down
    var g0admin = u.up ? 'up' : 'administratively down';
    var rows=[
      ['GigabitEthernet0/0', u.ip, 'YES NVRAM', g0admin, g0proto],
      ['GigabitEthernet0/1', g1.ip, 'YES NVRAM', 'up', g1proto]
    ];
    var inc=lower.match(/\|\s*i(nclude)?\s+(\S+)/i);
    if(inc){ rows=rows.filter(function(r){ return r[0].toLowerCase().indexOf(inc[2].toLowerCase().replace('gi','gigabitethernet'))===0; }); }
    var out='Interface              IP-Address      OK? Method Status                Protocol\n';
    rows.forEach(function(r){ out+= r[0].padEnd(23)+r[1].padEnd(16)+r[2].padEnd(7)+r[3].padEnd(22)+r[4]+'\n'; });
    return out.replace(/\n$/,'');
  }

  // ---- show standby brief (the natural HSRP triage command) ----
  if(/^(do\s+)?show\s+standby\s+brief$/i.test(lower)){
    var stB = stable ? 'Active' : 'Speak';
    var activeB = stable ? 'local' : c.peerIp;
    var standbyB = stable ? c.peerIp : 'unknown';
    var hdr='                     P indicates configured to preempt.\n'
      +'                     |\n'
      +'Interface   Grp  Pri P State    Active          Standby         Virtual IP\n';
    var rowB='Gi0/1       '+c.grp+'   '+effPriority+'  P '+stB.padEnd(8)+' '+activeB.padEnd(15)+' '+standbyB.padEnd(15)+' '+c.vip;
    if(!stable){ rowB += '\n\n*Mar  1 14:24:02.778: %HSRP-5-STATECHANGE: GigabitEthernet0/1 Grp '+c.grp+' state Standby -> Active'; }
    return hdr+rowB;
  }

  // ---- show standby [gi0/1] ----
  if(/^(do\s+)?show\s+standby(\s+gi(gabitethernet)?0\/1)?$/i.test(lower)){
    var state = stable ? 'Active' : 'Speak';
    var sc = stable ? c.stateChanges : (c.stateChanges + 1);
    var lastChange = stable ? '00:04:18' : '00:00:02';
    var activeLine = stable ? '  Active router is local'
                            : '  Active router is '+c.peerIp+', priority '+c.peerPriority;
    // Speak state: this router has NOT been elected Standby, so it is not the local Standby router
    var standbyLine = stable ? '  Standby router is '+c.peerIp+', priority '+c.peerPriority+' (expires in 9.024 sec)'
                             : '  Standby router is unknown';
    var trackLine = c.trackRemoved ? ''
      : '\n    Track interface GigabitEthernet0/0 state '+trackState+' decrement '+c.trackDecrement;
    var out='GigabitEthernet0/1 - Group '+c.grp+'\n'
      +'  State is '+state+'\n'
      +'    '+sc+' state changes, last state change '+lastChange+'\n'
      +'  Virtual IP address is '+c.vip+'\n'
      +'  Active virtual MAC address is '+c.vmac+'\n'
      +'    Local virtual MAC address is '+c.vmac+' (v1 default)\n'
      +'  Hello time 3 sec, hold time 10 sec\n'
      +'    Next hello sent in 1.840 secs\n'
      +'  Preemption enabled\n'
      +activeLine+'\n'
      +standbyLine+'\n'
      +'  Priority '+effPriority+' (configured '+c.cfgPriority+')'+trackLine+'\n'
      +'  Group name is "hsrp-Gi0/1-'+c.grp+'" (default)';
    if(!stable){ out += '\n\n*Mar  1 14:24:02.778: %HSRP-5-STATECHANGE: GigabitEthernet0/1 Grp '+c.grp+' state Standby -> Active'; }
    return out;
  }

  return undefined;
},
    solution: ["show standby brief", "show ip interface brief", "enable", "configure terminal", "interface gi0/0", "no keepalive", "end", "show standby brief"]
  },
  {
    id: "ts-svc-05", title: "HSRP stuck in Speak — auth key mismatch", diff: "intermediate", topics: ["3.5"],
    scenario: "R1 and R2 should form HSRP group 10 on Gi0/1 for the user LAN, but neither becomes Active for virtual IP 192.168.10.1 — both sit in Speak and users have no gateway. R1 logs %HSRP-4-BADAUTH from the peer at 192.168.10.3. The peer R2 uses MD5 key-string \"cisco123\". Investigate R1's HSRP state and authentication, fix R1 so its key matches the peer, and confirm R1 reaches Active.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "vlans": {}, "interfaces": {"GigabitEthernet0/1": {"up": true, "ip": "192.168.10.2", "mode": "access", "hsrpGrp": 10, "hsrpVip": "192.168.10.1", "hsrpPri": 100, "hsrpKey": "CISCO123", "hsrpState": "Speak"}}, "routes": [], "custom": {"peerIp": "192.168.10.3", "peerKey": "cisco123", "peerPri": 100, "grp": 10, "vip": "192.168.10.1", "vmac": "0000.0c07.ac0a"}},
    objectives: [
    { text: "Investigate — view the HSRP group state on R1 and find why it is not Active", hint: "show standby brief — read the State column (Speak) and the BADAUTH log", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+standby(\s+br(ief)?)?$/i.test(c.cmd); }); } },
    { text: "Inspect the HSRP authentication detail on the interface to spot the key problem", hint: "show standby gi0/1 — compare the MD5 key-string against the peer", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+standby\s+(gi(gabitethernet)?\s*)?0\/1$/i.test(c.cmd); }); } },
    { text: "Enter config and select the HSRP interface on R1", hint: "configure terminal → interface gi0/1", check: function(d){ return d.currentInterface === 'GigabitEthernet0/1' || (d.interfaces['GigabitEthernet0/1'] && d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Set R1's HSRP MD5 key-string so it matches the peer (keys are case-sensitive)", hint: "standby 10 authentication md5 key-string cisco123", check: function(d){ var i = d.interfaces['GigabitEthernet0/1']; return i && i.hsrpKey === d.custom.peerKey; } },
    { text: "Confirm — R1 now authenticates the peer and wins the election (Active)", hint: "end → show standby brief — R1 State should be Active, no more BADAUTH", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/1']; var fixed = i && i.hsrpKey === d.custom.peerKey; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+standby(\s+br(ief)?)?$/i.test(c.cmd) && c.time > (d.__fixTime || 0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  var iface = dev.interfaces['GigabitEthernet0/1'];
  var authOk = function(){ return iface && iface.hsrpKey === dev.custom.peerKey; };
  var stateFor = function(){ return authOk() ? 'Active' : 'Speak'; };

  // FIX: standby <grp> authentication md5 key-string <key> — only the configured group (10) heals
  var m = raw.match(/^standby\s+(\d+)\s+authentication\s+md5\s+key-string\s+(\S+)/i);
  if (m && m[1] === String(dev.custom.grp) && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/1') {
    if (!dev.interfaces['GigabitEthernet0/1']) dev.interfaces['GigabitEthernet0/1'] = {};
    dev.interfaces['GigabitEthernet0/1'].hsrpKey = m[2];
    dev.__fixTime = Date.now();
    return '';
  }

  // show standby brief
  if (/^(do\s+)?show\s+standby(\s+brief)?$/i.test(lower)) {
    var st = stateFor();
    var active = (st === 'Active') ? 'local' : 'unknown';
    var standby = (st === 'Active') ? dev.custom.peerIp : 'unknown';
    var hdr = '                     P indicates configured to preempt.\n'
      + '                     |\n'
      + 'Interface   Grp  Pri P State    Active          Standby         Virtual IP\n';
    var row = 'Gi0/1       ' + dev.custom.grp + '   ' + (iface ? iface.hsrpPri : 100) + '   '
      + st.padEnd(8) + ' ' + active.padEnd(15) + ' ' + standby.padEnd(15) + ' ' + dev.custom.vip + '\n';
    var warn = authOk() ? '' : '\n*Jun  1 09:01:11: %HSRP-4-BADAUTH: Bad authentication from ' + dev.custom.peerIp + ', group ' + dev.custom.grp + ', remote state Speak';
    return hdr + row + warn;
  }

  // show standby gi0/1
  if (/^(do\s+)?show\s+standby\s+(gi(gabitethernet)?\s*)?0\/1$/i.test(lower)) {
    var ok = authOk();
    var st2 = stateFor();
    var activeMac = ok ? dev.custom.vmac : 'unknown';
    var activeRtr = (st2 === 'Active') ? 'local' : 'unknown';
    var standbyRtr = (st2 === 'Active') ? (dev.custom.peerIp + ' (peer)') : 'unknown';
    return 'GigabitEthernet0/1 - Group ' + dev.custom.grp + '\n'
      + '  State is ' + st2 + '\n'
      + '  Virtual IP address is ' + dev.custom.vip + '\n'
      + '  Active virtual MAC address is ' + activeMac + '\n'
      + '  Local virtual MAC address is ' + dev.custom.vmac + ' (v1 default)\n'
      + '  Hello time 3 sec, hold time 10 sec\n'
      + '  Authentication MD5, key-string "' + (iface ? iface.hsrpKey : 'CISCO123') + '"\n'
      + '  Preemption disabled\n'
      + '  Active router is ' + activeRtr + '\n'
      + '  Standby router is ' + standbyRtr + '\n'
      + '  Priority ' + (iface ? iface.hsrpPri : 100) + ' (default 100)'
      + (ok ? '' : '\n  ! Peer ' + dev.custom.peerIp + ' uses key-string "' + dev.custom.peerKey + '" — keys are case-sensitive');
  }

  // show running-config | section standby
  if (/^(do\s+)?show\s+run(ning-config)?\s*\|\s*(s|sec(tion)?)\s+standby$/i.test(lower)) {
    return 'interface GigabitEthernet0/1\n'
      + ' standby ' + dev.custom.grp + ' ip ' + dev.custom.vip + '\n'
      + ' standby ' + dev.custom.grp + ' authentication md5 key-string ' + (iface ? iface.hsrpKey : 'CISCO123');
  }

  return undefined;
},
    solution: ["show standby brief", "show standby gi0/1", "enable", "configure terminal", "interface gi0/1", "standby 10 authentication md5 key-string cisco123", "end", "show standby brief"]
  },
  {
    id: "ts-svc-06", title: "NTP client stuck at stratum 16", diff: "intermediate", topics: ["4.2"],
    scenario: "R1 pulls time from internal NTP server 10.0.0.250, but NMS reports R1 as \"unsynchronized\" and TACACS auth is failing intermittently as timestamps drift. The link to the server is fine (ping is 5/5). The server admin confirms the corporate NTP server signs with key id 2, string CORPNTPKEY. Investigate why R1 will not sync, then fix R1's NTP authentication so the association reaches and R1 leaves stratum 16.",
    device: {"name": "R1", "type": "router", "hostname": "R1", "vlans": {}, "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.10.10.1", "mode": "routed"}}, "routes": [], "custom": {"ntpServer": "10.0.0.250", "ntpAuthenticate": true, "serverKeyId": 2, "serverKeyString": "CORPNTPKEY", "keys": {"1": "SOMEKEY"}, "trustedKeys": [1], "serverBoundKey": 1}},
    objectives: [
    { text: "Investigate the clock sync state and the association to the time server", hint: "show ntp associations — read the refid (.INIT.) and reach (0) for the configured server", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+ntp\s+ass/i.test(c.cmd); }); } },
    { text: "Confirm the authentication failure cause from the local config or debug", hint: "show running-config | include ntp  — compare R1's trusted-key/server key against the key the server uses", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+run.*ntp/i.test(c.cmd) || /^(do\s+)?debug\s+ntp\s+auth/i.test(c.cmd); }); } },
    { text: "Create the authentication key the server actually uses and mark it trusted", hint: "configure terminal → ntp authentication-key 2 md5 CORPNTPKEY → ntp trusted-key 2", check: function(d){ var c=d.custom||{}; return c.keys && c.keys['2']==='CORPNTPKEY' && (c.trustedKeys||[]).indexOf(2)>=0; } },
    { text: "Bind the time server association to the correct key", hint: "ntp server 10.0.0.250 key 2", check: function(d){ var c=d.custom||{}; return String(c.serverBoundKey)==='2'; } },
    { text: "Confirm R1 now synchronizes and leaves stratum 16", hint: "end → show ntp status — stratum drops below 16 and a reference clock appears", check: function(d,log){ var c=d.custom||{}; var fixed=c.keys&&c.keys['2']==='CORPNTPKEY'&&(c.trustedKeys||[]).indexOf(2)>=0&&String(c.serverBoundKey)==='2'; return fixed && log.some(function(x){ return /^(do\s+)?sh(ow)?\s+ntp\s+stat/i.test(x.cmd) && x.time>(d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  var c = dev.custom = dev.custom || {};
  c.keys = c.keys || {};
  c.trustedKeys = c.trustedKeys || [];
  var synced = function(){ return c.keys[String(c.serverKeyId)] === c.serverKeyString && c.trustedKeys.indexOf(c.serverKeyId) >= 0 && String(c.serverBoundKey) === String(c.serverKeyId); };

  // ── FIX commands ──
  var mk = raw.match(/^ntp\s+authentication-key\s+(\d+)\s+md5\s+(\S+)/i);
  if (mk && dev.mode && dev.mode.indexOf('config') === 0) {
    c.keys[mk[1]] = mk[2];
    dev.__fixTime = Date.now();
    return '';
  }
  var mt = raw.match(/^ntp\s+trusted-key\s+(\d+)/i);
  if (mt && dev.mode && dev.mode.indexOf('config') === 0) {
    var k = parseInt(mt[1], 10);
    if (c.trustedKeys.indexOf(k) < 0) c.trustedKeys.push(k);
    dev.__fixTime = Date.now();
    return '';
  }
  var ms = raw.match(/^ntp\s+server\s+(\S+)\s+key\s+(\d+)/i);
  if (ms && dev.mode && dev.mode.indexOf('config') === 0) {
    c.serverBoundKey = parseInt(ms[2], 10);
    dev.__fixTime = Date.now();
    return '';
  }

  // ── Fault-specific SHOW output ──
  if (/^(do\s+)?show\s+ntp\s+stat(us)?$/i.test(lower)) {
    if (synced()) {
      return 'Clock is synchronized, stratum 3, reference is 10.0.0.250\n'
        + 'nominal freq is 250.0000 Hz, actual freq is 250.0000 Hz, precision is 2**18\n'
        + 'reference time is E3A1F4C2.7B4395A4 (14:22:58.481 UTC ' + 'Wed Jun 13 2026)\n'
        + 'clock offset is 1.2143 msec, root delay is 2.41 msec\n'
        + 'root dispersion is 4.18 msec, peer dispersion is 1.02 msec\n'
        + 'loopfilter state is \'CTRL\' (Normal Controlled Loop), drift is 0.000000012 s/s\n'
        + 'system poll interval is 64, last update was 11 sec ago.';
    }
    return 'Clock is unsynchronized, stratum 16, no reference clock\n'
      + 'nominal freq is 250.0000 Hz, actual freq is 250.0000 Hz, precision is 2**18\n'
      + 'reference time is 00000000.00000000 (00:00:00.000 UTC Mon Jan 1 1900)\n'
      + 'clock offset is 0.0000 msec, root delay is 0.00 msec\n'
      + 'root dispersion is 0.00 msec, peer dispersion is 0.00 msec\n'
      + 'loopfilter state is \'FSET\' (Drift set from file), drift is 0.000000000 s/s\n'
      + 'system poll interval is 64, never updated.';
  }

  if (/^(do\s+)?show\s+ntp\s+ass(oc(iations)?)?$/i.test(lower)) {
    var srv = c.ntpServer || '10.0.0.250';
    if (synced()) {
      return '  address         ref clock       st   when   poll reach  delay  offset    disp\n'
        + ' *~' + srv.padEnd(13) + ' .GPS.            2     14     64  377  2.410   1.214   1.024\n'
        + ' * sys.peer, # selected, + candidate, - outlyer, x falseticker, ~ configured';
    }
    return '  address         ref clock       st   when   poll reach  delay  offset    disp\n'
      + ' ~' + srv.padEnd(13) + ' .INIT.          16      -     64    0  0.000   0.000  15937.\n'
      + ' * sys.peer, # selected, + candidate, - outlyer, x falseticker, ~ configured';
  }

  if (/^(do\s+)?show\s+run(ning-config)?\s*\|\s*i(nc(lude)?)?\s+ntp/i.test(lower)) {
    var out = '';
    if (c.ntpAuthenticate) out += 'ntp authenticate\n';
    Object.keys(c.keys).sort().forEach(function(id){ out += 'ntp authentication-key ' + id + ' md5 ' + c.keys[id] + ' 7\n'; });
    c.trustedKeys.slice().sort(function(a,b){return a-b;}).forEach(function(k){ out += 'ntp trusted-key ' + k + '\n'; });
    out += 'ntp server ' + (c.ntpServer || '10.0.0.250') + ' key ' + c.serverBoundKey;
    return out;
  }

  if (/^(do\s+)?debug\s+ntp\s+auth(entication)?$/i.test(lower)) {
    if (synced()) {
      return 'NTP: authentication passed for packet from ' + (c.ntpServer || '10.0.0.250') + ' (key ' + c.serverKeyId + ')\n'
        + 'NTP: MD5 digest verification succeeded';
    }
    return 'NTP: authentication failed for packet from ' + (c.ntpServer || '10.0.0.250') + '\n'
      + 'NTP: Crypto-NAK rcvd from ' + (c.ntpServer || '10.0.0.250') + ' (key id mismatch: rcvd key ' + c.serverKeyId + ', configured trusted-key ' + (c.trustedKeys[0] || 1) + ')\n'
      + 'NTP: dropping packet, MD5 digest verification failed';
  }

  if (/^(do\s+)?ping\s+/i.test(lower)) {
    return 'Type escape sequence to abort.\n'
      + 'Sending 5, 100-byte ICMP Echos to ' + (c.ntpServer || '10.0.0.250') + ', timeout is 2 seconds:\n'
      + 'Packet sent with a source address of 10.10.10.1\n'
      + '!!!!!\n'
      + 'Success rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms';
  }

  return undefined;
},
    solution: ["show ntp associations", "show running-config | include ntp", "enable", "configure terminal", "ntp authentication-key 2 md5 CORPNTPKEY", "ntp trusted-key 2", "ntp server 10.0.0.250 key 2", "end", "show ntp status"]
  },
  {
    id: "ts-svc-07", title: "Port-security err-disabled on ASW1 Gi0/5", diff: "intermediate", topics: ["5.7"],
    scenario: "A user on ASW1 Gi0/5 lost link about 30 seconds after plugging a small unmanaged desk switch in to share the port with a phone. The port LED is amber and the PC is offline. Investigate why Gi0/5 went down, then recover it on ASW1 so two devices (PC + phone) can share the port without tripping the violation again.",
    device: {"name": "ASW1", "type": "switch", "hostname": "ASW1", "vlans": {"20": {"name": "USERS"}}, "interfaces": {"GigabitEthernet0/5": {"up": false, "mode": "access", "accessVlan": 20, "description": "User-Desk-PC", "portSecurity": true, "psecMax": 1, "psecViolation": "shutdown", "psecSticky": true, "errDisabled": true, "errReason": "psecure-violation"}}, "custom": {"violationMac": "0050.5687.aa42", "secureMac": "0050.5687.aa10"}},
    objectives: [
    { text: "Investigate — find which ports the switch has placed in err-disabled and the reason", hint: "show interfaces status err-disabled — read the Reason column", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+stat(us)?\s+err/i.test(c.cmd); }); } },
    { text: "Confirm the cause on the affected port — inspect its port-security state", hint: "show port-security interface gi0/5 — check Port Status, Max MAC, Violation Count", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+port-sec(urity)?\s+int(erface)?\s+gi?0\/5/i.test(c.cmd); }); } },
    { text: "Enter config + select the affected port", hint: "configure terminal → interface gi0/5", check: function(d){ return d.currentInterface === 'GigabitEthernet0/5' || (d.interfaces['GigabitEthernet0/5'] && d.mode && d.mode.indexOf('config') === 0); } },
    { text: "Raise the secure-MAC limit so the PC and phone can both learn", hint: "switchport port-security maximum 2", check: function(d){ var i = d.interfaces['GigabitEthernet0/5']; return i && Number(i.psecMax) >= 2; } },
    { text: "Recover the err-disabled port (bounce it) and confirm it comes back up", hint: "shutdown → no shutdown, then show interfaces status err-disabled (list should be empty)", check: function(d,log){ var i = d.interfaces['GigabitEthernet0/5']; return !!(i && !i.errDisabled && i.up && Number(i.psecMax) >= 2 && d.__fixTime); } }
    ],
    extraCmds: function(dev, raw, lower){
  var i = dev.interfaces['GigabitEthernet0/5'];
  // --- FIX 1: raise the port-security maximum ---
  var m = raw.match(/^switchport\s+port-security\s+maximum\s+(\d+)/i);
  if (m && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/5') {
    if (!dev.interfaces[dev.currentInterface]) dev.interfaces[dev.currentInterface] = {};
    dev.interfaces[dev.currentInterface].psecMax = parseInt(m[1], 10);
    dev.__fixTime = Date.now();
    return '';
  }
  // --- FIX 2a: shutdown (part of the err-disable recovery bounce) ---
  if (/^shut(down)?$/i.test(lower) && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/5') {
    dev.interfaces[dev.currentInterface].up = false;
    dev.interfaces[dev.currentInterface].__shutSeen = true;
    return '';
  }
  // --- FIX 2b: no shutdown — clears err-disable IF max was already raised ---
  if (/^no\s+shut(down)?$/i.test(lower) && dev.mode === 'config-if' && dev.currentInterface === 'GigabitEthernet0/5') {
    var if5 = dev.interfaces[dev.currentInterface];
    if (Number(if5.psecMax) >= 2) {
      if5.errDisabled = false;
      if5.errReason = '';
      if5.up = true;
      dev.__fixTime = Date.now();
      return '%LINK-3-UPDOWN: Interface GigabitEthernet0/5, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/5, changed state to up';
    } else {
      // bounced without fixing root cause: violation re-trips immediately
      if5.up = false;
      if5.errDisabled = true;
      if5.errReason = 'psecure-violation';
      return '%PM-4-ERR_DISABLE: psecure-violation error detected on Gi0/5, putting Gi0/5 in err-disable state';
    }
  }
  // --- SHOW: interfaces status err-disabled (symptom -> heals) ---
  if (/^(do\s+)?show\s+int(erface)?(s)?\s+stat(us)?\s+err-?disabled?$/i.test(lower)) {
    var hdr = 'Port      Name               Status               Reason               Err-disabled Vlans\n';
    if (i && i.errDisabled) {
      return hdr + 'Gi0/5     ' + (i.description || '').padEnd(19) + 'err-disabled'.padEnd(21) + (i.errReason || '');
    }
    return hdr;
  }
  // --- SHOW: port-security interface gi0/5 (symptom -> heals) ---
  if (/^(do\s+)?show\s+port-sec(urity)?\s+int(erface)?\s+gi?0\/5$/i.test(lower)) {
    if (!i) return '';
    var status = i.errDisabled ? 'Secure-shutdown' : 'Secure-up';
    var total = i.errDisabled ? 1 : 1;
    var viol  = i.errDisabled ? 1 : 0;
    var last  = i.errDisabled
      ? dev.custom.violationMac + ':' + i.accessVlan
      : dev.custom.secureMac + ':' + i.accessVlan;
    return 'Port Security              : Enabled\n'
      + 'Port Status                : ' + status + '\n'
      + 'Violation Mode             : Shutdown\n'
      + 'Aging Time                 : 0 mins\n'
      + 'Aging Type                 : Absolute\n'
      + 'SecureStatic Address Aging : Disabled\n'
      + 'Maximum MAC Addresses      : ' + i.psecMax + '\n'
      + 'Total MAC Addresses        : ' + total + '\n'
      + 'Configured MAC Addresses   : 0\n'
      + 'Sticky MAC Addresses       : 1\n'
      + 'Last Source Address:Vlan   : ' + last + '\n'
      + 'Security Violation Count   : ' + viol;
  }
  // --- SHOW: logging filtered to Gi0/5 (evidence, stays as history) ---
  if (/^(do\s+)?show\s+logging(\s+\|\s+inc(lude)?\s+gi?0\/5)?$/i.test(lower)) {
    return '%PM-4-ERR_DISABLE: psecure-violation error detected on Gi0/5, putting Gi0/5 in err-disable state\n'
      + '%PORT_SECURITY-2-PSECURE_VIOLATION: Security violation occurred, caused by MAC address '
      + dev.custom.violationMac + ' on port GigabitEthernet0/5.';
  }
  return undefined;
},
    solution: ["show interfaces status err-disabled", "show port-security interface gi0/5", "enable", "configure terminal", "interface gi0/5", "switchport port-security maximum 2", "shutdown", "no shutdown", "end", "show interfaces status err-disabled"]
  },
  {
    id: "ts-svc-08", title: "vty access-class denies the jump host", diff: "intermediate", topics: ["5.3"],
    scenario: "Admins SSH into DSW1 fine from the management LAN (10.0.0.0/24), but the corporate jump host at 172.16.5.10 always gets \"Connection closed by remote host\" right after the SSH banner. SSH is enabled and the RSA key is present. Find why the jump host's sessions are being torn down at the vty line, add it to the allowed sources, and confirm.",
    device: {"name": "DSW1", "type": "switch", "hostname": "DSW1", "vlans": {"1": {"name": "default"}}, "interfaces": {"Vlan1": {"up": true, "ip": "10.0.0.6", "mode": "access", "accessVlan": 1}}, "custom": {"acl": {"name": "MGMT-IN", "entries": [{"seq": 10, "action": "permit", "net": "10.0.0.0", "wild": "0.0.0.255", "matches": 143}, {"seq": 20, "action": "deny", "net": "any", "wild": "", "matches": 27}]}, "vtyAcl": "MGMT-IN", "jumpHost": "172.16.5.10"}},
    objectives: [
    { text: "Investigate which sources the vty lines accept by reading the inbound filter", hint: "the vty filter is a standard ACL — show access-lists MGMT-IN", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+access-lists?(\s+MGMT-IN)?$/i.test(c.cmd);});} },
    { text: "Enter config and select the named standard ACL for editing", hint: "configure terminal → ip access-list standard MGMT-IN", check: function(d,log){return d.custom && d.custom.aclEditing==='MGMT-IN';} },
    { text: "Add a permit entry that lets the jump host subnet through", hint: "permit 172.16.5.0 0.0.0.255 — match the whole /24, not a single host", check: function(d,log){var e=d.custom&&d.custom.acl&&d.custom.acl.entries||[];return e.some(function(x){return x.action==='permit'&&x.net==='172.16.5.0'&&x.wild==='0.0.0.255';});} },
    { text: "Confirm the jump host is now permitted by re-reading the ACL", hint: "end → show access-lists MGMT-IN — 172.16.5.0, wildcard bits 0.0.0.255 should appear before the deny", check: function(d,log){var e=d.custom&&d.custom.acl&&d.custom.acl.entries||[];var fixed=e.some(function(x){return x.action==='permit'&&x.net==='172.16.5.0'&&x.wild==='0.0.0.255';});return fixed&&log.some(function(c){return /^(do\s+)?sh(ow)?\s+access-lists?(\s+MGMT-IN)?$/i.test(c.cmd)&&c.time>(d.__fixTime||0);});} }
    ],
    extraCmds: function(dev,raw,lower){
  if(!dev.custom)dev.custom={};
  if(!dev.custom.acl)dev.custom.acl={name:'MGMT-IN',entries:[]};
  // enter named standard ACL edit mode
  var en=raw.match(/^ip\s+access-list\s+standard\s+(\S+)/i);
  if(en){dev.custom.aclEditing=en[1];dev.mode='config-acl';dev.currentInterface=null;return '';}
  // add a permit/deny entry while editing the ACL (only in config-acl mode, so a stray permit at another prompt can't mutate it)
  if(dev.custom.aclEditing&&dev.mode==='config-acl'){
    var pm=raw.match(/^(permit|deny)\s+(?:host\s+)?(\d+\.\d+\.\d+\.\d+)(?:\s+(\d+\.\d+\.\d+\.\d+))?/i);
    if(pm){
      var net=pm[2],wild=pm[3]||'0.0.0.0';
      var ents=dev.custom.acl.entries;
      var denyIdx=ents.findIndex(function(x){return x.action==='deny'&&x.net==='any';});
      var maxSeq=ents.reduce(function(a,x){return Math.max(a,x.seq||0);},0);
      var entry={seq:maxSeq+10,action:pm[1].toLowerCase(),net:net,wild:net==='any'?'':wild,matches:0};
      if(denyIdx>=0){entry.seq=ents[denyIdx].seq-1;ents.splice(denyIdx,0,entry);}else{ents.push(entry);}
      dev.__fixTime=Date.now();
      return '';
    }
    var pa=raw.match(/^permit\s+any/i);
    if(pa){var ents2=dev.custom.acl.entries;var mx=ents2.reduce(function(a,x){return Math.max(a,x.seq||0);},0);ents2.push({seq:mx+10,action:'permit',net:'any',wild:'',matches:0});dev.__fixTime=Date.now();return '';}
  }
  // exit ACL edit mode back to global config
  if(dev.custom.aclEditing&&(lower==='exit')){dev.custom.aclEditing=null;dev.mode='config';return '';}
  // show ip ssh — proves SSH/key are fine (not the problem)
  if(/^(do\s+)?show\s+ip\s+ssh$/i.test(lower)){
    return 'SSH Enabled - version 2.0\nAuthentication timeout: 120 secs; Authentication retries: 3\nMinimum expected Diffie Hellman key size : 1024 bits\nIOS Keys in SECSH format(ssh-rsa, base64 encoded): ssh-rsa AAAA...';
  }
  // show access-lists [MGMT-IN] — the fault show: renders from state, heals after fix
  if(/^(do\s+)?show\s+access-lists?(\s+MGMT-IN)?$/i.test(lower)){
    var acl=dev.custom.acl;
    var out='Standard IP access list '+acl.name+'\n';
    var jh=dev.custom.jumpHost||'172.16.5.10';
    var permitted=acl.entries.some(function(x){return x.action==='permit'&&x.net==='172.16.5.0'&&x.wild==='0.0.0.255';});
    acl.entries.forEach(function(x){
      if(x.action==='deny'&&x.net==='any'){
        out+='    '+x.seq+' deny   any';
        out+=(x.matches?' ('+x.matches+' matches)':'')+'\n';
      }else if(x.net==='any'){
        out+='    '+x.seq+' permit any\n';
      }else{
        out+='    '+x.seq+' permit '+x.net+', wildcard bits '+x.wild+(x.matches?' ('+x.matches+' matches)':'')+'\n';
      }
    });
    if(!permitted){
      out+='\n% Jump host '+jh+' is not matched by any permit — it falls into the deny any and the vty session is torn down.';
    }else{
      out+='\n% Jump host '+jh+' now matches a permit entry — vty sessions from 172.16.5.0/24 are allowed.';
    }
    return out;
  }
  // show running-config | section line vty — context for the access-class
  if(/^(do\s+)?show\s+run(ning-config)?\s*\|\s*sec(tion)?\s+line\s+vty$/i.test(lower)){
    return 'line vty 0 4\n access-class MGMT-IN in\n login local\n transport input ssh\n!\nline vty 5 15\n access-class MGMT-IN in\n login local\n transport input ssh\n!';
  }
  return undefined;
},
    solution: ["show access-lists MGMT-IN", "enable", "configure terminal", "ip access-list standard MGMT-IN", "permit 172.16.5.0 0.0.0.255", "end", "show access-lists MGMT-IN"]
  },
  {
    id: "ts-svc-09", title: "Syslog server seeing nothing from R2", diff: "advanced", topics: ["4.5"],
    scenario: "The central syslog server (10.0.0.20) collects logs from R1, R3, and most switches, but R2 has been silent for a week and the NOC needs its events for change auditing. R2 can reach 10.0.0.20 and the logging host is configured. Read R2's logging state, find why only severity-0 events ever leave the box, raise the trap level so routine events reach the server, then confirm.",
    device: {"name": "R2", "type": "router", "hostname": "R2", "vlans": {}, "interfaces": {"GigabitEthernet0/0": {"up": true, "ip": "10.0.0.2", "mode": "routed"}}, "routes": [], "custom": {"loggingHost": "10.0.0.20", "loggingTrap": "emergencies", "msgLinesLogged": 0, "rateLimited": 1421}},
    objectives: [
    { text: "Investigate — inspect R2's logging configuration and the trap level it is sending at", hint: "show logging — read the 'Trap logging: level X' line and the 'message lines logged' counter", check: function(d,log){ return log.some(function(c){ return /^(do\s+)?sh(ow)?\s+logg(ing)?/i.test(c.cmd); }); } },
    { text: "Enter global configuration mode on R2", hint: "enable → configure terminal", check: function(d,log){ return d.mode && d.mode.indexOf('config')===0; } },
    { text: "Raise the syslog trap severity so routine notification-level and above events reach the host", hint: "the routine LINK/LINEPROTO/OSPF events are severity 5 — set the trap to notifications or lower-priority (higher number) than emergencies (0)", check: function(d,log){ var map={'emergencies':0,'alerts':1,'critical':2,'errors':3,'warnings':4,'notifications':5,'informational':6,'debugging':7,'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7}; var t=String(d.custom.loggingTrap||'').toLowerCase(); var lvl=map[t]; return typeof lvl==='number' && lvl>=5; } },
    { text: "Confirm — the trap level now permits routine events and the host will receive logs", hint: "end → show logging — 'Trap logging' now reads notifications/informational/debugging and the message-lines-logged counter is nonzero", check: function(d,log){ var map={'emergencies':0,'alerts':1,'critical':2,'errors':3,'warnings':4,'notifications':5,'informational':6,'debugging':7,'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7}; var t=String(d.custom.loggingTrap||'').toLowerCase(); var lvl=map[t]; var fixed = typeof lvl==='number' && lvl>=5; return fixed && log.some(function(c){ return /^(do\s+)?sh(ow)?\s+logg(ing)?/i.test(c.cmd) && c.time>(d.__fixTime||0); }); } }
    ],
    extraCmds: function(dev,raw,lower){
  // FIX: logging trap <level|number> — global config command
  var m = raw.match(/^logging\s+trap\s+(\S+)/i);
  if (m && dev.mode === 'config') {
    var lvlMap = {'0':'emergencies','1':'alerts','2':'critical','3':'errors','4':'warnings','5':'notifications','6':'informational','7':'debugging'};
    var v = m[1].toLowerCase();
    dev.custom.loggingTrap = lvlMap[v] || v;
    var sevMap = {'emergencies':0,'alerts':1,'critical':2,'errors':3,'warnings':4,'notifications':5,'informational':6,'debugging':7};
    var sev = sevMap[dev.custom.loggingTrap];
    if (typeof sev === 'number' && sev >= 5) {
      // severity 5+ (notifications/informational/debugging) actually lets the
      // routine LINK/LINEPROTO/OSPF (sev-5) events through to the host
      dev.custom.msgLinesLogged = 1421; dev.custom.rateLimited = 0;
    } else {
      // emergencies(0)..warnings(4) still filter out the sev-5 routine events:
      // host keeps receiving nothing useful, symptom persists
      dev.custom.msgLinesLogged = 0; dev.custom.rateLimited = 1421;
    }
    dev.__fixTime = Date.now();
    return '';
  }
  var host = dev.custom.loggingHost || '10.0.0.20';
  var trap = dev.custom.loggingTrap || 'emergencies';
  var logged = dev.custom.msgLinesLogged || 0;
  var rate = dev.custom.rateLimited || 0;
  // show logging | include Trap
  if (/^(do\s+)?show\s+logg(ing)?\s*\|\s*inc(lude)?\s+trap$/i.test(lower)) {
    return '    Trap logging: level ' + trap + ', ' + logged + ' message lines logged';
  }
  // show logging (full)  — also catches the | include filter the scenario opens with
  if (/^(do\s+)?show\s+logg(ing)?(\s*\|.*)?$/i.test(lower)) {
    return 'Syslog logging: enabled (0 messages dropped, 0 messages rate-limited,\n'
      + '                0 flushes, 0 overruns, xml disabled, filtering disabled)\n\n'
      + 'No Active Message Discriminator.\n\n'
      + '    Console logging: level debugging, 1421 messages logged, xml disabled,\n'
      + '                     filtering disabled\n'
      + '    Monitor logging: level debugging, 0 messages logged, xml disabled,\n'
      + '                     filtering disabled\n'
      + '    Buffer logging:  level debugging, 1421 messages logged, xml disabled,\n'
      + '                     filtering disabled\n'
      + '    Exception Logging: size (8192 bytes)\n'
      + '    Count and timestamp logging messages: disabled\n\n'
      + 'No active filter modules.\n\n'
      + '    Trap logging: level ' + trap + ', ' + logged + ' message lines logged\n'
      + '        Logging to ' + host + '  (udp port 514, audit disabled,\n'
      + '              authentication disabled, encryption disabled, link up),\n'
      + '              ' + logged + ' message lines logged,\n'
      + '              ' + rate + ' message lines rate-limited,\n'
      + '              0 message lines dropped-by-MD';
  }
  // show running-config | include logging
  if (/^(do\s+)?show\s+run(ning-config)?\s*\|\s*inc(lude)?\s+logging$/i.test(lower)) {
    return 'logging trap ' + trap + '\nlogging host ' + host + '\nlogging buffered 16384 debugging';
  }
  // ping <host> source gi0/0
  if (/^(do\s+)?ping\s+10\.0\.0\.20/i.test(lower)) {
    return 'Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to ' + host + ', timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms';
  }
  return undefined;
},
    solution: ["show logging", "enable", "configure terminal", "logging trap informational", "end", "show logging"]
  },
  {
    id: "ts-svc-10", title: "Trunk MTU mismatch drops jumbo frames", diff: "advanced", topics: ["2.2"],
    scenario: "After migrating storage to a new VLAN, backups across the DSW1-DSW2 trunk hang at random sizes while small pings succeed. The trunk Gi0/24 is up/up with no CRC errors, but DSW2 logs overruns whenever a large frame arrives. DSW1 already runs jumbo (9216) on its trunk. Investigate the interface counters and MTU on DSW2, bring the local trunk MTU up to match DSW1, then confirm the overruns stop.",
    device: {"name": "DSW2", "type": "switch", "hostname": "DSW2", "vlans": {"1": {"name": "default"}, "50": {"name": "STORAGE"}}, "interfaces": {"GigabitEthernet0/24": {"up": true, "mode": "trunk", "mtu": 1500, "desc": "Trunk to DSW1"}}, "custom": {"peerMtu": 9216, "overruns": 14872}},
    objectives: [
    { text: "Investigate the trunk interface counters and MTU", hint: "show interfaces gi0/24 — read the MTU line and the overrun/input-error counters", check: function(d,log){return log.some(function(c){return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/24/i.test(c.cmd);});} },
    { text: "Select the trunk interface in config mode", hint: "configure terminal → interface gi0/24", check: function(d){return d.currentInterface==='GigabitEthernet0/24'||(d.interfaces['GigabitEthernet0/24']&&d.mode&&d.mode.indexOf('config')===0);} },
    { text: "Raise the local trunk MTU to match the DSW1 jumbo value", hint: "mtu 9216", check: function(d){var i=d.interfaces['GigabitEthernet0/24'];return i&&String(i.mtu)===String(d.custom.peerMtu);} },
    { text: "Confirm the MTU matches the peer and overruns no longer climb", hint: "end → show interfaces gi0/24 — MTU now 9216, 0 overrun", check: function(d,log){var i=d.interfaces['GigabitEthernet0/24'];var fixed=i&&String(i.mtu)===String(d.custom.peerMtu);return fixed&&log.some(function(c){return /^(do\s+)?sh(ow)?\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/24/i.test(c.cmd)&&c.time>=(d.__fixTime||0);});} }
    ],
    extraCmds: function(dev,raw,lower){var m=raw.match(/^mtu\s+(\d+)/i);if(m&&dev.mode==='config-if'&&dev.currentInterface){if(!dev.interfaces[dev.currentInterface])dev.interfaces[dev.currentInterface]={};dev.interfaces[dev.currentInterface].mtu=parseInt(m[1],10);if(String(dev.interfaces[dev.currentInterface].mtu)===String(dev.custom.peerMtu)){dev.custom.overruns=0;}dev.__fixTime=Date.now();return '';}if(/^(do\s+)?show\s+int(erface)?(s)?\s+gi(gabitethernet)?0\/24(\s*\|.*)?$/i.test(lower)){var i=dev.interfaces['GigabitEthernet0/24'];var mtu=i?i.mtu:1500;var ovr=dev.custom.overruns;var match=String(mtu)===String(dev.custom.peerMtu);var note=match?'':'\n%mismatch: DSW1 GigabitEthernet0/24 MTU '+dev.custom.peerMtu+' bytes, local MTU '+mtu+' bytes — oversized frames from DSW1 are dropped here.';return 'GigabitEthernet0/24 is up, line protocol is up (connected)\n'+'  Hardware is Gigabit Ethernet, address is aabb.cc00.0024\n'+'  Description: Trunk to DSW1\n'+'  MTU '+mtu+' bytes, BW 1000000 Kbit/sec, DLY 10 usec,\n'+'  Full-duplex, 1000Mb/s, media type is 10/100/1000BaseTX\n'+'     0 runts, 0 giants, 0 throttles\n'+'     '+ovr+' input errors, 0 CRC, 0 frame, '+ovr+' overrun, 0 ignored'+note;}if(/^(do\s+)?show\s+system\s+mtu$/i.test(lower)){return 'System MTU size is 1500 bytes\nSystem Jumbo MTU size is '+(dev.custom.peerMtu)+' bytes\nRouting MTU size is 1500 bytes';}if(/^(do\s+)?ping\s+10\.50\.50\.10\s+size\s+4000\s+df-bit$/i.test(lower)){var i2=dev.interfaces['GigabitEthernet0/24'];var ok=i2&&String(i2.mtu)===String(dev.custom.peerMtu);return 'Type escape sequence to abort.\nSending 5, 4000-byte ICMP Echos to 10.50.50.10, timeout is 2 seconds:\nPacket sent with the DF bit set\n'+(ok?'!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms':'.....\nSuccess rate is 0 percent (0/5)');}return undefined;},
    solution: ["show interfaces gi0/24", "enable", "configure terminal", "interface gi0/24", "mtu 9216", "end", "show interfaces gi0/24"]
  },
];
