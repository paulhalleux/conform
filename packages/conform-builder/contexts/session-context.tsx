import { Preferences } from "@prisma/client";
import { createContext, useContext, useState } from "react";

import { User } from ".prisma/client";

export type SessionContextValue = {
  user: User | undefined;
  setUser: (user: User) => void;
  preferences: Preferences | undefined;
  setPreferences: (preferences: Preferences) => void;
};

export const SessionContext = createContext<SessionContextValue>(
  {} as SessionContextValue
);

export function SessionProvider({ children }: any) {
  const [user, setUser] = useState<User>({} as User);
  const [preferences, setPreferences] = useState<Preferences>();

  return (
    <SessionContext.Provider
      value={{ user, setUser, preferences, setPreferences }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const { preferences, user } = useContext(SessionContext);
  return { preferences, user };
}
