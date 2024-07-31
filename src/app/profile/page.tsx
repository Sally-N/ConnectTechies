'use client'

import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import ProfileSetupComponent from "@/components/Foms/profile";
import {  User } from "@/Utils/Types&Interfaces/user";


export default function Profile() {
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const userDetails = (sessionStorage.getItem('user'))

        if (userDetails) {
            try {
                const parsedUser = JSON.parse(userDetails);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from sessionStorage:", error);
            }
        }
    }, [])



    console.log(user, 'user')

    return (

        <Row gutter={[8, 8]} style={{ height: '100vh' }}>
            <Col span={24}>
                <Row justify={'center'} align={'middle'}>
                    {user && <ProfileSetupComponent user={user}/>}
                </Row>
            </Col>


        </Row>
    )
}