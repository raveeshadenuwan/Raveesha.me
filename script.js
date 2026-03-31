// ===================================================
// Raveesha Denuwan — Portfolio Script v2
// ===================================================

// --- PAGE LOADER ---
(function () {
  const loader = document.getElementById("page-loader");
  const pctEl  = document.getElementById("loaderPct");

  let pct = 0;
  const interval = setInterval(() => {
    pct = Math.min(pct + Math.random() * 3.5 + 0.5, 99);
    if (pctEl) pctEl.textContent = Math.floor(pct) + "%";
  }, 40);

  function dismiss() {
    clearInterval(interval);
    if (pctEl) pctEl.textContent = "100%";
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.classList.remove("loading");
    }, 320);
  }

  Promise.all([
    new Promise(r => setTimeout(r, 2600)),
    new Promise(r => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", r);
    })
  ]).then(dismiss);
})();


// --- THEME TOGGLE ---
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

const saved = localStorage.getItem("theme") || "dark";
if (saved === "light") {
  body.classList.add("light");
  themeToggle.querySelector(".theme-icon").textContent = "○";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.querySelector(".theme-icon").textContent = isLight ? "○" : "◐";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});


// --- MOBILE NAV ---
const menuBtn  = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);


// --- ACTIVE NAV LINK ON SCROLL ---
const sections    = document.querySelectorAll("section[id], header[id]");
const allNavLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  allNavLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();


// --- TYPING ANIMATION ---
const typingEl = document.getElementById("typingText");
const roles = [
  "Cyber Security Student",
  "HND Computing Student",
  "Aspiring Penetration Tester",
  "Web & Backend Builder"
];

let ri = 0, ci = 0, deleting = false;

function type() {
  const cur = roles[ri];
  typingEl.textContent = deleting ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
  deleting ? ci-- : ci++;

  if (!deleting && ci === cur.length) {
    deleting = true;
    return setTimeout(type, 1800);
  }
  if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
  }

  setTimeout(type, deleting ? 45 : 85);
}
type();


// --- SKILL BAR ANIMATION ---
const skillBars = document.querySelectorAll(".sk-bar");

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.pct + "%";
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(b => barObserver.observe(b));


// --- PROJECT FILTER ---
const filterBtns  = document.querySelectorAll(".filt");
const projectCards = document.querySelectorAll(".proj");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.cat || "";
      card.classList.toggle("hidden", filter !== "all" && !cats.includes(filter));
    });
  });
});


// --- SCROLL FADE-IN ---
const fadeEls = document.querySelectorAll(
  ".skill-card, .proj, .edu-item, .about-card, .about-text, .stat, .contact-item"
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.classList.add("fade-el");
  fadeObserver.observe(el);
});


// --- NAV BORDER ON SCROLL ---
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.borderBottomColor = window.scrollY > 30
    ? "rgba(255,255,255,0.1)"
    : "rgba(255,255,255,0.06)";
}, { passive: true });
