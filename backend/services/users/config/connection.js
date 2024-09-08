const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI;
let db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    await client.connect();
    db = await client.db('yunikuro');
    console.log("You have connected to the MongoDB Cloud Database");
  } catch(err) {
    console.log(err);
    await client.close();
    throw new Error('Failed to connect to database');
  }
}
const getDB = () => db;

module.exports = { connect, getDB }