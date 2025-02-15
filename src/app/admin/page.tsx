import StatsCard from "@/components/shared/StatsCard";
import React from "react";

const AdminPage = () => {
  return (
    <section className="flex-1 p-6 bg-subtle-light flex flex-col gap-4">
      <div className="w-full flex lg:max-w-screen-md justify-between items-center gap-2">
        <StatsCard title="Total Users" value="200" />
        <StatsCard title="Total Listings" value="200" />
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
