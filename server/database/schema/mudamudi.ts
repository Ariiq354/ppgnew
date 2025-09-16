import { daerahTable } from "./wilayah";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const kelasMudaMudiTable = pgTable("kelas_muda_mudi", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusMudaMudiTable = pgTable(
  "absensi_generus_muda_mudi",
  {
    id: serial().primaryKey(),
    kelasId: integer()
      .notNull()
      .references(() => kelasMudaMudiTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text().notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  }
);
