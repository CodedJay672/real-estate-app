import { Landmark, Megaphone, User } from "lucide-react";
import { redirect } from "next/navigation";

import Campaigns from "@/components/admin/Campaigns";
import TopSearches from "@/components/admin/TopSearches";
import StatsCard from "@/components/shared/StatsCard";
import { auth } from "@/lib/auth";
import { getAllProducts } from "@/lib/data/products.data";
import { getAllUsers } from "@/lib/data/users.data";

const AdminPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/admin-login");

  const users = await getAllUsers();
  const allProducts = await getAllProducts();


  return (
    <section className="wrapper">
      <div className="w-full lg:max-w-(--breakpoint-md) mb-4">
        <h1 className="text-xl lg:text-2xl font-semibold text-primary">
          Welcome, {session.user.name?.split(" ")[0] ?? session.user.email}
        </h1>
        <p className="text-sm lg:text-base font-normal text-dark-50">
          Here's a quick overview of your activities
        </p>
      </div>

      <div className="w-full flex-between gap-3 md:gap-6">
        <StatsCard title="Users" value={users?.data?.length!} icon={<div className="w-max p-1.5 bg-blue-50 rounded-full" >
          <User className="size-4 text-blue-500 fill-blue-500" />
        </div>
        } />
        <StatsCard title="Listings" value={allProducts?.data?.data.length!} icon={<div className="size-max p-1.5 bg-orange-50 rounded-full">
          <Landmark className="size-4 text-orange-400" />
        </div>
        } />
        <StatsCard title="Campaigns" value={0} icon={<div className="size-max p-1.5 bg-red-50 rounded-full">
          <Megaphone className="size-4 text-red-500" />
        </div>
        } />
      </div>

      <div className="w-full flex justify-between flex-col md:flex-row gap-4 md:gap-6">
        <Campaigns />
        <TopSearches />
      </div>
    </section>
  );
};

export default AdminPage;
