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

        const formdata = await req.formData();
        console.log(formdata, 'fd')


        const file = formdata.get('image');


        console.log(typeof formdata.get('image'), 'body')
        let timeStamp = Date.now();
        let filePath = '';
        let filePathdb = '';

        if (typeof file === 'string') {
            filePath = `./public/userImages/${timeStamp}${file}`;
            filePathdb = `/public/userImages/${timeStamp}${file}`;
        } else if (file || file.name) {
            filePath = `./public/userImages/${timeStamp}${file!.name}`;
            filePathdb = `/public/userImages/${timeStamp}${file!.name}`;

        }
        else if (!file || !file.name) {
            return NextResponse.json({ error: 'Image file is required', success: false });
        }

        console.log(file, 'fild')
        // for (let image of formdata) {
        //     console.log(image + ":", formdata[image]);
        // }
        //   console.log(JSON.parse(file), 'fildfghjkd')



        // const filePath = `./public/userImages/${timeStamp}${file!.name}`;
        // const filePathdb = `/public/userImages/${timeStamp}${file!.name}`;

        // await pump(file.stream(), fs.createWriteStream(filePath));

        const nodeReadableStream = toNodeReadable(file.stream());
        await pump(nodeReadableStream, fs.createWriteStream(filePath));
        console.log(filePath, 'fp')


        const existingEmail = formdata.get('email') as string;


        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: existingEmail },
        })

        if (existingUserByEmail) {
            return NextResponse.json({
                message: "user with email already exists"
            })

        }

        const hashedPassword = await hash(formdata.get('password') as string, 10);


        const newUser = await prisma.user.create({
            data: {
                firstname: formdata.get('firstname') as string,
                lastname: formdata.get('lastname') as string,
                password: hashedPassword,
                email: formdata.get('email') as string,
                country: formdata.get('country') as string,
                specialization: formdata.get('specialization') as string,
                level: formdata.get('level') as string,
                image: filePathdb
            }
        });

        let date = new Date(newUser.createdAt);
        console.log(date, 'date');

        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });

        console.log(formattedDate, 'formateed date');



        const newNotification = await prisma.notification.create({
            data: {
                userId: newUser.id,
                status: 'unread',
                message: `You joined on ${formattedDate} `,
            }
        })

        return NextResponse.json({
            status: 201,
            message: "User created successfully",
            user: newUser,
            notification: newNotification
        })

        


    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user', success: false });
    }

};


export async function GET(req: NextRequest) {

    const allUsers = await prisma.user.findMany();

    return NextResponse.json({
        status: 201,
        message: 'All users in the database',
        users: allUsers
    })
}



