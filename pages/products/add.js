import Layout from '@/components/Layout'
import React, { useState } from 'react'
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import axios from 'axios';

export default function add() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const createProduct = async(e) => {
        e.preventDefault();
        try {
            const data = {title,description,price}
            const res = await axios.post('/api/products',data);
        } catch (e) {
            
        }
    }
  return (
    <Layout>
        <div className='flex flex-col justify-start items-start'>
            <form className='w-full p-5' onSubmit={(e)=>{createProduct(e)}}>
                <h1 className='font-bold tracking-[5px] animate-pulse my-8'>NEW PRODUCT</h1>
                <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Product Name</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' placeholder='product name' />
                <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Product Description</label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='description'></textarea>
                <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Price in USD</label>
                <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='price' type='number' />
                <button type='submit' className=' bg-[#635985] rounded-md my-5 text-white p-2 px-4 hover:bg-[#443C68] flex gap-1'>
                    <div>ADD</div> 
                    <div><PlusCircleIcon className='h-5 w-5' /></div>
                </button>
            </form>
        </div>
    </Layout>
  )
}
