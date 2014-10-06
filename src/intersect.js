import "ccw";

// Returns true if the bounding box AB intersects the line segment CD
// Note: assumes that a[0] <= b[0] and a[1] <= b[1].
function intersectBoxSegment(a, b, c, d) {
  var s, t;
  return !(c[0] > b[0] && d[0] > b[0]
        || c[0] < a[0] && d[0] < a[0]
        || c[1] > b[1] && d[1] > b[1]
        || c[1] < a[1] && d[1] < a[1])
      && (!(s = ccw(c, d, a))
        || !(t = ccw(c, d, b)) || t > 0 !== (s = s > 0)
        || !(t = ccw(c, d, [b[0], a[1]])) || t > 0 !== s
        || !(t = ccw(c, d, [a[0], b[1]])) || t > 0 !== s);
}

// Returns true if the line segments AB and CD intersect
// TODO: Assume overlapping bounding box so as to avoid recomputing it?
function intersectSegmentSegment(a, b, c, d) {
  var a0 = a[0],
      a1 = a[1],
      b0 = b[0],
      b1 = b[1],
      s;

  // Determine bounding box.
  if (a0 > b0) s = a0, a0 = b0, b0 = s;
  if (a1 > b1) s = a1, a1 = b1, b1 = s;

  // Bounding box check.
  if (c[0] > b0 && d[0] > b0
      || c[0] < a0 && d[0] < a0
      || c[1] > b1 && d[1] > b1
      || c[1] < a1 && d[1] < a1) return false;

  if ((s = ccw(b, c, d)) && s > 0 === ccw(a, c, d) > 0) return false;
  if ((s = ccw(a, b, d)) && s > 0 === ccw(a, b, c) > 0) return false;
  return true;
}
