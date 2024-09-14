import axios from 'axios';


// Function to get base URL
const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://localhost:9099/api-key-management-service";
};

// Axios instance with a default timeout
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000, // Set timeout here (in milliseconds)
});

// Function to get active plans
export const getActivePlans = async (userToken) => {
  try {
    const response = await axiosInstance.get('/api-key-manager/api-keys/active/me', {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching active plans:', error);
    throw error;
  }
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
    console.log('Post response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting JSON data:', error);
    throw error;
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
    console.log('Get response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};


