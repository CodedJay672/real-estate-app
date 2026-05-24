import { getAllUserMassages } from "@/lib/data/messages.data"
import { DataTable } from "../table/DataTable";
import { messageColumns } from "../table/listings/definition";
import PaginationBar from "../shared/paginationBar";

export default async function UsersMessageListing() {
  const messages = await getAllUserMassages();

  return (
    <>
      <DataTable columns={messageColumns} data={messages.data?.data ?? []} />

      <PaginationBar defaultPageSize={messages.data?.pageSize || 25} totalRows={messages.data?.totalRows ?? 1} />
    </>
  )
}
