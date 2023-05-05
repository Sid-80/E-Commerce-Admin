import { mongooseConnection } from "@/lib/mongoose";
import { Category } from "@/models/Categories";

export default async function handler(req,res){
    const {method} = req;
    await mongooseConnection();
    if (method === 'POST') {
        const {name,parentCategory} = req.body;
        if (parentCategory === "") {
            const categoryDoc = await Category.create({name});
            res.json({status:true,categoryDoc});
        }else{
            const categoryDoc = await Category.create({name, parent:parentCategory});
            res.json({status:true,categoryDoc});
        }
    }
    else if(method === 'GET')
    {
        res.json(await Category.find().populate('parent'));
    }
}