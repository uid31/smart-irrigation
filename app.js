// =====================
// NAVIGATION
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
// LOGIN
// =====================
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if (!u || !p) {
    document.getElementById("msg").innerText = "Fill all fields";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  window.location.href = "selection.html";
}

// =====================
// LOGOUT
// =====================
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
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
// LOAD DATA
// =====================
window.addEventListener("load", () => {
  let soil = localStorage.getItem("soilType");
  let soilEl = document.getElementById("soilType");

  if (soilEl) {
    soilEl.innerText = soil || "Not selected";
  }
});

// =====================
// SENSOR SIMULATION
// =====================
function updateDashboard() {
  let m = document.getElementById("moisture");
  let t = document.getElementById("temp");
  let w = document.getElementById("water");

  if (m && t && w) {
    let moisture = Math.floor(Math.random() * 100);
    let temp = Math.floor(Math.random() * 40 + 10);
    let water = Math.floor(Math.random() * 100);

    m.innerText = moisture + "%";
    t.innerText = temp + "°C";
    w.innerText = water + "%";

    // Alert only if very low
    if (moisture < 25) {
      console.log("⚠ Soil is too dry!");
    }
  }
}

// RUN EVERY 2 SECONDS
setInterval(updateDashboard, 2000);