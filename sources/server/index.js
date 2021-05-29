/*!
 * Copyright © 2021 Amin NAIRI
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const express   = require("express");
const http      = require("http");
const path      = require("path");
const socketio  = require("socket.io");

// This is the port used to connect to the HTTP server
const port = process.env.SERVER_PORT || 8080;

// This is the host to use to listen for HTTP requests
const host = process.env.SERVER_HOST || "127.0.0.1";

// This is our HTTP router
const application = express();


// This is our HTTP server
const httpServer = http.createServer(application);

// This is our SocketIO instance, most frameworks will handle this part for you
const io = new socketio.Server(httpServer);

// Serving static files from the client folder
application.use(express.static(path.resolve("sources", "client")));

// Express route example (independent of SocketIO)
application.get("/api/v1/ping", (request, response) => {
  // Sending an HTTP response to the client requesting
  response.end("pong");
});

// When a client connects to http://127.0.0.1:8080
io.on("connection", (socket) => {
  console.log("[SERVER] New socket connection opened.");

  // Send a message to the client openning the socket only
  socket.emit("message", "Hello!");

  // Each time the client sends us a message
  socket.on("message", message => {
    console.log(`[SERVER] Message from the client: ${message}.`);
  });

  // When the connected client close the tab
  socket.on("disconnect", () => {
    console.log("[SERVER] Socket connection closed.");
  });
});

// Listen for HTTP connections
httpServer.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});

// When we hit CTRL+C
process.on("SIGINT", () => {
  // Stop everything and exit
  process.exit(0);
});
