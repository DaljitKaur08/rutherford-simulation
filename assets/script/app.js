"use strict";

// canvas setup
const canvasArea = document.getElementById("simCanvas");
const canvasPen = canvasArea.getContext("2d");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let particles = [];
let nuclei = [];
let running = false;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Create gold nuclei inside foil
function createFoil() {
  nuclei = [];
  for (let i = 0; i < 12; i++) {
    nuclei.push({
      x: 400 + random(-20, 20),
      y: 80 + i * 25,
      r: 6,
      color: "#FFD700"
    });
  }
}

// Create alpha particles from the left
function createParticles() {
  particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: 40,
      y: random(50, canvasArea.height - 50),
      vx: 4,
      vy: 0,
      color: "#00FFFF"
    });
  }
}

function update() {
  for (let p of particles) {
    for (let n of nuclei) {
      let dx = p.x - n.x;
      let dy = p.y - n.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < n.r + 4) {
        if (Math.random() < 0.1) {
          p.vx = -p.vx * 0.7;
          p.vy += random(-2, 2);
        } else if (Math.random() < 0.3) {
          p.vy += random(-1, 1);
        }
      }
    }

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -20 || p.x > canvasArea.width + 20) {
      p.x = 40;
      p.y = random(50, canvasArea.height - 50);
      p.vx = 4;
      p.vy = 0;
    }
  }
}

function draw() {
  canvasPen.clearRect(0, 0, canvasArea.width, canvasArea.height);

  nuclei.forEach(n => {
    canvasPen.beginPath();
    canvasPen.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    canvasPen.fillStyle = n.color;
    canvasPen.fill();
  });

  particles.forEach(p => {
    canvasPen.beginPath();
    canvasPen.arc(p.x, p.y, 3, 0, Math.PI * 2);
    canvasPen.fillStyle = p.color;
    canvasPen.fill();
  });
}

function animate() {
  if (!running) return;
  draw();
  update();
  requestAnimationFrame(animate);
}

// buttons
startBtn.addEventListener("click", () => {
  createFoil();
  createParticles();
  running = true;
  animate();
});

resetBtn.addEventListener("click", () => {
  running = false;
  canvasPen.clearRect(0, 0, canvasArea.width, canvasArea.height);
});
