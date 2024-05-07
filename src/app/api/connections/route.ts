import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "../users/route";
import { message } from "antd";


export async function GET() {
    try {
        const allConnections = await prisma.connection.findMany();


        return NextResponse.json({
            status: 201,
            message: "All connections made in the database",
            connections: allConnections,
        })

    } catch (error) {
        return NextResponse.json({
            error: 'Error getting all connections made',
            success: false
        })
    }

}
