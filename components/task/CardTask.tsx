import { faCalendarDays, faTrashCan, faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDeleteTask, useUpdateState } from '@/hooks/useTask'
import StateSelector from '../atoms/StateSelector'
import { useState } from 'react'

interface Props {
  taskName: string,
  state: string,
  description: string,
  date: string,
  project?: any,
  isPersonal: boolean,
  isTaskView: boolean,
  email?: string,
  image?: string,
  taskId: string,
  onChange: any
}

// Componente que muestra una tarjeta con los detalles de una tarea
// Incluye el nombre, estado, descripción, fecha y proyecto
function CardTask({ taskName, state, description, date, project, isPersonal, email, isTaskView, image, taskId, onChange }: Props) {

  const [selectedOption, setSelectedOption] = useState(state)
  const [isVisibleDetails, setIsVisibleDetails] = useState(false)
  const { deleteTask } = useDeleteTask()
  const { updateState, data, loading, error } = useUpdateState()

  const handleDelete = () => {
    deleteTask({
      variables: {
        taskId: taskId
      }
    })
    onChange()
    window.alert("Tarea eliminada con éxito")
  }
  
  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
    updateState({
      variables: {
        taskId: taskId,
        state: event.target.value
      }
    })
    onChange()
  }

  const toggleVisibilityDatails = () => {
    setIsVisibleDetails(!isVisibleDetails)
  }

  return (
    <div
      className={`bg-secondary m-[10px] rounded-lg flex border-[1px] 
        ${isVisibleDetails ? '' : 'sm:max-h-[100px]'}`}>
      <div
        className='h-full w-[8px] rounded-l-lg bg-black'
        style={project ? { backgroundColor: project.color } : { backgroundColor: '#f3f4f6' }} />
      <div className='px-[10px] pt-[15px] w-full'>
        <div className='flex justify-between items-center flex-wrap'>
          <div className='flex items-center'>
            {!isTaskView && (
              <div className='relative top-[5px] group mb-[10px] mr-[7px] flex items-center'>
                <div className='w-[27px] h-[27px] rounded-full' >
                  <img
                    src={image}
                    alt="Profile Image"
                    className="w-full h-full object-cover rounded-full" />
                </div>
                <div className='w-fit absolute bottom-full mb-2 hidden group-hover:block p-2 bg-gray-800 text-white
                    text-sm rounded z-[100]'>
                  {email}
                </div>
              </div>
            )}
            <p className='text-primary sm:text-[20px] font-bold'>{taskName}</p>

          </div>
          <StateSelector onChange={handleChange} selectedOption={selectedOption} />
        </div>
        {isVisibleDetails && (
          <div>
            <p className='text-tertiary mt-[15px] mb-[10px]'>{description}</p>
            <div className='flex items-center justify-between'>
              <div className='text-tertiary'>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className='mr-[7px] text-[17px]' />
                {date}
              </div>
              <div
                className='h-[30px] w-[30px] border-1 rounded-full  flex items-center justify-center ml-[30px]
                cursor-pointer hover:bg-[#E7E7E7]'
                onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashCan} className='text-[15px] text-tertiary' />
              </div>
            </div>
          </div>
        )}

        <hr className='my-[5px]' />
        <div className='h-[35px] flex flex-col items-center justify-center cursor-pointer' onClick={toggleVisibilityDatails}>
          <FontAwesomeIcon icon={isVisibleDetails ? faAnglesUp : faAnglesDown} className='text-[14px] text-tertiary' />
        </div>
      </div>
    </div>
  )
}

export default CardTask