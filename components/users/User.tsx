import { useGetAllUsers } from '../../hooks/useUser'
import Alert from '@mui/material/Alert'
import Loading from '../atoms/Loading'
import CardUser from "./CardUser"
import { useSession } from 'next-auth/react'

// Componente que muestra todos los usuarios
// Incluye un listado de usuarios con su información
function User() {

  const { data: session, status } = useSession()
  if (session?.user.role === 'user') {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Alert severity="warning">Función solo disponible para ADMINs</Alert>
      </div>
    )
  }

  const { data, loading, error } = useGetAllUsers()
  if (loading) return <Loading />
  if (error) return <Alert severity="error">{error.message}</Alert>

  return (
    <div className='mt-[65px] px-[50px]'>
      <p className='text-[28px] font-bold pt-[35px]'>Usuarios</p>
      <div className='w-full'>
        {data && data.users.map((user) => (
          <CardUser
            key={user.id}
            userId={user.id}
            name={user.name}
            email={user.email}
            createdAt={new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            image={user.image} 
            role={user.role} />
        ))}
      </div>
    </div>
  )
}

export default User