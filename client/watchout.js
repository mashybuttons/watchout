// start slingin' some d3 here.

var alive = true;
var highscore = 0;
var score = 0;
var collisions = 0;

var svg = d3.select('body')
  .append('svg')
  .attr({'width': 800, 'height': 500})
  .style('border', '2px solid black');

var randomCXorCY = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result[i] = Math.floor(Math.random() * 800) + 20;
  }
  return result;
};

var distanceBetween = function (playX, playY, enemX, enemY) {
  console.log(Math.sqrt(Math.pow(playX - enemX, 2) + Math.pow(playY - enemY, 2)));
};

var circles = svg.selectAll('circle')
  .data(randomCXorCY(5))
  .enter()
  .append('circle');

setInterval(function() {
  circles.transition().attr('cx', function() { return Math.floor(Math.random() * 780) + 20; })
    .attr('cy', function() { return Math.floor(Math.random() * 480) + 20; })
    .attr('r', 10)
    .attr('class', 'circ');
}, 1000);
var player = d3.select('.player');
var enemy = d3.select('.circ');

var drag = d3.behavior.drag()  
  .on('drag', function() { 
    d3.select('.player')
      .attr('cx', d3.event.x)
      .attr('cy', d3.event.y);
      // .call(distanceBetween(d3.select('.player').attr('cx'), d3.select('.player').attr('cy'), d3.select('.circ').attr('cx'), d3.select('.circ').attr('cy')));
  });
svg.selectAll('circle')
  .data(randomCXorCY(6))
  .enter()
  .append('circle')
  .attr('cx', function() { return Math.floor(Math.random() * 780) + 20; })
  .attr('cy', function() { return Math.floor(Math.random() * 480) + 20; })
  .attr('r', 10)
  .attr('class', 'player')
  .call(drag);

  
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
  .text(function (d) {return d});
  
}, 1000);
  // for (var i = 0; i < 5; i++) {
  //  console.log(i);
  //   if (distanceBetween(d3.select('.player').attr('cx'), d3.select('.player').attr('cy'), d3.select('body').each('.circ').attr('cx'), d3.select('body').each('.circ').attr('cy')) <= 20) {
  //     score = 0;
  //     collisions++;
  //     alive = false;
    // }
  // }
// }








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




