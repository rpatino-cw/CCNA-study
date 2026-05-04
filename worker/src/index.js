// CCNA Multiplayer Worker — routes /room/:id to a Durable Object instance.
// Each room is one DO. WebSocket only.

export { Room } from './room.js';
export { Auction } from './auction.js';
export { Routing } from './routing.js';
export { Wildcard } from './wildcard.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Upgrade',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    // /health — sanity check
    if (url.pathname === '/health') {
      return new Response('ok', { headers: { ...CORS, 'content-type': 'text/plain' } });
    }

    // /room/:id — Subnet Showdown
    let m = url.pathname.match(/^\/room\/([A-Z0-9]{4,8})$/i);
    if (m) {
      const id = env.ROOMS.idFromName(m[1].toUpperCase());
      return env.ROOMS.get(id).fetch(request);
    }

    // /auction/:id — CIDR Auction
    m = url.pathname.match(/^\/auction\/([A-Z0-9]{4,8})$/i);
    if (m) {
      const id = env.AUCTIONS.idFromName(m[1].toUpperCase());
      return env.AUCTIONS.get(id).fetch(request);
    }

    // /route/:id — Route Lookup
    m = url.pathname.match(/^\/route\/([A-Z0-9]{4,8})$/i);
    if (m) {
      const id = env.ROUTES.idFromName(m[1].toUpperCase());
      return env.ROUTES.get(id).fetch(request);
    }

    // /wildcard/:id — Wildcard Whisperer
    m = url.pathname.match(/^\/wildcard\/([A-Z0-9]{4,8})$/i);
    if (m) {
      const id = env.WILDCARDS.idFromName(m[1].toUpperCase());
      return env.WILDCARDS.get(id).fetch(request);
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
