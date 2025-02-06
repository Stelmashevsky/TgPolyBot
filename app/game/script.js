const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// // Dynamically set canvas size based on Telegram Mini App viewport
// function resizeCanvas() {
//   canvas.width = window.innerWidth; // Full width of the Telegram Mini App
//   canvas.height = window.innerHeight; // Full height of the Telegram Mini App
// }
// resizeCanvas();
// window.addEventListener('resize', resizeCanvas);

// Grid size and paddle/ball dimensions (relative to canvas size)
const grid = Math.floor(canvas.width * 0.02); // 2% of canvas width
const paddleHeight = grid * 5; // Paddle height is 5 grid units
const maxPaddleY = canvas.height - grid - paddleHeight;
const ballSize = grid; // Ball size is 1 grid unit

// Paddle and ball speeds (relative to canvas size)
const paddleSpeed = Math.floor(canvas.height * 0.01); // 1% of canvas height
const ballSpeed = Math.floor(canvas.width * 0.005); // 0.5% of canvas width

// Left paddle (controlled by player)
const leftPaddle = {
  x: grid * 2,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,
  dy: 0 // Paddle velocity
};

// Right paddle (controlled by AI)
const rightPaddle = {
  x: canvas.width - grid * 3,
  y: canvas.height / 2 - paddleHeight / 2,
  width: grid,
  height: paddleHeight,
  dy: 0 // Paddle velocity
};

// Ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: ballSize,
  height: ballSize,
  dx: ballSpeed, // Ball velocity in x direction
  dy: -ballSpeed, // Ball velocity in y direction
  resetting: false // Flag to reset ball position
};

// Collision detection function
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// Game loop
function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move player's paddle
  leftPaddle.y += leftPaddle.dy;

  // Prevent player's paddle from going out of bounds
  leftPaddle.y = Math.max(grid, Math.min(leftPaddle.y, maxPaddleY));

  // AI paddle logic: follow the ball
  const paddleCenter = rightPaddle.y + rightPaddle.height / 2;
  if (paddleCenter < ball.y) {
    rightPaddle.y += paddleSpeed; // Move down
  } else if (paddleCenter > ball.y) {
    rightPaddle.y -= paddleSpeed; // Move up
  }

  // Prevent AI paddle from going out of bounds
  rightPaddle.y = Math.max(grid, Math.min(rightPaddle.y, maxPaddleY));

  // Draw paddles
  context.fillStyle = 'white';
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with top and bottom walls
  if (ball.y < grid || ball.y + ball.height > canvas.height - grid) {
    ball.dy *= -1; // Reverse ball direction
  }

  // Reset ball if it goes out of bounds
  if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
    ball.resetting = true;
    setTimeout(() => {
      ball.resetting = false;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1); // Randomize direction
      ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    }, 400);
  }

  // Ball collision with paddles
  if (collides(ball, leftPaddle)) {
    ball.dx *= -1;
    ball.x = leftPaddle.x + leftPaddle.width; // Prevent sticking
  } else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;
    ball.x = rightPaddle.x - ball.width; // Prevent sticking
  }

  // Draw ball
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // Draw walls
  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, canvas.width, grid); // Top wall
  context.fillRect(0, canvas.height - grid, canvas.width, grid); // Bottom wall

  // Draw dotted line in the middle
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
}

// Touch controls for mobile
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');

// Add touch event listeners
upButton.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default behavior
  leftPaddle.dy = -paddleSpeed; // Move up
});
upButton.addEventListener('touchend', (e) => {
  e.preventDefault(); // Prevent default behavior
  leftPaddle.dy = 0; // Stop moving
});

downButton.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent default behavior
  leftPaddle.dy = paddleSpeed; // Move down
});
downButton.addEventListener('touchend', (e) => {
  e.preventDefault(); // Prevent default behavior
  leftPaddle.dy = 0; // Stop moving
});

// // Add mouse event listeners for desktop testing
// upButton.addEventListener('mousedown', () => {
//   leftPaddle.dy = -paddleSpeed; // Move up
// });
// upButton.addEventListener('mouseup', () => {
//   leftPaddle.dy = 0; // Stop moving
// });

// downButton.addEventListener('mousedown', () => {
//   leftPaddle.dy = paddleSpeed; // Move down
// });
// downButton.addEventListener('mouseup', () => {
//   leftPaddle.dy = 0; // Stop moving
// });

// Start the game
loop();