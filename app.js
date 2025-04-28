const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

const confetti = [];
let confettiAnimationId;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti() {
  confetti.length = 0; // Clear old confetti
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: random(0, canvas.width),
      y: random(0, canvas.height),
      size: random(2, 6),
      color: `hsl(${random(0, 360)}, 100%, 50%)`,
      speedX: random(-2, 2),
      speedY: random(2, 5),
    });
  }
}

function updateConfetti() {
  for (let i = 0; i < confetti.length; i++) {
    confetti[i].x += confetti[i].speedX;
    confetti[i].y += confetti[i].speedY;

    if (confetti[i].y > canvas.height) {
      confetti[i].y = -5;
      confetti[i].x = random(0, canvas.width);
    }
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < confetti.length; i++) {
    ctx.fillStyle = confetti[i].color;
    ctx.beginPath();
    ctx.arc(confetti[i].x, confetti[i].y, confetti[i].size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animateConfetti() {
  updateConfetti();
  drawConfetti();
  confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
  cancelAnimationFrame(confettiAnimationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

document.getElementById('revealButton').addEventListener('click', () => {
  // Show the birthday card
  document.getElementById('birthdayCard').classList.remove('hidden');

  // Start confetti
  createConfetti();
  animateConfetti();

  // Stop confetti after 5 seconds
  setTimeout(() => {
    stopConfetti();
  }, 5000);

  // Hide the reveal button
  document.getElementById('revealButton').style.display = 'none';
});

// Handle the audio play button
document.getElementById('playSongButton').addEventListener('click', () => {
  const audio = document.getElementById('birthdayAudio');
  audio.play();
});

confetti({
  particleCount: 200,
  spread: 200,
  origin: { y: 0.6 },
  shapes: ['circle', 'heart'],
  colors: ['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740']
});
