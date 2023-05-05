import Layout from '@/components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function categories() {
    const [editedCategory,setEditedCategory] = useState(null);
    const [name ,setName] = useState('');
    const [categories,setCategories] = useState([]);
    const [parentCategory, setSelectedParent] = useState("");
    const [deleteSection,setDeleteSection] = useState(false);
    const [itemToBeDeleted,setItemDeleted] = useState(null);
    const saveCategory = async(e) => {
        e.preventDefault();
        var res;
        if(editCategory){
            res = await axios.put('/api/categories',{name,parentCategory,_id:editedCategory._id});
            setEditedCategory(null);
        }else{
            res = await axios.post('/api/categories',{name,parentCategory});
        }
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
    const editCategory = (cat) => {
        setEditedCategory(cat);
        setName(cat.name);
        if(cat.parent !== undefined)
            setSelectedParent(cat.parent?._id);
        else
            setSelectedParent(0);
    }
    const changeClass = () => {
        var delBox = document.getElementById('deleteBox');

        setDeleteSection(!deleteSection);
        if (deleteSection) {
            document.getElementById('delTitle').innerHTML = `Do you want to delete ${itemToBeDeleted.name} ?`;
            document.getElementById('backDel').classList.add('showBack')
            delBox.classList.add('displayBox');
        }else{
            delBox.classList.remove('displayBox');
            document.getElementById('backDel').classList.remove('showBack')
        }
    }
    const deleteCategory = (cat) => {
        setItemDeleted(cat);
        changeClass();
    }
    const deleteCategoryYes = async() => {
        const res = await axios.delete(`/api/categories?id=${itemToBeDeleted?._id}`);
        if(res.data.status){
            toast.error(`${itemToBeDeleted?.name} deleted`,options);
        }
        changeClass();
        fetchCategories();
        setItemDeleted(null);
    }
    useEffect(()=>{
        fetchCategories();
        setDeleteSection(false);
    },[])
  return (
    <Layout>
         <div className='flex relative z-0 flex-col h-[100%] w-[100%] overflow-hidden justify-start items-start'>
            <div className='flex flex-col w-[50%]'>
            <h1 className='font-bold tracking-[5px] animate-pulse my-8'>{editedCategory ? `EDIT CATEGORY ${editCategory.name}` : `NEW CATEGORY`}</h1>
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
                                    <button onClick={()=>editCategory(cat)}>
                                        <PencilSquareIcon className='h-8 w-8 hover:text-green-300' />
                                    </button>
                                    <button onClick={()=>deleteCategory(cat)}>
                                        <TrashIcon className='h-8 w-8 hover:text-red-600' />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div id='backDel' className=' absolute opacity-0 w-full hidden h-full backdrop-filter backdrop-blur-xl '>
                <div
                id='deleteBox'
                className={`-z-10 absolute flex flex-col items-center justify-center rounded-lg shadow-2xl left-[40%] w-[400px] h-[150px] bg-white top-[45%]`}
                >
                    <h1 id='delTitle' className='font-bold text-xl'></h1>
                    <div className='flex gap-2 py-2'>
                        <button onClick={()=>deleteCategoryYes()} className='p-1 hover:ring px-3 bg-[#F2D7D9] text-lg rounded-md text-black'>YES</button>
                        <button onClick={changeClass} className='p-1 px-3 hover:ring bg-[#F2D7D9] text-lg rounded-md text-black'>NO</button>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
    </Layout>
  )
}