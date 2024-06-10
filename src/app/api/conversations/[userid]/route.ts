import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { message } from "antd";



export async function GET(req: NextRequest, context: any) {

    try {
        const { params } = context;
        const userId = params.userid;
        console.log(userId, 'userid')

        const allChats = await prisma.conversation.findMany({
            where: {
                senderId: userId
            }
        })

        return NextResponse.json({
            status: 201,
            message: ''
        })
    } catch (error) {

    }

}