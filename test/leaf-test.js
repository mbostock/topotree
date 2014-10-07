var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("leaf");

suite.addBatch({
  "leaf": {
    topic: function() {
      smash.load(["src/leaf.js"], "Leaf", {console: console}, this.callback);
    },

    "coordinates is the line segment endpoints": function(Leaf) {
      assert.deepEqual(new Leaf([1, 2], [3, 4]).coordinates, [[1, 2], [3, 4]]);
    },

    "extent is the line segment bounding box": function(Leaf) {
      assert.deepEqual(new Leaf([1, 2], [3, 4]).extent, [[1, 2], [3, 4]]);
      assert.deepEqual(new Leaf([1, 4], [3, 2]).extent, [[1, 2], [3, 4]]);
      assert.deepEqual(new Leaf([3, 2], [1, 4]).extent, [[1, 2], [3, 4]]);
      assert.deepEqual(new Leaf([3, 4], [1, 2]).extent, [[1, 2], [3, 4]]);
    },

    "leafNearestToPoint returns the leaf": function(Leaf) {
      var l = new Leaf([1, 2], [3, 4]);
      assert.equal(l, l.leafNearestToPoint([0, 0]));
      assert.equal(l, l.leafNearestToPoint([0, 1]));
      assert.equal(l, l.leafNearestToPoint([2, 3]));
    },

    "leavesIntersectingSegment returns the single leaf when the line segments intersect": function(Leaf) {
      var l = new Leaf([0, 0], [1, 1]);
      assert.deepEqual([l], l.leavesIntersectingSegment([1, 0], [0, 1]));
    },

    "leavesIntersectingSegment returns the single leaf when the line segments share an endpoint": function(Leaf) {
      var l = new Leaf([0, 0], [1, 1]);
      assert.deepEqual([l], l.leavesIntersectingSegment([0, 0], [-1, 0]));
    },

    "leavesIntersectingSegment returns the empty array when the line segments do not intersect": function(Leaf) {
      var l = new Leaf([0, 0], [1, 1]);
      assert.deepEqual([], l.leavesIntersectingSegment([0, 1], [1, 2]));
    }
  }
});

suite.export(module);
