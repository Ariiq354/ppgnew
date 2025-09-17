import { UBadge } from "#components";
import type { TableColumn } from "@nuxt/ui";
import { z } from "zod/mini";

const statusMap = {
  Baru: { label: "baru", color: "warning" as const },
  Diproses: { label: "diproses", color: "info" as const },
  Selesai: { label: "selesai", color: "success" as const },
} as const;

export const columns: TableColumn<any>[] = [
  {
    accessorKey: "nama",
    header: "Nama Generus",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status =
        statusMap[row.getValue("status") as keyof typeof statusMap];

      if (!status) return row.getValue("status");

      return h(
        UBadge,
        { class: "capitalize rounded-full", color: status.color },
        () => status.label
      );
    },
  },
];

export const statusOptions = ["Baru", "Diproses", "Selesai"];

export const schema = z.object({
  id: z.optional(z.number()),
  generusId: z.number().check(z.minimum(1, "Required")),
  status: z.enum(statusOptions),
});

export const getInitialFormData = (): Partial<Schema> => ({
  id: undefined,
  generusId: undefined,
  status: "Baru",
});

export type Schema = z.infer<typeof schema>;
