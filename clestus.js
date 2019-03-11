var target_x;
var target_y;

var initial_target_range = 0.5; // 0 means always in the middle, 1 means spread over the whole screen
var distances = [];
var offsets = [];

var displayInfo = false;

function resetTarget() {
  target_x = random(width*(1-initial_target_range)/2, width*(1-(1-initial_target_range)/2));
  target_y = random(height*(1-initial_target_range)/2, height*(1-(1-initial_target_range)/2));
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(255);
  resetTarget();
}


function draw() {
  background(255);
  noStroke();

  if (displayInfo) {
    fill(200);
    rect(width*(1-initial_target_range)/2, 
      height*(1-initial_target_range)/2, 
      width*(1-(1-initial_target_range)), 
      height*(1-(1-initial_target_range)));
    fill(100);
    for ( var i = 0; i < offsets.length; i++ ) {
      ellipse(target_x - offsets[i][0], target_y - offsets[i][1], 10, 10);
    }
    fill(0);
    text("Distance\nn: " + distances.length + "\nmean: " + round(mean(distances)) + "\nstd: " + round(std(distances)) + "\n\n" + key_documentation, 10, 20);
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

function deleteLastEntry() {
  distances.pop();
  offsets.pop();
}

function saveOffsets() {
  string_list = ["x y distance\r"];
  for ( var i = 0; i < offsets.length; i++ ) {
    string_list.push(round(offsets[i][0]) + " " + round(offsets[i][1]) + " " + round(dist(0, 0, offsets[i][0], offsets[i][1])) + "\r");
  }
  saveStrings(string_list, "data", "csv");
}  

var key_documentation = "s: save data\na: register position\nw: new random target\nd: delete last sample";

function keyReleased() {
  if (key == 'S') {
    saveOffsets();
  }
  if (key == 'A') {
    registerMouse();
  }
  if (key == 'W') {
    resetTarget();
  }
  if (key == 'D') {
    deleteLastEntry();
  }
  if (key == 'V') {
    displayInfo = false;
  }
}

function keyPressed() {
  if (key == 'V') {
    displayInfo = true;
  }
}

function mean(distances) {
  var sum = 0;
  for ( var i = 0; i < distances.length; i++ ) {
    sum += distances[i];
  }
  return sum/distances.length;
}

function std(distances) {
  var m = mean(distances);
  var sum = 0;
  for ( var i = 0; i < distances.length; i++ ) {
    sum += pow((m - distances[i]), 2);
  }
  return sqrt(sum/distances.length);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
