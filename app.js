
let mode = "manual";
let waterOn = false;

// NOTIFICATION SYSTEM
function notify(msg) {
  const n = document.getElementById("notify");
  n.innerText = msg;
  n.style.display = "block";

  setTimeout(() => {
    n.style.display = "none";
  }, 2000);
}

// MODE SWITCH
function setMode(m) {
  mode = m;
  notify("Mode set to " + m.toUpperCase());
}

// WATER TOGGLE
function toggleWater() {
  waterOn = !waterOn;
  notify(waterOn ? "💧 Water ON" : "🚫 Water OFF");
}

// SENSOR STREAM (REAL-TIME FAKE IoT)
let moistureData = [];

function updateSensors() {
  let moisture = Math.floor(Math.random() * 100);
  let temp = Math.floor(Math.random() * 40 + 10);
  let water = Math.floor(Math.random() * 100);

  document.getElementById("moisture").innerText = moisture;
  document.getElementById("temp").innerText = temp;
  document.getElementById("water").innerText = water;

  moistureData.push(moisture);
  if (moistureData.length > 10) moistureData.shift();

  updateChart();

  // ALERT SYSTEM
  if (moisture < 30) notify("⚠ Soil Dry!");
}

// CHART (ANIMATED)
let chart;

function initChart() {
  const ctx = document.getElementById("chart");

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Moisture Level',
        data: [],
        borderColor: '#22c55e',
        tension: 0.4
      }]
    }
  });
}

function updateChart() {
  chart.data.labels = moistureData.map((_, i) => i);
  chart.data.datasets[0].data = moistureData;
  chart.update();
}

// INIT
window.onload = () => {
  initChart();
  setInterval(updateSensors, 2000); // LIVE STREAM every 2 sec
};