/*
  backend.js

  This file starts the GeoWell Hub backend server.

  Responsibilities:
  - Create and configure the Express application.
  - Connect to MongoDB.
  - Register API routes.
  - Serve frontend files.
  - Parse JSON request bodies.
  - Start the web server.

  Routes:
  - /api/retreats
  - /api/community-listings

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import Express framework
import express from "express";

// Import the MongoDB connection function
import { connectToDatabase } from "./database/mongo.js";

// Import retreat routes
import retreatRoutes from "./routes/retreats.js";

// Import community listing routes
import communityListingRoutes from "./routes/communityListings.js";

// Create Express application
const app = express();

// Port where the server will run
const PORT = 3000;

// Middleware that allows Express to read JSON data
app.use(express.json());

// Register retreat routes
app.use("/api/retreats", retreatRoutes);

// Register community listing routes
app.use("/api/community-listings", communityListingRoutes);

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

// Start the application
async function startServer() {
  try {
    // Connect to MongoDB first
    await connectToDatabase();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Run the startup function
startServer();
