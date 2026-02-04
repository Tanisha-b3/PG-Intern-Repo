import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["info", "debug", "warn", "error"]).default("info")
});

export const env = envSchema.parse(process.env);
