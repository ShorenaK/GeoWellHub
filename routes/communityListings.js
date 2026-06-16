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
