'use client'

import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { useGetAllByProjectId } from '../../hooks/useUserProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProjectDatails from './projectDatails/ProjectDatails'
import Alert from '@mui/material/Alert'
import { useState } from 'react'

interface Props {
  projectName: string,
  state: string,
  description: string,
  participants?: string[],
  date: string,
  color: string,
  projectId: string,
  onSubmitForm: any
}

// Componente que muestra una tarjeta con los detalles de un proyecto
// Incluye el nombre, estado, descripción, fecha y participantes
function CardProject({ projectName, state, description, date, color, projectId, onSubmitForm }: Props) {

  const [count, setCount] = useState(0)
  const [showModalDetails, setShowModalDetails] = useState(false)
  const { data, loading, error } = useGetAllByProjectId(projectId)

  if (error) return <Alert severity="error">{error.message}</Alert>

  const handleModalDetails = () => {
    setShowModalDetails(!showModalDetails);
  }
  return (
    <div>
      <ProjectDatails
        state={state}
        show={showModalDetails}
        onClose={handleModalDetails}
        projectName={projectName}
        date={date}
        description={description}
        projectId={projectId}
        onSubmitForm={onSubmitForm}      />
      <div
        className='sm:min-h-[270px] xl:w-[380px] w-[330px] my-[20px] shadow-[0px_5px_7px_4px_rgba(0,0,0,0.1)] 
        rounded-lg border-1 cursor-pointer'
        onClick={handleModalDetails}
      >
        <div
          style={{ backgroundColor: color }}
          className='w-full h-[10px] rounded-t-lg'
        />
        <div className='p-[30px]'>
          <div className='flex items-center justify-between'>
            <p className='text-[20px] font-bold'>{projectName}</p>
            <p className='bg-primary text-white px-[9px] rounded-xl text-[15px] w-[110px] text-center'>{state}</p>
          </div>
          <p className='text-tertiary my-[15px] truncate text-wrap h-[80px]'>
            {description}
          </p>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-around'>
              {data && data.all_users_of_a_project.slice(0, 3).map((userProject) => (
                <div key={userProject.user.id} className='w-[30px] h-[30px] bg-secondary rounded-full mr-[7px]'>
                  <img
                    src={userProject.user.image}
                    alt="Profile Image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ))}
              {data && data.all_users_of_a_project.length > 3 && (
                <div className='w-[30px] h-[30px] bg-secondary rounded-full mr-[7px] flex items-center justify-center'>
                  <p>+{count+(data.all_users_of_a_project.length-3)}</p>
                </div>
              )}
            </div>
            <div className='text-tertiary'>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className='mr-[7px] text-[17px]'
              />
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProject