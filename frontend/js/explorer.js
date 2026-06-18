/*
  explorer.js

  This file controls the GeoWell Hub Explorer page.

  Responsibilities:
  - Fetch official retreat listings from the retreats collection.
  - Fetch community wellness listings from the communityListings collection.
  - Combine both collections and display them on the Explorer page.
  - Create listing cards dynamically using client-side rendering.
  - Provide links to the Details page for each listing.
  - Support real-time searching and filtering.
  - Search by:
      * Name
      * City
      * Region
      * Treatment Type
      * Listing Type
      * Traditional Benefits
      * Wellness Needs
  - Update displayed results as the user types in the search box.

  Data Sources:
  - /api/retreats
  - /api/community-listings

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

// Import the function that gets retreats from the backend
import { fetchRetreats } from "./api/retreatsApi.js";

// Import the function that gets community listings from the backend
import { fetchCommunityListings } from "./api/communityListingsApi.js";

// Find the listings section in explorer.html
const listingsSection = document.querySelector("#listings");

// Find the search input
const searchInput = document.querySelector("#search-input");

// Store all retreats and community listings so we can filter them later
let allRetreats = [];
let allCommunityListings = [];

// Display both official retreats and community listings as Bootstrap cards
function displayListings(retreats, communityListings) {
  listingsSection.innerHTML = "";

  if (retreats.length === 0 && communityListings.length === 0) {
    listingsSection.innerHTML = "<p>No listings found.</p>";
    return;
  }

  retreats.forEach((retreat) => {
    const retreatCard = document.createElement("article");
    retreatCard.classList.add("col-md-6", "col-lg-4");

    retreatCard.innerHTML = `
      <div class="card h-100">
        ${
          retreat.imageUrl
            ? `<img src="${retreat.imageUrl}" class="card-img-top" alt="${retreat.name}" />`
            : ""
        }

        <div class="card-body d-flex flex-column">
          <span class="badge official-badge mb-2 align-self-start">
            Official Wellness Retreat
          </span>

          <h2 class="card-title h5">${retreat.name}</h2>

          <p class="card-text mb-1">
            <strong>Region:</strong> ${retreat.region}
          </p>

          <p class="card-text mb-1">
            <strong>City:</strong> ${retreat.city}
          </p>

          <p class="card-text mb-1">
            <strong>Treatment:</strong> ${retreat.treatmentType || "Not provided"}
          </p>

          <p class="card-text mb-3">
            <strong>Rating:</strong> ${retreat.rating || "Not rated"}
          </p>

          <div class="mt-auto pt-2">
  <a
    href="./details.html?type=retreat&id=${retreat._id}"
    class="btn btn-primary view-details-btn"
  >
    View Details
  </a>
</div>
        </div>
      </div>
    `;

    listingsSection.appendChild(retreatCard);
  });

  communityListings.forEach((listing) => {
    const listingCard = document.createElement("article");
    listingCard.classList.add("col-md-6", "col-lg-4");

    listingCard.innerHTML = `
      <div class="card h-100">
        ${
          listing.imageUrl
            ? `<img src="${listing.imageUrl}" class="card-img-top" alt="${listing.name}" />`
            : ""
        }

        <div class="card-body d-flex flex-column">
          <span class="badge community-badge mb-2 align-self-start">
          Community Wellness Listing
          </span>

          <h2 class="card-title h5">${listing.name}</h2>

          <p class="card-text mb-1">
            <strong>Region:</strong> ${listing.region}
          </p>

          <p class="card-text mb-1">
            <strong>City:</strong> ${listing.city}
          </p>

          <p class="card-text mb-1">
            <strong>Listing Type:</strong> ${listing.listingType || "Not provided"}
          </p>

          <p class="card-text mb-3">
            <strong>Rating:</strong> ${listing.rating || "Not rated"}
          </p>

        <div class="mt-auto pt-2">
  <a
    href="./details.html?type=community&id=${listing._id}"
    class="btn btn-primary view-details-btn"
  >
    View Details
  </a>
</div>
        </div>
      </div>
    `;

    listingsSection.appendChild(listingCard);
  });
}

// Filter retreats and community listings based on what the user types
function filterRetreats(searchText) {
  const lowerCaseSearchText = searchText.toLowerCase();

  const filteredRetreats = allRetreats.filter((retreat) => {
    return (
      retreat.name?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.city?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.region?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.treatmentType?.toLowerCase().includes(lowerCaseSearchText) ||
      retreat.traditionalBenefits
        ?.toLowerCase()
        .includes(lowerCaseSearchText) ||
      retreat.wellnessNeeds?.some((need) =>
        need.toLowerCase().includes(lowerCaseSearchText),
      )
    );
  });

  const filteredCommunityListings = allCommunityListings.filter((listing) => {
    return (
      listing.name?.toLowerCase().includes(lowerCaseSearchText) ||
      listing.city?.toLowerCase().includes(lowerCaseSearchText) ||
      listing.region?.toLowerCase().includes(lowerCaseSearchText) ||
      listing.listingType?.toLowerCase().includes(lowerCaseSearchText) ||
      listing.traditionalBenefits
        ?.toLowerCase()
        .includes(lowerCaseSearchText) ||
      listing.wellnessNeeds?.some((need) =>
        need.toLowerCase().includes(lowerCaseSearchText),
      )
    );
  });

  displayListings(filteredRetreats, filteredCommunityListings);
}

// Load retreats and community listings when the page opens
async function loadListings() {
  const retreats = await fetchRetreats();
  const communityListings = await fetchCommunityListings();

  allRetreats = retreats;
  allCommunityListings = communityListings;

  displayListings(allRetreats, allCommunityListings);
}

// Listen for typing inside the search input
searchInput.addEventListener("input", (event) => {
  const searchText = event.target.value;

  filterRetreats(searchText);
});

// Start the Explorer page
loadListings();
