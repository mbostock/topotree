// Three points are a counter-clockwise turn if ccw > 0, clockwise if ccw < 0,
// and collinear if ccw = 0 because ccw is a determinant that gives twice the
// signed area of the triangle ABC. Assumes the origin [0,0] is the top-left.
function ccw(a, b, c) {
  return (b[1] - a[1]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[1] - a[1]);
}
