import { config } from "dotenv";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL || "";
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run the seed script.");
}

const sql = neon(databaseUrl);

const db = drizzle({ client: sql, schema: schema });

const random8DigitNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const generateSlug = (name: string) => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid product name for slug generation");
  }

  const normalized = name.trim().replace(/\s+/g, "-").toLowerCase();
  return `${normalized}-${random8DigitNumber()}`;
};

const addSlugToProducts = async () => {
  try {
    const productsList = await db.select().from(schema.products);

    if (!productsList.length) {
      console.log("No products found to update.");
      return;
    }

    for (const product of productsList) {
      const slug = generateSlug(product.name);

      await db
        .update(schema.products)
        .set({ slug })
        .where(eq(schema.products.id, product.id));
    }

    console.log(`Updated ${productsList.length} products with slug values.`);
  } catch (error) {
    console.error("Failed to add slugs to products:", error);
    throw error;
  }
};

if (require.main === module) {
  addSlugToProducts().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
