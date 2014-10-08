var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("tree.search");

var ε = 1e-6;

suite.addBatch({
  "tree.search": {
    topic: function() {
      smash.load(["src/index.js"], "tree", {console: console}, this.callback);
    },

    "returns the nearest leaf node to the given point": function(tree) {
      var t = tree.fromLine([[0, 0], [0, 1], [1, 1]]),
          l0 = tree.lineSegment(0, 0, 0, 1), // TODO a better API
          l1 = tree.lineSegment(0, 1, 1, 1);
      assert.deepEqual(t.search(nearest([0, -1])), l0);
      assert.deepEqual(t.search(nearest([0, 0])), l0);
      assert.deepEqual(t.search(nearest([0, .5])), l0);
      assert.deepEqual(t.search(nearest([.5, .5 - ε])), l0);
      assert.deepEqual(t.search(nearest([.5, .5 + ε])), l1);
      assert.deepEqual(t.search(nearest([1, 1])), l1);
    }
  }
});

function nearest(point) {
  return function(node) {
    return node.distance(point);
  };
}

suite.export(module);
