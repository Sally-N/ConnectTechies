import React, { FC, useContext, useState } from "react"
import { Button, Col, Modal, Row } from "antd"
import Image from "next/image";
import { Title, Paragraph } from "@/Utils/Theme/customTheme";
import Link from "next/link";
import { AuthContext } from "@/Utils/Context/myUserContext";
import { MyUser } from "@/Utils/Types&Interfaces/user";
import toast from "react-hot-toast";
import UpdateUserComponent from "../Foms/updateUser";
import UpdateUserTabComponent from "../Tab/updateUserTab";
import { useRouter } from "next/navigation";
import create from "@ant-design/icons/lib/components/IconFont";

interface ProfileDetailsComponentProps {
    user: MyUser;
}

const ProfileDetailsComponent: React.FC<ProfileDetailsComponentProps> = ({ user }) => {
    console.log(user, 'my profile')
    const loggedInUser = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const getUserImage = (image: string | null) => {
        if (!image) {
            return ('/userImages/default.png');
        }
        return image.replace('/public', '');
    }


    const handleCreateConnection = async (userId: number) => {
        const existingConnections = loggedInUser.value?.connections.filter(anyUser => anyUser.id === user.user.id);
        if (existingConnections) {
            return;
        }
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

    const handleCancel = () => {
        setOpen(false);
    };

    // initiatorId: number, acceptorId: number
    const createChat = async (user: MyUser) => {
        let existingChat = loggedInUser.value?.chats.filter((chat) => {
            return chat.recipientId === user.user.id || chat.senderId === user.user.id;

        })

        console.log(existingChat, 'existingid')
        let chatObj = {
            receiverId: (user.user!.id) as Number,
            senderId: (loggedInUser.value?.user.id) as Number,
        }

        console.log(chatObj, 'chatobj')

        if (!existingChat) {
            try {
                const chatResponse = await fetch(`/api/chat`, {
                    method: 'POST',
                    body: JSON.stringify(chatObj),
                })
                console.log(chatResponse.json(), 'chatRes')
            } catch (error) {
                console.log(error)

            }
        }
        // router.push('/chat')
        // const userObj = { initiatorId, acceptorId }
        // console.log(userObj, 'usero')

        // try {
        //     const response = await fetch('api/chat', {
        //         method: "POST",
        //         body: JSON.stringify(userObj)
        //     })

        //     const result = await response.json();
        //     console.log(result);

        //     // if (result.status == 500) {
        //     //     toast.error('A user with this email already exists');
        //     // } else {
        //     //     sessionStorage.setItem("user", JSON.stringify(result.user))
        //     //   console.log(sessionStorage.getItem("user"));

        //     //     toast.success('Sign Up was successful');
        //     //     console.log(result.user);
        //     //     console.log(result.user.id)
        //     //     router.push(`/profile`);
        //     // router.push(`/profile/${result.user.id}`)

        //     // await signIn("credentials", {
        //     //     email: email,
        //     //     password: password,
        //     //     redirect: true,
        //     //     // callbackUrl: "/profile"
        //     //     callbackUrl: `/profile/${newuser?.id}`,
        //     // })
        //     // }


        // } catch (error) {
        //     console.log(error, 'err')
        // }
    }
    return (
        <Row style={{ width: '100%' }}>
            <Row align={'top'} justify={'space-evenly'} style={{ width: '100%', height: '100%' }}>
                <Col span={3}>
                    <Image loading="lazy" src={getUserImage(user.profile.image)} alt="user image" width={100} height={100} />
                </Col>
                <Col span={21} style={{ width: '100%' }}>
                    <Row justify={'space-between'} align={'top'} style={{ width: '100%' }}>
                        <Col>
                            <Title level={5} style={{ margin: '0px' }}>{user.user.firstname + " " + user.user.lastname}</Title>
                            <Title level={5} style={{ margin: '0px', fontWeight: 300 }}>
                                {user.profile.level + " " + user.profile.specialization}
                            </Title>
                        </Col>
                        <Col>
                            {loggedInUser.value?.user?.id! && user.user.id === loggedInUser.value?.user.id!! && (
                                <Button type="primary" style={{ marginLeft: '10px' }} onClick={() => setOpen(!open)}>
                                    Edit Profile
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Paragraph style={{ margin: '0px', padding: '0px' }}>
                        {user.user.email}
                    </Paragraph>
                    <Paragraph style={{ width: '100%', margin: '0px', padding: 0 }}>
                        {/* Several years of experience in product design with a wide range of industries including SaaS, E-Commerce, B2B, Travel, EdTech, and Aggro-tech. Designed and managed several products and pro */}
                        {user.profile.aboutBio}
                    </Paragraph>
                    {loggedInUser.value?.user?.id! && user.user.id !== loggedInUser.value?.user.id!! && (

                        <Row gutter={12} justify={'end'}>
                            <Col>
                                <Button onClick={() => createChat(user as MyUser)} type={'primary'}>Message</Button>
                            </Col>
                            <Col>
                                <Button onClick={() => handleCreateConnection(user.user.id)} type={'default'}>Connect</Button>
                            </Col>
                        </Row>
                    )}
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
            <Modal open={open} onCancel={handleCancel}>
                <UpdateUserTabComponent />
            </Modal>
        </Row>

    )
}



export default ProfileDetailsComponent;