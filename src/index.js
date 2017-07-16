import type { Coordinate, Line } from './utils'
import { buildPolyline, milesToKm, getMileDist, linearSearcher } from './utils'

class Polyline {
  constructor(geojson: Line) {
    this.line = geojson
    this.polyline = buildPolyline(geojson)
  }

  getLengthInMiles() {
    return this.polyline.mileLength
  }

  getLengthInKm() {
    return milesToKm(this.getLengthInMiles())
  }

  getPointAtProp(prop: number) {
    return linearSearcher(this.polyline, prop)
  }

  getPointCovering(percent: number) {
    return this.getPointAtProp(percent)
  }

  static getDistanceBetweenPoints(start: Coordinate, end: Coordinate) {
    return getMileDist(start, end)
  }

  static getDistanceBetweenPointsKm(start: Coordinate, end: Coordinate) {
    return milesToKm(Polyline.getDistanceBetweenPoints(start, end))
  }
}

export default Polyline
