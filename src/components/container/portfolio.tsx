"use client";

import { use } from 'react';
import { Skeleton } from '../ui/skeleton'
import ProductCard from '@/app/campaign/downtown/product-card';

interface PortfolioProps {
  productPromise: Promise<
    ApiResponse<paginatedData<(listings & { likes: TLikesResponse[] })[]>>>
}

export default function Portfolio({ productPromise }: PortfolioProps) {
  const products = use(productPromise);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.data?.data.map((product) => (
        <ProductCard key={product.id} title={product.name} description={product.description || ""} location={product.location} price={product.price} src={product.imageUrl || ""} link={`/listings/details/${product.slug}`} type={product.title} />
      ))}
    </div>
  )
}

export function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-80 w-full rounded-lg" />
      ))}
    </div>
  )
}