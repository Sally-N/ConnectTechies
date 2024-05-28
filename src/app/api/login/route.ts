import { PrismaClient } from "@prisma/client";
import { message } from "antd";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();
export async function POST(req: any) {
    try {
        const body = await req.json();

        const { email, password } = body;

        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!existingUserByEmail) {
            return NextResponse.json({
                status: 501,
                message: 'User with this email does not exist',

            })
        }

        const storedHashedPassword = existingUserByEmail?.password;

        const match = await bcrypt.compare(password, storedHashedPassword);

        if (match) {
            return NextResponse.json({
                status: 200,
                message: 'Authentication successful',
                data: existingUserByEmail
            });
        } else {
            return NextResponse.json({
                status: 501,
                message: 'Wrong password',
            });
        }   


    } catch (error) {
        return NextResponse.json({
            error: 'Error during user logging'
        })
    }

}


