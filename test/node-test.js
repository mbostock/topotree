var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("node");

var ε = 1e-6;

suite.addBatch({
  "node": {
    topic: function() {
      smash.load(["src/node.js", "src/leaf.js"], "{Node: Node, Leaf: Leaf}", {console: console}, this.callback);
    },

    "children is the two child nodes": function(_) {
      var l0 = new _.Leaf([0, 0], [1, 1]),
          l1 = new _.Leaf([1, 2], [3, 4]);
      assert.deepEqual([l0, l1], new _.Node(l0, l1).children);
    },

    "extent is the combined bounding box of the two children": function(_) {
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([0, 0], [1, 1]), new _.Leaf([1, 2], [3, 4])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([1, 2], [3, 4]), new _.Leaf([0, 0], [1, 1])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([0, 0], [3, 4]), new _.Leaf([1, 2], [1, 1])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([1, 2], [1, 1]), new _.Leaf([0, 0], [3, 4])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([0, 4], [3, 0]), new _.Leaf([1, 2], [1, 1])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([1, 1], [1, 2]), new _.Leaf([0, 0], [3, 4])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([0, 4], [3, 0]), new _.Leaf([1, 1], [1, 2])).extent);
      assert.deepEqual([[0, 0], [3, 4]], new _.Node(new _.Leaf([1, 1], [1, 2]), new _.Leaf([0, 4], [3, 0])).extent);
    },

    "leafNearestToPoint returns the leaf nearest to the specified point": function(_) {
      var l0 = new _.Leaf([0, 0], [1, 1]),
          l1 = new _.Leaf([1, 2], [3, 4]),
          n = new _.Node(l0, l1);
      assert.deepEqual(l0, n.leafNearestToPoint([0, -1]));
      assert.deepEqual(l0, n.leafNearestToPoint([0, 0]));
      assert.deepEqual(l0, n.leafNearestToPoint([0, .5]));
      assert.deepEqual(l0, n.leafNearestToPoint([1, 1.5 - ε]));
      assert.deepEqual(l1, n.leafNearestToPoint([1, 1.5 + ε]));
      assert.deepEqual(l1, n.leafNearestToPoint([1, 2]));
    },

    "leavesIntersectingSegment returns the leaves that intersect the specified line segment": function(_) {
      var l0 = new _.Leaf([0, 0], [1, 1]),
          l1 = new _.Leaf([1, 2], [3, 4]),
          n = new _.Node(l0, l1);
      assert.deepEqual([], n.leavesIntersectingSegment([0, 1], [0, 2]).sort(leafOrder));
      assert.deepEqual([l0], n.leavesIntersectingSegment([0, 0], [4, 4]).sort(leafOrder));
      assert.deepEqual([l0, l1], n.leavesIntersectingSegment([0, 0], [3, 4]).sort(leafOrder));
    }
  }
});

function leafOrder(a, b) {
  return a.coordinates[0][0] - b.coordinates[0][0]
      || a.coordinates[0][1] - b.coordinates[0][1]
      || a.coordinates[1][0] - b.coordinates[1][0]
      || a.coordinates[1][1] - b.coordinates[1][1];
}

suite.export(module);
