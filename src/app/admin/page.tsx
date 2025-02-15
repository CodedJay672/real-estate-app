import StatsCard from "@/components/shared/StatsCard";
import { db } from "@/db/drizzle";
import { productsTable, usersTable } from "@/db/schema";
import React from "react";

const AdminPage = async () => {
  const users = await db.select().from(usersTable);
  const listings = await db.select().from(productsTable);

  if (!users || !listings) {
    return (
      <div className="flex-1 p-6 bg-subtle-light flex flex-col gap-4">
        Loading...
      </div>
    );
  }

  return (
    <section className="flex-1 p-6 bg-subtle-light flex flex-col gap-4">
      <div className="w-full flex lg:max-w-screen-md justify-between items-center gap-2">
        <StatsCard title="Total Users" value={users.length} />
        <StatsCard title="Total Listings" value={listings.length} />
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl border p-4 shadow-xl">
        <h2 className="text-lg font-light">Listings</h2>
      </div>
      <div className="w-full lg:max-w-screen-md rounded-xl border p-4 shadow-xl">
        <h2 className="text-lg font-light">Users</h2>
      </div>
    </section>
  );
};

export default AdminPage;
