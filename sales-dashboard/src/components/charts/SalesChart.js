import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SalesChart = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (data && data.length) {
            const svg = d3.select(svgRef.current);

            // Set up dimensions
            const margin = { top: 50, right: 30, bottom: 40, left: 50 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // Clear previous SVG content
            svg.selectAll("*").remove();

            // Set up the SVG with the proper width and height
            svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .attr("preserveAspectRatio", "xMinYMin meet");
            
            // Append the group element once
            const chart = svg.append("g")
                             .attr("transform", `translate(${margin.left},${margin.top})`);

            // Parse dates and values
            const parsedData = data.map(d => ({
                date: d3.timeParse("%Y-%m-%d")(d.date),
                value: +d.value
            }));

            // Set up scales
            const x = d3.scaleTime()
                        .domain(d3.extent(parsedData, d => d.date))
                        .range([0, width]);

            const y = d3.scaleLinear()
                        .domain([0, d3.max(parsedData, d => d.value)])
                        .range([height, 0]);

            // Add X axis
            chart.append("g")
                 .attr("transform", `translate(0,${height})`)
                 .call(d3.axisBottom(x))
                 .selectAll("text")
                 .attr("transform", "translate(-10,0)rotate(-45)")
                 .style("text-anchor", "end");

            // Add Y axis
            chart.append("g")
                 .call(d3.axisLeft(y));

            // Define the line
            const valueline = d3.line()
                                .x(d => x(d.date))
                                .y(d => y(d.value));

            // Add the valueline path.
            chart.append("path")
                 .datum(parsedData) // Use `datum` for a single line
                 .attr("fill", "none")
                 .attr("stroke", "steelblue")
                 .attr("stroke-width", 2)
                 .attr("d", valueline);

            // Add a title
            svg.append("text")
            .attr("x", width / 2 + margin.left)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Sales Over Time");

            // Add dots for each data point
            chart.selectAll(".dot")
                 .data(parsedData)
                 .enter()
                 .append("circle")
                 .attr("class", "dot")
                 .attr("cx", d => x(d.date))
                 .attr("cy", d => y(d.value))
                 .attr("r", 5)
                 .attr("fill", "#ffab00");
        }
    }, [data]); // Redraw the chart if data changes

    return <svg ref={svgRef} width="600" height="400"></svg>;
};

export default SalesChart;
