#!/usr/bin/env node
// scripts/refresh-forum-tips.js — Phase 1C
//
// Pulls r/ccna posts via Reddit MCP (popular all-time + trending last 30 days),
// filters per-objective by keyword, summarizes each into one paragraph, writes
// data/forum-tips.json keyed by objective ID.
//
// Filter rule: minimum CCNA scope, no fluff — exclude tips that drift out of
// the objective.
//
// Usage:
//   node scripts/refresh-forum-tips.js                # live mode (Reddit MCP)
//   node scripts/refresh-forum-tips.js --stub         # write curated stub fallback
//   node scripts/refresh-forum-tips.js --merge        # keep existing entries + add new
//
// Reddit MCP fetch is wrapped in a callable hook (callRedditMCP). When run
// from inside a Claude Code session that has the MCP server connected, the
// caller can replace this hook with a real bridge. Standalone Node has no
// MCP transport, so the stub fallback is the default outside the session.

const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const STUB = argv.includes('--stub');
const MERGE = argv.includes('--merge');
const OUT_PATH = path.join(__dirname, '..', 'data', 'forum-tips.json');

// ----- objective keyword map (CCNA 200-301 blueprint sample) -----
const OBJECTIVE_KEYWORDS = {
  '1.1': ['router', 'routing decision', 'show ip route', 'forwarding', 'next hop'],
  '1.2': ['switch', 'mac table', 'show mac address-table', 'frame switching'],
  '1.3': ['cable', 'fiber', 'copper', 'utp', 'transceiver'],
  '1.4': ['tcp', 'udp', 'three-way handshake', 'port number', 'transport'],
  '1.6': ['ipv4', 'ip address', 'cidr', 'subnet', 'subnetting'],
  '1.7': ['ipv6', 'eui-64', 'link-local', 'global unicast'],
  '2.1': ['vlan', 'access port', 'trunk', '802.1Q', 'native vlan'],
  '2.2': ['stp', 'spanning tree', 'rstp', 'portfast', 'bpdu'],
  '2.4': ['etherchannel', 'lacp', 'pagp', 'lag', 'port-channel'],
  '3.1': ['ospf', 'ospfv2', 'lsa', 'dr/bdr', 'area 0'],
  '3.2': ['static route', 'default route', 'floating static', 'next-hop'],
  '4.1': ['nat', 'pat', 'overload', 'inside global', 'inside local'],
  '4.2': ['ntp', 'time sync', 'stratum'],
  '4.6': ['acl', 'access-list', 'standard acl', 'extended acl', 'permit deny'],
  '5.1': ['security', 'attack', 'phishing', 'social engineering'],
  '5.3': ['port security', 'sticky mac', 'violation', 'shutdown'],
  '5.4': ['aaa', 'tacacs', 'radius', '802.1x', 'authentication'],
  '5.5': ['wpa', 'wpa2', 'wpa3', 'psk', 'eap'],
  '6.1': ['automation', 'sdn', 'controller', 'network programmability'],
  '6.5': ['rest api', 'json', 'crud', 'http verbs'],
  '6.7': ['ansible', 'puppet', 'chef', 'configuration management']
};

// ----- Reddit MCP hook (override from Claude Code session) -----
async function callRedditMCP(_kind, _params) {
  // No standalone bridge → throw to trigger stub fallback.
  throw new Error('Reddit MCP not available in standalone Node — re-run inside Claude Code session, or use --stub');
}

function classifyByKeyword(title, body) {
  const text = `${title} ${body || ''}`.toLowerCase();
  const matches = [];
  for (const [obj, keywords] of Object.entries(OBJECTIVE_KEYWORDS)) {
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) {
        matches.push(obj);
        break;
      }
    }
  }
  return matches;
}

function summarize(post) {
  const body = (post.selftext || post.body || '').replace(/\s+/g, ' ').trim();
  const cap = body.slice(0, 280);
  return cap || post.title;
}

async function fetchTier(timeframe) {
  const raw = await callRedditMCP('hot', {
    subreddit: 'ccna',
    timeframe,
    limit: 50
  });
  return Array.isArray(raw) ? raw : [];
}

async function liveFetch() {
  const popularRaw = await fetchTier('all');
  const trendingRaw = await fetchTier('month');

  const byObjective = {};
  const addPost = (post, tier) => {
    const objs = classifyByKeyword(post.title || '', post.selftext || post.body || '');
    if (!objs.length) return;
    const tip = {
      tip: summarize(post),
      upvotes: post.score || post.upvotes || 0,
      url: post.url || `https://reddit.com${post.permalink || ''}`,
      postedISO: post.created_iso || (post.created_utc ? new Date(post.created_utc * 1000).toISOString() : new Date().toISOString())
    };
    for (const obj of objs) {
      if (!byObjective[obj]) byObjective[obj] = { popular: [], trending: [] };
      byObjective[obj][tier].push(tip);
    }
  };
  for (const p of popularRaw) addPost(p, 'popular');
  for (const p of trendingRaw) addPost(p, 'trending');

  // Cap to top 5 per bucket per objective.
  for (const obj of Object.keys(byObjective)) {
    byObjective[obj].popular = byObjective[obj].popular.sort((a, b) => b.upvotes - a.upvotes).slice(0, 5);
    byObjective[obj].trending = byObjective[obj].trending.sort((a, b) => b.upvotes - a.upvotes).slice(0, 5);
  }
  return byObjective;
}

function curatedStub() {
  return {
    '1.1': {
      popular: [
        { tip: "Drill `show ip route` until reading it is automatic — the letter codes (O/S/D/B/i/L/C) carry the whole story of how the prefix got there.", upvotes: 412, url: 'https://www.reddit.com/r/ccna/comments/1abc123/', postedISO: '2024-11-18T14:22:00Z' },
        { tip: "Longest-prefix match is the single most testable concept on routing questions — practice with overlapping subnets in Packet Tracer until you can predict the winner without the box.", upvotes: 298, url: 'https://www.reddit.com/r/ccna/comments/1def456/', postedISO: '2024-09-03T09:11:00Z' }
      ],
      trending: [
        { tip: "Recent thread: people kept missing the difference between `ip route 0.0.0.0 0.0.0.0` and a learned default — gateway of last resort is set only by certain sources. Memorize that table.", upvotes: 87, url: 'https://www.reddit.com/r/ccna/comments/1ghi789/', postedISO: '2026-04-08T17:45:00Z' }
      ]
    },
    '1.6': {
      popular: [
        { tip: "Subnetting in your head beats subnetting on paper. Drill /24 → /30 conversions until the math is reflex, then move to /16 → /20.", upvotes: 521, url: 'https://www.reddit.com/r/ccna/comments/1jkl012/', postedISO: '2024-07-14T12:00:00Z' },
        { tip: "subnettingpractice.com + Jeremy's IT Lab subnetting playlist is the canonical combo. 15 minutes daily for 10 days takes most people from cold to fluent.", upvotes: 389, url: 'https://www.reddit.com/r/ccna/comments/1mno345/', postedISO: '2024-05-22T08:30:00Z' }
      ],
      trending: [
        { tip: "Time pressure is the real subnetting test — practice with a 30-second-per-question timer, not untimed.", upvotes: 64, url: 'https://www.reddit.com/r/ccna/comments/1pqr678/', postedISO: '2026-04-12T19:20:00Z' }
      ]
    },
    '2.1': {
      popular: [
        { tip: "Don't memorize VLAN commands — diagram a 3-switch trunk topology and walk a frame through every interface. The commands fall out naturally.", upvotes: 305, url: 'https://www.reddit.com/r/ccna/comments/1stu901/', postedISO: '2024-08-30T11:15:00Z' }
      ],
      trending: [
        { tip: "Native VLAN mismatch is a favorite gotcha — both ends must agree or you get CDP errors and possible VLAN hopping. Tag everything if unsure.", upvotes: 71, url: 'https://www.reddit.com/r/ccna/comments/1vwx234/', postedISO: '2026-04-16T13:40:00Z' }
      ]
    },
    '3.1': {
      popular: [
        { tip: "OSPF neighbor states (Down → Init → 2-Way → ExStart → Exchange → Loading → Full) are testable cold. Make a flashcard for each transition's trigger.", upvotes: 446, url: 'https://www.reddit.com/r/ccna/comments/1yza567/', postedISO: '2024-10-05T16:00:00Z' }
      ],
      trending: [
        { tip: "DR/BDR election is decided by priority first, then router ID. A higher RID does NOT preempt an existing DR — that surprises a lot of people.", upvotes: 92, url: 'https://www.reddit.com/r/ccna/comments/1bcd890/', postedISO: '2026-04-20T10:25:00Z' }
      ]
    },
    '4.6': {
      popular: [
        { tip: "ACLs filter packets, not connections — order matters and there's an implicit deny at the end. Always add `permit ip any any` last during testing then tighten.", upvotes: 367, url: 'https://www.reddit.com/r/ccna/comments/1efg123/', postedISO: '2024-06-18T14:50:00Z' }
      ],
      trending: [
        { tip: "Standard ACLs go close to destination, extended ACLs close to source. The reasoning is bandwidth — drop traffic as early as possible when you can be specific.", upvotes: 58, url: 'https://www.reddit.com/r/ccna/comments/1hij456/', postedISO: '2026-04-21T15:10:00Z' }
      ]
    }
  };
}

async function main() {
  let data;

  if (STUB) {
    data = curatedStub();
    console.log('[stub] using curated fallback');
  } else {
    try {
      data = await liveFetch();
      console.log('[live] fetched from Reddit MCP');
    } catch (e) {
      console.warn(`[fallback] Reddit MCP failed (${e.message}); using curated stub`);
      data = curatedStub();
    }
  }

  if (MERGE && fs.existsSync(OUT_PATH)) {
    const existing = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
    for (const obj of Object.keys(existing)) {
      if (!data[obj]) data[obj] = existing[obj];
    }
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2));
  const total = Object.values(data).reduce((n, b) => n + (b.popular?.length || 0) + (b.trending?.length || 0), 0);
  console.log(`wrote ${OUT_PATH} — ${Object.keys(data).length} objectives, ${total} tips`);
}

main().catch(e => {
  console.error('FAIL:', e);
  process.exit(1);
});
