import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.rvc9ox2.mongodb.net/`;

export async function GET(req) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const database = client.db("rinventory");
  const inventory = database.collection("inventory");
  const query = req.nextUrl.searchParams.get("query");

  try {
    const products = await inventory
      .aggregate([
        {
          $match: {
            slug: {
              $regex: query,
              $options: "i",
            },
          },
        },
      ])
      .toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}
