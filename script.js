// Fecha del evento
const eventDate = new Date("Dec 19, 2025 21:00:00").getTime();

// INVITADOS (nombre + cantidad)
const guests = [
  { name: "Nacho Robles", qty: 2 },
  { name: "Maxi Coll", qty: 2 },
  { name: "Augusto", qty: 2 },
  { name: "Nico PDF", qty: 2 },
  { name: "Jp", qty: 2 },
  { name: "Big", qty: 2 },
  { name: "Negro", qty: 2 },
  { name: "Pablo Ferreyra", qty: 2 },
  { name: "Juan Pablo Sosa", qty: 2 },
  { name: "Romi Sosa U", qty: 2 },
  { name: "Mauro Cusumano", qty: 2 },
  { name: "Ro Cusumano", qty: 2 },
  { name: "Jose Cerasuolo", qty: 4 },
  { name: "Ani Carretero", qty: 3 },
  { name: "Seba Diaz", qty: 2 },
  { name: "Markuza", qty: 1 },
  { name: "El Tucu Gamarra", qty: 1 },
];


// ABRIR MODAL
function openModal() {
  const modal = document.getElementById("guestModal");
  modal.style.display = "block";

  const list = document.getElementById("guestList");
  list.innerHTML = ""; // limpiar

  guests.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = `${g.name} (x${g.qty})`;
    btn.onclick = () => sendConfirmation(g.name, g.qty);
    list.appendChild(btn);
  });
}

// CERRAR MODAL
function closeModal() {
  document.getElementById("guestModal").style.display = "none";
}

// ENVIAR CONFIRMACION A WHATSAPP
function sendConfirmation(name, qty) {
  const phone = "5493816855266";
  const msg = `Hola! Soy ${name}. Confirmo asistencia x${qty} 🎉🍾`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");
}

// ===============================
// CONTADOR (tu código original mejorado)
// ===============================
function animateCounter(el, oldValue, newValue) {
  if (oldValue !== newValue) {
    el.classList.add("pop");
    setTimeout(() => el.classList.remove("pop"), 300);
  }
}

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

  animateCounter(daysEl, daysEl.textContent, days);
  animateCounter(hoursEl, hoursEl.textContent, hours);
  animateCounter(minutesEl, minutesEl.textContent, minutes);
  animateCounter(secondsEl, secondsEl.textContent, seconds);

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

// Inicializar
updateTimer();
setInterval(updateTimer, 1000);
