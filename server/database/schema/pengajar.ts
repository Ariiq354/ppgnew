import { date, integer, pgTable, text } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { genderEnum, statusPengajarEnum } from "../../../shared/enum";

export const pengajarTable = pgTable("pengajar", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: date({ mode: "string" }),
  pendidikan: text().notNull(),
  status: text({
    enum: statusPengajarEnum,
  }).notNull(),
  gender: text({ enum: genderEnum }).notNull(),
  tanggalTugas: date(),
  noTelepon: text().notNull(),
  foto: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, {
      onDelete: "cascade",
    }),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, {
      onDelete: "cascade",
    }),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...createdUpdated,
});
