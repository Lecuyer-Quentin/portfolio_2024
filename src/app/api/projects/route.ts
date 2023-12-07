import {connectToDb} from "../../../../libs/mongo";
import Project from "../../../../models/project";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    try {
        const { title, description, github, demo, images, createdAt } = await request.json();
        console.log('Received data:', { title, description, github, demo, images, createdAt});

        await connectToDb();
        console.log('Connected to MongoDB');

        const newProject = await Project.create({ title, description, github, demo, images, createdAt });
        console.log('Project created', newProject);

        return NextResponse.json({ message: "Project created", project: newProject}, { status: 201 });
        
    } catch (error) {
        console.error('Error in POST method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await connectToDb();
        console.log('Connected to MongoDB');

        const projects = await Project.find({});
        console.log('Projects found:', projects);

        return NextResponse.json(projects, { status: 200 });
        
    } catch (error) {
        console.error('Error in GET method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    try {
        const { id, title, description, github, demo} = await request.json();
        console.log('Received data:', { id, title, description, github, demo });

        await connectToDb();
        console.log('Connected to MongoDB');

        await Project.findByIdAndUpdate(id, { title, description, github, demo });
        console.log('Project updated');

        return NextResponse.json({ message: "Project updated" }, { status: 200 });
        
    } catch (error) {
        console.error('Error in PUT method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        console.log('Received data:', { id });

        await connectToDb();
        console.log('Connected to MongoDB');

        await Project.findByIdAndDelete(id);
        console.log('Project deleted');

        return NextResponse.json({ message: "Project deleted" }, { status: 200 });
        
    } catch (error) {
        console.error('Error in DELETE method:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function OPTIONS(request: Request) {
    return NextResponse.next();
}

