#!/usr/bin/env python3
"""
Packet Tracer Bridge Server — zero dependencies, runs on any Python 3.6+.

Starts a local HTTP server on port 54321 that bridges your browser
to Cisco Packet Tracer (via the Builder-MCP.pts extension).

Usage:
    python3 pt-bridge.py

Keep this running while you use the CCNA study labs.
Press Ctrl+C to stop.
"""

import http.server
import json
import threading
import time
from http.server import ThreadingHTTPServer
from queue import Empty, Queue

PORT = 54321
cmd_queue = Queue()
result_queue = Queue()
last_poll = 0.0


class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        global last_poll
        if self.path == "/next":
            last_poll = time.time()
            try:
                cmd = cmd_queue.get_nowait()
            except Empty:
                cmd = ""
            self._respond(200, cmd)
        elif self.path == "/ping":
            self._respond(200, "pong")
        elif self.path == "/status":
            ago = time.time() - last_poll if last_poll > 0 else 9999
            ok = last_poll > 0 and ago < 5.0
            self._respond(200, json.dumps({"connected": ok, "last_poll_ago": round(ago, 1)}))
        elif self.path == "/shutdown":
            self._respond(200, "bye")
            threading.Thread(target=server.shutdown, daemon=True).start()
        else:
            self._respond(404, "not found")

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8") if length else ""
        if self.path == "/result":
            result_queue.put(body)
            self._respond(200, "ok")
        elif self.path == "/queue":
            if body:
                cmd_queue.put(body)
            self._respond(200, "queued")
        else:
            self._respond(404, "not found")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def _respond(self, code, body):
        self.send_response(code)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self._cors()
        self.end_headers()
        self.wfile.write(body.encode("utf-8"))

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def log_message(self, *args):
        pass  # keep terminal clean


if __name__ == "__main__":
    print(f"\n  PT Bridge Server running on http://127.0.0.1:{PORT}")
    print(f"  Waiting for Packet Tracer to connect...\n")
    print(f"  1. Open Packet Tracer with Builder-MCP.pts loaded")
    print(f"  2. Open a lab page in your browser")
    print(f"  3. Click 'Build in Packet Tracer'\n")
    print(f"  Press Ctrl+C to stop.\n")

    ThreadingHTTPServer.allow_reuse_address = True
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)

    polling = False
    try:
        while True:
            server.handle_request()
            if last_poll > 0 and not polling:
                polling = True
                print("  Packet Tracer connected!")
    except KeyboardInterrupt:
        print("\n  Stopped.")
        server.server_close()
