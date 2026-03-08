// Project data
const portfolioProjects = [
  {
    title: "Rent App",
    description:
      "A personal project for managing all my tenants data and monthly rents with user friendly UI",
    image: "project-thumbnails/rent-app.png",
    previewUrl: "#",
    githubUrl: "#",
  },
  {
    title: "HexaBot - AI Chat Assistant",
    description:
      "Interactive Personalised AI Based Chat Assistant for Daily and Repetitive Tasks",
    image: "project-thumbnails/hexabot-canva.png",
    previewUrl: "https://example.com/preview1",
    githubUrl: "https://github.com/Shiva-Sareddy/HexaBot",
  },
  {
    title: "MakeNow - AI Recipe Generator",
    description:
      "A Quick AI Recipe Generator with your Available & Immediate Kitchen Ingredients",
    image: "project-thumbnails/makeNow-Canva.png",
    previewUrl: "https://makenow-recipe.netlify.app/",
    githubUrl: "https://github.com/Shiva-Sareddy/recipe-generator",
  },
  {
    title: "Interactive TODO Website",
    description:
      "Beautiful and Interactive Personal TODO List Website for Everyday Todos",
    image: "project-thumbnails/TodoER-Canva.png",
    previewUrl: "https://todower.netlify.app/",
    githubUrl: "https://github.com/Shiva-Sareddy/todo-webapp",
  },
  {
    title: "Quick & Safe Password Generator",
    description:
      "Quick Password Generator Website with safe and security, easy copy and paste",
    image: "project-thumbnails/pwd-Canva.png",
    previewUrl: "https://safe-keys.netlify.app/",
    githubUrl: "https://github.com/Shiva-Sareddy/Pwd-Generator",
  },
  {
    title: "Sorting Algorithm Visualizer",
    description:
      "Helpful for the Students who are new to DSA Sorting Algorithms to get a Quick and Solid Understanding",
    image: "project-thumbnails/sorting-Canva.png",
    previewUrl: "https://sorting-algo-visuals.netlify.app/",
    githubUrl: "https://github.com/Shiva-Sareddy/sorting",
  },
  {
    title: "Youtube Static Web Clone",
    description:
      "It's a Complete Static Website using CSS Flexbox and Grid Layout, Mobile Responsive Media Queries",
    image: "project-thumbnails/youtube-Canva.png",
    previewUrl: "https://shiva-sareddy-youtube.netlify.app/",
    githubUrl: "https://github.com/Shiva-Sareddy/youtube",
  },
];

class PortfolioCarousel {
  constructor() {
    this.track = document.getElementById("portfolioCarouselTrack");
    this.dotsContainer = document.getElementById("portfolioCarouselDots");

    this.currentIndex = 0;
    this.itemsPerView = 3;
    this.totalSlides = Math.ceil(portfolioProjects.length / this.itemsPerView);

    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.initialTransform = 0;

    this.init();
  }

  init() {
    this.updateItemsPerView();
    this.renderProjects();
    this.renderDots();
    this.bindEvents();
    this.updateView();
  }

  updateItemsPerView() {
    const width = window.innerWidth;
    if (width <= 640) {
      this.itemsPerView = 1;
    } else if (width <= 1024) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 3;
    }
    this.totalSlides = Math.ceil(portfolioProjects.length / this.itemsPerView);
  }

  renderProjects() {
    this.track.innerHTML = portfolioProjects
      .map(
        (project) => `
                    <div class="portfolio-project-slide">
                        <div class="portfolio-project-card">
                            <div class="portfolio-image-section">
                                <img src="${project.image}" alt="${project.title}" class="portfolio-project-img">
                                <div class="portfolio-hover-overlay">
                                    <a href="${project.previewUrl}" class="portfolio-action-btn portfolio-preview-btn" target="_blank" title="Preview">
                                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                    <a href="${project.githubUrl}" class="portfolio-action-btn portfolio-github-btn" target="_blank" title="GitHub">
                                        <i class="fa-brands fa-github"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="portfolio-card-details">
                                <h3 class="portfolio-project-name">${project.title}</h3>
                                <p class="portfolio-project-desc">${project.description}</p>
                            </div>
                        </div>
                    </div>
                `,
      )
      .join("");
  }

  renderDots() {
    this.dotsContainer.innerHTML = Array.from(
      { length: this.totalSlides },
      (_, i) => `
                    <div class="portfolio-indicator-dot ${
                      i === 0 ? "portfolio-dot-active" : ""
                    }" data-index="${i}"></div>
                `,
    ).join("");
  }

  bindEvents() {
    // Dot navigation
    this.dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("portfolio-indicator-dot")) {
        this.currentIndex = parseInt(e.target.dataset.index);
        this.updateView();
      }
    });

    // Drag functionality
    this.track.addEventListener("mousedown", (e) => this.startDrag(e));
    this.track.addEventListener("touchstart", (e) => this.startDrag(e), {
      passive: false,
    });

    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("touchmove", (e) => this.drag(e), {
      passive: false,
    });

    document.addEventListener("mouseup", () => this.endDrag());
    document.addEventListener("touchend", () => this.endDrag());

    // Resize handler
    window.addEventListener("resize", () => {
      this.updateItemsPerView();
      this.renderDots();
      this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
      this.updateView();
    });
  }

  startDrag(e) {
    this.isDragging = true;
    this.track.classList.add("portfolio-dragging");
    this.startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    this.initialTransform = this.currentIndex * -100;
  }

  drag(e) {
    if (!this.isDragging) return;

    e.preventDefault();
    this.currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const deltaX = this.currentX - this.startX;
    const dragPercentage = (deltaX / this.track.offsetWidth) * 100;

    this.track.style.transform = `translateX(${
      this.initialTransform + dragPercentage
    }%)`;
  }

  endDrag() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.track.classList.remove("portfolio-dragging");

    const deltaX = this.currentX - this.startX;
    const threshold = this.track.offsetWidth * 0.1;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && this.currentIndex > 0) {
        this.prev();
      } else if (deltaX < 0 && this.currentIndex < this.totalSlides - 1) {
        this.next();
      }
    }

    this.updateView();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateView();
  }

  prev() {
    this.currentIndex =
      this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
    this.updateView();
  }

  updateView() {
    const translateX = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update dots
    document
      .querySelectorAll(".portfolio-indicator-dot")
      .forEach((dot, index) => {
        dot.classList.toggle(
          "portfolio-dot-active",
          index === this.currentIndex,
        );
      });
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioCarousel();
});
