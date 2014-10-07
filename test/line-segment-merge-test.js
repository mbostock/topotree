var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("lineSegment.merge");

var ε = 1e-6;

suite.addBatch({
  "lineSegment.merge": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment", {console: console}, this.callback);
    },

    "children is the two child nodes": function(lineSegment) {
      var l0 = lineSegment(0, 0, 1, 1),
          l1 = lineSegment(1, 2, 3, 4);
      assert.deepEqual([l0, l1], l0.merge(l1).children);
    },

    "merges the bounding box of the two children": function(lineSegment) {
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 0, 1, 1).merge(lineSegment(1, 2, 3, 4))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 2, 3, 4).merge(lineSegment(0, 0, 1, 1))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 0, 3, 4).merge(lineSegment(1, 2, 1, 1))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 2, 1, 1).merge(lineSegment(0, 0, 3, 4))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 4, 3, 0).merge(lineSegment(1, 2, 1, 1))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 1, 1, 2).merge(lineSegment(0, 0, 3, 4))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 4, 3, 0).merge(lineSegment(1, 1, 1, 2))));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 1, 1, 2).merge(lineSegment(0, 4, 3, 0))));
    }
  }
});

function extent(lineSegment) {
  return [lineSegment.x0, lineSegment.y0, lineSegment.x1, lineSegment.y1];
}

suite.export(module);
