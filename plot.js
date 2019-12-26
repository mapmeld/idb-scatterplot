function plotData() {
  var crimes = ["hurtos", "robos", "homicidios"],
      selectCrime = crimes.indexOf($(".dropdown span.text").text().toLowerCase()),
      selectGrade = $("button.btn.selected").text() * 1;

  if (isNaN(selectCrime) || selectCrime < 0) {
    return;
  }

  // console.log("./csvs/csv_" + selectGrade + "_" + selectCrime + ".csv");
  // no header, so do d3.text then d3.csvParseRows
  var svg = d3.select("#chart").html("");
  d3.text("./csvs/csv_" + selectGrade + "_" + selectCrime + ".csv")
    .then(function(text) {
      var rows = d3.csvParseRows(text);
      var radiusIndex = 1; // 2km radius, +/- 1 km possible

      var maxCrimeCount = 1;
      rows.forEach(function(row) {
        var crimeCount = row[2 + radiusIndex];
        maxCrimeCount = Math.max(maxCrimeCount, crimeCount);
      });

      var minX = 0,
          maxX = maxCrimeCount,
          minY = 0,
          maxY = 1;
      if ($($(".setting-pill")[0]).hasClass("selected")) {
          // recommended
          maxX *= 0.8;
          minY = 0.5;
      } else if ($($(".setting-pill")[2]).hasClass("selected")) {
          // custom
          minX = $("#xmin").val() * 1;
          maxX = $("#xmax").val() * 1;
          minY = $("#ymin").val() / 100;
          maxY = $("#ymax").val() / 100;
      }

      var xScale = d3.scaleLinear().range([35, 780]).domain([minX, maxX]),
          xAxis = d3.axisBottom().scale(xScale),
          yScale = d3.scaleLinear().range([480, 0]).domain([minY, maxY]),
          yAxis = d3.axisLeft().scale(yScale);

      svg.append('g')
        .selectAll("dot")
        .data(rows)
        .enter()
        .append("circle")
          .attr("cx", d => (xScale(d[2 + radiusIndex]) + 10) )
          .attr("cy", d => (yScale(d[0]) + 10))
          .attr("r", d => (Math.sqrt(d[1] * 1.5)))
          .style("fill", "#69a2f3")
          .style("opacity", 0.5)
          .style("stroke", "#000")

      svg.append("g")
        .attr("transform", "translate(10,500)")
        .call(xAxis);

       svg.append("g")
        .attr("transform", "translate(30,10)")
        .call(yAxis);
    });
}

$(document).ready(function() {
  plotData();
});
