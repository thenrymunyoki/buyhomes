const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

/ Serve the static frontend files from the 'build' folder
app.use(express.static(path.join(__dirname, "../my-react-app/build")));

// Serve specific files directly (index.js and App.js in this case)
app.get("/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-react-app/build", "index.js"));
});

app.get("/App.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-react-app/build", "App.js"));
});

// For any other routes, serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-react-app/build", "index.html"));
});
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
