import React, { FormEvent, useState, useEffect } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Text } from "@/Utils/Theme/customTheme";
import { styleText } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button } from "antd"
import toast from "react-hot-toast";
import { MyUser } from "@/Utils/Types&Interfaces/user";


const UpdateUserComponent = () => {

    const [newuser, setNewUser] = useState<MyUser>();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userObj = { firstName, lastName }
        console.log(userObj, 'usero')

        console.log(newuser?.user.id, 'id')

        try {
            const response = await fetch(`api/users/${newuser?.user.id}`, {
                method: "POST",
                body: JSON.stringify(userObj)
            })

            const result = await response.json();
            console.log(result);

            if (result.status == 500) {
                toast.error('A user with this email already exists');
            } else {
                toast.success('Profile Update Was Successful');
            }


        } catch (error) {
            console.log(error, 'err')
        }
    }


    return (
        <Row justify={'center'} align={'middle'}>
            <Col span={24}>
                <form style={{ padding: '20px', alignContent: 'center', justifyContent: 'center' }} onSubmit={handleSubmit}>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                First Name
                            </Text>
                            <Input placeholder="Enter email address" value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Row style={{ margin: "0 0 10px" }}>
                        <Col span={24}>
                            <Text style={styleText}>
                                Last Name
                            </Text>
                            <Input placeholder="Enter email address" value={lastName} onChange={(e) => setLastName(e.target.value)} required
                                aria-required="true" />
                        </Col>
                    </Row>
                    <Button type={'primary'} htmlType={'submit'} style={{ ...SignUpButtonStyle, }}>Submit</Button>
                </form>
            </Col>
        </Row>

    )
}

export default UpdateUserComponent;