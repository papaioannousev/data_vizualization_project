// Constants for SVG dimensions
const width = 960;
const height = 600;

// Create an SVG element to hold the globe
const svg = d3
  .select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(d3.zoom().on("zoom", zoomed)) // Apply zoom behavior
  .append("g"); // Create a group element to hold the globe

// Define the globe projection
const projection = d3
  .geoOrthographic()
  .scale(300)
  .translate([width / 2, height / 2])
  .clipAngle(90);

const path = d3.geoPath().projection(projection);

// Define radial gradient in <defs>
const defs = svg.append("defs");

// Create an outer circle to represent the globe's boundary
svg
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", height / 2)
  .attr("r", projection.scale())
  .attr("fill", "#00072d"); // Sea color

// Create a tooltip
const tooltip = d3
  .select("#tooltip")
  .style("position", "absolute")
  .style("background", "#f4f4f4")
  .style("padding", "5px")
  .style("border", "1px solid #333")
  .style("border-radius", "3px")
  .style("pointer-events", "none")
  .style("display", "none");

const filter = defs.append("filter").attr("id", "glow");

filter
  .append("feGaussianBlur")
  .attr("stdDeviation", "5")
  .attr("result", "coloredBlur");

const feMerge = filter.append("feMerge");

feMerge.append("feMergeNode").attr("in", "coloredBlur");
feMerge.append("feMergeNode").attr("in", "SourceGraphic");

// State variables
let enlargedCountry = null;
let isPlaying = false;
let intervalId = null;
let currentYearIndex = 0;
let lastKnownWorldValue = null; // Variable to store last known value for "world"
let lastKnownValue = new Map(); // Variable to store last known value for each country

// Load CSV data
d3.csv("data.csv")
  .then((data) => {
    console.log("CSV Data loaded:", data);

    // Extract year from CodeYear and add it to each data entry
    data.forEach((d) => {
      d.year = +d.CodeYear.slice(-4); // Extract last four characters as year
    });

    // UI Elements
    const yearSelector = d3.select("#year-select").on("change", updateMap);

    const playStopButton = d3
      .select("#play-stop-button")
      .on("click", togglePlayStop);

    // Populate the dropdown with unique years from data
    const uniqueYears = [...new Set(data.map((d) => d.year))].sort(
      (a, b) => a - b
    );
    yearSelector
      .selectAll("option")
      .data(uniqueYears)
      .enter()
      .append("option")
      .attr("value", (d) => d)
      .text((d) => d);

    // Initialize a map to track the last known value for each country
    updateMap(); // Initial map update with the first year in the data

    function updateMap() {
      const selectedYear = +yearSelector.node().value;

      // Filter data for the selected year and all previous years
      const filteredData = data.filter((d) => d.year <= selectedYear);

      // Update last known values only if autoplay is starting a new cycle or there are values before the selected year
      if (currentYearIndex === 0 || filteredData.length > 0) {
        lastKnownValue.clear(); // Clear existing last known values
        filteredData.forEach((d) => {
          lastKnownValue.set(d.Entity, d["EDU Exp. Per Person Absolute"]);
        });

        // Update last known value for "world" based on selected year
        const worldData = filteredData.find((d) => d.Entity === "world");
        lastKnownWorldValue = worldData
          ? worldData["EDU Exp. Per Person Absolute"]
          : null;
      }

      // Load GeoJSON data
      d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json")
        .then((world) => {
          const countries = topojson.feature(
            world,
            world.objects.countries
          ).features;

          // Merge filtered CSV data with GeoJSON data
          const dataMap = new Map(
            filteredData.map((d) => [
              d["Entity"],
              d["EDU Exp. Per Person Absolute"],
            ])
          );

          countries.forEach((country) => {
            const countryName = country.properties.name;
            // Use the filtered data for the selected year and show last known value otherwise
            country.properties.eduExp = dataMap.has(countryName)
              ? dataMap.get(countryName)
              : lastKnownValue.has(countryName)
              ? lastKnownValue.get(countryName)
              : undefined;
          });

          // Define color scale based on custom breaks
          const colorScale = d3
            .scaleThreshold()
            .domain([0, 50, 100, 200, 500, 1000, 2000, 3000, 5000, 10000])
            .range([
              "#f7fbff",
              "#deebf7",
              "#c6dbef",
              "#9ecae1",
              "#6baed6",
              "#4292c6",
              "#2171b5",
              "#08519c",
              "#084594",
              "#08306b",
            ]); // color palette

          // Draw the countries
          const countryPaths = svg
            .selectAll(".country")
            .data(countries)
            .join("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", (d) => {
              const countryData = d.properties.eduExp;
              // Set the fill color to grey if data is undefined
              if (countryData === undefined) {
                return "#ccc";
              }
              return colorScale(countryData);
            })
            .attr("stroke", "#333")
            .attr("stroke-width", 0.5)
            .on("mouseover", (event, d) => {
              if (!enlargedCountry) {
                // Only show tooltip if no country is enlarged
                showTooltip(event, d);
              }
            })
            .on("mouseout", () => {
              if (!enlargedCountry) {
                // Hide tooltip if no country is enlarged
                tooltip.style("display", "none");
              }
            })
            .on("mousemove", (event) => {
              if (!enlargedCountry) {
                // Update tooltip position if no country is enlarged
                tooltip
                  .style("left", event.pageX + 5 + "px")
                  .style("top", event.pageY - 28 + "px");
              }
            })
            .on("click", function (event, d) {
              if (enlargedCountry === this) {
                // Reset the country to its original size
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr("transform", "scale(1)");
                enlargedCountry = null;
                tooltip.style("display", "none"); // Hide tooltip when unclicking
              } else {
                // Reset all countries
                countryPaths
                  .transition()
                  .duration(200)
                  .attr("transform", "scale(1)");

                // Scale the clicked country and bring it to the front
                const [x, y] = path.centroid(d);
                d3.select(this)
                  .raise()
                  .transition()
                  .duration(200)
                  .attr(
                    "transform",
                    `translate(${x},${y}) scale(1.2) translate(${-x},${-y})`
                  );

                // Update the state
                enlargedCountry = this;

                // Display country name and EDU Exp. Per Person Absolute in tooltip
                showTooltip(event, d);
              }

              // Center the clicked country
              centerCountry(d);
            });

          // Apply glow filter to the globe
          svg.selectAll("path").style("filter", "url(#glow)");

          // Create legend
          createLegend(colorScale);

          // Enable user-controlled rotation
          enableDragRotation();

          // Auto-play functionality
          if (isPlaying) {
            startAutoPlay();
          }
        })
        .catch((error) => {
          console.error("Error loading GeoJSON data:", error);
        });
    }

    function centerCountry(d) {
      const centroid = d3.geoCentroid(d);
      const rotate = projection.rotate();
      const newRotate = [-centroid[0], -centroid[1], rotate[2]];
      projection.rotate(newRotate);
      svg.selectAll(".country").attr("d", path);
    }

    function createLegend(colorScale) {
      const legendContainer = d3.select("#legend");

      // Clear existing legend
      legendContainer.html("");

      // Define custom legend ticks
      const legendTicks = [0, 50, 100, 200, 500, 1000, 2000, 3000, 5000, 10000];

      // Create legend item groups
      const legend = legendContainer
        .append("svg")
        .attr("width", 500) // Adjust width as needed
        .attr("height", 50)
        .selectAll(".legend-item")
        .data(legendTicks)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(${i * 50}, 0)`); // Adjust spacing as needed

      // Add colored rectangles to legend
      legend
        .append("rect")
        .attr("width", 50)
        .attr("height", 5)
        .style("fill", (d) => colorScale(d));

      // Add legend labels
      legend
        .append("text")
        .attr("class", "legend-label")
        .attr("x", 25)
        .attr("y", 35)
        .style("text-anchor", "middle")
        .text((d) => {
          if (d === 10000) {
            return "10000+";
          } else {
            return d;
          }
        });

      // Add legend title
      legendContainer
        .append("div")
        .html(
          "<strong style='font-size: 12px;'>Education Expenditure per Person in US $</strong>"
        );
    }

    // Toggle play/stop functionality
    function togglePlayStop() {
      isPlaying = !isPlaying;
      updatePlayStopButtonLabel();
      if (isPlaying) {
        startAutoPlay();
      } else {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    // Start autoplay from the first year and cycle through all the years
    function startAutoPlay() {
      if (!intervalId) {
        const options = yearSelector.selectAll("option");
        const numYears = options.size();

        // Check if we are starting a new autoplay cycle
        if (currentYearIndex === 0) {
          // Reset last known values when starting a new cycle
          lastKnownWorldValue = null;
          lastKnownValue.clear();
        }

        intervalId = setInterval(() => {
          const nextYear = +options.nodes()[currentYearIndex].value;

          yearSelector.node().value = nextYear;
          updateMap();

          currentYearIndex++;

          // Check if currentYearIndex has reached the last year
          if (currentYearIndex >= numYears) {
            clearInterval(intervalId); // Stop autoplay at the last year
            intervalId = null;
            isPlaying = false;
            updatePlayStopButtonLabel(); // Update button label to "Play"
          }
        }, 250); // Change interval duration (ms) as needed
      }
    }

    // Update the play/stop button label
    function updatePlayStopButtonLabel() {
      playStopButton.text(isPlaying ? "Stop" : "Play");
    }

    // Enable user-controlled rotation
    function enableDragRotation() {
      const drag = d3.drag().on("drag", (event) => {
        const rotate = projection.rotate();
        const k = 0.5; // Sensitivity factor
        projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
        svg.selectAll(".country").attr("d", path);
      });

      svg.call(drag);
    }

    function showTooltip(event, d) {
      tooltip
        .style("display", "block")
        .html(
          `${d.properties.name}: ${
            d.properties.eduExp !== undefined ? d.properties.eduExp : "No data"
          }`
        )
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY - 28 + "px");
    }
  })
  .catch((error) => {
    console.error("Error loading CSV data:", error);
  });

function zoomed(event) {
  const { transform } = event;
  const scale = transform.k;
  const [x, y] = [width / 2, height / 2];

  // Apply the zoom transformation centered around [x, y]
  svg.attr(
    "transform",
    `translate(${x},${y}) scale(${scale}) translate(${-x},${-y})`
  );
}
