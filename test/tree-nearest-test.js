var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("tree.nearest");

var ε = 1e-6;

suite.addBatch({
  "tree.nearest": {
    topic: function() {
      smash.load(["src/index.js"], "tree", {console: console}, this.callback);
    },

    "returns the nearest leaf node to the given point": function(tree) {
      var t = tree.fromLine([[0, 0], [0, 1], [1, 1]]),
          l0 = tree.lineSegment(0, 0, 0, 1), // TODO a better API
          l1 = tree.lineSegment(0, 1, 1, 1);
      assert.deepEqual(l0, t.nearest([0, -1]));
      assert.deepEqual(l0, t.nearest([0, 0]));
      assert.deepEqual(l0, t.nearest([0, .5]));
      assert.deepEqual(l0, t.nearest([.5, .5 - ε]));
      assert.deepEqual(l1, t.nearest([.5, .5 + ε]));
      assert.deepEqual(l1, t.nearest([1, 1]));
    }
  }
});

suite.export(module);
