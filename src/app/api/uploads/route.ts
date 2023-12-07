import { connectToDb } from "../../../../libs/mongo";
import { NextResponse } from "next/server";

export async function GET() {
    const { bucket } = await connectToDb();

    // Obtenez une liste de tous les fichiers dans le bucket
    const files = await bucket.find().toArray();

    // Renvoyez une liste de noms de fichiers
    return new NextResponse(JSON.stringify(files.map(file => file.filename)));
}