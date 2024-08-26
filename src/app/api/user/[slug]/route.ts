import prisma from "@/Lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
    try {
        const { params } = context;
        const uniqId = params.slug;
        console.log(uniqId, 'userId', 'fgggg')

        const existingUserById = await prisma.user.findUnique({
            where: { uniqueId: uniqId!}
        });

        console.log(existingUserById, 'existingUserById')

        const userConnections = await prisma.connection.findMany({
            where:
            {
                OR: [
                    {
                        initiatorId: existingUserById?.id,
                        status: { not: 'rejected' },
                    },
                    {
                        acceptorId: existingUserById?.id,
                        status: { not: 'rejected' },
                    }
                ]
            },
        })


        const userNotifications = await prisma.notification.findMany({
            where: { userId: existingUserById?.id },
        });

        const chats = await prisma.chat.findMany({
            where: {
                OR: [
                    { senderId: existingUserById?.id },
                    { recipientId: existingUserById?.id },
                ]
            },
        })

        const userProfile = await prisma.profile.findUnique({
            where: {
                userId: existingUserById?.id
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