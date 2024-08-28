import axios from "axios";

const logAxiosError = (error: unknown, logPrefix: string) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made, and the server responded with a status code outside the range of 2xx
      console.log(logPrefix, "Error status:", error.response.status);
      console.log(logPrefix, "Error data:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log(logPrefix, "No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(logPrefix, "Error setting up the request:", error.message);
    }
  } else if (error instanceof Error) {
    console.log(logPrefix, "General error:", error.message);
  } else {
    console.log(logPrefix, "Unexpected error:", error);
  }
};

export default logAxiosError;
