import { getTopSearches } from '@/lib/data/search.data'
import { Suspense } from 'react'
import LoadingSpinner from '../shared/LoadingSpinner';
import SearchList from './SearchList';

export default function TopSearches() {
  const searchList = getTopSearches(5);


  return (
    <div>
      <h3 className='text-base md:text-lg text-dark-200 font-semibold'>Top Searches</h3>
      <p className='text-sm md:text-base text-dark-50'>Recent most searched products</p>

      <Suspense fallback={<LoadingSpinner />}>
        <SearchList getSearchList={searchList} />
      </Suspense>
    </div>
  )
}
