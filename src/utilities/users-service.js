import { registerAPI, loginAPI, checkTokenAPI } from "./users-api";

export async function registerService(userData) {
  const token = await registerAPI(userData);
  localStorage.setItem("token", token);
  // return token;
  return getUser();
}

export async function loginService(credentials) {
  const token = await loginAPI(credentials);
  localStorage.setItem("token", token);
  // return token;
  return getUser();
}

export async function logOutService() {
  localStorage.removeItem("token");
}

export function getToken() {
  // getItem will return null if the key does not exist
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Let's check if token has expired...
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function checkTokenService() {
  return checkTokenAPI().then((dateStr) => new Date(dateStr));
}
