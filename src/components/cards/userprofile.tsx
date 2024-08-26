import React, { FC, useContext } from "react"
import { Button, Col, Row } from "antd"
import Image from "next/image";
import { Title, Paragraph } from "@/Utils/Theme/customTheme";
import Link from "next/link";
import { AuthContext } from "@/Utils/Context/myUserContext";
import { MyUser } from "@/Utils/Types&Interfaces/user";
import toast from "react-hot-toast";

interface ProfileDetailsComponentProps {
    user: MyUser;
}

const ProfileDetailsComponent: React.FC<ProfileDetailsComponentProps> = ({ user }) => {
    console.log(user, 'my profile')
    const loggedInUser = useContext(AuthContext)
    const getUserImage = (image: string | null) => {
        if (!image) {
            return ('/userImages/default.png');
        }
        return image.replace('/public', '');
    }


    const handleCreateConnection = async (userId: number) => {
        let initiatorId = loggedInUser.value?.user.id;
        let acceptorId = userId;
        let status = 'pending'
        let connectionObj = { initiatorId, acceptorId, status }
        try {
          const res = await fetch(`/api/userconnections/${loggedInUser.value?.user.id}`, {
            method: 'POST',
            body: JSON.stringify(connectionObj)
          });
    
          const responseData = await res.json();
          console.log(responseData, 'ress')
    
          if (responseData.status === 500) {
            console.log('error requesting connection')
          }
    
    
    
          loggedInUser.update({ value: responseData.updatedUser as MyUser })
          toast.success('Connection request sent successfully')
          // setUsersProfiles(responseData?.userProfiles);
          // return usersProfiles;
    
          console.log(loggedInUser.value, 'wait')
    
        } catch (err) {
          console.log(err, 'error creating connection')
        }
      }
    return (
        <Row style={{ width: '100%' }}>
            <Row align={'top'} justify={'space-evenly'} style={{ width: '100%', height: '100%', border: 'solid 2px pink' }}>
                <Col span={3}>
                    <Image loading="lazy" src={getUserImage(user.profile.image)} alt="user image" width={100} height={100} />
                </Col>
                <Col span={21} style={{ width: '100%' }}>
                    <Row justify={'space-between'} align={'top'} style={{ width: '100%' }}>
                        <Col>
                            <Title level={5} style={{ margin: '0px' }}>{user.user.firstname + " " + user.user.lastname}</Title>
                            <Title level={5} style={{ margin: '0px', fontWeight: 300}}>
                                {user.profile.level + " " + user.profile.specialization}
                            </Title>
                        </Col>
                        <Col>
                            {user.user.id === loggedInUser.value?.user.id && (
                                <Button type="primary" style={{ marginLeft: '10px' }}>
                                    Edit Profile
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Paragraph style={{margin: '0px', padding: '0px'}}>
                        {user.user.email}
                    </Paragraph>
                    <Paragraph style={{ width: '100%', margin: '0px', padding: 0}}>
                        Several years of experience in product design with a wide range of industries including SaaS, E-Commerce, B2B, Travel, EdTech, and Aggro-tech. Designed and managed several products and pro
                        {/* {user.profile.aboutBio} */}
                    </Paragraph>
                    <Row gutter={12} justify={'end'}>
                        <Col>
                            <Button type={'primary'}>Message</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => handleCreateConnection(user.user.id)} type={'default'}>Connect</Button>
                        </Col>
                    </Row>

                </Col>

            </Row>
            <Row justify={'start'} style={{ width: '100%' }}>
                <Col span={8}>
                    <Title level={5}>
                        Industry
                    </Title>
                    <Paragraph>{user.profile.industries}</Paragraph>
                </Col>
                <Col span={8}>
                    <Title level={5}>
                        Country
                    </Title>
                    <Paragraph>{user.profile.country}</Paragraph>

                </Col>
                <Col span={8}>
                    <Title level={5}>
                        Socials

                    </Title>
                    <Row>
                        <Link href={`${user.profile.portfolioUrl}`} style={{ width: '100%' }}> Portflio Url
                        </Link>
                    </Row>
                    <Row>
                        <Link href={`${user.profile.linkedInUrl}`}> LinkedIn
                        </Link>
                    </Row>
                </Col>
            </Row>
        </Row>

    )
}



export default ProfileDetailsComponent;