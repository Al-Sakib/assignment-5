// ================= helpers =================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const pad = (n) => String(n).padStart(2, "0");

// ================= toast (warning notification) =================
function showToast(message, type = "warning") {
  const box = $("#toast-container");
  if (!box) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute("role", "alert");
  toast.innerHTML = `<span>${type === "warning" ? "⚠️" : "🎉"}</span><div>${message}</div>`;
  box.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ================= theme: change background on logo click =================
function applyTheme(color) {
  document.body.style.backgroundColor = color;
  document.documentElement.style.setProperty("--bg", color);
}

function randomPastel() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 85%, 93%)`;
}

try {
  const saved = localStorage.getItem("devboard-theme");
  if (saved) applyTheme(saved);
} catch (_) { /* storage may be unavailable */ }

const themeBtn = $("#theme-btn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const color = randomPastel();
    applyTheme(color);
    try { localStorage.setItem("devboard-theme", color); } catch (_) {}
  });
}

// ================= dashboard (index.html only) =================
const completedEl = $("#completed-count");
const assignedEl = $("#assigned-count");

if (completedEl && assignedEl) {
  let completed = parseInt(completedEl.textContent, 10); // 23
  let assigned = $$(".complete-btn").length;             // 6
  assignedEl.textContent = pad(assigned);

  // date card
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "short" });
  const rest = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).replace(",", "");
  $("#date-day").textContent = `${dayName} ,`;
  $("#date-full").textContent = rest;

  const logList = $("#log-list");

  function addLog(title) {
    const time = new Date().toLocaleTimeString("en-US");
    const li = document.createElement("li");
    li.innerHTML = `You have Complete The Task <b>${title}</b> at <span class="log-time">${time}</span>`;
    logList.prepend(li);
  }

  $$(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const title = card.dataset.title;

      // 1. warning notification
      showToast(`<strong>Board updated</strong>Task “${title}” marked as completed.`);

      // 2. Task Assigned  -1,  Completed counter +1 (23 -> 24 ... 29)
      assigned -= 1;
      completed += 1;
      assignedEl.textContent = pad(assigned);
      completedEl.textContent = completed;

      // disable the button so one task can't be completed twice
      btn.disabled = true;
      btn.textContent = "Completed";
      card.style.opacity = ".85";

      // activity log
      addLog(title);

      if (assigned === 0) {
        setTimeout(() => showToast("<strong>Congratulations!</strong>You have completed all the current tasks.", "success"), 400);
      }
    });
  });

  $("#clear-history").addEventListener("click", () => {
    logList.innerHTML = "";
  });
}
