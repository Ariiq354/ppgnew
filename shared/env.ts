import type { ZodRawShape } from "zod";
import { z, type ZodMiniObject } from "zod/mini";

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  DOKUMEN_PRESET: z.string(),
  PENGURUS_PRESET: z.string(),
  PENGAJAR_PRESET: z.string(),
  GENERUS_PRESET: z.string(),
  BETTER_AUTH_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  CLOUDINARY_URL: z.string(),
});

type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);

export default EnvSchema.parse(process.env);

function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodMiniObject<T>,
  buildEnv: Record<string, string | undefined> = process.env
) {
  try {
    EnvSchema.parse(buildEnv);
  } catch (error) {
    if (error instanceof z.core.$ZodError) {
      let message = "Missing required values in .env:\n";
      error.issues.forEach((issue) => {
        message += `${String(issue.path[0])}\n`;
      });
      const e = new Error(message);
      e.stack = "";
      throw e;
    } else {
      console.error(error);
    }
  }
}
