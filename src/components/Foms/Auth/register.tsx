import React, { FormEvent, useState, useEffect } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { styleText } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button } from "antd"
import toast from "react-hot-toast";
import { signIn } from 'next-auth/react'; // Import signIn from next-auth/react
import { useRouter } from "next/navigation";


const RegisterComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    let passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password.match(passwordPattern)) {
            toast.error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password do not match');
            return;
        }

        const userObj = { firstName, lastName, email, password }
        console.log(userObj, 'usero')

        try {
            const response = await fetch('api/users', {
                method: "POST",
                body: JSON.stringify(userObj)
            })

            const result = await response.json();

            if (result.status == 500) {
                toast.error('A user with this email already exists');
            } else {
                await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: true,
                    callbackUrl: "/",
                })
            }

            toast.success('Sign Up was successful')

        } catch (error) {
            console.log(error, 'err')
        }
    }


    return (
        <Row justify={'center'} align={'middle'}>
            <Col span={24}>
                {/* <Row> */}
                <Title level={3} style={{ textAlign: 'left', width: '100%', paddingBottom: '0px' }}>
                    Create an account
                </Title>
                {/* </Row> */}
                <form style={{ padding: '20px', alignContent: 'center', justifyContent: 'center' }} onSubmit={handleSubmit}>

                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                First Name
                            </Text>
                            <Input placeholder="Enter email address" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row><Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Last Name
                            </Text>
                            <Input placeholder="Enter email address" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>

                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Email address
                            </Text>
                            <Input placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Password
                            </Text>
                            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Confirm Password
                            </Text>
                            <Input.Password placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>

                    {/* <Row justify={'ce'} align={'middle'}> */}
                    <Button type={'primary'} htmlType={'submit'} style={{ ...SignUpButtonStyle, }}>Sign Up</Button>
                    {/* </Row> */}
                </form>
            </Col>
        </Row>

    )
}

export default RegisterComponent;