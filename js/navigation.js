let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

document.addEventListener("mousemove", (event) => {
  // Normalize mouse coordinates between -1 and 1
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -((event.clientY / window.innerHeight) * 2 - 1);
});

// Section navigation and animations
let currentSection = 0;
const sections = ["welcome", "about", "projects"];
const container = document.querySelector(".container");
const progressBar = document.querySelector(".progress-bar");

function updateProgressBar() {
  const progress = (currentSection / (sections.length - 1)) * 100;
  progressBar.style.width = `${progress}%`;
}

function scrollToSection(index) {
  // Prevent scrolling beyond bounds
  if (index < 0 || index >= sections.length) return;

  currentSection = index;

  // Update container position
  container.style.transform = `translateX(-${currentSection * 100}vw)`;

  // Update active class on sections
  document.querySelectorAll(".section").forEach((section, i) => {
    if (i === currentSection) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });

  // Update active buttons
  document.querySelectorAll(".nav-btn").forEach((btn, i) => {
    if (i === currentSection) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update scroll dots
  document.querySelectorAll(".scroll-dot").forEach((dot, i) => {
    if (i === currentSection) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  updateProgressBar();
}

// Event listeners for navigation
document.querySelectorAll(".nav-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    scrollToSection(index);
  });
});

document.querySelectorAll(".scroll-dot").forEach((dot, index) => {
  dot.addEventListener("click", () => {
    scrollToSection(index);
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    scrollToSection(currentSection + 1);
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    scrollToSection(currentSection - 1);
  }
});
// ————————————————————————————————————————————————
// Wheel‑nav: accumulator + non‑passive + transitionend + fallback
// ————————————————————————————————————————————————
let accumulatedDelta = 0;
let canScroll = true;
const SCROLL_THRESHOLD = 100;
const FALLBACK_MS = 1000;

container.addEventListener("transitionend", (e) => {
  if (e.propertyName === "transform") {
    canScroll = true;
  }
});

function onWheel(e) {
  const sidebar = document.querySelector(".project-sidebar");
  if (sidebar?.classList.contains("open")) {
    return; // ignore when sidebar is open
  }

  // If you're over a scrollable inner container, let it scroll normally
  const activeSection = document.querySelector(".section.active");
  const scrollable = activeSection?.querySelector(
    ".scrolling-container, .projects-container"
  );
  if (scrollable) {
    const { top, bottom, right, left } = scrollable.getBoundingClientRect();

    const overScrollable =
      e.clientY >= top &&
      e.clientY <= bottom &&
      e.clientX >= left &&
      e.clientX <= right;
    if (overScrollable) {
      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const atBottom = scrollTop >= scrollHeight - clientHeight - 1;
      const atTop = scrollTop <= 0;

      // only hijack if at the boundary
      if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
        // fall through to accumulator logic
      } else {
        return;
      }
    }
  }

  e.preventDefault();
  if (!canScroll) return;

  accumulatedDelta += e.deltaY;

  if (Math.abs(accumulatedDelta) >= SCROLL_THRESHOLD) {
    canScroll = false;
    const direction = accumulatedDelta > 0 ? 1 : -1;
    accumulatedDelta = 0;
    scrollToSection(currentSection + direction);

    // fallback unlock
    setTimeout(() => {
      canScroll = true;
    }, FALLBACK_MS);
  }
}

// install as non‑passive so preventDefault() works
document.addEventListener("wheel", onWheel, { passive: false });
