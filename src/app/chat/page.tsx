'use client'

import React, { useContext } from "react";
import { Col, Row } from "antd";
import { ChatListComponent } from "@/components/chat/chatlist";
import ChatInterface from "@/components/chat/chatindex";
import MainLayout from "../mainlayout";
import UserSearchComponent from "@/components/search/search";
import { AuthContext } from "@/Utils/Context/myUserContext";



export default function ChatPage() {
    const theUser = useContext(AuthContext);
    console.log(theUser, 'theeee')

    return (
        <MainLayout>
                    {JSON.stringify(theUser)}

            <Row gutter={12}>
                <Col span={7} className="background-white">
                    <Row>
                        <UserSearchComponent />
                    </Row>
                    <Row>
                        <ChatListComponent />

                    </Row>
                </Col>
                <Col span={17}>
                    <ChatInterface />
                </Col>
            </Row>
        </MainLayout>
    )
}