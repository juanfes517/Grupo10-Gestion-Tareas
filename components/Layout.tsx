import { useRouter } from 'next/router'
import Sidebar from './sidebar/Sidebar';
import Navbar from './NavBar';

// Componente que muestra la barra lateral y la barra de navegación, además del contenido de la página
const Layout = ({ children }: any) => {
  const router = useRouter()
  const showSidebar = ['/home', '/projects', '/tasks', '/users', '/settings'].includes(router.pathname)
  return (
    <div className='flex'>
      {showSidebar && <Sidebar />}
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;