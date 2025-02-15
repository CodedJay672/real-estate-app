CREATE TYPE "public"."status" AS ENUM('selling', 'sold out', 'reopened');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('house', 'land');--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"property_type" "type" DEFAULT 'house' NOT NULL,
	"status" "status" DEFAULT 'selling' NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"size" integer NOT NULL,
	"image_url" text NOT NULL,
	"amenities" text,
	"created_by" uuid NOT NULL,
	"creted_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;