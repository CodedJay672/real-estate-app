import { getLikedProducts } from '@/lib/actions/auth';
import { File } from 'lucide-react';
import PropertyCard from './PropertyCard';

async function ProductList({ query }: { query: string }) {
  const allProducts = await getLikedProducts(query);

  return (
    <div className="property-grid">
      {allProducts.data?.length && allProducts.data?.length > 0 ? (
        allProducts.data?.map((product) => (
          <PropertyCard
            key={product.id}
            {...product}
          />
        ))
      ) : (
        <div className="col-span-full min-h-64 flex-center flex-col">
          <File size={62} className='text-light-100' />
          <h3>Oops!! Failed to get products</h3>
          <p className="text-sm md:text-base text-center font-medium text-light-100 w-full max-w-sm p-3">
            {query ? `We have nothing related to ${query}. Try another search term or refresh the page.` : 'Please check your connection and refresh the page again.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductList