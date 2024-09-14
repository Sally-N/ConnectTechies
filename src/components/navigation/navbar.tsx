import React, { useContext } from "react";
import { Avatar, Button, Col, Dropdown, Row } from "antd";
import Image from "next/image";
import { BellOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Cookies } from '../../Utils/cookies';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthContext } from "@/Utils/Context/myUserContext";






const NavbarComponent: React.FC = () => {
    const userContext = useContext(AuthContext);
    const route = useRouter();

    const handleLogout = () => {
        console.log('logout');
        userContext.update({value: null});        
        Cookies.remove('user');
        toast.success('Logging out user')
        route.push("/login");

    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            ),
        },
    ]

   
    return (
        // <Row>
        //     <Col>
        <Row justify={'space-between'} align={'middle'}>
            <Col span={4}>
                <Image src={"/logo.svg"} alt={""} width={100} height={40} priority />
            </Col>
            <Col span={8}>
                <Button type={'primary'} icon={<BellOutlined />} shape={'circle'}></Button>
                <Dropdown menu={{ items }}>

                    <Avatar>SN</Avatar>
                </Dropdown>
            </Col>
        </Row>
        //     </Col>
        // </Row>

    )
}


export default NavbarComponent;