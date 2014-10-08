import "heap";

function Tree(root) {
  this.root = root;
}

Tree.prototype = {
  leaves: tree_leaves,
  search: tree_search,
  filter: tree_filter,
  intersect: tree_intersect
};

function tree_leaves() {
  return this.filter(tree_true);
}

function tree_true() {
  return true;
}

function tree_filter(filter) {
  var leaves = [],
      node,
      nodes = [this.root];

  while ((node = nodes.pop()) != null) {
    if (filter(node)) {
      if (node.children) {
        var i = -1, n = node.children.length;
        while (++i < n) nodes.push(node.children[i]);
      } else {
        leaves.push(node);
      }
    }
  }

  return leaves;
}

function tree_intersect(tree, intersect) {
  var intersections = [];

  (function intersectChild(A, B, depth) {
    var a, b;
    if (depth & 1) a = A, b = B;
    else a = B, b = A;
    if (intersect(A, B)) {
      if (A.children) for (var i = 0, n = A.children.length; i < n; ++i) intersectChild(B, A.children[i]);
      else if (B.children) for (var i = 0, n = B.children.length; i < n; ++i) intersectChild(B.children[i], A);
      else intersections.push([a, b]);
    }
  })(this.root, tree.root, 0);

  return intersections;
}

function tree_search(score) {
  var minNode,
      minScore = Infinity,
      candidateNode = this.root,
      candidateScore = score(candidateNode),
      candidates = heap(tree_ascendingScore),
      candidate = {s: candidateScore, n: candidateNode};

  do {
    if ((candidateNode = candidate.n).children) {
      candidateNode.children.forEach(function(c) { candidates.push({s: score(c), n: c}); });
    } else if ((candidateScore = score(candidateNode)) < minScore) {
      minNode = candidateNode, minScore = candidateScore;
    }
  } while ((candidate = candidates.pop()) && candidate.s < minScore);

  return minNode;
}

function tree_ascendingScore(a, b) {
  return a.s - b.s;
}
