'use client'

import React from "react";
import { Col, Row } from "antd";
import UpdateUserTabComponent from "@/components/Tab/updateUserTab";
import MainLayout from "@/app/mainlayout";



export default function ProfileView() {

    return (
        <MainLayout>

            <Row gutter={[8, 8]} style={{ height: '100vh' }}>
                <Col span={24}>
                    <Row justify={'center'} align={'middle'}>
                        <UpdateUserTabComponent />
                    </Row>
                </Col>


            </Row>
        </MainLayout>

    )
}