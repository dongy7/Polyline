var assert = require('assert');
var Polyline = require('../lib/polyline');

describe('Polyline', function() {
  describe('#getPointAtProp()', function() {
    it('should return the first coordinate if there is only one', function() {
      var poly = new Polyline([[10, 10]]);
      assert.deepEqual([10, 10], poly.getPointAtProp(0.5));
    });
    it('should return the midpoint if there are two coordinates', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([50, 50], poly.getPointAtProp(0.5));
    });
    it('should return the midpoint if even if the starting point is greater than the ending point', function() {
      var poly = new Polyline([[100, 100], [0, 0]]);
      assert.deepEqual([50, 50], poly.getPointAtProp(0.5));
    });
    it('should correctly extraplate when the proportion is negative', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([-50, -50], poly.getPointAtProp(-0.5));
    });
    it('should correctly extraplate when the proportion is negative', function() {
      var poly = new Polyline([[0,0], [0,100]]);
      assert.deepEqual([0, -50], poly.getPointAtProp(-0.5));
    });
    it('should correctly extraplate when the proportion is an arbitrary negative number', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([-150, -150], poly.getPointAtProp(-1.5));
    });
    it('should correctly extraplate when the proportion is over one', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([150, 150], poly.getPointAtProp(1.5));
    });
    it('should correctly extraplate when the proportion is an arbitrary positive number greater than one', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([150, 150], poly.getPointAtProp(1.5));
    });
    it('should correctly extraplate negative values for more than two points', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([-50, -50], poly.getPointAtProp(-0.5));
    });
    it('should correctly extraplate positive values for more than two points', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([150, 150], poly.getPointAtProp(1.5));
    });
    it('should return the correct point when there more than two points', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([50, 50], poly.getPointAtProp(0.5));
    });
    it('should return the correct point when there more than two points', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([70,70], poly.getPointAtProp(0.7));
    });
    it('should return the correct point when there more than two points', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([100, 100], poly.getPointAtProp(1));
    });
    it('should return the correct point when there more than two points', function() {
      var line = [[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]];
      var rev = line.reverse();
      var poly = new Polyline(rev);
      assert.deepEqual([50, 50], poly.getPointAtProp(0.5));
    });
    it('should return the correct point when path is not straight', function() {
      var poly = new Polyline([[0,0], [20, 0], [20, 20], [0, 20], [0,40], [-20, 40]]);
      var point =  poly.getPointAtProp(0.5);
      assert.deepEqual([10, 20], [Math.round(point[0]), Math.round(point[1])]);
    });
    it('should return the correct point when path is not straight', function() {
      var line = [[0,0], [20, 0], [20, 20], [0, 20], [0,40], [-20, 40]];
      var rev = line.reverse();
      var poly = new Polyline(rev);
      var point =  poly.getPointAtProp(0.5);
      assert.deepEqual([10, 20], [Math.round(point[0]), Math.round(point[1])]);
    });
  });

  describe('#getTotalDist()', function() {
    it('should return 0 if there is only one coordinate', function() {
      var poly = new Polyline([[10, 10]]);
      assert.equal(0, poly.getTotalDistMiles());
    });
    it('should return the same distances for two geojson that are reverse of each other', function() {
      var a = [35.890810, -79.075041];
      var b = [40.748765, -73.985806];
      var polyA = new Polyline([a, b]);
      var polyB = new Polyline([b, a]);
      assert.equal(polyA.getTotalDistMiles(), polyB.getTotalDistMiles());
    });
    it('should return the correct distnace in miles', function() {
      var a = [35.890810, -79.075041];
      var b = [40.748765, -73.985806];
      var polyA = new Polyline([a, b]);
      assert.equal(polyA.getTotalDistMiles(), 434.551);
    });
    it('should return the correct distnace in km', function() {
      var a = [35.890810, -79.075041];
      var b = [40.748765, -73.985806];
      var polyA = new Polyline([a, b]);
      assert.equal(polyA.getTotalDistKm(), 699.34);
    });
  });

  describe('#getPointDist()', function() {
    it('should return 0 if the two points are identical', function() {
      var poly = new Polyline([]);
      assert.equal(0, poly.getPointDist([0,0], [0,0]));
    });
    it('should return the correct distance in miles for two non-identical points', function() {
      var poly = new Polyline([]);
      var a = [35.890810, -79.075041];
      var b = [40.748765, -73.985806];
      assert.equal(434.551, poly.getPointDist(a, b));
    });
  });

  describe('#getPointDistKm()', function() {
    it('should return 0 if the two points are identical', function() {
      var poly = new Polyline([]);
      assert.equal(0, poly.getPointDistKm([0,0], [0,0]));
    });
    it('should return the correct distance in km for two non-identical points', function() {
      var poly = new Polyline([]);
      var a = [35.890810, -79.075041];
      var b = [40.748765, -73.985806];
      assert.equal(1.60934*poly.getPointDist(a,b), poly.getPointDistKm(a, b));
    });
  });
});
