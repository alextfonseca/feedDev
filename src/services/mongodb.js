const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  const url =
    "mongodb+srv://alexDev:teste123@cluster0.3cbh4.mongodb.net/?retryWrites=true&w=majority";

  const client = await MongoClient.connect(url, { useNewUrlParser: true });

  const db = client.db("feedDev");

  return db;
}

module.exports = connectToDatabase;
