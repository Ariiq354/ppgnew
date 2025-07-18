import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";
import { relations } from "drizzle-orm";

export const daerahTable = sqliteTable("daerah", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  ...timestamp,
});

export const desaTable = sqliteTable("desa", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const kelompokTable = sqliteTable("kelompok", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  desaId: int()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const daerahRelations = relations(daerahTable, ({ many }) => ({
  desa: many(desaTable),
}));

export const desaRelations = relations(desaTable, ({ many, one }) => ({
  daerah: one(daerahTable, {
    fields: [desaTable.daerahId],
    references: [daerahTable.id],
  }),
  kelompok: many(kelompokTable),
}));

export const kelompokRelations = relations(kelompokTable, ({ one }) => ({
  desa: one(desaTable, {
    fields: [kelompokTable.desaId],
    references: [desaTable.id],
  }),
}));
