///Browser asks Express for retreats, Express asks MongoDB, then Express sends JSON back I need to create a route for retreats that will use the getRetreats function to get the data from MongoDB and send it back to the frontend as JSON.

// Import Express so we can create a router
import express from "express";

// Import the database function that gets retreat listings
import { getRetreats } from "../database/retreats.js";

// Create an Express router
// A router lets us keep routes separate from backend.js
const router = express.Router();