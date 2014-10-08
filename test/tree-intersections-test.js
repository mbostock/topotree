var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("tree.intersections");

var ε = 1e-6;

suite.addBatch({
  "tree.intersections": {
    topic: function() {
      smash.load(["src/index.js"], "tree", {console: console}, this.callback);
    },

    "returns the leaf nodes that intersect the specified node": function(tree) {
      var t = tree.fromLine([[0, 0], [1, 1], [3, 4]]),
          l0 = tree.lineSegment(0, 0, 1, 1), // TODO a better API
          l1 = tree.lineSegment(1, 1, 3, 4);
      assert.deepEqual(t.intersections(tree.lineSegment(0, 1, 0, 2)).sort(leafOrder), []);
      assert.deepEqual(t.intersections(tree.lineSegment(1, 0, 0, 1)).sort(leafOrder), [l0]);
      assert.deepEqual(t.intersections(tree.lineSegment(0, 0, 3, 4)).sort(leafOrder), [l0, l1]);
    }
  }
});

function leafOrder(a, b) {
  return a.xa - b.xa || a.ya - b.ya || a.xb - b.xb || a.yb - b.yb;
}

suite.export(module);
