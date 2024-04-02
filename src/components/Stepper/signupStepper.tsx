import React, { useState } from "react"
import { Col, Row, Steps } from "antd"
import { UserAddOutlined, AuditOutlined } from "@ant-design/icons"
import PersonalInfoComponent from "../Foms/Auth/personalInfo"
import CareerInfoComponent from "../Foms/Auth/careerInfo"

const { Step } = Steps

export const SignUpStepperComponent = () => {

    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        country: '',
        specialization: '',
        level: '',
        image: '',
    })


    return (
        <Row style={{width: '100%', padding: '20px 80px'}}>
            <Col span={24}>
                <Steps current={current} onChange={(c) => setCurrent(c)} style={{margin: '10 0px'}}>
                    <Step title='Personal Information' icon={<UserAddOutlined />}></Step>
                    <Step title='Career Information' icon={<AuditOutlined />}></Step>
                </Steps>
                {current == 0 && <PersonalInfoComponent formData={formData} setFormData={setFormData}/>}
                {current == 1 && <CareerInfoComponent formData={formData} setFormData={setFormData}/>}
            </Col>
        </Row>

    )
}