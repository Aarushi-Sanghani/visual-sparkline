
function createSparkLine(svg, data) {
    //debugger;
    // X scale will fit values from 0-10 within pixels 0-100
    var x = d3.scale.linear().domain([0, 10]).range([0, 50]);
    // Y scale will fit values from 0-10 within pixels 0-100
    var y = d3.scale.linear().domain([0, 10]).range([0, 30]);

    // create a line object that represents the SVN line we're creating
    var line = d3.svg.line()
        // assign the X function to plot our line as we wish
        .x(function (d, i) {
            // verbose logging to show what's actually being done
            console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
            // return the X coordinate where we want to plot this datapoint
            
                return x(i);
        })
        .y(function (d) {
            // verbose logging to show what's actually being done
            console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
            // return the Y coordinate where we want to plot this datapoint
            return y(d);
        })

    // display the line by appending an svg:path element with the data line we created above
    svg.attr("width", "100%").attr("height", "100%").append("path").attr("d", line(data))
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr("stroke", "black");

}

