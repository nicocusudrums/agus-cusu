// Fecha del evento
const eventDate = new Date("Dec 19, 2025 21:00:00").getTime();

// Función para animar solo si cambia el valor
function animateCounter(el, oldValue, newValue) {
  if (oldValue !== newValue) {
    el.classList.add('pop');
    setTimeout(() => el.classList.remove('pop'), 300);
  }
}

// Función para actualizar el contador
function updateTimer() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML = "¡Hoy brindamos! 🥂";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  animateCounter(daysEl, daysEl.textContent, days.toString().padStart(2,'0'));
  animateCounter(hoursEl, hoursEl.textContent, hours.toString().padStart(2,'0'));
  animateCounter(minutesEl, minutesEl.textContent, minutes.toString().padStart(2,'0'));
  animateCounter(secondsEl, secondsEl.textContent, seconds.toString().padStart(2,'0'));

  daysEl.textContent = days.toString().padStart(2,'0');
  hoursEl.textContent = hours.toString().padStart(2,'0');
  minutesEl.textContent = minutes.toString().padStart(2,'0');
  secondsEl.textContent = seconds.toString().padStart(2,'0');
}

// Inicializar contador
updateTimer();
setInterval(updateTimer, 1000);

