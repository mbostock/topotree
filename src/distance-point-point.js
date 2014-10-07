// Returns the squared distance between the points A and B
function distancePointPoint(a, b) {
  var dx = a[0] - b[0],
      dy = a[1] - b[1];
  return dx * dx + dy * dy;
}
