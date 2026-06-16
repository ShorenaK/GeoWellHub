// Base URL for all community listing API requests
const API_URL = "/api/community-listings";

// Get all community listings from the backend
export async function fetchCommunityListings() {
  try {
    // Send GET request to /api/community-listings
    const response = await fetch(API_URL);

    // Convert response into JavaScript object
    const data = await response.json();

    // Return only the communityListings array
    return data.communityListings;
  } catch (error) {
    // Log error in browser console
    console.error("Error fetching community listings:", error);

    // Return empty array so the page does not break
    return [];
  }
}

// Create a new community listing through the backend API
export async function createCommunityListing(listingData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating community listing:", error);
    return null;
  }
}

// Update an existing community listing through the backend API
export async function updateCommunityListing(id, listingData) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating community listing:", error);
    return null;
  }
}

// Delete an existing community listing through the backend API
export async function deleteCommunityListing(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting community listing:", error);
    return null;
  }
}

// Get one community listing by id from the backend
export async function fetchCommunityListingById(id) {
  try {
    const response = await fetch(`/api/community-listings/${id}`);

    const data = await response.json();

    return data.communityListing;
  } catch (error) {
    console.error("Error fetching community listing by id:", error);

    return null;
  }
}