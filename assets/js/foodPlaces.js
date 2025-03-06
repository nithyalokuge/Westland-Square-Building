// Script for fetching data from foodPlaces.json, display it and make the Prev and Next navigation links work

fetch('../assets/js/foodPlaces.json')
    .then(response => response.json())
    .then(data => {
        let foodPlaces = data;
        let filteredFoodPlaces = foodPlaces;
        let currentPage = 0;

        // Function to display food places dynamically
        function displayFoodPlaces(places) {
            const foodPlacesList = document.getElementById('food-places-list');
            foodPlacesList.innerHTML = ''; 

            places.forEach(place => {
                const foodPlaceDiv = document.createElement('div');
                foodPlaceDiv.classList.add('col');
                foodPlaceDiv.innerHTML = `
                    <div class="card">
                        <img src="${place.image}" class="card-img-top" alt="${place.name} +'s + picture">
                        <div class="card-body">
                            <h5>${place.name}</h5>
                            <p class="place-descr">${place.description}</p>
                            <p>${place.pricing}</p>
                            <a href="${place.website}" target="_blank">Visit website</a>
                        </div>
                    </div>
                `;
                foodPlacesList.appendChild(foodPlaceDiv);
            });
        }

        function showPage(page) {
            const placesPerPage = 3; // Show up to 3 cards per page
            const start = page * placesPerPage;
            const end = start + placesPerPage;
            const pagePlaces = filteredFoodPlaces.slice(start, end);
            displayFoodPlaces(pagePlaces);
        }

        // Function to filter food places based on category
        function filterFoodPlaces(category) {
            if (category === 'all') {
                filteredFoodPlaces = foodPlaces;
            } else {
                filteredFoodPlaces = foodPlaces.filter(place => place.category === category);
            }
            currentPage = 0; 
            showPage(currentPage);
        }

        // Event listener for filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.disabled = true;
                filterButtons.forEach(btn => {
                    if (btn !== button) {
                        btn.disabled = false;
                    }
                });
                const filter = button.getAttribute('data-filter');
                filterFoodPlaces(filter);
            });
        });

        // Event listeners for Prev and Next navigation links
        document.getElementById('prev').addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
            } else {
                // Math.ceil object referenced from https://www.w3schools.com/jsref/jsref_ceil.asp, Accessed March 01, 2025
                currentPage = Math.ceil(filteredFoodPlaces.length / 3) - 1;
            }
            showPage(currentPage);
        });

        document.getElementById('next').addEventListener('click', () => {
            if (currentPage < Math.ceil(filteredFoodPlaces.length / 3) - 1) {
                currentPage++;
            } else {
                currentPage = 0;
            }
            showPage(currentPage);
        });

        showPage(currentPage);

        window.addEventListener('resize', () => {
            showPage(currentPage);
        });
    })
    .catch(error => console.error('Error fetching data: ', error));