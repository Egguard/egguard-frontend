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