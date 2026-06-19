/*
  removeMockarooRecords.js

  Removes all Mockaroo-generated records from the
  communityListings collection.

  Purpose:
  - Clean up the database after testing large datasets.
  - Remove the 1000+ Mockaroo records used for performance testing.
  - Preserve manually created community listings.

  Only records containing:
  mockarooRecord: true

  will be deleted.

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import the database connection helper
import { connectToDatabase } from "./mongo.js";

// Remove Mockaroo records from MongoDB
async function removeMockarooRecords() {
  // Connect to the database
  const db = await connectToDatabase();

  // Delete all records marked as Mockaroo-generated
  await db.collection("communityListings").deleteMany({
    mockarooRecord: true,
  });

  // Display success message
  console.log("Mockaroo records removed.");

  // Exit the script successfully
  process.exit(0);
}

// Run the cleanup script
removeMockarooRecords();