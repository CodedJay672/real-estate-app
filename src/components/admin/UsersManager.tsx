import { File } from 'lucide-react';

import { DataTable } from "@/components/table/DataTable";
import { userColumn } from "@/components/table/users/definition";
import { getAllUsers } from "@/lib/data/users.data";
import PaginationBar from '../shared/paginationBar';
import ExportButton from '../shared/ExportButton';

async function UsersManager({ query }: { query: TFilterQuery }) {
  const allUsers = await getAllUsers(query.page, query.pageSize);
  if (!allUsers.success) {
    return (
      <div className='w-full h-[50vh] flex-center flex-col'>
        <File size={64} className='text-light-200' />
        <h3 className="text-base text-center font-semibold">No leads found.</h3>
        <p className='w-full max-w-xl text-sm md:text-base text-light-200 text-center'>Something went wrong. It might be a technical issue we are trying to fix. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <>
      <ExportButton data={allUsers.data?.data || []} label='Export' />
      <DataTable columns={userColumn} data={allUsers?.data?.data ?? []} />
      <PaginationBar defaultPageSize={allUsers.data?.pageSize || 1} totalRows={allUsers.data?.totalRows || 1} />
    </>
  )
}

export default UsersManager