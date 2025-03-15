const events = [
    { name: "Concert Night", date: "2025-03-20", location: "Downtown Arena", category: "Music", description: "Enjoy an amazing night of live music." },
    { name: "Tech Expo 2025", date: "2025-03-25", location: "Convention Center", category: "Tech", description: "Explore the latest in technology and innovation." },
    { name: "Art Showcase", date: "2025-03-22", location: "City Gallery", category: "Arts", description: "A display of stunning artworks from local artists." },
    { name: "Marathon 2025", date: "2025-03-28", location: "City Park", category: "Sports", description: "Join the annual city marathon and challenge yourself!" }
];
events.push({
    name: "New Year Concert",
    date: "2025-01-01",
    location: "City Hall",
    category: "Music",
    description: "Celebrate the new year with amazing live music."
});


displayEvents(events);


function searchEvents() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const selectedDate = document.getElementById("event-date").value;
    const selectedCategory = document.getElementById("event-category").value;
    
    const filteredEvents = events.filter(event => {
        return (searchQuery === "" || event.name.toLowerCase().includes(searchQuery)) &&
               (selectedDate === "" || event.date === selectedDate) &&
               (selectedCategory === "" || event.category === selectedCategory);
    });
    
    displayEvents(filteredEvents);
}

function displayEvents(eventList) {
    const eventListDiv = document.getElementById("event-list");


    if (!eventListDiv) {
        console.warn("Warning: #event-list not found. Skipping displayEvents.");
        return;
    }

    eventListDiv.innerHTML = ""; 

    if (eventList.length === 0) {
        eventListDiv.innerHTML = "<p class='text-center'>No events found.</p>";
        return;
    }

    eventList.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "col-md-4";
        eventCard.innerHTML = `
            <div class="card event-card">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                    <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                    <p class="card-text">${event.description}</p>
                    <a href="event-details.html?name=${encodeURIComponent(event.name)}&date=${encodeURIComponent(event.date)}&location=${encodeURIComponent(event.location)}&description=${encodeURIComponent(event.description)}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
        eventListDiv.appendChild(eventCard);
    });
}



if (window.location.pathname.includes("event-details.html")) {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("event-name").innerText = urlParams.get("name") || "Event Not Found";
    document.getElementById("event-date").innerText = `Date: ${urlParams.get("date") || "N/A"}`;
    document.getElementById("event-location").innerText = `Location: ${urlParams.get("location") || "N/A"}`;
    document.getElementById("event-description").innerText = urlParams.get("description") || "No description available.";
}
