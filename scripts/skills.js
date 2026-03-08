const skillsData = {
    html: {
        title: "HTML",
        percentage: 85,
        color: "#FF4C1E",
        concepts: [
            "Semantic HTML",
            "Forms & Validation",
            "Accessibility",
            "SEO Optimization",
            "HTML5 APIs",
        ],
        courses: [
            { name: "HTML5 Advanced Topics", url: "#" },
            { name: "Web Accessibility", url: "#" },
            { name: "Semantic Markup", url: "#" },
        ],
    },
    css: {
        title: "CSS",
        percentage: 78,
        color: "#264de4",
        concepts: [
            "Flexbox & Grid",
            "Responsive Design",
            "CSS Animations",
            "CSS Variables",
            "CSS Preprocessors (SASS)",
        ],
        courses: [
            { name: "CSS Grid Mastery", url: "#" },
            { name: "Advanced Animations", url: "#" },
            { name: "SASS Workshop", url: "#" },
        ],
    },
    javascript: {
        title: "JavaScript",
        percentage: 75,
        color: "#FFDF00",
        concepts: [
            "DOM Manipulation",
            "ES6+ Features",
            "Async Programming",
            "Event Handling",
            "Web APIs",
        ],
        courses: [
            { name: "Modern JavaScript", url: "#" },
            { name: "Async JS Deep Dive", url: "#" },
            { name: "Frontend Framework Basics", url: "#" },
        ],
    },
    java: {
        title: "Java",
        percentage: 80,
        color: "#DB380F",
        concepts: [
            "OOP Concepts",
            "Collections Framework",
            "Multithreading",
            "Exception Handling",
            "Java Stream API",
        ],
        courses: [
            { name: "Java Core Concepts", url: "#" },
            { name: "Spring Framework", url: "#" },
            { name: "Enterprise Java", url: "#" },
        ],
    },
    mysql: {
        title: "MySQL",
        percentage: 72,
        color: "#079CFF",
        concepts: [
            "Database Design",
            "SQL Queries",
            "Stored Procedures",
            "Indexing & Optimization",
            "Transactions & ACID",
        ],
        courses: [
            { name: "Database Fundamentals", url: "#" },
            { name: "SQL Performance", url: "#" },
            { name: "Database Architecture", url: "#" },
        ],
    },
    python: {
        title: "Python",
        percentage: 83,
        color: "#306998",
        concepts: [
            "Data Structures",
            "Libraries (Pandas, NumPy)",
            "Web Scraping",
            "Automation",
            "File Handling",
        ],
        courses: [
            { name: "Python for Data Science", url: "#" },
            { name: "Automation with Python", url: "#" },
            { name: "Web Development with Django", url: "#" },
        ],
    },
    aws: {
        title: "Amazon Web Services",
        percentage: 10,
        color: "#FF9902",
        concepts: [
            "Cloud Fundamentals",
            "Service Models",
            "IAM- I dentity and Access Management ",
            "EC2",
            ,
        ],
        courses: [{ name: "AWS Cloud Fundamentals", url: "#" }],
    },
    excel: {
        title: "MS Excel",
        percentage: 30,
        color: "#0E7C44",
        concepts: ["Excel Dialog Bar"],
        courses: [{ name: "Excel Work", url: "#" }],
    },
};

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const skillImages = document.querySelectorAll(".skill");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const progressBar = document.getElementById("progressBar");
const percentageText = document.getElementById("percentageText");
const conceptsList = document.getElementById("conceptsList");
const courseLinks = document.getElementById("courseLinks");

// Check if we're on a mobile device
const isMobile = () => window.innerWidth <= 480;

// Add click event to each skill image
skillImages.forEach((img) => {
    img.addEventListener("click", () => {
        const skillName = img.getAttribute("data-skill");
        const skillData = skillsData[skillName];

        // Populate modal with data
        modalIcon.src = img.src;
        modalIcon.alt = img.alt;
        modalTitle.textContent = skillData.title;

        // Set progress bar
        progressBar.style.width = "0%";
        progressBar.style.backgroundColor = skillData.color;
        setTimeout(() => {
            progressBar.style.width = skillData.percentage + "%";
            percentageText.textContent = skillData.percentage + "%";
        }, 100);

        // Add concepts
        conceptsList.innerHTML = "";
        skillData.concepts.forEach((concept) => {
            const li = document.createElement("li");
            li.textContent = concept;
            conceptsList.appendChild(li);
        });

        // Add course links
        courseLinks.innerHTML = "";
        skillData.courses.forEach((course) => {
            const link = document.createElement("a");
            link.href = course.url;
            link.className = "course-link";
            link.textContent = course.name;
            courseLinks.appendChild(link);
        });

        // Show modal
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open

        // Adjust modal container for mobile fullscreen
        if (isMobile()) {
            document.querySelector(".modal-container").style.height = "100%";
        }
    });
});

// Close modal when clicking the close button
modalClose.addEventListener("click", closeModal);

// Close modal when clicking outside the modal container
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scrolling
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
    }
});

// Handle resize events for responsiveness
window.addEventListener("resize", () => {
    if (modalOverlay.classList.contains("active")) {
        if (isMobile()) {
            document.querySelector(".modal-container").style.height = "100%";
        } else {
            document.querySelector(".modal-container").style.height = "auto";
        }
    }
});
