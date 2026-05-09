import AdminCreateUserForm from "@/components/admin/AdminCreateUserForm";
import { DataTable } from "@/components/table/DataTable";
import { userColumn } from "@/components/table/users/definition";
import { getAllAdmins } from "@/lib/data/users.data";

export default async function Settings() {
  const adminsResponse = await getAllAdmins(1, 25);
  const adminUsers = adminsResponse.success ? adminsResponse.data?.data ?? [] : [];

  return (
    <section className="container mx-auto p-4 md:p-6">
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[.2em] text-primary/80">Admin Settings</p>
          <h1 className="text-3xl font-semibold text-primary">Manage admin accounts</h1>
        </div>
        <p className="max-w-2xl text-sm text-gray-600">
          Create new admin or staff accounts from one secure place. Only current admins can assign the admin role.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-max rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary">Create new account</h2>
            <p className="text-sm text-gray-600">
              Use the form below to add a new admin or user.
            </p>
          </div>
          <AdminCreateUserForm />
        </div>

        <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-primary">Current admins</h2>
            <p className="text-sm text-gray-600">
              Review active admin accounts for your platform.
            </p>
          </div>
          {adminUsers.length > 0 ? (
            <DataTable columns={userColumn} data={adminUsers} />
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
              No admin accounts were found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
