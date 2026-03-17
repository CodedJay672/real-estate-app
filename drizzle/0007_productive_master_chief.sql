ALTER TABLE "products" ADD COLUMN "shared_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "tags" text;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "type";