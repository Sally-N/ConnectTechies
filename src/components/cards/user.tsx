import React, { FC, useContext, useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Row, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { MyUser, User } from '@/Utils/Types&Interfaces/user';
import { Profile } from '@/Utils/Types&Interfaces/profile';
import './cards.css';
import { Paragraph } from '@/Utils/Theme/customTheme';
import { AuthContext } from '@/Utils/Context/myUserContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface usersProps {
  users: User[]
}


const UsersCard: FC<usersProps> = ({ users }) => {
  const router = useRouter()
  const [usersProfiles, setUsersProfiles] = useState<Profile[]>([]);
  const MyUser = useContext(AuthContext);

  const handleCreateConnection = async (userId: number) => {
    let initiatorId = MyUser.value?.user.id;
    let acceptorId = userId;
    let status = 'pending'
    let connectionObj = { initiatorId, acceptorId, status }
    try {
      const res = await fetch(`/api/userconnections/${MyUser.value?.user.id}`, {
        method: 'POST',
        body: JSON.stringify(connectionObj)
      });

      const responseData = await res.json();
      console.log(responseData, 'ress')

      if (responseData.status === 500) {
        console.log('error requesting connection')
      }



      MyUser.update({ value: responseData.updatedUser as MyUser })
      toast.success('Connection request sent successfully')
      // setUsersProfiles(responseData?.userProfiles);
      // return usersProfiles;

      console.log(MyUser.value, 'wait')

    } catch (err) {
      console.log(err, 'error creating connection')
    }
  }




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


  const getUserImage = (image: string | null) => {
    if (!image) {
      return ('/userImages/default.png');
    }
    return image.replace('/public', '');

  }


  function handleClick(uniqueId: string) {
    console.log(uniqueId, 'uniqueId')
    router.push(`/viewProfile/${uniqueId}`);
  }
  return (
    <Row gutter={[12, 12]}>
      {users.map((user, index) => {
        const profile = getUserProfile(user.id);
        console.log(profile)
        const imagePath = getUserImage(profile?.image);
        return (
          <Col
            xs={12}
            sm={8}
            md={6}
            lg={5}
            xl={5}
            key={index}
          >
            <Card bordered={true} className='' onClick={() => handleClick(user.uniqueId)}
              cover={
                <img
                  alt="example"
                  src={imagePath!}
                  loading='lazy' />
              }>
              {/* <Avatar size={64} src={`${imagePath}`} /> */}
              <Paragraph className="one-line">{user.firstname + ' ' + user.lastname}</Paragraph>
              <Paragraph className='two-lines'>{profile?.level + " " + profile?.specialization}</Paragraph>
              <Button icon={<UserAddOutlined />} onClick={() => handleCreateConnection(user.id)}>Connect</Button>
              <Button icon={<UserAddOutlined />}>View Profile</Button>

            </Card>

            {/* <Card
              className='custom-card ant-card-body'
              hoverable
              style={{ width: '100%', height: '100%', backgroundColor: 'white' }}

              
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