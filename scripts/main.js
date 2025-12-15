const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".drawer-close");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.add("open");
  });
}

if (closeBtn && navMenu) {
  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
}
