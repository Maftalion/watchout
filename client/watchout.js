// start slingin' some d3 here.
//Set Board and Black Background

var svg = d3.select(".board").append("svg")
.attr("width", 1000)
.attr("height", 600)

// Create links to the scoreboard
var highScore = d3.select('.highscore span');
var currentScore = d3.select('.current span');
var collisions = d3.select('.collisions span');

// Create timer 
var timer = d3.timer(function(elapsed) {
  currentScore.text(Math.floor(elapsed/100));
});

// Create drag behavior
var drag = d3.behavior.drag()
    .on('drag', function () {
      player.attr('cx', d3.event.x)
            .attr('cy', d3.event.y);
    });

// Create the player
var player = svg.append('circle')
    .data([{x: 500, y: 300, r: 10}])
    .attr('r', function(d) {return d.r;})
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    .call(drag);


    
// Function that moves asteroids around the field
var asteroids = function(data){

  var field = svg.selectAll("image")
              .data(data);

  field.enter().append('image');

  field.transition().duration(500)
       .attr('x', function(d) {return d.x;})
       .attr('y', function(d) {return d.y;})
       .attr('xlink:href', 'shuriken2.gif')
       .attr('class', 'asteroid')
       .style('height', '80')
       .style('width', '80');
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

setInterval(function(){
  d3.selectAll("image").each(function(node){
    if (Math.abs(node.x - player.x) < 1000){
      console.log("conflict");
    }
    // if (Math.abs(node.y - player.y) < 100){
    //   console.log("conflict");
    // }  
  })
}, 10)
//asteroids([{x: 100, y: 100}, {x: 250, y: 200}]);

