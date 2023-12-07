'use client'

import { useState, useRef, FormEvent, ChangeEvent, MouseEventHandler, use } from "react";
import axios from "axios";
import Images from "next/image";
import { useEffect } from "react";


export default function CreateProject() {
    const ref = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [github, setGithub] = useState<string>('')
    const [demo, setDemo] = useState<string>('')
    const [preview, setPreview] = useState<string[]>([])
    const [images, setImages] = useState<string[]>([])
    const [imagesToFormData, setImagesToFormData] = useState<string[]>([])


    useEffect(() => {
        setImagesToFormData(images)
        console.log(imagesToFormData)
    }, [images, imagesToFormData]
    )


    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const input = ref.current!
            const formData = new FormData()
            const files = Array.from(input.files ?? [])
            
            for (const file of files) {
                formData.append(file.name, file)
            }
            const response = await axios.post('/api/upload', formData)
            console.log(response)
            // const uploadedImages = response.data.images || []
            setPreview(files.map((file) => URL.createObjectURL(file)))
            setImages(files.map((file) => `/api/uploads/${file.name}`))

        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{

            //const imgName = images.map(image => image.split('/').pop())
            //console.log(imgName)
            
                await axios.post('/api/projects', {
                    title,
                    description,
                    github,
                    demo,
                    images: imagesToFormData
                })
            setTitle('')
            setDescription('')
            setGithub('')
            setDemo('')
            setPreview([])
            setImages([])
            setImagesToFormData([])
            }
         catch (error) {
            console.log(error)
        } 
    }
        
    
   

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleGithub = (e: ChangeEvent<HTMLInputElement>) => {
        setGithub(e.target.value)
    }

    const handleDemo = (e: ChangeEvent<HTMLInputElement>) => {
        setDemo(e.target.value)
    }

  return (
    <>
        <form onSubmit={handleUpload}>
            <input type="file" name="files" ref={ref} multiple />
            <button type="submit">Upload</button>
        </form>

        <form onSubmit={handleSubmit} className="flex flex-col items-center text-black">
            <input 
                className="border-2 border-gray-300 rounded-xl w-96 h-10"
                type="text" name="title" onChange={handleTitle} />
            <input
                className="border-2 border-gray-300 rounded-xl w-96 h-10"
                type="text" name="description" onChange={handleDescription} />
            <input
                className="border-2 border-gray-300 rounded-xl w-96 h-10"
                type="text" name="github" onChange={handleGithub} />
            <input
                className="border-2 border-gray-300 rounded-xl w-96 h-10"
                type="text" name="demo" onChange={handleDemo} />
            <div className="relative aspect-video border-2 border-gray-300 rounded-xl w-96 h-96">
                {preview.map((item) => {
                    return (
                        <Images
                            key={item}
                            src={item}
                            alt={item}
                            fill
                            className="rounded-xl"
                        />
                    )
                })}
            </div>

            <button
            className="border-2 border-gray-300 rounded-xl w-96 h-10 text-white"
             type="submit">Create Project</button>
        </form>
    </>

  )
}
