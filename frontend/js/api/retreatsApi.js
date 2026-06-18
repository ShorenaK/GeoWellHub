/*
  retreatsApi.js

  This file handles communication between the frontend
  and the Retreats API.

  Responsibilities:
  - Fetch all retreat listings.
  - Fetch one retreat by id.
  - Create retreat listings.
  - Update retreat listings.
  - Delete retreat listings.

  Data Sources:
  - /api/retreats
  - /api/retreats/:id

  Author: Shorena K. Anzhilov
  Course: CS 5610 Web Development
  Project: GeoWell Hub
*/

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

// Get one retreat by id from the backend
export async function fetchRetreatById(id) {
  try {
    // Send GET request to /api/retreats/:id
    const response = await fetch(`${API_URL}/${id}`);

    // Convert response into JavaScript object
    const data = await response.json();

    // Return only the retreat object
    return data.retreat;
  } catch (error) {
    console.error("Error fetching retreat by id:", error);

    return null;
  }
}

// Update an existing retreat through the backend API
export async function updateRetreat(id, retreatData) {
  try {
    // Send PUT request to /api/retreats/:id
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retreatData),
    });

    // Convert backend response into JavaScript object
    const data = await response.json();

    // Return backend response
    return data;
  } catch (error) {
    console.error("Error updating retreat:", error);

    return null;
  }
}

// Delete an existing retreat through the backend API
export async function deleteRetreat(id) {
  try {
    // Send DELETE request to /api/retreats/:id
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    // Convert backend response into JavaScript object
    const data = await response.json();

    // Return backend response
    return data;
  } catch (error) {
    console.error("Error deleting retreat:", error);

    return null;
  }
}
