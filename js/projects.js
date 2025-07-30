// Project data
const projectsData = {
  "the-orable": {
    title: "The Orable",
    description: "Let an AI oracle read your future using Tarot cards!",
    longDescription: "Unsure about your future? Ask the oracle!",
    technologies: [
      "Three.js",
      "React",
      "WebGL",
      "JavaScript",
      "GLSL Shaders",
      "React Three Fiber",
    ],
    features: [],
    image: "the_orable.gif",
    links: [
      { label: "Try it", url: "https://dvovera.github.io/The-Orable/" },
      { label: "Github", url: "https://github.com/dvovera/The-Orable" },
      // Example of additional link
    ],
  },
  "product-visualizer": {
    title: "3D Product Visualizer",
    description:
      "An interactive 3D product configurator that allows users to customize and view products in real-time.",
    longDescription:
      "This project was designed to solve the common e-commerce problem of customers wanting to see products from all angles before purchasing. The visualizer allows users to rotate, zoom, and customize various product features including colors, materials, and add-ons, all in a real-time 3D environment.<br><br>The application features realistic lighting, textures, and physics-based rendering to provide an accurate representation of the products. Performance optimization was a key challenge, requiring techniques like level-of-detail rendering and texture compression.",
    technologies: [
      "Three.js",
      "React",
      "WebGL",
      "JavaScript",
      "GLSL Shaders",
      "React Three Fiber",
    ],
    features: [
      "Real-time 3D rendering",
      "Interactive color and material selection",
      "Product configuration saving and sharing",
      "Mobile-responsive design",
      "High-performance rendering optimizations",
    ],
    image: "/api/placeholder/400/250", // Using placeholder as per instructions
    demoLink: "#",
    codeLink: "#",
  },
  "data-dashboard": {
    title: "Data Visualization Dashboard",
    description:
      "A responsive dashboard for visualizing complex datasets with interactive elements.",
    longDescription:
      "This dashboard was created for a financial technology company to help their clients visualize and analyze market trends and portfolio performance. The dashboard combines multiple visualization types including line charts, bar graphs, heat maps, and interactive tables to provide a comprehensive view of complex financial data.<br><br>One of the key challenges was optimizing performance when rendering large datasets. This was achieved through data aggregation techniques, lazy loading, and efficient DOM manipulation.",
    technologies: [
      "D3.js",
      "JavaScript",
      "CSS Grid",
      "SVG",
      "REST API",
      "Chart.js",
    ],
    features: [
      "Real-time data updates",
      "Interactive filtering and sorting",
      "Customizable dashboard layouts",
      "Export capabilities (PDF, CSV)",
      "Cross-browser compatibility",
    ],
    image: "/api/placeholder/400/250", // Using placeholder as per instructions
    demoLink: "#",
    codeLink: "#",
  },
  "portfolio-site": {
    title: "Interactive Portfolio Site",
    description:
      "A creative portfolio website featuring 3D animations and interactive elements to showcase my work and skills.",
    longDescription:
      "This portfolio site was designed to demonstrate my capabilities in creating immersive web experiences. It features custom 3D backgrounds on each section, smooth transitions between pages, and interactive elements that respond to user input.<br><br>The site is built with performance in mind, ensuring that the 3D elements and animations don't compromise load times or responsiveness across devices. The Three.js elements are optimized through techniques like object pooling and scene management.",
    technologies: [
      "Three.js",
      "GSAP",
      "HTML/CSS",
      "JavaScript",
      "Responsive Design",
      "WebGL",
    ],
    features: [
      "Custom 3D animated backgrounds",
      "Smooth page transitions",
      "Interactive project showcases",
      "Responsive design for all devices",
      "Performance-optimized animations",
    ],
    image: "/api/placeholder/400/250", // Using placeholder as per instructions
    demoLink: "#",
    codeLink: "#",
  },
};

// Cursor effects
// document.addEventListener('DOMContentLoaded', () => {
//   const cursor = document.querySelector('.cursor');
//   const cursorDot = document.querySelector('.cursor-dot');
//   const hoverElements = document.querySelectorAll('[data-hover="true"]');

//   document.addEventListener('mousemove', (e) => {
//     gsap.to(cursor, {
//       x: e.clientX,
//       y: e.clientY,
//       duration: 0.15
//     });
//     gsap.to(cursorDot, {
//       x: e.clientX,
//       y: e.clientY,
//       duration: 0.03
//     });
//   });

//   hoverElements.forEach(element => {
//     element.addEventListener('mouseenter', () => {
//       gsap.to(cursor, {
//         width: 60,
//         height: 60,
//         borderColor: 'var(--blue-dark)',
//         duration: 0.3
//       });
//     });

//     element.addEventListener('mouseleave', () => {
//       gsap.to(cursor, {
//         width: 40,
//         height: 40,
//         borderColor: 'var(--blue-dark)',
//         duration: 0.3
//       });
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const sidebar = document.querySelector(".project-sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");
  const closeSidebarButton = document.querySelector(".close-sidebar");
  const overlay = document.querySelector(".overlay");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-project");
      const projectData = projectsData[projectId];

      if (projectData) {
        sidebarContent.innerHTML = `
        <h2>${projectData.title}</h2>
        <img src="${projectData.image}" alt="${
          projectData.title
        }" class="project-image">
        <p>${projectData.longDescription}</p>
        <div class="sidebar-section">
          <h3>Technologies Used</h3>
          <div class="tech-list">
            ${projectData.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
        <div class="sidebar-section">
        </div>
        <div class="project-links">
          <a href="${
            projectData.demoLink
          }" target="_blank" class="project-link">Live Demo</a>
          <a href="${
            projectData.codeLink
          }" target="_blank" class="project-link">View Code</a>
        </div>
      `;

        sidebar.classList.add("open");
        overlay.classList.add("open");
      }
    });
  });

  closeSidebarButton.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  });
});

function generateProjectCards() {
  const projectsContainer = document.querySelector(".projects-container");
  projectsContainer.innerHTML = "";

  Object.entries(projectsData).forEach(([projectId, projectData]) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.setAttribute("data-hover", "true");
    projectCard.setAttribute("data-project", projectId);

    projectCard.innerHTML = `
      <h3>${projectData.title}</h3>
      <p>${projectData.description}</p>
      <p class="tech-list">
        ${projectData.technologies
          .slice(0, 3)
          .map((tech) => `<span class="tech-tag">${tech}</span>`)
          .join("")}
      </p>
      <p class="learn-more-text"></p>
    `;

    projectCard.addEventListener("click", () => {
      const sidebar = document.querySelector(".project-sidebar");
      const sidebarContent = document.querySelector(".sidebar-content");

      // Generate links dynamically
      const linksHTML = projectData.links
        ? projectData.links
            .map(
              (link) =>
                `<a href="${link.url}" target="_blank" class="project-link">${link.label}</a>`
            )
            .join("")
        : "";

      sidebarContent.innerHTML = `
        <h2>${projectData.title}</h2>
        <div class="project-links">
          ${linksHTML}
        </div>
        <img src="${projectData.image}" alt="${
        projectData.title
      }" class="project-image">
        <p>${projectData.longDescription}</p>
        <div class="sidebar-section">
          <h3>Technologies Used</h3>
          <div class="tech-list">
            ${projectData.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
        <div class="sidebar-section"></div>
      `;

      sidebar.classList.add("open");
      document.querySelector(".overlay").classList.add("open");
    });

    projectsContainer.appendChild(projectCard);
  });
}
