import { mongooseConnection } from "@/lib/mongoose";
import { Category } from "@/models/Categories";

export default async function handler(req,res){
    const {method} = req;
    await mongooseConnection();
    if (method === 'POST') {
        const {name,parentCategory,properties} = req.body;
        if (parentCategory === "") {
            const categoryDoc = await Category.create({name,properties});
            res.json({status:true,categoryDoc});
        }else{
            const categoryDoc = await Category.create({name, parent:parentCategory,properties});
            res.json({status:true,categoryDoc});
        }
    }
    else if(method === 'GET')
    {
        res.json(await Category.find().populate('parent'));
    }
    else if(method === 'PUT')
    {
        const {name,parentCategory,_id,properties} = req.body;
        if (parentCategory === '') {
            const categoryDoc = await Category.updateOne({_id},{name,properties});
            res.json({status:true,categoryDoc});
        }else{
            const categoryDoc = await Category.updateOne({_id},{name, parent:parentCategory, properties});
            res.json({status:true,categoryDoc});
        }
    }
    else if(method === 'DELETE')
    {
        if(req.query?.id)
            await Category.deleteOne({_id:req.query?.id});
        res.json({status:true});
    }
}