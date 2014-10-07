var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("intersectSegmentSegment");

var ε = 1e-6;

suite.addBatch({
  "intersectSegmentSegment": {
    topic: function() {
      smash.load(["src/intersect-segment-segment.js"], "intersectSegmentSegment", {console: console}, this.callback);
    },

    //
    // A   C
    // |   |
    // |   |
    // |   |
    // B   D
    //
    "returns false for two line segments with a separating axis": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [1, 0], [1, 1]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [ε, 0], [ε, 1]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [-1, 0], [-1, 1]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [-ε, 0], [-ε, 1]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, -1], [1, -1]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, -ε], [1, -ε]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, 1 + ε], [1, 1 + ε]), false);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, 2], [1, 2]), false);
      assert.equal(intersectSegmentSegment([0, 0], [1, 1], [0, 3], [1, 2]), false);
    },

    //
    // A  D
    //  \ |
    //   \C
    //    \
    //     \
    //      B
    //
    "returns false for two non-intersecting line segments without a separating axis": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [2, 2], [1, 0], [1, 1 - ε]), false);
    },

    //
    // A  D
    //  \ |
    //   \|
    //    C
    //     \
    //      B
    //
    "returns true for two line segments that touch at a point along a segment": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [2, 2], [1, 0], [1, 1]), true);
      assert.equal(intersectSegmentSegment([1, 0], [1, 1], [0, 0], [2, 2]), true);
    },

    //
    // A---BC---D
    //
    "returns true for two line segments that share an endpoint": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, 0], [-1, 0]), true);
      assert.equal(intersectSegmentSegment([0, 0], [-1, 0], [0, 0], [0, 1]), true);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, 1], [0, 2]), true);
      assert.equal(intersectSegmentSegment([0, 0], [0, 1], [0, 1], [1, 1]), true);
      assert.equal(intersectSegmentSegment([0, 1], [0, 2], [0, 0], [0, 1]), true);
      assert.equal(intersectSegmentSegment([0, 1], [1, 1], [0, 0], [0, 1]), true);
    },

    //
    // A---C---B---D
    //
    "returns true for two line segments that are collinear and touch at one point": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [1, 0], [1, 0], [2, 0]), true);
    },

    //
    // A---C---B---D
    //
    "returns true for two line segments that are collinear and overlap": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [3, 0], [1, 0], [2, 0]), true);
      assert.equal(intersectSegmentSegment([0, 0], [3, 0], [2, 0], [1, 0]), true);
      assert.equal(intersectSegmentSegment([3, 0], [0, 0], [1, 0], [2, 0]), true);
      assert.equal(intersectSegmentSegment([3, 0], [0, 0], [2, 0], [1, 0]), true);
      assert.equal(intersectSegmentSegment([0, 0], [1, 0], [1 - ε, 0], [2, 0]), true);
    },

    //
    // A---B   C---D
    //
    "returns false for two line segments that are collinear and overlap": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [1, 0], [1 + ε, 0], [2, 0]), false);
      assert.equal(intersectSegmentSegment([0, 0], [1, 0], [2, 0], [1 + ε, 0]), false);
    },

    //
    // C  A---B
    //  \
    //   \
    //    \
    //     D
    //
    "returns false for two line segments where three points are collinear but the segments do not overlap": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [2, 2], [1, 0], [2, 0]), false);
    },

    //
    // A  D
    //  \ |
    //   \|
    //    +
    //    C\
    //      B
    //
    "returns true for two line segments that cross": function(intersectSegmentSegment) {
      assert.equal(intersectSegmentSegment([0, 0], [2, 2], [1, 0], [1, 1 + ε]), true);
      assert.equal(intersectSegmentSegment([0, 0], [2, 2], [1, 1 + ε], [1, 0]), true);
      assert.equal(intersectSegmentSegment([2, 2], [0, 0], [1, 0], [1, 1 + ε]), true);
      assert.equal(intersectSegmentSegment([2, 2], [0, 0], [1, 1 + ε], [1, 0]), true);
    }
  }
});

suite.export(module);
