import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate() // this hook is used for navigating , and here we are using it for redirecting to home

    const handleSubmit = async (e) => {
        try {
            e.preventDefault() // prevent form from reloading
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const json = await response.json()
            console.log(json)
            if (json.success) { // success variable is declared in auth.js in backend
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken)
                props.showAlert("Logged in Successfully", "success")
                navigate("/") // navigating to Home
            }
            else {
                props.showAlert("Invalid Details", "danger")
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h2 className='mt-3'>Login to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
