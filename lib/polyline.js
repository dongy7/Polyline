var checkShape = function(arr) {
  return arr.reduce(function(prev, cur, index, array) {
    return prev && (cur.length == 2);
  }, true);
};

var getEuclideanDist = function(a, b) {
  var squared = Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2);
  return (Math.sqrt(squared));
};

var getPropDist = function(a, b, prop) {
  var deltaX = (b[0] - a[0]);
  var deltaY = (b[1] - a[1]);
  var newX = a[0] + deltaX*prop;
  var newY = a[1] + deltaY*prop;
  return [newX, newY];
};

var getLowBound = function(segs, prop) {
  return Math.floor(prop/(1/segs));
};

var getHighBound = function(segs, prop) {
  return Math.ceil(prop/(1/segs));
};

var getRemainingProp = function(lowIndex, segProp, prop) {
  return (prop/segProp) - (lowIndex*segProp);
};

function PolyCoords(geojson) {
  if(checkShape(geojson)) {
    this.geojson = geojson;
  } else {
    this.geojson = undefined;
  }
};

PolyCoords.prototype.getTotalDist = function() {
  return this.geojson.reduce(function(prev, cur, index, array) {
    var i = index;
    var j = index == (array.length -1) ? index : index + 1;
    return prev + getEuclideanDist(array[i], array[j]);
  }, 0);
};

PolyCoords.prototype.getPointAtProp = function(prop) {
  if(this.geojson.length == 1) {
    return this.geojson[0];
  }
  var segs = this.geojson.length - 1;
  var lo = getLowBound(segs, prop);
  var hi = getHighBound(segs, prop);
  var remain = getRemainingProp(lo, 1/segs, prop);
  return getPropDist(this.geojson[lo], this.geojson[hi], remain);
};

module.exports = PolyCoords;
