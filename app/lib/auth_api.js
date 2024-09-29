import axios from 'axios';
import { doLogout } from '../actions';
import { handleAxiosError } from './common_utils';


// Define the base URL function
const getAuthBaseUrl = () => {
  return process.env.NEXT_PUBLIC_AUTH_SERVICE_URL;
};

const getAuthServiceBaseUrl = () => {
  return process.env.NEXT_PUBLIC_AUTH_SERVICE_SERVER;
}

// Create an axios instance with default settings
const axiosInstance = axios.create({
  baseURL: getAuthBaseUrl(),  // Use the getBaseUrl function for base URL
  timeout: 5000,         // Timeout in milliseconds (10 seconds)
  headers: {
    "ngrok-skip-browser-warning": "69420"
  }
});


// Create an axios instance with default settings
const axiosInstanceServer = axios.create({
  baseURL: getAuthServiceBaseUrl(),  // Use the getBaseUrl function for base URL
  timeout: 5000,         // Timeout in milliseconds (10 seconds)
  headers: {
    "ngrok-skip-browser-warning": "69420"
  }
});



export const requestResetPassword = async (email) => {
  return await get({ uri: `/password-manager/reset/${email}`});
}

export const validateResetPassToken = async ({ token }) => {
 return await get({
  useServer: true,
  uri: `/password-manager/token/${token}/validate`
 })
}

export const sendResetPassword = async (payload) => {
  return await postJson({
    uri: '/password-manager/reset',
    body: payload
  })
}

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
    return handleAxiosError(error, doLogout);
  }
};

// Function to get data
export const get = async ({ useServer, uri, headers }) => {
  try {
    let client = axiosInstance;
    if (useServer) {
      client = axiosInstanceServer
    }
    const response = await client.get(uri, {
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