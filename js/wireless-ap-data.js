/* wireless-ap-data.js — static data for wireless-ap-lab.html
 * Exposes window.APLabData. No DOM, no side effects. */
(function () {
  'use strict';

  const wallMaterials = {
    drywall:  { lossDb: 3,  color: '#C7C3BC', label: 'Drywall (−3 dB)' },
    wood:     { lossDb: 4,  color: '#92400E', label: 'Wood (−4 dB)' },
    glass:    { lossDb: 2,  color: '#7DD3FC', label: 'Glass (−2 dB)' },
    concrete: { lossDb: 12, color: '#57534E', label: 'Concrete (−12 dB)' },
    metal:    { lossDb: 25, color: '#1C1917', label: 'Metal (−25 dB)' }
  };

  const presets = {
    office_1f: {
      id: 'office_1f',
      name: '1F Office — 40 × 25 m',
      widthM: 40,
      heightM: 25,
      walls: [
        // outer perimeter — concrete
        { x1: 0,  y1: 0,    x2: 40, y2: 0,    material: 'concrete' },
        { x1: 40, y1: 0,    x2: 40, y2: 25,   material: 'concrete' },
        { x1: 40, y1: 25,   x2: 0,  y2: 25,   material: 'concrete' },
        { x1: 0,  y1: 25,   x2: 0,  y2: 0,    material: 'concrete' },
        // interior vertical at x=20, with 3 m corridor gap
        { x1: 20, y1: 0,    x2: 20, y2: 11,   material: 'drywall' },
        { x1: 20, y1: 14,   x2: 20, y2: 25,   material: 'drywall' },
        // interior horizontal at y=12.5, with 4 m corridor gap
        { x1: 0,  y1: 12.5, x2: 18, y2: 12.5, material: 'drywall' },
        { x1: 22, y1: 12.5, x2: 40, y2: 12.5, material: 'drywall' },
        // glass conference room corner
        { x1: 30, y1: 0,    x2: 30, y2: 6,    material: 'glass' },
        { x1: 30, y1: 6,    x2: 40, y2: 6,    material: 'glass' }
      ],
      labels: [
        { x: 10, y: 6.25,  text: 'Open Office A' },
        { x: 25, y: 3,     text: 'Conf' },
        { x: 35, y: 3,     text: 'Glass Conf' },
        { x: 10, y: 18.75, text: 'Open Office B' },
        { x: 30, y: 18.75, text: 'Lab' }
      ]
    }
  };

  // Standard 5 GHz channels (UNII-1, 2A, 2C/DFS, 3). DFS flag noted per-channel.
  const ch5 = [
    { ch: 36,  dfs: false }, { ch: 40,  dfs: false }, { ch: 44,  dfs: false }, { ch: 48,  dfs: false },
    { ch: 52,  dfs: true  }, { ch: 56,  dfs: true  }, { ch: 60,  dfs: true  }, { ch: 64,  dfs: true  },
    { ch: 100, dfs: true  }, { ch: 104, dfs: true  }, { ch: 108, dfs: true  }, { ch: 112, dfs: true  },
    { ch: 116, dfs: true  }, { ch: 132, dfs: true  }, { ch: 136, dfs: true  }, { ch: 140, dfs: true  },
    { ch: 149, dfs: false }, { ch: 153, dfs: false }, { ch: 157, dfs: false }, { ch: 161, dfs: false },
    { ch: 165, dfs: false }
  ];
  const ch24 = [{ ch: 1, dfs: false }, { ch: 6, dfs: false }, { ch: 11, dfs: false }];

  const apCatalog = [
    {
      model: 'C9120AXI',
      vendor: 'Cisco',
      type: 'omni',
      description: 'Wi-Fi 6 indoor omni — small/medium room workhorse',
      radios: [
        { band: '2.4', channels: ch24, maxTxDbm: 20, defaultTxDbm: 14, defaultCh: 1,  defaultWidthMhz: 20 },
        { band: '5',   channels: ch5,  maxTxDbm: 23, defaultTxDbm: 17, defaultCh: 36, defaultWidthMhz: 40 }
      ],
      poeClass: 'PoE+ (30 W)',
      glyph: 'AP'
    },
    {
      model: 'C9130AXI',
      vendor: 'Cisco',
      type: 'omni',
      description: 'Wi-Fi 6 high-density — auditorium / open office',
      radios: [
        { band: '2.4', channels: ch24, maxTxDbm: 20, defaultTxDbm: 14, defaultCh: 6,  defaultWidthMhz: 20 },
        { band: '5',   channels: ch5,  maxTxDbm: 23, defaultTxDbm: 17, defaultCh: 44, defaultWidthMhz: 80 }
      ],
      poeClass: 'PoE+ (30 W)',
      glyph: 'HD'
    },
    {
      model: 'C9124AXD',
      vendor: 'Cisco',
      type: 'directional',
      description: 'Wi-Fi 6 outdoor/directional — corridor / patch coverage',
      radios: [
        { band: '2.4', channels: ch24, maxTxDbm: 23, defaultTxDbm: 17, defaultCh: 11, defaultWidthMhz: 20 },
        { band: '5',   channels: ch5,  maxTxDbm: 23, defaultTxDbm: 20, defaultCh: 149, defaultWidthMhz: 40 }
      ],
      poeClass: 'PoE++ (60 W)',
      glyph: 'DIR',
      directional: { beamWidthDeg: 60, defaultAzimuthDeg: 0 }
    }
  ];

  // ── Phase 3 additions ────────────────────────────────────────
  const wlanSecurityModes = [
    { id: 'open',         label: 'Open',                requiresPassphrase: false, requiresRadius: false, generation: 'legacy' },
    { id: 'wpa2-psk',     label: 'WPA2 Personal (PSK)', requiresPassphrase: true,  requiresRadius: false, generation: 'wpa2'   },
    { id: 'wpa2-ent',     label: 'WPA2 Enterprise',     requiresPassphrase: false, requiresRadius: true,  generation: 'wpa2'   },
    { id: 'wpa3-sae',     label: 'WPA3 Personal (SAE)', requiresPassphrase: true,  requiresRadius: false, generation: 'wpa3'   },
    { id: 'wpa3-ent',     label: 'WPA3 Enterprise',     requiresPassphrase: false, requiresRadius: true,  generation: 'wpa3'   }
  ];

  const apModes = [
    { id: 'local',       label: 'Local',       description: 'Default; serves clients + scans on idle channels' },
    { id: 'flexconnect', label: 'FlexConnect', description: 'Branch / WAN-edge; switches traffic locally if WLC unreachable' },
    { id: 'monitor',     label: 'Monitor',     description: 'Sensor only; no client serving — wIPS / location' },
    { id: 'sniffer',     label: 'Sniffer',     description: 'Captures frames + forwards to remote analyzer' },
    { id: 'bridge',      label: 'Bridge',      description: 'Mesh / point-to-point bridge link' }
  ];

  const defaultWlans = [
    { id: 'wlan-1', name: 'Corp',  band: 'both', security: 'wpa2-psk', vlan: 10, hidden: false, broadcast: true, passphrase: 'corppass1', radiusServer: '' },
    { id: 'wlan-2', name: 'Guest', band: '5',    security: 'open',     vlan: 20, hidden: false, broadcast: true, passphrase: '',          radiusServer: '' }
  ];

  window.APLabData = { presets, wallMaterials, apCatalog, wlanSecurityModes, apModes, defaultWlans };
})();
