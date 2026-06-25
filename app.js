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

function goSelection() {
  window.location.href = "selection.html";
}

// =====================
// AUTH HELPERS
// =====================
function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true";
}

// Pages that require a logged-in user.
const PROTECTED_PAGES = ["selection.html", "dashboard.html"];

(function guardPage() {
  const path = window.location.pathname;
  const isProtected = PROTECTED_PAGES.some((page) => path.includes(page));
  if (isProtected && !isLoggedIn()) {
    window.location.href = "login.html";
  }
})();

// =====================
// LOGIN
// =====================
function login() {
  const userInput = document.getElementById("user");
  const passInput = document.getElementById("pass");
  const msg = document.getElementById("msg");

  const u = userInput.value.trim();
  const p = passInput.value.trim();

  if (!u || !p) {
    msg.innerText = "Please fill in both fields.";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("username", u);

  // Always send the user to soil selection right after login,
  // never straight to the dashboard without choosing a soil type.
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
// SOIL SELECTION
// =====================
const SOIL_INFO = {
  Sandy: "Drains fast, needs frequent light watering.",
  Clay: "Holds water well, watch for waterlogging.",
  Loamy: "Balanced texture, ideal moisture retention.",
};

function selectSoil(type, el) {
  localStorage.setItem("soilType", type);

  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("selected");
  });
  if (el) el.classList.add("selected");

  const continueBtn = document.getElementById("continueBtn");
  if (continueBtn) continueBtn.disabled = false;

  const hint = document.getElementById("soilHint");
  if (hint) hint.innerText = `${type} soil selected — ${SOIL_INFO[type] || ""}`;
}

// Restore previously selected soil card on page load (selection.html)
function restoreSoilSelection() {
  const soil = localStorage.getItem("soilType");
  if (!soil) return;
  const card = document.querySelector(`.card[data-soil="${soil}"]`);
  if (card) selectSoil(soil, card);
}

// =====================
// LOAD DATA (dashboard header)
// =====================
window.addEventListener("load", () => {
  const soil = localStorage.getItem("soilType");
  const soilEl = document.getElementById("soilType");
  if (soilEl) {
    soilEl.innerText = soil || "Not selected";
  }

  restoreSoilSelection();
  updateDashboard();
});

// =====================
// SENSOR SIMULATION
// =====================
function setBar(barId, value) {
  const bar = document.getElementById(barId);
  if (bar) bar.style.width = value + "%";
}

function updateDashboard() {
  const m = document.getElementById("moisture");
  const t = document.getElementById("temp");
  const w = document.getElementById("water");
  const status = document.getElementById("moistureStatus");

  if (!m || !t || !w) return;

  const moisture = Math.floor(Math.random() * 100);
  const temp = Math.floor(Math.random() * 40 + 10);
  const water = Math.floor(Math.random() * 100);

  m.innerText = moisture + "%";
  t.innerText = temp + "°C";
  w.innerText = water + "%";

  setBar("moistureBar", moisture);
  setBar("tempBar", Math.min(100, Math.round((temp / 50) * 100)));
  setBar("waterBar", water);

  if (status) {
    if (moisture < 25) {
      status.innerText = "Soil is too dry";
      status.className = "stat-status status-warn";
    } else {
      status.innerText = "Within range";
      status.className = "stat-status status-good";
    }
  }
}

// Only run the sensor simulation loop on the dashboard page
if (window.location.pathname.includes("dashboard")) {
  setInterval(updateDashboard, 2000);
}
