// 1. Load every component into its placeholder
async function loadComponents() {
  const slots = document.querySelectorAll("[data-component]");
  await Promise.all(
    [...slots].map(async (slot) => {
      const res = await fetch(slot.dataset.component);
      slot.outerHTML = await res.text();
    })
  );
}

// 2. Behavior that needs the components to exist first
function initNavHighlight() {
  const links = document.querySelectorAll(".navbar a");
  const sections = [...links]
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  window.addEventListener("scroll", () => {
    let current = sections[0];
    sections.forEach((sec) => {// Load every component into its placeholder
async function loadComponents() {
  const slots = document.querySelectorAll("[data-component]");
  await Promise.all(
    [...slots].map(async (slot) => {
      const res = await fetch(slot.dataset.component);
      slot.outerHTML = await res.text();
    })
  );
}

// Highlight the nav link of the section in view
function initNavHighlight() {
  const links = document.querySelectorAll(".navbar a");
  const sections = [...links]
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  window.addEventListener("scroll", () => {
    let current = sections[0];
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 200) current = sec;
    });
    links.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + current.id)
    );
  });
}

// Contact form (demo only, does not send anything yet)
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("formStatus").textContent = "Thanks! Your message was sent.";
    form.reset();
  });
}

loadComponents().then(() => {
  initNavHighlight();
  initContactForm();
});
      if (window.scrollY >= sec.offsetTop - 200) current = sec;
    });
    links.forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + current.id)
    );
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("formStatus").textContent = "Thanks! Your message was sent.";
    form.reset();
  });
}

loadComponents().then(() => {
  initNavHighlight();
  initContactForm();
});

function initTyping() {
  const el = document.getElementById("typing");
  if (!el) return;

  const words = JSON.parse(el.dataset.words);
  const typeSpeed = 110;
  const deleteSpeed = 60;
  const pauseAfterWord = 1600;
  const pauseBeforeNext = 300;

  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = true;

  function tick() {
    const word = words[wordIndex];

    if (deleting) {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        return setTimeout(tick, pauseBeforeNext);
      }
      return setTimeout(tick, deleteSpeed);
    }

    charIndex++;
    el.textContent = word.slice(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      return setTimeout(tick, pauseAfterWord);
    }
    setTimeout(tick, typeSpeed);
  }

  setTimeout(tick, pauseAfterWord);
}

loadComponents().then(() => {
  initNavHighlight();
  initContactForm();
  initTyping();
  loadEffectRuntime();
});
