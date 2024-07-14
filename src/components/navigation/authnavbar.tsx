import { Title } from "@/Utils/Theme/customTheme"
import { Button, Col, Row } from "antd"
import React from "react"
import { signIn } from "next-auth/react";



export const AuthNavbarComponent = () => {
    return (
        <Row >
            <Col span={24}>
                <Row>
                    <Col>
                        <Title level={4}>ConnectTechies</Title>
                    </Col>
                    <Col>
                        <Button role="submit" onClick={() => signIn('')} className="auth-button">SignIn</Button>
                        <Button role="submit" onClick={() => signIn('')} className="auth-button">SignUp</Button>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}