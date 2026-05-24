ALTER TABLE "products" ADD COLUMN "image_id" text;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_image_id_unique" UNIQUE("image_id");