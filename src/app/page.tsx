'use client'

import React, { useEffect } from 'react'
import { User } from '@/Utils/Types&Interfaces/user';
import { useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import HomePage from './home/page';
import LoginUserPage from './login/page';

export default function AppPage() {
  const [users, setAllUsers] = useState<User[]>([]);
  const [cookies, setCookie] = useCookies(['user'])


  const getData = async () => {
    try {
      const res = await fetch("/api/users", {
        method: 'GET'
      });

      const responseData = await res.json();
      console.log(responseData, 'rs')

      setAllUsers(responseData?.users);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
    return users;
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(cookies.user, 'cook')




  return (
    <CookiesProvider>
      <div>
        {cookies.user ? <HomePage/> :  <LoginUserPage />}
      </div>
    </CookiesProvider>
  )
}
