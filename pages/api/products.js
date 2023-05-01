import { mongooseConnection } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnection();
    if(method === 'POST'){
      const {title,description,price} = req.body;
      await Product.create({
        title,description,price
      })
      res.json({status:true});
    }else if (method === 'GET') {
      const products = await Product.find({});
      res.json(products);
    }
  }
  