import { NextResponse } from "next/server";

import { LoginSchema } from "@/schemas/authentication";
import { AuthenticationService } from "@/services/authentication";

export async function POST(req: Request) {
  const json = await req.json();
  const credentials = LoginSchema.parse(json);

  const { user, accessToken, refreshToken } = await AuthenticationService.login(
    credentials
  );

  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({ user, accessToken, refreshToken });
}
