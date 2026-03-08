// Scroll to top functionality
document.getElementById("scrollToTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Show/hide scroll button based on scroll position
window.addEventListener("scroll", function () {
    const scrollButton = document.getElementById("scrollToTop");
    if (window.pageYOffset > 300) {
        scrollButton.style.opacity = "1";
    } else {
        scrollButton.style.opacity = "0";
    }
});
