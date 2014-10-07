function lineSegment(xa, ya, xb, yb) {
  var x0 = xa, y0 = ya,
      x1 = xb, y1 = yb,
      t;

  // Compute bounding box of line segment [xa, ya] -> [xb, yb].
  if (x0 > x1) t = x0, x0 = x1, x1 = t;
  if (y0 > y1) t = y0, y0 = y1, y1 = t;

  var s = new LineSegment(x0, y0, x1, y1);
  s.xa = xa, s.ya = ya;
  s.xb = xb, s.yb = yb;
  return s;
}

function lineSegment_box(x0, y0, x1, y1, children) {
  var s = new LineSegment(x0, y0, x1, y1);
  s.children = children || [];
  return s;
}

function LineSegment(x0, y0, x1, y1) {
  this.x0 = x0, this.y0 = y0;
  this.x1 = x1, this.y1 = y1;
}

LineSegment.prototype = {
  merge: lineSegment_merge,
  distance: lineSegment_distance,
  intersects: lineSegment_intersects
};

function lineSegment_merge(that) {
  return that.children && that.x0 < this.x0 && this.x1 < that.x1 && that.y0 < this.y0 && this.y1 < that.y1 ? (that.children.push(this), that) // this is entirely enclosed by that
      : this.children && this.x0 < that.x0 && that.x1 < this.x1 && this.y0 < that.y0 && that.y1 < this.y1 ? (this.children.push(that), this) // that is entirely enclosed by this
      : lineSegment_box(Math.min(this.x0, that.x0), Math.min(this.y0, that.y0), Math.max(this.x1, that.x1), Math.max(this.y1, that.y1), [this, that]);
}

function lineSegment_distance(point) {
  return (this.children
      ? lineSegment_distanceBox
      : lineSegment_distanceSegment)(this, point);
}

function lineSegment_distanceBox(box, point) {
  var x = point[0],
      y = point[1],
      dx = x - Math.max(Math.min(x, box.x1), box.x0),
      dy = y - Math.max(Math.min(y, box.y1), box.y0);
  return dx * dx + dy * dy;
}

function lineSegment_distanceSegment(seg, point) {
  var x = point[0],
      y = point[1],
      dx = seg.xb - seg.xa,
      dy = seg.yb - seg.ya,
      d2 = dx * dx + dy * dy,
      t = d2 && ((x - seg.xa) * dx + (y - seg.ya) * dy) / d2;
  if (t <= 0) dx = seg.xa, dy = seg.ya;
  else if (t >= 1) dx = seg.xb, dy = seg.yb;
  else dx = seg.xa + t * dx, dy = seg.ya + t * dy;
  dx -= x, dy -= y;
  return dx * dx + dy * dy;
}

function lineSegment_intersects(that) {
  return that.x0 > this.x1 || that.x1 < this.x0 || that.y0 > this.y1 || that.y1 < this.y0 ? false // non-overlapping bounding boxes
      : this.children && that.children ? true // overlapping bounding boxes
      : this.children ? lineSegment_intersectsBoxSegment(this, that)
      : that.children ? lineSegment_intersectsBoxSegment(that, this)
      : lineSegment_intersectsSegmentSegment(this, that);
}

// Note: depends on lineSegment_intersects checking that the bounding boxes overlap!
function lineSegment_intersectsSegmentSegment(seg1, seg2) {
  var s, t;
  return !((s = lineSegment_ccw(seg1.xb, seg1.yb, seg2.xa, seg2.ya, seg2.xb, seg2.yb))
        && (t = lineSegment_ccw(seg1.xa, seg1.ya, seg2.xa, seg2.ya, seg2.xb, seg2.yb)) && s > 0 === t > 0)
      && !((s = lineSegment_ccw(seg1.xa, seg1.ya, seg1.xb, seg1.yb, seg2.xb, seg2.yb))
        && (t = lineSegment_ccw(seg1.xa, seg1.ya, seg1.xb, seg1.yb, seg2.xa, seg2.ya)) && s > 0 === t > 0);
}

// Note: depends on lineSegment_intersects checking that the bounding boxes overlap!
function lineSegment_intersectsBoxSegment(box, seg) {
  var s, t;
  return !((s = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x0, box.y0))
        && (t = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x1, box.y1)) && t > 0 === (s = s > 0)
        && (t = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x1, box.y0)) && t > 0 === s
        && (t = lineSegment_ccw(seg.xa, seg.ya, seg.xb, seg.yb, box.x0, box.y1)) && t > 0 === s);
}

// Three points are a counter-clockwise turn if ccw > 0, clockwise if ccw < 0,
// and collinear if ccw = 0 because ccw is a determinant that gives twice the
// signed area of the triangle ABC. Assumes the origin [0,0] is the top-left.
function lineSegment_ccw(xa, ya, xb, yb, xc, yc) {
  return (yb - ya) * (xc - xa) - (xb - xa) * (yc - ya);
}
