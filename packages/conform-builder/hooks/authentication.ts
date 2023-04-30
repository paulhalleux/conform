import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { StorageKeys } from "@/constants/storage-keys";
import { SessionContext } from "@/contexts/session-context";
import { usePreferences } from "@/hooks/preferences";
import { LocalStorage } from "@/utils/local-storage";

import { User } from ".prisma/client";

export function useLogin() {
  const { push } = useRouter();
  const { setUser, user } = useContext(SessionContext);

  usePreferences(user?.id);

  return useMutation(
    (values: any) =>
      axios
        .post<{ user: User; accessToken: string; refreshToken: string }>(
          "/api/authentication/login",
          values
        )
        .then((res) => res.data),
    {
      onSuccess: ({ user, accessToken, refreshToken }) => {
        setUser(user);
        LocalStorage.setItem(StorageKeys.AccessToken, accessToken);
        LocalStorage.setItem(StorageKeys.RefreshToken, refreshToken);
        push("/");
      },
    }
  );
}
