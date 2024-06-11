import styles from '../../styles/modules/animation.module.css'

// Componente que muestra un mensaje de bienvenida
function WelcomeText() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <p className='text-primary text-[24px]'>Bienvenido a</p>
      <p className={`text-primary text-[42px] font-bold ${styles.animatedText}`} >TaskMaster</p>
    </div>
  )
}

export default WelcomeText