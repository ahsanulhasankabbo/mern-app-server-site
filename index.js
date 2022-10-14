const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ex01sqw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const mernCollection = client.db('students').collection('information');

    app.post("/informations", async (req, res) => {
      const newuser = req.body;
      const result = await mernCollection.insertOne(newuser);

      res.send(result);
    });

    app.get("/students", async (req, res) => {
      const students = await mernCollection.find({}).toArray();
      res.send(students);
    });

  }
  finally {

  }

}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World! from mern')
})

app.listen(port, () => {
  console.log(`mern Example app listening on port ${port}`)
})