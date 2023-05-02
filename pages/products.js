"use client"
import Layout from '@/components/Layout'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {PencilIcon} from "@heroicons/react/24/outline"

export default function products() {

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get('/api/products').then((res)=>{setProducts(res.data)});
  },[])

  return (
    <Layout>
        <Link className='bg-[#D3CEDF] rounded-md text-black p-2 px-4 hover:bg-[#9CB4CC]' href={'/products/add'}>
          Add New Product
        </Link>
        <div className='flex uppercase bg-[#D3CEDF] mt-5 rounded-md  flex-col p-4 overflow-x-hidden overflow-y-auto '>
          <div className='flex flex-row gap-1 bg-[#443C68] rounded-md text-white py-2 justify-between items-center border-b-4 px-4'>
            <h1>porducts name</h1>
          </div>
          {
            products.map((prod)=>(
              <div className='flex flex-row gap-1 rounded-md my-1 hover:bg-[#9CB4CC] py-2 justify-between items-center border-b-4 px-4' key={prod._id}>
                <h1>{prod.title}</h1>
                <p>{`$${prod.price}`}</p>
                <Link className='flex gap-1 bg-[#443C68] text-white font-bold p-2 rounded-lg' href={`/products/edit/${prod._id}`}>
                  <PencilIcon className='h-7 w-7' />Edit
                </Link>
              </div>
            ))
          }
        </div>
    </Layout>
  )
}
