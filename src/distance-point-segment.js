import "distance-point-point";

// Returns the squared distance from the point C to the line segment AB
function distancePointSegment(c, a, b) {
  var dx = b[0] - a[0],
      dy = b[1] - a[1],
      d2 = dx * dx + dy * dy,
      t = d2 && ((c[0] - a[0]) * dx + (c[1] - a[1]) * (b[1] - a[1])) / d2;
  return distancePointPoint(c, t <= 0 ? a : t >= 1 ? b : [a[0] + t * dx, a[1] + t * dy]);
}
