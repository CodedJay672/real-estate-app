CREATE TYPE "public"."notif_type" AS ENUM('enquiries');--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_name" varchar(100) NOT NULL,
	"sender_email" varchar(100) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "notif_type" DEFAULT 'enquiries' NOT NULL,
	"title" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "id_index" ON "notifications" USING btree ("id");