// Typing effect
const roles = ["Software Developer", "Web Developer", "Problem Solver"];
const typingEl = document.getElementById("typing");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = roles[roleIdx];
  typingEl.textContent = word.slice(0, charIdx);
  if (!deleting && charIdx === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  charIdx += deleting ? -1 : 1;
  setTimeout(type, deleting ? 50 : 100);
}
if (reduceMotion) typingEl.textContent = roles[0]; else type();

// Theme toggle (remembers choice; falls back to system setting)
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("visible"));
}

// Contact form: opens the visitor's email app with the message filled in
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent("Portfolio message from " + f.name.value);
  const body = encodeURIComponent(f.message.value + "\n\nFrom: " + f.name.value + " (" + f.email.value + ")");
  window.location.href = "mailto:judemuriuki43@gmail.com?subject=" + subject + "&body=" + body;
  document.getElementById("form-status").textContent = "Opening your email app to send the message.";
});
