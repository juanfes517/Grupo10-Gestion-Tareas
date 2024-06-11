import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDeleteUserProject } from '@/hooks/useUserProject'

interface Props {
  email: string,
  image: string,
  onSubmit: any,
  userProjectId: string,
}

// Componente que muestra una tarjeta con los detalles de un usuario en un proyecto de forma simplificada
// Incluye el correo y la imagen del usuario
function CardUser({ email, image, onSubmit, userProjectId }: Props) {

  const { deleteUserProject, data, loading, error } = useDeleteUserProject()

  console.log(userProjectId)

  const handleClick = () => {
    deleteUserProject({
      variables: {
        userProjectId: userProjectId,
      }
    })
    onSubmit()
    window.alert("Usuario eliminado del proyecto")
  }

  return (
    <div className='h-[70px] bg-secondary rounded-lg m-[10px] flex items-center justify-between px-[20px]'>
      <div className='flex items-center overflow-hidden'>
        <div>
          <div className='h-[40px] w-[40px] rounded-full mr-[15px]' >
            <img
              src={image}
              alt="Profile Image"
              className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
        <p className='text-primary m-0 overflow-hidden text-ellipsis whitespace-nowrap'>{email}</p>
      </div>
      <div 
        className='h-[35px] w-[35px] border-1 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E7E7E7]'
        onClick={handleClick}>
        <FontAwesomeIcon icon={faTrashCan} className='text-[15px] text-tertiary' />
      </div>
    </div>
  );
}

export default CardUser