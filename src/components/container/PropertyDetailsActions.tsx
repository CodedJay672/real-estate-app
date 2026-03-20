"use client";

import { useTransition } from 'react';


import { toast } from '@/hooks/use-toast';
import { shareProperty } from '@/lib/actions/share.actions';
import { generateErrorMessage } from '@/lib/utils';
import Likes from '../shared/Likes';
import ShareButton from '../shared/ShareButton';
import config from '@/lib/config';

interface PropertyDetailsActionsProps {
  productId: string;
  productLikes: TLikesResponse[];
  productShareCount: number;
  productShareLink: string;
}

export default function PropertyDetailsActions({ productId, productLikes, productShareCount, productShareLink }: PropertyDetailsActionsProps) {
  const [isSharing, startSharing] = useTransition();

  const shareCallbackFn = () => {
    startSharing(async () => {
      try {
        const res = await shareProperty(productId, productShareCount + 1);
        if (!res.success) {
          toast({
            title: "Error sharing property.",
            description: res.message,
            variant: 'destructive'
          });
          return
        }

      } catch (error) {
        toast({
          title: "Failed to share",
          description: generateErrorMessage(error),
          variant: 'destructive'
        })
      }
    })
  }


  return (
    <div className="grid grid-cols-2 gap-1">
      <Likes productId={productId} likes={productLikes} callbackUrl={`/listings/details/${productShareLink}`} />
      <ShareButton shareCount={productShareCount} productLink={`${config.env.prodEndpoint}listings/details/${productShareLink}`} callbackFn={shareCallbackFn} loading={isSharing} />
    </div>
  )
}
