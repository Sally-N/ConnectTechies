import { PrismaClient } from "@prisma/client";
import { notification } from "antd";
import { profile } from "console";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();
export async function POST(req: any) {
    try {
        const body = await req.json();

        const { email, password } = body;

        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!existingUserByEmail) {
            return NextResponse.json({
                status: 501,
                message: 'User with this email does not exist',

            })
        }

        const storedHashedPassword = existingUserByEmail?.password;

        const match = await bcrypt.compare(password, storedHashedPassword);

        const userConnections = await prisma.connection.findMany({
            where:
            {
                OR: [
                    {
                        initiatorId: existingUserByEmail.id,
                        status: { not: 'rejected' },
                    },
                    {
                        acceptorId: existingUserByEmail.id,
                        status: { not: 'rejected' },
                    }
                ]
            },
        })


        const userNotifications = await prisma.notification.findMany({
            where: { userId: existingUserByEmail.id },
        });

        const userChats = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: existingUserByEmail.id },
                    { recipientId: existingUserByEmail.id },
                ]
            },
        })

        const userProfile = await prisma.profile.findUnique({
            where: {
                userId: existingUserByEmail.id
            }
        })

        if (match) {
            return NextResponse.json({
                status: 200,
                message: 'Authentication successful',
                user: existingUserByEmail,
                profile: userProfile,
                connections: userConnections,
                chats: userChats,
                notifications: userNotifications,
            });
        } else {
            return NextResponse.json({
                status: 501,
                message: 'Wrong password',
            });
        }   


    } catch (error) {
        return NextResponse.json({
            error: 'Error during user logging'
        })
    }

}


