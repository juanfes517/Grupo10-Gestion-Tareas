import { faThumbtack, faUser, faDiagramProject, faBars, faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react'
import SidebarItem from './SidebarItem'
import { useState } from 'react'
import Link from 'next/link'

// Componente que muestra la barra lateral de la aplicación
// Incluye los enlaces a las secciones de la aplicación
function Sidebar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false)
  const { data: session, status } = useSession()

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  }

  return (
    <>
      {/* Botón de menú hamburguesa */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 text-secondary`}
      >
        <FontAwesomeIcon icon={faBars} className='text-[24px]' />
      </button>

      {/* Barra lateral */}
      <div
        className={`bg-secondary w-[180px] h-screen flex flex-col items-center fixed top-0 mt-[65px] transition-transform duration-300 ease-in-out z-40 ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className={`h-[70px] w-[70px] rounded-full my-[50px]`}>
        <img 
          src={session?.user.image + ""}
          alt="Profile Image" 
          className="w-full h-full object-cover rounded-full" />
        </div>
        <Link href='/tasks'>
          <SidebarItem Icon={faThumbtack} name='Tareas' />
        </Link>
        <Link href='/projects'>
          <SidebarItem Icon={faDiagramProject} name='Projectos' />
        </Link>
        <Link href='/users'>
          <SidebarItem Icon={faUser} name='Usuarios' />
        </Link>
        <Link href='/settings'>
          <SidebarItem Icon={faGears} name='Settings' />
        </Link>
      </div>

      {/* Overlay para cerrar la barra lateral en pantallas pequeñas */}
      {isSidebarVisible && (
        <div
          onClick={toggleSidebar}
          className='fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30'
        ></div>
      )}
    </>
  )
}

export default Sidebar