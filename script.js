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

