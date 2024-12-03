import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UpdateCurrentUserPassword, UserProfileForm } from "../types";

export async function updateProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put<string>("/auth/profile", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateCurrentUserPassword(
  formData: UpdateCurrentUserPassword
) {
  try {
    const { data } = await api.post<string>("/auth/update-password", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}