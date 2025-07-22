import axios from "axios";

export const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, delay);
  });
};

agent.interceptors.response.use(
  async (response) => {
    try {
      await sleep(1000); // Simulate a delay for all responses
      return response;
    } catch (error) {
      console.error("Error in response interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    const { data, status } = error.response;
    if (status === 404) {
      throw new Error(data.title);
    }
    if (status === 400 && data.errors) {
      throw data.errors;
    }
    if (status === 500) {
      console.error(data);
      throw new Error("Server error - check the terminal for more details");
    }
    throw error;
  }
);
