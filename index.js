const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(cors());
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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

      app.post('/item', async (req, res) => {
        const data = req.body;
        const result = await collection.insertOne(data);
        res.send(result);
    });

    //   app.patch("/products/:id", async (req, res) => {
    //     const id = req.params.id
    //     //console.log(id)
    //     const filter = { _id: ObjectId(id) }
    //     const quantity = req.body
    //     //console.log(quantity)
    //     const options = { upsert: true };
    //     const doc = {
    //       $set: {
    //         availableQuantity: quantity.quantity
    //       }
    //     }
    //     const result = await productsCollection.updateOne(filter, doc, options)
    //     res.send(result)
  
    //   })

      app.delete('/delete/:id', async(req, res) =>{
        const id =  req.params.id;
        const query = {_id:ObjectId(id)}
        const result = await collection.deleteOne(query);
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