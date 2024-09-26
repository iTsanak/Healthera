import { CHECK_EMAIL_URL, CheckEmailRequestData, CheckEmailResponseData } from "@/API-types/check-email";
import logAxiosError from "@/lib/axios-better-errors";
import axios from "axios";

export const checkIfEmailIsAvailable = async (email: string) => {
  try {
    console.log("[CHECK_EMAIL_AVAILABILITY]: running...");

    const requestData: CheckEmailRequestData = {
      email: email,
    };

    const response: CheckEmailResponseData = (await axios.post(CHECK_EMAIL_URL, requestData)).data;

    if (response.code !== "AVAILABLE" && response.code !== "IN_USE") {
      console.log("[CHECK_EMAIL_AVAILABILITY]: CHECK EMAIL ERROR, response.code is invalid");
    }

    return response.code === "AVAILABLE";
  } catch (error) {
    logAxiosError(error, "[CHECK_EMAIL_AVAILABILITY]:");
    throw new Error("Could not check email availability... Assuming email is invalid...");
  }
};
