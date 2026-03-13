import { File } from 'lucide-react';

import { getAdminProductsWithCategories } from '@/lib/data/products.data';
import AdminListing from '../container/AdminListing';
import { DataTable } from '../table/DataTable';
import { productColumns } from '../table/listings/definition';
import PaginationBar from '../shared/paginationBar';

async function Propertylistings({ query }: { query: { page?: number; pageSize?: number } }) {

  // get property details
  const properties = await getAdminProductsWithCategories(query.page, query.pageSize);
  if (!properties.success) {
    return (
      <div className="w-full h-[50vh] flex-center flex-col gap-1">
        <File size={64} className='text-light-200' />
        <h3 className="text-base text-center font-semibold">No properties found.</h3>
        <p className='w-full max-w-xl text-sm md:text-base text-light-200 text-center'>Something went wrong. It might be a technical issue we are trying to fix. Please refresh the page.</p>
      </div>
    )
  }


  return (
    <>
      <div className='hidden sm:flex'>
        <DataTable columns={productColumns} data={properties.data?.data ?? []} />
      </div>

      <div className="w-full sm:hidden space-y-8 mt-4 p-1.5">
        {properties.data && properties.data.data?.length > 0 ? (
          properties.data.data.map((product) => (
            <AdminListing
              key={product.id}
              {...product}
            />
          ))
        ) : (
          <p className="text-center text-sm text-gray-300">
            No products found.
          </p>
        )}
      </div>

      <PaginationBar defaultPageSize={query.pageSize ?? 25} totalRows={properties.data?.totalRows ?? 25} />
    </>
  )
}

export default Propertylistings