ALTER TABLE "user_resume" DROP CONSTRAINT "user_resume_tag_id_tags_tag_id_fk";
--> statement-breakpoint
ALTER TABLE "user_resume" DROP COLUMN IF EXISTS "tag_id";