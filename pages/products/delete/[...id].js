import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function deleteProduct() {
    const router = useRouter();
    const [prodInfo,setProdInfo] = useState(null);
    const {id} = router.query;
    useEffect(()=>{
        if (!id)    return;
        axios.get(`/api/products?id=${id}`).then((res)=>setProdInfo(res.data))
    },[id])
    const goBack = () => {
        router.push('/products');
    }
    const deleteProduct = async() => {
        const res = await axios.delete(`/api/products?id=${id}`);
        goBack();
    }   
  return (
    <Layout>
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <h1 className=' text-2xl'>Do you really want to delete <span className='font-bold'>{prodInfo?.title}</span> ?</h1>
            <div className='flex gap-5 p-4'>
                <button onClick={deleteProduct} className='p-1 px-3 bg-[#F2D7D9] text-lg rounded-md'>Yes</button>
                <button onClick={goBack} className='p-1 px-3 bg-[#F2D7D9] text-lg rounded-md'>No</button>
            </div>
        </div>
    </Layout>
  )
}
