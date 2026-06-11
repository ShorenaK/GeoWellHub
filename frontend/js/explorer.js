// Import the function that gets retreats from the backend
import { fetchRetreats } from "./api/retreatsApi.js";

import { fetchCommunityListings } from "./api/communityListingsApi.js";

// Find the listings section in index.html
const listingsSection = document.querySelector("#listings");

// Find the search input
const searchInput = document.querySelector("#search-input");

// Store all retreats so we can filter them later
let allRetreats = [];
let allCommunityListings = [];

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

  <a
    href="./details.html?id=${retreat._id}"
    class="btn btn-primary"
  >
    View Details
  </a>
`;

    listingsSection.appendChild(retreatCard);
  });
}

// Filter retreats based on what the user types
function filterRetreats(searchText) {
  // Convert search text to lowercase so search is not case-sensitive
  const lowerCaseSearchText = searchText.toLowerCase();

  // Keep only retreats that match the search text
  const filteredRetreats = allRetreats.filter((retreat) => {
    return (
      retreat.name?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.city?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.region?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.treatmentType?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.traditionalBenefits?.toLowerCase().includes(lowerCaseSearchText) ||
        retreat.wellnessNeeds?.some((need) =>
        need.toLowerCase().includes(lowerCaseSearchText),
      )

    );
  });

  // Display only the filtered retreats
  displayRetreats(filteredRetreats);
}

// Load retreats when the page opens
async function loadRetreats() {
  // Get retreat data from backend
  const retreats = await fetchRetreats();

// Get community listing data from backend
  const communityListings = await fetchCommunityListings();


  // Save all retreats for searching
  allRetreats = retreats;
  allCommunityListings = communityListings;


// Display both collections together
  displayListings(allRetreats, allCommunityListings);
}

// listen for user input in the search box and filter retreats as they type -----> this is for my search bar functionality

// Listen for typing inside the search input
searchInput.addEventListener("input", (event) => {
  // Get the current text typed by the user
  const searchText = event.target.value;

  // Filter retreats using the typed text
  filterRetreats(searchText);
});


// Start the page ---> Display retreats on page
loadRetreats();