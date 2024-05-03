import { createContext } from "react";


const UserContext = createContext({
    loggedInuser: "Default User",
})

export default UserContext;