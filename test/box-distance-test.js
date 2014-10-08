var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("box.distance");

suite.addBatch({
  "box.distance": {
    topic: function() {
      smash.load(["src/box.js"], "box", {console: console}, this.callback);
    },

    //
    // A---+
    // |   |
    // | C |
    // |   |
    // +---B
    //
    "returns zero for a point inside the box": function(box) {
      assert.equal(box(0, 0, 1, 1).distance([.5, .5]), 0);
    },

    //
    // A---+
    // |   |
    // |   C
    // |   |
    // +---B
    //
    "returns zero for a point on the box edge": function(box) {
      assert.equal(box(0, 0, 1, 1).distance([1, .5]), 0);
    },

    //
    // A---+
    // |   |
    // |   | C
    // |   |
    // +---B
    //
    "returns the squared distance for a point closest to an edge": function(box) {
      assert.equal(box(0, 0, 1, 1).distance([-1, 0]), 1);
      assert.equal(box(0, 0, 1, 1).distance([-1, .5]), 1);
      assert.equal(box(0, 0, 1, 1).distance([-1, 1]), 1);
      assert.equal(box(0, 0, 1, 1).distance([2, 0]), 1);
      assert.equal(box(0, 0, 1, 1).distance([2, .5]), 1);
      assert.equal(box(0, 0, 1, 1).distance([2, 1]), 1);
      assert.equal(box(0, 0, 1, 1).distance([-2, 0]), 4);
      assert.equal(box(0, 0, 1, 1).distance([-2, .5]), 4);
      assert.equal(box(0, 0, 1, 1).distance([-2, 1]), 4);
      assert.equal(box(0, 0, 1, 1).distance([3, 0]), 4);
      assert.equal(box(0, 0, 1, 1).distance([3, .5]), 4);
      assert.equal(box(0, 0, 1, 1).distance([3, 1]), 4);
    },

    //
    // A---+
    // |   |
    // |   |
    // |   |
    // +---B
    //       C
    //
    "returns the squared distance for a point closest to a corner": function(box) {
      assert.equal(box(0, 0, 1, 1).distance([2, 2]), 2);
      assert.equal(box(0, 0, 1, 1).distance([3, 3]), 8);
      assert.equal(box(0, 0, 1, 1).distance([2, -1]), 2);
      assert.equal(box(0, 0, 1, 1).distance([-1, -1]), 2);
      assert.equal(box(0, 0, 1, 1).distance([0, 0]), 0);
      assert.equal(box(0, 0, 1, 1).distance([1, 1]), 0);
    }
  }
});

suite.export(module);
