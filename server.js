const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://sajeeb:sajeeb@niduser.ln7prrt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('niduser').collection('niduser');
        console.log('db connected');

        // AUTH
        // app.post('/login', async (req, res) => {
        //     const user = req.body;
        //     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //         expiresIn: '1d'
        //     });
        //     res.send({ accessToken });
        // })


        //SERVICES API
        // app.get('/services', async (req, res) => {
        //     const cursor = inventoryCollection.find()
        //     const services = await cursor.toArray();
        //     res.send(services)
        // });

        // user nid 
        app.get('/usernid', async (req, res) => {
            const cursor = inventoryCollection.find()
            const usernid = await cursor.toArray();
            res.send(usernid)
        });

        //ADD ITEM API
        app.post('/usernid', async (req, res) => {
            const newItem = req.body;
            const usernid = await inventoryCollection.insertOne(newItem);
            res.send(usernid);
        });



    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('NID USER SERVER RUNNING')
});


app.listen(port, () => {
    console.log('Listening to port', port);
})
