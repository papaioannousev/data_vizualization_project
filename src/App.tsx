import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import logo from './logo.png';
import test_image_carousel_1 from './test_image_carousel_1.jpg'
import test_image_carousel_2 from './test_image_carousel_2.jpg'
import {Carousel, Container} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import male1 from './male1.jpg';
// import male2 from './male2.jpg';
import Vagelis_photo from './Vagelis_Photo.webp';
import Sevi_photo from './myphoto.jpg';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import * as d3 from 'd3';
import 'https://d3js.org/d3.v5.min.js' ;
import 'https://d3js.org/d3.v7.min.js' ;
// import 'https://d3js.org/topojson.v3.min.js' ;


// import  data from './data.csv'; 
// import 'https://d3js.org/d3.v5.min.js' ;
// import 'https://d3js.org/d3.v7.min.js' ;
// import 'lineChart1.js' ;
import { useEffect } from "react";
var topojson = require("topojson")






function Homepage() {

  return (
    <body> 
      <div className='Intro_div'>
        <h2> Is education spending associated with better outcomes? </h2>
        <br></br>
        <br></br>
        <h3 className='intro_h3' font-size='26px' color='#1C3738'>Aims of the Project</h3>
        <p> The project aims to visually communicate the complex relationships 
          between education and economicindicators by designing interactive 
          visualizations that enable users to explore data dynamically and 
          gain insights. Additionally, it focuses on creating an engaging 
          and intuitive interface that ensures easy navigation and enhances
          the data comprehension.
        </p>
        <br></br>
        <p> The fundamental goals of this project are to: </p>
        <p>1. Educational Outreach:
        Develop a user-friendly tool to help educators and students 
        understand the relationship between education and economic 
        indicators globally. 
        </p>
        <p> 2. Policy and Decision Support:
        Provide policy - decision makers with accessible visual 
        data to support decisions related to education and economic 
        development.
        </p>
        <p> 3. Research Enhancement:
        Offer researchers a platform to explore and analyze the impact 
        of educational investment on economic outcomes and how economic 
        prosperity can enhance educational opportunities.
        </p>
        <p> 4. Public Awareness and Engagement:
        Create visually compelling displays of data to raise public 
        awareness about the essential link between education and economic health.
        </p>
      </div>
      <div className='Carousel_div'>
        <h2> Vizualizations overview </h2>
        <br></br>
        <Carousel>
          <Carousel.Item>
            <img src={test_image_carousel_1} className="App-test_image_carousel_1" />
            <Carousel.Caption>
              <h3 className='App-carousel_h3'>Education Dashboard</h3>
              <br></br>
              <p className="App-carousel_p">Here you can find vizualizations regarding the Education in EU</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={test_image_carousel_2} className="App-test_image_carousel_2" />
            <Carousel.Caption>
              <h3 className='App-carousel_h3'>Finance Dashboard</h3>
              <br></br>
              <p className="App-carousel_p">Here you can find vizualizations regarding the Education in EU</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </body>

  );

}

function AboutUs() {

  return(
    <body className='about_us_body'>
      <h2>Our team</h2>
      <Container className='about_us_container'>
        <br></br>
        <br></br>
        <br></br>
        <Row>
        <Col xs={6} md={4}>
          <br></br>
          <br></br>
          <Image src={male1} thumbnail />
          <figcaption >
          Vasilis Malafekas
          </figcaption>
        </Col>
        <Col xs={6} md={4}>
          <br></br>
          <br></br>
          <Image src={Sevi_photo} thumbnail />
          <figcaption>
          Sevi Papaioannou
          </figcaption>
        </Col>
        <Col xs={6} md={4}>
          <br></br>
          <br></br>
          <Image src={Vagelis_photo} thumbnail />
          <figcaption>
          Evangelos Kostoulas
          </figcaption>
        </Col>
        </Row>
      </Container>
    </body>
  )
}

function Visualizations() {


  return(
    <body className='visualizations_body'>
      <h1>Visualization</h1>
      {/* {WorldMap()} */}
      {FinalChart1()}
      {/* {FinalChart2()} */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Visualization</h1>
      {DoubleChart()}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Charts</h1>
      {TestChart()}
      <br></br>
      <br></br>
      <br></br>
    </body>
  )
}


function Acknowledgements() {

  return(
    <body>
      
    </body>
  )
}

export default function App() {

  const [pageState, setPage] = useState('homepage');


  function handleClick(page: string) {
    setPage(page);
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul className='navbar-li'>
            {/* <li><a href="./index.html"><img src={logo} className="App-logo" alt="logo" /></a></li> */}
            <li><img src={logo} className="App-logo" alt="logo" /></li>
            <li><Button className="nav_button" onClick={() => handleClick('homepage')}>Home</Button></li>
            <li><Button className="nav_button" onClick={() => handleClick('about')}>About us</Button></li>
            <li><Button className="nav_button" onClick={() => handleClick('visualizations')}>Visualizations</Button></li>
            <li><Button className="nav_button" onClick={() => handleClick('aknowledgements')}>Acknowledgements</Button></li>
        </ul>
      </header>
      
      <DisplayPage page={pageState}/>
      <footer className='App-footer'>
        <p className='p-footer'> Data Visualization 2024</p>
        <p className='p-footer'> Department of Informatics and Telecommunications | National and Kapodistrian University of Athens
        </p>
      </footer>
    </div>
  );
}


let indexPagesMap: { [id: string] : JSX.Element; }  = {
  homepage: <Homepage />,
  about: <AboutUs />,
  visualizations: <Visualizations />,
  aknowledgements: <Acknowledgements />
};


function DisplayPage({page}: {page: string}){

  return indexPagesMap[page];
}









const DoubleChartDataLoader = () => {
  useEffect(() => {       
    Promise.all([
      d3.csv("data.csv"),
      d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json"),
    ])
      .then(([data, world]) => {
        console.log("CSV Data loaded:", data);
        console.log("GeoJSON Data loaded:", world);
  
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
  
        // Populate country dropdown
        const countryDropdown = d3.select("#select-country");
        let countries = [...new Set(data.map((d) => d.Entity))]; // Get unique country names
  
        // Sort countries in ascending order
        countries.sort((a, b) => a.localeCompare(b));
  
        // Prepend "All Countries" option
        countries = ["All Countries", ...countries];
  
        countries.forEach((country) => {
          countryDropdown.append("option").text(country).attr("value", country);
        });
  
        // Define dimensions of the map container and SVG
        const mapContainer = d3.select("#map");
        const mapWidth = mapContainer.node().getBoundingClientRect().width;
        const mapHeight = mapContainer.node().getBoundingClientRect().height;
  
        // Define dimensions of the line chart container and SVG
        const lineChartContainer = d3.select("#chart");
        const lineChartWidth = lineChartContainer
          .node()
          .getBoundingClientRect().width;
        const lineChartHeight = lineChartContainer
          .node()
          .getBoundingClientRect().height;
  
        const legendContainer = d3.select("#legend");
        const legendContainerWidth = legendContainer
          .node()
          .getBoundingClientRect().width;
        const legendContainerHeight = legendContainer
          .node()
          .getBoundingClientRect().height;
  
        // Define line chart constants and dimensions
        const margin = { top: 20, right: 60, bottom: 60, left: 50 };
        const chartWidth = lineChartWidth;
        const chartHeight = lineChartHeight;
  
        // Calculate min and max values for x and y axes
        const minXValue = d3.min(data, (d) => d.year);
        const maxXValue = d3.max(data, (d) => d.year);
        const maxYValue = d3.max(data, (d) => d.eduExpPerPerson);
  
        // Create an SVG element for the map
        const svgMap = mapContainer
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .call(d3.zoom().on("zoom", zoomed)) // Initialize zoom behavior
          .append("g"); // Create a group element for the map
  
        // Create an SVG element for the line chart
        const svgLineChart = lineChartContainer
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
  
        // Define line generator for the line chart
        const line = d3
          .line()
          .x((d) => xScale(d.year))
          .y((d) => yScale(d.eduExpPerPerson));
  
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
  
        // Draw x-axis
        svgLineChart
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${chartHeight})`)
          .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
          .selectAll("text")
          .style("fill", "black")
          .selectAll("path, line")
          .style("stroke", "black");
  
        // Draw y-axis
        svgLineChart
          .append("g")
          .attr("class", "y-axis")
          .call(d3.axisLeft(yScale))
          .selectAll("text")
          .style("fill", "black")
          .selectAll("path, line")
          .style("stroke", "black");
  
        // Create tooltip for the line chart
        const tooltipLineChart = d3
          .select("#chart")
          .append("div")
          .attr("class", "tooltip-chart")
          .style("opacity", 0);
  
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
  
          const path = svgLineChart
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
                tooltipLineChart
                  .style("opacity", 1)
                  .html(
                    `Country: ${country}<br>Edu Exp Per Person: ${d3.format(
                      ".2f"
                    )(d[0].eduExpPerPerson)}`
                  );
                path.attr("stroke-width", 4);
              }
            })
            .on("mousemove", (event) => {
              tooltipLineChart
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px");
            })
            .on("mouseout", () => {
              if (!path.classed("active")) {
                tooltipLineChart.style("opacity", 0);
                path.attr("stroke-width", 2);
              }
            })
            .on("click", () => {
              const isActive = path.classed("active");
  
              if (!isActive) {
                // Hide all other lines
                svgLineChart.selectAll("path").style("display", "none");
  
                // Hide all other dots
                svgLineChart.selectAll("circle").style("display", "none");
  
                // Show clicked line
                path.style("display", "initial").attr("stroke-width", 4);
  
                // Show dots of the clicked line
                svgLineChart
                  .selectAll(
                    `.dot-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
                  )
                  .style("display", "initial");
  
                path.classed("active", true);
  
                // Update dropdown
                countryDropdown.property("value", country);
  
                function centerCountry(d) {
                  const centroid = d3.geoCentroid(d);
                  const rotate = projection.rotate();
                  const newRotate = [-centroid[0], -centroid[1], rotate[2]];
                  projection.rotate(newRotate);
                  svgMap.selectAll(".country").attr("d", mapPath);
                }
  
                const selectedCountry = countrySelectorMap.node().value;
                svgMap.selectAll(".country").attr("fill", (d) => {
                  const countryData = d.properties.eduExp;
                  if (d.properties.name === selectedCountry) {
                    // Highlight the selected country
                    //centerCountry(d);
                    centerCountry(d);
                    return "#ffa500"; // orange color
                  } else {
                    // Reset other countries to original fill color
                    return countryData === undefined
                      ? "#ccc"
                      : colorScale(countryData);
                  }
                });
  
                updateChart(selectedCountry);
              } else {
                // Show all lines
                svgLineChart.selectAll("path").style("display", "initial");
  
                // Reset dots color to original
                svgLineChart.selectAll("circle").style("display", "initial");
  
                path.classed("active", false).attr("stroke-width", 2);
              }
            });
  
          // Add dots for each data point
          svgLineChart
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
              tooltipLineChart
                .style("opacity", 1)
                .html(
                  `Country: ${country}<br>Year: ${
                    d.year
                  }<br>Edu Exp Per Person: ${d3.format(".2f")(d.eduExpPerPerson)}`
                );
              d3.select(event.currentTarget).attr("r", 6);
            })
            .on("mousemove", (event) => {
              tooltipLineChart
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px");
            })
            .on("mouseout", (event, d) => {
              if (!path.classed("active")) {
                tooltipLineChart.style("opacity", 0);
                d3.select(event.currentTarget).attr("r", 4);
              }
            })
            .on("click", () => {
              const isActive = path.classed("active");
              if (!isActive) {
                // Hide all other lines
                svgLineChart.selectAll("path").style("display", "none");
  
                // Show clicked line
                path.style("display", "initial").attr("stroke-width", 4);
  
                // Show dots of the clicked line
                svgLineChart.selectAll("circle").style("display", "none");
                svgLineChart
                  .selectAll(
                    `.dot-${country.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}`
                  )
                  .style("display", "initial");
  
                path.classed("active", true);
  
                // Update dropdown
                countryDropdown.property("value", country);
  
                function centerCountry(d) {
                  const centroid = d3.geoCentroid(d);
                  const rotate = projection.rotate();
                  const newRotate = [-centroid[0], -centroid[1], rotate[2]];
                  projection.rotate(newRotate);
                  svgMap.selectAll(".country").attr("d", mapPath);
                }
  
                const selectedCountry = countrySelectorMap.node().value;
                svgMap.selectAll(".country").attr("fill", (d) => {
                  const countryData = d.properties.eduExp;
                  if (d.properties.name === selectedCountry) {
                    // Highlight the selected country
                    //centerCountry(d);
                    centerCountry(d);
                    return "#ffa500"; // orange color
                  } else {
                    // Reset other countries to original fill color
                    return countryData === undefined
                      ? "#ccc"
                      : colorScale(countryData);
                  }
                });
  
                updateChart(selectedCountry);
              } else {
                // Show all lines
                svgLineChart.selectAll("path").style("display", "initial");
  
                // Reset dots color to original
                svgLineChart.selectAll("circle").style("display", "initial");
  
                path.classed("active", false).attr("stroke-width", 2);
              }
            });
        });
        // Function to update the chart based on the selected country
        function updateChart(selectedCountry) {
          if (selectedCountry === "All Countries") {
            // Show all lines
            svgLineChart
              .selectAll("path")
              .style("display", "initial")
              .attr("stroke-width", 2);
  
            // Show all dots
            svgLineChart.selectAll("circle").style("display", "initial");
  
            // Remove active class from all lines
            svgLineChart.selectAll("path").classed("active", false);
          } else {
            // Hide all lines
            svgLineChart.selectAll("path").style("display", "none");
  
            // Hide all dots
            svgLineChart.selectAll("circle").style("display", "none");
  
            // Show selected country line
            const lineClass = `.line-${selectedCountry
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")}`;
            svgLineChart
              .select(lineClass)
              .style("display", "initial")
              .attr("stroke-width", 4);
  
            // Show dots of the selected country line
            const dotClass = `.dot-${selectedCountry
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")}`;
            svgLineChart.selectAll(dotClass).style("display", "initial");
  
            // Set the class to active
            svgLineChart.select(lineClass).classed("active", true);
          }
        }
  
        // Define projection for the map
        const projection = d3
          .geoOrthographic()
          //.scale(Math.min(mapWidth, mapHeight))
          .scale(200)
          .translate([mapWidth / 2, mapHeight / 1, 3])
          .clipAngle(90);
  
        // Define path generator for the map
        const mapPath = d3.geoPath().projection(projection);
  
        // Create an outer circle to represent the globe's boundary
        svgMap
          .append("circle")
          .attr("cx", mapWidth / 2)
          .attr("cy", mapHeight / 1, 3)
          .attr("r", projection.scale())
          .attr("fill", "#00072d"); // Sea color
  
        // Create a tooltip for the map
        const tooltipMap = d3
          .select("#map")
          .append("div")
          .attr("id", "tooltip-map")
          .style("position", "absolute")
          .style("background", "#f4f4f4")
          .style("padding", "5px")
          .style("border", "1px solid #333")
          .style("border-radius", "3px")
          .style("pointer-events", "none")
          .style("display", "none");
  
        // State variables
        let enlargedCountry = null;
        let isPlaying = false;
        let intervalId = null;
        let currentYearIndex = 0;
        let lastKnownValue = new Map(); // Variable to store last known value for each country
  
        // UI Elements
        const yearSelector = d3.select("#select-year").on("change", () => {
          if (isPlaying) {
            togglePlayStop();
          }
          updateMap();
        });
  
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
  
        // Sort data by year ascending
        data.sort((a, b) => a.year - b.year);
  
        // Define color scale based on custom breaks for map
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
  
        // Populate country dropdown for map
        const countrySelectorMap = d3
          .select("#select-country")
          .on("change", () => {
            function centerCountry(d) {
              const centroid = d3.geoCentroid(d);
              const rotate = projection.rotate();
              const newRotate = [-centroid[0], -centroid[1], rotate[2]];
              projection.rotate(newRotate);
              svgMap.selectAll(".country").attr("d", mapPath);
            }
  
            const selectedCountry = countrySelectorMap.node().value;
            svgMap.selectAll(".country").attr("fill", (d) => {
              const countryData = d.properties.eduExp;
              if (d.properties.name === selectedCountry) {
                // Highlight the selected country
                //centerCountry(d);
                centerCountry(d);
                return "#ffa500"; // orange color
              } else {
                // Reset other countries to original fill color
                return countryData === undefined
                  ? "#ccc"
                  : colorScale(countryData);
              }
            });
  
            updateChart(selectedCountry);
          });
  
        // Get unique countries from data
        const uniqueCountriesMap = [...new Set(data.map((d) => d.Entity))];
  
        // Sort the countries in ascending order
        uniqueCountriesMap.sort((a, b) => a.localeCompare(b));
  
        // Add "All Countries" at the beginning
        uniqueCountriesMap.unshift("All Countries");
  
        // Populate the dropdown with unique countries
        countrySelectorMap
          .selectAll("option")
          .data(uniqueCountriesMap)
          .enter()
          .append("option")
          .attr("value", (d) => d)
          .text((d) => d);
  
        // Populate country dropdown for line chart
        const countryDropdownLineChart = d3
          .select("#select-country-line-chart")
          .on("change", () => {
            const selectedCountry = countryDropdownLineChart.node().value;
            updateChart(selectedCountry);
          });
  
        // Populate the dropdown with unique countries from data for line chart
        const uniqueCountriesLineChart = [...new Set(data.map((d) => d.Entity))];
        countryDropdownLineChart
          .selectAll("option")
          .data(uniqueCountriesLineChart)
          .enter()
          .append("option")
          .attr("value", (d) => d)
          .text((d) => d);
  
        // Initialize map and line chart with default country
        updateMap();
  
        updateChart("All Countries");
  
        // Function to update the map based on selected year
        function updateMap() {
          const selectedYear = +yearSelector.node().value;
  
          // Find the index of the selected year in the dropdown options
          const options = yearSelector.selectAll("option");
          currentYearIndex = options
            .nodes()
            .findIndex((option) => +option.value === selectedYear);
  
          // Filter data for the selected year and all previous years
          const filteredData = data.filter((d) => d.year <= selectedYear);
  
          // Update last known values only if autoplay is starting a new cycle or there are values before the selected year
          if (currentYearIndex === 0 || filteredData.length > 0) {
            lastKnownValue.clear(); // Clear existing last known values
            filteredData.forEach((d) => {
              lastKnownValue.set(d.Entity, d["EDU Exp. Per Person Absolute"]);
            });
          }
  
          // Load GeoJSON data
          const countries = topojson.feature(
            world,
            world.objects.countries
          ).features;
  
          // Merge filtered CSV data with GeoJSON data for map
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
              : undefined; ////////////////////////////////////////////////////////////////////////////////////////////////////////////
          });
  
          // Draw the countries on map
          const countryPaths = svgMap
            .selectAll(".country")
            .data(countries)
            .join("path")
            .attr("class", "country")
            .attr("d", mapPath)
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
                // Only hide tooltip if no country is enlarged
                hideTooltip();
              }
            })
            .on("mousemove", (event) => {
              if (!enlargedCountry) {
                // Update tooltip position if no country is enlarged
                tooltipMap
                  .style("left", event.pageX + 5 + "px")
                  .style("top", event.pageY - 28 + "px");
              }
            })
            .on("click", function (event, d) {
              if (enlargedCountry === this) {
                console.log(this);
                // Reset the country to its original size
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr("transform", "scale(1)");
                enlargedCountry = null;
                tooltipMap.style("display", "none"); // Hide tooltip when unclicking
              } else {
                // Reset all countries
                countryPaths
                  .transition()
                  .duration(200)
                  .attr("transform", "scale(1)");
  
                // Update the state
                enlargedCountry = this;
  
                // Display country name and EDU Exp. Per Person Absolute in tooltip
                showTooltip(event, d);
              }
  
              // Center the clicked country
              centerCountry(d);
  
              // Update the dropdown selection to match the clicked country
              countrySelectorMap.node().value = d.properties.name;
              countrySelectorMap.dispatch("change"); // Trigger change event on the dropdown
            });
  
          // Create legend
          createLegend(colorScale);
  
          // Enable user-controlled rotation
          enableDragRotation();
  
          // Auto-play functionality
          if (isPlaying) {
            startAutoPlay();
          }
  
          function centerCountry(d) {
            const centroid = d3.geoCentroid(d);
            const rotate = projection.rotate();
            const newRotate = [-centroid[0], -centroid[1], rotate[2]];
            projection.rotate(newRotate);
            svgMap.selectAll(".country").attr("d", mapPath);
          }
  
          function createLegend(colorScale) {
            const legendContainer = d3.select("#legend");
  
            // Clear existing legend
            legendContainer.html("");
  
            // Define custom legend ticks
            const legendTicks = [
              0, 50, 100, 200, 500, 1000, 2000, 3000, 5000, 10000,
            ];
  
            // Create legend item groups
            const legend = legendContainer
              .append("svg")
              .attr("width", legendContainerWidth) // Adjust width as needed
              .attr("height", 20)
              .selectAll(".legend-item")
              .data(legendTicks)
              .enter()
              .append("g")
              .attr("class", "legend-item")
              .attr("transform", (d, i) => `translate(${i * 50}, 0)`); // Adjust spacing as needed
  
            // Add colored rectangles to legend
            legend
              .append("rect")
              .attr("width", legendContainerWidth / legendTicks.length)
              .attr("height", 5)
              .style("fill", (d) => colorScale(d));
  
            // Add legend labels
            legend
              .append("text")
              .attr("class", "legend-label")
              .attr("x", (legendContainerWidth / legendTicks.length - 5) / 2) // Adjust x position to center the text
              .attr("y", 15) // Position text below the rectangles
              .style("text-anchor", "middle")
              .style("font-size", "10px") // Adjust font size as needed
              .text((d) => {
                if (d === 10000) {
                  return "10000+";
                } else {
                  return d;
                }
              });
          }
  
          // Function to show tooltip
          function showTooltip(event, d) {
            const [x, y] = d3.pointer(event);
            tooltipMap
              .style("display", "block")
              .style("left", x + "px")
              .style("top", y + "px")
              .html(
                `<strong>${d.properties.name}</strong><br>
                      ${
                        d.properties.eduExp !== undefined
                          ? `EDU Exp. Per Person: ${d.properties.eduExp.toFixed(
                              2
                            )}`
                          : "Data not available"
                      }`
              );
          }
  
          // Enable user-controlled rotation
          function enableDragRotation() {
            const drag = d3.drag().on("drag", (event) => {
              const rotate = projection.rotate();
              const k = 0.5; // Sensitivity factor
              projection.rotate([
                rotate[0] + event.dx * k,
                rotate[1] - event.dy * k,
              ]);
              svgMap.selectAll(".country").attr("d", mapPath);
            });
  
            svgMap.call(drag);
          }
  
          function showTooltip(event, d) {
            tooltipMap
              .style("display", "block")
              .html(
                `${d.properties.name}: ${
                  d.properties.eduExp !== undefined
                    ? d.properties.eduExp
                    : "No data"
                }`
              )
              .style("left", event.pageX + 5 + "px")
              .style("top", event.pageY - 28 + "px");
          }
  
          // Function to hide tooltip
          function hideTooltip() {
            tooltipMap.style("display", "none");
          }
          /*
          // Function to enlarge country
          function enlargeCountry(d) {
            enlargedCountry = d;
  
            // Reset zoom to show entire map
            svgMap
              .transition()
              .duration(750)
              .call(
                zoom.transform,
                d3.zoomIdentity,
                d3.pointer(event, svgMap.node())
              );
          }
              */
        }
  
        // Set initial state
        const initialCountry = "All Countries";
        updateChart(initialCountry);
  
        // Add gridlines to the line chart
        const xGridlines = d3
          .axisBottom(xScale)
          .tickSize(-chartHeight)
          .tickFormat("")
          .ticks(5);
  
        const yGridlines = d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat("")
          .ticks(5);
  
        svgLineChart
          .append("g")
          .attr("class", "grid")
          .attr("transform", `translate(0,${chartHeight})`)
          .call(xGridlines);
  
        svgLineChart.append("g").attr("class", "grid").call(yGridlines);
  
        // Add labels to the axes
        svgLineChart
          .append("text")
          .attr("class", "x axis-label")
          .attr("x", chartWidth)
          .attr("y", chartHeight + margin.bottom - 5)
          .attr("text-anchor", "middle")
          .text("Year");
  
        svgLineChart
          .append("text")
          .attr("class", "y axis-label")
          .attr("x", -chartHeight)
          .attr("y", -margin.left + 15)
          //.attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .text("Education Cost Per Person (US$)");
        /*
        let zoomed = d3
          .zoom()
          .scaleExtent([0.5, 10])
          .extent([
            [0, 0],
            [width, height],
          ])
          .on("zoom", NeuerChart);
  */
  
        function zoomed({ transform }, d) {
          // Check if transform is defined
          if (!transform) return;
  
          const scale = transform.k;
          const [x, y] = [mapWidth / 2, mapHeight / 2];
  
          // Apply the zoom transformation centered around [x, y]
          svgMap.attr(
            "transform",
            `translate(${x},${y}) scale(${scale}) translate(${-x},${-y})`
          );
        }
      })
  
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, [])}

const DoubleChart = () => {
  return (
    <div class="container">
      <div className="left">
        <h2>Education Expenditure Globe</h2>
        <div id="map"></div>
        <div id="legend_double_chart"><label for="legend_double_chart" id="legend-label">Education Expenditure per Person (US $)</label></div>
        <div id="title"><h3>Education Expenditure in OECD Countries per Year</h3></div>
      </div>
      <div className="right">
        <h2>Global Education Expenditure Line Chart</h2>
        <div id="chart"></div>
        <div id="select-country-container">
          <label for="select-country"  id="select-country-label">Select Country:</label>
          <select id="select-country"></select>
        </div>
        <div id="select-year-container">
          <label for="select-year" id="select-year-label">Select Year:</label>
          <select id="select-year"></select>
          <button id="play-stop-button">Play / Stop</button>
        </div>
      </div>
        {DoubleChartDataLoader()}
    </div>
  )
}









const FinalChart1DataLoader = () => {
  useEffect(() => { 
    const margin = {top: 40, right: 130, bottom: 60, left: 70},
              width = 960 - margin.left - margin.right,
              height = 600 - margin.top - margin.bottom;

        const svg = d3.select("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", `translate(${margin.left},${margin.top})`);

        const tooltip = d3.select("#tooltip");

        let dataGlobal;

        // Load data
        d3.csv("Pisa_Economy_Final.csv").then(data => {
            // Parse data
            data.forEach(d => {
                d['Year'] = +d['Year'];
                d['Country'] = d['Country'];
                d['Country Name'] = d['Country Name'];
                d['Continent'] = d['Continent']; // Assuming Continent is the field name
                d.Performance = +d['Average Performance'];
                d.Expenditure = +d['EDU Exp. Per Person Absolute'];
                d.Population = +d['Population'];
            });

            dataGlobal = data;

            // Populate the dropdown with unique years, sorted from largest to smallest
            const years = [...new Set(data.map(d => d.Year))].sort((a, b) => b - a);
            const select = d3.select("#year-select");
            select.selectAll("option")
                  .data(years)
                  .enter()
                  .append("option")
                  .attr("value", d => d)
                  .text(d => d);

            // Initial display
            update(data.filter(d => d.Year === years[0]));

            // Event listener for dropdown
            select.on("change", function() {
                const selectedYear = +this.value;
                update(data.filter(d => d.Year === selectedYear));
            });
        });

        function update(filteredData) {
            // Normalize data
            const maxExpenditure = d3.max(filteredData, d => d.Expenditure);
            const maxPerformance = d3.max(filteredData, d => d.Performance);

            filteredData.forEach(d => {
                d.normalizedExpenditure = d.Expenditure / maxExpenditure;
                d.normalizedPerformance = d.Performance / maxPerformance;
            });

            // Clear previous elements
            svg.selectAll("*").remove();

            // Set scales
            const x = d3.scaleLinear()
                        .domain([-0.05, 1.05]) // Adding padding to ensure bubbles are inside
                        .range([0, width]);

            const y = d3.scaleLinear()
                        .domain([-0.05, 1.05]) // Adding padding to ensure bubbles are inside
                        .range([height, 0]);

            const z = d3.scaleSqrt()
                        .domain([0, d3.max(filteredData, d => d.Population)])
                        .range([2, 30]);

            // Define a color scale for continents
            const continentColors = d3.scaleOrdinal(d3.schemeSet2);

            // Define a color scale for countries within continents
            const countryColors = {};
            d3.groups(filteredData, d => d.Continent).forEach(group => {
                countryColors[group[0]] = d3.scaleLinear()
                                            .domain([0, group[1].length - 1])
                                            .range([continentColors(group[0]), d3.color(continentColors(group[0])).darker(1)])
                                            .interpolate(d3.interpolateLab);
            });

            const countryColorMap = {};
            d3.groups(filteredData, d => d.Continent).forEach(group => {
                group[1].forEach((d, i) => {
                    countryColorMap[d.Country] = countryColors[d.Continent](i / (group[1].length - 1));
                });
            });

            // Add X axis
            svg.append("g")
               .attr("transform", `translate(0,${height})`)
               .call(d3.axisBottom(x))
               .append("text")
               .attr("class", "axis-title")
               .attr("x", width / 2)
               .attr("y", margin.bottom - 10)
               .attr("fill", "black")
               .style("text-anchor", "middle")
               .text("Normalized Expenditure");

            // Add Y axis
            svg.append("g")
               .call(d3.axisLeft(y))
               .append("text")
               .attr("class", "axis-title")
               .attr("transform", "rotate(-90)")
               .attr("x", -height / 2)
               .attr("y", -margin.left + 20)
               .attr("fill", "black")
               .style("text-anchor", "middle")
               .text("Normalized Performance");

            // Add X grid lines
            svg.append("g")
               .attr("class", "grid")
               .attr("transform", `translate(0,${height})`)
               .call(d3.axisBottom(x)
                       .tickSize(-height)
                       .tickFormat(""));

            // Add Y grid lines
            svg.append("g")
               .attr("class", "grid")
               .call(d3.axisLeft(y)
                       .tickSize(-width)
                       .tickFormat(""));

            // Group data by continent
            const continents = d3.group(filteredData, d => d.Continent);

            // Add dots
            const groups = svg.selectAll(".continent-group")
                              .data(continents)
                              .enter()
                              .append("g")
                              .attr("class", "continent-group")
                              .attr("id", d => `group-${d[0].replace(/\s/g, '')}`);

            groups.selectAll("circle")
                  .data(d => d[1])
                  .enter()
                  .append("circle")
                  .attr("cx", d => x(d.normalizedExpenditure))
                  .attr("cy", d => y(d.normalizedPerformance))
                  .attr("r", d => z(d.Population))
                  .attr("fill", d => countryColorMap[d.Country])
                  .attr("stroke", "black")
                  .attr("stroke-width", 1)
                  .attr("opacity", 0.7)
                  .on("mouseenter", (event, d) => {
                        tooltip.transition()
                               .duration(200)
                               .style("opacity", .9);
                        tooltip.html(`Country: ${d['Country Name']}<br>Expenditure: ${d.Expenditure}<br>Performance: ${d.Performance}<br>Population: ${d.Population}`)
                               .style("left", (event.pageX + 5) + "px")
                               .style("top", (event.pageY - 28) + "px");

                        d3.selectAll(".continent-group").attr("opacity", 0.1);
                        d3.select(`#group-${d.Continent.replace(/\s/g, '')}`).attr("opacity", 1);
                  })
                  .on("mouseleave", d => {
                        tooltip.transition()
                               .duration(500)
                               .style("opacity", 0);

                        d3.selectAll(".continent-group").attr("opacity", 1);
                  });

            // Add labels
            groups.selectAll("text")
                  .data(d => d[1])
                  .enter()
                  .append("text")
                  .attr("x", d => x(d.normalizedExpenditure))
                  .attr("y", d => y(d.normalizedPerformance))
                  .attr("dy", -4)
                  .attr("text-anchor", "middle")
                  .text(d => d.Country)
                  .attr("class", "label")
                  .style("fill", d => countryColorMap[d.Country]);

            // Add legend for continents
            const legend = svg.append("g")
                              .attr("transform", `translate(${width + 20}, 0)`);

                              const legendItems = legend.selectAll(".legend-item")
                                      .data(continents)
                                      .enter()
                                      .append("g")
                                      .attr("class", "legend-item")
                                      .attr("transform", (d, i) => `translate(0, ${i * 20})`)
                                      .on("mouseenter", function(event, d) {
                                            d3.selectAll(".continent-group").attr("opacity", 0.1);
                                            d3.select(`#group-${d[0].replace(/\s/g, '')}`).attr("opacity", 1);
                                      })
                                      .on("mouseleave", function() {
                                            d3.selectAll(".continent-group").attr("opacity", 1);
                                      });

            legendItems.append("rect")
                       .attr("x", 0)
                       .attr("y", 0)
                       .attr("width", 18)
                       .attr("height", 18)
                       .style("fill", d => continentColors(d[0]));

            legendItems.append("text")
                       .attr("x", 24)
                       .attr("y", 9)
                       .attr("dy", ".35em")
                       .style("text-anchor", "start")
                       .text(d => d[0])
                       .attr("class", "legend");
        }
  }, [])}

const FinalChart1 = () => {
  return (
    <div>
      <div className="filter-container">
          <label for="year-select">Choose a year:</label>
          <select id="year-select"></select>
      </div>
      <div className="chart-container">
          <svg width="960" height="600"></svg>
      </div>
      <div className="tooltip" id="tooltip"></div>
      {FinalChart1DataLoader()}
    </div>
  )
}





const TestChartDataLoader = () => {
  useEffect(() => {  
    d3.csv("Pisa Economy Final.csv").then(function(data) {
      // Convert data types
      data.forEach(function(d) {
        d['Normalized Reading'] = +d['Normalized Reading'];
        d['Normalized Science'] = +d['Normalized Science'];
        d['Average Performance'] = +d['Average Performance'];
        d['Math'] = +d['Math'];
        d['Normalized Math'] = +d['Normalized Math'];
        d['Average Reading'] = +d['Average Reading'];
        d['Average Science'] = +d['Average Science'];
        d['Average Math'] = +d['Average Math'];
        d['Reading'] = +d['Reading'];
        d['Science'] = +d['Science'];
        d['Year'] = +d['Year'];
        d['Population'] = +d['Population'];
        d['Country'] = d['Country'];
        d['Country Name'] = d['Country Name'];
        d['School Ownership'] = +d['School Ownership'];
        d['School Size'] = +d['School Size'];
        d['Proportion of all teachers fully certified'] = +d['Proportion of all teachers fully certified'];
        d['Student-Teacher ratio'] = +d['Student-Teacher ratio'];
        d['Available computers per student'] = +d['Available computers per student'];
        d['Shortage of educational staff'] = +d['Shortage of educational staff'];
        d['Shortage of educational material'] = +d['Shortage of educational material'];
        d['Student behavior hindering learning'] = +d['Student behavior hindering learning'];
        d['Teacher behavior hindering learning'] = +d['Teacher behavior hindering learning'];
        d['Class Size'] = +d['Class Size'];
        d['Creative extra-curricular activities'] = +d['Creative extra-curricular activities'];
        d['EDU Exp. Per Person Absolute'] = +d['EDU Exp. Per Person Absolute'];
        d['ROUND GDP'] = +d['ROUND GDP'];
        d['GDP/POPULATION'] = +d['GDP/POPULATION'];
        d['Public Percentage'] = +d['Public Percentage'];
        d['Private Government-dependent Percentage'] = +d['Private Government-dependent Percentage'];
        d['Private Independent Percentage'] = +d['Private Independent Percentage'];
      });

      // Get unique years and countries for the selectors
      var years = Array.from(new Set(data.map(d => d.Year)));
      var countries = Array.from(new Set(data.map(d => d.Country)));
      var countrynames = Array.from(new Set(data.map(d => d['Country Name'])));
      var defaultYear = 2022;

      // Populate year selectors with radio buttons
      var yearSelector = d3.select("#yearSelector");
      yearSelector.selectAll("div")
        .data(years)
        .enter().append("div")
        .attr("class", "form-check form-check-inline")
        .html(function(d) {
          return `<input class="form-check-input" type="radio" name="year" id="year${d}" value="${d}" ${d === defaultYear ? 'checked' : ''}>
                  <label class="form-check-label" for="year${d}">${d}</label>`;
        });

      // Populate country selectors
      var countrySelector = d3.select("#countrySelector");
      countrySelector.selectAll("option")
        .data(countries)
        .enter().append("option")
        .text(d => d)
        .attr("value", d => d);

      // Initial chart rendering with preselected year
      if (years.includes(defaultYear)) {
        updateChart1(defaultYear);
        updateChart4(countries[0], defaultYear);
        updateChart5(countries[0], defaultYear);
        d3.select("#chart4-title").text("School Ownership in " + countrynames[0]);
        d3.select("#chart5-title").text("Education Extras in " + countrynames[0]);
      } else {
        updateChart1(years[0]);
        updateChart4(countries[0], years[0]);
        updateChart5(countries[0], years[0]);
        d3.select("#chart4-title").text("School Ownership in " + countrynames[0]);
        d3.select("#chart5-title").text("Education Extras in " + countrynames[0]);
      }

      // Add event listeners for the selectors
      yearSelector.on("change", function() {
        var selectedYear = d3.select('input[name="year"]:checked').property("value");
        updateChart1(selectedYear);
        updateChart4(countries[0], selectedYear);
        updateChart5(countries[0], selectedYear);
        // Update chart titles
        d3.select("#chart4-title").text("School Ownership in " + countrynames[0]);
        d3.select("#chart5-title").text("Education Extras in " + countrynames[0]);
      });

      function updateChart1(selectedYear) {
        var filteredData = data.filter(d => d.Year == selectedYear);

        // Sort filteredData by 'Average Performance' in descending order
        filteredData.sort((a, b) => b['Average Performance'] - a['Average Performance']);

        var margin = {top: 20, right: 20, bottom: 20, left: 50};
        var container = d3.select("#chart1").node();
        var width = container.getBoundingClientRect().width - margin.left - margin.right;
        var height = container.getBoundingClientRect().height - margin.top - margin.bottom;

        d3.select("#chart1").selectAll("*").remove();

        var svg1 = d3.select("#chart1").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x1 = d3.scaleLinear().range([0, width]),
            y1 = d3.scaleBand().range([0, height]).padding(0.2);

        x1.domain([0, 550]);  // Set x axis range from 0 to 600
        y1.domain(filteredData.map(function(d) { return d['Country Name']; }));

        svg1.append("g")
          .attr("class", "grid")
          .call(d3.axisTop(x1).tickSize(-height).tickFormat(""))
          .selectAll("line");

        svg1.append("g")
            .attr("transform", "translate(0,0)")
            .call(d3.axisTop(x1));

        svg1.append("g")
            .call(d3.axisLeft(y1));

        // Use pale colors for the bars
        var colorScale = d3.scaleOrdinal()
                           .range(d3.schemePastel1);

        // Create a tooltip
        var tooltip = d3.select("#chart1").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "lightsteelblue")
            .style("padding", "5px")
            .style("border-radius", "8px")
            .style("pointer-events", "none");

        var eduExpMax = 550;
        var eduExpScale = d3.scaleLinear()
            .domain([0, d3.max(filteredData, function(d) { return d['EDU Exp. Per Person Absolute']; })])
            .range([0, eduExpMax]);

        svg1.selectAll(".bar-group")
          .data(filteredData)
          .enter().append("g")
            .attr("class", "bar-group")
            .each(function(d, i) {
                var group = d3.select(this);

                group.append("rect")
                    .attr("class", "bar")
                    .attr("x", 0)
                    .attr("y", y1(d['Country Name']))
                    .attr("height", y1.bandwidth())
                    .attr("width", x1(d['Average Performance']))
                    .attr("rx", 5) // Rounded corners
                    .attr("ry", 5) // Rounded corners
                    .style("fill", colorScale(i));

                group.append("line")
                    .attr("class", "line")
                    .attr("x1", 0)
                    .attr("y1", y1(d['Country Name']) + y1.bandwidth() / 2)
                    .attr("x2", x1(eduExpScale(d['EDU Exp. Per Person Absolute'])))
                    .attr("y2", y1(d['Country Name']) + y1.bandwidth() / 2)
                    .attr("stroke", "grey")
                    .attr("stroke-width", 1);

                group.append("circle")
                    .attr("class", "circle")
                    .attr("cx", x1(eduExpScale(d['EDU Exp. Per Person Absolute'])))
                    .attr("cy", y1(d['Country Name']) + y1.bandwidth() / 2)
                    .attr("r", 3) 
                    .style("fill", "grey") 
                    .style("stroke", "black")
                    .style("stroke-width", 1);

                group.on("mouseover", function(event) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html("Country: " + d['Country Name'] + "<br/>Performance: " + d['Average Performance'].toFixed(2) + "<br/>EDU Expenditure: " + d['EDU Exp. Per Person Absolute'].toFixed(2))
                        .style("left", (d3.pointer(event, this)[0]) + "px")
                        .style("top", (d3.pointer(event, this)[1]  + 40) + "px");

                    d3.selectAll(".bar-group").transition().duration(200).style("opacity", 0.5);
                    d3.select(this).transition().duration(200).style("opacity", 1);

                    var selectedCountry = d['Country'];
                    var selectedYear = d3.select('input[name="year"]:checked').property("value");
                    d3.select("#countrySelector").property("value", selectedCountry);
                    updateChart4(selectedCountry, selectedYear);
                    updateChart5(selectedCountry, selectedYear);

                    // Update chart titles
                    d3.select("#chart4-title").text("School Ownership in " + d['Country Name']);
                    d3.select("#chart5-title").text("Education Extras for " + d['Country Name']);
                })
                .on("mousemove", function(event) {
                    tooltip.style("left", (d3.pointer(event, this)[0]) + "px")
                           .style("top", (d3.pointer(event, this)[1]  + 40) + "px");
                })
                .on("mouseout", function() {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);

                    d3.selectAll(".bar-group").transition().duration(200).style("opacity", 1);
                });
            });
      }

function updateChart4(selectedCountry, selectedYear) {
  var filteredData = data.filter(d => d.Country == selectedCountry && d.Year == selectedYear);

  var margin = {top: 20, right: 30, bottom: 40, left: 50};
  var container = d3.select("#chart4").node();
  var width = container.getBoundingClientRect().width - margin.left - margin.right;
  var height = container.getBoundingClientRect().height - margin.top - margin.bottom;

  d3.select("#chart4").selectAll("*").remove();

  var svg3 = d3.select("#chart4").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  var chartGroup = svg3.append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

  var radius = Math.min(width, height) / 2;
  var pie = d3.pie()
      .value(function(d) { return d.value; })
      .sort(null);

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70); // Adjust the inner radius for donut chart

  var pieData = [
    {label: "Public", value: d3.sum(filteredData, function(d) { return d['Public Percentage']; })},
    {label: "Private", value: d3.sum(filteredData, function(d) { return d['Private Independent Percentage']; })},
    {label: "Private-Government", value: d3.sum(filteredData, function(d) { return d['Private Government-dependent Percentage']; })}
  ];

  var colors = d3.scaleOrdinal(d3.schemeCategory10);

  var g = chartGroup.selectAll(".arc")
    .data(pie(pieData))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return colors(d.index); });

  var legendGroup = svg3.append("g")
      .attr("transform", "translate(" + (margin.left) + "," + (height + margin.top + 10) + ")");

  var legend = legendGroup.selectAll(".legend")
    .data(pieData)
    .enter().append("g")
      .attr("class", "legend");

  legend.append("rect")
      .attr("x", function(d, i) { return i * 100; }) // Adjust the spacing between legend items horizontally
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return colors(i); });

  legend.append("text")
      .attr("x", function(d, i) { return i * 100 + 24; }) // Adjust the spacing between legend items horizontally
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d.label; });
}




function updateChart5(selectedCountry, selectedYear) {
  var filteredData = data.filter(d => d.Country == selectedCountry);

  var margin = {top: 50, right: 130, bottom: 50, left: 100},
        width = 450 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom,
        radius = Math.min(width, height) / 2;

  d3.select("#chart5").selectAll("*").remove();

  var svg4 = d3.select("#chart5").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

  var fields = ['Creative extra-curricular activities', 'Available computers per student', 'Proportion of all teachers fully certified', 'Student-Teacher ratio', 'School Size', 'Class Size'];

  // Normalize data
  var maxValues = {};
  fields.forEach(field => {
      maxValues[field] = d3.max(filteredData, d => d[field]);
  });

  filteredData.forEach(d => {
      fields.forEach(field => {
          d[field + "_norm"] = d[field] / maxValues[field];
      });
  });

  filteredData = filteredData.filter(d => d.Year == selectedYear);

  // Scale for the radius
  var radiusScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 1]);  // Normalized to 1

  // Angle for each axis
  var angleSlice = Math.PI * 2 / fields.length;

  // Color scale
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // Draw the concentric cycles
  var levels = 5;  // Number of concentric cycles
  var grid = svg4.append("g").attr("class", "gridWrapper");

  grid.selectAll(".gridCircle")
      .data(d3.range(1, levels + 1).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", d => radius / levels * d)
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", 0.1);

  // Add labels for the concentric cycles
  grid.selectAll(".gridLabel")
      .data(d3.range(1, levels + 1).reverse())
      .enter()
      .append("text")
      .attr("class", "gridLabel")
      .attr("x", 4)
      .attr("y", d => -d * radius / levels)
      .attr("dy", "0.4em")
      .style("font-size", "10px")
      .attr("fill", "#737373")
      .text(d => d3.format('.1f')(d / levels));

  // Draw the segments for the polar area chart
  filteredData.forEach(d => {
      fields.forEach((field, i) => {
          var segmentData = [
              {startAngle: i * angleSlice, endAngle: (i + 1) * angleSlice, value: d[field + "_norm"]}
          ];

          var arc = d3.arc()
              .innerRadius(0)
              .outerRadius(d => radiusScale(d.value))
              .startAngle(d => d.startAngle)
              .endAngle(d => d.endAngle);

          svg4.append("path")
              .attr("class", "segment")
              .attr("d", arc(segmentData[0]))
              .style("fill", color(field))
              .style("fill-opacity", 0.5)
              .style("stroke", "white")
              .style("stroke-width", "2px");

          // Add labels to each segment
          var labelAngle = (segmentData[0].startAngle + segmentData[0].endAngle) / 2;
          var xOffset = (radius + 10) * Math.cos(labelAngle - Math.PI / 2);
          var yOffset = (radius + 10) * Math.sin(labelAngle - Math.PI / 2);

          svg4.append("text")
              .attr("class", "legend")
              .style("font-size", "11px")
              .attr("text-anchor", "middle")
              .attr("dy", "0.35em")
              .attr("x", xOffset)
              .attr("y", yOffset)
              .text(field)
              .style("text-anchor", () => {
                  if (labelAngle >= 0 && labelAngle < Math.PI) {
                      return "start"; // Right side
                  } else {
                      return "end"; // Left side
                  }
              });
      });
  });

  // Add legend
  var legend = svg4.selectAll(".legend")
      .data(fields)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legend.append("rect")
      .attr("x", width + 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width + 44)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(d => d);
}


}).catch(function(error){
console.log("Error loading or processing data:", error);
});

  }, [])}

const TestChart = () => {
  return (
    <div> 
      <div className="container-fluid py-5">
    <div className="row">
      <div className="col-lg-8 col-12">
        <div className="border p-3 mb-4">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="card">
                <div className="card-header"><h2 className="text-center">Pisa General Results</h2></div>
                <div className="card-body">
                  <div id="chart1" className="chart chart1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-12">
        <div className="border p-3 mb-4">
          <h4 className="text-center">Filter by Year</h4>
          <div id="yearSelector" className="form-group d-flex flex-wrap justify-content-center">
          </div>
        </div>
        <div className="border p-3 mb-4">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="card">
                <div className="card-header" id="chart4-title">School Ownership</div>
                <div className="card-body">
                  <div id="chart4" className="chart"></div>
                </div>
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="card">
                <div className="card-header" id="chart5-title">Education Extra</div>
                <div className="card-body">
                  <div id="chart5" className="chart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      {TestChartDataLoader()}
    </div>
  )
}