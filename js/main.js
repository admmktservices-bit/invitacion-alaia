/* ⏳ CUENTA REGRESIVA */
const targetDate = new Date("December 27, 2025 15:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML = "¡Hoy es el gran día! 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  document.getElementById("timer").innerHTML =
    `${days} días ${hours}h ${minutes}m`;
}, 1000);

/* 🎵 AUDIO */
const audio = document.getElementById("bg-music");
const btn = document.getElementById("audio-btn");
let playing = false;

btn.addEventListener("click", () => {
  audio.volume = 0.2;
  if (!playing) {
    audio.play();
    btn.innerHTML = "🔇 Música";
  } else {
    audio.pause();
    btn.innerHTML = "🔊 Música";
  }
  playing = !playing;
});

/* 🎬 AUTOPLAY AL PRIMER TOQUE */
document.body.addEventListener("click", () => {
  if (!playing) {
    audio.volume = 0.2;
    audio.play();
    btn.innerHTML = "🔇 Música";
    playing = true;
  }
}, { once: true });

/* 🎥 AUTO AVANCE COMO VIDEO */
setTimeout(() => {
  document.querySelector(".card").scrollIntoView({
    behavior: "smooth"
  });
}, 6000);


// 🎬 Activar animaciones al entrar en pantalla
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".story-line, .map-frame").forEach(el => {
  el.style.animationPlayState = "paused";
  observer.observe(el);
});

// ⏳ COUNTDOWN REAL
const eventDate = new Date("2025-12-27T15:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById("timer").innerHTML = "¡Hoy celebramos! 🎉🎂";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("timer").innerHTML =
    `${days} días ${hours}h ${minutes}m`;
}

updateCountdown();
setInterval(updateCountdown, 60000);


