type Coordinate = {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
};
type SafePoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  [key: string]: any; // other fields allowed
};

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(coord1: Coordinate, coord2: SafePoint): number {
  const R = 6371; // Radius of Earth in km
  const dLat = toRadians(coord2.lat - coord1.latitude);
  const dLon = toRadians(coord2.lng - coord1.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestSafePoint(
  currentLocation: Coordinate,
  safePoints: SafePoint[],
): SafePoint {
  let nearest = safePoints[0];
  let minDistance = haversineDistance(currentLocation, nearest);

  for (const point of safePoints.slice(1)) {
    const dist = haversineDistance(currentLocation, point);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = point;
    }
  }

  return nearest;
}
