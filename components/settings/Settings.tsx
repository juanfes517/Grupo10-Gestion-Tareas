import { useUpdateRole } from '@/hooks/useUser'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

// Componente que muestra la configuración de la cuenta de usuario
// Incluye un campo para ingresar un código de administrador y cambiar el rol
function Settings() {

  const { updateRole, data, loading, error } = useUpdateRole()
  const { data: session } = useSession()
  const [text, setText] = useState('')

  const onChange = (event: any) => {
    setText(event.target.value)
  }

  const handleSubmit = () => {
    if (text === 'admin') {
      updateRole({
        variables: {
          userId: session?.user.id,
          role: 'admin'
        }
      })
      window.alert("Ahora eres ADMIN. Reincia tu sesión para acceder a los cambios")
    } else {
      window.alert("Código incorrecto")
    }
  }

  return (
    <div className='mt-[65px] px-[50px]'>
      <div className='flex justify-center sm:justify-start w-full'>
        <p className='text-[28px] font-bold pt-[35px]'>Configuración</p>
      </div>
      <hr className='my-[20px]' />
      <div className='flex items-center justify-center mt-[40px]'>
        <div className='md:w-5/12 bg-secondary flex flex-col items-start justify-center p-[20px] 
        rounded-lg border-[2px]'>
          <p className='text-primary text-[18px] mb-[20px] font-semibold'>
            Editar Perfil
          </p>
          <div className='flex sm:items-center flex-col sm:flex-row justify-between sm:w-11/12 mb-[20px]'>
            <p className='text-primary w-[120px]'>Código ADMIN</p>
            <input
              type='text'
              className='border-[2px] rounded my-2 sm:ml-[8px] h-[35px] w-72 sm:w-[350px] pl-[5px]'
              onChange={onChange} />
          </div>
          <div
            className='h-[40px] text-white bg-primary border-[1px] rounded-md mr-[15px] flex items-center justify-center
            px-[10px] cursor-pointer hover:opacity-90'
            onClick={handleSubmit}>
            Guardar
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings