import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session){
    return(
      <div className='flex bg-violet-300 h-screen w-screen items-center'>
        <div className='text-center w-full'>
          <button onClick={()=>signIn('google')} className='p-2 px-4 rounded-md bg-white'>Login with google</button>
        </div>
      </div>
    )
  }

  return (
      <div className='bg-[#443C68] min-h-screen flex'>
        <Navbar />
        <div className='bg-white flex-grow mt-2 mr-2 rounded-lg mb-2 p-4'>
          {children}
        </div>
    </div>
  )
}
