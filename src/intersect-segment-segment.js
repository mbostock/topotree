import "ccw";

// Returns true if the line segments AB and CD intersect.
function intersectSegmentSegment(a, b, c, d) {
  var a0 = a[0], a1 = a[1],
      b0 = b[0], b1 = b[1],
      c0 = c[0], c1 = c[1],
      d0 = d[0], d1 = d[1],
      s;

  // Computing bounding box of AB and CD.
  if (a0 > b0) s = a0, a0 = b0, b0 = s;
  if (a1 > b1) s = a1, a1 = b1, b1 = s;
  if (c0 > d0) s = c0, c0 = d0, d0 = s;
  if (c1 > d1) s = c1, c1 = d1, d1 = s;

  return !(c0 > b0 || d0 < a0 || c1 > b1 || d1 < a1)
      && !((s = ccw(b, c, d)) && s > 0 === ccw(a, c, d) > 0)
      && !((s = ccw(a, b, d)) && s > 0 === ccw(a, b, c) > 0);
}
