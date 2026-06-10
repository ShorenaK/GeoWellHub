// Import the MongoDB connection function
import { connectToDatabase } from "./mongo.js";


// Starter retreat data for testing
const retreats = [
  {
    name: "Borjomi Mineral Wellness Resort",
    region: "Samtskhe-Javakheti",
    city: "Borjomi",
    treatmentType: "Mineral Water Therapy",
    wellnessBenefits: ["Stress Relief", "Digestive Health", "Relaxation"],
    description:
      "A wellness retreat located in Borjomi, known for mineral water treatments and peaceful nature.",
    pricePerNight: 120,
    rating: 4.7,
    imageUrl: "https://placehold.co/600x400",
    contactEmail: "info@borjomiwellness.com",
  },
  {
    name: "Tbilisi Thermal Spa Center",
    region: "Tbilisi",
    city: "Tbilisi",
    treatmentType: "Thermal Bath",
    wellnessBenefits: ["Muscle Relaxation", "Skin Health", "Recovery"],
    description:
      "A thermal spa center inspired by Tbilisi's historic sulfur bath tradition.",
    pricePerNight: 95,
    rating: 4.5,
    imageUrl: "https://placehold.co/600x400",
    contactEmail: "contact@tbilisithermalspa.com",
  },
  {
    name: "Sairme Mountain Health Retreat",
    region: "Imereti",
    city: "Sairme",
    treatmentType: "Mountain Wellness",
    wellnessBenefits: ["Detox", "Fresh Air", "Mineral Water"],
    description:
      "A mountain wellness retreat offering mineral water, forest air, and relaxation.",
    pricePerNight: 140,
    rating: 4.8,
    imageUrl: "https://placehold.co/600x400",
    contactEmail: "hello@sairmeretreat.com",
  },
];

// Function that inserts starter data into MongoDB
async function seedDatabase() {
  try {
    // Connect to the geowellhub database
    const db = await connectToDatabase();

    // Get the retreats collection
    const collection = db.collection("retreats");

    // Delete old test data so we do not duplicate records every time
    await collection.deleteMany({});

    // Insert the starter retreats
    await collection.insertMany(retreats);

    console.log("Seed data inserted successfully.");

    // Exit the script successfully
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);

    // Exit the script with an error
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();