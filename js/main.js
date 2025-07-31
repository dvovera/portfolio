document.addEventListener("DOMContentLoaded", () => {
  createWelcomeCanvas();
  createAboutCanvas();
  createProjectsCanvas();
  scrollToSection(0);

  generateProjectCards();

  //  loading effect
  gsap.from(".welcome h1", { opacity: 0, y: 30, duration: 1, delay: 0.3 });
  gsap.from(".welcome p", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
  gsap.from(".social-links", { opacity: 0, y: 30, duration: 1, delay: 0.7 });

  setTimeout(initTypeAnimation, 1500);
});
