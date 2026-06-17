/*
  database/mongo.js

  This file manages the MongoDB connection for GeoWell Hub.

  Responsibilities:
  - Connect to MongoDB.
  - Store the active database connection.
  - Provide the database connection to other files.
  - Keep database connection logic separate from routes.

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import MongoClient from the native MongoDB driver
import { MongoClient } from "mongodb";

// Load environment variables from the .env file
import dotenv from "dotenv";

// Activate dotenv so process.env can read .env values
dotenv.config();

// Get the MongoDB connection string from the .env file
const uri = process.env.MONGODB_URI;

// Get the database name from the .env file
const dbName = process.env.DB_NAME;

// Create one MongoDB client for the whole application
const client = new MongoClient(uri);

// This variable will store the database connection after we connect
let db;

// Function that connects our app to MongoDB
export async function connectToDatabase() {
  // If we already connected before, reuse the same connection
  if (db) {
    return db;
  }

  // Connect to MongoDB
  await client.connect();

  // Select the database we want to use
  db = client.db(dbName);

  // Show confirmation in the terminal
  console.log(`Connected to MongoDB database: ${dbName}`);

  // Return the database so other files can use it
  return db;
}

// Helper function to get the database after connection
export function getDatabase() {
  // If database is not connected yet, show an error
  if (!db) {
    throw new Error("Database is not connected yet.");
  }

  return db;
}