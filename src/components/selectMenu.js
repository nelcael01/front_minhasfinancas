import React from "react"

function SelectMenu(props) {
  
  const options = props.lista.map( option =>{
    return(
      <option value={option.value}>{option.label}</option>
    )
  })
  
  return(
    <select {...props} class="form-control">
      {options}
    </select>
  )

}
export default SelectMenu