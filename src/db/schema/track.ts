
import {
    date,
    index,
    pgEnum,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { sql } from "drizzle-orm";

export const StatusEnum = pgEnum("status", ["Pending", "Under Review", "Shortlisted", "Interview Scheduled", "Offer Accepted", "Offer Declined", "Not Selected"])
export const TrackTable = pgTable(
    "user_track",
    {
        TrackId: text("track_id")
            .primaryKey()
            .default(sql`gen_random_uuid()::text`),
        companyName: text("company_name").notNull(),
        dateApplied: text("date_applied").notNull(),
        status: StatusEnum("status").default("Pending").notNull(),
        createdDate: timestamp("created_date").defaultNow(),
        lastModifiedDate: timestamp("last_modified_date").defaultNow(),
        userId: text("user_id").references(() => UserTable.userId),
    },
    (table) => {
        return {
            userIdx: index("user__track_idx").on(table.userId),
        };
    },
);

