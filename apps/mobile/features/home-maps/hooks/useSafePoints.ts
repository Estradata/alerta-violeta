// hooks/useSafePoints.ts
import { useQuery } from "@tanstack/react-query";
// import { api } from "@/lib/api";
// import { mapsAPI } from "../api";
import { GetSafePointsResponse } from "../../../../../packages/safe-points//types";

const safetyLocationsHARD = {
  data: [
    {
      id: "1",
      accountId: "erfg",
      googlePlaceId: "sd",
      name: "Central Police Station Osvel TEST",
      address: "p",
      lat: 37.785834,
      lng: -122.406417,
      type: "sdfvb",
    },
    {
      id: "2",
      accountId: "erfg",
      googlePlaceId: "sd",
      name: "Fire Department HQ",
      address: "p",
      lat: 37.775834,
      lng: -122.416417,
      type: "sdfvb",
    },
  ],
};

export function useSafePoints() {
  return useQuery({
    queryKey: ["safePoints"],
    queryFn: async () => {
      // const response = await api.get(mapsAPI.safePoints);
      // console.log("================= response useSafePoints", response);
      // return response.data as GetSafePointsResponse;
      return safetyLocationsHARD as GetSafePointsResponse;
    },
  });
}
