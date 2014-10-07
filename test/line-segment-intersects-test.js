var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("lineSegment.intersects");

var ε = 1e-6;

suite.addBatch({
  "intersect boxes": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment_box", {console: console}, this.callback);
    },

    //
    // A---+ C---+
    // |   | |   |
    // |   | |   |
    // |   | |   |
    // +---B +---D
    //
    "returns false for non-overlapping boxes": function(box) {
      assert.equal(box(0, 0, 1, 1).intersects(box(2, 0, 2, 1)), false);
      assert.equal(box(0, 0, 1, 1).intersects(box(1 + ε, 0, 1 + ε, 1)), false);
    },

    //
    // A--C-+--+
    // |  | |  |
    // |  | |  |
    // |  | |  |
    // +--+-B--D
    //
    "returns true for overlapping boxes": function(box) {
      assert.equal(box(0, 0, 1, 1).intersects(box(1 - ε, 0, 1 - ε, 1)), true);
    },

    //
    // A---C---+
    // |   |   |
    // |   |   |
    // |   |   |
    // +---B---D
    //
    "returns true for boxes that share an edge": function(box) {
      assert.equal(box(0, 0, 1, 1).intersects(box(1, 0, 2, 1)), true);
      assert.equal(box(0, 0, 1, 1).intersects(box(0, 1, 1, 2)), true);
    },

    //
    // A---+
    // |   |
    // |   |
    // |   |
    // +--CB---+
    //     |   |
    //     |   |
    //     |   |
    //     +---D
    //
    "returns true for boxes that share a corner": function(box) {
      assert.equal(box(0, 0, 1, 1).intersects(box(1, 1, 2, 2)), true);
      assert.equal(box(0, 0, 1, 1).intersects(box(1, -1, 2, 0)), true);
    }
  },

  "intersect box & segment": {
    topic: function() {
      smash.load(["src/line-segment.js"], "{lineSegment: lineSegment, box: lineSegment_box}", {console: console}, this.callback);
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
    "returns false for a line segment outside the box": function(_) {
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, 1 + ε, 1, 1 + ε)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, 2, 1, 2)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, -ε, 1, -ε)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, -1, 1, -1)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(-1, 0, -1, 1)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(2, 0, 2, 1)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, -ε, 0, -ε)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1 + ε, 0, 1 + ε, 1)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1 + ε, 1, 1 + ε, 0)), false);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1 + ε, 0, 2, 0)), false);
    },

    //
    // A---+
    // |   |
    // C---D
    // |   |
    // +---B
    //
    "returns true for a line segment inside the box": function(_) {
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, ε, 1, ε)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, .5, 1, .5)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(.5, 0, .5, 1)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, 0, 1, 1)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(ε, ε, 1 - ε, 1 - ε)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(-ε, -ε, 1 + ε, 1 + ε)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, 1, 0, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, 1, 1, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, 0, 0, 1)), true);
    },

    //
    // AC--D
    // |   |
    // |   |
    // +---B
    //
    "returns true for a line segment adjacent to a box edge": function(_) {
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, 0, 1, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, ε, 1, ε)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, 0, 0, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, ε, 0, ε)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, 0, 1, 1)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1 - ε, 0, 1 - ε, 1)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, 1, 1, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1 - ε, 1, 1 - ε, 0)), true);
    },

    //
    // A---C---D
    // |   |
    // |   |
    // +---B
    //
    "returns true for a line segment touching a box corner": function(_) {
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1, 0, 2, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(0, 0, -1, 0)), true);
      assert.equal(_.box(0, 0, 1, 1).intersects(_.lineSegment(1 - ε, 0, 2, 0)), true);
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
    "returns false for two line segments with a separating axis": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(1, 0, 1, 1)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(ε, 0, ε, 1)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(-1, 0, -1, 1)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(-ε, 0, -ε, 1)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, -1, 1, -1)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, -ε, 1, -ε)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, 1 + ε, 1, 1 + ε)), false);
      assert.equal(lineSegment(0, 0, 0, 1).intersects(lineSegment(0, 2, 1, 2)), false);
      assert.equal(lineSegment(0, 0, 1, 1).intersects(lineSegment(0, 3, 1, 2)), false);
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
    "returns false for two line segments that are collinear and overlap": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 1, 0).intersects(lineSegment(1 + ε, 0, 2, 0)), false);
      assert.equal(lineSegment(0, 0, 1, 0).intersects(lineSegment(2, 0, 1 + ε, 0)), false);
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
  },

  "counterclockwise": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment_ccw", {console: console}, this.callback);
    },

    "returns zero for three coincident points": function(ccw) {
      assert.equal(ccw(0, 0, 0, 0, 0, 0), 0);
      assert.equal(ccw(1, 1, 1, 1, 1, 1), 0);
      assert.equal(ccw(2, 1, 2, 1, 2, 1), 0);
      assert.equal(ccw(1, 2, 1, 2, 1, 2), 0);
    },

    "returns zero for three collinear points": function(ccw) {
      assert.equal(ccw(0, 0, 0, 1, 0, 2), 0);
      assert.equal(ccw(0, 0, 0, 2, 0, 1), 0);
      assert.equal(ccw(0, 0, 2, 0, 1, 0), 0);
      assert.equal(ccw(0, 0, 0, 0, 1, 0), 0);
    },

    //
    // A---B
    //  \  |
    //   \ |
    //    \|
    //     C
    //
    "returns a value less than zero for a clockwise triangle": function(ccw) {
      assert.ok(ccw(0, 0, 1, 0, 1, 1) < 0);
    },

    //
    //     C
    //    /|
    //   / |
    //  /  |
    // A---B
    //
    "returns a value greater than zero for a counterclockwise triangle": function(ccw) {
      assert.ok(ccw(0, 1, 1, 1, 1, 0) > 0);
    }
  }
});

suite.export(module);
