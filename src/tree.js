import "node";
import "leaf";

// TODO support quantized, delta-encoded arcs
// TODO group arcs based on connectedness!
function tree(topology) {
  return tree_group(topology.arcs.map(function(arc) {
    var i = 0,
        n = arc.length,
        p0,
        p1 = arc[0],
        children = new Array(n - 1);

    while (++i < n) {
      p0 = p1, p1 = arc[i];
      children[i - 1] = new Leaf(p0, p1);
    }

    return tree_group(children);
  }));
}

function tree_group(children) {
  var i0,
      i1,
      n0,
      children1;

  while ((n0 = children.length) > 1) {
    children1 = new Array(Math.ceil(n0 / 2));
    for (i0 = 0, i1 = 0; i0 < n0 - 1; i0 += 2, i1 += 1) children1[i1] = new Node(children[i0], children[i0 + 1]);
    if (i0 < n0) children1[i1] = children[i0];
    children = children1;
  }

  return children[0];
}
