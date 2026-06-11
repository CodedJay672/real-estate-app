import AdminCreateUserForm from "@/components/admin/AdminCreateUserForm";
import BrevoSettingsForm from "@/components/admin/BrevoSettingsForm";
import { DataTable } from "@/components/table/DataTable";
import { userColumn } from "@/components/table/users/definition";
import { getAllAdmins } from "@/lib/data/users.data";

export default async function Settings() {
  const adminsResponse = await getAllAdmins(1, 25);
  const adminUsers = adminsResponse.success ? adminsResponse.data?.data ?? [] : [];

  return (
    <section className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[.2em] text-primary/80">Admin Settings</p>
          <h1 className="text-3xl font-semibold text-primary">Manage admin accounts & SMTP</h1>
        </div>
        <p className="max-w-2xl text-sm text-gray-600">
          Create new admin accounts and monitor your automated email follow-up connection from one secure place.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-[24rem] space-y-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary">Create new account</h2>
              <p className="text-sm text-gray-600">
                Use the form below to add a new admin or user.
              </p>
            </div>
            <AdminCreateUserForm />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-primary">Brevo SMTP Settings</h2>
              <p className="text-sm text-gray-600">
                Monitor and verify your automated lead follow-up emails.
              </p>
            </div>
            <BrevoSettingsForm />
          </div>
        </div>

        <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm h-max">
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
