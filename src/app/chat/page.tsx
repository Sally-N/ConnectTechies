'use client'

import React from "react";
import { Col, Row } from "antd";
import { gradientBackground } from "@/components/Foms/Auth/form";
import LoginComponent from "@/components/Foms/Auth/login";
import Index from "@/components/chat/chat";
import ChatI from "@/components/chat/chatindex";
import { ChatListComponent } from "@/components/chat/chatlist";
import ChatInterface from "@/components/chat/chatindex";
import MainLayout from "../mainlayout";
import UserSearchComponent from "@/components/search/search";



export default function ChatPage() {
    return (
        <MainLayout>
            <Row gutter={12}>
                <Col span={7}>
                    <UserSearchComponent />
                    <ChatListComponent />
                </Col>
                <Col span={17}>
                    <ChatInterface />
                </Col>
            </Row>
        </MainLayout>
    )
}