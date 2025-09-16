import { desaTable } from "./wilayah";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const kelasDesaTable = pgTable("kelas_desa", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusDesaTable = pgTable("absensi_generus_desa", {
  id: serial().primaryKey(),
  kelasId: integer()
    .notNull()
    .references(() => kelasDesaTable.id, { onDelete: "cascade" }),
  generusId: integer()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...createdUpdated,
});
