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


