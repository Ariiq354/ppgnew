import { z } from "zod/mini";

export const columns = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];

export const schema = z.object({
  id: z.optional(z.number()),
  name: z.string().check(z.minLength(1, "Required")),
});

export type Schema = z.infer<typeof schema>;

export const initialFormData = (): Schema => ({
  id: undefined,
  name: "",
});
