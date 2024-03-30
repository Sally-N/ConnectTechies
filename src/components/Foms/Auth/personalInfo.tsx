import React, { useState } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { AuthFormStyle } from "@/Utils/Theme/form";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid } from "antd"
import type { CheckboxProps } from 'antd';
import Link from "next/link";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const { useBreakpoint } = Grid;


const PersonalInfoComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const screens = useBreakpoint();
    const marginValues = {
        xs: "10px 10px",
        sm: "10px 20px",
        md: "20px 10px",
        lg: "20px 20px",
        xl: "20px 30px",
    };

    // Get the appropriate margin value based on the current screen size
    const getMargin = () => {
        if (screens.xl) return marginValues.xl;
        if (screens.lg) return marginValues.lg;
        if (screens.md) return marginValues.md;
        if (screens.sm) return marginValues.sm;
        return marginValues.xs; // default for xs and undefined
    };

    return (
        <Row style={{ ...AuthFormStyle}}>
            <Col span={24}>
                <Row>
                    <Title level={3} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '15px' }}>
                        Sign Up
                    </Title>
                    <Text type={'secondary'} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '5px' }}>Please enter your details.</Text>
                </Row>
                <form style={{ padding: '20px' }}>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>First Name
                            </Text>
                            <Input placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Last Name
                            </Text>
                            <Input placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                aria-required="true" required />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Email address
                            </Text>
                            <Input placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>

                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Password
                            </Text>
                            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Confirm password
                            </Text>
                            <Input.Password placeholder="Confirm password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                aria-required="true"
                            />
                        </Col>
                    </Row>
                    <Row justify={'end'} align={'middle'}>
                        <Button type={'primary'} style={{ ...SignUpButtonStyle, }}>Next</Button>
                    </Row>
                </form>
            </Col>
        </Row>

    )
}

export default PersonalInfoComponent;