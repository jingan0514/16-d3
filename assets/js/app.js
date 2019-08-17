var svgWidth = 960;
var svgHeight = 660;

var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("assets/data/data.csv", function(error, data) {

    if (error) throw error;

    console.log(data)
  
    data.forEach(d => {
      d.poverty = +d.poverty;
      d.healthcare = +d.healthcare;
    });

    

    var xScale = d3.scaleLinear()
      .domain([d3.extent(data, d => d.poverty)])
      .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain([d3.extent(data, d => d.healthcare)])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    var circleGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r", "5")
      .attr("fill", "blue")
      .attr("opacity", "0.5")

  });
