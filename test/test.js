import Polyline from '../src' // eslint-disable-line import/no-named-as-default
import {
  square,
  round,
  getEuclideanDist,
  getMileDist,
  buildPolyline,
  linearSearcher,
  binarySearcher,
} from '../src/utils'

test('squares number correctly', () => {
  expect(square(2)).toBe(4)
  expect(square(3)).toBe(9)
})

test('rounds number correctly', () => {
  expect(round(0.1234)).toBe(0.123)
  expect(round(0.123)).toBe(0.123)
})

test('gets the euclidean distance between two points', () => {
  expect(getEuclideanDist([0, 0], [0, 10])).toBe(10)
  expect(getEuclideanDist([0, 0], [10, 0])).toBe(10)
  expect(getEuclideanDist([2, 2], [5, 5])).toMatchSnapshot()
})

test('gets the distance in miles between two coordinates', () => {
  expect(getEuclideanDist([30, 90], [30, 90])).toBe(0)
  expect(
    getMileDist([37.7749, 122.4194], [34.0522, 118.2437])
  ).toMatchSnapshot()
})

test('builds polyline correctly', () => {
  expect(buildPolyline([[0, 0]])).toMatchSnapshot()
  expect(buildPolyline([[0, 0], [0, 5]])).toMatchSnapshot()
  expect(buildPolyline([[0, 0], [2, 2], [4, 4], [6, 6]])).toMatchSnapshot()
})

test('gets the length of the polyline in miles', () => {
  const polyline = Polyline.createLine([
    [37.7749, 122.4194],
    [34.0522, 118.2437],
  ])
  expect(polyline.getLengthInMiles()).toMatchSnapshot()
})

test('gets the length of the polyline in kilometers', () => {
  const polyline = Polyline.createLine([
    [37.7749, 122.4194],
    [34.0522, 118.2437],
  ])
  expect(polyline.getLengthInKm()).toMatchSnapshot()
})

test('computes the midpoint of the polyline', () => {
  const polyline = Polyline.createLine([
    [37.7749, 122.4194],
    [34.0522, 118.2437],
  ])
  const midpoint = polyline.getPointCovering(0.5)
  expect(midpoint).toMatchSnapshot()
})

test('computes arbitrary point of polyline', () => {
  const polyline = Polyline.createLine([
    [34.028337, -118.259954],
    [37.773566, -122.412786],
  ])

  expect(polyline.getPointCovering(0.25)).toMatchSnapshot()
  expect(polyline.getPointCovering(0.4)).toMatchSnapshot()
  expect(polyline.getPointCovering(0.8)).toMatchSnapshot()
})

test('computes arbitray point of polyline with more than 2 segmenrs', () => {
  const polyline = Polyline.createLine([
    [34.028337, -118.259954],
    [37.334748, -121.853123],
    [37.773566, -122.412786],
  ])

  expect(polyline.getPointCovering(0.25)).toMatchSnapshot()
  expect(polyline.getPointCovering(0.4)).toMatchSnapshot()
  expect(polyline.getPointCovering(0.8)).toMatchSnapshot()
  expect(polyline.getPointCovering(0.9)).toMatchSnapshot()
  expect(polyline.getPointCovering(0.95)).toMatchSnapshot()
})

test('gets the distance between two points in miles', () => {
  expect(
    Polyline.getDistanceBetweenPoints(
      [34.028337, -118.259954],
      [37.773566, -122.412786]
    )
  ).toMatchSnapshot()
})

test('gets the distance between two points in kilometers', () => {
  expect(
    Polyline.getDistanceBetweenPointsKm(
      [34.028337, -118.259954],
      [37.773566, -122.412786]
    )
  ).toMatchSnapshot()
})

test('binary searcher should give same result as linear searcher', () => {
  const polyline = buildPolyline([
    [34.028337, -118.259954],
    [37.334748, -121.853123],
    [37.773566, -122.412786],
  ])

  expect(linearSearcher(polyline, 0.25)).toEqual(binarySearcher(polyline, 0.25))
  expect(linearSearcher(polyline, 0.5)).toEqual(binarySearcher(polyline, 0.5))
  expect(linearSearcher(polyline, 0.75)).toEqual(binarySearcher(polyline, 0.75))
  expect(linearSearcher(polyline, 0.9)).toEqual(binarySearcher(polyline, 0.9))
  expect(linearSearcher(polyline, 1.0)).toEqual(binarySearcher(polyline, 1.0))
})
