import React, { useContext, useState } from 'react'
import { IoMdAttach } from "react-icons/io"
import { BiImageAdd } from "react-icons/bi"
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ChatContext } from '../context/chatcontext'
import { AuthContext } from '../context/authcontext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
export const Input = () =>
{
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const { user } = useContext(ChatContext)
    const { currentUser } = useContext(AuthContext)
    
    const handleClick = async (e) =>
    {
        const washingtonRef = doc(db, "chats", user.chatId);
        if (!img)
        {
            // Atomically add a new region to the "regions" array field.
            await updateDoc(washingtonRef, {
                messages: arrayUnion({
                    senderId: currentUser.uid,
                    text,
                    date: Timestamp.now(),
                })
            });
        } else
        {
            const storageRef = ref(storage, currentUser.uid);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) =>
                {
                },
                async () =>
                {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>
                    {
                        console.log(downloadURL)
                        // Atomically add a new region to the "regions" array field.
                        await updateDoc(washingtonRef, {
                            messages: arrayUnion({
                                senderId: currentUser.uid,
                                text,
                                date: Timestamp.now(),
                                photoURL: downloadURL,
                            })
                        });
                    });
                }
            );
        }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [user.chatId + ".date"]: serverTimestamp(),
            [user.chatId + ".lastMessage"]: text,
        })

        await updateDoc(doc(db, "userChats", user.user.uid), {
            [user.chatId + ".date"]: serverTimestamp(),
            [user.chatId + ".lastMessage"]: text,
        })

        setText("")
        setImg(null)
    }
    return (
        <div className="message-input">
            <input type="text" placeholder="Type something ...." onChange={(e) => { setText(e.target.value) }} value={text} />
            <label>
                <input type="file" style={{ display: "none" }} onChange={(e) => { setImg( e.target.files[0]) }} />
                <IoMdAttach />
                <BiImageAdd />
            </label>
            <button className="send" onClick={(e) => handleClick(e)}>Send</button>
        </div>
    )
}
