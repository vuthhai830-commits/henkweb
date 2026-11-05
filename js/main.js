async function loadComponents() {
  const slots = document.querySelectorAll("[data-component]");
  await Promise.all(
    [...slots].map(async (slot) => {
      const res = await fetch(slot.dataset.component + '?v=' + Date.now());
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      doc.querySelectorAll('script').forEach(s => s.remove());
      slot.outerHTML = doc.body.innerHTML;
    })
  );
}

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

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const close = document.getElementById("navClose");
  if (!toggle || !links) return;

  function openMenu() {
    links.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) closeMenu();
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
  initMobileNav();
});
