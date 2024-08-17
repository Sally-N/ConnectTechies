import React from "react"
import { Button, Col, Row } from "antd"
import Image from "next/image";
import { Title, Paragraph } from "@/Utils/Theme/customTheme";
import Link from "next/link";




const ProfileDetailsComponent = () => {
    return (
        <Row style={{}}>
            <Col span={24}>
                <Row justify={'start'} style={{ width: '100%' }}>
                    <Col span={4}>
                        <Image loading="lazy" src="github-mark.svg" alt="user image" width={100} height={100} />
                    </Col>
                    <Col span={20}>
                        <Row justify={'space-between'} align={'top'}>
                            <Col>
                                <Title level={5}>James James</Title>
                                <Title level={5}>
                                    SEnior FRontend Developer
                                </Title>
                            </Col>
                            <Col>
                                {/* {isCurrentUser && ( */}
                                    <Button type="primary" style={{ marginLeft: '10px' }}>
                                        Edit Profile
                                    </Button>
                                {/* )} */}
                            </Col>
                        </Row>
                        <Paragraph>
                            email.gmail.com
                        </Paragraph>

                        <Paragraph>Hi! I'm Daria and over 6 years I've been deeply involved in developing IT services, launching new products, organizing team efforts, and refining business processes.

                            Throughout this journey, I've taken on diverse roles like product manager, product lead, product owner, and business/systems analyst. My expertise spans various domains, frameworks, and projects at different stages of maturity.

                        </Paragraph>
                        <Row gutter={12} justify={'end'}>
                            <Col>
                                <Button type={'primary'}>Message</Button>
                            </Col>
                            <Col>
                                <Button type={'default'}>Connected</Button>
                            </Col>
                        </Row>

                    </Col>

                </Row>
                <Row justify={'start'} style={{ width: '100%' }}>
                    <Col span={8}>
                        <Title level={5}>
                            Industry

                        </Title>
                        <Paragraph>Agriculture</Paragraph>
                        <Paragraph>Agriculture</Paragraph>
                    </Col>
                    <Col span={8}>
                        <Title level={5}>
                            Country
                        </Title>

                    </Col>
                    <Col span={8}>
                        <Title level={5}>
                            Socials

                        </Title>
                        <Row>
                            <Link href='' style={{ width: '100%' }}> Github
                            </Link>
                        </Row>
                        <Row>
                            <Link href=''> LinkedIn
                            </Link>
                        </Row>
                        <Row>
                            <Link href=''> Profile
                            </Link>
                        </Row>
                    </Col>

                </Row>


            </Col>
        </Row>

    )
}



export default ProfileDetailsComponent;