'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAllByUserId } from '@/hooks/useUserProject'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FormCreateProject from "./FormCreateProject"
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import CardProject from './CardProject'
import Loading from '../atoms/Loading'

// Componente que muestra todos los proyectos de un usuario
// Incluye un botón para crear un nuevo proyecto
function Project() {

  const [showModalForm, setShowModalForm] = useState(false)
  const [formSubmit, setFormSubmit] = useState(false)

  const { data: session } = useSession()
  const { data, loading, error, refetch } = useGetAllByUserId(session?.user?.id)

  useEffect(() => {
    if (formSubmit) {
      refetch();
      setFormSubmit(false)
    }
  }, [formSubmit, refetch])

  if (loading) return <Loading />
  if (error) return <Alert severity="error">{error.message}</Alert>

  const handleModalForm = () => {
    setShowModalForm(!showModalForm);
  }

  const handleFormSubmit = () => {
    setFormSubmit(true);
  }
  
  return (
    <div className='w-full h-full flex-col'>
      <div className='w-full h-[100px] px-[50px] flex flex-col sm:flex-row sm:justify-between items-center mt-[65px]'>
        <p className='text-[28px] font-bold'>Proyectos</p>
        <div
          className='w-[150px] h-[40px] bg-primary flex justify-center items-center text-white rounded-md select-none
          cursor-pointer hover:opacity-[0.9]'
          onClick={handleModalForm} >
          <FontAwesomeIcon icon={faPlus} className='mr-[9px] text-[18px]' />
          Nuevo proyecto
        </div>
      </div>

      <FormCreateProject 
        show={showModalForm}
        onClose={handleModalForm}
        onSubmitForm={handleFormSubmit} />

      <div className='grid xl:grid-cols-3 md:grid-cols-2 place-items-center'>
        {data && data.all_projects_of_a_user.map((userProject) => (
          <CardProject
            key={userProject.project.id}
            projectName={userProject.project.name}
            state={userProject.project.state}
            description={userProject.project.description}
            date={new Date(userProject.project.expires).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            color={userProject.project.color}
            projectId={userProject.project.id}
            onSubmitForm={handleFormSubmit} />
        ))}
      </div>
    </div>
  )
}

export default Project