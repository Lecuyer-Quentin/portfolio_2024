import React from 'react'
import Images from 'next/image'
import Link from 'next/link'

type Props = {
    project : Project
}


export default function ProjectCard({ project: Project }: Props) {
    const { title, description, github, demo, images, _id } = Project


  return (
    <Link href={`/projects/${_id}`}>
      <h4 className='text-2xl font-bold text-center'>{title}</h4>
      <div className="relative aspect-video border-2 border-gray-300 rounded-xl w-96 h-96">
          {images.map((image: string) => {
              return (
                  <Images
                      key={image}
                      src={image}
                      alt={image}
                      fill
                      sizes='100vw'
                      className="rounded-xl"
                  />
              )
          })}
      </div>
    </Link>
  )
}
