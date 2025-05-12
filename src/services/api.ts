import { UserNotification } from "../types/apiTypes";

const API_BASE_URL = "";

// API calls
export const getUserNotifications = async (): Promise<UserNotification[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error fetching user notifications");
    }

    return data;
  } catch (error) {
    console.error("Get user notifications error: ", error);
    throw new Error("Error fetching user notifications");
  }
};
