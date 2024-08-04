'use client'

import React, { useEffect } from 'react'
import UserCards from '@/components/cards/user'
import { Col, Row } from 'antd'
import MainLayout from './mainlayout'
import { User } from '@/Utils/Types&Interfaces/user';
import { useState } from 'react';

export default function Home() {
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
    <MainLayout>
      <UserCards users={users} />
    </MainLayout>
  )
}
