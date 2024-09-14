import axios from 'axios';

// Define the base URL function
const getAuthBaseUrl = () => {
  return process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;
};

// Create an axios instance with default settings
const axiosInstance = axios.create({
  baseURL: getAuthBaseUrl(),  // Use the getBaseUrl function for base URL
  timeout: 5000,         // Timeout in milliseconds (10 seconds)
});



// Function to sign up a user
export const signUp = async (formData) => {
  const requestBody = {
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    roleIds: JSON.parse(formData.get("roleIds")),
  };

  return postJson({ uri: "/auth/register", body: requestBody });
};

// Function to sign in a user
export const postSignIn = async (credentials) => {
  return postJson({ uri: "/auth/login", body: credentials });
};

// Function to post JSON data
export const postJson = async ({ uri, body, headers }) => {
  try {
    const response = await axiosInstance.post(uri, body, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      return data;
    }
    throw error;
  }
};
