var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("lineSegment");

suite.addBatch({
  "lineSegment": {
    topic: function() {
      smash.load(["src/line-segment.js"], "lineSegment", {console: console}, this.callback);
    },

    "stores the coordinates as [xa, ya] -> [xb, yb]": function(lineSegment) {
      var seg = lineSegment(1, 2, 3, 4);
      assert.equal(seg.xa, 1);
      assert.equal(seg.ya, 2);
      assert.equal(seg.xb, 3);
      assert.equal(seg.yb, 4);
    },

    "box returns the bounding box": function(lineSegment) {
      var box = lineSegment(4, 3, 2, 1).box();
      assert.equal(box.x0, 2);
      assert.equal(box.y0, 1);
      assert.equal(box.x1, 4);
      assert.equal(box.y1, 3);
    }
  }
});

suite.export(module);
