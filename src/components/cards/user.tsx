import React, { useState } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { User } from '@/Utils/Types&Interfaces/user';
import './cards.css'; 


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
    <Row gutter={[16, 32]} >
      {users?.map((user, index) => (
        <Col xs={12} sm={8} md={6} lg={4} xl={4}
          key={index}
          style={{ height: '380px'}}
        >
          <Card className='custom-card ant-card-body'
            hoverable
            style={{ width: '100%', height: '100%', backgroundColor: 'white', }}
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"  />}
            actions={[
              <>
                <Button icon={<UserAddOutlined />}>Connect</Button>
              </>
            ]}
            
          >
            <Meta
              // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title={user.firstname + ' ' + user.lastname}
              description={user.level + ' ' + user.specialization}
              style={{ backgroundColor: 'white'}}
            />
          </Card>
        </Col>
      ))
      }

    </Row>

  )
};

export default UserCards;