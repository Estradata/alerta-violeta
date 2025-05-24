import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { mapsAPI } from "../api";
import { GetSafePointsResponse } from "@/../../packages/safe-points/types";
import { getSafePoints, saveSafePoints } from "../lib/asyncStorageSafePoints";

export function useSafePoints() {
  const options: UseQueryOptions<
    GetSafePointsResponse,
    Error,
    GetSafePointsResponse,
    [string]
  > = {
    queryKey: ["safePoints"],
    queryFn: async () => {
      try {
        const response = await api.get(mapsAPI.safePoints);
        await saveSafePoints(response.data);

        return response.data;
      } catch (e) {
        const cached = await getSafePoints();
        if (cached) return JSON.parse(cached);
        throw e;
      }
    },
    refetchInterval: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  };

  return useQuery(options);
}
