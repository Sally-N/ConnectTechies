import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";



///createmessage


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { chatId, senderUId, message, read } = await req.json();

        const newMessage = await prisma.message.create({
            data: {
                chatId: chatId,
                senderId: Number(senderUId),
                text: message,
                read: read,
            }
        })

        return NextResponse.json({
            status: 200,
            text: newMessage,
        })

    } catch (error) {
        console.log(error, "error creating messages")
    }


}




///getMessages




