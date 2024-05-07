import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt';
var fs = require('fs');
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
import { NextResponse } from "next/server";



 export const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: any, res: Response) {
    try {

        const formdata = await req.formData();
        console.log(formdata, 'fd')
        

        console.log(typeof formdata.get('image'), 'body')

        const file = formdata.get('image');
        console.log(file, 'fild')
        for(let image of formdata) {
            console.log(image + ":", formdata[image]);
        }
    //   console.log(JSON.parse(file), 'fildfghjkd')

        
        let timeStamp = Date.now();
        const filePath = `./public/userImages/${timeStamp}${file!.name}`;
        const filePathdb= `/public/userImages/${timeStamp}${file!.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));
        
        const existingEmail =   formdata.get('email')


        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: existingEmail },
        })

         if (existingUserByEmail) {
            return NextResponse.json({
                message: "user with email already exists"
            })

        }

               const hashedPassword = await hash(formdata.get('password'), 10);


        const newUser = await prisma.user.create({
            data: {
                firstname: formdata.get('firstname'),
                lastname: formdata.get('lastname'),
                password: hashedPassword,
                email: formdata.get('email'),
                country: formdata.get('country'),
                specialization: formdata.get('specialization'),
                level: formdata.get('level'),
                image: filePathdb
            }
        });

        return NextResponse.json({
            status: 201,
            message: "User created successfully",
            user: newUser,
        })


    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user', success: false });
    }
};


export async function GET() {

    const allUsers = await prisma.user.findMany();

    return NextResponse.json({
        status: 201,
        message: 'All users in the database',
        users: allUsers
    })
}




