import { Suspense } from "react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import UsersMessageListing from "@/components/admin/UsersMessageListing";
import MessageValidor from "@/components/admin/MessageValidor";

export default async function AdminMessagesPage({ searchParams }: { searchParams: Promise<{ messageId: string }> }) {
  const { messageId } = await searchParams;

  return (
    <section className="wrapper">
      <div>
        <h1 className="text-xl md:text-2xl text-primary font-bold">Messages</h1>
        <p className="text-sm md:text-base font-normal text-dark-50">View all user enquiries and feedback.</p>
      </div>

      <section className="w-full bg-light-50 border border-border rounded-xl space-y-3">
        <div className="p-3">
          <h3 className="text-base md:text-lg text-dark-200 font-semibold">User enquries</h3>
          <p className="text-sm md:text-base text-dark-50">Manage user enquiries and messsages</p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          {messageId && (
            <MessageValidor id={messageId} />
          )}
          <UsersMessageListing />
        </Suspense>
      </section>
    </section>
  )
}
