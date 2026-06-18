/*
  routes/retreats.js

  This file defines all Retreat API routes.

  Responsibilities:
  - Return all retreat listings.
  - Return one retreat by id.
  - Create new retreat listings.
  - Update existing retreat listings.
  - Delete retreat listings.
  - Handle route-level error responses.

  Routes:
  - GET /api/retreats
  - GET /api/retreats/:id
  - POST /api/retreats
  - PUT /api/retreats/:id
  - DELETE /api/retreats/:id

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import Express so we can create a router
import express from "express";

// Import the database function that gets retreat listings
import {
  getRetreats,
  getRetreatById,
  createRetreat,
  updateRetreat,
  deleteRetreat,
} from "../database/retreats.js";

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

// GET /api/retreats/:id
// Return one retreat by its MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    // Get the id from the URL
    const { id } = req.params;

    // Ask the database for one retreat
    const retreat = await getRetreatById(id);

    // If retreat does not exist, return 404
    if (!retreat) {
      return res.status(404).json({
        error: "Retreat not found",
      });
    }

    // Send retreat back to frontend
    return res.json({
      retreat,
    });
  } catch (error) {
    console.error("Error fetching retreat:", error);

    return res.status(500).json({
      error: "Internal Server Error",
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
