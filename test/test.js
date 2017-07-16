import Polyline from '../src'
import utils from '../src/utils'

test('squares number correctly', () => {
  expect(utils.square(2)).toBe(4)
  expect(utils.square(3)).toBe(9)
})

test('rounds number correctly', () => {
  expect(utils.round(0.1234)).toBe(0.123)
  expect(utils.round(0.123)).toBe(0.123)
})

test('gets the euclidean distance between two points', () => {
  expect(utils.getEuclideanDist([0, 0], [0, 10])).toBe(10)
  expect(utils.getEuclideanDist([0, 0], [10, 0])).toBe(10)
  expect(utils.getEuclideanDist([2, 2], [5, 5])).toMatchSnapshot()
})

test('gets the distance in miles between two coordinates', () => {
  expect(utils.getEuclideanDist([30, 90], [30, 90])).toBe(0)
  expect(
    utils.getMileDist([37.7749, 122.4194], [34.0522, 118.2437])
  ).toMatchSnapshot()
})

test('builds polyline correctly', () => {
  expect(utils.buildPolyline([[0, 0]])).toMatchSnapshot()
  expect(utils.buildPolyline([[0, 0], [0, 5]])).toMatchSnapshot()
  expect(
    utils.buildPolyline([[0, 0], [2, 2], [4, 4], [6, 6]])
  ).toMatchSnapshot()
})

test('computes the midpoint of the polyline', () => {
  const polyline = new Polyline([[37.7749, 122.4194], [34.0522, 118.2437]])
  const midpoint = polyline.getPointAtProp(0.5)
  expect(midpoint).toMatchSnapshot()
})

test('computes arbitrary point of polyline', () => {
  const polyline = new Polyline([
    [34.028337, -118.259954],
    [37.773566, -122.412786],
  ])

  expect(polyline.getPointAtProp(0.25)).toMatchSnapshot()
  expect(polyline.getPointAtProp(0.4)).toMatchSnapshot()
  expect(polyline.getPointAtProp(0.8)).toMatchSnapshot()
})

test('computes arbitray point of polyline with more than 2 segmenrs', () => {
  const polyline = new Polyline([
    [34.028337, -118.259954],
    [37.334748, -121.853123],
    [37.773566, -122.412786],
  ])

  expect(polyline.getPointAtProp(0.25)).toMatchSnapshot()
  expect(polyline.getPointAtProp(0.4)).toMatchSnapshot()
  expect(polyline.getPointAtProp(0.8)).toMatchSnapshot()
  expect(polyline.getPointAtProp(0.9)).toMatchSnapshot()
  expect(polyline.getPointAtProp(0.95)).toMatchSnapshot()
})
