import React, { useState } from "react"
import { Col, Row, Steps } from "antd"
import { UserAddOutlined, AuditOutlined } from "@ant-design/icons"
import PersonalInfoComponent from "../Foms/Auth/personalInfo"
import CareerInfoComponent from "../Foms/Auth/personalInfo"

const { Step } = Steps

export const SignUpStepperComponent = () => {

    const [current, setCurrent] = useState(0)


    return (
        <Row>
            <Col>
                <Steps current={current} onChange={(c) => setCurrent(c)}>
                    <Step title='Personal Information' icon={<UserAddOutlined />}></Step>
                    <Step title='Career Information' icon={<AuditOutlined />}></Step>
                </Steps>
                <>
                {current == 0 && <PersonalInfoComponent />}
                {current == 1 && <CareerInfoComponent />}
                </>
            </Col>
        </Row>

    )
}