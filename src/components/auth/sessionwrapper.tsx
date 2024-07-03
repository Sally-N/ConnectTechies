'use client'


import { SessionProvider } from "next-auth/react"


export default function SessionWrapper ({children}: {children: any}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}