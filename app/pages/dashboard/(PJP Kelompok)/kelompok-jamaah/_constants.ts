import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Jamaah",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  nama: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  nama: "",
});

export type Schema = z.infer<typeof schema>;
