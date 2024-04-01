import { index, pgTable, serial, text } from "drizzle-orm/pg-core";

export const UserTable = pgTable(
  "user",
  {
    userId: text("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email"),
  },
  (table) => {
    return {
      userIdx: index("user_user_idx").on(table.userId),
    };
  },
);
