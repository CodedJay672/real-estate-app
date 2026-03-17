import { Suspense } from 'react'

import { getAdminTopSearches } from '@/lib/data/search.data'
import LoadingSpinner from '../shared/LoadingSpinner';
import SearchList from './SearchList';

export default function TopSearches() {
  const searchList = getAdminTopSearches(5);


  return (
    <div className='w-full md:w-76 p-3 bg-light-50 border border-border space-y-3 rounded-lg'>
      <div>
        <h3 className='text-base md:text-lg text-dark-200 font-semibold'>Top Searches</h3>
        <p className='text-sm md:text-base text-dark-50'>Recent most searched products</p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <SearchList getSearchList={searchList} />
      </Suspense>
    </div>
  )
}
