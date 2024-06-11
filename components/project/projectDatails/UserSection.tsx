'use client'

import { useGetAllByProjectId } from '../../../hooks/useUserProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CardUserSimple from '../../users/CardUserSimple'
import FormAdduser from '../../users/FormAdduser'
import { useEffect, useState } from 'react'
import Loading from '../../atoms/Loading'
import Alert from '@mui/material/Alert'
import React from 'react'

// Componente que muestra los usuarios de un proyecto
// Incluye un botón para añadir un nuevo usuario
function UserSection({ projectId }: any) {

  const [showModalAdd, setShowModalAdd] = useState(false)
  const [formSubmit, setFormSubmit] = useState(false)

  const { data, loading, error, refetch } = useGetAllByProjectId(projectId)
  console.log(data)

  useEffect(() => {
    if (formSubmit) {
      refetch()
      setFormSubmit(false)
    }
  }, [formSubmit, refetch])

  if (loading) return <Loading />
  if (error) return <Alert severity="error">{error.message}</Alert>

  const handleModalAdd = () => {
    setShowModalAdd(!showModalAdd)
  }

  const handleFormSubmit = () => {
    setFormSubmit(true);
  }

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-center sm:justify-between'>
        <p className='text-[20px] font-semibold mb-[15px]'>Participantes</p>
        <div
          className='w-[200px] h-[35px] text-primary flex justify-center items-center rounded-md border-[2px]
            cursor-pointer hover:bg-secondary'
          onClick={handleModalAdd} >
          <FontAwesomeIcon icon={faPlus} className='mr-[9px] text-[18px]' />
          Agregar Participante
        </div>
      </div>

      <FormAdduser
        show={showModalAdd}
        onClose={handleModalAdd}
        projectId={projectId}
        onSubmit={handleFormSubmit} />

      <div className='w-full h-[250px] overflow-y-auto custom-scrollbar my-[7px]'>
        {data && data.all_users_of_a_project.map((userProject, index) => (
          <CardUserSimple
            key={index}
            userProjectId={userProject.id}
            email={userProject.user.email}
            image={userProject.user.image}
            onSubmit={handleFormSubmit} />
        ))}
      </div>
    </div>
  )
}

export default UserSection