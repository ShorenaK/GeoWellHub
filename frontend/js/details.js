// Import function that gets one retreat from the backend
import { fetchRetreatById } from "./api/retreatsApi.js";

// Find the section where retreat details will be displayed
const retreatDetailsSection = document.querySelector("#retreat-details");

// Get the id from the URL
const params = new URLSearchParams(window.location.search);
const retreatId = params.get("id");

// Display one retreat on the page
function displayRetreat(retreat) {
  // If retreat does not exist
  if (!retreat) {
    retreatDetailsSection.innerHTML = "<p>Retreat not found.</p>";
    return;
  }

  // Show retreat information
  retreatDetailsSection.innerHTML = `
    <h2>${retreat.name}</h2>

    <p><strong>Region:</strong> ${retreat.region}</p>
    <p><strong>City:</strong> ${retreat.city}</p>
    <p><strong>Treatment:</strong> ${retreat.treatmentType}</p>

    <p><strong>Traditional Benefits:</strong></p>
    <p>${retreat.traditionalBenefits || "Not provided"}</p>

    <p><strong>Description:</strong></p>
    <p>${retreat.description || "No description available"}</p>

    <p><strong>Rating:</strong> ${retreat.rating}</p>
  `;
}

// Load retreat when page opens
async function loadRetreat() {
  // Get retreat from backend
  const retreat = await fetchRetreatById(retreatId);

  // Display retreat on the page
  displayRetreat(retreat);
}

// Start page
loadRetreat();