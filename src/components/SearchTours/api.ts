// api.ts
import axios, { CancelTokenSource } from 'axios';

let token: string = ''; // Store the token here

// Automatically login and store the token
export const autoLogin = async (): Promise<void> => {
  try {
    const response = await axios.post('https://dev.intraversewebservices.com/api/main/v1/account/login?populate=detail', {
      email: 'abebe2@yopmail.com',
      password: 'Password.1',
    });
    token = response.data.token; // Assuming token is in response.data.token
  } catch (error) {
    console.error('Login failed', error);
    throw new Error('Failed to login');
  }
};

// Axios instance for authenticated requests
const apiClient = axios.create({
  baseURL: 'https://dev.intraversewebservices.com/api',
});

// Add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define the data structure for the API response
interface AutocompleteResponse {
  destinations: Destination[];
  products: Product[];
}

interface Destination {
  name: string;
  tags: string[];
}

interface Product {
  name: string;
  tags?: string[];
}

// Function to call the autocomplete API
export const searchTours = async (query: string, cancelToken: CancelTokenSource): Promise<AutocompleteResponse> => {
  const response = await apiClient.get<AutocompleteResponse>(`/product/v1/package/auto-complete?q=${query}`, {
    cancelToken: cancelToken.token, // Use cancel token for request cancellation
  });
  return response.data;
};
