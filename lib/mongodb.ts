import { MongoClient } from "mongodb"

const MONGO_URI =
  "mongodb+srv://fluxxzyofficial_db_user:o1SekIQ7eZbVHHpv@swezesty.lbdr9bs.mongodb.net/swezesty-db?retryWrites=true&w=majority&appName=swezesty"
const DB_NAME = "swezesty-db"

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGO_URI)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function getDb() {
  const client = await clientPromise
  return client.db(DB_NAME)
}
