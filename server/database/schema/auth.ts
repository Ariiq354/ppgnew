import {
  sqliteTable,
  text,
  int,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";

export const user = sqliteTable(
  "user",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    username: text().notNull(),
    displayUsername: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: int({ mode: "boolean" }).notNull(),
    image: text(),
    role: text(),
    daerahId: int()
      .notNull()
      .references(() => daerahTable.id, { onDelete: "cascade" }),
    desaId: int().references(() => desaTable.id, { onDelete: "set null" }),
    kelompokId: int().references(() => kelompokTable.id, {
      onDelete: "set null",
    }),
    banned: int({ mode: "boolean" }),
    banReason: text(),
    banExpires: int({ mode: "timestamp" }),
    ...timestamp,
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export const session = sqliteTable(
  "session",
  {
    id: int().primaryKey({ autoIncrement: true }),
    expiresAt: int({ mode: "timestamp" }).notNull(),
    token: text().notNull().unique(),
    ipAddress: text(),
    userAgent: text(),
    userId: int()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text(),
    ...timestamp,
  },
  (table) => [
    index("userid_idx_session").on(table.userId),
    index("token_idx").on(table.token),
  ]
);

export const account = sqliteTable(
  "account",
  {
    id: int().primaryKey({ autoIncrement: true }),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: int()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: int({
      mode: "timestamp",
    }),
    refreshTokenExpiresAt: int({
      mode: "timestamp",
    }),
    scope: text(),
    password: text(),
    ...timestamp,
  },
  (table) => [index("userid_idx").on(table.userId)]
);

export const verification = sqliteTable(
  "verification",
  {
    id: int().primaryKey({ autoIncrement: true }),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: int({ mode: "timestamp" }).notNull(),
    ...timestamp,
  },
  (table) => [index("identifier_idx").on(table.identifier)]
);
