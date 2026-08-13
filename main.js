import { gsap } from 'gsap';

// Reusable Fish Collection Data Object
const fishData = [
  {
    id: 1,
    name: "Rainbow Trout",
    scientificName: "Oncorhynchus mykiss",
    category: "Freshwater",
    description: "Sourced from alpine, glacier-fed streams. Known for its shimmering iridescent scales, vibrant color markings, and aggressive fighting nature when hooked. Rainbow Trout require cool, clear, and fast-flowing streams with plenty of rocky shelter to thrive. Their dynamic scales act as beautiful natural camouflage reflecting the surface light filters.",
    habitat: "Glacial Rivers & Streams",
    size: "Up to 120 cm",
    diet: "Insects, Small Crustaceans",
    image: "/src/assets/trout_freshwater_fish_1786032572932.jpg"
  },
  {
    id: 2,
    name: "Bluefin Tuna",
    scientificName: "Thunnus thynnus",
    category: "Saltwater & Ocean",
    description: "A migratory ocean giant engineered as a perfect hydrodynamic torpedo. Reaches extreme speeds in open ocean zones. Bluefin Tuna possess metallic blue/silver coloration to blend into deep ocean environments. Their complex internal circulatory heat exchange system makes them highly resilient to extreme shifts in water temperature during deep dives.",
    habitat: "Pelagic Open Waters",
    size: "Up to 300 cm",
    diet: "Squid, Herring, Mackerel",
    image: "/src/assets/tuna_saltwater_fish_1786032587469.jpg"
  },
  {
    id: 3,
    name: "Clown Anemonefish",
    scientificName: "Amphiprion ocellaris",
    category: "Exotic Reefs",
    description: "Vibrant tropical reef species famous for its high-contrast orange stripes and absolute immunity to toxic sea anemone stings. They establish close-knit social groups centered around sea anemones, defending their nesting areas with high vigilance. A magnificent specimen for premium home salt aquariums.",
    habitat: "Warm Indo-Pacific Reefs",
    size: "Up to 11 cm",
    diet: "Zooplankton, Algal Crusts",
    image: "/src/assets/exotic_aquarium_fish_1786032602407.jpg"
  }
];

// Audio Sound Handler
let audioPlaying = false;
const audioEl = document.getElementById('bg-audio');
const soundBtn = document.getElementById('soundToggle');

if (soundBtn && audioEl) {
  soundBtn.addEventListener('click', () => {
    if (audioPlaying) {
      audioEl.pause();
      soundBtn.innerHTML = '<span>SOUND OFF</span>';
    } else {
      audioEl.play().catch(e => console.log('Audio deferred until gesture', e));
      soundBtn.innerHTML = '<span>SOUND ON</span>';
    }
    audioPlaying = !audioPlaying;
  });
}

// Render dynamic elements to cards
function renderGallery() {
  const container = document.getElementById('fishGalleryGrid');
  if (!container) return;
  container.innerHTML = '';
  
  fishData.forEach(fish => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.setAttribute('data-id', fish.id);
    card.innerHTML = `
      <div class="card-image-box">
        <img src="${fish.image}" alt="${fish.name}">
      </div>
      <div class="card-details">
        <h4>${fish.category.toUpperCase()}</h4>
        <h3>${fish.name}</h3>
        <p>${fish.description.substring(0, 155)}...</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(fish));
    container.appendChild(card);
  });
}

// Modal handling
const modal = document.getElementById('speciesModal');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const inquireBtn = document.getElementById('inquireBtn');

function openModal(fish) {
  if (!modal) return;
  document.getElementById('modalImg').src = fish.image;
  document.getElementById('modalCat').innerText = fish.category.toUpperCase();
  document.getElementById('modalName').innerText = fish.name;
  document.getElementById('modalScientific').innerText = fish.scientificName;
  document.getElementById('modalDesc').innerText = fish.description;
  document.getElementById('modalHabitat').innerText = fish.habitat;
  document.getElementById('modalSize').innerText = fish.size;
  document.getElementById('modalDiet').innerText = fish.diet;
  
  modal.classList.add('active-modal');
}

function closeModal() {
  if (modal) modal.classList.remove('active-modal');
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
if (inquireBtn) inquireBtn.addEventListener('click', closeModal);

// Simple scroll triggers for navigation blur and hud progress tracking
const hudProgress = document.getElementById('hudProgressFill');
const hudStep = document.getElementById('hudStep');
const sections = document.querySelectorAll('header, section');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  
  if (hudProgress) hudProgress.style.height = `${progress * 100}%`;

  // Dynamic Step HUD updates based on current section index in view
  let currentSectionIndex = 0;
  sections.forEach((sec, idx) => {
    const top = sec.offsetTop;
    if (scrollTop >= top - window.innerHeight / 2) {
      currentSectionIndex = idx;
    }
  });

  const stepText = `${String(currentSectionIndex + 1).padStart(2, '0')} / 20`;
  if (hudStep) hudStep.innerText = stepText;

  // Add glass effect styling to nav bar on scroll down
  const nav = document.querySelector('.glass-nav');
  if (nav) {
    if (scrollTop > 80) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
});

// Setup on load
window.addEventListener('DOMContentLoaded', () => {
  renderGallery();
});
