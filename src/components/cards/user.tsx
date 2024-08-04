import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Row, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { User } from '@/Utils/Types&Interfaces/user';
import { Profile } from '@/Utils/Types&Interfaces/profile';

import './cards.css';
import { Paragraph } from '@/Utils/Theme/customTheme';

const { Title } = Typography;

interface usersProps {
  users: User[]
}


const UsersCard: FC<usersProps> = ({ users }) => {
  const [usersProfiles, setUsersProfiles] = useState<Profile[]>([]);


  const fetchUsersProfiles = async () => {
    try {
      const res = await fetch(`/api/profile`, {
        method: 'GET'
      });

      const responseData = await res.json();
      console.log(responseData, 'ress')
      setUsersProfiles(responseData?.userProfiles);
      return usersProfiles;

    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }

  useEffect(() => {
    fetchUsersProfiles()

  }, [])

  const getUserProfile = (userid: number) => {
    return usersProfiles?.find(profile => profile.userId === userid);
  }


  const getUserImage = (image: string) => {
    let imagePath;
    if (image == null || image == undefined) {
      return;
    }

    imagePath = image.replace('/public', '');

    return imagePath;
  }









  return (
    <Row gutter={[12, 12]}>
      {users.map((user, index) => {
        const profile = getUserProfile(user.id);
        console.log(profile)

        const imagePath = getUserImage(profile?.image);
        // if (imagePath) {
        //   let userImagePath = imagePath.replace('/public', '');
        // }
        return (
          <Col
            xs={12}
            sm={8}
            md={6}
            lg={5}
            xl={4}
            key={index}
          >
            <Card bordered={true} className='.card .card:hover'>
              <Avatar size={64} src={`${imagePath}`} />
              <Title className="one-line" level={5}>{user.firstname + ' ' + user.lastname}</Title>
              <Paragraph className='two-lines'>{profile?.level + " " + profile?.specialization}</Paragraph>
              <Button icon={<UserAddOutlined />}>Connect</Button>
              <Button icon={<UserAddOutlined />}>View Profile</Button>

            </Card>

            {/* <Card
              className='custom-card ant-card-body'
              hoverable
              style={{ width: '100%', height: '100%', backgroundColor: 'white' }}

              cover={
                <img
                  alt="example"
                  src={profile?.image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                  loading='lazy' />
              }
              actions={[
                <>

                  <Button icon={<UserAddOutlined />}>Connect</Button>
                  <Button className='margin-top'>Check Profile</Button>
                </>
              ]}
            >

              <Meta
                title={user.firstname + ' ' + user.lastname} className=''
                description={profile ? profile?.level + " " + profile?.specialization : "No profile information"}
              />
            </Card> */}
          </Col>
        );
      })}
    </Row>


  )
};

export default UsersCard;