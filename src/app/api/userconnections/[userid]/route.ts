import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: NextRequest, context: any) {
    try {
        const { params } = context;
        const userId = Number(params.userid);
        const body = await req.json();

        console.log(body,userId, 'mnbvcvbn')
        const newConnection = await prisma.connection.create({
            data: {
                initiatorId: userId,
                acceptorId: body.acceptorId,
                status: body.status,
            }
        })

        return NextResponse.json({
            status: 201,
            message: 'New Connection created',
            newconnection: newConnection
        })

    } catch (error) {
        return NextResponse.json({
            status: 501,
            message: "Error creating new connection",
        })

    }
}


export async function PUT(req: NextRequest, context: any){
    try {
        const { params } = context;
        const userId = Number(params.userid);
        const body = await req.json();

        console.log(body,userId, 'mnbvcvbn')
        const updatedConnection = await prisma.connection.update({
            where: {
                id: body.connectionId
            },
            data: {
                status: body.status,
            }
        })

        return NextResponse.json({
            status: 201,
            message: 'Connection has been accepted',
            newconnection: updatedConnection
        })

    } catch (error) {
        return NextResponse.json({
            status: 501,
            message: "Error creating new connection",
        })

    }   
}