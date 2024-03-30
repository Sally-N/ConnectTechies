'use client'

import React from "react";
import { SignUpStepperComponent } from "@/components/Stepper/signupStepper";
import { Col, Collapse, Row } from "antd";
import { gradientBackground } from "@/components/Foms/Auth/form";



export default function SignUpPage() {
    return (
        <Row gutter={[8, 8]}>
            <Col span={12}>
                <SignUpStepperComponent />
            </Col>
            <Col span={12} style={gradientBackground}>
            </Col>

        </Row>
    )
}