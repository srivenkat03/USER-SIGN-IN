

const express = require("express");
const app = express();
const path = require("path");
const { MongoClient } = require("mongodb");

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGO_URL = process.env.MONGO_URL || "mongodb://root:querty@mongo:27017/Users-db?authSource=admin";
console.log("Connecting to MongoDB with URL:", MONGO_URL);

const DB_NAME = "Users-db";

// GET all users
app.get("/getUsers", async (req, res) => {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const data = await db.collection('users').find({}).toArray();
    res.send(data);
  } catch (err) {
    console.error("Error in /getUsers:", err);
    res.status(500).send({ error: "Database error" });
  } finally {
    await client.close();
  }
});

// POST new user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const result = await db.collection('users').insertOne(userObj);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    console.error("Error in /addUser:", err);
    res.status(500).send({ error: "Database error" });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
