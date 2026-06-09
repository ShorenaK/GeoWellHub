// Import Express framework
import express from "express";

// Create Express application
const app = express();

// Port where the server will run
const PORT = 3000;

// Middleware that allows Express to read JSON data
app.use(express.json());

// Tell Express to serve files from the frontend folder
// This allows index.html, CSS, and JS files to be loaded
app.use(express.static("frontend"));

// Simple test route
// Used to verify that our backend is running
app.get("/api/health", (req, res) => {
  res.json({
    message: "GeoWell Hub API is working",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});