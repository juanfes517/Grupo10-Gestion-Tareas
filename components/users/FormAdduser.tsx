import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAssignUsers } from '@/hooks/useUserProject'
import { useState } from 'react';

interface Props {
  show: boolean,
  onClose: any,
  projectId: string,
  onSubmit: any
}

// Componente que muestra un formulario para agregar un usuario a un proyecto mediante su correo electrónico
function FormAdduser({ show, onClose, projectId, onSubmit }: Props) {

  if (!show) {
    return null;
  }

  const [email, setEmail] = useState('')
  const { assignUsers, data, loading, error } = useAssignUsers()

  const handleSubmit = async () => {
    try {
      await assignUsers({
        variables: {
          projectId: projectId,
          email: email
        }
      })
      onSubmit()
      onClose()
      window.alert("Usuario agregado con éxito")

    } catch (error: any) {
      window.alert(error.message)
    }
  }

  const handleChange = (event: any) => {
    setEmail(event.target.value)
  }

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center'>
      <div className='w-11/12 max-w-[550px] bg-white opacity-100 rounded-lg p-[10px]' >
        <div className='flex justify-between relative'>
          <p className='text-[20px] font-bold'>Agregar usuario</p>
          <div
            className='mt-[8px] mr-[10px] cursor-pointer absolute top-[-12px] right-[-12px]'
            onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className='hover:text-tertiary hover:scale-125' />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center my-[20px] w-full'>
          <p className='text-tertiary m-2'>Correo Electrónico</p>
          <input
            type='text'
            className='border-[2px] rounded ml-[8px] h-[35px] max-w-[350px] pl-[5px] w-full'
            onChange={handleChange} />
        </div>
        <div className='flex justify-end items-center'>
          <div
            className='h-[40px] text-white bg-primary border-[1px] rounded-md mr-[15px] flex items-center justify-center
            px-[10px] cursor-pointer hover:opacity-90'
            onClick={handleSubmit}>
            Agregar
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

export default FormAdduser