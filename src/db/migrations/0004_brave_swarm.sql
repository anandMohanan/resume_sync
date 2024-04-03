CREATE TABLE IF NOT EXISTS "track_status" (
	"status_id" text PRIMARY KEY NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_track" RENAME COLUMN "status" TO "status_id";--> statement-breakpoint
ALTER TABLE "user_track" ALTER COLUMN "status_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_track" ALTER COLUMN "status_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_track" ALTER COLUMN "status_id" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_track" ADD CONSTRAINT "user_track_status_id_track_status_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "track_status"("status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
