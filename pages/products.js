import Layout from '@/components/Layout'
import Link from 'next/link'

export default function products() {
  return (
    <Layout>
        <Link className='bg-[#D3CEDF] rounded-md text-black p-2 px-4 hover:bg-[#9CB4CC]' href={'/products/add'}>Add New Product</Link>
    </Layout>
  )
}
