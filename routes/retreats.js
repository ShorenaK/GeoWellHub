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
const router = express.Router();

// This route returns all retreat listings from MongoDB ->  GET requests to /api/retreats
router.get("/", async (req, res) => {
  try {
    // Ask the database file for all retreat listings
    const retreats = await getRetreats();

    // Send the retreat listings back to the frontend as JSON
    res.json({
      retreats,
    });
  } catch (error) {
    console.error("Error fetching retreats:", error);

    res.status(500).json({
      error: "Internal Server Error",
      retreats: [],
    });
  }
});

// Return one retreat by its MongoDB _id --> GET /api/retreats/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const retreat = await getRetreatById(id);

    if (!retreat) {
      return res.status(404).json({
        error: "Retreat not found",
      });
    }

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

// Create a new retreat listing --> POST /api/retreats
router.post("/", async (req, res) => {
  try {
    // Get the retreat data sent from the frontend
    const retreatData = req.body;

    // Insert the retreat into MongoDB
    const result = await createRetreat(retreatData);

    res.status(201).json({
      message: "Retreat created successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating retreat:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Update an existing retreat by its MongoDB _id --> PUT /api/retreats/:id
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

    return res.json({
      message: "Retreat updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating retreat:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Delete an existing retreat by its MongoDB _id --> DELETE /api/retreats/:id
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
    return res.json({
      message: "Retreat deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting retreat:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Export the router so backend.js can use it
export default router;
