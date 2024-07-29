document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("Right-click is disabled on this page.");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Form validation
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;

    if (name === "" || email === "" || message === "") {
        alert("All fields are required!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Form submitted successfully!");
    this.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Toggle mobile menu
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.querySelector(".ul").classList.toggle("show");
    document.querySelector("header").classList.toggle("nav-open");
});

// Close mobile menu when clicking on menu items or outside the menu
document
    .querySelector(".ul")
    .querySelectorAll("li")
    .forEach((li) => {
        li.addEventListener("click", () => {
            document.querySelector(".ul").classList.remove("show");
            document.querySelector("header").classList.remove("nav-open");
        });
    });

document.body.addEventListener("click", (event) => {
    if (
        !document.querySelector(".ul").contains(event.target) &&
        !document.querySelector(".menu-btn").contains(event.target)
    ) {
        document.querySelector(".ul").classList.remove("show");
        document.querySelector("header").classList.remove("nav-open");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var loadingBarContainer = document.getElementById("loading-bar-container");
    var loadingBar = document.getElementById("loading-bar");

    function showLoadingBar() {
        loadingBarContainer.style.display = "block";
        loadingBar.style.width = "0";

        setTimeout(function () {
            loadingBar.style.width = "100%";
        }, 50);
    }

    function hideLoadingBar() {
        setTimeout(function () {
            loadingBar.style.width = "100%";
            setTimeout(function () {
                loadingBarContainer.style.display = "none";
                loadingBar.style.width = "0";
            }, 500);
        }, 1000); // Delay to simulate loading
    }

    // Show loading bar on page load
    showLoadingBar();

    // Simulate content loading
    window.addEventListener("load", function () {
        hideLoadingBar();
    });

    // Show loading bar on navigation link clicks
    var navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            showLoadingBar();
            setTimeout(function () {
                hideLoadingBar();
            }, 1000); // Adjust this duration based on expected load time
        });
    });

    // Handle form submissions with AJAX
    var contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent default form submission
            showLoadingBar();

            var formData = new FormData(contactForm);

            // Example AJAX submission using Fetch API
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    hideLoadingBar();
                    // Optionally show a success message or handle the response
                })
                .catch((error) => {
                    console.error("Error:", error);
                    hideLoadingBar();
                    // Optionally show an error message
                });
        });
    }
});
