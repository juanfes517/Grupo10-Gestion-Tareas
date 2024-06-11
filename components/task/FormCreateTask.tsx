'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useCreateTask } from '../../hooks/useTask'
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

  const { createTask, data: d } = useCreateTask()
  const { data: session } = useSession()

  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {

    let resp = ''

    if (isPersonal) resp = session?.user.email + ""
    else resp = data.email

    createTask({
      variables: {
        "name": data.name,
        "description": data.description,
        "email": resp,
        "expires": new Date(data.expires).toISOString(),
        "isPersonal": isPersonal,
        "projectId": projectId
      }
    })
    onSubmitForm()
    onClose()
    if (d?.createTask == null) {
      window.alert("El usuario no existe")
    } else {
      window.alert("Tarea creada con éxito")
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