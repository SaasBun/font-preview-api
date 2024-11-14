const express = require("express");
const fs = require("fs").promises;
const textRoutes = require("./routes/textRoutes");
const errorHandler = require("./middleware/errorHandler");
const config = require("./config/config");

const app = express();

// Ensure temp directory exists
fs.mkdir(config.paths.temp, { recursive: true }).catch(console.error);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api", textRoutes);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

module.exports = app;
