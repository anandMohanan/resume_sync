ALTER TABLE "user_resume" ALTER COLUMN "resume_id" SET DEFAULT gen_random_uuid()::text;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "tag_id" SET DEFAULT gen_random_uuid()::text;--> statement-breakpoint
ALTER TABLE "user_resume" ADD COLUMN "created_date" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_resume" ADD COLUMN "last_modified_date" timestamp DEFAULT now();