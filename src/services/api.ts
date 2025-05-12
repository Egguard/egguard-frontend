import { PaginatedResponse, UserNotification } from "@/lib/types/apiTypes";

const API_BASE_URL = "http://localhost:8080";
const FARM_ID = 1;

// API calls
export const getUserNotifications = async (
  page = 0, 
  size = 5
): Promise<PaginatedResponse<UserNotification>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/farms/${FARM_ID}/notifications?page=${page}&size=${size}`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("getUserNotifications: ", data);

    if (!response.ok) {
      throw new Error(data.message || "Error fetching user notifications");
    }

    return data;
  } catch (error) {
    console.error("Get user notifications error: ", error);
    throw new Error("Error fetching user notifications");
  }
};
// src/api/eggAPI.ts

import { Egg } from '../lib/types/Egg';

/**
 * Fetches egg data for a specific farm and date from the backend API.
 * 
 * @param farmId - The ID of the farm to fetch eggs for.
 * @param date - The date in YYYY-MM-DD format to filter the eggs.
 * @param signal - Optional AbortSignal to cancel the fetch request.
 * @returns A Promise resolving to an array of Egg objects.
 * @throws If the API request fails.
 */
export const fetchEggsFromAPI = async (farmId: number, date: string, signal?: AbortSignal): Promise<Egg[]> => {
  const url = `http://localhost:8080/api/v1/farms/${farmId}/eggs?picked=false&date=${date}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
};