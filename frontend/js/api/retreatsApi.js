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

// Create a new retreat through the backend API
export async function createRetreat(retreatData) {
  try {
    // Send POST request with retreat data
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retreatData),
    });

    // Convert backend response to JavaScript object
    const data = await response.json();

    // Return the backend response
    return data;
  } catch (error) {
    console.error("Error creating retreat:", error);

    return null;
  }
}