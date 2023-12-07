import { MongoClient, GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

declare global {
    var client : MongoClient | null;
    var bucket : GridFSBucket | null;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

export async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }

    if(global.client){
        return {client: global.client, bucket: global.bucket!}
    }
    const client = (global.client = new MongoClient(uri!, {}));
    const bucket = (global.bucket = new GridFSBucket(client.db(), {
        bucketName: "images"
    }));
    await global.client.connect();
    console.log("MongoDB connected");
    return {client, bucket: bucket!}
}

export async function fileExists(filename: string): Promise<boolean> {
    const { client } = await connectToDb();
    const count = await client
        .db()
        .collection("images.files")
        .countDocuments({ filename });

    return !!count;
}