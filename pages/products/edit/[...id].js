import Layout from '@/components/Layout'
import React, { useEffect,useState } from 'react'
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function editProduct() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const router = useRouter();
    const {id}= router.query;
    
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
                const data = {id,title,description,price}
                const res = await axios.put(`/api/products`,data);
                if (res.data.status === true) {
                  router.push('/products');
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(()=>{
      if(!id) return;
      axios.get(`/api/products?id=${id}`).then((res)=>{
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price);
      });
      
    },[id])
  return (
    <Layout>
    <div className='flex flex-col justify-start items-start'>
        <form className='w-full p-5' onSubmit={(e)=>{createProduct(e)}}>
            <h1 className='font-bold tracking-[5px] animate-pulse my-8'>EDIT PRODUCT</h1>
            <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Product Name</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type='text' placeholder='product name' />
            <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Product Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='description'></textarea>
            <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Price in USD</label>
            <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='price' type='number' />
            <button type='submit' className=' bg-[#635985] rounded-md my-5 text-white p-2 px-4 hover:bg-[#443C68] flex gap-1'>
                <div>UPDATE</div> 
                <div><PlusCircleIcon className='h-6 w-6' /></div>
            </button>
        </form>
    </div>
    <ToastContainer />
</Layout>
  )
}
