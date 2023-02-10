import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from "../context/authcontext"
import { ChatContext } from '../context/chatcontext'
export const Navbar = () =>
{
    const { dispatch } = useContext(ChatContext)

    const logOut = () =>
    {
        dispatch({
            type: "CHANGE_USER", payload: {
                user: {},
                chatId: "",
            }
        })
        signOut(auth)
    }

    const { currentUser } = useContext(AuthContext)
    return (
        <div className="navbar">
            <span>Ihab Chat</span>
            <div className="user-info">
                <img src={currentUser.photoURL} alt="user" />
                <span>{currentUser.displayName}</span>
                {/* <button className="log-out"><Link to="/"> Log out</Link></button> */}
                <button onClick={() => { logOut() }} className="log-out"></button>
                <span>Exit</span>
            </div>
        </div>
    )
}
