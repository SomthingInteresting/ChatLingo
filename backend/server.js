require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const translateMessage = require('./translate'); // Import the translation function

const app = express();
const server = http.createServer(app);
const userLanguages = {}; // Store users' language preferences

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

  // Update language preference
  socket.on("set-language", (lang) => {
    userLanguages[socket.id] = lang;
  });

  socket.on("chat message", async (msg) => {
    console.log("Message received:", msg);

    // Translate and send the message to each connected user in their chosen language
    for (const [sockId, lang] of Object.entries(userLanguages)) {
      const translatedText = await translateMessage(msg.text, lang, process.env.DeepL_API_Key);
      io.to(sockId).emit("chat message", { ...msg, text: translatedText });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete userLanguages[socket.id]; // Remove language preference for disconnected user
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
