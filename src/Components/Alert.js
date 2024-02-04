import React from 'react'

const Alert = (props) => {
  const capitalize = (word) => {
    if(word==="danger"){ // if displaying danger in the alert message then changing it to error
      word="error"
    }
    let lower = word.toLowerCase() 
    return lower.charAt(0).toUpperCase() + lower.slice(1) // capitalizing first character of the success type
  }
  return (
    <div style={{ height: '50px' }}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert"> 
      {/*means if props.alert is false
    then other div statement won't execute */}
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>}
    </div>
  );
}

export default Alert
