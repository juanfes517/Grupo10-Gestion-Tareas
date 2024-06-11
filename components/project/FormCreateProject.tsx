'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateProject } from '@/hooks/useProject'
import ColorPalette from '../atoms/ColorPalette'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface Props {
  show: boolean,
  onClose: any,
  onSubmitForm: any
}

interface Inputs {
  name: string
  description: string
  expires: Date
  color: string
}

// Componente que muestra un formulario para crear un nuevo proyecto
// Incluye campos para el nombre, descripción, fecha de vencimiento y color
function FormCreateProject({ show, onClose, onSubmitForm }: Props) {

  if (!show) {
    return null;
  }

  const [showModalColor, setShowModalColor] = useState(false)
  const [color, setColor] = useState('#f3f4f6')

  const { createProject, data, loading, error } = useCreateProject()
  const { data: session } = useSession()

  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    createProject({
      variables: {
        "name": data.name,
        "description": data.description,
        "expires": new Date(data.expires).toISOString(),
        "color": color,
        "userId": session?.user.id,
      }
    })
    onSubmitForm()
    onClose()
    window.alert("Proyecto creada con éxito")
  }

  const handleOpenModalColor = () => {
    setShowModalColor(true);
  }

  const handleCloseModalColor = (newColor: string) => {
    setShowModalColor(false)
    setColor(newColor)
  }

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center'>
      <div className='flex items-center flex-col w-11/12 sm:max-w-[550px] bg-white opacity-100 rounded-xl p-4' >
        <div
          className='cursor-pointer float-end w-full flex justify-end'
          onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} className='hover:text-tertiary hover:scale-125' />
        </div>
        <div className='flex justify-between mb-[30px]'>
          <div>
            <p className='text-[18px] font-semibold text-primary'>Crea un Nuevo Proyecto</p>
            <p className='text-tertiary'>Llena todos los campos para crear un nuevo proyecto</p>
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
        <div className='flex sm:items-center flex-col sm:flex-row justify-between sm:w-11/12'>
          <div
            style={{ borderColor: color }}
            className='h-[40px] w-[150px] font-[450] border-[3px] rounded-md flex items-center justify-center 
            px-[10px] cursor-pointer bg-secondary'
            onClick={handleOpenModalColor}>
            Elegir color
          </div>
        </div>
        <ColorPalette show={showModalColor} onCloseColor={handleCloseModalColor} />
        <div className='flex flex-row justify-end items-center mt-4 w-full'>
          <div
            className='h-[40px] text-white bg-primary border-[1px] rounded-md mr-[15px] flex items-center justify-center
            px-[10px] cursor-pointer hover:opacity-90'
            onClick={handleSubmit(onSubmit)} >
            Crear Proyecto
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

export default FormCreateProject