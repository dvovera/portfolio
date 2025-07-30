// Project data
const projectsData = {
  syntaxis: {
    title: "Syntaxis",
    description:
      "A text-based AI-powered language learning game where you explore lost civilizations and artifacts.",
    longDescription:
      "A language-learning game set in procedurally generated civilizations. Each playthrough invents a unique culture with its own beliefs about language, sacred or taboo words, and mysterious linguistic rituals. Players explore real-world languages (like French or Dutch) through the eyes of fictional societies, exploring AI-generated artifacts and conversations unveailing the mysteries of the civilization.",
    technologies: ["react", "mistral ai"],
    features: [],
    image: "public/syntaxis.gif",
    links: [{ label: "Try it", url: "https://syntaxis.vercel.app/" }],
  },
  "the-orable": {
    title: "The Orable",
    description: "Let an AI oracle read your future using Tarot cards!",
    longDescription:
      "An AI-powered tarot reading experience that combines Mistral AI with traditional Tarot card interpretations to provide personalized insights and guidance for life's hardest questions.",
    technologies: ["html", "js", "css", "mistral ai"],
    features: [],
    image: "public/the_orable.gif",
    links: [
      { label: "Try it", url: "https://dvovera.github.io/The-Orable/" },
      { label: "Github", url: "https://github.com/dvovera/The-Orable" },
    ],
  },
  "wordbomb-exploit": {
    title: "Word Bomb Exploit",
    description:
      "Automate your Word Bomb gameplay with real-time OCR and auto-typing",
    longDescription:
      "A Python macro for the game BombParty/Word Bomb that uses OCR (Optical Character Recognition) to read the screen for target letters and auto-types a valid word to help you win. In the gif above they banned me from their lobby, due to the 777wpm (which can be changed).",
    technologies: ["python", "tesseract-ocr", "tkinter"],
    features: [],
    image: "public/wordbomb.gif",
    links: [
      { label: "Github", url: "https://github.com/dvovera/wordbomb-macro" },
    ],
  },

  "school-app": {
    title: "School News App",
    description:
      "An app for my school's student groups to share news and events.",
    longDescription:
      "A React Native app for school clubs to post announcements and events. It uses Firebase for real-time updates, with a feed interface for students to stay informed and engaged.",

    technologies: ["react native", "firebase"],
    features: [],
    image: "public/schoolapp.gif", // Using placeholder as per instructions
  },
  "music-portfolio": {
    title: "Music Portfolio",
    description: "Check out my compositions!",
    longDescription: "",
    technologies: ["musescore", "the piano"],
    features: [],
    image: "/api/placeholder/400/250", // Using placeholder as per instructions
    demoLink: "https://dvovera.github.io/music/",
    codeLink: "#",
    externalLink: "https://dvovera.github.io/music/",
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

    // Determine how many technologies to show based on their length
    const techs = projectData.technologies;
    let techsToShow = 2; // Default to 2

    // If we have 3 or more technologies, check if they'll fit
    if (techs.length >= 3) {
      const totalLength = techs[0].length + techs[1].length + techs[2].length;
      // If total length is reasonable (less than ~20 characters), show 3
      // This accounts for spaces and ensures no wrapping
      if (totalLength <= 20) {
        techsToShow = 3;
      }
    }

    projectCard.innerHTML = `
      <h3>${projectData.title}</h3>
      <p>${projectData.description}</p>
      <p class="tech-list">
        ${techs
          .slice(0, techsToShow)
          .map((tech) => `<span class="tech-tag">${tech}</span>`)
          .join("")}
      </p>
      <p class="learn-more-text"></p>
    `;

    projectCard.addEventListener("click", () => {
      // Check if this project has an external link (like music portfolio)
      if (projectData.externalLink) {
        window.open(projectData.externalLink, "_blank");
        return;
      }

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
