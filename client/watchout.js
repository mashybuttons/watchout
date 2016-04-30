// start slingin' some d3 here.


var player = d3.select('.player');
var enemy = d3.select('.circ');
var highscore = 0;
var score = 0;
var collisions = 0;
var svg = d3.select('body')
  .append('svg')
  .attr({'width': 800, 'height': 500})
  .style('border', '2px solid black');

// var randomCXorCY = function(n) {
//   var result = [];
//   for (var i = 0; i < n; i++) {
//     result[i] = Math.floor(Math.random() * 800) + 20;
//   }
//   return result;
// };

var makeCircle = function (n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push({x: Math.floor(Math.random() * 800) + 20,
                  y: Math.floor(Math.random() * 480) + 20});
  }
  return result;
};

var distanceBetween = function (playX, playY, enemX, enemY) {
  return Math.sqrt(Math.pow(playX - enemX, 2) + Math.pow(playY - enemY, 2));
};

var circles = svg.selectAll('circle')
  .data(makeCircle(5))
  .enter()
  .append('circle')
  .attr('r', 10)
  .attr('class', 'circ');

// setInterval(function() {
//   circles.transition().attr('cx', function() { return Math.floor(Math.random() * 780) + 20; })
//     .attr('cy', function() { return Math.floor(Math.random() * 480) + 20; })
//     .attr('r', 10)
//     .attr('class', 'circ');
// }, 1000);

var moveCircles = function() {
  circles.transition().attr('cx', function() { return Math.floor(Math.random() * 780) + 20; })
    .attr('cy', function() { return Math.floor(Math.random() * 480) + 20; })
      .each('end', function() {
        d3.select(this).transition().attr('cx', function() { return Math.floor(Math.random() * 780) + 20; })
         .attr('cy', function() { return Math.floor(Math.random() * 480) + 20; })
          .each('end', function() { moveCircles(); });
      });
};


var drag = d3.behavior.drag()  
  .on('drag', function() { 
    d3.select('.player')
      .attr('cx', d3.event.x)
      .attr('cy', d3.event.y);
      // .call(distanceBetween(d3.select('.player').attr('cx'), d3.select('.player').attr('cy'), d3.select('.circ').attr('cx'), d3.select('.circ').attr('cy')));
  });
svg.selectAll('circle')
  .data(makeCircle(6))
  .enter()
  .append('circle')
  .attr('cx', function() { return Math.floor(Math.random() * 780) + 20; })
  .attr('cy', function() { return Math.floor(Math.random() * 480) + 20; })
  .attr('r', 10)
  .attr('class', 'player')
  .call(drag);
// var e;
// var countCollisions = function() {
//  circles.transition().each(function(d) {
//   e = d3.select(this)
//   if (distanceBetween(d3.select('.player').attr('cx'), d3.select('.player').attr('cy'), e.attr('cx'), e.attr('cy')) <= 20) {
//     collisions++;
//     score = 0;
//   } enemy.each('end', function() { countCollisions(); moveCircles(); })
//  })
// };

var startGame = function() {
  // var highscore = 0;
  // var score = 0;
  // var collisions = 0;
  moveCircles();
 
// while (alive) {
  setInterval(function () {
    score++;
    if (score >= highscore) {
      highscore++;
    }
    
    d3.select('body')
      .select('.scoreboard')
      .selectAll('span')
      .data([highscore, score, collisions])
      .text(function (d) { return d; });

    setInterval(function () {
      circles.each(function(d) {
        var enemy = d3.select(this);
        if (distanceBetween(d3.select('.player').attr('cx'), d3.select('.player').attr('cy'), enemy.attr('cx'), enemy.attr('cy')) <= 20) {
          d3.select('.collisions span')
            .data([collisions])
            .text(function(d) { return d; });
          collisions++;
          score = 0;
        }
      });
    }, 300);
    // countCollisions();
  }, 1000);
};

startGame();







//if distancebtween < 20, then player died/ add highscore(how many seconds since 
// starting the game -1 second for loading the enemies)

//NEED a start game function (on a button click maybe?)
  //var alive = true
  //start time = (new Date())
  //while loop(alive === true)
    // circs.each(function() {circ.trasition})
    //if(distancebtween <20)
      //then died, alive === false
      //store highscore = time.getTime()/1000
    
  //have a function call that uses each and transition to keep moving




