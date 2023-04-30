import { NextRequest, NextResponse } from "next/server";

import { StorageKeys } from "@/constants/storage-keys";
import { LocalStorage } from "@/utils/local-storage";

export function middleware(req: NextRequest) {
  if (
    !LocalStorage.getItem(StorageKeys.RefreshToken) &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else {
    return NextResponse.next();
  }
}
