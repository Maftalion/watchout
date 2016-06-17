// start slingin' some d3 here.
//Set Board and Black Background

var svg = d3.select(".board").append("svg")
.attr("width", 1000)
.attr("height", 600)

var drag = d3.behavior.drag()
    .on('drag', function () {
      player.attr('cx', d3.event.x)
            .attr('cy', d3.event.y);
    });

var player = svg.append('circle')
    .data([{x: 500, y: 300, r: 10}])
    .attr('r', function(d) {return d.r;})
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    .call(drag);
    
var asteroids = function(data){

  var field = svg.selectAll("image")
              .data(data);

  field.enter().append('image');

  field.transition().duration(500)
       .attr('x', function(d) {return d.x;})
       .attr('y', function(d) {return d.y;})
       .attr('xlink:href', 'asteroid.png')
       .attr('class', 'asteroid')
       .style('height', '50')
       .style('width', '50');
};

setInterval(function() {
  var positions = [];
  for (var i = 0; i < 2; i++) {
    var obj = {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 600)
    };
    positions.push(obj);
  }
  asteroids(positions);
}, 1000);

//asteroids([{x: 100, y: 100}, {x: 250, y: 200}]);

