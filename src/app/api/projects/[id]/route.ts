import { connectToDb } from '../../../../../libs/mongo';
import Project from '../../../../../models/project';
import { NextResponse } from 'next/server';


type Props = {
    params : {
        id: string
    }
}

export async function GET(request :Request, { params }: Props) {
    const {id} = params;
    await connectToDb();
    const response = await Project.findById(id);
    const project = await response

    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
}

