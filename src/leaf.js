import "intersect-segment-segment";

function Leaf(a, b) {
  var a0 = a[0], a1 = a[1],
      b0 = b[0], b1 = b[1],
      t;

  // Computing bounding box of AB.
  if (a0 > b0) t = a0, a0 = b0, b0 = t;
  if (a1 > b1) t = a1, a1 = b1, b1 = t;

  this.coordinates = [a, b];
  this.extent = [[a0, a1], [b0, b1]];
}

Leaf.prototype = {
  extent: null,
  coordinates: null,
  nearest: leaf_nearest,
  intersections: leaf_intersections
};

function leaf_intersections(a, b) {
  return intersectSegmentSegment(this.coordinates[0], this.coordinates[1], a, b) ? [this] : [];
}

function leaf_nearest() {
  return this;
}
