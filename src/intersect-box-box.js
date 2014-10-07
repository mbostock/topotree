import "ccw";

// Returns true if the bounding boxes AB and CD intersect.
// Note: assumes that a[0] <= b[0], a[1] <= b[1], c[0] <= d[0] and c[1] <= d[1].
function intersectBoxBox(a, b, c, d) {
  return !(c[0] > b[0] || d[0] < a[0] || c[1] > b[1] || d[1] < a[1]);
}
