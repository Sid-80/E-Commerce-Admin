import React from 'react';
import {ShoppingBagIcon} from "@heroicons/react/24/solid"
import {HomeIcon,Cog6ToothIcon,ClipboardDocumentListIcon, ArchiveBoxIcon, ListBulletIcon,ArrowRightOnRectangleIcon} from "@heroicons/react/24/outline";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function Navbar() {
    const inactiveLink = 'flex gap-2 p-2';
    const activeLink = 'flex gap-2 bg-[#635985] p-2 rounded-l-lg';
    const router = useRouter();
    const {pathname} = router;
  return (
    <aside className='text-white p-4 pr-0'>
        <Link href={'/'} className='flex gap-1 mb-8'>
            <ShoppingBagIcon className='h-8 w-8' />
            <span className='text-2xl'>Shopify</span>
        </Link>
        <nav className='flex flex-col gap-2'>
            <Link href={'/'} className={pathname==='/' ? activeLink : inactiveLink}>
                <HomeIcon className='h-6 w-6' />
                DASHBOARD
            </Link>
            <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
                <ClipboardDocumentListIcon className='h-6 w-6' />
                ORDERS
            </Link>
            <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
                <ArchiveBoxIcon className='h-6 w-6' />
                PRODUCTS
            </Link>
            <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
                <ListBulletIcon className='h-6 w-6' />
                CATEGORIES
            </Link>
            <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
                <Cog6ToothIcon className='h-6 w-6' />
                SETTINGS
            </Link>
            <button onClick={signOut} className={`${inactiveLink} mt-10`}>
                <ArrowRightOnRectangleIcon className='h-6 w-6' />
                Logout
            </button>
        </nav>
    </aside>
  )
}
