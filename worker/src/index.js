// CCNA Multiplayer Worker — routes /room/:id to a Durable Object instance.
// Each room is one DO. WebSocket only.

export { Room } from './room.js';

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

    // /room/:id — WebSocket upgrade routes to that room's DO
    const m = url.pathname.match(/^\/room\/([A-Z0-9]{4,8})$/i);
    if (m) {
      const roomId = m[1].toUpperCase();
      const id = env.ROOMS.idFromName(roomId);
      const stub = env.ROOMS.get(id);
      return stub.fetch(request);
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
