'use client'

import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import MainLayout from "@/app/mainlayout";
import ProfileDetailsComponent from "@/components/cards/userprofile";
import { useParams } from "next/navigation";
import { MyUser } from "@/Utils/Types&Interfaces/user";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "@/Utils/Context/myUserContext";

export default function ViewProfile() {
    const [userToView, setUserToView] = useState<MyUser>()
    // const user = useContext(AuthContext);
    const params = useParams();
    async function getUserToView(uniqueId: any) {
        console.log(uniqueId, 'uniqueId')
        try {
            const res = await fetch(`/api/user/${uniqueId}`, {
                method: 'GET'
            });

            const responseData = await res.json();
            console.log(responseData, 'rs')
            setUserToView(responseData);
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
        return userToView;
    }

    useEffect(() => {
        // user;
        if (params && params.slug) {
            getUserToView(params.slug);
        }
    }, [params]);


    return (
        <MainLayout>
            <Toaster />
            <Row gutter={[8, 8]} style={{ height: '100vh' }}>
                <Col span={24}>
                    <Row justify={'center'} align={'middle'}>
                        {userToView! && (
                            <ProfileDetailsComponent user={userToView} />
                        )
                        }
                    </Row>
                </Col>
            </Row>
        </MainLayout>

    )
}