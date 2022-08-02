const { MongoClient } = require("mongodb");

async function connectToDatabase() {
  const url = process.env.MONGODB_URL;

  const client = await MongoClient.connect(url, { useNewUrlParser: true });

  const db = client.db(process.env.MONGODB_DBNAME);

  return db;
}

export { connectToDatabase };
