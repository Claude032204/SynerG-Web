const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".drawer-close");

menuBtn.addEventListener("click", () => {
  navMenu.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("open");
});

// close menu when clicking a link (mobile)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// close menu on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") navMenu.classList.remove("open");
});
/* =========================================================
   SCROLL REVEAL — SERVICE ITEMS (slide up + fade in)
   ========================================================= */
   document.addEventListener("DOMContentLoaded", () => {
    const groups = document.querySelectorAll(".service-items");
  
    if (!groups.length) return;
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
  
          const items = entry.target.querySelectorAll(".service-item");
  
          // stagger per card group
          items.forEach((el, i) => {
            el.style.transitionDelay = `${i * 90}ms`;
            el.classList.add("is-visible");
          });
  
          obs.unobserve(entry.target); // reveal once
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );
  
    groups.forEach((g) => observer.observe(g));
  });
  // ===========================
// Contact page reveal animation (Map + Form)
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Targets: map + form (your exact classes)
  const revealTargets = [
    document.querySelector(".map-box"),
    document.querySelector(".contact-right"),
  ].filter(Boolean);

  // Add base reveal class + optional stagger
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal-up");
    if (i === 0) el.classList.add("reveal-delay-1");
    if (i === 1) el.classList.add("reveal-delay-2");
  });

  if (!revealTargets.length) return;

  // If IntersectionObserver isn't available, just show them
  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((el) => io.observe(el));
});
/* =========================================================
   CTA TYPING ANIMATION (on scroll into view)
   ========================================================= */
   document.addEventListener("DOMContentLoaded", () => {
    const cta = document.querySelector(".cta-panel");
    if (!cta) return;
  
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          cta.classList.add("typing-start");
          observer.unobserve(cta); // run once
        });
      },
      { threshold: 0.35 }
    );
  
    obs.observe(cta);
  });
  