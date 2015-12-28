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
var getExtrapolatedPoint = function(geojson, lowIndex, highIndex, segProp, prop) {
  var a = geojson[lowIndex];
  var b = geojson[highIndex];

  var deltaX = Math.abs(b[0] - a[0])*prop;
  var deltaY = Math.abs(b[1] - a[1])*prop;

  var distX = a[0] > b[0] ? deltaX : (deltaX*-1);
  var distY = a[1] > b[1] ? deltaY : (deltaY*-1);

  var newX = a[0] + distX;
  var newY = a[1] + distY;

  return [newX, newY];
};

/**
   @param {geojson} the geojson representation of the polyline
*/
function Polyline(geojson) {
  this.geojson = geojson;
  this.segs = geojson.length - 1;
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

/**
   @param {prop} the proportion of the polyline covered by point
   Returns the coordinates of the desired point
*/
Polyline.prototype.getPointAtProp = function(prop) {
  if(this.geojson.length == 1) {
    return this.geojson[0];
  }
  if(prop < 0) {
    return getExtrapolatedPoint(this.geojson, 0, 1, 1/(this.segs), prop);
  } else if(prop > 1) {
    return getExtrapolatedPoint(this.geojson, this.geojson.length-2, this.geojson.length-1, 1/(this.segs), prop);
  } else {
    var lo = getLowBound(this.segs, prop);
    var hi = getHighBound(this.segs, prop);
    var remain = getRemainingProp(lo, 1/(this.segs), prop);
    return getPropDist(this.geojson[lo], this.geojson[hi], remain);
  }
};

module.exports = Polyline;
