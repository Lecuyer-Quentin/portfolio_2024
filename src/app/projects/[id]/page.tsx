
import ProjectDetails from './components/ProjectDetails'
import { getSortedProjects } from '../../../../libs/projects'

export async function generateStaticParams(){
    const projects = await getSortedProjects()
    if (!projects) return []
    const params = projects.map((project:Project) => ({
        params: {
            id: project._id
        }
    }))
    return {params, fallback: false}
}


//! This is the function that generates the metadata for the page
//! Don't work
export function generateMetadata({params }: { params: { id: string } }) {
    //const project = getProjectById(params.id)
    //if (!project) return {title: 'Project not found'}
    return {
        title: "Project's details" 
    }
}


export default function ProjectPage({ params }: { params: { id: string } }) {
    return (
        <main className='flex flex-col items-center justify-center min-h-screen py-2'>
            <ProjectDetails params={params} />
        </main>
    )
}


   

