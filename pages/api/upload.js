var multiparty = require('multiparty');
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from "mime-types";
import { adminRequest } from './auth/[...nextauth]';

const bucketName = 'sid-nextjs-ecommerce';

export default async function handle(req,res){

    await adminRequest(req,res);

    const {fields,files} = await new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        form.parse(req,(err,fields,files)=> {
            if(err) reject(err);
            resolve({fields,files})
        });
    })
    console.log(files.file.length);
    const client = new S3Client({
        region:'us-west-2',
        credentials:{
            accessKeyId:process.env.S3_ACCESS_KEY,
            secretAccessKey:process.env.S3_SECRET_KEY,
        }
    })
    const Links = [];
    for(const file of files.file){
        const ext = file.originalFilename.split('.').pop();
        const newFileName = `${Date.now()}.${ext}`;
        await client.send(new PutObjectCommand({
            Bucket:bucketName,
            Key:newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType:mime.lookup(file.path)
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        Links.push(link);
    }
    res.json(Links);
}

export const config = {
    api:{bodyParser:false}
};