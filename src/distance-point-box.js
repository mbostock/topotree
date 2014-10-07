// Returns the squared distance from the point C to the bounding box AB
function distancePointBox(c, a, b) {
  var x = c[0],
      y = c[1],
      dx = x - Math.max(Math.min(x, b[0]), a[0]),
      dy = y - Math.max(Math.min(y, b[1]), a[1]);
  return dx * dx + dy * dy;
}
