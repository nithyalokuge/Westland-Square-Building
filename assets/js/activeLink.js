// Active link script

document.addEventListener("DOMContentLoaded", function () {
    let currentLocation = window.location.pathname.split("/").pop(); // Get the current file name
    let navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    let footerLinks = document.querySelectorAll(".footer-link");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("fw-bold");
        }
    });
    footerLinks.forEach(link => {
        if (link.getAttribute("href") === currentLocation) {
            link.classList.add("fw-bold");
        }
    });
});
