/*
  seedLargeDataset.js

  This file inserts 1000+ Mockaroo-generated records
  into the communityListings collection.

  Responsibilities:
  - Connect to MongoDB.
  - Read Mockaroo JSON data.
  - Add wellnessNeeds to each record.
  - Mark records as Mockaroo-generated.
  - Insert records without deleting existing data.

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

import { connectToDatabase } from "./mongo.js";
import mockData from "./MOCK_DATA.json" with { type: "json" };

async function seedLargeDataset() {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();

    // Get community listings collection
    const communityListingsCollection = db.collection("communityListings");

    // Format Mockaroo records before insertion
    const formattedListings = mockData.map((listing) => {
      return {
        ...listing,

        // Marker so we can remove these records later if needed
        mockarooRecord: true,

        // Required field used by Explorer search
        wellnessNeeds: ["relaxation", "mineral-water", "wellness"],
      };
    });

    // Insert all Mockaroo records
    await communityListingsCollection.insertMany(formattedListings);

    console.log(
      `${formattedListings.length} Mockaroo records inserted successfully.`,
    );

    process.exit(0);
  } catch (error) {
    console.error("Error inserting Mockaroo records:", error);

    process.exit(1);
  }
}

// Run the script
seedLargeDataset();
