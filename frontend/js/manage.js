// Import API function for creating retreats
import { createRetreat } from "./api/retreatsApi.js";

// Find the retreat form in manage.html
const retreatForm = document.querySelector("#retreat-form");

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

  // Send the new retreat to the backend
  await createRetreat(retreatData);

  // Clear the form after submit
  retreatForm.reset();

  // Let the user know it worked
  alert("Retreat created successfully!");
});