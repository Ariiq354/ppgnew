import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { relations } from "drizzle-orm";

export const daerahTable = pgTable("daerah", {
  id: serial().primaryKey(),
  name: text().notNull(),
  ...createdUpdated,
});

export const desaTable = pgTable("desa", {
  id: serial().primaryKey(),
  name: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const kelompokTable = pgTable("kelompok", {
  id: serial().primaryKey(),
  name: text().notNull(),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
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
