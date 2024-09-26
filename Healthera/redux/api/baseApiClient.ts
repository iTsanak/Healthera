import axios from "axios";

const baseApiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL_REST_API,
  timeout: 10000,
});

export default baseApiClient;
