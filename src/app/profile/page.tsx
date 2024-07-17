'use client'

import React from "react";
import { Col, Row } from "antd";
import LoginComponent from "@/components/Foms/Auth/login";
import UserProfileFormComponent from "@/components/Foms/profile";



export default function Profile() {
    return (
        <Row gutter={[8, 8]} style={{ height: '100vh' }}>
            <Col span={24}>
                <Row justify={'center'} align={'middle'}>
                    <UserProfileFormComponent />
                </Row>
            </Col>


        </Row>
    )
}