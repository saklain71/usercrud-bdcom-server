const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors());
app.use(express.json())
const { MongoClient, ServerApiVersion } = require('mongodb');


//od6UizUmFvBVZw4z
//crudBdcom

const uri = "mongodb+srv://crudBdcom:od6UizUmFvBVZw4z@cluster0.xopxfjp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const database = client.db("product");
      const collection = database.collection("products");
      //get
      app.get('/products', async(req,res) =>{
        const query = req.query;
        const cursor = collection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })
      
    } finally { }
  }

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('welcome in user crud bdcom server site')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})