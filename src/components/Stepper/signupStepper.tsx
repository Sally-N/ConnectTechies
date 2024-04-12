import React, { useState } from "react"
import { Button, Col, Row, Steps } from "antd"
import { UserAddOutlined, AuditOutlined } from "@ant-design/icons"
import PersonalInfoComponent from "../Foms/Auth/personalInfo"
import CareerInfoComponent from "../Foms/Auth/careerInfo"
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { useMediaQuery } from "react-responsive"
import toast from "react-hot-toast"

const { Step } = Steps

export const SignUpStepperComponent = () => {
    const isSmallScreen = useMediaQuery({ 'query': '(max-width: 576px)' })


    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        specialization: '',
        level: '',
        image: '',
    })

    async function handleSubmit() {
        if (current === 0) {
            if (formData.password !== formData.confirmPassword) {
                console.log('Passwords do not match');
                toast.error('Password and Confirm Password do not match')
                // You can display an error message or handle it in your UI
                return;
            }
            setCurrent(current + 1)
            console.log(formData, 'newx')
        }

        try {
            const formDataToSend = new FormData();

            // Append each field in formData to formDataToSend
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'confirmPassword') {
                    formDataToSend.append(key, value);
                }
            });

            console.log(formDataToSend, 'fssss')
            const response = await fetch('/api/user', {
                method: "POST",
                body: formDataToSend,
            });
            // setFormData({
            //     firstname: '',
            //     lastname: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: '',
            //     country: '',
            //     level: '',
            //     specialization: '',
            //     image: '',
            // });
            // setCurrent(0);
            // const result = response.body;
            console.log("Success:", response);
            // window.location.href = ('/login')
        } catch (error) {
            console.log(error);
        }



    }


    return (
        <Row style={{ width: '100%', padding: isSmallScreen ? '20px 30px' : '20px 80px' }}>
            <Col span={24}>
                <Steps current={current} onChange={(c) => setCurrent(c)} style={{ margin: '10 0px' }}>
                    <Step title='Personal Information' icon={<UserAddOutlined />}></Step>
                    <Step title='Career Information' icon={<AuditOutlined />}></Step>
                </Steps>
                {current == 0 && <PersonalInfoComponent formData={formData} setFormData={setFormData} />}
                {current == 1 && <CareerInfoComponent formData={formData} setFormData={setFormData} />}
            </Col>
            <Row justify={current == 0 ? 'end' : 'space-between'} align={'middle'} style={{ width: '100%' }}>
                {current == 1 && <Button type={'default'}
                    onClick={() => setCurrent(current - 1)}
                >Previous</Button>}
                <Button type={'primary'} onClick={handleSubmit}
                    style={{ ...SignUpButtonStyle, }}>
                    {current == 0 ? "Next" : 'Submit'}
                </Button>
            </Row>
        </Row>

    )
}