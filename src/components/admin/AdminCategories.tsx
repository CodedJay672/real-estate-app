import { getAllAdminCategories } from "@/lib/data/category.data"
import { File } from "lucide-react";
import { DataTable } from "../table/DataTable";
import { categoryColumns } from "../table/listings/definition";

async function AdminCategories({ query }: { query: string }) {
  const categories = await getAllAdminCategories(query);
  if (!categories || !categories.data?.length) return (
    <div className="w-full h-[50vh] flex-center flex-col p-3">

      <File size={64} className="text-light-200 mx-auto" />
      <h3 className="text-base text-center font-semibold">No categories found.</h3>
      <p className="w-full max-w-xl text-sm md:text-base text-center text-light-200">Please make sure you have created at least one category or check you internet connection and refresh the page.</p>

    </div>
  )


  return (
    <section className="size-full">
      <DataTable columns={categoryColumns} data={categories.data} />
    </section>
  )
}

export default AdminCategories