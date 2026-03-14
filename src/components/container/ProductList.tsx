import { File } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { getAllProducts } from '@/lib/data/products.data';
import PaginationBar from '../shared/paginationBar';

async function ProductList({ query, defaultPageSize }: { query: TFilterQuery, defaultPageSize: number }) {
  const allProducts = await getAllProducts(query);
  if (!allProducts.data || allProducts.data.data.length === 0) return (
    <div className="min-h-64 flex-center flex-col">
      <File size={62} className='text-light-100' />
      <h3>Oops!! Failed to get products</h3>
      <p className="text-sm md:text-base text-center font-medium text-light-100 w-full max-w-sm p-3">
        {query ? `Sorry we could not find any result for your search. Try another search term or refresh the page.` : 'Please check your connection and refresh the page again.'}
      </p>
    </div>
  )


  return (
    <div className='w-full space-y-24'>
      <div className="property-grid">
        {allProducts.data.data?.map((product) => (
          <PropertyCard
            key={product.id}
            {...product}
          />
        ))
        }
      </div>
      <PaginationBar defaultPageSize={defaultPageSize} totalRows={allProducts.data.totalRows} />
    </div>
  )
}

export default ProductList