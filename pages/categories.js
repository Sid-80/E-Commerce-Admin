import Layout from '@/components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function categories() {
    const [edit,setEdit] = useState(false);
    const [editedCategory,setEditedCategory] = useState(null);
    const [name ,setName] = useState('');
    const [categories,setCategories] = useState([]);
    const [parentCategory, setSelectedParent] = useState("");
    const [deleteSection,setDeleteSection] = useState(false);
    const [itemToBeDeleted,setItemDeleted] = useState(null);
    const [properties,setProperties] = useState([]);
    const saveCategory = async(e) => {
        e.preventDefault();
        var res;
        if(!edit){
            res = await axios.post('/api/categories',{
                name,
                parentCategory,
                properties:properties.map(p => ({
                    name:p.name,
                    values:p.values.split(',')
                }))
            });
        }else{
            res = await axios.put('/api/categories',{
                name,
                parentCategory,
                properties:properties.map(p => ({
                    name:p.name,
                    values:p.values.split(',')
                })),
                _id:editedCategory?._id
            });
            setEditedCategory(null);
        }
        setName('');
        setSelectedParent('');
        setProperties([]);
        if(res.data.status){
            fetchCategories();
            if(edit){
                setEdit(false);
                toast.error(`Updated`,options);
            }else{
                toast.error(`${res.data.categoryDoc.name} Added`,options);
            }
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
        setEdit(true);
        setEditedCategory(cat);
        setName(cat.name);
        setProperties(
            cat.properties.map(({name,values})=>(
                {
                    name,
                    values:values.join(',')
                }
            ))
        );
        if(cat.parent !== undefined)
            setSelectedParent(cat.parent?._id);
        else
            setSelectedParent('');
        
    }
    const changeClass = () => {
        var delBox = document.getElementById('deleteBox');

        setDeleteSection(!deleteSection);
        if (deleteSection) {
            document.getElementById('delTitle').innerHTML = `Do you want to delete ${itemToBeDeleted?.name} ?`;
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
    const addProperty = () => {
        setProperties(prev => {
            return [...prev,{name:'',values:''}];
        })
    }
    const handlePropertyNameChange = (index,property,newName) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
    }
    const handlePropertyValueChange = (index,property,newValue) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValue;
            return properties;
        })
    }
    const removeProperty = (index) => {
        setProperties(prev => {
            return [...prev].filter((p,pIndex)=>{
                return pIndex !== index;
            });
        })
    }
    useEffect(()=>{
        fetchCategories();
        setDeleteSection(false);
    },[])
  return (
    <Layout>
         <div className='flex relative z-0 flex-col h-[100%] w-[100%] overflow-hidden justify-start items-start'>
            <div className='flex flex-col'>
            <h1 className='font-bold tracking-[5px] animate-pulse my-8'>{edit ? `EDIT CATEGORY` : `NEW CATEGORY`}</h1>
            <form className='p-5 flex flex-col  gap-1' onSubmit={(e)=>saveCategory(e)}>
                <div className='flex gap-5'>
                    <div>
                        <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Category Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='category name' />
                    </div>
                    
                    <div>
                        <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Select Category</label>
                        <select value={parentCategory} onChange={e => setSelectedParent(e.target.value)}>
                            <option value={0}>No Parent category</option>
                            {
                                categories.length > 0 && categories.map((cat)=>(
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    </div>
                    <div className='flex flex-col w-[100%] items-center text-start  justify-center'>
                        <label className='mt-2 uppercase underline underline-offset-2 text-lg font-bold'>Properties</label>
                        <button onClick={addProperty} type='button' className='p-2 bg-[#D3CEDF] my-2 hover:bg-[#9CB4CC] rounded-lg w-[50%]'>ADD NEW PROPERTY</button>
                        {
                            properties.length > 0 && properties.map((property,index)=>(
                                <div className='flex gap-1 w-full'>
                                    <input type='text' onChange={(e)=>handlePropertyNameChange(index,property,e.target.value)} value={property.name} placeholder='Property name (ex.Color)' />
                                    <input type='text' onChange={(e)=>handlePropertyValueChange(index,property,e.target.value)} value={property.values} placeholder='values, comma separated' />
                                    <button type='button' onClick={()=>removeProperty(index)} className='p-2 px-4 bg-[#D3CEDF] my-2 hover:bg-[#9CB4CC] rounded-lg'>Remove</button>
                                </div>
                            ))
                        }
                    </div>
                
                <div>
                    <button type='submit' className='bg-[#CBE4DE] mr-2 hover:bg-[#03C988] px-7 p-2 mt-5 hover:ring-4 rounded-lg'>SAVE</button>
                    {
                        edit && (
                            <button onClick={()=>{
                                setEditedCategory(null);
                                setEdit(false);
                                setName('');
                                setSelectedParent('');
                                setProperties([]);
                            }
                            } type='button' className='bg-[#FD8A8A] hover:bg-[#E97777] px-7 p-2 mt-5 hover:ring-4 rounded-lg'>CANCEL</button>
                        )
                    }
                </div>
            </form>
            </div>
            {
                !edit && (
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
                )
            }
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