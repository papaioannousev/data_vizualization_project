// Constants for SVG dimensions
const width = 960;
const height = 400;

// Define margins and dimensions for line chart
const margin = { top: 20, right: 60, bottom: 60, left: 50 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Create SVG element with custom background color
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create SVG group for line chart
const chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create tooltip element
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load CSV data
d3.csv("data.csv")
  .then((data) => {
    console.log("CSV Data loaded:", data);

    // Parse data and extract year
    data.forEach((d) => {
      try {
        d.year = +d.CodeYear.slice(-4); // Extract last four characters as year
        d.eduExpPerPerson = +d["EDU Exp. Per Person Absolute"]; // Ensure this is a number
      } catch (error) {
        console.error("Error parsing data entry:", d, error);
      }
    });

    // Filter out entries that could not be parsed
    data = data.filter((d) => !isNaN(d.year) && !isNaN(d.eduExpPerPerson));

    // Sort data by year ascending
    data.sort((a, b) => a.year - b.year);

    // Calculate min and max values for x and y axes
    const minXValue = d3.min(data, (d) => d.year);
    const maxXValue = d3.max(data, (d) => d.year);
    const maxYValue = d3.max(data, (d) => d.eduExpPerPerson);

    // Define scales for x and y axes with fixed domains
    const xScale = d3
      .scaleLinear()
      .domain([minXValue, maxXValue]) // Fixed x-axis domain
      .range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxYValue]) // Fixed y-axis domain from 0 to max value in data
      .nice()
      .range([chartHeight, 0]);

    // Define line generator
    const line = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.eduExpPerPerson));

    // Draw x-axis
    chartGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .selectAll("text")
      .style("fill", "black")
      .selectAll("path, line")
      .style("stroke", "black");

    // Draw y-axis
    chartGroup
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("fill", "black")
      .selectAll("path, line")
      .style("stroke", "black");

    // Group data by country
    const dataByCountry = d3.group(data, (d) => d.Entity);

    // Define colors for each country
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw lines for each country
    dataByCountry.forEach((values, country) => {
      // Filter out undefined or NaN values for year and eduExpPerPerson
      values = values.filter(
        (d) => !isNaN(d.year) && !isNaN(d.eduExpPerPerson)
      );

      const path = chartGroup
        .append("path")
        .datum(values)
        .attr("fill", "none")
        .attr("stroke", color(country))
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr(
          "class",
          `line-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
        )
        .on("mouseover", (event, d) => {
          if (!path.classed("active")) {
            tooltip
              .style("opacity", 1)
              .html(
                `Country: ${country}<br>Edu Exp Per Person: ${d3.format(".2f")(
                  d[0].eduExpPerPerson
                )}`
              );
            path.attr("stroke-width", 4);
          }
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", () => {
          if (!path.classed("active")) {
            tooltip.style("opacity", 0);
            path.attr("stroke-width", 2);
          }
        })
        .on("click", () => {
          const isActive = path.classed("active");
          if (!isActive) {
            // Hide all other lines
            chartGroup.selectAll("path").style("display", "none");

            // Hide all other dots
            chartGroup.selectAll("circle").style("display", "none");

            // Show clicked line
            path.style("display", "initial").attr("stroke-width", 4);

            // Show dots of the clicked line
            chartGroup
              .selectAll(
                `.dot-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
              )
              .style("display", "initial");

            path.classed("active", true);
          } else {
            // Show all lines
            chartGroup.selectAll("path").style("display", "initial");

            // Reset dots color to original
            chartGroup.selectAll("circle").style("display", "initial");

            path.classed("active", false).attr("stroke-width", 2);
          }
        });

      // Add dots for each data point
      chartGroup
        .selectAll(
          `.dot-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
        )
        .data(values)
        .enter()
        .append("circle")
        .attr(
          "class",
          `dot-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
        )
        .attr("cx", (d) => xScale(d.year))
        .attr("cy", (d) => yScale(d.eduExpPerPerson))
        .attr("r", 4)
        .attr("fill", color(country))
        .on("mouseover", (event, d) => {
          tooltip
            .style("opacity", 1)
            .html(
              `Country: ${country}<br>Year: ${
                d.year
              }<br>Edu Exp Per Person: ${d3.format(".2f")(d.eduExpPerPerson)}`
            );
          d3.select(event.currentTarget).attr("r", 6);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", (event, d) => {
          if (!path.classed("active")) {
            tooltip.style("opacity", 0);
            d3.select(event.currentTarget).attr("r", 4);
          }
        })
        .on("click", () => {
          const isActive = path.classed("active");
          if (!isActive) {
            // Hide all other lines
            chartGroup.selectAll("path").style("display", "none");

            // Show clicked line
            path.style("display", "initial").attr("stroke-width", 4);

            // Show dots of the clicked line
            chartGroup.selectAll("circle").style("display", "none");
            chartGroup
              .selectAll(
                `.dot-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
              )
              .style("display", "initial");

            path.classed("active", true);
          } else {
            // Show all lines
            chartGroup.selectAll("path").style("display", "initial");

            // Reset dots color to original
            chartGroup.selectAll("circle").style("display", "initial");

            path.classed("active", false).attr("stroke-width", 2);
          }
        });
    });
  })
  .catch((error) => {
    console.error("Error loading the CSV data:", error);
  });
