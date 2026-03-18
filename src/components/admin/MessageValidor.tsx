import { getMessageById } from '@/lib/data/messages.data'
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function MessageValidor({ id }: { id: string }) {
  const details = await getMessageById(id);
  if (!details.success) {
    return (
      <div className='w-full h-screen flex-center fixed inset-0 bg-dark-200/20 backdrop-blur-md z-10'>
        <div className='w-5/6 max-w-sm p-6 flex-center flex-col bg-light-50 rounded-xl space-y-4'>
          <AlertCircle size={44} color='red' />
          <p className='text-sm md:text-base text-dark-50 p-3 font-semibold'>{details.message}</p>
          <Link href="/admin/messages" className='text-sm md:text-base text-blue-500 bg-blue-50 py-2 px-4 rounded-lg'>See all messages</Link>
        </div>
      </div>
    )

  }

  return null;
}
