import qs from "query-string";

export type UpdateProfileImageResponseData = {
  profile_image_url: string;
};

export const UPDATE_PROFILE_IMAGE_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/user/update-profile-image/`,
});

export const UPDATE_PROFILE_IMAGE_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/user/update-profile-image/`,
});
