'use client'

import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/css"

interface Props {
  show: boolean,
  onCloseColor: (color: string) => void
}

function ColorPalette({ show, onCloseColor }: Props) {

  if (!show) {
    return null;
  }

  // Hook para gestionar el estado del color seleccionado
  const [color, setColor] = useColor("#561ecb")

  // Función que maneja el cierre de la paleta de colores, pasando el color seleccionado
  const handleClose = () => {
    onCloseColor(color.hex)
  }

  // Mostar la paleta de colores
  return (
    <div className='fixed w-[80%] sm:w-[300px] z-50 p-[15px] bg-black right-[5%] sm:right-[190px] top-[10%] sm:top-[100px] rounded-xl'>
      <ColorPicker color={color} onChange={setColor} />
      <div className='w-full flex justify-end mt-[15px]'>
        <div
          className='h-[40px] sm:h-auto min-w-[150px] border-[2px] rounded-md flex items-center justify-center px-[10px] cursor-pointer bg-[#1ecb48] text-white'
          onClick={handleClose}>
          Aceptar
        </div>
      </div>
    </div>
  )
}

export default ColorPalette