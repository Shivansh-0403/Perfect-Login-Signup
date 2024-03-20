import { createContext, useContext } from "react"

const UserContext = createContext({
    user: {
        name: "",
        email: ""
    },
    loginStatus: false,
    setUser: () => {},
    updateLoginStatus: () => {}
})

export default function useUserContext(){
    return useContext(UserContext)
}

export const UserContextProvider = UserContext.Provider