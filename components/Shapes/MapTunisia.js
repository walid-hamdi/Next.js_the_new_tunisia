import * as React from "react";
import * as d3 from "d3";
import data from "../../data/tunisia.json";

function drawChart(svgRef) {
  const width = 960,
    height = 500;

  const path = d3.geoAlbers.pa();

  const svg = d3
    .select(svgRef.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json(data, function (error, topology) {
    // console.clear();

    const featureCollection = topojson.feature(
      topology,
      topology.objects.governorates
    );
    const bounds = d3.geo.bounds(featureCollection);

    const centerX =
        d3.sum(bounds, function (d) {
          return d[0];
        }) / 2,
      centerY =
        d3.sum(bounds, function (d) {
          return d[1];
        }) / 2;

    const projection = d3.geo.mercator().scale(3000).center([centerX, centerY]);

    path.projection(projection);

    svg
      .selectAll("path")
      .data(featureCollection.features)
      .enter()
      .append("path")
      .attr("d", path);
  });
}

const MapTunisia = () => {
  const svg = React.useRef();

  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <div id="chart">
      <svg ref={svg} />
    </div>
  );
};

export default MapTunisia;
