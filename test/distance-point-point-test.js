var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("distancePointPoint");

suite.addBatch({
  "distancePointPoint": {
    topic: function() {
      smash.load(["src/distance-point-point.js"], "distancePointPoint", {console: console}, this.callback);
    },

    //
    // A   B
    //
    "returns the squared distance between two points": function(distancePointPoint) {
      assert.equal(distancePointPoint([0, 0], [0, 1]), 1);
      assert.equal(distancePointPoint([0, -1], [0, 1]), 4);
      assert.equal(distancePointPoint([1, 2], [3, 4]), 8);
    },

    //
    // AB
    //
    "returns zero for two coincident points": function(distancePointPoint) {
      assert.equal(distancePointPoint([0, 0], [0, 0]), 0);
    }
  }
});

suite.export(module);
