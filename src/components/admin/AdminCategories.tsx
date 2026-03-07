import { getAllAdminCategories } from "@/lib/data/category.data"
import { File } from "lucide-react";
import { DataTable } from "../table/DataTable";
import { categoryColumns } from "../table/listings/definition";

async function AdminCategories() {
  const categories = await getAllAdminCategories();
  if (!categories || !categories.data?.length) return (
    <div className="size-full flex-center p-3">
      <div className="space-y-3">
        <File size={32} className="text-light-100 mx-auto" />
        <h3 className="text-base text-center font-semibold">No categories found.</h3>
        <p className="text-sm md:text-base text-center text-light-100">Please make sure you have created at least one category or check you internet connection and refresh the page.</p>
      </div>
    </div>
  )


  return (
    <section className="size-full">
      <DataTable columns={categoryColumns} data={categories.data} />
    </section>
  )
}

export default AdminCategories