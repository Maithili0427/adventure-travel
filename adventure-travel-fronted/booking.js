document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const activityField = document.getElementById("activity");
    if (activityField && params.get("activity")) {
        activityField.value = params.get("activity");
    }

    /* ===== DROPDOWN (LOCATION) SECTION ADDED ===== */
    const locationField = document.getElementById("locationSelect");
    if (locationField && params.get("location")) {
        locationField.value = params.get("location");
    }
    /* ============================================ */

    /* ===== Disable Past Date Selection ===== */
    const dateField = document.querySelector('input[type="date"]');
    if (dateField) {
        const today = new Date().toISOString().split("T")[0];
        dateField.setAttribute("min", today);
    }
    /* ===================================== */

    const bookingForm = document.getElementById("bookingForm");
    const bookingWrapper = document.getElementById("bookingWrapper");
    const submitBtn = bookingForm.querySelector('button[type="submit"]');

    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        /* Button loading state */
        submitBtn.innerText = "Submitting...";
        submitBtn.disabled = true;

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
                submitBtn.innerText = "Submit Booking";
                submitBtn.disabled = false;
            }
        })
        .catch(() => {
            alert("Server error. Please try again.");
            submitBtn.innerText = "Submit Booking";
            submitBtn.disabled = false;
        });
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
