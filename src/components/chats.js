import { React, useState, useContext, useEffect } from 'react'
import {  doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase";
import { AuthContext } from "../context/authcontext"
import { ChatContext } from '../context/chatcontext'

export const Chats = () =>
{

    const [data, setData] = useState([])
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)


    useEffect(() =>
    {
        const getChats = () =>
        {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) =>
            {
                if (doc.exists())
                {
                    setData(doc.data())
                    // dispatch({ type: "CHANGE_USER", payload: Object.entries(doc.data())[0][1].userInfo })
                }
            });

            return () =>
            {
                unsub()
            }
        }
        currentUser.uid && getChats()

    }, [currentUser.uid])

    const handleClick = async (user) =>
    {
        dispatch({ type: "CHANGE_USER", payload: user })
    }
    return (
        <div className="chats">
            {Object.entries(data)?.sort((a, b) => b[1].date - a[1].date).map(chat =>
            {
                return (<div className="user-search" key={chat[0]} onClick={() => { handleClick(chat[1].userInfo) }} >
                    <img src={chat[1].userInfo.photoURL} alt=""></img>
                    <div className="user-search-info">
                        <h5>{chat[1].userInfo.displayName}</h5>
                        <span>{chat[1].lastMessage}</span>
                    </div>
                </div>)
            })}
        </div>
    )
}
