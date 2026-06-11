import { MetadataRoute } from 'next';
import { db } from '@/db/drizzle';
import { products } from '@/db/schema';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_PROD_ENDPOINT || 'https://cleanbeautifulproperties.com';

  // Fetch all product listings to add to the sitemap dynamically
  let listingsUrls: any[] = [];
  try {
    const activeProducts = await db.select({ slug: products.slug, updatedAt: products.updatedAt }).from(products);
    listingsUrls = activeProducts
      .filter(p => !!p.slug)
      .map((p) => ({
        url: `${baseUrl}/listings/details/${p.slug}`,
        lastModified: p.updatedAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (e) {
    console.error('Sitemap query failed', e);
  }

  const routes = ['', '/about-us', '/listings', '/search'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  return [...routes, ...listingsUrls];
}
