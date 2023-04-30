import { Preferences } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

import { RequestKeys } from "@/constants/request-keys";
import { SessionContext } from "@/contexts/session-context";
import { queryClient } from "@/lib/query";

export function usePreferences(userId: number | undefined) {
  const { setPreferences } = useContext(SessionContext);

  const onError = async () => {
    const preferences = await axios.post(`/api/users/${userId}/preferences`, {
      userId,
      theme: "system",
    });

    queryClient.setQueriesData([RequestKeys.UserPreferences, userId], {
      data: preferences.data,
    });

    setPreferences(preferences.data);
  };

  return useQuery(
    [RequestKeys.UserPreferences, userId],
    () => {
      return axios
        .get<Preferences>(`/api/users/${userId}/preferences`)
        .then((res) => res.data);
    },
    {
      enabled: !!userId,
      onSuccess: setPreferences,
      onError,
    }
  );
}
