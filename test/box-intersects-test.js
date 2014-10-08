var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("box.intersects");

var ε = 1e-6;

suite.addBatch({
  "intersect boxes": {
    topic: function() {
      smash.load(["src/box.js"], "box", {console: console}, this.callback);
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
  }
});

suite.export(module);
