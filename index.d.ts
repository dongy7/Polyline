export = Polyline
export as namespace Polyline

declare namespace Polyline {
  type Coordinate = [number, number]
  type Line = Coordinate[]
  class Polyline {
    static getDistanceBetweenPoints(start: Coordinate, end: Coordinate): number
    static getDistanceBetweenPointsKm(
      start: Coordinate,
      end: Coordinate
    ): number
    constructor(line: Line)
    getLengthInMiles(): number
    getLengthInKm(): number
    getPointCovering(percent: number): Coordinate
  }
}
