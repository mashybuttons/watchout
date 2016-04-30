var player = d3.select('.player');
var enemy = d3.select('.circ');
var highscore = 0;
var score = 0;
var collisions = 0;
var collided = false;

var svg = d3.select('body')
  .append('svg')
  .attr({'width': 800, 'height': 500})
  .style('border', '2px solid black');

var makeCircle = function (n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push({x: randomWidth(),
                  y: randomHeight()
    });
  }
  return result;
};

var distanceBetween = function (playX, playY, enemX, enemY) {
  return Math.sqrt(Math.pow(playX - enemX, 2) + Math.pow(playY - enemY, 2));
};

var randomWidth = function () {
  return Math.floor(Math.random() * 800) + 20;
};

var randomHeight = function () {
  return Math.floor(Math.random() * 480) + 20;
};

var circles = svg.selectAll('circle')
  .data(makeCircle(5))
  .enter()
  .append('circle')
  .attr('r', 20)
  .attr('class', 'circ');
 

var detectCollision = function () {

  circles.each(function(d) {
    var enemy = d3.select(this);
    if (distanceBetween(d3.select('.player').attr('cx'), d3.select('.player').attr('cy'), enemy.attr('cx'), enemy.attr('cy')) <= 40) {
      d3.select('.collisions span')
        .data([collisions])
        .text(function(d) { return d; });

      throttle(function() {
        collided = true;
      }, 1000)();
      score = 0;
    }
  });
};

var throttle = function(func, wait) {
  var canRun = true;
  return function() {
    if (canRun) {
      func();
      canRun = false;
      setTimeout(function() {
        canRun = true;
      }, wait);
    }
  };
};

var moveCircles = function() {
  circles.transition().duration(1000).attr('cx', randomWidth())
    .attr('cy', randomHeight())
      .each('end', function() {
        d3.select(this).transition().duration(1000).attr('cx', randomWidth())
         .attr('cy', randomHeight())
          .each('end', function() { moveCircles(); });
      });
};

var drag = d3.behavior.drag()  
  .on('drag', function() { 
    d3.select('.player')
      .attr('cx', d3.event.x)
      .attr('cy', d3.event.y);
  });

svg.selectAll('circle')
  .data(makeCircle(6))
  .enter()
  .append('circle')
  .attr('cx', randomWidth())
  .attr('cy', randomHeight())
  .attr('r', 10)
  .attr('class', 'player')
  .call(drag);

var startGame = function() {

  moveCircles();
  setInterval(detectCollision, 0);

  setInterval(function () {
    score++;
    if (score > highscore) {
      highscore++;
    }
    
    d3.select('body')
      .select('.scoreboard')
      .selectAll('span')
      .data([highscore, score, collisions])
      .text(function (d) { return d; });

  }, 1000);
  setInterval(function () {
    if (collided) {
      collisions++;
      collided = false;
    }
  }, 500);
};

startGame();








