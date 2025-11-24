// server.js
const app = require("./app");
const PORT = process.env.PORT || 3000;

// Start the server - 重要：監聽 0.0.0.0 而不是 localhost
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the server instance for testing
module.exports = server;
