// Import API functions for retreat CRUD operations
import {
  createRetreat,
  fetchRetreats,
  deleteRetreat,
  updateRetreat,
} from "./api/retreatsApi.js";

// Import API functions for community listing 
import {
  fetchCommunityListings,
  deleteCommunityListing,
  // to be used in function that listens for edit form submission on community listing cards
  updateCommunityListing,
} from "./api/communityListingsApi.js";

// Find the create retreat form in manage.html
const retreatForm = document.querySelector("#retreat-form");

// Find the section where existing retreat cards will be displayed
const manageRetreatList = document.querySelector("#manage-retreat-list");

// Find the section where existing community listing cards will be displayed
const manageCommunityList = document.querySelector("#manage-community-list");

// Listen for create form submission
retreatForm.addEventListener("submit", async (event) => {
  // Prevent page refresh
  event.preventDefault();

  // Create a retreat object from the top create form
  const retreatData = {
    name: document.querySelector("#retreat-name").value,
    city: document.querySelector("#retreat-city").value,
    region: document.querySelector("#retreat-region").value,
    treatmentType: document.querySelector("#retreat-treatment").value,
    description: document.querySelector("#retreat-description").value,
    traditionalBenefits: document.querySelector("#retreat-benefits").value,

    // Use the user image URL, or fallback to a placeholder image
    imageUrl:
      document.querySelector("#retreat-image").value ||
      "https://placehold.co/600x400",

    // Convert comma-separated text into an array
    wellnessNeeds: document
      .querySelector("#retreat-wellness-needs")
      .value.split(",")
      .map((item) => item.trim())
      .filter((item) => item !== ""),

    rating: 0,
  };

  // Send new retreat to backend
  await createRetreat(retreatData);

  alert("Retreat created successfully!");

  // Clear create form
  retreatForm.reset();

  // Reload existing retreat cards
  await loadManageRetreats();
});

// Display all retreats on the manage page
function displayManageRetreats(retreats) {
  // Clear old content before rendering new cards
  manageRetreatList.innerHTML = "";

  retreats.forEach((retreat) => {
    // Create a card for each retreat
    const retreatCard = document.createElement("article");
    retreatCard.classList.add("card", "mb-3", "p-3");

    // Add retreat information, buttons, and hidden edit form
    retreatCard.innerHTML = `
      <h3>${retreat.name}</h3>
      <p>${retreat.city}, ${retreat.region}</p>
      <p>${retreat.treatmentType || ""}</p>

      <!-- Button opens the edit form inside this card -->
      <button class="btn btn-secondary edit-retreat-btn" data-id="${retreat._id}">
        Edit
      </button>

      <!-- Button deletes this retreat -->
      <button class="btn btn-danger delete-retreat-btn mt-2" data-id="${retreat._id}">
        Delete
      </button>

      <!-- 
        This form is hidden at first.
        It only edits this specific retreat card.
      -->
      <form class="edit-retreat-form mt-3 d-none" data-id="${retreat._id}">
        <div class="mb-2">
          <label class="form-label">Retreat Name</label>
          <input
            class="form-control edit-name"
            value="${retreat.name || ""}"
            required
          />
        </div>

        <div class="mb-2">
          <label class="form-label">City</label>
          <input
            class="form-control edit-city"
            value="${retreat.city || ""}"
            required
          />
        </div>

        <div class="mb-2">
          <label class="form-label">Region</label>
          <input
            class="form-control edit-region"
            value="${retreat.region || ""}"
            required
          />
        </div>

        <div class="mb-2">
          <label class="form-label">Treatment Type</label>
          <input
            class="form-control edit-treatment"
            value="${retreat.treatmentType || ""}"
            required
          />
        </div>

        <div class="mb-2">
          <label class="form-label">Description</label>
          <textarea class="form-control edit-description">${
            retreat.description || ""
          }</textarea>
        </div>

        <div class="mb-2">
          <label class="form-label">Traditional Benefits</label>
          <textarea class="form-control edit-benefits">${
            retreat.traditionalBenefits || ""
          }</textarea>
        </div>

        <div class="mb-2">
          <label class="form-label">Image URL</label>
          <input
            class="form-control edit-image"
            value="${retreat.imageUrl || ""}"
          />
        </div>

        <button type="submit" class="btn btn-success">Save Changes</button>

        <button type="button" class="btn btn-outline-secondary cancel-edit-btn">
          Cancel
        </button>
      </form>
    `;

    // Add the card to the page
    manageRetreatList.appendChild(retreatCard);
  });
}

// Load retreats from backend and display them
async function loadManageRetreats() {
  const retreats = await fetchRetreats();

  displayManageRetreats(retreats);
}

// Listen for clicks on Edit, Cancel, and Delete buttons
manageRetreatList.addEventListener("click", async (event) => {
  // If user clicks Edit
  if (event.target.classList.contains("edit-retreat-btn")) {
    // Find the card that contains the clicked Edit button
    const card = event.target.closest("article");

    // Find the edit form inside that same card
    const editForm = card.querySelector(".edit-retreat-form");

    // Show the edit form
    editForm.classList.remove("d-none");

    return;
  }

  // If user clicks Cancel inside edit form
  if (event.target.classList.contains("cancel-edit-btn")) {
    // Find the form and hide it again
    const editForm = event.target.closest(".edit-retreat-form");

    editForm.classList.add("d-none");

    return;
  }

  // If user clicks Delete
  if (event.target.classList.contains("delete-retreat-btn")) {
    const retreatId = event.target.dataset.id;

    const confirmDelete = confirm("Are you sure you want to delete this retreat?");

    if (!confirmDelete) {
      return;
    }

    // Delete retreat from backend
    await deleteRetreat(retreatId);

    // Reload list after delete
    await loadManageRetreats();
  }
});

// Display all community listings on the manage page
function displayManageCommunityListings(communityListings) {
  manageCommunityList.innerHTML = "";

  communityListings.forEach((listing) => {
    const listingCard = document.createElement("article");
    listingCard.classList.add("card", "mb-3", "p-3");

 listingCard.innerHTML = `
  <h3>${listing.name}</h3>
  <p>${listing.city}, ${listing.region}</p>
  <p>${listing.listingType || ""}</p>
  <p>${listing.traditionalBenefits || ""}</p>

  <button
    class="btn btn-secondary edit-community-btn"
    data-id="${listing._id}"
  >
    Edit
  </button>

  <button
    class="btn btn-danger delete-community-btn mt-2"
    data-id="${listing._id}"
  >
    Delete
  </button>

  <form class="edit-community-form mt-3 d-none" data-id="${listing._id}">
    <div class="mb-2">
      <label class="form-label">Listing Name</label>
      <input class="form-control edit-community-name" value="${listing.name || ""}" required />
    </div>

    <div class="mb-2">
      <label class="form-label">City</label>
      <input class="form-control edit-community-city" value="${listing.city || ""}" required />
    </div>

    <div class="mb-2">
      <label class="form-label">Region</label>
      <input class="form-control edit-community-region" value="${listing.region || ""}" required />
    </div>

    <div class="mb-2">
      <label class="form-label">Listing Type</label>
      <input class="form-control edit-community-type" value="${listing.listingType || ""}" required />
    </div>

    <div class="mb-2">
      <label class="form-label">Traditional Benefits</label>
      <textarea class="form-control edit-community-benefits">${listing.traditionalBenefits || ""}</textarea>
    </div>

    <button type="submit" class="btn btn-success">Save Changes</button>
    <button type="button" class="btn btn-outline-secondary cancel-community-edit-btn">
      Cancel
    </button>
  </form>
`;

    manageCommunityList.appendChild(listingCard);
  });
}

// Load community listings from backend and display them
async function loadManageCommunityListings() {
  const communityListings = await fetchCommunityListings();

  displayManageCommunityListings(communityListings);
}

// Listen for edit form submission
manageRetreatList.addEventListener("submit", async (event) => {
  // Only handle submit events from edit forms
  if (!event.target.classList.contains("edit-retreat-form")) {
    return;
  }

  // Prevent page refresh
  event.preventDefault();

  // Get the form that was submitted
  const editForm = event.target;

  // Get the id of the retreat being edited
  const retreatId = editForm.dataset.id;

  // Collect updated values from this card's edit form
  const updatedRetreat = {
    name: editForm.querySelector(".edit-name").value,
    city: editForm.querySelector(".edit-city").value,
    region: editForm.querySelector(".edit-region").value,
    treatmentType: editForm.querySelector(".edit-treatment").value,
    description: editForm.querySelector(".edit-description").value,
    traditionalBenefits: editForm.querySelector(".edit-benefits").value,

    // Use updated image or placeholder if empty
    imageUrl:
      editForm.querySelector(".edit-image").value ||
      "https://placehold.co/600x400",
  };

  // Send updated data to backend
  await updateRetreat(retreatId, updatedRetreat);

  alert("Retreat updated successfully!");

  // Reload cards so updated data appears
  await loadManageRetreats();
});


// Listen for delete clicks on community listing cards
manageCommunityList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("edit-community-btn")) {
    const card = event.target.closest("article");
    const editForm = card.querySelector(".edit-community-form");

    editForm.classList.remove("d-none");

    return;
  }

  if (event.target.classList.contains("cancel-community-edit-btn")) {
    const editForm = event.target.closest(".edit-community-form");

    editForm.classList.add("d-none");

    return;
  }

  if (event.target.classList.contains("delete-community-btn")) {
    const listingId = event.target.dataset.id;

    const confirmDelete = confirm(
      "Are you sure you want to delete this community listing?",
    );

    if (!confirmDelete) {
      return;
    }

    await deleteCommunityListing(listingId);

    await loadManageCommunityListings();
  }
});



// Load retreats and community listings when manage.html opens
loadManageRetreats();
loadManageCommunityListings();