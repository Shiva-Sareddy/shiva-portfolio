document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbzFUuUzQ6LOeh-QWZ3BLs_13UCVVvLai2o1hp298QsGCT-OEWH4bt4B0OGRK8YgyexC/exec"; // 🔁 Replace with your deployed Apps Script URL

    fetch(scriptURL, {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                alert(
                    "Your message was sent successfully! I Will Contact You Soon!"
                );
                form.reset();
            } else {
                throw new Error("Network error");
            }
        })
        .catch((error) => {
            console.error("Error!", error.message);
            alert("There was a problem submitting your form. Try again later.");
        });
});
