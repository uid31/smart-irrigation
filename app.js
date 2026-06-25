
// =====================
// NAVIGATION HELPERS
// =====================

function go(page) {
  window.location.href = page;
}

function goLogin() {
  window.location.href = "login.html";
}

function goDashboard() {
  window.location.href = "dashboard.html";
}

// =====================
// LOGIN SYSTEM (FAKE AUTH)
// =====================

function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (!u || !p) {
    document.getElementById("msg").innerText = "Fill all fields";
    return;
  }

  localStorage.setItem("loggedIn", "true");

  window.location.href = "select.html";
}

// =====================
// PROTECT DASHBOARD
// =====================

if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
  }
}

// =====================
// SOIL SELECTION
// =====================

function selectSoil(type) {
  localStorage.setItem("soilType", type);
  alert("Selected: " + type);
}

// =====================
// LOGOUT
// =====================

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// =====================
// LIVE SENSOR SIMULATION
// =====================

function updateData() {
  document.getElementById("moisture")?.innerText = Math.floor(Math.random() * 100) + "%";
  document.getElementById("temp")?.innerText = Math.floor(Math.random() * 35 + 15) + "°C";
  document.getElementById("water")?.innerText = Math.floor(Math.random() * 100) + "%";
}

setInterval(updateData, 2000);


// =====================
// DASHBOARD FEATURES
// =====================

let mode = "manual";
let water = false;

// LOAD SOIL TYPE FROM SELECTION PAGE
window.addEventListener("load", () => {
  const soil = localStorage.getItem("soilType");
  if (document.getElementById("soilType")) {
    document.getElementById("soilType").innerText = soil || "Not selected";
  }
});

// MODE CONTROL
function setMode(m) {
  mode = m;
  alert("Mode set to: " + m.toUpperCase());
}

// WATER CONTROL
function toggleWater() {
  water = !water;
  alert(water ? "💧 Water ON" : "🚫 Water OFF");
}

// LIVE SENSOR SIMULATION
function updateDashboard() {

  if (document.getElementById("moisture")) {
    let moisture = Math.floor(Math.random() * 100);
    let temp = Math.floor(Math.random() * 40 + 10);
    let waterLevel = Math.floor(Math.random() * 100);

    document.getElementById("moisture").innerText = moisture + "%";
    document.getElementById("temp").innerText = temp + "°C";
    document.getElementById("water").innerText = waterLevel + "%";

    // AUTO ALERT SYSTEM
    if (moisture < 30) {
      alert("⚠ Soil is too dry!");
    }
  }
}

// RUN EVERY 2 SECONDS
setInterval(updateDashboard, 2000);

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}