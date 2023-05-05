import Layout from '@/components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function categories() {
    const [name ,setName] = useState('');
    const [categories,setCategories] = useState([]);
    const [parentCategory, setSelectedParent] = useState("");
    console.log(parentCategory);
    const saveCategory = async(e) => {
        e.preventDefault();
        
        const res = await axios.post('/api/categories',{name,parentCategory});
        setName('');
        console.log(res.data)
        if(res.data.status){
            fetchCategories();
            toast.error(`${res.data.categoryDoc.name} Added`,options);
        }
    }
    const options = {
        position: "bottom-right",
        autoClose: 8000,
        theme: "dark",
        pauseOnHover: true,
    }
    const fetchCategories = () => {
        axios.get('/api/categories').then((res)=>setCategories(res.data));
    }
    useEffect(()=>{
        fetchCategories();
    },[])
  return (
    <Layout>
         <div className='flex flex-col h-[100%] w-[100%] overflow-hidden justify-start items-start'>
            <div className='flex flex-col w-[50%]'>
            <h1 className='font-bold tracking-[5px] animate-pulse my-8'>CATEGORIES</h1>
            <form className='w-full p-5 flex gap-1' onSubmit={(e)=>saveCategory(e)}>
                
                <div>
                    <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Category Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='category name' />
                </div>
                
                <select className='pb-0' value={parentCategory} onChange={e => setSelectedParent(e.target.value)}>
                    <option value={0}>No Parent category</option>
                    {
                        categories.length > 0 && categories.map((cat)=>(
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))
                    }
                </select>

                <button type='submit' className='bg-[#F2D7D9] px-7 h-[60%] mt-5 rounded-lg'>SAVE</button>
            </form>
            </div>
            <div className='flex flex-col flex-1 items-center justify-center p-2 w-full rounded-md overflow-y-auto overflow-x-hidden bg-[#748DA6]'>
                <h1 className='text-center text-white font-bold text-2xl tracking-[5px] p-2'>CATEGORIES</h1>
                <div className='bg-[#D3CEDF] h-full w-full flex-1 items-center flex p-2 flex-col'>
                    {
                        categories.map((cat)=>(
                            <div className='flex flex-row items-center w-full justify-between font-bold m-2 p-2 text-white text-xl bg-[#748DA6]'>
                                <div className='flex flex-row items-center' key={cat._id}>
                                    {
                                        cat.parent !== undefined ?
                                        (
                                            <>
                                                <h1>{`${cat.parent.name} : ${cat.name} `}</h1>
                                            </>
                                        ) : (
                                            <>
                                                <h1>{cat.name}</h1>
                                            </>
                                        )
                                    }
                                </div>
                                <div className='flex gap-4 px-4'>
                                    <Link href={'/'}>
                                        <PencilSquareIcon className='h-8 w-8 hover:text-green-300' />
                                    </Link>
                                    <Link href={'/'}>
                                        <TrashIcon className='h-8 w-8 hover:text-red-600' />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <ToastContainer />
    </Layout>
  )
}
