import { Timestamp } from 'firebase/firestore'
import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/authcontext'
import { ChatContext } from '../context/chatcontext'

export const Message = (data) =>
{

  const { user } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const ref = useRef()

  useEffect(() =>
  {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data])
  return (
    <div ref={ref} className={`${ data.data.senderId === user.user.uid && `message-receive` } message`
    }>
      <div className="message-info">
        
        <img src={data.data.senderId === currentUser.uid ? currentUser.photoURL : user.user.photoURL} alt="sender" />
        <span>{ Math.floor((Timestamp.now() - data.data.date) / (60 * 60 * 24)) !== 0 ? `${ Math.floor((Timestamp.now() - data.data.date) / (60 * 60 * 24)) } days ago`: Math.floor((Timestamp.now() - data.data.date) / (60 * 60 )) !== 0 ? `${ Math.floor((Timestamp.now() - data.data.date) / (60 * 60 )) } hours ago`:`${ Math.floor((Timestamp.now() - data.data.date) / (60)) } min ago`}</span>
      </div>
      <div className={`${ data.data.senderId === user.user.uid && `message-content-receive` } message-content`}>
        {data.data.text !== "" && <p className={`${ data.data.senderId === user.user.uid && `p-receive` }`}>{data.data.text}</p>}
        {data.data.photoURL && <img src={data.data.photoURL} alt="" />}
      </div>
    </div>
  )
}
