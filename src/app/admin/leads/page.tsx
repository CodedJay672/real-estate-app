import { Suspense } from "react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import UsersManager from "@/components/admin/UsersManager";

const Users = async ({ searchParams }: { searchParams: Promise<{ page: number; pageSize: number }> }) => {
  const { page, pageSize } = await searchParams;

  return <section className="wrapper">
    <div className="w-full">
      <h1 className="text-xl lg:text-2xl text-primary font-bold">Leads management</h1>
      <p className="text-sm lg:text-base font-normal text-dark-50">
        Manage all registered leads and potential clients.
      </p>
    </div>

    <div className="w-full rounded-xl border border-border space-y-3 bg-light-50">
      <div className="w-full p-4 flex justify-between">
        <div>
          <h2 className="text-sm lg:text-lg font-semibold">Leads overview</h2>
          <p className="text-sm md:text-base text-dark-50">Bottom of the funnel engagement records.</p>
        </div>

        <div id="export-btn" />
      </div>

      <Suspense key={JSON.stringify({ page, pageSize })} fallback={<LoadingSpinner />}>
        <UsersManager query={{ page, pageSize }} />
      </Suspense>
    </div>
  </section>;
};

export default Users;
