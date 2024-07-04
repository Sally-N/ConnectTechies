import { PrismaClient } from '@prisma/client';
import { message } from 'antd';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


///create chat
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json()
    const { senderId, receiverId } = body;

    console.log(senderId, receiverId);

    if (typeof senderId === 'undefined' || typeof receiverId === 'undefined') {
      return NextResponse.json({
        status: 400,
        message: 'senderId and receiverId are required',
      });
    }

    const existingChat = await prisma.chat.findFirst({
      where: {
        OR: [
          {
            recipientId: receiverId,
            senderId: senderId,
          },
          {
            recipientId: senderId,
            senderId: receiverId,
          }
        ]
      }
    })

    if (existingChat) {
      return NextResponse.json({
        status: 200,
        chat: existingChat,
      })
    }

    const chat = await prisma.chat.create({
      data: {
        senderId: senderId,
        // message,
        recipientId: receiverId,
        //   socketId
      },
    });

    return NextResponse.json({
      status: 200,
      chatFound: chat,
    })
  } catch (error) {
    console.error('Error saving message:', error);
    // res.status(500).json({ error: 'Failed to save message' });
  }
}



///find specific chat
export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    const { chatId } = body;
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      }
    })

    if (!chat) {
      return NextResponse.json({
        status: 500,
        message: "Chat not found"
      })
    }

    return NextResponse.json({
      status: 200,
      chatFound: chat,
    })

  } catch (error) {
    console.log(error, 'error')
  }

}