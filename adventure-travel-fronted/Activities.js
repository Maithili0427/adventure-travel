/* ===== NAVBAR PAGE NAVIGATION ===== */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const text = link.textContent.trim().toUpperCase();

            switch (text) {
                case "HOME":
                    window.location.href = "index.html";
                    break;

                case "ABOUT US":
                    window.location.href = "about.html";
                    break;

                case "ACTIVITIES":
                    window.location.href = "activities.html";
                    break;

                case "ADVENTURES FOR":
                    window.location.href = "adventures.html";
                    break;

                case "TESTIMONIALS":
                    window.location.href = "testimonials.html";
                    break;

                case "CONTACT":
                    window.location.href = "contact.html";
                    break;
            }
        });
    });



    // HERO BUTTON SCROLL
    const exploreBtn = document.getElementById("exploreBtn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            document.getElementById("activities").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

});
// ===== BOOK NOW BUTTON FUNCTION (ADD THIS) =====
function openBooking(activityName) {
    window.location.href = "booking.html?activity=" + encodeURIComponent(activityName);
}
