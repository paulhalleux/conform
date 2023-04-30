import { Preferences } from "@prisma/client";
import { z } from "zod";

import { db } from "@/lib/db";
import { CreatePreferencesSchema } from "@/schemas/preferences";

export class PreferencesService {
  static async getUserPreference(userId: number): Promise<Preferences | null> {
    return db.preferences.findUnique({
      where: {
        userId,
      },
    });
  }

  static async setUserPreference(
    userId: number,
    preference: z.infer<typeof CreatePreferencesSchema>
  ) {
    return db.preferences.upsert({
      where: {
        userId,
      },
      update: {
        theme: preference.theme,
      },
      create: {
        userId,
        theme: preference.theme,
      },
    });
  }
}
