import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function add() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const router = useRouter()
    const options = {
        position: "bottom-right",
        autoClose: 8000,
        theme: "dark",
        pauseOnHover: true,
    }
    const validation = () => {
        if(title === ""){
            toast.error("Enter product name",options);
            return false;
        }else if (description === "") {
            toast.error("Enter product description",options);
            return false;
        }else if(price === ""){
            toast.error("Enter product price",options);
            return false;
        }
        return true;
    }
    const createProduct = async(e) => {
        e.preventDefault();
        try {
            if (validation()) {
                const data = {title,description,price}
                const res = await axios.post('/api/products',data);
                console.log(res);
                if (res.data.status === true) {
                    toast.error("Added",options);
                    router.push('/products');
                }
            }
        } catch (e) {
            console.log(e);
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

                <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Product Images</label>
                <div className='p-2 overflow-x-auto overflow-y-hidden'>
                    <button className='w-32 h-32 border flex items-center justify-center rounded-lg bg-[#F2D7D9]'>
                        <PlusCircleIcon className='w-10 h-10' />
                    </button>
                </div>

                <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Price in USD</label>
                <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='price' type='number' />

                <button type='submit' className=' bg-[#635985] rounded-md my-5 text-white p-2 px-4 hover:bg-[#443C68] flex gap-1'>
                    <div>ADD</div> 
                    <div><PlusCircleIcon className='h-5 w-5' /></div>
                </button>
            </form>
        </div>
        <ToastContainer />
    </Layout>
  )
}
