'use client'

import React, { useEffect, useState } from "react";
import { SignUpStepperComponent } from "@/components/Stepper/signupStepper";
import { Col, Collapse, Row } from "antd";
import { gradientBackground } from "@/components/Foms/Auth/form";
import { useMediaQuery } from "react-responsive";
import { Toaster } from "react-hot-toast";



export default function SignUpPage() {
    const isSmallScreen = useMediaQuery({ 'query': '(max-width: 576px)' })
    const [loaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    })

    return (
        loaded && (
        <Row gutter={[8, 8]}>
            <Toaster />
            <Col span={isSmallScreen ? 24 : 12}>
                <SignUpStepperComponent />
            </Col>
            {!isSmallScreen && <Col span={12} style={gradientBackground}>
            </Col>
            }

        </Row>
        )
    )}