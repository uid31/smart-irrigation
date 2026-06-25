function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if (user && pass) {
    document.getElementById("msg").innerText = "Login successful 🚀";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  } else {
    document.getElementById("msg").innerText = "Please fill all fields";
  }
}

// fake live data
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("moisture")?.innerText = Math.floor(Math.random() * 100) + "%";
  document.getElementById("temp")?.innerText = Math.floor(Math.random() * 35 + 15) + "°C";
  document.getElementById("water")?.innerText = Math.floor(Math.random() * 100) + "%";
});

function waterOn() {
  alert("💧 Irrigation system activated");
}

function waterOff() {
  alert("🚫 Irrigation system stopped");
}