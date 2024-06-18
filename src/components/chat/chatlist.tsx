import React from "react"
import { Paragraph, Text } from "@/Utils/Theme/customTheme"
import { Avatar, Col, Row } from "antd"
import './chat.css'



export const ChatListComponent = () => {
    return (
        <Row className="chatlist background-white">
            <Col span={24}>
                <Row>
                    <Row gutter={24} justify={'center'} align={'middle'}>
                        <Col span={6} >
                            <Avatar size={48}>AB</Avatar>
                        </Col>
                        <Col span={18}>
                            <Text className="width-100 font-regular">Anne Hathaway</Text>
                            <Paragraph className="font-small text-secondary">If you are still facing issues</Paragraph>

                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Row>
            </Col>
        </Row>

    )
}