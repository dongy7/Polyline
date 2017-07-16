# polyline-coordinates
[![Build Status](https://travis-ci.org/dongy7/polyline-coordinates.svg?branch=master)](https://travis-ci.org/dongy7/polyline-coordinates) [![npm version](https://badge.fury.io/js/polyline-coordinates.svg)](https://badge.fury.io/js/polyline-coordinates)

Simple utility library for dealing with JSON polylines

## Installation
```npm install --save polyline-coordinates```

## Usage
```js
var Polyline = require('polyline-coordinates');

// the polyline needs to be an array of [latitude, longitude] values
var polyline = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);

polyline.getTotalDist();
// 100

polyline.getPointCovering(0.5);
// [50, 50]

polyline.getPointCovering(1.0);
// [100, 100]
```

## API
#### Polyline(geojson)
Creates a new polyline instance with the json representation of a polyline.

#### getLengthInMiles()
Returns the total distance covered by the polyline in miles.

#### .getLengthInKm()
Returns the total distance covered by the polyline in kilometers.

#### .getPointCovering(percent)
Returns the coordinate of the point that covers the percentage of the
polyline specified.

For example `.getPointCovering(0.5)` will return the coordinates of the point
that is located in the middle of the polyline.