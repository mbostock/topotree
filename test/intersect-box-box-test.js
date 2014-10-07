var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("intersectBoxBox");

var ε = 1e-6;

suite.addBatch({
  "intersectBoxBox": {
    topic: function() {
      smash.load(["src/intersect-box-box.js"], "intersectBoxBox", {console: console}, this.callback);
    },

    //
    // A---+ C---+
    // |   | |   |
    // |   | |   |
    // |   | |   |
    // +---B +---D
    //
    "returns false for non-overlapping boxes": function(intersectBoxBox) {
      assert.equal(intersectBoxBox([0, 0], [1, 1], [2, 0], [2, 1]), false);
      assert.equal(intersectBoxBox([0, 0], [1, 1], [1 + ε, 0], [1 + ε, 1]), false);
    },

    //
    // A--C-+--+
    // |  | |  |
    // |  | |  |
    // |  | |  |
    // +--+-B--D
    //
    "returns true for overlapping boxes": function(intersectBoxBox) {
      assert.equal(intersectBoxBox([0, 0], [1, 1], [1 - ε, 0], [1 - ε, 1]), true);
    },

    //
    // A---C---+
    // |   |   |
    // |   |   |
    // |   |   |
    // +---B---D
    //
    "returns true for boxes that share an edge": function(intersectBoxBox) {
      assert.equal(intersectBoxBox([0, 0], [1, 1], [1, 0], [2, 1]), true);
      assert.equal(intersectBoxBox([0, 0], [1, 1], [0, 1], [1, 2]), true);
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
    "returns true for boxes that share a corner": function(intersectBoxBox) {
      assert.equal(intersectBoxBox([0, 0], [1, 1], [1, 1], [2, 2]), true);
      assert.equal(intersectBoxBox([0, 0], [1, 1], [1, -1], [2, 0]), true);
    }
  }
});

suite.export(module);
