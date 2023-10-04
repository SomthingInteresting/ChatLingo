const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-lingo.vercel.app"
];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin 
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed
      if (isOriginAllowed(origin, allowedOrigins)) {
        return callback(null, true);
      } else {
        const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
    },
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for a chat message and broadcast it to all connected clients
  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

function isOriginAllowed(origin, allowedOrigins) {
  // Check if origin is in the allowedOrigins array
  if (allowedOrigins.indexOf(origin) !== -1) return true;

  // Check if origin is a Vercel preview URL
  const vercelPreviewPattern = /chat-lingo-.*\.vercel\.app$/;
  if (vercelPreviewPattern.test(origin)) return true;

  // Add more origin checks if needed

  // If none of the checks pass, do not allow the origin
  return false;
}
