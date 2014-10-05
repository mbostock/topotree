import "intersect";
import "distance";
import "heap";

function Node(child0, child1) {
  var e0 = child0.extent,
      e1 = child1.extent;
  this.children = [child0, child1];
  this.extent = [
    [Math.min(e0[0][0], e1[0][0]), Math.min(e0[0][1], e1[0][1])],
    [Math.max(e0[1][0], e1[1][0]), Math.max(e0[1][1], e1[1][1])]
  ];
}

Node.prototype = {
  extent: null,
  children: null,
  nearest: node_nearest,
  intersections: node_intersections
};

// accumulates intersections with line segment AB
function node_intersections(a, b) {
  var intersections = [];

  (function intersectNode(node) {
    if (intersectBoxSegment(node.extent[0], node.extent[1], a, b)) {
      node.children.forEach(function(child) {
        if (child.children) {
          intersectNode(child);
        } else if (intersectSegmentSegment(child.coordinates[0], child.coordinates[1], a, b)) {
          intersections.push(child);
        }
      });
    }
  })(this);

  return intersections;
}

function node_nearest(point) {
  var minNode,
      minDistance = Infinity,
      node = this,
      distance = node_distance(node, point),
      candidates = heap(node_compareDistance),
      candidate = {distance: distance, node: node};

  do {
    node = candidate.node;
    if (node.children) {
      candidates.push({distance: node_distance(node.children[0], point), node: node.children[0]});
      candidates.push({distance: node_distance(node.children[1], point), node: node.children[1]});
    } else {
      distance = node_distance(node, point);
      if (distance < minDistance) minDistance = distance, minNode = node;
    }

  } while ((candidate = candidates.pop()) && (distance = candidate.distance) <= minDistance);

  return minNode;
}

function node_distance(node, point) {
  return node.children
      ? distancePointBox(point, node.extent[0], node.extent[1])
      : distancePointSegment(point, node.coordinates[0], node.coordinates[1]);
}

function node_compareDistance(a, b) {
  return a.distance - b.distance;
}
