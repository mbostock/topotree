var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("ccw");

suite.addBatch({
  "ccw": {
    topic: function() {
      smash.load(["src/ccw.js"], "ccw", {}, this.callback);
    },
    "returns zero for three coincident points": function(ccw) {
      assert.equal(ccw([0, 0], [0, 0], [0, 0]), 0);
    }
  }
});

suite.export(module);
