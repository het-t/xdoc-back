import env from "@config/env";
import { MongoClient, Collection } from "mongodb";

class DbConnection {
    private url?: string;
    private client?: MongoClient;

    async connect(url: string): Promise<void> {
        this.url = url;
        this.client = new MongoClient(url);
        await this.client.connect();
    }

    async disconnecti(): Promise<void> {
        await this.client?.close();
        this.client = undefined;
    }

    async getCollection(name: string): Promise<Collection> {
        if (!this.client && this.url) {
            await this.connect(this.url);
        }

        const db = this.client?.db(env.mongoDbName);

        if (!db) {
            throw new Error("MongoDB client is not connected");
        }

        return db.collection(name);
    }
}

export default new DbConnection();