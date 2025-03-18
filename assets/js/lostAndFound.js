document.addEventListener("DOMContentLoaded", function () {
    const addObjectBtn = document.querySelector(".add-object-btn");
    const formContainer = document.querySelector(".form-container");
    const postButton = document.getElementById("postObject");
    const objectNameInput = document.getElementById("objectName");
    const objectDescriptionInput = document.getElementById("objectDescription");
    const lostFoundSection = document.getElementById("lostFoundSection");

    // Toggle form visibility
    addObjectBtn.addEventListener("click", function () {
        if (formContainer.style.display === "none" || formContainer.style.display === "") {
            formContainer.style.display = "block";

            // Scroll while keeping the button in view
            const buttonPosition = addObjectBtn.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: buttonPosition - 20, behavior: "smooth" });

            addObjectBtn.textContent = "Close the Tab";
        } else {
            formContainer.style.display = "none";
            addObjectBtn.textContent = "Add an Object";
        }
    });

    // Handle form submission
    postButton.addEventListener("click", function () {
        const objectName = objectNameInput.value.trim();
        const objectDescription = objectDescriptionInput.value.trim();

        if (objectName === "" || objectDescription === "") {
            alert("Please fill in all fields before posting.");
            return;
        }

        // Create new lost object entry
        const objectCard = document.createElement("div");
        objectCard.classList.add("p-3", "mb-3", "bg-white", "rounded", "shadow-sm");

        objectCard.innerHTML = `
            <h5 class="text-primary">${objectName}</h5>
            <p>${objectDescription}</p>
            <button class="btn btn-sm btn-danger remove-object">Remove</button>
        `;

        // Add new object to the Lost & Found section
        lostFoundSection.appendChild(objectCard);

        // Clear form inputs
        objectNameInput.value = "";
        objectDescriptionInput.value = "";

        // Hide form after submission
        formContainer.style.display = "none";
        addObjectBtn.textContent = "Add an Object";
    });

    // Remove an object from Lost & Found
    lostFoundSection.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-object")) {
            event.target.parentElement.remove();
        }
    });
});