export function setAccessToken(token: string) {
  localStorage.setItem("access_token", token);
}
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function clearAccessToken() {
  return localStorage.removeItem("access_token");
}
