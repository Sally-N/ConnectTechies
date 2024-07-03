// 'use client'

import React, { FormEvent } from "react";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Button, Col, Input, Row } from "antd";
import './auth.css';
import { Paragraph, Title, Text } from "@/Utils/Theme/customTheme";
import { spanStyle, styleText } from "@/Utils/Theme/styleText";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import toast from "react-hot-toast";

// import { doSocialLogin } from "@/app/actions";


export default function SComp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userObj = { email, password }
    // console.log('userobj', userObj)
    const [loginMessage, setLoginMessage] = useState('')


    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        // const email = formData.get('email');
        // const password = formData.get('password');


        // console.log(email, password);


        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            })


            if (!res?.error) {
                console.log('success')
            } else {
                console.log('Invalid Login!')
            }

            console.log(res, 'res');
            return res;

        } catch (error) {
            console.log(error, 'error')
        }

    }


    return (
        <Row justify={'center'} align={'middle'}>
            <Col span={24} className="form-div">
                <form style={{ padding: '20px' }} onSubmit={handleSignIn}>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Email address
                            </Text>
                            <Input placeholder="Enter email address" name="email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>

                        <Col span={24}>
                            <Text style={styleText}>
                                <span style={spanStyle}>*</span>Password
                            </Text>
                            <Input.Password placeholder="Password" required name="password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                aria-required="true" />
                        </Col>
                    </Row>

                    <Row justify={'end'} align={'middle'}>
                        <Button type={'primary'} role="submit" onClick={() => signIn('Credentials')} style={{ ...SignUpButtonStyle, }}>Next</Button>
                    </Row>

                </form>
                {/* <form action={handleSignIn} className="auth-form">
                    <Title level={4} >ConnectTechies</Title>
                    <Paragraph>Access Expertise in Tech, Design, AI, and More - Anytime, Anywhere</Paragraph>
                    <Button onClick={() => signIn('google')} className="auth-button">
                        <Image src="/google-icon-logo-svgrepo-com.svg" alt="google image" width={17} height={17} className="auth-img" />
                        Login with Google
                    </Button>
                    <Button onClick={() => signIn('github')} className="auth-button">
                        <Image src="/github-mark.svg" alt="google image" width={17} height={17} className="auth-img" />

                        Login with Github</Button>
                </form> */}

            </Col>

        </Row>

    )
}