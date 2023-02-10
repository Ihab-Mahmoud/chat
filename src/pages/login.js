import { React, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export const Login = () =>
{
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const hanleSubmit = async (e) =>
    {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try
        {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error)
        {
            setError(true)
        }
    }
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h3 className="logo">Ihab Chat</h3>
                <span className="title">Login</span>
                <form onSubmit={hanleSubmit}>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button>Sign Login</button>
                    {
                        error && <span>Some thing went wrong ......</span>
                    }
                    <div className="have-account">
                        You do not have account? <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
