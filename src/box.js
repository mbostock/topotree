function box(x0, y0, x1, y1, children) {
  return new Box(x0, y0, x1, y1, children);
}

function Box(x0, y0, x1, y1, children) {
  this.x0 = x0, this.y0 = y0;
  this.x1 = x1, this.y1 = y1;
  this.children = children;
}

Box.prototype = {
  merge: box_merge,
  distance: box_distance,
  intersects: box_intersects
};

function box_merge(that) {
  return that.x0 < this.x0 && this.x1 < that.x1 && that.y0 < this.y0 && this.y1 < that.y1 ? (that.children.push(this), that) // this is entirely enclosed by that
      : this.x0 < that.x0 && that.x1 < this.x1 && this.y0 < that.y0 && that.y1 < this.y1 ? (this.children.push(that), this) // that is entirely enclosed by this
      : new Box(Math.min(this.x0, that.x0), Math.min(this.y0, that.y0), Math.max(this.x1, that.x1), Math.max(this.y1, that.y1), [this, that]);
}

function box_distance(point) {
  var x = point[0],
      y = point[1],
      dx = x - Math.max(Math.min(x, this.x1), this.x0),
      dy = y - Math.max(Math.min(y, this.y1), this.y0);
  return dx * dx + dy * dy;
}

function box_intersects(that) {
  return !(that.x0 > this.x1 || that.x1 < this.x0 || that.y0 > this.y1 || that.y1 < this.y0);
}
