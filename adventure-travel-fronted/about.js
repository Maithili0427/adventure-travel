document.addEventListener('DOMContentLoaded', () => {
  /* ================= NAVBAR PAGE NAVIGATION ================= */
  const navLinks = document.querySelectorAll('nav ul li');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const text = link.textContent.trim().toUpperCase();

      switch (text) {
        case 'HOME':
          window.location.href = 'index.html';
          break;

        case 'ABOUT US':
          window.location.href = 'about.html';
          break;

        case 'ACTIVITIES':
          window.location.href = 'activities.html';
          break;

        case 'ADVENTURES FOR':
          window.location.href = 'adventures.html';
          break;

        case 'TESTIMONIALS':
          window.location.href = 'testimonials.html';
          break;

        case 'CONTACT':
          window.location.href = 'contact.html';
          break;
      }
    });
  });
});
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');

  // restart text animation
  const h1 = slides[currentSlide].querySelector('h1');
  const p = slides[currentSlide].querySelector('p');
  h1.style.animation = 'none';
  p.style.animation = 'none';
  void h1.offsetWidth; // trigger reflow
  void p.offsetWidth;
  h1.style.animation = 'headingSlide 2s ease forwards';
  p.style.animation = 'paraFade 2s ease forwards 0.5s';
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);

// address
function openMap() {
  window.open(
    'https://www.google.com/maps/search/Khavane+Kayaking+Vengurla',
    '_blank',
  );
}
