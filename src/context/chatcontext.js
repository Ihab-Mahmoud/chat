import { createContext, useContext, useReducer } from "react"
import { AuthContext } from "./authcontext";


export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) =>
{

    const { currentUser } = useContext(AuthContext)

    const INITIALE_STATE = {
        user: {},
        chatId: "",
    }

    const chatReducer = (state, action) =>
    {

        switch (action.type)
        {
            case "CHANGE_USER":
                return (
                    {
                        user: action.payload,
                        chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                    }
                )
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(chatReducer, INITIALE_STATE)

    return (
        < ChatContext.Provider value={{ user: state, dispatch }}>
            {children}
        </ChatContext.Provider >
    )
}