'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useGetAllByUserId } from '@/hooks/useTask'
import FormCreateTask from './FormCreateTask'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import Loading from '../atoms/Loading'
import CardTask from './CardTask'

// Componente que muestra todas las tareas de un usuario
// Incluye un botón para crear una nueva tarea
function Task() {

  const [showModal, setShowModal] = useState(false)
  const [formSubmit, setFormSubmit] = useState(false)

  const { data: session } = useSession()
  const { data, loading, error, refetch } = useGetAllByUserId(session?.user?.id);

  useEffect(() => {
    if (formSubmit) {
      refetch();
      setFormSubmit(false)
    }
  }, [formSubmit, refetch])

  if (loading) return <Loading />
  if (error) return <Alert severity="error">{error.message}</Alert>

  const handleModalForm = () => {
    setShowModal(!showModal);
  }

  const handleFormSubmit = () => {
    setFormSubmit(true);
  }

  return (
    <div className='w-full h-full flex-col'>
      <div className='w-full h-[100px] px-[50px] flex flex-col sm:flex-row sm:justify-between items-center mt-[65px]'>
        <p className='text-[28px] font-bold'>Tareas</p>
        <div
          className='w-[150px] h-[40px] bg-primary flex justify-center items-center text-white rounded-md select-none
          cursor-pointer hover:opacity-[0.9]'
          onClick={handleModalForm} >
          <FontAwesomeIcon icon={faPlus} className='mr-[9px] text-[18px]' />
          Nueva Tarea
        </div>
      </div>
      <FormCreateTask
        show={showModal}
        onClose={handleModalForm}
        isPersonal={true}
        onSubmitForm={handleFormSubmit} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-4'>
        {data && data.tasks.map((task: any) => (
          <CardTask
            taskId={task.id}
            onChange={handleFormSubmit}
            key={task.id}
            taskName={task.name}
            state={task.state}
            description={task.description}
            date={new Date(task.expires).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            project={task.project}
            isPersonal={task.isPersonal}
            isTaskView={true} />
        ))}
      </div>
    </div>
  )
}

export default Task