import { z } from "zod/mini";
import { formatFileSize } from "~/utils/format";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const schema = z.object({
  file: z.instanceof(File, { message: "Please select a file" }).check(
    z.refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatFileSize(MAX_FILE_SIZE)}.`,
    })
  ),
});

export const getInitialFormData = (): Partial<Schema> => ({
  file: undefined,
});

export type Schema = z.infer<typeof schema>;
