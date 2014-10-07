var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("tree.nearest");

var ε = 1e-6;

suite.addBatch({
  "tree.nearest": {
    topic: function() {
      smash.load(["src/tree.js", "src/line-segment.js"], "{tree: tree, lineSegment: lineSegment}", {console: console}, this.callback);
    },

    "returns the nearest leaf node to the given point": function(_) {
      var l0 = _.lineSegment(0, 0, 1, 1),
          l1 = _.lineSegment(1, 2, 3, 4),
          t = _.tree([l0, l1]);
      assert.deepEqual(l0, t.nearest([0, -1]));
      assert.deepEqual(l0, t.nearest([0, 0]));
      assert.deepEqual(l0, t.nearest([0, .5]));
      assert.deepEqual(l0, t.nearest([1, 1.5 - ε]));
      assert.deepEqual(l1, t.nearest([1, 1.5 + ε]));
      assert.deepEqual(l1, t.nearest([1, 2]));
    }
  }
});

suite.export(module);
