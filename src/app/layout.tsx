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
    const user = Cookies.get('user');
    if (user) {
      const parsedUser = JSON.parse(user) as MyUser;
      setCreds(parsedUser);
      setIsLogedIn(true);
    } else {
      setCreds(null);
      setIsLogedIn(false);
    }
  };

  // Trigger the authentication check when the component loads
  useEffect(() => {
    setIsloaded(true);
    getAuth();
  }, []);

  

  const updateCreds = ({ value }: {
    value: MyUser | null
  }) => {
    if(value !== null){
      // Cookies.add('user', JSON.stringify(value), 1);
      setCreds(value);
      setIsLogedIn(true);
    } else {
      setCreds(value);
      setIsLogedIn(false)
    }
    // value === null ? setIsLogedIn(false) : setIsLogedIn(true);
    // setCreds(value)

  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{
          update: updateCreds,
          isLoggedIn: isLogedIn,
          value: creds,
          isLoading: isloaded,
        }}>

          <ConnectTechiesTheme childrenElements={children} />
        </AuthContext.Provider>
      </body>
    </html>
  )
}
