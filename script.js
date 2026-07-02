// ========================================
// Page Setup
// ========================================

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});


// ========================================
// Reveal Animations
// ========================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});


// ========================================
// Infinite Services Ticker
// ========================================

const tickerTrack = document.querySelector(".ticker-track");

if (tickerTrack) {
  const original = tickerTrack.innerHTML;

  while (tickerTrack.scrollWidth < window.innerWidth * 3) {
    tickerTrack.innerHTML += original;
  }

  let position = 0;
  const speed = 1.2;

  function animateTicker() {
    position -= speed;

    if (Math.abs(position) >= tickerTrack.firstElementChild.offsetWidth) {
      position = 0;
    }

    tickerTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateTicker);
  }

  animateTicker();
}


// ========================================
// Smooth Scroll & Active Navigation
// ========================================

const navLinks = document.querySelectorAll(".desktop-nav a");
const smoothLinks = document.querySelectorAll('a[href^="#"]');
const servicesSection = document.querySelector("#services");
const workSection = document.querySelector("#work");

let isClickScrolling = false;
let currentSection = "";

function setActive(section) {
  if (currentSection === section) return;

  currentSection = section;

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  if (section) {
    document
      .querySelector(`.desktop-nav a[href="#${section}"]`)
      ?.classList.add("active");
  }
}

function updateActiveNav() {
  if (isClickScrolling || !servicesSection || !workSection) return;

  const triggerPoint = window.innerHeight * 0.25;
  const servicesRect = servicesSection.getBoundingClientRect();
  const workRect = workSection.getBoundingClientRect();

  if (
    servicesRect.top <= triggerPoint &&
    servicesRect.bottom >= triggerPoint
  ) {
    setActive("services");
  } else if (
    workRect.top <= triggerPoint &&
    workRect.bottom >= triggerPoint
  ) {
    setActive("work");
  } else {
    setActive("");
  }
}

smoothLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    isClickScrolling = true;

    const section = href.replace("#", "");
    setActive(section);

    target.scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {
      history.replaceState(null, "", window.location.pathname);
      isClickScrolling = false;
      updateActiveNav();
    }, 500);
  });
});

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);


// ========================================
// Work Card Tap Animation
// ========================================

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("pointerdown", () => {
    card.classList.add("tap-active");
  });

  card.addEventListener("pointerup", () => {
    setTimeout(() => {
      card.classList.remove("tap-active");
    }, 220);
  });

  card.addEventListener("pointercancel", () => {
    card.classList.remove("tap-active");
  });

  card.addEventListener("pointerleave", () => {
    card.classList.remove("tap-active");
  });
});


// ========================================
// Instagram App Link
// ========================================

const instagramLink = document.querySelector(".instagram-link");

if (instagramLink) {
  instagramLink.addEventListener("click", (event) => {
    event.preventDefault();

    window.location.href = "instagram://user?username=orocustomz";

    setTimeout(() => {
      window.location.href = "https://instagram.com/orocustomz";
    }, 500);
  });
}

// ========================================
// Footer
// ========================================

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".footer-logo")?.addEventListener("click", (e) => {
  e.preventDefault();

  const start = window.scrollY;
  const duration = 600;
  let startTime = null;

  function smoothScroll(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);

    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(smoothScroll);
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  requestAnimationFrame(smoothScroll);
});