CREATE TABLE IF NOT EXISTS "resume_tag" (
	"tag_id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"resume_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume_tag" ADD CONSTRAINT "resume_tag_resume_id_user_resume_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "user_resume"("resume_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
