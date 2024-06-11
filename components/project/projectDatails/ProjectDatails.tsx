'use client'

import { faCalendarDays, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StateSelector from '../../atoms/StateSelector'
import { useUpdateStateProject } from '@/hooks/useProject'
import TaskSection from './TaskSection'
import UserSection from './UserSection'
import { useState } from 'react'

interface Props {
  state: string,
  show: boolean,
  onClose: any,
  projectName: string,
  date: string,
  description: string,
  projectId: string,
  onSubmitForm: any
}

// Componente que muestra los detalles de un proyecto
// Incluye el nombre, fecha, descripción, estado, tareas y usuarios
function ProjectDatails({ state, show, onClose, projectName, date, description, projectId, onSubmitForm }: Props) {

  if (!show) {
    return null;
  }

  const [selectedOption, setSelectedOption] = useState(state)

  const { updateStateProject, data, loading, error } = useUpdateStateProject()

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
    updateStateProject({
      variables: {
        projectId: projectId,
        state: event.target.value
      }
    })
    onSubmitForm()
  }

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center pt-[60px]'>
      <div className='h-[650px] w-[800px] bg-white rounded-md p-[20px] overflow-y-auto custom-scrollbar'>
        <div className='flex flex-col md:flex-row items-center justify-between relative'>
          <p className='text-[28px] text-primary font-bold'>{projectName}</p>
          <div className='text-tertiary my-4'>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className='mr-[7px] text-[17px]' />
            {date}
          </div>
          <StateSelector onChange={handleChange} selectedOption={selectedOption} />
          <div
            className='mt-[8px] mr-[10px] cursor-pointer absolute right-[-25px] top-[-25px]'
            onClick={onClose} >
            <FontAwesomeIcon icon={faXmark} className='text-[18px] hover:text-tertiary hover:scale-110' />
          </div>
        </div>
        <p className='text-tertiary my-[15px]'>{description}</p>

        <hr className='my-[35px]' />
        <TaskSection projectId={projectId} />
        <hr className='my-[35px]' />
        <UserSection projectId={projectId} />
        <hr className='my-[35px]' />

        <div>
          <div
            className='w-[110px] h-[35px] bg-primary flex justify-center items-center text-white rounded-md select-none
            cursor-pointer hover:opacity-[0.9]'
            onClick={onClose} >
            Aceptar
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDatails