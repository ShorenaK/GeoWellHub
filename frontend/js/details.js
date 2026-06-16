// Import function that gets one retreat from the backend
import { fetchRetreatById } from "./api/retreatsApi.js";

// Import function that gets one community listing from the backend
import { fetchCommunityListingById } from "./api/communityListingsApi.js";

// Find the section where details will be displayed
const retreatDetailsSection = document.querySelector("#retreat-details");

// Get the type and id from the URL
const params = new URLSearchParams(window.location.search);
const listingType = params.get("type");
const listingId = params.get("id");

// Display one listing on the page
function displayListing(listing, type) {
  if (!listing) {
    retreatDetailsSection.innerHTML = "<p>Listing not found.</p>";
    return;
  }

  const treatmentOrListingType =
    type === "community" ? listing.listingType : listing.treatmentType;

  retreatDetailsSection.innerHTML = `
    <h2>${listing.name}</h2>

    <p><strong>Type:</strong> ${
      type === "community" ? "Community Listing" : "Official Retreat"
    }</p>

    <p><strong>Region:</strong> ${listing.region}</p>
    <p><strong>City:</strong> ${listing.city}</p>
    <p><strong>Treatment / Listing Type:</strong> ${treatmentOrListingType}</p>

    <p><strong>Traditional Benefits:</strong></p>
    <p>${listing.traditionalBenefits || "Not provided"}</p>

    <p><strong>Description:</strong></p>
    <p>${listing.description || "No description available"}</p>

    <p><strong>Rating:</strong> ${listing.rating || "Not rated"}</p>
  `;
}

// Load the correct listing based on URL type
async function loadListing() {
  let listing = null;

  if (listingType === "community") {
    listing = await fetchCommunityListingById(listingId);
  } else {
    listing = await fetchRetreatById(listingId);
  }

  displayListing(listing, listingType || "retreat");
}

// Start page
loadListing();