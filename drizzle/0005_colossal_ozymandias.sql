CREATE TABLE "likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "houses" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "lands" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "houses" CASCADE;--> statement-breakpoint
DROP TABLE "lands" CASCADE;--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_property_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "description" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "type" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category_id" uuid;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "bedrooms" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "bathrooms" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "size" integer;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_product_products_id_fk" FOREIGN KEY ("product") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "property_id";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "likes";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "created_by";