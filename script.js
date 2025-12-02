// Fecha del evento
const eventDate = new Date("Dec 19, 2025 21:00:00").getTime();

// INVITADOS
const guests = [
  { name: "Juan Pablo Sosa U", qty: 2 },
  { name: "Mauro Cusumano Cerasuolo", qty: 1 },
  { name: "Romi Sosa U", qty: 2 },
  { name: "Ro Cusumano Cerasuolo", qty: 2 },
  { name: "Mia Cerasuolo", qty: 1 },
  { name: "Maye Cerasuolo", qty: 1 },
  { name: "Vicky Sosa U", qty: 1 },
  { name: "Jose Cerasuolo", qty: 4 },
  { name: "Ani Carretero", qty: 3 },
  { name: "Raquel y Gustavo", qty: 2 },
  { name: "Vero Urrutia", qty: 2 },
  { name: "Santi Romero", qty: 2 },
  { name: "Pablo Urrutia", qty: 1 },
  { name: "Carolina Sosa", qty: 2 },
  { name: "Teresa de Jesus Guglialmelli", qty: 1 },
  { name: "Abuela Martina", qty: 1 },
  { name: "Analia Sosa", qty: 1 },
  { name: "Gaston Sosa", qty: 1 },
  { name: "Cami Dominguez", qty: 1 },
  { name: "Rosario Valdez", qty: 2 },
  { name: "Cintia Gonzalez", qty: 2 },
  { name: "Gary Sosa", qty: 2 },
  { name: "Eduardo Cusumano", qty: 2 },
  { name: "Ruben Cusumano", qty: 2 },
  { name: "Sergio Cusumano", qty: 2 },
  { name: "Jose Luis Cusumano", qty: 4 },
  { name: "Marcos Cusumano", qty: 2 },
  { name: "Agustin Cusumano", qty: 2 },
  { name: "Anto Cusumano", qty: 2 },
  { name: "Marcos Matar", qty: 2 },
  { name: "Nacho Robles", qty: 2 },
  { name: "Maxi Coll", qty: 2 },
  { name: "Augusto", qty: 2 },
  { name: "Nico PDF", qty: 2 },
  { name: "Jp", qty: 1 },
  { name: "Negro", qty: 2 },
  { name: "Pablo Ferreyra", qty: 2 },
  { name: "Seba Diaz", qty: 2 },
  { name: "Markuza", qty: 1 },
  { name: "El Tucu Gamarra", qty: 1 },
  { name: "Fabri y Lauti Cusumano", qty: 1 },
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

// CONTADOR
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

// Inicializar contador
updateTimer();
setInterval(updateTimer, 1000);
