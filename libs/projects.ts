import axios from "axios";

export async function getSortedProjects(){
    try {
        const response = await axios.get('/api/projects')
        const projects = response.data
        const sortedProjects = projects.sort((a: Project, b: Project) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        )
        return sortedProjects
    } catch (error) {
        console.log(error)
    }
}

export async function getProjectById(id: string){
    try {
        const response = await axios.get(`/api/projects/${id}`)
        const project = response.data
        return project
    } catch (error) {
        console.log(error)
    }
}

