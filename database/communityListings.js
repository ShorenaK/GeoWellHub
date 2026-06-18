/*
  database/communityListings.js

  This file handles MongoDB operations for community listings.

  Responsibilities:
  - Get all community listings.
  - Get one community listing by id.
  - Create new community listings.
  - Update existing community listings.
  - Delete community listings.
  - Use MongoDB ObjectId for document lookup.

  Collection:
  - communityListings

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// This file talks directly to MongoDB for community listings.

// Import ObjectId so we can find documents by MongoDB _id
import { ObjectId } from "mongodb";

// Import the getDatabase helper from our MongoDB connection file
import { getDatabase } from "./mongo.js";

// Name of the MongoDB collection for community-submitted listings
const COLLECTION_NAME = "communityListings";

// Get all community listings from the database
export async function getCommunityListings() {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the communityListings collection
    const collection = db.collection(COLLECTION_NAME);

    // Find all community listing documents and convert them into an array
    const communityListings = await collection.find({}).toArray();

    // Return the array of community listings
    return communityListings;
  } catch (error) {
    // Log the error so we can debug it in the terminal
    console.error("Error getting community listings from database:", error);

    // Throw the error so the route can handle it
    throw error;
  }
}

// Get one community listing from the database by its MongoDB _id
export async function getCommunityListingById(id) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the communityListings collection
    const collection = db.collection(COLLECTION_NAME);

    // Find one community listing where _id matches the id from the URL
    const communityListing = await collection.findOne({
      _id: new ObjectId(id),
    });

    // Return the single community listing document
    return communityListing;
  } catch (error) {
    // Log error for debugging
    console.error("Error getting community listing by id:", error);

    // Let the route handle the error
    throw error;
  }
}

// Create a new community listing in the database
export async function createCommunityListing(listingData) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the communityListings collection
    const collection = db.collection(COLLECTION_NAME);

    // Insert the new community listing document into MongoDB
    const result = await collection.insertOne(listingData);

    // Return the MongoDB insert result
    return result;
  } catch (error) {
    // Log the error so we can debug it in the terminal
    console.error("Error creating community listing in database:", error);

    // Throw the error so the route can handle it
    throw error;
  }
}

// Update an existing community listing by its MongoDB _id
export async function updateCommunityListing(id, listingData) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the communityListings collection
    const collection = db.collection(COLLECTION_NAME);

    // Update only the fields sent in listingData
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: listingData,
      },
    );

    // Return MongoDB update result
    return result;
  } catch (error) {
    // Log error for debugging
    console.error("Error updating community listing:", error);

    // Let the route handle the error
    throw error;
  }
}

// Delete an existing community listing by its MongoDB _id
export async function deleteCommunityListing(id) {
  try {
    // Get the connected database
    const db = getDatabase();

    // Get the communityListings collection
    const collection = db.collection(COLLECTION_NAME);

    // Delete one community listing where _id matches the id from the URL
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    // Return MongoDB delete result
    return result;
  } catch (error) {
    // Log error for debugging
    console.error("Error deleting community listing:", error);

    // Let the route handle the error
    throw error;
  }
}
