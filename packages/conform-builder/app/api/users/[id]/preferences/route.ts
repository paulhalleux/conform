import { NextResponse } from "next/server";
import { z } from "zod";

import {
  CreatePreferencesSchema,
  GetPreferencesSchema,
} from "@/schemas/preferences";
import { PreferencesService } from "@/services/preferences";

export async function GET(
  req: Request,
  context: z.infer<typeof GetPreferencesSchema>
) {
  const { params } = GetPreferencesSchema.parse(context);

  if (!params.id) {
    return NextResponse.json(null, { status: 500 });
  }

  const preferences = await PreferencesService.getUserPreference(
    parseInt(params.id)
  );

  if (!preferences) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(preferences);
}

export async function POST(req: Request) {
  const json = await req.json();
  const body = CreatePreferencesSchema.parse(json);

  const preferences = await PreferencesService.setUserPreference(body.userId, {
    userId: body.userId,
    theme: body.theme,
  });

  return NextResponse.json(preferences);
}
