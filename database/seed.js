/*
  seed.js

  This file seeds GeoWell Hub sample data into MongoDB.

  Responsibilities:
  - Connect to MongoDB.
  - Insert sample retreat records.
  - Insert sample community listing records.
  - Help test the application with starter data.

  Collections:
  - retreats
  - communityListings

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import the MongoDB connection function
import { connectToDatabase } from "./mongo.js";

// Starter retreat data for official wellness destinations
const retreats = [
  {
    name: "Borjomi Mineral Wellness Resort",
    region: "Samtskhe-Javakheti",
    city: "Borjomi",
    treatmentType: "Mineral Water Therapy",
    wellnessBenefits: ["Stress Relief", "Digestive Health", "Relaxation"],
    wellnessNeeds: ["digestion", "mineral-water", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support digestion, relaxation, and general wellness through mineral water.",
    description:
      "A wellness destination in Borjomi known for mineral water, nature, and relaxation.",
    pricePerNight: 120,
    rating: 4.7,
    imageUrl: "./images/borjomi.png",
    contactEmail: "info@borjomiwellness.com",
  },
  {
    name: "Tskaltubo Mineral Baths",
    region: "Imereti",
    city: "Tskaltubo",
    treatmentType: "Thermal Mineral Bath",
    wellnessBenefits: ["Joint Comfort", "Recovery", "Relaxation"],
    wellnessNeeds: ["bones", "joints", "thermal-baths", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support joint comfort, recovery, and relaxation through mineral baths.",
    description:
      "A historic spa town in west-central Georgia known for thermal mineral baths.",
    pricePerNight: 110,
    rating: 4.6,
    imageUrl: "./images/tskaltubo.jpg",
    contactEmail: "info@tskaltubospa.com",
  },
  {
    name: "Abastumani Mountain Resort",
    region: "Samtskhe-Javakheti",
    city: "Abastumani",
    treatmentType: "Mountain Air Wellness",
    wellnessBenefits: ["Breathing Support", "Fresh Air", "Relaxation"],
    wellnessNeeds: ["lungs", "breathing", "nature-wellness", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support breathing and relaxation because of clean mountain air.",
    description:
      "A mountain wellness destination known for pine forests, clean air, and peaceful climate.",
    pricePerNight: 130,
    rating: 4.8,
    imageUrl: "./images/abastumani.png",
    contactEmail: "hello@abastumaniwellness.com",
  },
  {
    name: "Ureki Magnetic Sand Beach",
    region: "Guria",
    city: "Ureki",
    treatmentType: "Magnetic Sand Wellness",
    wellnessBenefits: ["Joint Comfort", "Relaxation", "Sea Air"],
    wellnessNeeds: ["bones", "joints", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support joint comfort and relaxation because of magnetic black sand.",
    description:
      "A Black Sea destination known for magnetic sand, beach wellness, and family tourism.",
    pricePerNight: 90,
    rating: 4.5,
    imageUrl: "./images/ureki.jpg",
    contactEmail: "visit@urekiwellness.com",
  },
  {
    name: "Sairme Mountain Health Retreat",
    region: "Imereti",
    city: "Sairme",
    treatmentType: "Mountain Mineral Water",
    wellnessBenefits: ["Detox", "Fresh Air", "Mineral Water"],
    wellnessNeeds: ["detox", "mineral-water", "digestion", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support digestion, detox, and relaxation through mineral water and mountain air.",
    description:
      "A mountain wellness retreat offering mineral water, forest air, and relaxation.",
    pricePerNight: 140,
    rating: 4.8,
    imageUrl: "./images/sairme.png",
    contactEmail: "hello@sairmeretreat.com",
  },
  {
    name: "Tbilisi Thermal Spa Center",
    region: "Tbilisi",
    city: "Tbilisi",
    treatmentType: "Sulfur Thermal Bath",
    wellnessBenefits: ["Muscle Relaxation", "Skin Health", "Recovery"],
    wellnessNeeds: ["thermal-baths", "skin", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support skin comfort, muscle relaxation, and recovery through sulfur baths.",
    description:
      "A thermal spa center inspired by Tbilisi's historic sulfur bath tradition.",
    pricePerNight: 95,
    rating: 4.5,
    imageUrl: "./images/tbilisi.png",
    contactEmail: "contact@tbilisithermalspa.com",
  },
];

// Community-submitted local wellness and mineral water places
const communityListings = [
  {
    name: "Abasha Sulfur Water Spring",
    region: "Samegrelo-Zemo Svaneti",
    city: "Abasha",
    listingType: "Sulfur Water Spring",
    wellnessNeeds: ["skin", "mineral-water", "kidney"],
    traditionalBenefits:
      "Traditionally believed to support skin comfort and relaxation through sulfur mineral water.",
    description:
      "A local community-submitted sulfur water source in western Georgia.",
    submittedBy: "Community Member",
    rating: 4.4,
    imageUrl: "./images/abasha.png",
  },
  {
    name: "Senaki Mineral Water Source",
    region: "Samegrelo-Zemo Svaneti",
    city: "Senaki",
    listingType: "Mineral Water Source",
    wellnessNeeds: ["mineral-water", "digestion", "relaxation"],
    traditionalBenefits:
      "Traditionally believed to support digestion and general wellness through local mineral water.",
    description:
      "A community-submitted mineral water source near Senaki.",
    submittedBy: "Community Member",
    rating: 4.3,
    imageUrl: "./images/senaki.png",
  },
  {
    name: "Racha Mineral Water Spring",
    region: "Racha-Lechkhumi and Kvemo Svaneti",
    city: "Racha",
    listingType: "Mountain Mineral Water",
    wellnessNeeds: ["mineral-water", "digestion", "nature-wellness"],
    traditionalBenefits:
      "Traditionally believed to support digestion and relaxation through mountain mineral water.",
    description:
      "A local mineral water spring submitted by the community from the Racha region.",
    submittedBy: "Community Member",
    rating: 4.6,
    imageUrl: "./images/racha.png",
  },
];

// Function that inserts starter data into MongoDB
async function seedDatabase() {
  try {
    // Connect to the geowellhub database
    const db = await connectToDatabase();

    // Get both collections
    const retreatsCollection = db.collection("retreats");
    const communityListingsCollection = db.collection("communityListings");

    // Delete old test data so we do not duplicate records every time
    await retreatsCollection.deleteMany({});
    await communityListingsCollection.deleteMany({});

    // Insert starter data into both collections
    await retreatsCollection.insertMany(retreats);
    await communityListingsCollection.insertMany(communityListings);

    console.log("Retreat and community listing seed data inserted successfully.");

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