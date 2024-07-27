import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt';
import { Readable } from 'stream';
var fs = require('fs');
import { pipeline } from 'stream';
import { promisify } from 'util';
import { NextRequest, NextResponse } from "next/server";


export const config = {
    api: {
        bodyParser: false,
    },
};

const prisma = new PrismaClient();
const pump = promisify(pipeline);

function toNodeReadable(webReadable: ReadableStream<Uint8Array>): Readable {
    const reader = webReadable.getReader();
    return new Readable({
        async read() {
            const { done, value } = await reader.read();
            if (done) {
                this.push(null);
            } else {
                this.push(Buffer.from(value));
            }
        }
    });
}


export async function POST(req: any, res: Response) {
    try {
        const body = await req.formData();
        console.log(body, 'body');
    
        const file = body.get('image');


        console.log(typeof body.get('image'), 'body')
        let timeStamp = Date.now();
        let filePathdb = null;
        if (file && typeof file !== 'string' && file.name) {
            const filePath = `./public/userImages/${timeStamp}${file.name}`;
            filePathdb = `/public/userImages/${timeStamp}${file.name}`;
            const nodeReadableStream = toNodeReadable(file.stream());
            await pump(nodeReadableStream, fs.createWriteStream(filePath));
        }
        

            const newUserProfile = await prisma.profile.create({
            data: {
                user: {
                    connect: {id: Number(body.get('userId'))}
                },
                // userId: Number(body.get('userId')),
                country: body.get('country'),
                specialization: body.get('specialization'),
                image: filePathdb || null,
                level: body.get('level'),
                linkedInUrl: body.get('linkedInUrl') || null,
                portfolioUrl: body.get('portfolioUrl') || null,
                aboutBio: body.get('aboutBio') || null,
                industries: body.get('industries' || null)
               
            }
        });


        const newNotification = await prisma.notification.create({
            data: {
                userId: newUserProfile.userId,
                status: 'unread',
                message: 'Profile setup is complete',
            }
        })

        return NextResponse.json({
            status: 201,
            message: "User profile successfully",
            user: newUserProfile,
            notification: newNotification
        })
    } catch (error) {
        console.error('Error creating user profile:', error);
        return NextResponse.json({
            error: 'Error creating user',
            success: false,
            status: 500
        });
    }

};


// export async function GET(req: NextRequest) {

//     const allUsers = await prisma.user.findMany();

//     return NextResponse.json({
//         status: 201,
//         message: 'All users in the database',
//         users: allUsers
//     })
// }



