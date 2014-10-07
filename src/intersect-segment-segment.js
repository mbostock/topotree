import "ccw";

// Returns true if the line segments AB and CD intersect.
function intersectSegmentSegment(a, b, c, d) {
  var a0 = a[0], a1 = a[1],
      b0 = b[0], b1 = b[1],
      c0 = c[0], c1 = c[1],
      d0 = d[0], d1 = d[1],
      s, t;

  // Computing bounding box of AB and CD.
  if (a0 > b0) t = a0, a0 = b0, b0 = t;
  if (a1 > b1) t = a1, a1 = b1, b1 = t;
  if (c0 > d0) t = c0, c0 = d0, d0 = t;
  if (c1 > d1) t = c1, c1 = d1, d1 = t;

  return !(c0 > b0 || d0 < a0 || c1 > b1 || d1 < a1)
      && !((s = ccw(b, c, d)) && (t = ccw(a, c, d)) && s > 0 === t > 0)
      && !((s = ccw(a, b, d)) && (t = ccw(a, b, c)) && s > 0 === t > 0);
}
