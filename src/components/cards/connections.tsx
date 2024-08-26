import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { MyUser } from '@/Utils/Types&Interfaces/user';
import './cards.css';
import { AuthContext } from '@/Utils/Context/myUserContext';
import { UserAddOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserConnectionsCard: FC = () => {
  // useEffect(() => {
    const theUser = useContext(AuthContext);
    console.log(theUser.value, 'newCon')
    useEffect(() => {
      console.log(theUser.value, 'Updated User Context');
  }, [theUser.value]); 
  // }, [])
  const [connectedUsers, setConnectedUsers] = useState<MyUser[]>([]);
  const [connection, setConnection] = useState<MyUser>();


  // Function to fetch user data by userId
  const fetchUser = async (userId: number): Promise<MyUser | null> => {
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'GET' });
      const responseData = await res.json();
      setConnection(responseData);
      console.log(responseData, 'res')
      return connection!;
    } catch (err) {
      console.error("Error fetching user data:", err);
      return null;
    }
  };

  // Fetch the connected users when the component mounts
  useEffect(() => {
    const fetchConnectedUsers = async () => {
      const connections = theUser.value?.connections || [];
      const users = await Promise.all(connections.map(async (connection) => {
        const connectedUserId = connection.initiatorId === theUser.value?.user.id
          ? connection.acceptorId
          : connection.initiatorId;
        return await fetchUser(connectedUserId);
      }));
      setConnectedUsers(users.filter(user => user !== null) as MyUser[]);
    };

    fetchConnectedUsers();
    connection;
  }, [theUser.value?.connections, theUser.value?.user.id]);

  // Function to get the user image path
  const getUserImage = (image: string) => {
    return image ? image.replace('/public', '') : '';
  };

  // getUserImage(user.profile?.image) ||

  return (
    connectedUsers.length > 0 ? (
      <Row gutter={[12, 12]}>
        {connectedUsers.map((user, index) => (
          <Col xs={12} sm={8} md={6} lg={5} xl={4} key={index}>
            <Card bordered={true}>
              <img
                alt="User profile"
                src={ "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                loading='lazy'
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <Title className="one-line" level={5}>
                {connection?.user.firstname + '' + connection?.user.lastname}
              </Title>
              <Button icon={<UserAddOutlined />}>View Profile</Button>
            </Card>
          </Col>
        ))}
      </Row>
    ) : (
      <p>No Connections</p>
    )
  );
};

export default UserConnectionsCard;
