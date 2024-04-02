DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('Pending', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Offer Accepted', 'Offer Declined', 'Not Selected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_resume" (
	"resume_id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"resume_name" text,
	"resume_filename" text,
	"version" text,
	"comments" text,
	"resume_url" text,
	"created_date" timestamp DEFAULT now(),
	"last_modified_date" timestamp DEFAULT now(),
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resume_tag" (
	"resume_tag_id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"tag_id" text,
	"resume_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"tag_id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"name" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_track" (
	"track_id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"company_name" text NOT NULL,
	"date_applied" date NOT NULL,
	"status" "status" DEFAULT 'Pending' NOT NULL,
	"created_date" timestamp DEFAULT now(),
	"last_modified_date" timestamp DEFAULT now(),
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "user_resume" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user__track_idx" ON "user_track" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_user_idx" ON "user" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_resume" ADD CONSTRAINT "user_resume_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume_tag" ADD CONSTRAINT "resume_tag_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume_tag" ADD CONSTRAINT "resume_tag_resume_id_user_resume_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "user_resume"("resume_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_track" ADD CONSTRAINT "user_track_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
