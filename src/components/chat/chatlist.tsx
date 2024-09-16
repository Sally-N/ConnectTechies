import React, { useContext, useEffect, useState } from "react"
import { Paragraph, Text } from "@/Utils/Theme/customTheme"
import { Avatar, Col, Row } from "antd"
import './chat.css'
import { ChatInterface } from "@/Utils/Types&Interfaces/chat"
import { MyUser } from "@/Utils/Types&Interfaces/user"
import { AuthContext } from "@/Utils/Context/myUserContext"



export const ChatListComponent = () => {
    const loggedInUser = useContext(AuthContext);

    const [userChats, setUserChats] = useState<ChatInterface[]>([])
    const [userDetails, setUserDetails] = useState<MyUser>()

    const [chatlistUsers, setChatListUsers] = useState<MyUser[]>([]);
    const [uchat, setUchat] = useState<MyUser>();


    // Function to fetch user data by userId
    const fetchUser = async (userId: number): Promise<MyUser | null> => {
        try {
            const res = await fetch(`/api/users/${userId}`, { method: 'GET' });
            const responseData = await res.json();
            setUchat(responseData);
            console.log(responseData, 'res')
            return uchat!;
        } catch (err) {
            console.error("Error fetching user data:", err);
            return null;
        }
    };

    // Fetch the connected users when the component mounts
    useEffect(() => {
        const fetchChatUsers = async () => {
            const userChats = loggedInUser.value?.chats || [];
            const users = await Promise.all(userChats.map(async (userChat) => {
                const chatListUserId = userChat.senderId === loggedInUser.value?.user.id
                    ? userChat.recipientId
                    : userChat.senderId;
                return await fetchUser(chatListUserId);
            }));
            setChatListUsers(users.filter(user => user !== null) as MyUser[]);
        };

        fetchChatUsers();
        uchat;
    }, [loggedInUser.value?.chats, loggedInUser.value?.user.id]);

    async function getUserChats() {
        try {
            const userChats = await fetch('/api/chat/15', {
                method: "GET"
            })

            const res = await userChats.json();

            // console.log(res, 'res')
            // setUserChats(res)
            if (Array.isArray(res)) {
                setUserChats(res);

            } else {
                setUserChats([])
            }
        } catch (error) {
            console.log(error, 'Error getting user chats');
            setUserChats([])

        }
    }


    async function getReceipientDetails() {
        try {
            const recipient = await fetch('api/users/20', {
                method: "GET"
            })

            const res = await recipient.json();
            setUserDetails(res)

        } catch (error) {
            console.log(error, "error getting recipient details");
            setUserChats([]);


        }
    }



    const getUserImage = (image: string | null) => {
        if (!image) {
            return ('/userImages/default.png');
        }
        return image.replace('/public', '');

    }




    useEffect(() => {
        getUserChats();
        getReceipientDetails();
    }, []);

    console.log(userDetails, 'userC')


    return (
        <Row className="chatlist background-white">
            <Col span={24}>
                <Row>
                    {
                        chatlistUsers.map((user, index) => {
                            const imagePath = getUserImage(user?.profile?.image);
                            return (
                                <Row key={index} gutter={24} justify={'center'} align={'middle'}>
                                    <Col span={6} >
                                        <Avatar size={48} src={imagePath}>{ }</Avatar>
                                    </Col>
                                    <Col span={18}>
                                        <Text className="width-100 font-regular">{user?.user?.firstname + '' + user?.user?.lastname}</Text>
                                        <Paragraph className="font-small text-secondary">If you are still facing issues</Paragraph>

                                    </Col>
                                </Row>
                            )
                        }
                        )
                    }
                </Row>
            </Col>
        </Row>

    )
}