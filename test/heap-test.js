var smash = require("smash"),
    vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("heap");

suite.addBatch({
  "heap": {
    topic: function() {
      smash.load(["src/heap.js"], "heap", {console: console}, this.callback);
    },

    "size returns the number of elements in the heap": function(heap) {
      var h = heap(ascending);
      assert.equal(h.size(), 0);
      h.push("foo");
      assert.equal(h.size(), 1);
      h.push("foo");
      assert.equal(h.size(), 2);
      h.push("bar");
      assert.equal(h.size(), 3);
      h.pop();
      assert.equal(h.size(), 2);
      h.pop();
      assert.equal(h.size(), 1);
      h.pop();
      assert.equal(h.size(), 0);
      h.pop();
      assert.equal(h.size(), 0);
    },

    "push returns the size of the heap": function(heap) {
      var h = heap(ascending);
      assert.equal(h.push("foo"), 1);
      assert.equal(h.push("bar"), 2);
    },

    "pop returns the smallest element according to the specified comparator": function(heap) {
      var ha = heap(ascending),
          hd = heap(descending);
      ha.push("foo");
      ha.push("bar");
      hd.push("foo");
      hd.push("bar");
      assert.equal(ha.pop(), "bar");
      assert.equal(ha.pop(), "foo");
      assert.isUndefined(ha.pop());
      assert.equal(hd.pop(), "foo");
      assert.equal(hd.pop(), "bar");
      assert.isUndefined(hd.pop());
    },

    "pop returns undefined on an empty heap": function(heap) {
      assert.isUndefined(heap(ascending).pop());
    },

    "can sort a large array of numbers": function(heap) {
      var h = heap(ascending),
          n = 1e5,
          a = new Array(n),
          b;
      for (var i = 0; i < n; ++i) a[i] = i;
      shuffle(b = a.slice());
      for (var i = 0; i < n; ++i) h.push(b[i]);
      for (var i = 0; i < n; ++i) assert.equal(h.pop(), a[i]);
    }
  }
});

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m], array[m] = array[i], array[i] = t;
  }
  return array;
}

suite.export(module);
