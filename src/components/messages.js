import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../components/message'
import { ChatContext } from '../context/chatcontext'
import { db } from '../firebase'

export const Messages = () =>
{

    // const { currentUser } = useContext(AuthContext)
    const { user } = useContext(ChatContext)
    const [messages, setMessages] = useState([])

    useEffect(() =>
    {
        const getMessages = () =>
        {
            const unsub = onSnapshot(doc(db, "chats", user.chatId), (doc) =>
            {
                doc.exists() && setMessages(doc.data().messages)
            });

            return () =>
            {
                unsub()
            }
        }
        
        user.chatId && getMessages()

    }, [user.chatId])

    return (
        <div className="messages">
            {
                messages.map((message,index) =>
                {
                    return (
                        <Message data={message} key={index}  />
                    )
                })
            }   
        </div>
    )
}
