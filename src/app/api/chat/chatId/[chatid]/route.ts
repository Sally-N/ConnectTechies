import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req: NextRequest, context: any, res: NextResponse) {
    try {
        const { params } = context;
        const chatId = Number(params.chatid);
        console.log(chatId, 'userid')
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