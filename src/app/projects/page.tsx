
import ProjectsList from './components/ProjectsList'

export async function generateMetadata() {
    return {
        title: 'Projects',
        description: 'Projects page',
    }
    }
    
export default function ProjectsPage() {
   
  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Projects</h1>
        <ProjectsList />
    </main>
  )
}
