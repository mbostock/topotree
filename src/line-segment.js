import "box";
import "tree";

// TODO something smarter
function lineSegment_treeFromLines(lines) {
  return new Tree(lineSegment_treeFromBoxes(lines.map(function(line) { return lineSegment_treeFromBoxes(lineSegment_boxesFromLine(line)); })));
}

function lineSegment_treeFromLine(line) {
  return new Tree(lineSegment_treeFromBoxes(lineSegment_boxesFromLine(line)));
}

function lineSegment_boxesFromLine(line) {
  var p0,
      p1 = line[0],
      i = 0,
      n = line.length,
      boxes = new Array(n - 1);
  while (++i < n) p0 = p1, p1 = line[i], boxes[i - 1] = lineSegment(p0[0], p0[1], p1[0], p1[1]).box();
  return boxes;
}

function lineSegment_treeFromBoxes(boxes) {
  var i0,
      i1,
      n0;

  while ((n0 = boxes.length) > 1) {
    boxes1 = new Array(Math.ceil(n0 / 2));
    for (i0 = 0, i1 = 0; i0 < n0 - 1; i0 += 2, i1 += 1) boxes1[i1] = boxes[i0].merge(boxes[i0 + 1]);
    if (i0 < n0) boxes1[i1] = boxes[i0];
    boxes = boxes1;
  }

  return boxes[0];
}

function lineSegment(xa, ya, xb, yb) {
  return new LineSegment(xa, ya, xb, yb);
}

function LineSegment(xa, ya, xb, yb) {
  this.xa = xa, this.ya = ya;
  this.xb = xb, this.yb = yb;
}

LineSegment.prototype = {
  box: lineSegment_box,
  distance: lineSegment_distance,
  intersects: lineSegment_intersects
};

function lineSegment_box() {
  var x0 = this.xa, y0 = this.ya,
      x1 = this.xb, y1 = this.yb,
      t;
  if (x0 > x1) t = x0, x0 = x1, x1 = t;
  if (y0 > y1) t = y0, y0 = y1, y1 = t;
  return new Box(x0, y0, x1, y1, [this]);
}

function lineSegment_distance(point) {
  var x = point[0],
      y = point[1],
      dx = this.xb - this.xa,
      dy = this.yb - this.ya,
      d2 = dx * dx + dy * dy,
      t = d2 && ((x - this.xa) * dx + (y - this.ya) * dy) / d2;
  if (t <= 0) dx = this.xa, dy = this.ya;
  else if (t >= 1) dx = this.xb, dy = this.yb;
  else dx = this.xa + t * dx, dy = this.ya + t * dy;
  dx -= x, dy -= y;
  return dx * dx + dy * dy;
}

function lineSegment_intersects(that) {
  return (that.children ? lineSegment_intersectsBox : lineSegment_intersectsSegment)(this, that);
}

// Note: requires that seg and box have overlapping bounding boxes!
function lineSegment_intersectsBox(seg, box) {
  var s, t;
  return !((s = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x0, box.y0))
        && (t = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x1, box.y1)) && t > 0 === (s = s > 0)
        && (t = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x1, box.y0)) && t > 0 === s
        && (t = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x0, box.y1)) && t > 0 === s);
}

// Note: requires that seg1 and seg2 have overlapping bounding boxes!
function lineSegment_intersectsSegment(seg1, seg2) {
  var s, t;
  return !((s = lineSegment_ccw(seg1.xb, seg1.yb, seg2.xa, seg2.ya, seg2.xb, seg2.yb))
        && (t = lineSegment_ccw(seg1.xa, seg1.ya, seg2.xa, seg2.ya, seg2.xb, seg2.yb)) && s > 0 === t > 0)
      && !((s = lineSegment_ccw(seg1.xa, seg1.ya, seg1.xb, seg1.yb, seg2.xb, seg2.yb))
        && (t = lineSegment_ccw(seg1.xa, seg1.ya, seg1.xb, seg1.yb, seg2.xa, seg2.ya)) && s > 0 === t > 0);
}

// Three points are a counter-clockwise turn if ccw > 0, clockwise if ccw < 0,
// and collinear if ccw = 0 because ccw is a determinant that gives twice the
// signed area of the triangle ABC. Assumes the origin [0,0] is the top-left.
function lineSegment_ccw(xa, ya, xb, yb, xc, yc) {
  return (yb - ya) * (xc - xa) - (xb - xa) * (yc - ya);
}
