DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('Pending', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Offer Accepted', 'Offer Declined', 'Not Selected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
CREATE INDEX IF NOT EXISTS "user__track_idx" ON "user_track" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_track" ADD CONSTRAINT "user_track_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
