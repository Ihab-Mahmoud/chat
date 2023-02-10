import { React, useState, useContext } from 'react'
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase";
import { AuthContext } from "../context/authcontext"
import { ChatContext } from '../context/chatcontext';

export const Search = () =>
{
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("")
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  const handleSearch = async () =>
  {
    const q = query(collection(db, "users"), where("displayName", "==", userName));
    try
    {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
      {
        setUser(doc.data())
        

      });
    } catch (error)
    {
      setErr(true)
    }

  }
  const handleKey = (e) =>
  {
    e.code === "Enter" && handleSearch()
  }
  const handleClick = async (e) =>
  {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    console.log(combinedId)
    const res = await getDoc(doc(db, "chats", combinedId))

    if (!res.exists())
    {
      await setDoc(doc(db, "chats", combinedId), { messages: [] })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [combinedId + ".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      [combinedId + ".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", user.uid), {
      [combinedId + ".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      },
      [combinedId + ".date"]: serverTimestamp(),
    })
    dispatch({ type: "CHANGE_USER", payload: user })

    setUserName("")
    setUser(null)
  }
  return (
    <div>
      <div className="search">
        <div className="search-form">
          <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} value={userName} />
        </div>
      </div>
      {user && <div className="user-search" onClick={e => handleClick(e)}   >
        <img src={user.photoURL} alt=""></img>
        <div className="user-search-info">
          <h5>{user.displayName}</h5>
          <span>thank you</span>
        </div>
      </div>}
      {err && <span>There was an err</span>}
    </div>
  )
}
