document.addEventListener('DOMContentLoaded', () => {
  /* HERO BUTTON */
  window.exploreNow = function () {
    window.location.href = 'Adventures.html';
  };

  /* KNOW MORE → about.html */
  const knowMoreBtn = document.querySelector('.know-more');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', () => {
      window.location.href = 'about.html';
    });
  }

  /* VIEW ACTIVITIES → Activities.html */
  const viewActivitiesBtn = document.querySelector('.view-activities');
  if (viewActivitiesBtn) {
    viewActivitiesBtn.addEventListener('click', () => {
      window.location.href = 'Activities.html';
    });
  }
});

/* ===== HERO SLIDER + 3D PARALLAX ===== */

const slides = document.querySelectorAll('.slide');
let heroIndex = 0;

/* Image auto slide (fast & smooth) */
setInterval(() => {
  slides[heroIndex].classList.remove('active');
  heroIndex = (heroIndex + 1) % slides.length;
  slides[heroIndex].classList.add('active');
}, 2500);

/* 3D mouse parallax on slides */
const heroSection = document.querySelector('.hero');

if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;

    slides.forEach((slide) => {
      slide.style.backgroundPosition = `${50 - x}% ${50 - y}%`;
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    slides.forEach((slide) => {
      slide.style.backgroundPosition = 'center';
    });
  });
}

/* ===== ONE-TIME SPIN EFFECT FOR RIGHT CONTENT ===== */
const features = document.querySelectorAll('.feature');

features.forEach((feature, index) => {
  setTimeout(() => {
    feature.querySelectorAll('h3, p').forEach((el) => {
      el.style.transform = 'rotateY(0deg) translateZ(0)';
      el.style.opacity = '1';
    });
  }, index * 200);
});

let index = 0;
const track = document.querySelector('.testimonial-track');
const dots = document.querySelectorAll('.dot');

function updateSlider() {
  track.style.transform = `translateX(${-index * 320}px)`;
  dots.forEach((d) => d.classList.remove('active'));
  dots[index]?.classList.add('active');
}

function nextSlide() {
  if (index < dots.length - 1) {
    index++;
    updateSlider();
  }
}

function prevSlide() {
  if (index > 0) {
    index--;
    updateSlider();
  }
}

// ✅ Testimonials Data
const testimonials = [
  {
    quote:
      'Family, Konkan, Konkan Paryatan - magic mix! We laughed, explored, tasted the Konkan. Three generations, one unforgettable reunion.',
    author: 'Bhoshle Family, Vengurla',
  },
  {
    quote:
      'Adventure, nature, and culture in perfect harmony! Konkan Paryatan made our family trip truly special.',
    author: 'Deshpande Family, khavne',
  },
  {
    quote:
      'From beaches to forts, every moment was a memory. Thank you for an amazing Konkan experience!',
    author: 'Patil Family, Shiroda',
  },
  {
    quote:
      'The food, the scenery, and the laughter — Konkan Paryatan has it all! Highly recommend.',
    author: 'Shinde Family, Bhogve',
  },
  {
    quote:
      'Our kids couldn’t stop smiling! Every stop was fun and educational. A perfect getaway for all ages.',
    author: 'Kulkarni Family, Dapoli',
  },
];

let currentIndex = 0;
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');

// Function to slide testimonial right or left
function showTestimonial(index, direction = 'next') {
  // Prepare the slide-out animation
  quoteEl.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  authorEl.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

  quoteEl.style.transform =
    direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
  quoteEl.style.opacity = 0;
  authorEl.style.transform =
    direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
  authorEl.style.opacity = 0;

  setTimeout(() => {
    // Update text content
    quoteEl.textContent = testimonials[index].quote;
    authorEl.textContent = testimonials[index].author;

    // Slide in from opposite side
    quoteEl.style.transform =
      direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    authorEl.style.transform =
      direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';

    setTimeout(() => {
      quoteEl.style.transform = 'translateX(0)';
      authorEl.style.transform = 'translateX(0)';
      quoteEl.style.opacity = 1;
      authorEl.style.opacity = 1;
    }, 50);
  }, 500); // match slide-out duration
}

// Arrow navigation
function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex, 'next');
}

function prevTestimonial() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex, 'prev');
}

// Auto-slide every 3 seconds
setInterval(() => {
  nextTestimonial();
}, 3000);

// Initial display
quoteEl.textContent = testimonials[currentIndex].quote;
authorEl.textContent = testimonials[currentIndex].author;
quoteEl.style.opacity = 1;
authorEl.style.opacity = 1;

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
// Animate team section on scroll
const teamText = document.querySelector('.team-text');
const teamImage = document.querySelector('.team-image');

function revealTeamSection() {
  const triggerPoint = window.innerHeight * 0.8;
  const sectionTop = teamText.parentElement.getBoundingClientRect().top;

  if (sectionTop < triggerPoint) {
    teamText.classList.add('visible');
    teamImage.classList.add('visible');
    window.removeEventListener('scroll', revealTeamSection);
  }
}

window.addEventListener('scroll', revealTeamSection);
revealTeamSection(); // in case section is already visible on load
