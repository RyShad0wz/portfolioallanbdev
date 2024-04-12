const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birdVelocityY = 1;

const bird = {
  x: 50,
  y: 100,
  size: 20,
  speed: 0,
  gravity: 1,
  jumpForce: -15,
};

const pipes = [];
const gapSize = 100;

let score = 0;

function drawBird() {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
  ctx.closePath();
}

function updateBird() {
    bird.y += birdVelocityY;
    birdVelocityY += gravity;
  
    if (bird.y + bird.height > canvas.height) {
      bird.y = canvas.height - bird.height;
      birdVelocityY = 0;
    }
  
    if (bird.y < 0) {
      bird.y = 0;
      birdVelocityY = 0;
    }
  }

function drawPipes() {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];

    ctx.fillStyle = '#0000ff';
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + gapSize, pipe.width, canvas.height - pipe.top - gapSize);

    pipe.x -= 2;

    if (pipe.x + pipe.width < 0) {
      pipes.shift();
      score++;
      document.getElementById('score').innerHTML = score;
    }

    if (
      bird.x + bird.size > pipe.x &&
      bird.x - bird.size < pipe.x + pipe.width &&
      (bird.y - bird.size < pipe.top || bird.y + bird.size > pipe.top + gapSize)
    ) {
      // collision
      console.log('Game Over');
    }
  }
}

function addPipe() {
  const top = Math.random() * (canvas.height - gapSize);
  const width = 50;

  pipes.push({
    x: canvas.width,
    width,
    top,
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  updateBird();
  drawPipes();

  if (Math.random() < 0.01) {
    addPipe();
  }

  requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) { // 32 is the key code for the space bar
      birdVelocityY = -10; // set the bird's velocity in the y direction to -10 to make it jump
    }
  });

update();