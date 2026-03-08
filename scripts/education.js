function showTab(index) {
    // Get all tab buttons and contents
    const tabBtns = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".content");

    // Remove active class from all tabs and contents
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("active"));

    // Add active class to selected tab and content
    tabBtns[index].classList.add("active");
    contents[index].classList.add("active");

    // Refresh animation on content
    const timelineContent = document.querySelector(".timeline-content");
    timelineContent.style.animation = "none";
    setTimeout(() => {
        timelineContent.style.animation = "fadeIn 0.5s forwards";
    }, 10);
}
