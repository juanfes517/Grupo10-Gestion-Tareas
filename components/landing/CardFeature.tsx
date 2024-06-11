import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  Icon: any,
  title: string,
  description: string,
}

// Componente que muestra una tarjeta con un icono, título y descripción
function CardFeature({ title, description, Icon }: Props) {
  return (
    <div className='p-[24px] xl:w-[400px] w-[330px] h-[200px] my-[20px] shadow-[0px_5px_7px_4px_rgba(0,0,0,0.1)] rounded-lg'>
      <div className='w-[30px] h-[30px] mb-[10px]'>
        <FontAwesomeIcon icon={Icon} className='w-full h-full'/>
      </div>
      <h3 className='text-[20px] font-[700] text-primary mb-[10px]'>
        {title}
      </h3>
      <p className='text-tertiary'>
        {description}
      </p>
    </div>
  )
}

export default CardFeature