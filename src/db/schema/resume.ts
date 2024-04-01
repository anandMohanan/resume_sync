import {
  index,
  pgTable,
  serial,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";
import { UserTable } from "./user";
import { sql } from "drizzle-orm";
export const ResumeTable = pgTable(
  "user_resume",
  {
    resumeId: text("resume_id")
      .primaryKey()
      .default(sql`gen_random_uuid()::text`),
    resumeName: text("resume_name"),
    resumeFilename: text("resume_filename"),
    version: text("version"),
    comments: text("comments"),
    resumeUrl: text("resume_url"),
    createdDate: timestamp("created_date").defaultNow(),
    lastModifiedDate: timestamp("last_modified_date").defaultNow(),
    userId: text("user_id").references(() => UserTable.userId),
  },
  (table) => {
    return {
      userIdx: index("user_idx").on(table.userId),
    };
  },
);

export const Tags = pgTable("tags", {
  tagId: text("tag_id")
    .primaryKey()
    .default(sql`gen_random_uuid()::text`),
  name: text("name"),
  userId: text("user_id").references(() => UserTable.userId),
});
export const ResumeTag = pgTable("resume_tag", {
  resumeTagId: text("resume_tag_id")
    .primaryKey()
    .default(sql`gen_random_uuid()::text`),
  tagId: text("tag_id").references(() => Tags.tagId),
  resumeId: text("resume_id").references(() => ResumeTable.resumeId),
});
