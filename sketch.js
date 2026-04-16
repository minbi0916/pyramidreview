let input;
let userText = "";
let showReviews = false;
let points = [];
let rating = 4; // 0~5
let isClicked = false;
let showGuide = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);
   noStroke();
   input = createInput("too much sand...")
   input.position(width / 2 - 150, height / 2 + 300);
   input.size(300);
   rectMode(CENTER);

   updateText();
   input.input(updateText);
   input.mousePressed(resetAll);
}

function updateText() {
  userText = input.value();
}


function draw() {
  background(255);
  translate(width/2, height/2);

  let s;

  if (rating === 0) s = 0;
  else if(rating === 1) s = 0.2;
  else if (rating === 2) s = 0.5;
  else if (rating === 3) s = 0.7;
  else if (rating === 4) s = 1.0;
  else if (rating === 5) s = 1.3;

  drawPyramid(0, 0, s);

  let starX = [-130, -80, -30, 20, 70];

  for (let i = 0; i < 5; i ++) {
    if (i < rating) {
      fill(255, 200, 0);
    } else {
      fill(50);
    }

    star(starX[i], 265, 10, 20, 5); //star(x, y, 안쪽반지름, 바깥쪽반지름, 꼭짓점개수)
  }


  if (showReviews){
    resetMatrix();
    reviews();
  }

    if (showGuide) {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("피라미드에 리뷰와 별점을 남기고 \n ENTER를 클릭해보세요 ^^", 0, 0);

  fill(200);
  textSize(8);
  textAlign(CENTER);
  text("내가 너무 부족해보이고 남들이 나를 비판할 땐 \n 피라미드에도 악플이 달린다는 사실을 기억하자...", 0, 70);
  }
}

function drawPyramid(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  fill(210, 180, 120);
  triangle(- 300, 0, 0, -300, 0, 200);
  fill(170, 140, 90);
  triangle(300, 0, 0, -300, 0, 200);

  pop();
}

function reviews() {

  if (frameCount % 5 === 0) {
    points.push({
      x: random(width),
      y: random(height),
      size: random(12, 62)
    });
  }
  fill(120, 100, 70, 100);

  for(let p of points) {
    textSize(p.size);
    text(userText, p.x, p.y);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    showReviews = true;
  }
}

function star(x, y, radius1, radius2, npoints) {
  // TWO_PI 대신 360을 사용합니다.
  let angle = 360 / npoints; 
  let halfAngle = angle / 2.0;  
  
  beginShape(); 
  
  // 반복문 조건도 TWO_PI 대신 360으로 변경합니다.
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  
  endShape(CLOSE); 
}

function mousePressed() {
  showGuide = false;

  let starX = [-130, -80, -30, 20, 70];

  for (let i = 0; i < 5; i ++) {
    let d = dist(
      mouseX - width/2,
      mouseY - height/2,
      starX[i],
      265
    );

    if (d < 20) {
      rating = i + 1;
    }
  }
}

function resetAll() {
  input.value("");
  userText = "";
  showReviews = false;
  points = [];
  rating = 4;
}
