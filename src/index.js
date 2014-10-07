(function() {

import "tree";
import "line-segment";

this.tree = tree;

tree.lineSegment = lineSegment;

tree.fromLine = function(line) {
  var nodes = [],
      p0,
      p1 = line[0],
      i = 0,
      n = line.length;

  while (++i < n) {
    p0 = p1, p1 = line[i];
    nodes.push(lineSegment(p0[0], p0[1], p1[0], p1[1]));
  }

  return tree(nodes);
};

// TODO something smarter
tree.fromLines = function(lines) {
  return tree(lines.map(function(line) {
    return tree.fromLine(line).root;
  }));
};

})();
