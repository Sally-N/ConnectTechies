'use client'

import React, { useEffect } from 'react'
import { User } from '@/Utils/Types&Interfaces/user';
import { useState } from 'react';
import HomePage from './home/page';
import LoginUserPage from './login/page';
import { Cookies } from '@/Utils/cookies';

export default function AppPage() {
  const [users, setAllUsers] = useState<User[]>([]);


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





  return (
      <div>
      {/* {Cookies.get('user') === '' ? <LoginUserPage /> : <HomePage />} */}
      <HomePage />
      </div>
  )
}
