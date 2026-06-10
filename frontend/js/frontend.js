// Import the function that gets retreats from the backend
import { fetchRetreats } from "./api/retreatsApi.js";

// Find the listings section in index.html
const listingsSection = document.querySelector("#listings");

// Find the search input
const searchInput = document.querySelector("#search-input");

// Store all retreats so we can filter them later
let allRetreats = [];

// Display retreat listings on the page
function displayRetreats(retreats) {
  // Clear old content before adding new content
  listingsSection.innerHTML = "";

  // If there are no retreats, show a message
  if (retreats.length === 0) {
    listingsSection.innerHTML = "<p>No retreats found.</p>";
    return;
  }

  // Create HTML for each retreat
  retreats.forEach((retreat) => {
    const retreatCard = document.createElement("article");

    retreatCard.innerHTML = `
      <h2>${retreat.name}</h2>
      <p><strong>Region:</strong> ${retreat.region}</p>
      <p><strong>City:</strong> ${retreat.city}</p>
      <p><strong>Treatment:</strong> ${retreat.treatmentType}</p>
      <p><strong>Rating:</strong> ${retreat.rating}</p>
    `;

    listingsSection.appendChild(retreatCard);
  });
}

// Load retreats when the page opens
async function loadRetreats() {
  // Get retreat data from backend
  const retreats = await fetchRetreats();

  // Save all retreats for searching
  allRetreats = retreats;

  // Display all retreats initially
  displayRetreats(retreats);
}

// Start the page ---> Display retreats on page
loadRetreats();