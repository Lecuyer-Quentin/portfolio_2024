'use client'

import { useState, useEffect, useRef } from 'react'
import Images from 'next/image'
import { getProjectById } from '../../../../../libs/projects'
import { Radio } from 'react-loader-spinner'

interface Props {
    params: {
        id: string
    }
}

export default function ProjectDetails( { params: { id } }: Props) {
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProject = async () => {
            const project = await getProjectById(id)
            setProject(project)
            setLoading(false)
        }
        fetchProject()
    }, [ id ])

    const { title = '', description, images, demo, github } = project || {}

    const renderImages = () => {
        return (
            <>
                {project && project.images.map((image, index) => (
                    <Images 
                    key={index}
                    src={image} alt={title} width={300} height={300} />
                ))}
            </>
        )
    }



    if (loading) return <> <Radio /> </>

    if (!project) return <div>Not found</div>


    return (
        <main className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col items-center justify-center'>
                    {renderImages()}

                    <div className='flex flex-row'>
                        <a href={demo} target='_blank' rel='noopener noreferrer' className='px-4 py-2 bg-gray-800 text-white rounded-md'>Visit Site</a>
                        <a href={github} target='_blank' rel='noopener noreferrer' className='px-4 py-2 bg-gray-800 text-white rounded-md'>Github</a>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-xl font-bold text-center'>{description}</p>
                </div>
            </div>
            

        </main>
    )

   
}