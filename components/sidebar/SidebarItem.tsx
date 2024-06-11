import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  Icon: any,
  name: string,
}

// Componente que muestra un item de la barra lateral con un icono y nombre
const SidebarItem = ({ name, Icon }: Props) => (
  <div
    className='flex items-center w-[130px] h-[40px] cursor-pointer my-[5px] rounded text-tertiary text-[18px] font-[500]
    pl-[20px] hover:bg-[#e5e7eb] hover:text-primary focus:bg-[#e5e7eb] focus:text-primary'
    tabIndex={0} >
    <FontAwesomeIcon icon={Icon} className='text-[14px] mr-[8px]' />
    {name}
  </div>
)

export default SidebarItem