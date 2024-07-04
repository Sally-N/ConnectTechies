import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

///find user chats

export async function GET(req: NextRequest, context: any) {
    try {
        const { params } = context;
        const userId = params.userid;
        console.log(userId, 'userid')

        const allChats = await prisma.chat.findMany({
            where: {
                OR: [
                    {
                        recipientId: userId,
                    },
                    {
                        senderId: userId,
                    }
                ]
            }
        })
        return NextResponse.json({
            status: 201,
            message: 'all user chats',
            chats: allChats
        })
    } catch (error) {
        console.log(error, 'error')

    }

}