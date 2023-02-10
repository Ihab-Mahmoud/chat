import React from 'react'
import { useState } from 'react'
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import add from "../images/3752804-200.png"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Register = () =>
{
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    let hanleSubmit = async (e) =>
    {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try
        {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) =>
                {
                    setError(true)
                },
                async () =>
                {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>
                    {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            displayName,
                            email,
                            uid: res.user.uid,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {
                        });
                        
                    });
                }
            );

            navigate("/login")
        } catch (error)
        {
            setError(true)
        };
    }
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h3 className="logo">Ihab Chat</h3>
                <span className="title">Register</span>
                <form onSubmit={hanleSubmit} >
                    <input type="text" placeholder="Display Name"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <label>
                        <input type="file"></input>
                        <img src={add} alt="Add avater" ></img>
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {
                        error && <span>Some thing went wrong ......</span>
                    }
                </form>
                <div className="have-account">
                    You do have account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}
