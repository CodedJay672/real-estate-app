"use client"


import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

import { Loader2, Share2 } from "lucide-react"
import { Button } from "../ui/button"


const ShareButton = ({ callbackFn, productLink, shareCount, loading }: { productLink: string; shareCount: number, callbackFn?: () => void, loading: boolean }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // update share count on successful sharing
  const handleClick = () => {
    // only authenticated users
    if (!session?.user || status !== "authenticated") return router.push(`/sign-in?next=${productLink}`);

    // continue to share
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product!',
        text: 'I found this amazing product and thought you might like it.',
        url: productLink,
      })
        .then(() => {
          console.log('Product shared successfully')
          if (callbackFn) callbackFn();
        })
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported in this browser. Please copy the link: ' + productLink);
    }
  }

  return (
    <Button type="button" variant="ghost" size="sm" className="w-full px-1.5 cursor-pointer rounded-full group" onClick={handleClick}>
      {loading ? <Loader2 className="text-blue-700 animate-spin" /> : <>
        <Share2 className="text-blue-700" />
        {shareCount > 0 && shareCount}
      </>}
    </Button>
  )
}

export default ShareButton