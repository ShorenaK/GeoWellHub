
/// ---------> talks directly to MongoDB.

// Import the getDatabase helper from our MongoDB connection file
import { ObjectId } from "mongodb";
import { getDatabase } from "./mongo.js";

// Name of the MongoDB collection we will use for retreat listings
const COLLECTION_NAME = "retreats";

// Get all retreat listings from the database--- might change this later will see this is for my routes this fucntion to be used for my routs 
export async function getRetreats() {
  try {
    // Get the connected database
    const db = getDatabase();
    // Get the retreats collection
    const collection = db.collection(COLLECTION_NAME);

    // Find all retreat documents and convert them into an array
    const retreats = await collection.find({}).toArray();

    // Return the array of retreat listings
    return retreats;
  } catch (error) {
    // Log the error so we can debug it in the terminal
    console.error("Error getting retreats from database:", error);

    // Throw the error so the route can handle it with try/catch
    throw error;
  }
}


///////----------> POST

// Create a new retreat listing in the database
export async function createRetreat(retreatData) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the retreats collection
    const collection = db.collection(COLLECTION_NAME);

    // Insert the new retreat document into MongoDB
    const result = await collection.insertOne(retreatData);

    // Return the MongoDB insert result
    return result;
  } catch (error) {
    // Log the error so we can debug it in the terminal
    console.error("Error creating retreat in database:", error);

    // Throw the error so the route can handle it
    throw error;
  }
}


///////----------> Update
