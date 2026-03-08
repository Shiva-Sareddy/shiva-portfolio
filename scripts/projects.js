class ProjectCarousel {
    constructor() {
        this.wrapper = document.getElementById("carouselWrapper");
        this.prevBtn = document.getElementById("prevBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.dotsContainer = document.getElementById("carouselDots");
        this.cards = document.querySelectorAll(".project-card");

        this.currentIndex = 0;
        this.cardWidth = 0;
        this.visibleCards = 1;
        this.totalCards = this.cards.length;
        this.maxIndex = 0;

        // Auto-slide properties
        this.autoSlideInterval = null;
        this.autoSlideDelay = 4000; // 4 seconds
        this.isHovered = false;

        // Drag properties
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.dragThreshold = 50;

        this.init();
        this.setupEventListeners();
        this.setupResizeListener();
        this.startAutoSlide();
    }

    init() {
        this.calculateDimensions();
        this.createDots();
        this.updateCarousel();
        this.updateNavigation();
    }

    calculateDimensions() {
        if (this.cards.length === 0) return;

        const containerWidth = this.wrapper.parentElement.offsetWidth;
        const cardStyle = getComputedStyle(this.cards[0]);
        this.cardWidth =
            this.cards[0].offsetWidth + parseInt(cardStyle.marginRight) || 320;

        // Calculate visible cards based on container width
        if (window.innerWidth >= 1200) {
            this.visibleCards = Math.floor(containerWidth / this.cardWidth);
        } else if (window.innerWidth >= 768) {
            this.visibleCards = Math.floor(containerWidth / this.cardWidth);
        } else {
            this.visibleCards = 1;
        }

        // Ensure at least 1 card is visible
        this.visibleCards = Math.max(
            1,
            Math.min(this.visibleCards, this.totalCards)
        );
        this.maxIndex = Math.max(0, this.totalCards - this.visibleCards);

        // Adjust current index if it exceeds new maxIndex
        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }
    }

    createDots() {
        this.dotsContainer.innerHTML = "";
        const totalDots = this.maxIndex + 1;

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement("div");
            dot.className = "dot";
            dot.addEventListener("click", () => {
                this.goToSlide(i);
                this.resetAutoSlide();
            });
            this.dotsContainer.appendChild(dot);
        }
    }

    updateCarousel() {
        const translateX = -this.currentIndex * this.cardWidth;
        this.wrapper.style.transform = `translateX(${translateX}px)`;
        this.currentTranslate = translateX;
        this.prevTranslate = translateX;
        this.updateDots();
    }

    updateDots() {
        const dots = this.dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }

    updateNavigation() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }

    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateCarousel();
        this.updateNavigation();
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        this.updateCarousel();
        this.updateNavigation();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.updateNavigation();
        }
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            if (!this.isHovered && !this.isDragging) {
                this.next();
            }
        }, this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    // Drag functionality
    getPositionX(event) {
        return event.type.includes("mouse")
            ? event.clientX
            : event.touches[0].clientX;
    }

    dragStart(event) {
        this.isDragging = true;
        this.startPos = this.getPositionX(event);
        this.wrapper.classList.add("dragging");
        this.stopAutoSlide();
    }

    dragMove(event) {
        if (!this.isDragging) return;

        event.preventDefault();
        const currentPosition = this.getPositionX(event);
        this.currentTranslate =
            this.prevTranslate + currentPosition - this.startPos;
        this.wrapper.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    dragEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.wrapper.classList.remove("dragging");

        const movedBy = this.currentTranslate - this.prevTranslate;

        if (Math.abs(movedBy) > this.dragThreshold) {
            if (movedBy < 0 && this.currentIndex < this.maxIndex) {
                this.currentIndex++;
            } else if (movedBy > 0 && this.currentIndex > 0) {
                this.currentIndex--;
            }
        }

        this.updateCarousel();
        this.updateNavigation();
        this.resetAutoSlide();
    }

    setupEventListeners() {
        // Button navigation
        this.nextBtn.addEventListener("click", () => {
            this.next();
            this.resetAutoSlide();
        });
        this.prevBtn.addEventListener("click", () => {
            this.prev();
            this.resetAutoSlide();
        });

        // Mouse events for dragging
        this.wrapper.addEventListener("mousedown", (e) => this.dragStart(e));
        this.wrapper.addEventListener("mousemove", (e) => this.dragMove(e));
        this.wrapper.addEventListener("mouseup", () => this.dragEnd());
        this.wrapper.addEventListener("mouseleave", () => this.dragEnd());

        // Touch events for mobile
        this.wrapper.addEventListener("touchstart", (e) => this.dragStart(e));
        this.wrapper.addEventListener("touchmove", (e) => this.dragMove(e));
        this.wrapper.addEventListener("touchend", () => this.dragEnd());

        // Hover events to pause auto-slide
        this.wrapper.addEventListener("mouseenter", () => {
            this.isHovered = true;
            this.stopAutoSlide();
        });
        this.wrapper.addEventListener("mouseleave", () => {
            this.isHovered = false;
            if (!this.isDragging) {
                this.resetAutoSlide();
            }
        });

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.prev();
                this.resetAutoSlide();
            } else if (e.key === "ArrowRight") {
                this.next();
                this.resetAutoSlide();
            }
        });

        // Prevent drag on images and links
        this.wrapper.addEventListener("dragstart", (e) => e.preventDefault());
    }

    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateDimensions();
                this.createDots();
                this.updateCarousel();
                this.updateNavigation();
            }, 250);
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new ProjectCarousel();
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});
