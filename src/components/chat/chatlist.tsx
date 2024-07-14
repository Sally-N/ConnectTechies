import React, { useEffect, useState } from "react"
import { Paragraph, Text } from "@/Utils/Theme/customTheme"
import { Avatar, Col, Row } from "antd"
import './chat.css'
import { ChatInterface } from "@/Utils/Types&Interfaces/chat"
import { UserUInterface } from "@/Utils/Types&Interfaces/user"



export const ChatListComponent = () => {
    const [userChats, setUserChats] = useState<ChatInterface[]>([])
    const [userDetails, setUserDetails] = useState<UserUInterface>()

    async function getUserChats() {
        try {
            const userChats = await fetch('/api/chat/15', {
                method: "GET"
            })

            const res = await userChats.json();

            // console.log(res, 'res')
            // setUserChats(res)
            if (Array.isArray(res)) {
                setUserChats(res);

            } else {
                setUserChats([])
            }
        } catch (error) {
            console.log(error, 'Error getting user chats');
            setUserChats([])

        }
    }


    async function getReceipientDetails() {
        try {
            const recipient = await fetch('api/users/20', {
                method: "GET"
            })

            const res = await recipient.json();
            setUserDetails(res)

        } catch (error) {
            console.log(error, "error getting recipient details");
            setUserChats([]);


        }
    }




    useEffect(() => {
        getUserChats();
        getReceipientDetails();
    }, []);

    console.log(userDetails, 'userC')


    return (
        <Row className="chatlist background-white">
            <Col span={24}>
                <Row>
                    {
                        userChats?.map((user, index) => (
                            <Row key={index} gutter={24} justify={'center'} align={'middle'}>
                                <Col span={6} >
                                    <Avatar size={48}>AB</Avatar>
                                </Col>
                                <Col span={18}>
                                    <Text className="width-100 font-regular"></Text>
                                    <Paragraph className="font-small text-secondary">If you are still facing issues</Paragraph>

                                </Col>
                            </Row>
                        ))

                    }





                </Row>
            </Col>
        </Row>

    )
}