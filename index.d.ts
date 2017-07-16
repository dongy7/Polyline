type Coordinate = [number, number]
type Line = Coordinate[]

declare class Polyline {
  getLengthInMiles(): number
  getLengthInKm(): number
  getPointCovering(percent: number): Coordinate
}

export declare function createLine(line: Line): Polyline
export declare function getDistanceBetweenPoints(
  start: Coordinate,
  end: Coordinate
): number
export declare function getDistanceBetweenPointsKm(
  start: Coordinate,
  end: Coordinate
): number
