import React, { useContext, useEffect, useState } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Title, Text } from "@/Utils/Theme/customTheme";
import { styleText, spanStyle } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button, Grid } from "antd"
import toast from "react-hot-toast";
import { MyUser } from "@/Utils/Types&Interfaces/user";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import { AuthContext } from "@/Utils/Context/myUserContext";
import { Cookies } from "@/Utils/cookies";


const LoginComponent = () => {
    console.log('user', Cookies.get('user'), 'intro')
    const router = useRouter();
    let authContext = useContext(AuthContext);




    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<MyUser>();
    const userObj = { email, password }
    console.log(authContext.value, 'value')

    async function handleSubmit() {
        const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        const result = await response.json();
        if (result.status === 501) {
            toast.error("Incorrect password");
            return;
        }

        console.log(result, 'response');
        authContext.update({ value: result! as MyUser });
        
        
        Cookies.add('user', JSON.stringify(result), 1)
        toast.success('Login Successfully');
        console.log(JSON.stringify(authContext.value), 'v')
        console.log(authContext.isLoggedIn, 'isloggedin')
        // router.push("/");

    }

    // useEffect(() => {
    //     if (authContext.isLogedIn == true) {
    //       router.push('/');
    //     }
    //   }, [authContext.isLogedIn]);


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