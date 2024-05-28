import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


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
