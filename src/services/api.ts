import { PaginatedResponse, UserNotification } from "../types/apiTypes";

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