import { File } from 'lucide-react';

import { DataTable } from "@/components/table/DataTable";
import { userColumn } from "@/components/table/users/definition";
import { getAllUsers } from "@/lib/data/users.data";

async function UsersManager({ query }: { query: string }) {
  const allUsers = await getAllUsers();
  if (!allUsers.success) {
    return (
      <div className='w-full h-screen flex-center'>
        <div>
          <File size={24} className='text-light-200' />
          <p className='text-sm md:text-base text-light-100'>Something went wrong. Please refresh the page.</p>
        </div>
      </div>
    )
  }

  return (
    <DataTable columns={userColumn} data={allUsers?.data!} />
  )
}

export default UsersManager