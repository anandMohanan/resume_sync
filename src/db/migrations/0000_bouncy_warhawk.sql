CREATE TABLE IF NOT EXISTS "user_resume" (
	"resume_id" serial PRIMARY KEY NOT NULL,
	"resume_name" text,
	"resume_filename" text,
	"version" text,
	"comments" text,
	"resume_url" text,
	"user_id" serial NOT NULL,
	"tag_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"tag_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "user_resume" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_resume" ADD CONSTRAINT "user_resume_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_resume" ADD CONSTRAINT "user_resume_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
