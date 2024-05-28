import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, context: any){
    try {
        const { params } = context;
        const connectionId = Number(params.connectionid);
        const body = await req.json();

        console.log(body,connectionId, 'mnbvcvbn')
        const withdrawnConnection = await prisma.connection.update({
            where: {
                id: connectionId,
            },
            data: {
                status: body.status,
                updatedAt: new Date()
            }
        })
        return NextResponse.json({
            status: 201,
            message: 'Connection has been withdrawn',
            newconnection: withdrawnConnection
        })

    } catch (error) {
        console.log(error, error)
        return NextResponse.json({
            status: 501,
            message: "Error withrawing connection",
            error
        })
    }   
}