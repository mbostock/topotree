var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("box.merge");

var ε = 1e-6;

suite.addBatch({
  "box.merge": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment", {console: console}, this.callback);
    },

    "children is the two child nodes": function(lineSegment) {
      var b0 = lineSegment(0, 0, 1, 1).box(),
          b1 = lineSegment(1, 2, 3, 4).box();
      assert.deepEqual([b0, b1], b0.merge(b1).children);
    },

    "merges the bounding box of the two children": function(lineSegment) {
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 0, 1, 1).box().merge(lineSegment(1, 2, 3, 4).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 2, 3, 4).box().merge(lineSegment(0, 0, 1, 1).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 0, 3, 4).box().merge(lineSegment(1, 2, 1, 1).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 2, 1, 1).box().merge(lineSegment(0, 0, 3, 4).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 4, 3, 0).box().merge(lineSegment(1, 2, 1, 1).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 1, 1, 2).box().merge(lineSegment(0, 0, 3, 4).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(0, 4, 3, 0).box().merge(lineSegment(1, 1, 1, 2).box())));
      assert.deepEqual([0, 0, 3, 4], extent(lineSegment(1, 1, 1, 2).box().merge(lineSegment(0, 4, 3, 0).box())));
    }
  }
});

function extent(lineSegment) {
  return [lineSegment.x0, lineSegment.y0, lineSegment.x1, lineSegment.y1];
}

suite.export(module);
