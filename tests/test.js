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
    it('should correctly extraplate when the proportion is over one', function() {
      var poly = new Polyline([[0,0], [100,100]]);
      assert.deepEqual([150, 150], poly.getPointAtProp(1.5));
    });
  });

  describe('#getTotalDist()', function() {
    it('should return 0 if there is only one coordinate', function() {
      var poly = new Polyline([[10, 10]]);
      assert.equal(0, poly.getTotalDist());
    });
    it('should return the correct distance if there are more than one coordinate', function() {
      var poly = new Polyline([[0,0], [0,10], [10, 10]]);
      assert.equal(20, poly.getTotalDist());
    });
  });
});
