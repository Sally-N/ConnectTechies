import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


///create chat
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json()
    const { senderId, receiverId } = body;


    console.log(Number(senderId), Number(receiverId), 'senderId', 'receiverId', 'bodyChat');

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


    const loggedInuser = await prisma.user.findUnique({
      where: {
        id: senderId,
      }
    })

    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: senderId,
      }
    })

    const userConnections = await prisma.connection.findMany({
      where:
      {
        OR: [
          {
            initiatorId: senderId,
            status: { not: 'rejected' },
          },
          {
            acceptorId: senderId,
            status: { not: 'rejected' },
          }
        ]
      },
    })


    const userNotifications = await prisma.notification.findMany({
      where: { userId: senderId.id },
    });

    return NextResponse.json({
      status: 200,
      message: 'chat created sucessfully',
      user: loggedInuser,
      profile: userProfile,
      connections: userConnections,
      chats: chat,
      notifications: userNotifications,
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Error during user logging'
    })
  }

}



///find specific chat
export async function GET(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    const { chatId } = body;
    console.log(chatId, 'id')
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      }
    })

    return NextResponse.json({
      status: 200,
      chatFound: chat,
    })

  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: 'Error during user logging'
    })
  }

}