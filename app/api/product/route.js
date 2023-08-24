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

  try {
    const query = {};
    const products = await inventory.find(query).toArray();
    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}

export async function POST(req) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const database = client.db("stock");
  const inventory = database.collection("inventory");
  let body = await req.json();

  try {
    const insertedProduct = await inventory.insertOne(body);
    return new NextResponse(200, insertedProduct);
  } finally {
    await client.close();
  }
}

export async function PUT(req) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const database = client.db("stock");
  const inventory = database.collection("inventory");
  let body = await req.json();

  try {
    let newQuantity =
      body.action == "plus"
        ? parseInt(body.currentQuantity) + 1
        : parseInt(body.currentQuantity) - 1;

    const filter = { slug: body.slug };
    const updateDoc = {
      $set: {
        quantity: newQuantity,
      },
    };

    const result = await inventory.updateOne(filter, updateDoc, {});
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    return new NextResponse({
      success: true,
      message: "Product updated successfully!",
    });
  } finally {
    await client.close();
  }
}
