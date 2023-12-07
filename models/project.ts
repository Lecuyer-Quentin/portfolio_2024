import mongoose, { Schema, Document } from "mongoose";

export interface ProjectModel extends Document {
    title: string;
    description: string;
    github: string;
    demo: string;
    images: string[];
    createdAt: string;
}

const projectSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        github: { type: String, required: true },
        demo: { type: String, required: true },
        images: { type: [String], required: true },
        createdAt: { type: String },
    },
        {timestamps: true}
);

const Project = mongoose.models.Project || mongoose.model<ProjectModel>("Project", projectSchema);

export default Project;