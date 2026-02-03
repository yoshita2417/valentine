const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

const noTexts = [
  "HAW ",
  "just say you hate me ",
  "please say yes 🥺",
  "im gonna cry fr",
  "dont you love me"
];

let noClickCount = 0;
let yesScale = 1;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const confettiPieces = [];

function createConfettiBurst(count = 160) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 3;
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: centerX,
      y: centerY,
      size: 5 + Math.random() * 6,
      color: ["#ff4d6d", "#ff8fa3", "#ffd6e0", "#ffe066"][Math.floor(Math.random() * 4)],
      speedX: (Math.random() - 0.5) * 8,
      speedY: -Math.random() * 7 - 3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      gravity: 0.18 + Math.random() * 0.18
    });
  }
}

function renderConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const p = confettiPieces[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.speedY += p.gravity;
    p.rotation += p.rotationSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    if (p.y - p.size > canvas.height || p.x < -50 || p.x > canvas.width + 50) {
      confettiPieces.splice(i, 1);
    }
  }
  requestAnimationFrame(renderConfetti);
}
renderConfetti();

function moveNoButton() {
  const buttonsWrapper = document.querySelector(".buttons");
  const containerRect = buttonsWrapper.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // make it absolute once it starts moving
  noBtn.style.position = "absolute";

  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  noBtn.style.transform =
    "translate(0, 0) scale(" + Math.max(0.4, 1 - noClickCount * 0.1) + ")";

  const textIndex = noClickCount % noTexts.length;
  noBtn.textContent = noTexts[textIndex];

  yesScale += 0.15;
  yesBtn.style.transform = "scale(" + yesScale + ")";
}

noBtn.addEventListener("click", () => {
  noClickCount++;
  moveNoButton();
  message.textContent = "";
});

noBtn.addEventListener("mouseenter", () => {
  if (noClickCount > 0) {
    moveNoButton();
  }
});

yesBtn.addEventListener("click", () => {
  message.textContent = "omg yayyy ilysm mwah mwah mwah hehehehhehee 💕";
  message.style.display = "block";  // ← SHOW THE MESSAGE
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.cursor = "default";
  noBtn.style.cursor = "default";
  createConfettiBurst();
});
