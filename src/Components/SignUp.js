import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" })
  let navigate = useNavigate()

  // eslint-disable-next-line
  const [passwordMatch, setPasswordMatch] = useState(true) // hook for matching the password
  const handleSubmit = async (e) => {
    e.preventDefault() // prevent form from reloading

    if(credentials.password!==credentials.confirmpassword){ // if password doesn't match in both the fields
      setPasswordMatch(false) // setting passwordMatch hook to false
      props.showAlert("Password doesn't match.","danger")
      return // and rejecting the signup form from submitting
    }
    const { name, email, password } = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()
    console.log(json)

    if (json.success) { // success variable is declared in auth.js in backend
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/") // navigating to Home
      props.showAlert("Account Created Successfully","success")
    }
    else {
      props.showAlert("Invalid Credentials","danger")
    }


  }

  const onChange = (e) => { // with this we can write and cancel the text
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) // here 'name' we are using in the form below
  }

  return (
    <div className='container my-3'>
      <h2 className='mt-3'>Sign Up to use iNotebook </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
