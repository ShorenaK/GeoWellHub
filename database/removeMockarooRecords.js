import { connectToDatabase } from "./mongo.js";

async function removeMockarooRecords() {
  const db = await connectToDatabase();

  await db.collection("communityListings").deleteMany({
    mockarooRecord: true,
  });

  console.log("Mockaroo records removed.");
  process.exit(0);
}

removeMockarooRecords();
