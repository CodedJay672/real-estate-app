import CategoryDetails from "@/components/admin/CategoryDetails";
import Back from "@/components/shared/Back";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Suspense } from "react";

async function CategoryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // ensure the id is in the url
  const { id } = await params;
  if (!id) throw new Error('Something went wrong. Please check the url link and refresh the page.')


  return (
    <section className="wrapper">
      <div className="w-full flex gap-2">
        <Back />
        <div>
          <h1 className="text-lg md:text-xl text-dark-200 font-bold">Manage category</h1>
          <p className="text-sm md:text-base text-dark-50">Manage all category details here.</p>
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <CategoryDetails catId={id} />
      </Suspense>
    </section>
  )
}

export default CategoryDetailsPage