'use client'

import React, { useEffect } from 'react'
import { User } from '@/Utils/Types&Interfaces/user';
import { useState } from 'react';
import HomePage from './home/page';
import LoginUserPage from './login/page';
import Cookies from 'js-cookie';

export default function AppPage() {
  const [users, setAllUsers] = useState<User[]>([]);
  const [cookieUser, setCookieUser] = useState<string | undefined>(undefined);


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
    const user = Cookies.get('user');
    setCookieUser(user);
  }, [])





  return (
      <div>
      {cookieUser ? <HomePage /> : <LoginUserPage />}
      </div>
  )
}
