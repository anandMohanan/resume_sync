/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'resume_tag'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "resume_tag" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "resume_tag" ALTER COLUMN "tag_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "resume_tag" ALTER COLUMN "tag_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "resume_tag" ADD COLUMN "resume_tag_id" text DEFAULT gen_random_uuid()::text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resume_tag" ADD CONSTRAINT "resume_tag_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
