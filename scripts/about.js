const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.classList.toggle("menu-open");
});

// Close mobile menu when clicking a navigation link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        body.classList.remove("menu-open");
    });
});

// Add scroll event to make navbar more compact on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.height = "70px";
    } else {
        header.style.height = "70px";
    }
});
