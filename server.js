// server.js
const app = require("./app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);  // 修正這行！
});

module.exports = server;
