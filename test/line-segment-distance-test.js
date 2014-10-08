var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("lineSegment.distance");

var ε = 1e-6;

suite.addBatch({
  "lineSegment.distance": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment", {console: console}, this.callback);
    },

    //
    // A---C---B
    //
    "returns zero for a point along the segment": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, ε]), 0);
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, .5]), 0);
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, 1 - ε]), 0);
      assert.equal(lineSegment(0, 0, 1, 0).distance([ε, 0]), 0);
      assert.equal(lineSegment(0, 0, 1, 0).distance([.5, 0]), 0);
      assert.equal(lineSegment(0, 0, 1, 0).distance([1 - ε, 0]), 0);
    },

    //
    // A------BC
    //
    "returns zero for a point at a segment endpoint": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, 0]), 0);
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, ε]), 0);
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, 1]), 0);
      assert.equal(lineSegment(0, 0, 0, 1).distance([0, 1 - ε]), 0);
      assert.equal(lineSegment(0, 0, 1, 0).distance([0, 0]), 0);
      assert.equal(lineSegment(0, 0, 1, 0).distance([1, 0]), 0);
    },

    //
    //     C
    // A-------B
    //
    "returns the squared distance for a point closest to the edge": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 4).distance([1, 2]), 1);
      assert.equal(lineSegment(0, 0, 0, 4).distance([-1, 2]), 1);
      assert.equal(lineSegment(0, 0, 0, 10).distance([2, 5]), 4);
      assert.equal(lineSegment(0, 0, 0, 10).distance([-2, 5]), 4);
    },

    //
    //           C
    // A-------B
    //
    "returns the squared distance for a point closest to an endpoint": function(lineSegment) {
      assert.equal(lineSegment(0, 0, 0, 10).distance([0, 11]), 1);
      assert.equal(lineSegment(0, 0, 0, 10).distance([1, 11]), 2);
      assert.equal(lineSegment(0, 0, 0, 10).distance([-1, 11]), 2);
      assert.equal(lineSegment(0, 0, 0, 10).distance([0, -1]), 1);
      assert.equal(lineSegment(0, 0, 0, 10).distance([1, -1]), 2);
      assert.equal(lineSegment(0, 0, 0, 10).distance([-1, -1]), 2);
    }
  }
});

suite.export(module);
