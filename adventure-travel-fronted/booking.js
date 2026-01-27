document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const activityField = document.getElementById("activity");
    if (activityField && params.get("activity")) {
        activityField.value = params.get("activity");
    }

    /* ===== DROPDOWN (LOCATION) SECTION ADDED ===== */
    const locationField = document.getElementById("location");
    if (locationField && params.get("location")) {
        locationField.value = params.get("location");
    }
    /* ============================================ */

    const bookingForm = document.getElementById("bookingForm");
    const bookingWrapper = document.getElementById("bookingWrapper");

    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(bookingForm);

        fetch(bookingForm.action, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                window.bookingData = { booking_id: data.booking_id };
                bookingWrapper.classList.add("success-mode");
            } else {
                alert(data.message || "Booking failed. Try again.");
            }
        })
        .catch(() => alert("Server error. Please try again."));
    });

});

/* ===== Download receipt ===== */
function downloadReceipt() {
    if (!window.bookingData || !window.bookingData.booking_id) {
        alert("Receipt not ready yet.");
        return;
    }

    window.location.href =
        `../adventure-travel-backend/generate_receipt.php?booking_id=${window.bookingData.booking_id}`;
}
