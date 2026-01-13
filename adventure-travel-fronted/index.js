document.addEventListener("DOMContentLoaded", () => {

    /* HERO BUTTON */
    window.exploreNow = function () {
        alert("Explore Adventures with Eduventures Vengurla!");
    };

    /* EXPERIENCE SECTION BUTTON */
    const btn = document.querySelector(".btn");
    if (btn) {
        btn.addEventListener("click", () => {
            alert("More Eduventures Experiences Coming Soon!");
        });
    }

    /* HERO SECTION – 3D BACKGROUND PARALLAX */
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            hero.style.backgroundPosition = `${50 - x}% ${50 - y}%`;
        });

        hero.addEventListener("mouseleave", () => {
            hero.style.backgroundPosition = "center";
        });
    }

    /* ===== ONE-TIME SPIN EFFECT FOR RIGHT CONTENT ===== */
    const features = document.querySelectorAll(".feature");

    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.querySelectorAll("h3, p").forEach(el => {
                el.style.transform = "rotateY(0deg) translateZ(0)";
                el.style.opacity = "1";
            });
        }, index * 200);
    });

});
let index = 0;
const track = document.querySelector(".testimonial-track");
const dots = document.querySelectorAll(".dot");

function updateSlider() {
    track.style.transform = `translateX(${-index * 320}px)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[index]?.classList.add("active");
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
