import { createContext } from "react";


const cartContext = createContext()
const cartprovider= ({children})=>{

    return(
        <cartContext.Provider value={{}}>
{children}
        </cartContext.Provider>
    )
}

const useCart=()=>useContext(cartContext);
export {useCart,cartprovider}