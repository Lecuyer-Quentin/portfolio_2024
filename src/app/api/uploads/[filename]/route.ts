import { connectToDb } from "../../../../../libs/mongo";
import { NextResponse } from "next/server";

type Params = {
    params : {
        filename: string
    }
}

export async function GET(request: Request, {params}: Params) {
    const {bucket} = await connectToDb();
    const filename = params.filename as string
    if(!filename){
        return new NextResponse(null, {status: 400, statusText: "Bad Request"})
    }

    const files = await bucket.find({filename}).toArray()
    if(!files.length){
        return new NextResponse(null, {status: 404, statusText: "Not Found"})
    }

    const file = files.at(0)!

    // Force the type to be a readable stream to avoid type errors since NextResponse don't accept GridFSBucketReadStream
    const stream = bucket.openDownloadStreamByName(filename) as unknown as ReadableStream

    return new NextResponse(stream, {
        headers: {
            "Content-Type": file.contentType!,
            //"Content-Length": file.length.toString(),
            //"Content-Disposition": `inline; filename="${file.filename}"`
        }
    })
}


