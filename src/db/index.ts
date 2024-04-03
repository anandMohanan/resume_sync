import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { UserTable } from "./schema/user";
import { ResumeTable, Tags } from "./schema/resume";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { TrackStatus, TrackTable } from "./schema/track";

const schema = {
    UserTable,
    ResumeTable,
    Tags,
    TrackTable,
    TrackStatus

};
const client = neon(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
