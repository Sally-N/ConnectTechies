import { PrismaClient } from "@prisma/client";
import formidable from 'formidable';
import { hash } from 'bcrypt';
var fs = require('fs');
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { message } from "antd";


const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: any, res: Response) {
    try {

        const formdata = await req.formData();
        console.log(formdata, 'fd')

        console.log(formdata.get('firstname'));
        let img: string;

        console.log(typeof formdata.get('image'), 'body')

        const file = formdata.get('image');
        let timeStamp = Date.now();
        const filePath = `./public/userImages/${timeStamp}${file!.name}`;
        const filePathdb= `/public/userImages/${timeStamp}${file!.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));
        // return NextResponse.json({status:"success",data:file.size })

        

        // (formdata.get('image') as any[]).map((file: any) => {
        // })

        

        // const form = new formidable.IncomingForm();

        // form.parse(req, (err, fields, files) => {
        //   if (err) {
        //     console.error(err);
        //     return NextResponse.json({
        //         message: 'error parsing formdata',
        //   });
        //   }
        //   // Process your fields and files here
        //   NextResponse.json({status: 400})
        // });

        const newUser = await prisma.user.create({
            data: {
                firstname: formdata.get('firstname'),
                lastname: formdata.get('lastname'),
                password: formdata.get('password'),
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
            user: formdata,
        })
        // return NextResponse.json({
        //     user: formdata
        // })


    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user', success: false });
    }
};


export async function GET() {
    return NextResponse.json({
        name: "sally"
    })
}

