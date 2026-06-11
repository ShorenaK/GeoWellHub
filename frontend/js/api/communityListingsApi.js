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