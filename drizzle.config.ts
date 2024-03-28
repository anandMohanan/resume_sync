import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema/*",
    out: "./src/db/migrations/",
    driver: "pg",
    dbCredentials: {
        connectionString: "postgresql://resumesyncdb_owner:nvVYKTo31UzS@ep-weathered-frog-a5s427mw-pooler.us-east-2.aws.neon.tech/resumesyncdb?sslmode=require" 
    }
} satisfies Config;

