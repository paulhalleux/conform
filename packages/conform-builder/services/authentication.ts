import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas/authentication";

export class AuthenticationService {
  static async login(credentials: z.infer<typeof LoginSchema>) {
    const user = await db.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      return { user: null, token: null };
    }

    const valid = await bcrypt.compare(credentials.password, user.password);

    if (!valid) {
      return { user: null, token: null };
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_REFRESH as string
    );

    return { user, accessToken, refreshToken };
  }

  static async refresh(refreshToken: string) {
    try {
      const { userId } = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH as string
      ) as { userId: number };

      const user = await db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return { user: null, token: null };
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string
      );

      const newRefreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_REFRESH as string
      );

      return { user, accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return { user: null, token: null };
    }
  }
}
