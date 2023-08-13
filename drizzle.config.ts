import type { Config } from "drizzle-kit";

export default {
  schema: './src/db/schema.ts',
  driver: "pg",
  out: './src/db/migrations',
  dbCredentials: {
    connectionString: "postgres://postgres:admin@localhost:5432",
  },
} satisfies Config;
