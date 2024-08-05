import React, { useState } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid } from "antd"
import toast from "react-hot-toast";
import { MyUser } from "@/Utils/Types&Interfaces/user";
import { CookiesProvider, useCookies } from 'react-cookie'
import { useRouter } from "next/navigation";


const LoginComponent = () => {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['user'])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userObj = {email, password}
    const [loggedInUser, setLoggedInUser] = useState<MyUser>()

     async function handleSubmit(){
        const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)           
        }) 
        const result = await response.json();
        if (result.status === 501){
            toast.error("Incorrect password");
        }

        setCookie('user', result as MyUser)
        toast.success("User Logged In Successfully");
        
        console.log(cookies, 'userCookie')
        router.push("/home");     

    }

    return (
        <Row>
            <Col span={24}>
                <Row>
                    <Title level={3} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '15px' }}>
                        Sign In
                    </Title>
                    <Text type={'secondary'} style={{ textAlign: 'center', width: '100%', paddingBottom: '0px', marginBottom: '5px' }}>Please enter your details.</Text>
                </Row>
                <form style={{ padding: '20px' }}>
                    
                 
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
        
                    <Row justify={'end'} align={'middle'}>
                        <Button type={'primary'} style={{ ...SignUpButtonStyle, }} onClick={handleSubmit}>Submit</Button>
                    </Row>
                </form>
            </Col>
        </Row>

    )
}

export default LoginComponent;