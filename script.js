document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get("destination_id");

    fetch("destination.json")
        .then(response => response.json())
        .then(destinations => {
            if (!destinationId) {
                const container = document.getElementById("destinations");
                destinations.forEach(dest => {
                    const card = document.createElement("a");
                    card.classList.add("destination-card");
                    card.href = `destination.html?destination_id=${dest.id}`;
                    card.innerHTML = `
                        <img src="${dest.image}" alt="${dest.name}">
                        <h3>${dest.name}</h3>
                        <p>${dest.description}</p>
                    `;
                    container.appendChild(card);
                });
            } else {
                const destination = destinations.find(d => d.id == destinationId);
                if (destination) {
                    document.getElementById("destination-title").innerText = destination.name;
                    document.getElementById("destination-img").src = destination.image;
                    document.getElementById("destination-description").innerText = destination.details.long_description;
                    document.getElementById("destination-itinerary").innerHTML = destination.details.itinerary.map(item => `<li>${item}</li>`).join("");
                    
                    const { latitude, longitude } = destination.details.location;
                    document.getElementById("destination-map").src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
                } else {
                    document.getElementById("destination-content").innerHTML = "<p>Destination not found.</p>";
                }
            }
        })
        .catch(error => console.error("Error loading destinations:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("booking-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const destination = document.getElementById("destination").value;
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const travelers = document.getElementById("travelers").value;
        const date = document.getElementById("date").value;

        const today = new Date().toISOString().split("T")[0];

        if (!name || !email || !travelers || !date) {
            alert("All fields are required!");
            return;
        }

        if (date < today) {
            alert("Travel date cannot be in the past!");
            return;
        }

        if (travelers < 1) {
            alert("Number of travelers must be at least 1!");
            return;
        }

        console.log("Booking Details:", { destination, name, email, travelers, date });
        alert("Tour Booked!");
        form.reset();
    });
});


