// Base URL for all retreat API requests
const API_URL = "/api/retreats";

// Get all retreats from the backend
export async function fetchRetreats() {
  try {
    // Send GET request to /api/retreats
    const response = await fetch(API_URL);

    // Convert response from JSON string into JavaScript object
    const data = await response.json();

    // Return only the retreats array
    return data.retreats;
  } catch (error) {
    // Log error in browser console
    console.error("Error fetching retreats:", error);

    // Return empty array so the page does not break
    return [];
  }
}