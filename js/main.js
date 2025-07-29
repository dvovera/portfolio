// Add this code to your script section

document.addEventListener("DOMContentLoaded", () => {
  // Initialize other components first
  createWelcomeCanvas();
  createAboutCanvas();
  createProjectsCanvas();
  scrollToSection(0);

  generateProjectCards();

  // Add loading effect
  gsap.from(".welcome h1", { opacity: 0, y: 30, duration: 1, delay: 0.3 });
  gsap.from(".welcome p", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
  gsap.from(".social-links", { opacity: 0, y: 30, duration: 1, delay: 0.7 });

  // Initialize the typing animation after the initial animation completes
  setTimeout(initTypeAnimation, 1500);
});
