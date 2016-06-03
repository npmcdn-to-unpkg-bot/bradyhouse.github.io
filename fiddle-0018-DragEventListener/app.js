(function (app, $, undefined) {
    "use strict";
    var width = 960, height = 500, r = 50;

    var data = [
        [width / 2 - r, height / 2 - r],
        [width / 2 - r, height / 2 + r],
        [width / 2 + r, height / 2 - r],
        [width / 2 + r, height / 2 + r]
    ];

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

    var drag = d3.behavior.drag()
        .on("drag", move);

    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("r", r)
        .attr("transform", function (d) {
            return "translate(" + d + ")";
        })
        .call(drag);

    function move(d) {
        var x = d3.event.x,
            y = d3.event.y;

        if(inBoundaries(x, y))
            d3.select(this)
                .attr("transform", function (d) {
                    return "translate(" + x + ", " + y + ")";
                });
    }

    function inBoundaries(x, y){
        return (x >= (0 + r) && x <= (width - r))
            && (y >= (0 + r) && y <= (height - r));
    }
})(window.app = window.app || {}, d3)

