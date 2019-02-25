var target_x;
var target_y;

var initial_target_range = 0.2; // 0 means always in the middle, 1 means spread over the whole screen
var distances = [];

function reset_target() {
  target_x = random(width*(1-initial_target_range)/2, width*(1-(1-initial_target_range)/2));
  target_y = random(height*(1-initial_target_range)/2, height*(1-(1-initial_target_range)/2));
}

function setup() {
  createCanvas(720, 400);
  
  background(255);
  reset_target();
}


function draw() {
  background(255);
  fill(255, 0, 0);
  noStroke();
  ellipse(target_x, target_y, 10, 10);
  noFill();
  stroke(0);
  rect(0, 0, width-1, height-1);
  text("Distance mean: " + mean(distances) + " std: " + std(distances), 10, 20);
}

function mouseReleased() {
 distance = dist(mouseX, mouseY, target_x, target_y);
 distances.push(distance);
 
 print("Distance mean: " + mean(distances) + " std: " + std(distances));
}

function mean(distances) {
  var sum = 0;
  for( var i = 0; i < distances.length; i++ ) {
    sum += distances[i];
  }
  return sum/distances.length;
}

function std(distances) {
  var m = mean(distances);
  var sum = 0;
  for( var i = 0; i < distances.length; i++ ) {
    sum += (m - distances[i])**2;
  }
  return sqrt(sum/distances.length);
}
