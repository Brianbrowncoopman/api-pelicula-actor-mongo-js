import { MongoClient, ServerApiVersion } from "mongodb";

const uri = 'mongodb+srv://brianbrowncoopman_db_user:OYgl6ckdQweheo9L@cine-db.vhov2s8.mongodb.net/?appName=cine-db' 

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client