(function() {

import "tree";
import "line-segment";

this.tree = {
  lineSegment: lineSegment,

  // TODO something smarter
  fromLines: function(lines) { return new Tree(lines.map(lineSegment_tree)); },
  fromLine: function(line) { return new Tree(lineSegment_tree(line)); }
};

})();
