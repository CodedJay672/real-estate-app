ALTER TABLE "products" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "houses" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "houses" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "lands" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "lands" DROP COLUMN "updated_at";