const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots');

let current = 0;
const slides = carousel.children;
const total = slides.length;

for (let i = 0; i < total; i++) {
  const dot = document.createElement('button');
  dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-brand-green w-6' : 'bg-gray-300'}`;
  dot.dataset.index = i;
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}

function goTo(index) {
  current = index;
  carousel.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('#dots button').forEach((dot, i) => {
    dot.className = i === current
      ? 'w-6 h-2.5 rounded-full transition-all duration-300 bg-brand-green'
      : 'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-gray-300';
  });
}

prevBtn.addEventListener('click', () => {
  goTo(current === 0 ? total - 1 : current - 1);
});

nextBtn.addEventListener('click', () => {
  goTo(current === total - 1 ? 0 : current + 1);
});

let autoplay = setInterval(() => {
  goTo(current === total - 1 ? 0 : current + 1);
}, 4000);

const container = document.getElementById('carousel-container');
container.addEventListener('mouseenter', () => clearInterval(autoplay));
container.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => {
    goTo(current === total - 1 ? 0 : current + 1);
  }, 4000);
});

// Touch swipe support for carousel
let touchStartX = 0;
let touchEndX = 0;

container.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(autoplay);
}, { passive: true });

container.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      goTo(current === total - 1 ? 0 : current + 1);
    } else {
      goTo(current === 0 ? total - 1 : current - 1);
    }
  }
  autoplay = setInterval(() => {
    goTo(current === total - 1 ? 0 : current + 1);
  }, 4000);
}, { passive: true });

// Navbar scroll effect
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle with smooth animation
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});
