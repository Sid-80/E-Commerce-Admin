import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { adminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const {method} = req;

    await mongooseConnection();
    await adminRequest(req,res);

    if(method === 'POST')
    {
      const {title,description,price,images,category,productProperties} = req.body;
      console.log(images);
      await Product.create({
        title,description,price,images,category,properties:productProperties,
      })
      res.json({status:true});
    }
    else if (method === 'GET')
    {
      if (req.query?.id) {
        res.json(await Product.findOne({_id:req.query.id}))
      }else{
        res.json(await Product.find({}));
      }
      
    }
    else if (method === 'PUT')
    {
      const {title,description,price,id,images,category,productProperties} = req.body;
      const _id = id[0];
      console.log(_id);
      await Product.updateOne({_id},{
        title,description,price,images,category,properties:productProperties,
      })
      res.json({status:true});
    }
    else if(method === 'DELETE')
    {
      if (req.query?.id){
        await Product.deleteOne({_id:req.query?.id});
        res.json({status:true});
      }
    }
  }
  