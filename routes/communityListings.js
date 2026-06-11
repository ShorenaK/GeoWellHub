// Import Express so we can create a router
import express from "express";

// Import community listing database functions
import {
  getCommunityListings,
  createCommunityListing,
  updateCommunityListing,
  deleteCommunityListing,
} from "../database/communityListings.js";

