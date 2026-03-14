"use client";

import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Suspense, useState } from "react";
import CustomDialog from "../shared/CustomDialog";
import GroupFilter from "../container/GroupFilter";
import LoadingSpinner from "../shared/LoadingSpinner";


export default function AdminFilterButton({ getCategories }: { getCategories: Promise<ApiResponse<categoryResponse[]>> }) {
  const [showFilters, setShowFilters] = useState(false)


  return (
    <>
      <Button type="button" variant="outline" onClick={() => setShowFilters(true)}>
        <Filter size={16} />
        <span className="hidden md:flex">Filter</span>
      </Button>

      <CustomDialog open={showFilters} onOpenChange={setShowFilters} title="Property filters" description="Filter down to specific properties.">
        <Suspense fallback={<LoadingSpinner />}>
          <GroupFilter getCategories={getCategories} callbackFn={() => setShowFilters(false)} />
        </Suspense>
      </CustomDialog>
    </>
  )
}
