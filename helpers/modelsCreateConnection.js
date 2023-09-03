import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = 'xdoc';

export default function() {
    const client = new MongoClient(url, {
        monitorCommands: true
    })

    const db = client.db(dbName)

    return {
        client,
        db
    }
}