'use client'

import { useState } from 'react'
import { useUpdateRole } from '@/hooks/useUser'

interface Props {
  name: string
  email: string
  createdAt: string
  role: string
  image: string
  userId: string
}

// Componente que muestra una tarjeta con los detalles de un usuario
// Incluye el nombre, email, fecha de creación y rol
function CardUser({ name, email, createdAt, role, image, userId }: Props) {

  const { updateRole, data, loading, error } = useUpdateRole()
  const [selectedOption, setSelectedOption] = useState(role)

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
    updateRole({
      variables: {
        userId: userId,
        role: event.target.value
      }
    })
  }

  return (
    <div className='w-full md:h-[70px] bg-secondary my-[20px] rounded-lg flex md:flex-row 
    flex-col items-center justify-between p-[15px]'>
      <div className='flex md:flex-row flex-col items-center'>
        <div className='h-[47px] w-[47px] rounded-full my-2' >
          <img
            src={image}
            alt="Profile Image"
            className="w-full h-full object-cover rounded-full" />
        </div>
        <div className='flex flex-col items-center justify-center mx-[15px] my-2 sm:w-[220px]'>
          <p className='text-tertiary'>{name}</p>
          <p className=''>{email}</p>
        </div>
      </div>
      <div className='flex items-center flex-col my-2'>
        <p className='text-tertiary'>Fecha de creación: </p>
        <p>{createdAt}</p>
      </div>
      <select
        className='h-[24px] text-[15px] border-[2px] bg-primary bg-white px-[9px] rounded-xl focus:outline-none'
        value={selectedOption}
        onChange={handleChange} >
        <option value='user'>User</option>
        <option value='admin'>Admin</option>
      </select>
    </div>
  )
}

export default CardUser