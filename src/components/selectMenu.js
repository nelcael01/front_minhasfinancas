import React from "react"

function SelectMenu(props) {
  
  const options = props.lista.map( (option, index) =>{
    return(
      <option key={index} value={option.value}>{option.label}</option>
    )
  })
  
  return(
    <select {...props} class="form-control">
      {options}
    </select>
  )

}
export default SelectMenu