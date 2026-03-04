import { File } from 'lucide-react';

import { getAllProducts } from '@/lib/data/products.data';
import AdminListing from '../container/AdminListing';
import { DataTable } from '../table/DataTable';
import { productColumns } from '../table/listings/definition';

async function Propertylistings({ query }: { query: string }) {
  const properties = await getAllProducts(query);
  if (!properties.success) {
    return (
      <div className="w-full h-screen flex-center">
        <div>
          <File size={20} className='text-light-100' />
          <p className='text-sm md:text-base text-light-100'>Something went wrong. Please refresh again.</p>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className='hidden sm:flex'>
        <DataTable columns={productColumns} data={properties.data ?? []} />
      </div>

      <div className="w-full sm:hidden space-y-8 mt-4">
        {properties.data && properties.data?.length > 0 ? (
          properties.data.map((product) => (
            <AdminListing
              key={product.id}
              name={product.name}
              title={product.title}
              location={product.location}
              price={product.price}
              imageUrl={product.imageUrl ?? ""}
              id={product.id}
              updatedAt={product.updatedAt}
            />
          ))
        ) : (
          <p className="text-center text-sm text-gray-300">
            No products found.
          </p>
        )}
      </div>
    </>
  )
}

export default Propertylistings