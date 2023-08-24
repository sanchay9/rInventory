import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.rvc9ox2.mongodb.net/`;

export async function GET(req) {
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("sample_supplies").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return NextResponse.json({ message: "Hello World" });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
