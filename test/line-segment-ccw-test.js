var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("lineSegment_ccw");

suite.addBatch({
  "lineSegment_ccw": {
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
