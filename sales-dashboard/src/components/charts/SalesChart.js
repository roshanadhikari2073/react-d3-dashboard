import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SalesChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (data && data.length) {
            const svg = d3.select(svgRef.current);
            svg.selectAll("*").remove(); // Clear previous SVG content

            const margin = { top: 20, right: 30, bottom: 40, left: 50 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // Append the svg object to the body of the page
            const chart = svg.append("g")
                             .attr("transform", `translate(${margin.left},${margin.top})`);

            // Parse the date / time
            const parseTime = d3.timeParse("%Y-%m-%d");

            // Format the data
            data.forEach(function(d) {
                d.date = parseTime(d.date);
                d.value = +d.value;
            });

            // Set up scales
            const x = d3.scaleTime()
                        .domain(d3.extent(data, d => d.date))
                        .range([0, width]);

            const y = d3.scaleLinear()
                        .domain([0, d3.max(data, d => d.value)])
                        .range([height, 0]);

            // Add X axis
            chart.append("g")
                 .attr("transform", `translate(0,${height})`)
                 .call(d3.axisBottom(x));

            // Add Y axis
            chart.append("g")
                 .call(d3.axisLeft(y));

            // Define the line
            const valueline = d3.line()
                                .x(d => x(d.date))
                                .y(d => y(d.value));

            // Add the valueline path.
            chart.append("path")
                 .data([data])
                 .attr("class", "line")
                 .attr("d", valueline)
                 .attr("stroke", "steelblue")
                 .attr("stroke-width", 2)
                 .attr("fill", "none");

            // Add a title
            svg.append("text")
               .attr("x", width / 2 + margin.left)
               .attr("y", margin.top)
               .attr("text-anchor", "middle")
               .style("font-size", "16px")
               .text("Sales Over Time");

            // Optionally, you could add dots for each data point
            chart.selectAll(".dot")
                 .data(data)
                 .enter().append("circle") // Uses the enter().append() method
                 .attr("class", "dot") // Assign a class for styling
                 .attr("cx", d => x(d.date))
                 .attr("cy", d => y(d.value))
                 .attr("r", 5)
                 .attr("fill", "#ffab00");

            // Here you can add more features like tooltips, zoom/pan functionalities, etc.
        }
    }, [data]); // Redraw the chart if data changes

    return <svg ref={svgRef} width="600" height="400"></svg>;
};

export default SalesChart;
