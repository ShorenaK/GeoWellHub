// This file talks directly to MongoDB for community listings.

// Import ObjectId so we can find documents by MongoDB _id
import { ObjectId } from "mongodb";

// Import the getDatabase helper from our MongoDB connection file
import { getDatabase } from "./mongo.js";

// Name of the MongoDB collection for community-submitted listings
const COLLECTION_NAME = "communityListings";

