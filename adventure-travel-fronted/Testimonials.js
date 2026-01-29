/* ===== NAVBAR PAGE NAVIGATION ===== */
document.addEventListener('DOMContentLoaded', () => {
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
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.card');
  const dots = document.querySelectorAll('.dot');
  let index = 0;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // Active dot only, no effect on card
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function nextSlide() {
    index = (index + 1) % cards.length;
    updateSlider();
  }

  function prevSlide() {
    index = (index - 1 + cards.length) % cards.length;
    updateSlider();
  }

  // Arrow click
  document.querySelector('.arrow.left').addEventListener('click', prevSlide);
  document.querySelector('.arrow.right').addEventListener('click', nextSlide);

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });
  });

  // Initialize
  updateSlider();
});
