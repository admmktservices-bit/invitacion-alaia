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
 🎵 MÚSICA + OVERLAY + BOTÓN PLAY/PAUSE
************************/
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle");
  const overlay = document.getElementById("start-overlay");

  if (!music || !musicBtn || !overlay) {
    console.error("Audio, botón o overlay no encontrados en el DOM");
    return;
  }

  let musicStarted = false;
  let canHideOverlay = false;

  // Overlay visible mínimo 3 segundos
  setTimeout(() => {
    canHideOverlay = true;
  }, 3000);

  // Función para iniciar música con fade-in
  function fadeInMusic() {
    if (musicStarted) return;
    musicStarted = true;

    music.muted = false;
    music.volume = 0;

    // Play directamente dentro del evento de interacción
    music.play().then(() => {
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.4) {
          vol += 0.02;
          music.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 50);
    }).catch(err => console.log("iOS/Android bloqueo autoplay:", err));
  }

  // Función para iniciar experiencia al tocar o hacer click en overlay
  function startExperience() {
    if (!canHideOverlay) return; // no ocultar si aún no pasaron 3 seg
    overlay.style.display = "none";
    setTimeout(() => { overlay.style.display = "none"; }, 600); // coincide con transition
    fadeInMusic();

    overlay.removeEventListener("click", startExperience);
    overlay.removeEventListener("touchend", startExperience);
  }

  // Tap real en móviles
  overlay.addEventListener("touchend", (e) => {
    e.preventDefault(); // evita que se dispare click después del touch
    startExperience();
  });

  // Click en escritorio
  overlay.addEventListener("click", startExperience);

  // Botón Play / Pause
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music.play().catch(err => console.log("Error al reproducir:", err));
      musicBtn.textContent = "🔊";
    } else {
      music.pause();
      musicBtn.textContent = "🔇";
    }
  });

  // Abeja bailando
  music.addEventListener("play", () => {
    document.querySelector(".path-bee")?.classList.add("bee-dancing");
  });

  music.addEventListener("pause", () => {
    document.querySelector(".path-bee")?.classList.remove("bee-dancing");
  });
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
