// src/config.js
let apiUrl;

if (process.env.NODE_ENV === "production") {
  apiUrl = "https://yourproductionbackendurl.com";
} else {
  apiUrl = "http://localhost:3001";
}

export { apiUrl };
