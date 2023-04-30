import { z } from "zod";

export const GetPreferencesSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const CreatePreferencesSchema = z.object({
  userId: z.number(),
  theme: z.string(),
});
