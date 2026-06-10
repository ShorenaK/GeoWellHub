///Browser asks Express for retreats, Express asks MongoDB, then Express sends JSON back I need to create a route for retreats that will use the getRetreats function to get the data from MongoDB and send it back to the frontend as JSON.

// Import Express so we can create a router
import express from "express";

// Import the database function that gets retreat listings
import { getRetreats, createRetreat, updateRetreat, deleteRetreat } from "../database/retreats.js";

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
    // Log the error for debugging
    console.error("Error creating retreat:", error);

    // Send safe error response
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// PUT /api/retreats/:id
// Update an existing retreat by its MongoDB _id
router.put("/:id", async (req, res) => {
  try {
    // Get the id from the URL
    const { id } = req.params;

    // Get updated retreat data from the request body
    const retreatData = req.body;

    // Update the retreat in MongoDB
    const result = await updateRetreat(id, retreatData);

    // If no document matched the id, return 404
    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Retreat not found",
      });
    }

    // Send success response
    return res.json({
      message: "Retreat updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating retreat:", error);

    // Send safe error response
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// DELETE -->  /api/retreats/:id
// Delete an existing retreat by its MongoDB _id
router.delete("/:id", async (req, res) => {
  try {
    // Get the id from the URL
    const { id } = req.params;

    // Delete the retreat from MongoDB
    const result = await deleteRetreat(id);

    // If no document matched the id, return 404
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Retreat not found",
      });
    }

    // Send success response
    return res.json({
      message: "Retreat deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error deleting retreat:", error);

    // Send safe error response
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Export the router so backend.js can use it
export default router;