///Browser asks Express for retreats, Express asks MongoDB, then Express sends JSON back I need to create a route for retreats that will use the getRetreats function to get the data from MongoDB and send it back to the frontend as JSON.

// Import Express so we can create a router
import express from "express";

// Import the database function that gets retreat listings
import { getRetreats, createRetreat } from "../database/retreats.js";

// Create an Express router
// A router lets us keep routes separate from backend.js
const router = express.Router();


// ------------------------- //

// Define a route for GET requests to /api/retreats
// This route returns all retreat listings from MongoDB
router.get("/", async (req, res) => {
  try {
    // Ask the database file for all retreat listings
    const retreats = await getRetreats();

    // Send the retreat listings back to the frontend as JSON
    res.json({
      retreats,
    });
  } catch (error) {
    // Log the error in the terminal for debugging
    console.error("Error fetching retreats:", error);

    // Send a safe error response to the frontend
    res.status(500).json({
      error: "Internal Server Error",
      retreats: [],
    });
  }
});

// POST /api/retreats
// Create a new retreat listing
router.post("/", async (req, res) => {
  try {
    // Get the retreat data sent from the frontend
    const retreatData = req.body;

    // Insert the retreat into MongoDB
    const result = await createRetreat(retreatData);

    // Send success response back to the browser
    res.status(201).json({
      message: "Retreat created successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    
  }
});

// Export the router so backend.js can use it
export default router;