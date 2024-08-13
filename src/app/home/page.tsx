'use client'

import React, { useContext, useEffect } from 'react'
import UserCards from '@/components/cards/user'
import { User } from '@/Utils/Types&Interfaces/user';
import { useState } from 'react';
import MainLayout from '../mainlayout';
import { UserContext, useUserContext } from '@/Utils/Context/userContext';

export default function HomePage() {
    const [users, setAllUsers] = useState<User[]>([]);

    const { user } = useUserContext();

    console.log(user?.user, 'myusercontext')

    // const cookie = useCookies(['user']);


    const loggedInUser = useContext(UserContext);
    console.log(loggedInUser);


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
