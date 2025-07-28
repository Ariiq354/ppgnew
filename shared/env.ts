import { z } from "zod/mini";

const EnvSchema = z.object({
  DATABASE_URL: z.string().check(z.minLength(1)),
  DATABASE_AUTH_TOKEN: z.string().check(z.minLength(1)),
  DOKUMEN_PRESET: z.string().check(z.minLength(1)),
  BETTER_AUTH_URL: z.string().check(z.minLength(1)),
  BETTER_AUTH_SECRET: z.string().check(z.minLength(1)),
  CLOUDINARY_URL: z.string().check(z.minLength(1)),
});

type EnvSchema = z.infer<typeof EnvSchema>;

export default EnvSchema.parse(process.env);
