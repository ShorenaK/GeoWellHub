// Import API function for creating retreats
import {
  createRetreat,
  fetchRetreats,
  deleteRetreat,
  updateRetreat,
} from "./api/retreatsApi.js";

// Find the retreat form in manage.html
const retreatForm = document.querySelector("#retreat-form");
// Section where existing retreats will be displayed
const manageRetreatList = document.querySelector("#manage-retreat-list");
// This stores the id of the retreat currently being edited
let editingRetreatId = null;

// Listen for form submission
retreatForm.addEventListener("submit", async (event) => {
  // Prevent the page from refreshing
  event.preventDefault();

  // Create a retreat object from the form fields
  const retreatData = {
    name: document.querySelector("#retreat-name").value,
    city: document.querySelector("#retreat-city").value,
    region: document.querySelector("#retreat-region").value,
    treatmentType: document.querySelector("#retreat-treatment").value,
    rating: 0,
    imageUrl: "https://placehold.co/600x400",
  };

  if (editingRetreatId) {
    // If editingRetreatId has a value, update the existing retreat
    await updateRetreat(editingRetreatId, retreatData);

    // Clear edit mode after updating
    editingRetreatId = null;

    alert("Retreat updated successfully!");
  } else {
    // If no edit id exists, create a new retreat
    await createRetreat(retreatData);

    alert("Retreat created successfully!");
  }

  // Clear the form after submit
  retreatForm.reset();

  // Reload the list so changes appear on the page
  await loadManageRetreats();
});

// Display all retreats with Delete button
function displayManageRetreats(retreats) {
  manageRetreatList.innerHTML = "";

  retreats.forEach((retreat) => {
    const retreatCard = document.createElement("article");

   retreatCard.innerHTML = `
  <h3>${retreat.name}</h3>
  <p>${retreat.city}, ${retreat.region}</p>

  <button
    class="btn btn-secondary edit-retreat-btn"
    data-id="${retreat._id}"
    data-name="${retreat.name}"
    data-city="${retreat.city}"
    data-region="${retreat.region}"
    data-treatment="${retreat.treatmentType}"
  >
    Edit
  </button>

  <button
    class="btn btn-danger delete-retreat-btn"
    data-id="${retreat._id}"
  >
    Delete
  </button>
`;

    manageRetreatList.appendChild(retreatCard);
  });
}

// Load retreats into manage page
async function loadManageRetreats() {
  const retreats = await fetchRetreats();

  displayManageRetreats(retreats);
}
// Listen for clicks on the retreat list
manageRetreatList.addEventListener("click", async (event) => {
  // Check if the clicked element is an edit button
  if (event.target.classList.contains("edit-retreat-btn")) {
    // Store the retreat id so we know which retreat to update
    editingRetreatId = event.target.dataset.id;

    // Fill the form with the current retreat values
    document.querySelector("#retreat-name").value = event.target.dataset.name;
    document.querySelector("#retreat-city").value = event.target.dataset.city;
    document.querySelector("#retreat-region").value = event.target.dataset.region;
    document.querySelector("#retreat-treatment").value =
      event.target.dataset.treatment;

    // Stop here because this was an edit click, not a delete click
    return;
  }

  // Check if the clicked element is a delete button
  if (event.target.classList.contains("delete-retreat-btn")) {
    // Get the retreat id from the button
    const retreatId = event.target.dataset.id;

    // Ask user to confirm before deleting
    const confirmDelete = confirm("Are you sure you want to delete this retreat?");

    if (!confirmDelete) {
      return;
    }

    // Delete retreat from backend
    await deleteRetreat(retreatId);

    // Reload the list after deleting
    await loadManageRetreats();
  }
});

loadManageRetreats();