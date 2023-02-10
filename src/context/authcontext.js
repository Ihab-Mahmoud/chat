import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) =>
{

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() =>
    {
        const control = onAuthStateChanged(auth, (user) =>
        {
            setCurrentUser(user)
        })

        return () =>
        {
            control();
        };


    }, []);
    return (
        < AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider >
    )
}