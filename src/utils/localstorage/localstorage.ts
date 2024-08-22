import { UserPreferences } from "@/entities/user";

export function setAccessToken(token: string) {
  localStorage.setItem("access_token", token);
}
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function clearAccessToken() {
  return localStorage.removeItem("access_token");
}

export function setUserPreferencesInLocalStorage(
  userPreferences: UserPreferences
) {
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
}
export function getUserPreferencesInLocalStorage(): UserPreferences | null {
  const userPref = localStorage.getItem("userPreferences");

  if (userPref) return JSON.parse(userPref);
  return null;
}
