/***********************
 ⏳ CUENTA REGRESIVA
************************/
const targetDate = new Date("2025-12-27T15:00:00").getTime();
const timerEl = document.getElementById("timer");
let lastValue = "";

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    timerEl.innerHTML = "¡Hoy celebramos! 🎉🎂";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  const newValue = `${days} días ${hours}h ${minutes}m`;

  if (newValue !== lastValue) {
    timerEl.innerHTML = newValue;
    timerEl.classList.remove("timer-change");
    void timerEl.offsetWidth; // 👈 reflow para reiniciar animación
    timerEl.classList.add("timer-change");
    lastValue = newValue;
  }
}

updateCountdown();
setInterval(updateCountdown, 60000);

/***********************
 🎵 MÚSICA
************************/
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
const overlay = document.getElementById("start-overlay");

let musicStarted = false;

function fadeInMusic() {
  if (musicStarted) return;
  musicStarted = true;

  music.volume = 0;
  music.play().then(() => {
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 0.4) {
        vol += 0.02;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 150);
  });
}

/* Overlay: primer toque */
overlay.addEventListener("click", () => {
  overlay.style.display = "none";

  setTimeout(() => {
    fadeInMusic();
  }, 1000); // ⏱️ 2 segundos reales
});



/* Botón ON / OFF */
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (music.paused) {
    music.play();
    musicBtn.textContent = "🔊";
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

/* Abejita baila con música */
music.addEventListener("play", () => {
  document.querySelector(".path-bee")?.classList.add("bee-dancing");
});

music.addEventListener("pause", () => {
  document.querySelector(".path-bee")?.classList.remove("bee-dancing");
});


/***********************
 🎬 AUTO SCROLL TIPO VIDEO
************************/
setTimeout(() => {
  document.querySelector(".card")?.scrollIntoView({
    behavior: "smooth"
  });
}, 6000);


/***********************
 ✨ ANIMACIONES ON SCROLL
************************/
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
