import React, { FormEvent, useState, useEffect, useContext } from "react";
import { SignUpButtonStyle } from "@/Utils/Theme/buttons";
import { Text } from "@/Utils/Theme/customTheme";
import { styleText } from "@/Utils/Theme/styleText";
import { Row, Col, Input, Button } from "antd"
import toast from "react-hot-toast";
import { MyUser } from "@/Utils/Types&Interfaces/user";
import { AuthContext } from "@/Utils/Context/myUserContext";


const UpdateUserComponent = () => {
    const user = useContext(AuthContext);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userObj = { firstName, lastName }
        console.log(userObj, 'usero')

        console.log(user.value?.user.id!, 'id')


        try {

            const response = await fetch(`/api/users/${user.value?.user.id!}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userObj)
            })

            const result = await response.json();
            console.log(result, 'userResult');

            if (result.status == 500) {
                toast.error('A user with this email already exists');
            } else {
                user.update({ value: result! as MyUser })
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