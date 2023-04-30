import { NextResponse } from "next/server";

import { RefreshSchema } from "@/schemas/authentication";
import { AuthenticationService } from "@/services/authentication";

export async function POST(req: Request) {
  const json = await req.json();
  const { refreshToken } = RefreshSchema.parse(json);

  const {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  } = await AuthenticationService.refresh(refreshToken);

  if (!user) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({
    user,
    accessToken,
    refreshToken: newRefreshToken,
  });
}
