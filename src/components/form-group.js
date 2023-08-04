import React from "react";

function FormGroup(props) {
  return(
    <div className="form-group">
      <label htmlForfor={props.htmlFor}>{props.label}</label>
      {props.children}
    </div>
  )
}

export default FormGroup