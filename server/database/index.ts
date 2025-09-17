import { drizzle } from "drizzle-orm/neon-http";
import * as auth from "./schema/auth";
import * as wilayah from "./schema/wilayah";
import * as dokumen from "./schema/dokumen";
import * as bidang from "./schema/bidang";
import * as desa from "./schema/desa";
import * as generus from "./schema/generus";
import * as kelompok from "./schema/kelompok";
import * as kemandirian from "./schema/kemandirian";
import * as keputrian from "./schema/keputrian";
import * as mudamudi from "./schema/mudamudi";
import * as pengajar from "./schema/pengajar";
import * as tahfidz from "./schema/tahfidz";
import * as pengurus from "./schema/pengurus";
import Env from "../../shared/env";

export const db = drizzle({
  connection: {
    connectionString: Env.DATABASE_URL,
  },
  schema: {
    ...auth,
    ...wilayah,
    ...dokumen,
    ...bidang,
    ...desa,
    ...generus,
    ...kelompok,
    ...kemandirian,
    ...keputrian,
    ...mudamudi,
    ...pengajar,
    ...tahfidz,
    ...pengurus,
  },
  casing: "snake_case",
});
