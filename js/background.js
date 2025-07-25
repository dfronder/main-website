const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');

const circleCount = 100;
const circles = [];

const minCircleSize = 2;
const maxCircleSize = 6;

function getResponsiveSpeed() {
  const minDim = Math.min(window.innerWidth, window.innerHeight);
  return Math.max(1, minDim / 500);
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < circleCount; i++) {
  const size = minCircleSize + Math.random() * (maxCircleSize - minCircleSize);
  circles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    dx: (Math.random() - 0.5) * 4 * getResponsiveSpeed(),
    dy: (Math.random() - 0.5) * 4 * getResponsiveSpeed(),
    size: size,
    originalSize: size,
  });
}

function getCircleColor() {
  return getComputedStyle(document.body).getPropertyValue('--square-color').trim();
}

function animate() {
  if (!ctx || !canvas) return;
  
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-color');
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = getCircleColor();

  for (const circle of circles) {
    circle.x += circle.dx;
    circle.y += circle.dy;

    if (circle.x - circle.size < 0 || circle.x + circle.size > canvas.width) {
      circle.dx *= -1;
      circle.dy += (Math.random() - 0.5) * 0.5;
    }
    
    if (circle.y - circle.size < 0 || circle.y + circle.size > canvas.height) {
      circle.dy *= -1;
      circle.dx += (Math.random() - 0.5) * 0.5;
    }

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();