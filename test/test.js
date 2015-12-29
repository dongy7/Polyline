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
    it('should correctly extraplate when the proportion is over one', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([150, 150], poly.getPointAtProp(1.5));
    });
    it('should return correct point when there more than two points', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([50, 50], poly.getPointAtProp(0.5));
    });
    it('should return correct point when there more than two points for any point', function() {
      var poly = new Polyline([[0,0], [20,20], [40, 40], [60, 60], [80,80], [100, 100]]);
      assert.deepEqual([70,70], poly.getPointAtProp(0.7));
    });
    it('should return correct point when there more than two points for reverse', function() {
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
    it('should return the correct point when path is not straight and reversed', function() {
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
});
