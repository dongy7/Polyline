const utils = require('../src/utils')

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
