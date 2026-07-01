// Always start at the top when the page loads or refreshes
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const showcase = document.querySelector(".showcase");

if (showcase) {
  showcase.addEventListener("mousemove", (event) => {
    const rect = showcase.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    showcase.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  showcase.addEventListener("mouseleave", () => {
    showcase.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}
const tickerTrack = document.querySelector(".ticker-track");

if (tickerTrack) {

    const original = tickerTrack.innerHTML;

    while (tickerTrack.scrollWidth < window.innerWidth * 3) {
        tickerTrack.innerHTML += original;
    }

    let position = 0;
    const speed = 1.2; // <-- Change this number for speed

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