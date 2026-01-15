import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
  applyRidersCollection: "applyRiders",
  newslatterSubscribersCollection: "subscribers",
  bookingParcelsCollection: "bookingParcels",
  usersCollection: "users",
  paymentsCollection: "payments",
  supportMessagesCollection: "supportMessages",
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  console.warn("Please add MONGODB_URI in .env.local");
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/transify";

if (!clientPromise) {
  if (process.env.MONGODB_URI) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = client.connect();
  }
}

export default async function dbConnect(collectionName) {
  if (!clientPromise) {
    // In case we are running without MONGODB_URI (e.g. build time), try to reconnect or throw
    if (!process.env.MONGODB_URI) {
      throw new Error("Please add MONGODB_URI in .env.local");
    }
    // Retry connection if it wasn't established (edge case)
    const retryClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = retryClient.connect();
  }
  const conn = await clientPromise;
  return conn.db("transify").collection(collectionName);
}
