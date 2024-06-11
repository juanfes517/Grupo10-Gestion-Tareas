import CardFeature from './CardFeature'
import { faThumbtack, faCalendarDays, faChartColumn, faPeopleGroup, faEnvelope, faSitemap } from '@fortawesome/free-solid-svg-icons'

/* 
  Componente que muestra la página de inicio de la aplicación
  Incluye una sección principal con información sobre la aplicación y una sección con las funcionalidades clave
*/
function Landing() {
  return (
    <div>
      <div className='sm:snap-y sm:snap-proximity h-screen w-screen overflow-scroll'>
        <section className='h-screen flex sm:items-center justify-around p-[30px] bg-secondary snap-start'>
          <div className='w-[730px] h-[300px] mt-[120px]'>
            <p className='sm:text-[35px] text-[25px] my-[25px] font-bold font-crimsonText'>
              Gestiona tus tareas y proyectos sin esfuerzo
            </p>
            <p className='text-tertiary text-[19px]'>Nuestra solución para la gestión de tareas y proyectos te ayuda a mantenerte organizado,
              colaborar con tu equipo y alcanzar tus objetivos de manera más eficiente.
            </p>
            <div className='w-[130px] h-[40px] flex justify-center select-none cursor-pointer items-center bg-primary 
            rounded-lg	my-[30px] hover:opacity-90'>
              <p className='text-white text-[20px] font-[450] flex justify-center items-center'>
                Empezar
              </p>
            </div>
          </div>
          <div className="hidden sm:block bg-white w-[500px] h-[400px] bg-cover sm:bg-[url('/Images/img-3.jpg')] 
          rounded-lg shadow-[2px_2px_7px_4px_rgba(0,0,0,0.2)]">
          </div>
        </section>

        <section className='h-screen grid place-items-center py-[20px] snap-start'>
          <h1 className='text-primary sm:text-[30px] text-[25px] font-bold text-center my-[20px] w-full'>Funcionalidades clave</h1>
          <div className='w-full h-full grid lg:grid-cols-3 md:grid-cols-2 place-items-center'>
            <CardFeature 
              Icon={faThumbtack}
              title='Asignación de tareas'
              description='Asigne tareas fácilmente a los miembros del equipo y realice un seguimiento de su progreso.' />
            <CardFeature 
              Icon={faCalendarDays}
              title='Calendario de proyectos'
              description='Manténgase al tanto de los plazos y fechas importantes.' />
            <CardFeature 
              Icon={faChartColumn}
              title='Reporting'
              description='Genere informes detallados para realizar un seguimiento del progreso e identificar áreas de mejora.' />
            <CardFeature 
              Icon={faPeopleGroup}
              title='Colaboración'
              description='Colabora con tu equipo y mantente alineado con los objetivos del proyecto.' />
            <CardFeature 
              Icon={faEnvelope}
              title='Notificaciones'
              description='Manténgase informado con notificaciones sobre actualizaciones de tareas y plazos.' />
            <CardFeature 
              Icon={faSitemap}
              title='Automatización'
              description='Optimice sus flujos de trabajo con recordatorios y activadores de tareas automatizados.' />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Landing