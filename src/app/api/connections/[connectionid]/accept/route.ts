import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../users/route";

export async function POST(req: NextRequest, context: any){
    try {
        const { params } = context;
        const connectionId = Number(params.connectionid);
        const body = await req.json();

        console.log(body,connectionId, 'mnbvcvbn')
        const updatedConnection = await prisma.connection.update({
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
            message: 'Connection has been accepted',
            newconnection: updatedConnection
        })

    } catch (error) {
        console.log(error, error)
        return NextResponse.json({
            status: 501,
            message: "Error creating new connection",
            error
        })
    }   
}