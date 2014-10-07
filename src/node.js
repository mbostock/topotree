import "intersect-segment-segment";
import "intersect-box-segment";
import "distance-point-box";
import "distance-point-segment";
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
  var nearestNode,
      nearestDistance = Infinity,
      node = this,
      distance = node_distance(node, point),
      candidates = heap(node_ascendingDistance),
      candidate = {d: distance, n: node};

  do {
    if ((node = candidate.n).children) {
      candidates.push({d: node_distance(node.children[0], point), n: node.children[0]});
      candidates.push({d: node_distance(node.children[1], point), n: node.children[1]});
    } else if ((distance = node_distance(node, point)) < nearestDistance) {
      nearestNode = node;
      nearestDistance = distance;
    }
  } while ((candidate = candidates.pop()) && candidate.d < nearestDistance);

  return nearestNode;
}

function node_distance(node, point) {
  return node.children
      ? distancePointBox(point, node.extent[0], node.extent[1])
      : distancePointSegment(point, node.coordinates[0], node.coordinates[1]);
}

function node_ascendingDistance(a, b) {
  return a.d - b.d;
}
