#!/usr/bin/env python3
"""
Simple HTTP server that serves zaufani-rodzina.html as default page.
Run: python serve.py
Then visit: http://localhost:8000
"""

import http.server
import socketserver
import os
import sys

PORT = 8888
HANDLER = http.server.SimpleHTTPRequestHandler

class DefaultFileHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If requesting root, serve zaufani-rodzina.html
        if self.path == '/':
            self.path = '/zaufani-rodzina.html'
        return super().do_GET()

    def log_message(self, format, *args):
        # Colorized logging
        print(f"[HTTP] {format % args}")

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with socketserver.TCPServer(("", PORT), DefaultFileHTTPRequestHandler) as httpd:
        print(f"[OK] Server started at http://localhost:{PORT}")
        print(f"[INFO] Serve zaufani-rodzina.html as default page")
        print(f"[INFO] App running at http://localhost:{PORT}")
        print(f"\nPress Ctrl+C to stop\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[STOP] Server stopped")
            sys.exit(0)

if __name__ == '__main__':
    run_server()
