import "intersect";

function Leaf(point0, point1) {
  this.coordinates = [point0, point1];
  this.extent = [
    [Math.min(point0[0], point1[0]), Math.min(point0[1], point1[1])],
    [Math.max(point0[0], point1[0]), Math.max(point0[1], point1[1])]
  ];
}

Leaf.prototype = {
  extent: null,
  coordinates: null,
  distance: leaf_distance,
  intersections: leaf_intersections
};

function leaf_intersections(a, b) {
  return intersectSegmentSegment(this.coordinates[0], this.coordinates[1], a, b) ? [this] : [];
}

function leaf_distance(point) {
  return pointLineSegmentDistance(point, this.coordinates[0], this.coordinates[1]);
}
