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
