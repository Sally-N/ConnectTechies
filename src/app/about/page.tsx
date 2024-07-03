'use client'

import React from "react";
import { Col, Row } from "antd";
import { gradientBackground } from "@/components/Foms/Auth/form";
// import LoginComponent from "@/components/Foms/Auth/login";
import SComp from "@/components/auth/signin";
import SessionWrapper from "@/components/auth/sessionwrapper";
import { Toaster } from "react-hot-toast";



export default function AboutPage() {
    return (
        <SessionWrapper>
            <Toaster />
            <Row gutter={[8, 8]} style={{ height: '100vh' }}>
                <Col span={12}>
                    <Row justify={'center'} align={'middle'}>
                        <SComp />
                    </Row>
                </Col>
                <Col span={12} style={gradientBackground}>
                </Col>

            </Row>
        </SessionWrapper>
    )
}