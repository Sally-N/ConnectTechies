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


export async function POST(req: any, context: any, res: Response) {
    try {
        const body = await req.formData();
        const { params } = context;
        const userId = Number(params.userid);
        console.log(body, 'body');
        // const { userId, country, specialization, level, image, linkedInUrl, portfolioUrl, aboutBio } = body;
        // console.log(userId, country, specialization, level, image, linkedInUrl, portfolioUrl, aboutBio, 'fd')


        const file = body.get('image');


        console.log(typeof body.get('image'), 'body')
        let timeStamp = Date.now();
        let filePathdb = null;

        // if (typeof file === 'string') {
        //     filePath = `./public/userImages/${timeStamp}${file}`;
        //     filePathdb = `/public/userImages/${timeStamp}${file}`;
        // } else if (file || file.name) {
        //     filePath = `./public/userImages/${timeStamp}${file!.name}`;
        //     filePathdb = `/public/userImages/${timeStamp}${file!.name}`;

        // }
        // else if (!file || !file.name) {
        //     filePathdb

        // }
        if (file && typeof file !== 'string' && file.name) {
            const filePath = `./public/userImages/${timeStamp}${file.name}`;
            filePathdb = `/public/userImages/${timeStamp}${file.name}`;
            const nodeReadableStream = toNodeReadable(file.stream());
            await pump(nodeReadableStream, fs.createWriteStream(filePath));
        }

        // console.log(file, 'fild')
        // for (let image of formdata) {
        //     console.log(image + ":", formdata[image]);
        // }
        //   console.log(JSON.parse(file), 'fildfghjkd')



        // const filePath = `./public/userImages/${timeStamp}${file!.name}`;
        // const filePathdb = `/public/userImages/${timeStamp}${file!.name}`;

        // await pump(file.stream(), fs.createWriteStream(filePath));

        // const nodeReadableStream = toNodeReadable(file.stream());
        // await pump(nodeReadableStream, fs.createWriteStream(filePath));
        // console.log(filePath, 'fp')



        const newUserProfile = await prisma.profile.update({
            where: {
                userId: userId,
            },
            data: {
                // userId: Number(body.get('userId')),
                country: body.get('country') || undefined,
                specialization: body.get('specialization') || undefined,
                image: filePathdb || undefined,
                level: body.get('level') || undefined,
                linkedInUrl: body.get('linkedInUrl') || undefined,
                portfolioUrl: body.get('portfolioUrl') || undefined,
                aboutBio: body.get('aboutBio') || undefined,
                industries: body.get('industries' || undefined)

                // country: formdata.get('country') as string,
                // specialization: formdata.get('specialization') as string,
                // level: formdata.get('level') as string,
                // image: filePathdb
            }
        });


        const newNotification = await prisma.notification.create({
            data: {
                userId: newUserProfile.userId,
                status: 'unread',
                message: 'Profile updated',
            }
        })

        return NextResponse.json({
            status: 201,
            message: "User profile successfully",
            user: newUserProfile,
            notification: newNotification
        })
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({
            error: 'Error creating user',
            success: false,
            status: 500
        });
    }

};


export async function GET(req: NextRequest, context: any) {

    const { params } = context;

    const userId = Number(params.userid);

    const userProfile = await prisma.profile.findUnique({
        where: {
            userId: userId,
        }
    });

    if (!userProfile) {

        return NextResponse.json({
            status: 500,
            message: 'User profile not found',
        })
    }

    return NextResponse.json({
        status: 201,
        message: 'All users in the database',
        users: userProfile
    })
}



