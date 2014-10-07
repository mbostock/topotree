var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("tree.intersections");

var ε = 1e-6;

suite.addBatch({
  "tree.intersections": {
    topic: function() {
      smash.load(["src/tree.js", "src/line-segment.js"], "{tree: tree, lineSegment: lineSegment}", {console: console}, this.callback);
    },

    "returns the leaf nodes that intersect the specified node": function(_) {
      var l0 = _.lineSegment(0, 0, 1, 1),
          l1 = _.lineSegment(1, 2, 3, 4),
          t = _.tree([l0, l1]);
      assert.deepEqual([], t.intersections(_.lineSegment(0, 1, 0, 2)).sort(leafOrder));
      assert.deepEqual([l0], t.intersections(_.lineSegment(0, 0, 4, 4)).sort(leafOrder));
      assert.deepEqual([l0, l1], t.intersections(_.lineSegment(0, 0, 3, 4)).sort(leafOrder));
    }
  }
});

function leafOrder(a, b) {
  return a.xa - b.xa || a.ya - b.ya || a.xb - b.xb || a.yb - b.yb;
}

suite.export(module);
