import { config } from "dotenv";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { generateSlug } from "@/lib/utils";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL || "";
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run the seed script.");
}

const sql = neon(databaseUrl);

const db = drizzle({ client: sql, schema: schema });

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
