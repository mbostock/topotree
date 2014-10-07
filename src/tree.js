import "heap";

// node.merge(other) - returns a new node representing the union of node and other
// node.intersects(other) - returns true iff this node intersects the other node
// node.distance(object) - returns the distance from the node to the specified object (arbitrary units)

function tree(nodes) {
  var i0,
      i1,
      n0,
      nodes1;

  while ((n0 = nodes.length) > 1) {
    nodes1 = new Array(Math.ceil(n0 / 2));
    for (i0 = 0, i1 = 0; i0 < n0 - 1; i0 += 2, i1 += 1) nodes1[i1] = nodes[i0].merge(nodes[i0 + 1]);
    if (i0 < n0) nodes1[i1] = nodes[i0];
    nodes = nodes1;
  }

  return new Tree(nodes[0]);
}

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

function tree_nearest(point) {
  var nearestNode,
      nearestDistance = Infinity,
      node = this.root,
      distance = node.distance(point),
      candidates = heap(tree_ascendingDistance),
      candidate = {d: distance, n: node};

  do {
    if ((node = candidate.n).children) {
      node.children.forEach(function(c) { candidates.push({d: c.distance(point), n: c}); });
    } else if ((distance = node.distance(point)) < nearestDistance) {
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
