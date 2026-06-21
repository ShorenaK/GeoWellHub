/*
  routes/communityListings.js

  This file defines all Community Listing API routes.

  Responsibilities:
  - Return all community listings.
  - Return one community listing by id.
  - Create new community listings.
  - Update existing community listings.
  - Delete community listings.
  - Handle route-level error responses.

  Routes:
  - GET /api/community-listings
  - GET /api/community-listings/:id
  - POST /api/community-listings
  - PUT /api/community-listings/:id
  - DELETE /api/community-listings/:id

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import Express so we can create a router
import express from "express";

// Import community listing database functions ---> CRUD operations
import {
  getCommunityListings,
  getCommunityListingById,
  createCommunityListing,
  updateCommunityListing,
  deleteCommunityListing,
} from "../database/communityListings.js";

// Create an Express router
const router = express.Router();

// GET /api/community-listings
// Return all community-submitted listings
router.get("/", async (req, res) => {
  try {
    const communityListings = await getCommunityListings();

    res.json({
      communityListings,
    });
  } catch (error) {
    console.error("Error fetching community listings:", error);

    res.status(500).json({
      error: "Internal Server Error",
      communityListings: [],
    });
  }
});

// GET /api/community-listings/:id
// Return one community listing by its MongoDB _id
router.get("/:id", async (req, res) => {
  try {
    // Get the id from the URL
    const { id } = req.params;

    // Ask the database for one community listing
    const communityListing = await getCommunityListingById(id);

    // If community listing does not exist, return 404
    if (!communityListing) {
      return res.status(404).json({
        error: "Community listing not found",
      });
    }

    // Send community listing back to frontend
    return res.json({
      communityListing,
    });
  } catch (error) {
    console.error("Error fetching community listing:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// POST /api/community-listings
// Create a new community-submitted listing
router.post("/", async (req, res) => {
  try {
    const listingData = req.body;

    const result = await createCommunityListing(listingData);

    res.status(201).json({
      message: "Community listing created successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating community listing:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// PUT /api/community-listings/:id
// Update an existing community listing
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listingData = req.body;

    const result = await updateCommunityListing(id, listingData);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Community listing not found",
      });
    }

    return res.json({
      message: "Community listing updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating community listing:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// DELETE /api/community-listings/:id
// Delete an existing community listing
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteCommunityListing(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Community listing not found",
      });
    }

    return res.json({
      message: "Community listing deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting community listing:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Export router so backend.js can use it
export default router;
