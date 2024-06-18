import React from "react";
import Search from "antd/es/input/Search"
import { Col, Row } from "antd";


const UserSearchComponent = () => {
    return (
        <Row justify={'center'} align={'middle'}>
            <Col span={21}>
                <Search placeholder="Search" />
            </Col>
        </Row>

    )
}


export default UserSearchComponent;