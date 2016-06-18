// start slingin' some d3 here.
//Set Board and Black Background

var svg = d3.select(".board").append("svg")
    .attr("width", 1000)
    .attr("height", 600);

var randomInt = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

// Create links to the scoreboard
var highScore = d3.select('.highscore span');
var currentScore = d3.select('.current span');
var collisions = d3.select('.collisions span');
var shurikens = d3.select('.shuriken span');

// Create timer 
d3.timer(function(elapsed) {
  currentScore.text(Math.floor(elapsed/100));
});

// Create drag behavior
var drag = d3.behavior.drag()
    .on('drag', function () {
      var x = d3.event.x;
      var y = d3.event.y; 
      if (x < 1000 && x > 0 && y < 600 && y > 0) {
        player.attr('cx', x)
        .attr('cy', y);
      }
    });

// Create the player
var player = svg.append('circle')
    .data([{x: 500, y: 300, r: 10}])
    .attr('r', function(d) {return d.r;})
    .attr('cx', function(d) {return d.x;})
    .attr('cy', function(d) {return d.y;})
    .attr('class', 'player')
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

  field.exit().remove();
};

var counter = 5;

setInterval(function() {
  counter++;
  shurikens.text(counter);
}, 10000);

setInterval(function() {
  var positions = [];
  for (var i = 0; i < counter; i++) {
    var obj = {
      x: randomInt(0, 1000 - 80),
      y: randomInt(0, 600 - 80)
    };
    positions.push(obj);
  }
  asteroids(positions);
}, 1000);

var collision = function(x1, y1, x2, y2) {
  var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  if (distance < 50) {
    return true;
  } 
  return false;
};

var enemyX, enemyY, playerX, playerY;
d3.timer(function() {

  var playerInner = d3.select('.player');
  playerX = d3.select('.player').attr('cx');
  playerY = d3.select('.player').attr('cy');
  
  var enemies = svg.selectAll('image')
      .each(function() {
        enemyX = this['x']['animVal']['value'] + 40;
        enemyY = this['y']['animVal']['value'] + 40;

        if (collision(enemyX, enemyY, playerX, playerY)) {
          var current = parseInt(currentScore.text());
          var high = parseInt(highScore.text());
          counter = 5;
          shurikens.text(counter);

          if (current > high) {
            highScore.text(current);
            currentScore.text(0);
            d3.timer(function(elapsed) {
              currentScore.text(Math.floor(elapsed/100));
            });

            var collisionCount = parseInt(collisions.text()) + 1;
            collisions.text(collisionCount);
          }
        }
      });
});




