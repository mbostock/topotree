var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("intersectBoxSegment");

var ε = 1e-6;

suite.addBatch({
  "intersectBoxSegment": {
    topic: function() {
      smash.load(["src/intersect-box-segment.js"], "intersectBoxSegment", {console: console}, this.callback);
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
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 1 + ε], [1, 1 + ε]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 2], [1, 2]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, -ε], [1, -ε]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, -1], [1, -1]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [-1, 0], [-1, 1]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [2, 0], [2, 1]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, -ε], [0, -ε]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1 + ε, 0], [1 + ε, 1]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1 + ε, 1], [1 + ε, 0]), false);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1 + ε, 0], [2, 0]), false);
    },

    //
    // A---+
    // |   |
    // C---D
    // |   |
    // +---B
    //
    "returns true for a line segment inside the box": function(intersectBoxSegment) {
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, ε], [1, ε]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, .5], [1, .5]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [.5, 0], [.5, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 0], [1, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [ε, ε], [1 - ε, 1 - ε]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [-ε, -ε], [1 + ε, 1 + ε]), true);
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
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, ε], [1, ε]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 0], [0, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, ε], [0, ε]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 0], [1, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1 - ε, 0], [1 - ε, 1]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 1], [1, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1 - ε, 1], [1 - ε, 0]), true);
    },

    //
    // A---C---D
    // |   |
    // |   |
    // +---B
    //
    "returns true for a line segment touching a box corner": function(intersectBoxSegment) {
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1, 0], [2, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [0, 0], [-1, 0]), true);
      assert.equal(intersectBoxSegment([0, 0], [1, 1], [1 - ε, 0], [2, 0]), true);
    }
  }
});

suite.export(module);
