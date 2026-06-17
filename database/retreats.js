/*
  database/retreats.js

  This file handles MongoDB operations for retreat listings.

  Responsibilities:
  - Get all retreat listings.
  - Get one retreat by id.
  - Create new retreat listings.
  - Update existing retreat listings.
  - Delete retreat listings.
  - Use MongoDB ObjectId for document lookup.

  Collection:
  - retreats

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/


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
// -----------> Get one retreat listing by its MongoDB _id deteilhnls page 
// Get one retreat listing by its MongoDB _id
export async function getRetreatById(id) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the retreats collection
    const collection = db.collection(COLLECTION_NAME);

    // Find one retreat where _id matches the id from the URL
    const retreat = await collection.findOne({
      _id: new ObjectId(id),
    });

    // Return the retreat document
    return retreat;
  } catch (error) {
    // Log error for debugging
    console.error("Error getting retreat by id:", error);

    // Let the route handle the error
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
// Update an existing retreat
export async function updateRetreat(id, retreatData) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the retreats collection
    const collection = db.collection(COLLECTION_NAME);

    // Update the matching retreat
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: retreatData,
      },
    );

    // Return MongoDB result
    return result;
  } catch (error) {
    // Log error for debugging
    console.error("Error updating retreat:", error);

    // Let routes handle the error
    throw error;
  }
}



///////----------> Delete

// Delete an existing retreat by its MongoDB _id
export async function deleteRetreat(id) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the retreats collection
    const collection = db.collection(COLLECTION_NAME);

    // Delete one retreat where _id matches the id from the URL
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    // Return MongoDB delete result
    return result;
  } catch (error) {
    // Log error for debugging
    console.error("Error deleting retreat:", error);

    // Let the route handle the error
    throw error;
  }
}

