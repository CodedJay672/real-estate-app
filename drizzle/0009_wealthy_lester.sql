CREATE TABLE "searches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid,
	"search_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
-- ALTER TABLE "products" ADD COLUMN "image_id" text;--> statement-breakpoint
ALTER TABLE "searches" ADD CONSTRAINT "searches_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
-- ALTER TABLE "products" ADD CONSTRAINT "products_image_id_unique" UNIQUE("image_id");