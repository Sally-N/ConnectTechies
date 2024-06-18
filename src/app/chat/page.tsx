'use client'

import React from "react";
import { Col, Row } from "antd";
import { ChatListComponent } from "@/components/chat/chatlist";
import ChatInterface from "@/components/chat/chatindex";
import MainLayout from "../mainlayout";
import UserSearchComponent from "@/components/search/search";



export default function ChatPage() {
    return (
        <MainLayout>
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