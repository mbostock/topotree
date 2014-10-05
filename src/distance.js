// Returns the squared distance from the point C to the bounding box AB
function distancePointBox(c, a, b) {
  var x = c[0],
      y = c[1],
      dx = x - Math.max(Math.min(x, b[0]), a[0]),
      dy = y - Math.max(Math.min(y, b[1]), a[1]);
  return dx * dx + dy * dy;
}

// Returns the squared distance from the point C to the line segment AB
function distancePointSegment(c, a, b) {
  var dx = b[0] - a[0],
      dy = b[1] - a[1],
      d2 = dx * dx + dy * dy,
      t = d2 && ((c[0] - a[0]) * dx + (c[1] - a[1]) * (b[1] - a[1])) / d2;
  return distancePointPoint(c, t <= 0 ? a : t >= 1 ? b : [a[0] + t * dx, a[1] + t * dy]);
}

// Returns the squared distance between the points A and B
function distancePointPoint(a, b) {
  var dx = a[0] - b[0],
      dy = a[1] - b[1];
  return dx * dx + dy * dy;
}
