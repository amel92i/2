
let img;
let glitchRects = [];

function preload() {
  img = loadImage("https://i.imgur.com/ZK7440s.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  noStroke();
  for (let i = 0; i < 200; i++) {
    glitchRects.push({
      x: random(width),
      y: random(height),
      w: random(5, 40),
      h: random(5, 40),
      dx: random(-3, 3),
      dy: random(-3, 3),
      c: color(random(255), random(255), random(255), 120)
    });
  }
}

function draw() {
  background(0);

  push();
  let offset = sin(frameCount * 0.05) * 10;
  tint(255, 100);
  image(img, width/2 + offset, height/2, img.width * 0.6, img.height * 0.6);
  tint(255, 50, 50, 100);
  image(img, width/2 - offset, height/2, img.width * 0.6, img.height * 0.6);
  tint(50, 255, 255, 100);
  image(img, width/2 + offset * 1.5, height/2, img.width * 0.6, img.height * 0.6);
  pop();

  for (let g of glitchRects) {
    fill(g.c);
    rect(g.x, g.y, g.w, g.h);

    g.x += g.dx;
    g.y += g.dy;

    if (g.x < 0 || g.x > width) g.dx *= -1;
    if (g.y < 0 || g.y > height) g.dy *= -1;

    g.w = constrain(g.w + random(-1, 1), 5, 50);
    g.h = constrain(g.h + random(-1, 1), 5, 50);

    if (random() < 0.02) {
      g.c = color(random(255), random(255), random(255), 100 + random(100));
    }
  }

  // Flash flickers
  if (frameCount % 20 === 0) {
    fill(random(255), random(255), random(255), 30);
    rect(0, 0, width, height);
  }
}
