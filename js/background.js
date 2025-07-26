const canvas = document.getElementById('canvas');
const ctx = canvas?.getContext('2d');

function getCircleCount() {
  const area = window.innerWidth * window.innerHeight;
  const baseArea = 1920 * 1080;
  const baseCount = 100;
  let count = Math.round(baseCount * (area / baseArea));
  return Math.max(20, Math.min(150, count));
}

function getResponsiveCircleSize() {
  const minDim = Math.min(window.innerWidth, window.innerHeight);
  return Math.max(2, minDim / 600);
}

let circleCount = getCircleCount();
const circles = [];

const minCircleSize = getResponsiveCircleSize();
const maxCircleSize = minCircleSize * 3;

function getResponsiveSpeed() {
  const minDim = Math.min(window.innerWidth, window.innerHeight);
  return Math.max(1, minDim / 500);
}

function adjustCirclesToCanvas() {
  for (const circle of circles) {
    circle.x = Math.max(circle.size, Math.min(circle.x, canvas.width - circle.size));
    circle.y = Math.max(circle.size, Math.min(circle.y, canvas.height - circle.size));
    
    if (circle.x <= circle.size || circle.x >= canvas.width - circle.size) {
      circle.dx *= -1;
    }
    if (circle.y <= circle.size || circle.y >= canvas.height - circle.size) {
      circle.dy *= -1;
    }
  }
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  circleCount = getCircleCount();
  
  if (circles.length > circleCount) {
    circles.length = circleCount;
  } else if (circles.length < circleCount) {
    const needed = circleCount - circles.length;
    for (let i = 0; i < needed; i++) {
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
  }

  adjustCirclesToCanvas();
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
  return getComputedStyle(document.body).getPropertyValue('--circle-color').trim();
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