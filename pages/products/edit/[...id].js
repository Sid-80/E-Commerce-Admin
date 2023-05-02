import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function editProduct() {
    const router = useRouter();
    const {id}= router.query;
    useEffect(()=>{
      if(!id) return;
      axios.get(`/api/products?id=${id}`).then((res)=>console.log(res.data));
    },[id])
  return (
    <Layout>
        edit
    </Layout>
  )
}
