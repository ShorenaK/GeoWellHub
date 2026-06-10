// Import the getDatabase helper from our MongoDB connection file
import { getDatabase } from "./mongo.js";

// Name of the MongoDB collection we will use for retreat listings
const COLLECTION_NAME = "retreats";

// Get all retreat listings from the database--- might change this later will see 
export async function getRetreats() {
  try {
    // Get the connected database
    const db = getDatabase();