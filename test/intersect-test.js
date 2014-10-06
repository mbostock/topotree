var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("intersect");

suite.addBatch({
  "intersectBoxSegment": {
    topic: function() {
      smash.load(["src/intersect.js"], "intersectBoxSegment", {console: console}, this.callback);
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
    "returns false for a line segment outside the box": function(intersectBoxSegment) {
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 2], [1, 2]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, -1], [1, -1]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [-1, 0], [-1, 1]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [2, 0], [2, 1]), false);
    },

    //
    // A---+
    // |   |
    // C---D
    // |   |
    // +---B
    //
    "returns true for a line segment inside the box": function(intersectBoxSegment) {
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, .5], [1, .5]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [.5, 0], [.5, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 0], [1, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 1], [0, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 1], [1, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 0], [0, 1]), true);
    },

    //
    // AC--D
    // |   |
    // |   |
    // +---B
    //
    "returns true for a line segment adjacent to a box edge": function(intersectBoxSegment) {
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 0], [1, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 0], [0, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 0], [1, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 1], [1, 0]), true);
    }
  }
});

suite.export(module);
