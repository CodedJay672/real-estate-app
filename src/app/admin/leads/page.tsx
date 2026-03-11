import { Suspense } from "react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import UsersManager from "@/components/admin/UsersManager";

const Users = async ({ searchParams }: { searchParams: Promise<{ query: string }> }) => {
  const { query } = await searchParams;

  return <section className="wrapper">
    <div className="w-full">
      <h1 className="text-xl lg:text-2xl text-primary font-bold">User management</h1>
      <p className="text-sm lg:text-base font-normal text-dark-50">
        Manage all registered users.
      </p>
    </div>

    <div className="w-full rounded-xl border border-border">
      <div className="w-full p-4 flex justify-between items-center">
        <div>
          <h2 className="text-sm lg:text-lg font-semibold">Users overview</h2>
          <p className="text-sm md:text-base text-dark-50">Admins can monitor lead generation and manage users from here.</p>
        </div>
      </div>

      <Suspense key={query} fallback={<LoadingSpinner />}>
        <UsersManager query={query} />
      </Suspense>
    </div>

  </section>;
};

export default Users;
