import { React, useEffect } from 'react'
import { Sidebar } from '../components/sidebar'
import { Chat } from '../components/chat'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux"

export const Home = () =>
{
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}
