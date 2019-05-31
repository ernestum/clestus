var target_x;
var target_y;
var guessed_target_x;
var guessed_target_y;
var guessed_radius;

var samples = [];

var displayInfo = false;
var state = 0;

function reset() {
  state = 0;
  target_x = random(height/2, width-height/2);
  target_y = height/2;
  guessed_target_x = -1;
  guessed_target_y = -1;
  guessed_radius = height/2;
  print("reset!");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  reset();
}

function drawInfo() {
  fill(200);
  stroke(0);
  strokeWeight(3);
  line(height/2, height/2, width-height/2, height/2);
  strokeWeight(1);
  //fill(100, 30);
  //for ( var i = 0; i < samples.length; i++ ) {
  //  var s = samples[i];
  //  ellipse(target_x + s.guessed_target_x - s.target_x, target_y + s.guessed_target_y - s.target_y, s.guessed_radius*2, s.guessed_radius*2);
  //}
  fill(0);
  text("n: " + samples.length + "\nstate: " + state + "\n\n" + key_documentation, 10, 20);
}

function drawTarget() {
  noStroke();
  fill(255, 0, 0);
  ellipse(target_x, target_y, 10, 10);
}

function drawConfidenceCircle() {
  noFill();
  stroke(0);
  ellipse(target_x, target_y, guessed_radius*2, guessed_radius*2);
}

function mouseDragged() {
  if (state == 2) {
    guessed_radius = min(height/2, dist(mouseX, mouseY, target_x, target_y));
  }
}


function draw() {
  background(255);
  noStroke();

  if (displayInfo) {
    drawInfo();
  }

  if (state == 0) {
    drawTarget();
  }

  if (state == 1) {
    drawTarget();
  }

  if (state == 2) {
    drawTarget();
    drawConfidenceCircle();
  }

  noFill();
  rect(0, 0, width-1, height-1);
}

function saveSamples() {
  var string_list = ["target_x target_y guessed_target_x guessed_target_y guessed_radius tapped_radius\r"];
  for ( var i = 0; i < samples.length; i++ ) {
    var s = samples[i];
    var tapped_radius = min(s.target_y, dist(s.target_x, s.target_y, s.guessed_target_x, s.guessed_target_y));
    string_list.push(s.target_x + " " + s.target_y + " " + s.guessed_target_x + " " + s.guessed_target_y + " " + s.guessed_radius + " " + tapped_radius + "\r");
  }
  saveStrings(string_list, "data", "csv");
}

var key_documentation = "s: save data\na: abort current sample\nd: delete last sample\nv: show this info\nn: next";

function keyReleased() {
  if (key == 'A') {
    reset();
  }

  if (key == 'D') {
    samples.pop();
  }
  if (key == 'V') {
    displayInfo = false;
  }

  if (key == 'S') {
    saveSamples();
  }

  if (state == 0) {
    if (key == 'N') {
      guessed_target_x = mouseX;
      guessed_target_y = mouseY;
      state = 1;
      print("going to state 1");
      return;
    }
  }

  if (state == 1) {
    if (key == 'N') {
      state = 2;
      print("going to state 2");
      return;
    }
  }

  if (state == 2) {
    if (key == 'N') {
      samples.push( {
      target_x: 
        target_x, 
        target_y: 
        target_y, 
        guessed_target_x: 
        guessed_target_x, 
        guessed_target_y: 
        guessed_target_y, 
        guessed_radius: 
        guessed_radius
      }
      );
      reset();
      return;
    }
  }
}

function keyPressed() {
  if (key == 'V') {
    displayInfo = true;
  }
}

function windowResized() {
  //TODO: put a warning here?
  resizeCanvas(windowWidth, windowHeight);
}
