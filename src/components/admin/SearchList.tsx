"use client"

import config from '@/lib/config';
import { Image } from '@imagekit/next';
import { Search } from 'lucide-react';
import React, { use } from 'react'

interface SearchListProps {
  getSearchList: Promise<ApiResponse<{ products: listings | null, searches: TTopSearchResponse }[]>>
}

export default function SearchList({ getSearchList }: SearchListProps) {
  const list = use(getSearchList);
  if (!list.success || list.data?.length === 0) {
    return (
      <div className='w-full h-32 flex-center'>
        <p className='text-sm md:text-base text-light-200'>No Data</p>
      </div>
    )
  }


  return (
    <ul className='w-full p-2 list-none space-y-1'>
      {list.data?.map(d => (
        <li key={d.searches.id} className='py-1 text-sm flex items-center gap-3'>
          {d.products?.imageUrl ? <Image urlEndpoint={config.env.imagekit.urlEndpoint} src={d.products.imageUrl} width={33} height={32} alt='product image' /> : <div className='size-8 rounded-lg bg-light-100' />}
          <div className='flex-1 overflow-hidden'>
            <p className='text-sm text-dark-100 font-semibold truncate'>{d.products?.name}</p>
            <p className='text-xs text-light-200 font-light truncate'>{d.products?.description}</p>
          </div>

          <div className='flex items-center gap-0.5'>
            <Search size={14} className='text-light-200' />
            <small className='text-xs text-dark-100 font-semibold'>{d.searches.searchCount}</small>
          </div>
        </li>
      ))}
    </ul>
  )
}
