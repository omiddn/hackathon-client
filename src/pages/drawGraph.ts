import * as d3 from "d3";

export const WIDTH = 1200
export const HEIGHT = 800;

const clamp = (x, lo, hi) => x < lo ? lo : x > hi ? hi : x;

export const drawGraph = async (svg: SVGAElement, graph) => {
  const link = svg
    .selectAll(".link")
    .data(graph.links)
    .join("line")
    .classed("link", true);

  const node = svg
    .selectAll(".node")
    .data(graph.nodes)
    .join("circle")
    .attr("r", 12)
    .classed("node", true)
    .classed("fixed", d => d.fx !== undefined);

  await svg.node();

  const onTick = () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  const onClick = (_, d) => {
    delete d.fx;
    delete d.fy;

    d3.select(this).classed("fixed", false);
    simulation.alpha(1).restart();
  }

  function onDragStart() {
    d3.select(this).classed("fixed", true);
  }

  function onDragged(event, d) {
    d.fx = clamp(event.x, 0, WIDTH);
    d.fy = clamp(event.y, 0, HEIGHT);
    simulation.alpha(1).restart();
  }

  const simulation = d3
    .forceSimulation()
    .nodes(graph.nodes)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
    .force("link", d3.forceLink(graph.links))
    .on("tick", onTick);
  const drag = d3
    .drag()
    .on("start", onDragStart)
    .on("drag", onDragged);

  node.call(drag).on("click", onClick);

}
