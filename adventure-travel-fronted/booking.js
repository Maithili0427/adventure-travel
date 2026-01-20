document.addEventListener("DOMContentLoaded", () => {

    // Auto-fill activity from URL
    const params = new URLSearchParams(window.location.search);
    const activityField = document.getElementById("activity");
    if (activityField && params.get("activity")) {
        activityField.value = params.get("activity");
    }

    const bookingForm = document.getElementById("bookingForm");
    const bookingWrapper = document.getElementById("bookingWrapper");

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault(); // stop normal submit

        const formData = new FormData(bookingForm);

        fetch(bookingForm.action, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                bookingWrapper.classList.add("success-mode");
            } else {
                alert("Booking failed. Try again.");
            }
        })
        .catch(() => {
            alert("Server error. Please try later.");
        });
    });

});
