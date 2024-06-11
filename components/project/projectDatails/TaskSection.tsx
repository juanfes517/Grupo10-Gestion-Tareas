'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAllByProjectId } from '../../../hooks/useTask'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import FormCreateTask from '../../task/FormCreateTask'
import { useState, useEffect } from 'react'
import CardTask from '../../task/CardTask'
import Loading from '../../atoms/Loading'
import Alert from '@mui/material/Alert'
import React from 'react'

// Componente que muestra las tareas de un proyecto
// Incluye un botón para crear una nueva tarea
function TaskSection({ projectId }: any) {

  const [showModalTask, setShowModalTask] = useState(false)
  const [formSubmit, setFormSubmit] = useState(false)

  const { data, loading, error, refetch } = useGetAllByProjectId(projectId)

  useEffect(() => {
    if (formSubmit) {
      refetch()
      setFormSubmit(false)
    }
  }, [formSubmit, refetch])

  if (loading) return <Loading />
  if (error) return <Alert severity="error">{error.message}</Alert>

  const handleModalTask = () => {
    setShowModalTask(!showModalTask)
  }

  const handleFormSubmit = () => {
    setFormSubmit(true);
  }

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-center sm:justify-between'>
        <p className='text-[20px] font-semibold mb-[15px]'>Tareas</p>
        <div
          className='w-[150px] h-[35px] text-primary flex justify-center items-center rounded-md border-[2px]
            cursor-pointer hover:bg-secondary'
          onClick={handleModalTask}>
          <FontAwesomeIcon icon={faPlus} className='mr-[9px] text-[18px]' />
          Nueva Tarea
        </div>
      </div>
      <FormCreateTask
        show={showModalTask}
        onClose={handleModalTask}
        isPersonal={false}
        projectId={projectId}
        onSubmitForm={handleFormSubmit} />

      <div className='w-full h-[300px] overflow-y-auto custom-scrollbar my-[5px] py-[18px]'>
        {data && data.task_of_project.map((task) => (
          <CardTask
            key={task.id}
            taskName={task.name}
            state={task.state}
            description={task.description}
            date={new Date(task.expires).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            isPersonal={false}
            email={task.responsible.email}
            isTaskView={false}
            image={task.responsible.image}
            taskId={task.id}
            onChange={handleFormSubmit} />
        ))}
      </div>
    </div>
  )
}

export default TaskSection