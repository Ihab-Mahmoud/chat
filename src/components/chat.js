import { React, useContext } from 'react'
import { BsFillCameraVideoFill }from "react-icons/bs"
import { IoIosPersonAdd }from "react-icons/io"
import { BiDotsHorizontal } from "react-icons/bi"
import { Messages } from '../components/messages'
import { Input } from '../components/input'
import { ChatContext } from '../context/chatcontext'

export const Chat = () =>
{
    const { user } = useContext(ChatContext)
    return (
        <div className="chat">
            <div className="chat-info">
                <span>{user.user.displayName}</span>
                <div className="chat-options">
                    <BsFillCameraVideoFill />
                    <IoIosPersonAdd />
                    <BiDotsHorizontal />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}
