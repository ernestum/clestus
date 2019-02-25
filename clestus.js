var target_x;
var target_y;

var initial_target_range = 0.5; // 0 means always in the middle, 1 means spread over the whole screen
var distances = [];
var offsets = [];

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
  noStroke();
  
  
  
  if(keyIsPressed && key == 'v') {
    fill(200);
    rect(width*(1-initial_target_range)/2, 
         height*(1-initial_target_range)/2, 
         width*(1-(1-initial_target_range)), 
         height*(1-(1-initial_target_range)));
    fill(100);
    for( var i = 0; i < offsets.length; i++ ) {
      ellipse(target_x - offsets[i][0],target_y - offsets[i][1], 10, 10);
    }
    fill(0);
    text("Distance\nmean: " + round(mean(distances)) + "\nstd: " + round(std(distances)), 10, 20);
  }
  
  fill(255, 0, 0);
  ellipse(target_x, target_y, 10, 10);
  
  noFill();
  stroke(0);
  rect(0, 0, width-1, height-1);
  
}

function registerMouse() {
  distance = dist(mouseX, mouseY, target_x, target_y);
  distances.push(distance);  
  offsets.push([target_x - mouseX, target_y - mouseY]);
}

function saveOffsets() {
  string_list = [];
  for( var i = 0; i < offsets.length; i++ ) {
    string_list.push(offsets[i][0] + "\t" + offsets[i][1] + "\t" + dist(0, 0, offsets[i][0], offsets[i][1]));  
  }
  saveStrings(string_list, "data.txt");
}  


function mouseReleased() {
 registerMouse();
 reset_target();
}

function keyReleased() {
 if(key == 'S') {
   saveOffsets();
 }
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
