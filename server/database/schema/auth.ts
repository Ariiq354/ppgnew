import { createdUpdated } from "./common";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "user",
  {
    id: serial().primaryKey(),
    name: text().notNull(),
    username: text().notNull(),
    displayUsername: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: boolean().notNull(),
    image: text(),
    role: text(),
    daerahId: integer()
      .notNull()
      .references(() => daerahTable.id, { onDelete: "cascade" }),
    desaId: integer().references(() => desaTable.id, { onDelete: "cascade" }),
    kelompokId: integer().references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
    banned: boolean(),
    banReason: text(),
    banExpires: timestamp({ withTimezone: true }),
    ...createdUpdated,
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

export const session = pgTable(
  "session",
  {
    id: serial().primaryKey(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    token: text().notNull().unique(),
    ipAddress: text(),
    userAgent: text(),
    userId: integer()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    impersonatedBy: text(),
    ...createdUpdated,
  },
  (table) => [
    index("userid_idx_session").on(table.userId),
    index("token_idx").on(table.token),
  ]
);

export const account = pgTable(
  "account",
  {
    id: serial().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: integer()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ withTimezone: true }),
    refreshTokenExpiresAt: timestamp({ withTimezone: true }),
    scope: text(),
    password: text(),
    ...createdUpdated,
  },
  (table) => [index("userid_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: serial().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    ...createdUpdated,
  },
  (table) => [index("identifier_idx").on(table.identifier)]
);
