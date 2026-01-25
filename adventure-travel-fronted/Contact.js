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
});
// ===== GOOGLE MAP =====
function initMap() {
    const vengurla = { lat: 15.8606, lng: 73.6404 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: vengurla,
        styles: [ // subtle professional map style
            { elementType: 'geometry', stylers: [{color: '#f5f5f5'}] },
            { elementType: 'labels.text.fill', stylers: [{color: '#616161'}] },
            { elementType: 'labels.text.stroke', stylers: [{color: '#f5f5f5'}] },
            { featureType: 'administrative.land_parcel', stylers: [{visibility: 'off'}] },
            { featureType: 'poi', stylers: [{visibility: 'off'}] },
            { featureType: 'road', stylers: [{color: '#ffffff'}] },
            { featureType: 'water', stylers: [{color: '#c9e4f6'}] }
        ]
    });

    const marker = new google.maps.Marker({
        position: vengurla,
        map: map,
        title: "Adventure Vengurla",
        icon: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    });
}

// ===== FORM SUBMISSION =====
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name && email && message){
        formMessage.style.color = "green";
        formMessage.textContent = "Thank you! Your message has been sent.";
        form.reset();
    } else {
        formMessage.style.color = "red";
        formMessage.textContent = "Please fill all fields.";
    }
});