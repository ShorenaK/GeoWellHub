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

// Display one listing on the page using Bootstrap styling
function displayListing(listing, type) {
  if (!listing) {
    retreatDetailsSection.innerHTML = `
      <div class="alert alert-warning">
        Listing not found.
      </div>
    `;
    return;
  }

  const isCommunityListing = type === "community";

  const listingCategory = isCommunityListing
    ? "Community Listing"
    : "Official Retreat";

  const treatmentOrListingType = isCommunityListing
    ? listing.listingType
    : listing.treatmentType;

  retreatDetailsSection.innerHTML = `
    <article class="card shadow-sm">
      ${
        listing.imageUrl
          ? `<img
  src="${listing.imageUrl}"
  class="card-img-top img-fluid"
  alt="${listing.name}"
  style="max-height: 400px; object-fit: cover;"
/>`
          : ""
      }

      <div class="card-body">
        <span class="badge ${
          isCommunityListing ? "text-bg-success" : "text-bg-primary"
        } mb-3">
          ${listingCategory}
        </span>

        <h2 class="card-title">${listing.name}</h2>

        <p class="text-muted">
          ${listing.city}, ${listing.region}
        </p>

        <hr />

        <div class="row">
          <div class="col-md-6">
            <p>
              <strong>Treatment / Listing Type:</strong><br />
              ${treatmentOrListingType || "Not provided"}
            </p>
          </div>

          <div class="col-md-6">
            <p>
              <strong>Rating:</strong><br />
              ${listing.rating || "Not rated"}
            </p>
          </div>
        </div>

        <h3 class="h5 mt-4">Traditional Benefits</h3>
        <p>${listing.traditionalBenefits || "Not provided"}</p>

        <h3 class="h5 mt-4">Description</h3>
        <p>${listing.description || "No description available"}</p>

        <h3 class="h5 mt-4">Wellness Needs</h3>
        <p>
          ${
            listing.wellnessNeeds?.length
              ? listing.wellnessNeeds.join(", ")
              : "Not provided"
          }
        </p>

        <a href="./explorer.html" class="btn btn-outline-secondary mt-3">
          Back to Explorer
        </a>
      </div>
    </article>
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