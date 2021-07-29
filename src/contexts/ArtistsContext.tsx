import { createContext, ReactNode, useState, useEffect } from "react"
import { setCookie, parseCookies } from 'nookies'
import { api } from "../services/api";
import { apinext } from "../services/apinext";
import Router from "next/router";

type AuthContextData = {
    signIn(code: string): Promise<void>;
}
type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {

    useEffect(() => {
        const {'spotifyauth.token': token} = parseCookies()

        console.log(token)

        if (token) {
            console.log(token)
        }
    }, [])

    async function signIn(code: string){
        try {
            
            const response = await apinext.post('/access_token', {
                code,
            })

            console.log(response.data)
            const {access_token, refresh_token} = response.data;

            setCookie(undefined, 'spotifyauth.token', access_token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
            setCookie(undefined, 'spotifyauth.refreshToken', refresh_token,{
                maxAge: 60 * 60 * 24 * 30,
                path: '/' // /path vai definir de formar global
            })

            api.defaults.headers['Authorization'] = `Bearer ${access_token}`

            Router.push('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthContext.Provider value={{signIn}}>
            {children}
        </AuthContext.Provider>
    )
}