var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("lineSegment.intersects");

var ε = 1e-6;

suite.addBatch({
  "intersect box & segment": {
    topic: function() {
      smash.load(["src/index.js"], "tree", {console: console}, this.callback);
    },

    //
    // A---+
    // |   |
    // |   |
    // |   |
    // +---B
    //
    // C---D
    //
    // Note: depends on the bounding box not intersecting!
    //
    "returns false for a line segment outside the box": function(_) {
      assert.equal(_.lineSegment(0, 1 + ε, 1, 1 + ε).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(0, 2, 1, 2).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(0, -ε, 1, -ε).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(0, -1, 1, -1).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(-1, 0, -1, 1).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(2, 0, 2, 1).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(1, -ε, 0, -ε).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(1 + ε, 0, 1 + ε, 1).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(1 + ε, 1, 1 + ε, 0).box().intersects(_.box(0, 0, 1, 1)), false);
      assert.equal(_.lineSegment(1 + ε, 0, 2, 0).box().intersects(_.box(0, 0, 1, 1)), false);
    },

    //
    // A---+
    // |   |
    // C---D
    // |   |
    // +---B
    //
    "returns true for a line segment inside the box": function(_) {
      assert.equal(_.lineSegment(0, ε, 1, ε).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(0, .5, 1, .5).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(.5, 0, .5, 1).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(0, 0, 1, 1).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(ε, ε, 1 - ε, 1 - ε).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(-ε, -ε, 1 + ε, 1 + ε).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1, 1, 0, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(0, 1, 1, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1, 0, 0, 1).intersects(_.box(0, 0, 1, 1)), true);
    },

    //
    // AC--D
    // |   |
    // |   |
    // +---B
    //
    "returns true for a line segment adjacent to a box edge": function(_) {
      assert.equal(_.lineSegment(0, 0, 1, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(0, ε, 1, ε).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1, 0, 0, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1, ε, 0, ε).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1, 0, 1, 1).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1 - ε, 0, 1 - ε, 1).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1, 1, 1, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1 - ε, 1, 1 - ε, 0).intersects(_.box(0, 0, 1, 1)), true);
    },

    //
    // A---C---D
    // |   |
    // |   |
    // +---B
    //
    "returns true for a line segment touching a box corner": function(_) {
      assert.equal(_.lineSegment(1, 0, 2, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(0, 0, -1, 0).intersects(_.box(0, 0, 1, 1)), true);
      assert.equal(_.lineSegment(1 - ε, 0, 2, 0).intersects(_.box(0, 0, 1, 1)), true);
    }
  },

  "intersect segments": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment", {console: console}, this.callback);
    },

    //
    // A   C
    // |   |
    // |   |
    // |   |
    // B   D
    //
    // Note: depends on the bounding box not intersecting!
    //
    "returns false for two line segments with a separating axis": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(1, 0, 1, 1).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(ε, 0, ε, 1).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(-1, 0, -1, 1).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(-ε, 0, -ε, 1).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(0, -1, 1, -1).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(0, -ε, 1, -ε).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(0, 1 + ε, 1, 1 + ε).box()), false);
      assert.equal(lineSegment(0, 0, 0, 1).box().intersects(lineSegment(0, 2, 1, 2).box()), false);
      assert.equal(lineSegment(0, 0, 1, 1).box().intersects(lineSegment(0, 3, 1, 2).box()), false);
    },

    //
    // A  D
    //  \ |
    //   \C
    //    \
    //     \
    //      B
    //
    "returns false for two non-intersecting line segments without a separating axis": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 2, 2).intersects(lineSegment(1, 0, 1, 1 - ε)), false);
    },

    //
    // A  D
    //  \ |
    //   \|
    //    C
    //     \
    //      B
    //
    "returns true for two line segments that touch at a point along a segment": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 2, 2).intersects(lineSegment(1, 0, 1, 1)), true);
      assert.equal(lineSegment(1, 0, 1, 1).intersects(lineSegment(0, 0, 2, 2)), true);
    },

    //
    // A---BC---D
    //
    "returns true for two line segments that share an endpoint": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, 0, -1, 0)), true);
      assert.equal(lineSegment(0, 0, -1, 0).intersects(lineSegment(0, 0, 0, 1)), true);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, 1, 0, 2)), true);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, 1, 1, 1)), true);
      assert.equal(lineSegment(0, 1, 0, 2).intersects(lineSegment(0, 0, 0, 1)), true);
      assert.equal(lineSegment(0, 1, 1, 1).intersects(lineSegment(0, 0, 0, 1)), true);
    },

    //
    // A---C---B---D
    //
    "returns true for two line segments that are collinear and touch at one point": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 1, 0).intersects(lineSegment(1, 0, 2, 0)), true);
    },

    //
    // A---C---B---D
    //
    "returns true for two line segments that are collinear and overlap": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 3, 0).intersects(lineSegment(1, 0, 2, 0)), true);
      assert.equal(lineSegment(0, 0, 3, 0).intersects(lineSegment(2, 0, 1, 0)), true);
      assert.equal(lineSegment(3, 0, 0, 0).intersects(lineSegment(1, 0, 2, 0)), true);
      assert.equal(lineSegment(3, 0, 0, 0).intersects(lineSegment(2, 0, 1, 0)), true);
      assert.equal(lineSegment(0, 0, 1, 0).intersects(lineSegment(1 - ε, 0, 2, 0)), true);
    },

    //
    // A---B   C---D
    //
    // Note: depends on the bounding box not intersecting!
    //
    "returns false for two line segments that are collinear and overlap": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 1, 0).box().intersects(lineSegment(1 + ε, 0, 2, 0).box()), false);
      assert.equal(lineSegment(0, 0, 1, 0).box().intersects(lineSegment(2, 0, 1 + ε, 0).box()), false);
    },

    //
    // C  A---B
    //  \
    //   \
    //    \
    //     D
    //
    "returns false for two line segments where three points are collinear but the segments do not overlap": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 2, 2).intersects(lineSegment(1, 0, 2, 0)), false);
    },

    //
    // A  D
    //  \ |
    //   \|
    //    +
    //    C\
    //      B
    //
    "returns true for two line segments that cross": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 2, 2).intersects(lineSegment(1, 0, 1, 1 + ε)), true);
      assert.equal(lineSegment(0, 0, 2, 2).intersects(lineSegment(1, 1 + ε, 1, 0)), true);
      assert.equal(lineSegment(2, 2, 0, 0).intersects(lineSegment(1, 0, 1, 1 + ε)), true);
      assert.equal(lineSegment(2, 2, 0, 0).intersects(lineSegment(1, 1 + ε, 1, 0)), true);
    }
  }
});

suite.export(module);
