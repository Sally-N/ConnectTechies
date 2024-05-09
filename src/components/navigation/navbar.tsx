import React from "react";
import { Avatar, Button, Col, Row } from "antd";
import Image from "next/image";
import { BellOutlined } from "@ant-design/icons";



const NavbarComponent: React.FC = () => {
    return (
        // <Row>
        //     <Col>
                <Row justify={'space-between'} align={'middle'}>
                    <Col span={4}>
                        <Image src={"/logo.svg"} alt={""} width={100} height={40}/>
                    </Col>
                    <Col span={8}>
                        <Button type={'primary'} icon={<BellOutlined />} shape={'circle'}></Button>
                        <Avatar>SN</Avatar>
                    </Col>
                </Row>
        //     </Col>
        // </Row>

    )
}


export default NavbarComponent;