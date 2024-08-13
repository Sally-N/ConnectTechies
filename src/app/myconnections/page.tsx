'use client'

import React, { useContext, useEffect } from 'react'
import UserCards from '@/components/cards/user'
import { MyUser, User } from '@/Utils/Types&Interfaces/user';
import { useState } from 'react';
import MainLayout from '../mainlayout';
import { UserContext, useUserContext } from '@/Utils/Context/userContext';
import UserConnectionsCard from '@/components/cards/connections';
import Cookies from 'js-cookie';

export default function MyConnectionsPage() {

    const { user } = useContext(UserContext);

    console.log(user?.user, 'hello')

    // const [loggedInUser, setLoggedInUser] = useState<MyUser>();
    // const userFromCookie = Cookies.get('user');
    // let parsedUser: React.SetStateAction<MyUser | undefined>;
    // if (userFromCookie) {
    //     parsedUser = JSON.parse(userFromCookie) as unknown as MyUser;

    //     console.log(parsedUser, 'parsed')
    // }


    // const getData = async () => {
    //     try {
    //         const res = await fetch("/api/users", {
    //             method: 'GET'
    //         });

    //         const responseData = await res.json();
    //         console.log(responseData, 'rs')

    //         setAllUsers(responseData?.users);
    //     } catch (err) {
    //         console.error("Error fetching user data:", err);
    //     }
    //     return users;
    // }

    // useEffect(() => {
    //     // getData();
    //     setLoggedInUser(parsedUser);
    // }, [])


    // console.log(loggedInUser, 'loogedIn')


    return (
        <MainLayout>
            <p>hello</p>
            {/* <p>{user?.user.firstname}</p> */}
            <UserConnectionsCard  />
        </MainLayout>
    )
}
