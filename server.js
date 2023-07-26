const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Serve the static frontend files
app.use(express.static(path.join(__dirname, "build")));

// For any other routes, serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
