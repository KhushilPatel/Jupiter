import { Children, createContext, use, useContext, useState } from "react";
import Cookies from 'js-cookie'; 

export const AuthContext=createContext()
export const AuthProvider=({children})=>{

    const [token, settoken] = useState( Cookies.get('token'))
        const storeTokenInCookies=(token)=>{
           return  Cookies.set('token', token, { expires: 7 });
        }

    return(
        <AuthContext.Provider value={{storeTokenInCookies}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    return useContext(AuthContext)
}