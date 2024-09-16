import axios from "axios";
import { handleAxiosError } from "./common_utils";
import { doLogout } from "../actions";

// Function to get base URL
const getApiKeyManagerBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_KEY_MANAGER_URL;
};

// Axios instance with a default timeout
const axiosInstance = axios.create({
  baseURL: getApiKeyManagerBaseUrl(),
  timeout: 5000, // Set timeout here (in milliseconds)
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

// Function to get active plans
export const getActivePlans = async (userToken) => {
  return await get({
    uri: "/api-key-manager/api-keys/active/me",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

// Function to get active plans
export const getAvailableTiers = async () => {
  return await get({ uri: "/api-key-manager/tiers" });
};

// Function to post JSON data
export const postJson = async ({ uri, body, headers }) => {
  try {
    const response = await axiosInstance.post(uri, body, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error, doLogout);
  }
};

// Function to get data
export const get = async ({ uri, headers }) => {
  try {
    const response = await axiosInstance.get(uri, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleAxiosError(error, doLogout);
  }
};


