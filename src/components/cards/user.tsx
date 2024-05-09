import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Row, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { User } from '@/Utils/Types&Interfaces/user';

const { Meta } = Card;
const { Title } = Typography;


const UserCards: React.FC = () => {
  const [users, setAllUsers] = useState<User[]>([]);

  const getData = async () => {
    try {
      const res = await fetch("/api/users", {
        method: 'GET'
      });

      const responseData = await res.json();

      if (responseData && responseData.users) {
        setAllUsers(responseData.users); // Update only the users array
      } else {
        console.error("Invalid response data:", responseData);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }

  getData()
  return (
    <Row gutter={[4, 0]} style={{ height:'100%'}}>
      {users?.map((user, index) => (
        <Col span={4} 
        key={index}
        >
        <Card
          hoverable
          style={{ width: '100%', height: 100, backgroundColor: 'white' }}
          cover={
            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          actions={[
            <>
            <Button icon={<UserAddOutlined />}>Connect</Button>
            </>
          ]}
        >
          <Meta
            // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={user.firstname + user.lastname}
            description={user.level + user.specialization}
            style={{backgroundColor: 'white', padding: 0, margin: 0}}
          />
          {/* <p>{user.lastname}</p> */}
        </Card>
        </Col>
      ))
      }

    </Row>

  )
};

export default UserCards;