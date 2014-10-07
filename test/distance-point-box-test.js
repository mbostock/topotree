var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("distancePointBox");

suite.addBatch({
  "distancePointBox": {
    topic: function() {
      smash.load(["src/distance-point-box.js"], "distancePointBox", {console: console}, this.callback);
    },

    //
    // A---+
    // |   |
    // | C |
    // |   |
    // +---B
    //
    "returns zero for a point inside the box": function(distancePointBox) {
      assert.equal(distancePointBox([.5, .5], [0, 0], [1, 1]), 0);
    },

    //
    // A---+
    // |   |
    // |   C
    // |   |
    // +---B
    //
    "returns zero for a point on the box edge": function(distancePointBox) {
      assert.equal(distancePointBox([1, .5], [0, 0], [1, 1]), 0);
    },

    //
    // A---+
    // |   |
    // |   | C
    // |   |
    // +---B
    //
    "returns the squared distance for a point closest to an edge": function(distancePointBox) {
      assert.equal(distancePointBox([-1, 0], [0, 0], [1, 1]), 1);
      assert.equal(distancePointBox([-1, .5], [0, 0], [1, 1]), 1);
      assert.equal(distancePointBox([-1, 1], [0, 0], [1, 1]), 1);
      assert.equal(distancePointBox([2, 0], [0, 0], [1, 1]), 1);
      assert.equal(distancePointBox([2, .5], [0, 0], [1, 1]), 1);
      assert.equal(distancePointBox([2, 1], [0, 0], [1, 1]), 1);
      assert.equal(distancePointBox([-2, 0], [0, 0], [1, 1]), 4);
      assert.equal(distancePointBox([-2, .5], [0, 0], [1, 1]), 4);
      assert.equal(distancePointBox([-2, 1], [0, 0], [1, 1]), 4);
      assert.equal(distancePointBox([3, 0], [0, 0], [1, 1]), 4);
      assert.equal(distancePointBox([3, .5], [0, 0], [1, 1]), 4);
      assert.equal(distancePointBox([3, 1], [0, 0], [1, 1]), 4);
    },

    //
    // A---+
    // |   |
    // |   |
    // |   |
    // +---B
    //       C
    //
    "returns the squared distance for a point closest to a corner": function(distancePointBox) {
      assert.equal(distancePointBox([2, 2], [0, 0], [1, 1]), 2);
      assert.equal(distancePointBox([3, 3], [0, 0], [1, 1]), 8);
      assert.equal(distancePointBox([2, -1], [0, 0], [1, 1]), 2);
      assert.equal(distancePointBox([-1, -1], [0, 0], [1, 1]), 2);
      assert.equal(distancePointBox([0, 0], [0, 0], [1, 1]), 0);
      assert.equal(distancePointBox([1, 1], [0, 0], [1, 1]), 0);
    }
  }
});

suite.export(module);
