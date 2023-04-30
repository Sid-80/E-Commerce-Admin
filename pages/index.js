import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Home() {
  const {data:session} = useSession();
  return (
    <Layout>
        <div className='text-[#18122B] flex justify-between'>
          <h1>Hello, <b>{session?.user?.name}</b></h1>
            <div className='flex gap-1 bg-[#D3CEDF] text-black rounded-2xl'>
            <img src={session?.user?.image} alt='' className='h-8 w-8 rounded-full' />
            <span className='py-1 px-2'>
              {session?.user?.name}
            </span>
          </div>
        </div>
    </Layout>
  )
}
