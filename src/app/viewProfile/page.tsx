'use client'

import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import UserProfileFormComponent from "@/components/Foms/profile";
import UpdateUserTabComponent from "@/components/Tab/updateUserTab";

import MainLayout from "@/app/mainlayout";
import ProfileDetailsComponent from "@/components/cards/userprofile";



export default function ViewProfile() {

    return (
        <MainLayout>

            <Row gutter={[8, 8]} style={{ height: '100vh' }}>
                <Col span={24}>
                    <Row justify={'center'} align={'middle'}>
                        <ProfileDetailsComponent />
                        {/* <UpdateUserTabComponent /> */}
                    </Row>
                </Col>


            </Row>
        </MainLayout>

    )
}