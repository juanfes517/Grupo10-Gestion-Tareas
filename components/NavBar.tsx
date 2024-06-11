import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { signIn, signOut, useSession } from 'next-auth/react'

// Componente que muestra la barra de navegación
// Incluye el logo de la aplicación y un botón para iniciar o cerrar sesión según el estado del usuario
function Navbar() {

  const { data: session, status } = useSession()

  return (
    <nav className='w-screen h-[65px] bg-primary fixed z-10 flex items-center justify-between'>
      <div className='text-white ml-[60px] select-none px-[10px] text-[20px] md:text-[28px]'>
        <FontAwesomeIcon icon={faListCheck} className='mr-[7px] text-[20px] md:text-[26px]' onClick={() => console.log(status)}/>
        Task Master
      </div>
      <div className='sm:mr-[60px] mr-[10px] text-[20px] text-white font-[450] w-[100px] select-none cursor-pointer 
      flex items-center justify-center'>
        {!session ?
          <p className='hover:underline hover:underline-offset-2' onClick={() => signIn('auth0', { callbackUrl: '/home' })}>Login</p> :
          <p className='hover:underline hover:underline-offset-2' onClick={() => signOut({ callbackUrl: '/' })}>SignOut</p>
        }

      </div>
    </nav>
  )
}

export default Navbar