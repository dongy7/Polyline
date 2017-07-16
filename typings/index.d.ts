export type Coordinate = [number, number]
export type Line = Coordinate[]

declare class Polyline {
  static getDistanceBetweenPoints(start: Coordinate, end: Coordinate): number
  static getDistanceBetweenPointsKm(start: Coordinate, end: Coordinate): number
  constructor(line: Line)
  getLengthInMiles(): number
  getLengthInKm(): number
  getPointCovering(percent: number): Coordinate
}

export default Polyline
