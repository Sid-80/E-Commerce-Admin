import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
        <div className='flex bg-violet-300 h-screen w-screen items-center'>
          <div className='text-center w-full'>
            <button className='p-2 px-4 rounded-md bg-white'>Login with google</button>
          </div>
        </div>
  )
}
