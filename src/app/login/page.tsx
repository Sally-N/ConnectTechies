'use client'

import React from "react";
import { Col, Row } from "antd";
import { gradientBackground } from "@/components/Foms/Auth/form";
import LoginComponent from "@/components/Foms/Auth/login";



export default function SignUpPage() {
    return (
        <Row gutter={[8, 8]} style={{ height: '100vh' }}>
            <Col span={12}>
                <Row justify={'center'} align={'middle'}>
                    <LoginComponent />
                </Row>
            </Col>
            <Col span={12} style={gradientBackground}>
            </Col>

        </Row>
    )
}