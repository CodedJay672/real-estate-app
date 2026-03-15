"use client"

import React, { use } from 'react'

interface SearchListProps {
  getSearchList: Promise<ApiResponse<TTopSearchResponse[]>>
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
    <div>
      {list.data?.map(d => (
        <li key={d.id}>
          {d.productId?.split("-")[0]}: {d.searchCount}
        </li>
      ))}
    </div>
  )
}
