let apiUrl;

if (process.env.NODE_ENV === "production") {
  apiUrl = process.env.REACT_APP_PROD_API_URL || "https://chat-lingo-backend.onrender.com";
} else {
  apiUrl = "http://localhost:3001";
}

export { apiUrl };
