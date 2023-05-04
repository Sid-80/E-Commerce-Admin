import { Schema, model, models } from "mongoose";

const ProductSchema = Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    images:[{type:String}],
});

export const Product = models.Product || model('Product',ProductSchema);