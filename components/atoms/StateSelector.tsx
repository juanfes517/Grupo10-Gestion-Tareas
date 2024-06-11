interface Props {
  onChange: any,
  selectedOption: string,
}

// Componente que muestra un selector de estados: Pendiente, En progreso, Completada
function StateSelector({ onChange, selectedOption }: Props) {
  return (
    <select
      className={`h-[24px] sm:text-[15px] text-[12px] border-[2px] bg-primary bg-white px-[9px] rounded-xl focus:outline-none
          ${selectedOption === 'En progreso' ? 'border-blue-500' :
          selectedOption === 'Pendiente' ? 'border-red-500' : 'border-green-400'}`}
      value={selectedOption}
      onChange={onChange} >
      <option value='Pendiente'>Pendiente</option>
      <option value='En progreso'>En progreso</option>
      <option value='Completada'>Completada</option>
    </select>
  )
}

export default StateSelector