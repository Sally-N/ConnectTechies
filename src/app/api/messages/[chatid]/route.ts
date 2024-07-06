import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

///get messages by chat id

export async function GET(req: NextRequest, context: any, res: NextResponse) {
    try {
        const { params } = context;

        const chatId = Number(params.chatid);

        const chatMessages = await prisma.message.findMany({
            where: {
                chatId: chatId
            }

        })

        if (!chatMessages) {
            return NextResponse.json({
                status: 500,
                message: "No message found"
            })
        }
        return NextResponse.json({
            status: 200,
            messages: chatMessages
        })


    } catch (error) {
        console.log(error, "error fetching messages")
    }

}