import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/database/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  casing: "snake_case",
});
