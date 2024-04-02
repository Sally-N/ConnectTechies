import React, { FormEvent, useState } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { AuthFormStyle } from "@/Utils/Theme/form";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid } from "antd"
import type { CheckboxProps } from 'antd';
import Link from "next/link";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { FormData } from "@/Utils/Types&Interfaces/signup";


const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const { useBreakpoint } = Grid;


export interface Props {
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}


const PersonalInfoComponent: React.FC<Props> = ({formData, setFormData}) => {

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const fd = new FormData(event.currentTarget);
        

        console.log(fd, 'formdata');
        const response = await fetch('/api/authentication', {
            method: 'POST',
            body: fd,
          })

          console.log(response, 'response')
    }

    return (
        <Row style={{ ...AuthFormStyle }}>
            <Col span={24}>
                <Row>
                    <Title level={3} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '15px' }}>
                        Sign Up
                    </Title>
                    <Text type={'secondary'} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '5px' }}>Please enter your details.</Text>
                </Row>
                <form style={{ padding: '20px' }} id="form" onSubmit={handleSubmit}>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>First Name
                            </Text>
                            <Input placeholder="Enter first name" name="firstName" required
                                aria-required="true"
                                value={formData.firstname}
                                onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      firstname: e.target.value,
                                    });
                                  }} />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Last Name
                            </Text>
                            <Input placeholder="Enter last name" name="lastName"
                                aria-required="true" required
                                value={formData.lastname}
                                onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      lastname: e.target.value,
                                    });
                                  }}  />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Email address
                            </Text>
                            <Input placeholder="Enter email address" type={'email'} name="email" required
                                aria-required="true" 
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    });
                                  }} />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>

                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Password
                            </Text>
                            <Input.Password placeholder="Password" name="password" required
                                aria-required="true"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({
                                      ...formData,
                                      password: e.target.value,
                                    });
                                  }}  />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Confirm password
                            </Text>
                            <Input.Password placeholder="Confirm password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                               name="confirmPassword" required
                                aria-required="true"
                            />
                        </Col>
                    </Row>
                
                </form>
            </Col>
        </Row>

    )
}

export default PersonalInfoComponent;