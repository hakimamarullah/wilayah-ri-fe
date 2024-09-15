import axios from "axios";

// Function to get base URL
const getPaymentServiceBaseUrl = () => {
  return process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL;
};

// Axios instance with a default timeout
const axiosInstance = axios.create({
  baseURL: getPaymentServiceBaseUrl(),
  timeout: 5000, // Set timeout here (in milliseconds)
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});


export const purchaseApiKey = async (payload, userToken) => {
  return postJson({
    uri: '/payment/buy-api-key',
    body: payload,
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })
}

export const getPendingTransactions = async (userToken) => {
  return await postJson({
    uri: '/payment/transactions/users/me',
    body: {
      paymentStatus: 'PENDING'
    },
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })
}

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
    const data = error.response?.data;
    if (data) {
      return data;
    }
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
    return response.data;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      return data;
    }
    throw error;
  }
};
