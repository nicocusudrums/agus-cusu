// ===============================
// FECHA DEL EVENTO
// ===============================
const eventDate = new Date("Dec 19, 2025 21:00:00").getTime();

// ===============================
// INVITADOS (nombre + cantidad)
// ===============================
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
  { name: "Abuela Martina", qty: 1 },
  { name: "Analia Sosa", qty: 1 },
  { name: "Gaston Sosa", qty: 1 },
  { name: "Cami Dominguez", qty: 1 },
  { name: "Rosario Valdez", qty: 2 },
  { name: "Cintia Gonzalez", qty: 2 },
  { name: "Gary Sosa", qty: 2 },
  { name: "Eduardo Cusumano", qty: 2 },
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
  { name: "Fabri Cusumano", qty: 1 },
];

// ===============================
// LISTA DE CONFIRMADOS (localStorage)
// ===============================
let confirmed = JSON.parse(localStorage.getItem("confirmed")) || [];

function saveConfirmed() {
  localStorage.setItem("confirmed", JSON.stringify(confirmed));
}

// ===============================
// MODAL DE INVITADOS
// ===============================
function openModal() {
  const modal = document.getElementById("guestModal");
  modal.style.display = "block";

  const list = document.getElementById("guestList");
  list.innerHTML = ""; // limpiar

  guests.forEach(g => {
    // Mostrar solo si no está confirmado
    if (!confirmed.some(c => c.name === g.name)) {
      const btn = document.createElement("button");
      btn.textContent = `${g.name} (x${g.qty})`;
      btn.onclick = () => sendConfirmation(g.name, g.qty);
      list.appendChild(btn);
    }
  });

  // Si todos confirmaron
  if (list.innerHTML === "") {
    list.innerHTML = "<p>Todos los invitados ya confirmaron 🎉</p>";
  }
}

function closeModal() {
  document.getElementById("guestModal").style.display = "none";
}

// ===============================
// CONFIRMACIÓN DE INVITADO
// ===============================
function sendConfirmation(name, qty) {
  if (!confirmed.some(c => c.name === name)) {
    confirmed.push({ name, qty, date: new Date().toLocaleString() });
    saveConfirmed();
  }

  updateConfirmedList();
  closeModal();
}

function updateConfirmedList() {
  const ul = document.getElementById("confirmedList");
  ul.innerHTML = "";

  confirmed.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name} — x${c.qty}`;
    ul.appendChild(li);
  });
}

// ===============================
// DESCARGAR CSV / EXCEL
// ===============================
function downloadCSV() {
  if (confirmed.length === 0) {
    alert("Todavía no hay confirmados 😊");
    return;
  }

  let csv = "Nombre,Cantidad,Fecha\n";

  confirmed.forEach(c => {
    csv += `${c.name},${c.qty},${c.date}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "confirmados.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ===============================
// CONTRASEÑA ADMIN
// ===============================
const ADMIN_PASSWORD = "miSecreta123";

function checkPassword() {
    const input = document.getElementById("adminPassword").value;

    if (input === ADMIN_PASSWORD) {
        document.getElementById("confirmedList").style.display = "block";
        document.getElementById("downloadBtn").style.display = "inline-block";
        document.getElementById("passwordDiv").style.display = "none";
        updateConfirmedList();
    } else {
        alert("Contraseña incorrecta 🔒");
    }
}

// ===============================
// CONTADOR ANIMADO
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

// Inicializar contador
updateTimer();
setInterval(updateTimer, 1000);
