'use client'

import { useCreatePersonalTask, useCreateProjectTask } from '../../hooks/useTask'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { useSession } from 'next-auth/react'

interface Props {
  show: boolean,
  onClose: any,
  isPersonal: boolean,
  onSubmitForm: any,
  projectId?: string
}

interface Inputs {
  name: string
  description: string
  expires: Date,
  email: string
}

// Componente que muestra un formulario para crear una nueva tarea
// Incluye campos para el nombre, descripción, fecha de vencimiento y responsable
function FormCreateTask({ show, onClose, isPersonal, onSubmitForm, projectId }: Props) {

  if (!show) {
    return null;
  }

  const { createPersonalTask } = useCreatePersonalTask()
  const { createProjectTask, data: projectData } = useCreateProjectTask()
  const { data: session } = useSession()

  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {

    if (isPersonal) {
      createPersonalTask({
        variables: {
          "name": data.name,
          "description": data.description,
          "expires": new Date(data.expires).toISOString(),
          "userId": session?.user.id
        }
      })
      onSubmitForm()
      onClose()
      window.alert("Tarea creada con éxito")
    } else {
      createProjectTask({
        variables: {
          "name": data.name,
          "description": data.description,
          "email": data.email,
          "projectId": projectId,
          "expires": new Date(data.expires).toISOString()
        }
      })
      if (projectData?.createProjectTask == null) {
        window.alert("El usuario no existe")
      } else {
        onSubmitForm()
        onClose()
        window.alert("Tarea creada con éxito")
      }
    }
  }

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-10'>
      <div className='flex items-center flex-col w-11/12 sm:max-w-[550px] bg-white opacity-100 rounded-xl p-4' >
        <div
          className='cursor-pointer float-end w-full flex justify-end'
          onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} className='hover:text-tertiary hover:scale-125' />
        </div>
        <div className='flex justify-between mb-[30px]'>
          <div>
            <p className='text-[18px] font-semibold text-primary'>Crea una Nueva Tarea</p>
            <p className='text-tertiary'>Llena todos los campos para crear una nueva tarea</p>
          </div>
        </div>
        <div className='flex sm:items-center flex-col sm:flex-row justify-between sm:w-11/12'>
          <p className='text-tertiary'>Nombre</p>
          <input
            type='text'
            className='border-[2px] rounded my-2 sm:ml-[8px] h-[35px] w-72 sm:w-[350px] pl-[5px]'
            {...register('name')} />
        </div>
        <div className='flex sm:items-center flex-col sm:flex-row justify-between sm:w-11/12'>
          <p className='text-tertiary'>Descripción</p>
          <textarea
            className='border-[2px] rounded my-2 sm:ml-[8px] h-[100px] w-72 sm:w-[350px] pl-[5px]'
            {...register('description')} />
        </div>
        <div className='flex sm:items-center flex-col sm:flex-row justify-between sm:w-11/12'>
          <p className='text-tertiary'>Fecha Limite</p>
          <input
            type='date'
            className='text-tertiary border-[2px] rounded my-2 sm:ml-[8px] h-[35px] w-72 sm:w-[350px] pl-[5px]'
            {...register('expires')} />
        </div>
        {!isPersonal && (
          <div className='flex sm:items-center flex-col sm:flex-row justify-between sm:w-11/12'>
            <p className='text-tertiary'>Responsable</p>
            <input
              type='text'
              className='border-[2px] rounded ml-[8px] h-[35px] w-72 sm:w-[350px] pl-[5px]'
              {...register('email')} />
          </div>
        )}
        <div className='flex flex-row justify-end items-center mt-4 w-full'>
          <div
            className='h-[40px] text-white bg-primary border-[1px] rounded-md mr-[15px] flex items-center justify-center
            px-[10px] cursor-pointer hover:opacity-90'
            onClick={handleSubmit(onSubmit)} >
            Crear Tarea
          </div>
          <div
            className='h-[40px] border-[1px] rounded-md flex items-center justify-center px-[10px] cursor-pointer
            hover:bg-secondary'
            onClick={onClose} >
            Cancelar
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormCreateTask