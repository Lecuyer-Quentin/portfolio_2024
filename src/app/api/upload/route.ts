import { connectToDb, fileExists } from "../../../../libs/mongo";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v4 as uuid} from 'uuid'


export async function POST(request: Request) {
    const {bucket} = await connectToDb();
    const data = await request.formData();

    const uploadedImages = []

   for (const entry of Array.from(data.entries())) {
        const [key, value] = entry;
        const isFile = typeof value === "object"

        if(isFile){
            const blob = value as Blob
            let filename = ''
            if('name' in blob){
                filename = (blob as File).name
            }


            //const exists = await fileExists(filename)
            //if(exists){
                //return NextResponse.json({
                    //message: "File already exists"}, {status: 400})
            //}
            const imageId = uuid()
            const buffer = Buffer.from(await blob.arrayBuffer())
            const stream = Readable.from(buffer)

            const uploadStream = bucket.openUploadStream(filename, {
                contentType: blob.type,
                metadata: {
                    imageId: imageId
                }     
            })

            stream.pipe(uploadStream)

            uploadedImages.push({
                filename,
                imageId
            })

        }
    }

    return NextResponse.json({
        message: "Upload successful",
        images: uploadedImages
    }, {status: 201})
}