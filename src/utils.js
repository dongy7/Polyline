// @flow

export type Coordinate = [number, number]
export type Line = Array<Coordinate>
export type DistFunc = (start: Coordinate, end: Coordinate) => number
export type Segment = {
  start: Coordinate,
  end: Coordinate,
  mileDistance: number,
  euclideanDistance: number,
}
export type Polyline = {
  segments: Array<Segment>,
  euclideanLength: number,
  mileLength: number,
}
export type Searcher = (polyline: Polyline, percent: number) => Coordinate

// kilometers per mile
const kiloPerMile = 1.60934

// radius or earth in miles
const earthRadius = 3961

export const square = (x: number) => x * x

// rounds to the nearest thousandth digit
export const round = (n: number) => Math.round(n * 1000) / 1000

export const getEuclideanDist: DistFunc = (a: Coordinate, b: Coordinate) => {
  const squaredDistance = square(a[0] - b[0]) + square(a[1] - b[1])
  return Math.sqrt(squaredDistance)
}

const degreeToRad = (degree: number) => degree * (Math.PI / 180)

// get the distance in miles between two coordinates
export const getMileDist: DistFunc = (start: Coordinate, end: Coordinate) => {
  const startInRadians = start.map(degree => degreeToRad(degree))
  const endInRadians = end.map(degree => degreeToRad(degree))
  const [startLatitude, startLongitude] = startInRadians
  const [endLatitude, endLongitude] = endInRadians

  const latitudeDelta = endLatitude - startLatitude
  const longitudeDelta = endLongitude - startLongitude
  const a =
    square(Math.sin(latitudeDelta / 2)) +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      square(Math.sin(longitudeDelta / 2))
  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2
  return round(earthRadius * c)
}

export const milesToKm = (mile: number) => mile * kiloPerMile

export const getPolylineDistance = (
  line: Line,
  distFunc: DistFunc = getEuclideanDist
) =>
  line.reduce((distance, point, index) => {
    if (index === 0) {
      return distance
    }

    const prevPoint = line[index - 1]
    return distance + distFunc(prevPoint, point)
  }, 0)

export const buildPolyline = (geojson: Line): Polyline => {
  if (geojson.length === 1) {
    const [start] = geojson
    return {
      segments: [{ start, end: start, mileDistance: 0, euclideanDistance: 0 }],
      mileLength: 0,
      euclideanLength: 0,
    }
  }

  const polyline: Polyline = { mileLength: 0, euclideanLength: 0, segments: [] }

  for (let i = 0; i < geojson.length - 1; i += 1) {
    const start = geojson[i]
    const end = geojson[i + 1]
    const mileDist = getMileDist(start, end)
    const euclideanDist = getEuclideanDist(start, end)

    polyline.segments.push({
      start,
      end,
      mileDistance: mileDist,
      euclideanDistance: euclideanDist,
    })

    polyline.euclideanLength += euclideanDist
    polyline.mileLength += mileDist
  }

  return polyline
}

const getInterpolatedPoint = (
  segment: Segment,
  segmentPercentage: number,
  offset: number
): Coordinate => {
  const { start, end } = segment

  const offsetProportion = offset / segmentPercentage

  const [startLat, startLong] = start
  const [endLat, endLong] = end
  const deltaX = Math.abs(endLat - startLat) * offsetProportion
  const deltaY = Math.abs(endLong - startLong) * offsetProportion

  const offsetX = startLat < endLat ? deltaX : -deltaX
  const offsetY = startLong < endLong ? deltaY : -deltaY

  return [startLat + offsetX, startLong + offsetY]
}

export const linearSearcher: Searcher = (
  polyline: Polyline,
  percent: number
): Coordinate => {
  const { segments, mileLength } = polyline
  let distanceCovered = 0
  let percentRemaining = percent
  let segment = segments[segments.length - 1]
  let currentPercent = 0

  for (let i = 0; i < segments.length; i += 1) {
    distanceCovered += segments[i].mileDistance
    currentPercent = distanceCovered / mileLength

    if (currentPercent >= percent) {
      segment = segments[i]
      break
    }

    percentRemaining -= currentPercent
  }

  return getInterpolatedPoint(
    segment,
    segment.mileDistance / mileLength,
    percentRemaining
  )
}
