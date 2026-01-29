// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add('active');
    }
  });
});

// ================= NAVIGATION =================

// Back button → Adventures.html
function goBack() {
  window.location.href = 'Adventures.html';
}

// Book Now → Activities.html
function goToActivities() {
  window.location.href = 'activities.html?from=young';
}

// ================= OPTIONAL: Activity Highlight =================
function openActivity(activityId) {
  window.location.href = `activities.html?highlight=${activityId}`;
}
