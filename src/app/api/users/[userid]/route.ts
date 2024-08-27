var fs = require('fs');
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { profile } from 'console';


const prisma = new PrismaClient();
////update user
export async function POST(req: any, context: any, res: Response) {
    try {
        const { firstName, lastName } = await req.json();


        const { params } = context;
        const userId = Number(params.userid);


        const updatedUser = await prisma.user.update({
            where: {
                id: (userId)
            },
            data: {
                firstname: firstName,
                lastname: lastName,
                updatedAt: new Date(),
            }
        });

        const userConnections = await prisma.connection.findMany({
            where:
            {
                OR: [
                    {
                        initiatorId: userId,
                        status: { not: 'rejected' },
                    },
                    {
                        acceptorId: userId,
                        status: { not: 'rejected' },
                    }
                ]
            },
        })


        const userNotifications = await prisma.notification.findMany({
            where: { userId: userId },
        });

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { recipientId: userId },
                ]
            },
        })

        const userProfile = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        })

        return NextResponse.json({
            status: 201,
            message: "User updated successfully",
            user: updatedUser,
            connections: userConnections,
            notifications: userNotifications,
            userChats: chats,
            profile: userProfile,
        })


    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Error updating user', success: false });
    }
};


export async function GET(req: NextRequest, context: any) {
    try {
        const { params } = context;
        const userId = Number(params.userid);
        console.log(userId, 'userId', 'fgggg')

        if (isNaN(userId)) {
            return NextResponse.json({
                status: 400,
                message: 'Invalid user ID'
            });
        }

        const existingUserById = await prisma.user.findUnique({
            where: { id: userId }
        });

        const userConnections = await prisma.connection.findMany({
            where:
            {
                OR: [
                    {
                        initiatorId: userId,
                        status: { not: 'rejected' },
                    },
                    {
                        acceptorId: userId,
                        status: { not: 'rejected' },
                    }
                ]
            },
        })


        const userNotifications = await prisma.notification.findMany({
            where: { userId: userId },
        });

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { recipientId: userId },
                ]
            },
        })

        const userProfile = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        })

        if (existingUserById) {
            return NextResponse.json({
                status: 200,
                message: 'User exists in database',
                user: existingUserById,
                connections: userConnections,
                notifications: userNotifications,
                userChats: chats,
                profile: userProfile,
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: 'User not found in database'
            });
        }

    } catch (error) {
        return NextResponse.json({
            status: 501,
            message: 'Error getting user from database',
            error: error,
        })

    }
}







