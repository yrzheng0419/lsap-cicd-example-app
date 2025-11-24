// app.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Welcome to the CI/CD Workshop!</h1>");
});

// Time API endpoint
app.get('/time', (req, res) => {
    const currentTime = new Date().toISOString();
    res.json({ time: currentTime });
});

module.exports = app;
