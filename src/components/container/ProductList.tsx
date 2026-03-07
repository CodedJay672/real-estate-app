import { File } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { getAllProducts } from '@/lib/data/products.data';
import PaginationButtons from '../shared/PaginationButtons';

async function ProductList({ query }: { query: TFilterQuery }) {
  const allProducts = await getAllProducts(query);

  const hasNext = allProducts.data ? allProducts.data.length > 20 : false;

  const nextCursor = hasNext ? allProducts.data?.[allProducts.data?.length - 1] : undefined;

  return (
    <>
      {allProducts.data?.length && allProducts.data?.length > 0 ? (
        <div className='w-full space-y-24'>
          <div className="property-grid">
            {allProducts.data?.map((product) => (
              <PropertyCard
                key={product.id}
                {...product}
              />
            ))
            }
          </div>
          <PaginationButtons pagination={{ id: nextCursor?.id || "", name: nextCursor?.name || "" }} hasNext={hasNext} />
        </div>
      ) : (
        <div className="min-h-64 flex-center flex-col">
          <File size={62} className='text-light-100' />
          <h3>Oops!! Failed to get products</h3>
          <p className="text-sm md:text-base text-center font-medium text-light-100 w-full max-w-sm p-3">
            {query ? `Sorry we could not find any result for your search. Try another search term or refresh the page.` : 'Please check your connection and refresh the page again.'}
          </p>
        </div>
      )}
    </>
  )
}

export default ProductList