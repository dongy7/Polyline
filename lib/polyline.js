/**
   Checks if a given array contains 2 element arrays as elements
*/
var checkShape = function(arr) {
  return arr.reduce(function(prev, cur, index, array) {
    return prev && (cur.length == 2);
  }, true);
};

/**
   Gets the Euclidean distance between two points
*/
var getEuclideanDist = function(a, b) {
  var squared = Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2);
  return (Math.sqrt(squared));
};

// Converts degrees to radians
var degToRad = function(deg) {
  return deg * Math.PI/180;
};

// rounds to the nearest 1000th digit
var round = function(n) {
  return Math.round(n * 1000)/1000;
};

// radius of earth in miles
var radius = 3961;
var kpm = 1.60934;

var milesToKm = function(n) {
  return n * kpm;
};

/**
   Gets the distance in miles between to lat/long points
*/
var getDistMiles = function(a, b) {
  var slat = degToRad(a[0]);
  var slong = degToRad(a[1]);
  var dlat = degToRad(b[0]);
  var dlong = degToRad(b[1]);
  var deltaLong = dlong - slong;
  var deltaLat = dlat - slat;
  var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(slat) * Math.cos(dlat) * Math.pow(Math.sin(deltaLong/2), 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return round(radius * c);
};

var getTotalDistMiles = function(geojson) {
  return geojson.reduce(function(prev, cur, index, array) {
    var i = index;
    var j = index == (array.length -1) ? index : index + 1;
    return prev + getDistMiles(array[i], array[j]);
  }, 0);
};

/**
   Gets the coordinates of a point between the
   starting and end point that is
   a certain proportion away for the start point
*/
var getPropDist = function(a, b, prop) {
  var deltaX = Math.abs(b[0] - a[0])*prop;
  var deltaY = Math.abs(b[1] - a[1])*prop;

  var distX = a[0] < b[0] ? deltaX : (deltaX*-1);
  var distY = a[1] < b[1] ? deltaY : (deltaY*-1);

  var newX = a[0] + distX;
  var newY = a[1] + distY;

  return [newX, newY];
};

/**
   @param {segs} the number of segments in the geojson
   @param {prop} the proportion of the polyline that the point covers
   Gets the lower boundary index of the desired point
*/
var getLowBound = function(segs, prop) {
  return Math.floor(prop/(1/segs));
};

/**
   @param {segs} the number of segments in the geojson
   @param {prop} the proportion of the polyline that the point covers
   Gets the higher boundary index of the desired point
*/
var getHighBound = function(segs, prop) {
  return Math.ceil(prop/(1/segs));
};

/**
   @param {lowIndex} the lower index of the two bounding indices that point falls in
   @param {segProp} the proportion of polyline covered by one segment
   @param {prop} the proportion of the polyline that the point covers
   Returns the proportion covered from the start of the lower index to the point
*/
var getRemainingProp = function(lowIndex, segProp, prop) {
  return (prop/segProp) - (lowIndex*segProp);
};

/**
   Extrapolates the point's coordinates based on the direction set by the low and high
   coordinates.
*/
var getExtrapolatedPoint = function(geojson, lowIndex, highIndex, segProp, prop, flag) {
  var a = geojson[lowIndex];
  var b = geojson[highIndex];

  var deltaX = Math.abs(b[0] - a[0])*prop;
  var deltaY = Math.abs(b[1] - a[1])*prop;

  var distX;
  var distY;
  var newX;
  var newY;

  if(flag === 0) {
    distX = a[0] > b[0] ? deltaX : (deltaX*-1);
    distY = a[1] > b[1] ? deltaY : (deltaY*-1);
    newX = a[0] + distX;
    newY = a[1] + distY;
  } else {
    distX = a[0] < b[0] ? deltaX : (deltaX*-1);
    distY = a[1] < b[1] ? deltaY : (deltaY*-1);
    newX = b[0] + distX;
    newY = b[1] + distY;
  }

  return [newX, newY];
};

/**
   @param {geojson} the geojson representation of the polyline
*/
function Polyline(geojson) {
  this.geojson = geojson;
  this.segs = geojson.length - 1;
  this.mileDist = getTotalDistMiles(geojson);
  this.kmDist = round(milesToKm(this.mileDist));
};

/**
   Retuns the total distance covered by the polyline
*/
Polyline.prototype.getTotalDist = function() {
  return this.geojson.reduce(function(prev, cur, index, array) {
    var i = index;
    var j = index == (array.length -1) ? index : index + 1;
    return prev + getEuclideanDist(array[i], array[j]);
  }, 0);
};

Polyline.prototype.getTotalDistMiles = function() {
  return this.mileDist;
};

Polyline.prototype.getTotalDistKm = function() {
  return this.kmDist;
};

/**
   @param {prop} the proportion of the polyline covered by point
   Returns the coordinates of the desired point
*/
Polyline.prototype.getPointAtProp = function(prop) {
  if(this.geojson.length == 1) {
    return this.geojson[0];
  }
  if(prop < 0) {
    return getExtrapolatedPoint(this.geojson, 0, 1, 1/(this.segs), Math.abs(prop), 0);
  } else if(prop > 1) {
    return getExtrapolatedPoint(this.geojson, this.geojson.length-2, this.geojson.length-1, 1/(this.segs), (prop-1), 1);
  } else {
    var lo = getLowBound(this.segs, prop);
    var hi = getHighBound(this.segs, prop);
    var remain = getRemainingProp(lo, 1/(this.segs), prop);
    return getPropDist(this.geojson[lo], this.geojson[hi], remain);
  }
};

module.exports = Polyline;
