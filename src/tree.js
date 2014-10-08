import "heap";

// Node API:
// node.merge(node) - returns a new node representing the union of this node and the other node
// node.intersects(node) - returns true iff this node intersects the other node
// node.distance(object) - returns the distance from the node to the specified object (arbitrary units)

function Tree(root) {
  this.root = root;
}

Tree.prototype = {
  leaves: tree_leaves,
  nearest: tree_nearest,
  intersections: tree_intersections
};

function tree_leaves() {
  var leaves = [];

  (function visit(node) {
    if (node.children) node.children.forEach(visit);
    else leaves.push(node);
  })(this.root);

  return leaves;
}

function tree_nearest(object) {
  var nearestNode,
      nearestDistance = Infinity,
      node = this.root,
      distance = node.distance(object),
      candidates = heap(tree_ascendingDistance),
      candidate = {d: distance, n: node};

  do {
    if ((node = candidate.n).children) {
      node.children.forEach(function(c) { candidates.push({d: c.distance(object), n: c}); });
    } else if ((distance = node.distance(object)) < nearestDistance) {
      nearestNode = node, nearestDistance = distance;
    }
  } while ((candidate = candidates.pop()) && candidate.d < nearestDistance);

  return nearestNode;
}

function tree_intersections(leaf) { // TODO intersections with non-leaf nodes
  var intersections = [];

  (function intersect(node) {
    if (node.intersects(leaf)) {
      if (node.children) node.children.forEach(intersect);
      else intersections.push(node);
    }
  })(this.root);

  return intersections;
}

function tree_ascendingDistance(a, b) {
  return a.d - b.d;
}
