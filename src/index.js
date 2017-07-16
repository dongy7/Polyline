import type { Coordinate, Line } from './utils'
import { buildPolyline, milesToKm, getMileDist, linearSearcher } from './utils'

export class Polyline {
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

  getPointCovering(percent: number) {
    return linearSearcher(this.polyline, percent)
  }
}

const createLine = (geojson: Line): Polyline => new Polyline(geojson)

const getDistanceBetweenPoints = (start: Coordinate, end: Coordinate) =>
  getMileDist(start, end)

const getDistanceBetweenPointsKm = (start: Coordinate, end: Coordinate) =>
  milesToKm(getDistanceBetweenPoints(start, end))

export default {
  createLine,
  getDistanceBetweenPoints,
  getDistanceBetweenPointsKm,
}
