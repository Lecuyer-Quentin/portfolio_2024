'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { useEffect } from 'react'
import { Radio } from 'react-loader-spinner'
import { getSortedProjects } from '../../../../libs/projects'



export default function ProjectsList() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getSortedProjects()
            setProjects(projects)
            setLoading(false)
        }
        fetchProjects()
    }
    , [ ])


    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            <Radio />
        </div>
    }

    if (!projects) {
        return <div>Not found</div>
    }
   

    const renderProjects = () => {
        return projects.map((project: Project) => {
            return (
                <ProjectCard key={project._id} project={project} />
            )
        })
    }

            
  return renderProjects()
}
