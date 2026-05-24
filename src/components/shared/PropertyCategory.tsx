import { getCategoryById } from '@/lib/data/category.data'

async function PropertyCategory({ catId }: { catId: string }) {
  //get the category
  const category = await getCategoryById(catId);
  if (!category || category.data?.length === 0) return null;

  return (
    <span className="text-dark-200 px-1.5 text-sm md:text-xs font-medium inline-block rounded-md capitalize ">
      {category.data?.[0].name}
    </span>
  )
}

export default PropertyCategory