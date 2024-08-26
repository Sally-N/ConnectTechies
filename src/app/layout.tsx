'use client';
import React, { useEffect, useState } from 'react'
import { ConnectTechiesTheme } from '@/Utils/Theme/customTheme'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MyUser } from '@/Utils/Types&Interfaces/user';
import { Cookies } from '@/Utils/cookies'
import { AuthContext } from '@/Utils/Context/myUserContext';

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Connect Techies',
  description: 'WebApp to connect with others in Tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false)

  const [creds, setCreds] = useState<null | MyUser>(null)
  const [isloaded, setIsloaded] = useState(false);

  const getAuth = () => {
    if ((Cookies.get('user') === '')) {
      setCreds(null)
    } else {
      let user = Cookies.get('user');
      if (user) {
        setCreds(JSON.parse(user) as unknown as MyUser)
        return creds;
      }

    }

  }
  useEffect(() => {
    setIsloaded(true)
    getAuth()
    console.log(creds, 'creds')
  }, [])

  const updateCreds = ({ value }: {
    value: MyUser | null
  }) => {
    value == null ? setIsLogedIn(false) : setIsLogedIn(true);
    setCreds(value)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{
          update: updateCreds,
          isLogedIn: isLogedIn,
          value: creds
        }}>

          <ConnectTechiesTheme childrenElements={children} />
        </AuthContext.Provider>
      </body>
    </html>
  )
}
