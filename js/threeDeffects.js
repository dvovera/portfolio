// *** OPTIMIZED 3D BACKGROUND EFFECTS ***

// Update the welcome canvas function to be mouse interactive
function createWelcomeCanvas() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("welcome-canvas").appendChild(renderer.domElement);

  let modelPivot;

  // Load your 3D model
  const loader = new THREE.GLTFLoader();
  loader.load("Triceratops.glb", function (gltf) {
    let model = gltf.scene;
    model.traverse(function (child) {
      if (child.isMesh) {
        child.material.flatShading = true;
        child.material.needsUpdate = true;
        child.material.color.set("white");
      }
    });
    model.scale.set(0.5, 0.5, 0.5);

    // Compute the bounding box of the model and get its center
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Shift the model so that its center of mass is at the origin
    model.position.sub(center);

    // Create a pivot group at the origin and add the model
    modelPivot = new THREE.Group();
    modelPivot.add(model);
    scene.add(modelPivot);
  });

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Create floating particles (same as before)
  const particleCount = 300;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);
  const particleColors = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const radius = 8 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    particleSizes[i] = 0.1 + Math.random() * 0.2;
    const colorIntensity = 0.5 + Math.random() * 0.5;
    particleColors[i * 3] = 0.4 * colorIntensity;
    particleColors[i * 3 + 1] = 0.6 * colorIntensity;
    particleColors[i * 3 + 2] = 1.0 * colorIntensity;
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );
  particleGeometry.setAttribute(
    "size",
    new THREE.BufferAttribute(particleSizes, 1)
  );
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(particleColors, 3)
  );
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  camera.position.z = 15;

  // Auto rotation speeds
  const autoRotateSpeedY = 0.01;
  const autoRotateSpeedX = 0.005;
  // Influence factor for mouse movement
  const mouseInfluenceY = -0.02;
  const mouseInfluenceX = 0.02;

  function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0005;

    // Rotate the particle system as before
    particleSystem.rotation.y = time * 0.2;
    particleSystem.rotation.x = time * 0.1;

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Auto rotation plus mouse influence
    if (modelPivot) {
      modelPivot.rotation.y += autoRotateSpeedY;
      modelPivot.rotation.x += autoRotateSpeedX;

      // Add an offset based on the mouse position
      modelPivot.rotation.y += mouseX * mouseInfluenceY;
      modelPivot.rotation.x += mouseY * mouseInfluenceX;
    }

    // Subtle camera motion for extra effect (optional)
    camera.position.x = Math.sin(time * 0.3) * 2;
    camera.position.y = Math.cos(time * 0.4) * 1;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createAboutCanvas() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("about-canvas").appendChild(renderer.domElement);

  const torusGeometry = new THREE.TorusKnotGeometry(8, 2.7, 100, 16);
  const torusMaterial = new THREE.MeshBasicMaterial({
    color: 0x99caff,
    wireframe: true,
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  scene.add(torus);

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Animate torus with mouse influence
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.007;

    // Add mouse-based rotation
    torus.rotation.x += mouseX * 0.01;
    torus.rotation.y += -mouseY * 0.01;

    // Slightly move the torus based on mouse position
    torus.position.x = mouseX * 2;
    torus.position.y = mouseY * 2;

    // Camera follows mouse slightly
    camera.position.x = mouseX * 2;
    camera.position.y = mouseY * 2;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createProjectsCanvas() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("projects-canvas").appendChild(renderer.domElement);

  // Create wave mesh
  const waveGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
  const waveMaterial = new THREE.MeshBasicMaterial({
    color: 0x66a3ff,
    wireframe: true,
    transparent: true,
    opacity: 0.8,
  });
  const wave = new THREE.Mesh(waveGeometry, waveMaterial);
  scene.add(wave);

  // Store original positions for wave animation
  const positions = waveGeometry.attributes.position.array;
  const originalPositions = [...positions];

  camera.position.z = 10;
  camera.position.y = -2;
  wave.rotation.x = -Math.PI / 4;

  // Mouse interaction strength factor
  let interactionStrength = 5;
  let lastMouseX = 0;
  let lastMouseY = 0;

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Calculate mouse velocity for wave intensity
    const mouseDeltaX = mouseX - lastMouseX;
    const mouseDeltaY = mouseY - lastMouseY;
    const mouseVelocity = Math.sqrt(
      mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY
    );

    // Update interaction strength based on mouse velocity
    interactionStrength = Math.min(1, interactionStrength + mouseVelocity * 2);
    interactionStrength *= 0.95; // Decay factor

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    // Animate wave
    const time = Date.now() * 0.001;
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];

      // Distance from mouse position (projected onto plane)
      const dx = x / 10 - mouseX * 5;
      const dy = y / 10 - mouseY * 5;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Create wave effect influenced by mouse
      let waveHeight = Math.sin(x / 2 + time) * Math.cos(y / 2 + time) * 0.5;

      // Add mouse-driven ripple effect
      if (distance < 5) {
        // Create ripple from mouse movement
        waveHeight +=
          (1 - distance / 5) *
          interactionStrength *
          Math.sin(distance * 2 - time * 5) *
          0.5;
      }

      positions[i + 2] = waveHeight;
    }
    waveGeometry.attributes.position.needsUpdate = true;

    // Rotate wave slightly based on mouse
    wave.rotation.x = -Math.PI / 4 + mouseY * 0.2;
    wave.rotation.z = mouseX * 0.2;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// // Add a ripple effect that follows clicks
// function addClickRippleEffect() {
//   // Create a container for our ripples
//   const rippleContainer = document.createElement('div');
//   rippleContainer.style.position = 'fixed';
//   rippleContainer.style.top = '0';
//   rippleContainer.style.left = '0';
//   rippleContainer.style.width = '100%';
//   rippleContainer.style.height = '100%';
//   rippleContainer.style.pointerEvents = 'none';
//   rippleContainer.style.zIndex = '1';
//   document.body.appendChild(rippleContainer);

//   document.addEventListener('click', (event) => {
//     const ripple = document.createElement('div');
//     ripple.style.position = 'absolute';
//     ripple.style.borderRadius = '50%';
//     ripple.style.backgroundColor = 'rgba(102, 163, 255, 0.3)';
//     ripple.style.width = '10px';
//     ripple.style.height = '10px';
//     ripple.style.transform = 'translate(-50%, -50%)';
//     ripple.style.left = `${event.clientX}px`;
//     ripple.style.top = `${event.clientY}px`;

//     rippleContainer.appendChild(ripple);

//     // Animate ripple
//     gsap.to(ripple, {
//       width: '300px',
//       height: '300px',
//       opacity: 0,
//       duration: 1.5,
//       ease: 'power2.out',
//       onComplete: () => {
//         rippleContainer.removeChild(ripple);
//       }
//     });

//     // Add an additional burst effect
//     for (let i = 0; i < 8; i++) {
//       const particle = document.createElement('div');
//       particle.style.position = 'absolute';
//       particle.style.width = '8px';
//       particle.style.height = '8px';
//       particle.style.backgroundColor = 'rgba(102, 163, 255, 0.6)';
//       particle.style.borderRadius = '50%';
//       particle.style.transform = 'translate(-50%, -50%)';
//       particle.style.left = `${event.clientX}px`;
//       particle.style.top = `${event.clientY}px`;

//       rippleContainer.appendChild(particle);

//       // Random angle
//       const angle = (i / 8) * Math.PI * 2;

//       gsap.to(particle, {
//         x: Math.cos(angle) * 100,
//         y: Math.sin(angle) * 100,
//         opacity: 0,
//         duration: 1,
//         ease: 'power2.out',
//         onComplete: () => {
//           rippleContainer.removeChild(particle);
//         }
//       });
//     }

//     // Send a pulse through the 3D scenes
//     interactionStrength = 1;
//   });
// }

function initTypeAnimation() {
  //   const welcomeHeading = document.querySelector('#welcome h1');
  //   const originalText = welcomeHeading.textContent;
  //   // Create a container with fixed height to prevent layout shifts
  //   // welcomeHeading.innerHTML = 'im daniel tran<br><span id="typing-container"><span id="typing-text"></span></span>';
  //   const typingElement = document.getElementById('typing-text');
  //   const typingContainer = document.getElementById('typing-container');
  //   // List of phrases to cycle through
  //   const phrases = [
  //     "Daniel Tran",
  //     "@danieltrqn",
  //     "/dvovera",
  //     "Đăng",
  //   ];
  //   // Find the longest phrase to set the container width
  //   let maxLength = 0;
  //   phrases.forEach(phrase => {
  //     if (phrase.length > maxLength) maxLength = phrase.length;
  //   });
  //   // Pre-calculate the space needed for the longest phrase
  //   const tempSpan = document.createElement('span');
  //   tempSpan.textContent = phrases.reduce((a, b) => a.length > b.length ? a : b);
  //   tempSpan.style.visibility = 'hidden';
  //   tempSpan.style.position = 'absolute';
  //   tempSpan.style.fontSize = getComputedStyle(typingElement).fontSize;
  //   tempSpan.style.fontFamily = getComputedStyle(typingElement).fontFamily;
  //   document.body.appendChild(tempSpan);
  //   const maxWidth = tempSpan.offsetWidth;
  //   document.body.removeChild(tempSpan);
  //   // Set minimum width for the container based on the longest phrase
  //   typingContainer.style.display = 'inline-block';
  //   typingContainer.style.minWidth = `${maxWidth}px`;
  //   typingContainer.style.minHeight = '1.5em';
  //   typingContainer.style.textAlign = 'left';
  //   let phraseIndex = 0;
  //   let charIndex = 0;
  //   let isDeleting = false;
  //       charIndex++;
  //       typingSpeed = 100; // Normal speed when typing
  //     }
  //     // If finished typing the phrase
  //     if (!isDeleting && charIndex === currentPhrase.length) {
  //       // Pause at the end of the phrase before deleting
  //       isDeleting = true;
  //       typingSpeed = 1500; // Wait time before starting to delete
  //     }
  //     // If finished deleting the phrase
  //     if (isDeleting && charIndex === 0) {
  //       isDeleting = false;
  //       // Move to next phrase
  //       phraseIndex = (phraseIndex + 1) % phrases.length;
  //       // Pause before typing the next phrase
  //       typingSpeed = 500;
  //     }
  //     // Continue the animation loop
  //     setTimeout(typeText, typingSpeed);
  //   }
  //   // Apply some styling to the typing element
  //   typingElement.style.display = 'inline-block';
  //   typingElement.style.color = 'var(--blue-text)';
  //   // Start the typing animation
  //   setTimeout(typeText, 1000);
}
let typingSpeed = 100;

//   function typeText() {
//     const currentPhrase = phrases[phraseIndex];

//     if (isDeleting) {
//       // Deleting text
//       typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
//       charIndex--;
//       typingSpeed = 50; // Faster when deleting
//     } else {
//       // Typing text
//       typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
//
