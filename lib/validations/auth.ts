import { z } from "zod";

export const onboardingSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string(),
  native: z.string(),
  target: z.string()
});
