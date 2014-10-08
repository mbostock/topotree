var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("box.merge");

suite.addBatch({
  "box.merge": {
    topic: function() {
      smash.load(["src/box.js"], "box", {console: console}, this.callback);
    },

    "children is the two child nodes": function(box) {
      var b0 = box(0, 0, 1, 1, []),
          b1 = box(1, 2, 3, 4, []);
      assert.deepEqual([b0, b1], b0.merge(b1).children);
    },

    "merges the bounding box of the two children": function(box) {
      assert.deepEqual([0, 0, 3, 4], extent(box(0, 0, 1, 1, []).merge(box(1, 2, 3, 4, []))));
      assert.deepEqual([0, 0, 3, 4], extent(box(0, 0, 3, 4, []).merge(box(1, 1, 1, 2, []))));
      assert.deepEqual([0, 0, 3, 4], extent(box(1, 2, 3, 4, []).merge(box(0, 0, 1, 1, []))));
      assert.deepEqual([0, 0, 3, 4], extent(box(1, 1, 1, 2, []).merge(box(0, 0, 3, 4, []))));
    },

    "merges in-place when the bounding box of this subsumes that": function(box) {
      var b0 = box(0, 0, 3, 3, []),
          b1 = box(1, 1, 2, 2, []);
      assert.deepEqual(b0, b0.merge(b1));
      assert.deepEqual([b1], b0.children);
    },

    "merges in-place when the bounding box of that subsumes this": function(box) {
      var b0 = box(0, 0, 3, 3, []),
          b1 = box(1, 1, 2, 2, []);
      assert.deepEqual(b0, b1.merge(b0));
      assert.deepEqual([b1], b0.children);
    }
  }
});

function extent(box) {
  return [box.x0, box.y0, box.x1, box.y1];
}

suite.export(module);
