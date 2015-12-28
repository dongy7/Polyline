# polyline-coordinates
[![Build Status](https://travis-ci.org/dongy7/polyline-coordinates.svg?branch=master)](https://travis-ci.org/dongy7/polyline-coordinates)

Simple utility library for dealing with json polylines

## Installation
```npm install --save polyline-coordinates```

## Usage
```js
var Polyline = require('polyline-coordinates');

// the polyline needs to be an array of [lat, long] values
var line = [[0, 0], [0, 100]];
var polyline = new Polyline(line);

polyline.getTotalDist();
// 100

polyline.getPointAtProp(-0.5);
// [-50, 0]

polyline.getPointAtProp(0.5);
// [0, 50]

polyline.getPointAtProp(1.5);
// [0, 150]
```

## API
#### Polyline(geojson)
Creates a new polyline instance with the json representation of a polyline.

### .getTotalDistMiles()
Returns the total distance covered by the polyline in miles.

### .getTotalDistMiles()
Returns the total distance covered by the polyline in miles.

#### .getTotalDistKm()
Returns the total distance covered by the polyline in kilometers.

#### .getPointAtProp(prop)
Returns the coordinates of the point where the proportion of 
the distance from the starting point and the given point is equal to `prop`.
For example `.getPointAtProp(0.5)` will return the coordinates of the point
that is located in the middle of the polyline.
