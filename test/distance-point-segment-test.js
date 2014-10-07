var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("distancePointSegment");

var ε = 1e-6;

suite.addBatch({
  "distancePointSegment": {
    topic: function() {
      smash.load(["src/distance-point-segment.js"], "distancePointSegment", {console: console}, this.callback);
    },

    //
    // A---C---B
    //
    "returns zero for a point along the segment": function(distancePointSegment) {
      assert.equal(distancePointSegment([0, ε], [0, 0], [0, 1]), 0);
      assert.equal(distancePointSegment([0, .5], [0, 0], [0, 1]), 0);
      assert.equal(distancePointSegment([0, 1 - ε], [0, 0], [0, 1]), 0);
      assert.equal(distancePointSegment([ε, 0], [0, 0], [1, 0]), 0);
      assert.equal(distancePointSegment([.5, 0], [0, 0], [1, 0]), 0);
      assert.equal(distancePointSegment([1 - ε, 0], [0, 0], [1, 0]), 0);
    },

    //
    // A------BC
    //
    "returns zero for a point at a segment endpoint": function(distancePointSegment) {
      assert.equal(distancePointSegment([0, 0], [0, 0], [0, 1]), 0);
      assert.equal(distancePointSegment([0, 1], [0, 0], [0, 1]), 0);
      assert.equal(distancePointSegment([0, 0], [0, 0], [1, 0]), 0);
      assert.equal(distancePointSegment([1, 0], [0, 0], [1, 0]), 0);
    },

    //
    //     C
    // A-------B
    //
    "returns the squared distance for a point closest to the edge": function(distancePointSegment) {
      assert.equal(distancePointSegment([1, 2], [0, 0], [0, 4]), 1);
      assert.equal(distancePointSegment([-1, 2], [0, 0], [0, 4]), 1);
      assert.equal(distancePointSegment([2, 5], [0, 0], [0, 10]), 4);
      assert.equal(distancePointSegment([-2, 5], [0, 0], [0, 10]), 4);
    },

    //
    //           C
    // A-------B
    //
    "returns the squared distance for a point closest to an endpoint": function(distancePointSegment) {
      assert.equal(distancePointSegment([0, 11], [0, 0], [0, 10]), 1);
      assert.equal(distancePointSegment([1, 11], [0, 0], [0, 10]), 2);
      assert.equal(distancePointSegment([-1, 11], [0, 0], [0, 10]), 2);
      assert.equal(distancePointSegment([0, -1], [0, 0], [0, 10]), 1);
      assert.equal(distancePointSegment([1, -1], [0, 0], [0, 10]), 2);
      assert.equal(distancePointSegment([-1, -1], [0, 0], [0, 10]), 2);
    }
  }
});

suite.export(module);
