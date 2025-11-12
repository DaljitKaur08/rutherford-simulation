"use strict";

const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let alphas = [];
let nuclei = [];
let running = false;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Create gold atoms (tiny circles in a thin foil)
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

// Create alpha particles from the left side
function createAlphas() {
  alphas = [];
  for (let i = 0; i < 20; i++) {
    alphas.push({
      x: 50,
      y: random(50, canvas.height - 50),
      vx: 4,
      vy: 0,
      color: "#00FFFF"
    });
  }
}

// Update positions and deflection
function update() {
  for (let p of alphas) {
    for (let n of nuclei) {
      const dx = p.x - n.x;
      const dy = p.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < n.r + 4) {
        // Deflection: reverse direction slightly
        if (Math.random() < 0.1) {
          p.vx = -p.vx * 0.7; // Bounce back
          p.vy += random(-2, 2);
        } else if (Math.random() < 0.3) {
          p.vy += random(-1, 1); // Small bend
        }
      }
    }

    // Move
    p.x += p.vx;
    p.y += p.vy;

    // Reset if off screen
    if (p.x < -20 || p.x > canvas.width + 20) {
      p.x = 50;
      p.y = random(50, canvas.height - 50);
      p.vx = 4;
      p.vy = 0;
    }
  }
}

// Draw atoms and alpha particles
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw foil nuclei
  for (let n of nuclei) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = n.color;
    ctx.fill();
  }

  // Draw alpha particles
  for (let p of alphas) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
}

function animate() {
  if (!running) return;
  draw();
  update();
  requestAnimationFrame(animate);
}

// Buttons
startBtn.addEventListener("click", () => {
  createFoil();
  createAlphas();
  running = true;
  animate();
});

resetBtn.addEventListener("click", () => {
  running = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
