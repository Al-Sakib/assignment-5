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


