ALTER TYPE "public"."status" ADD VALUE 'none';--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "phone" varchar(50);--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "lead_type" varchar(50) DEFAULT 'buyer';--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "status" varchar(50) DEFAULT 'inquiry';--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "property_name" varchar(255);