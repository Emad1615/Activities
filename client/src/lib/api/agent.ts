import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { routes } from "../../App/routes/Routes";

export const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, delay);
  });
};

agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});
agent.interceptors.response.use(
  async (response) => {
    await sleep(1000); // Simulate a delay for all responses
    store.uiStore.isIdle();
    return response;
  },
  async (error) => {
    await sleep(1000); // Simulate a delay for all responses

    store.uiStore.isIdle();
    const { data, status, statusText } = error.response;
    switch (status) {
      case 400: // Bad Request
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else toast.error(data.title ?? statusText);
        break;
      case 401: // Unauthorized
        toast.error(data.title ?? statusText);
        break;
      case 404: // Not Found
      routes.navigate('/not-found') 
      // toast.error(data.title ?? statusText);
        break;
      case 405: // Method Not Allowed
        toast.error(data.title ?? statusText);
        break;
      case 500: // server error
        routes.navigate('/server-error',{state:{error:data}})  
      //toast.error(data.title ?? statusText);
        break;
      default:
        toast.error(data.title ?? statusText);
    }
    return Promise.reject(error);
  }
);
