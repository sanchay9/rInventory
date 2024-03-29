import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.rvc9ox2.mongodb.net/`;

export async function DELETE(req) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const database = client.db(process.env.MONGODB_DB);
  const inventory = database.collection(process.env.MONGODB_COLLECTION);
  const body = await req.json();

  try {
    const id = new ObjectId(body._id);
    const filter = { _id: id };
    const product = await inventory.deleteOne(filter);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
