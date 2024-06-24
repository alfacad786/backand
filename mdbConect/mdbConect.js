const { MongoClient } = require("mongodb");

async function listCollections() {
  const uri = "mongodb://localhost:27017"; // MongoDB server ka URL
  const client = new MongoClient(uri);

  try {
    // MongoDB server se connect karein
    await client.connect();

    // Database select karein
    const db = client.db("myDatabase"); // yahan apna database name daalein

    // Collections ki list lein
    const collections = await db.listCollections().toArray();

    // Collections print karein
    console.log(
      "Collections:",
      collections.map((col) => col.name)
    );
  } catch (err) {
    console.error(err);
  }
}

listCollections();
