// Disclaimer: This example keeps the access token in LocalStorage just because
// it's simpler, but in a real application you may want to use cookies instead
// for better security. Also, it doesn't handle token expiration.

import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.API_URL;
const ACCESS_TOKEN_KEY = import.meta.env.ACCESS_TOKEN_KEY;

/**
 * Get Access Token from LocalStorage
 *
 * @returns {*}
 */
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

/**
 * Get User By Token
 *
 * @param {*} token
 * @returns {{ id: any; email: string; }}
 */
const getUserFromToken = (token) => {
  const claims = jwtDecode(token);
  return {
    id: claims.sub,
    email: claims.email,
  };
};

/**
 * Get User
 *
 * @returns {{ id: any; email: string; }}
 */
export const getUser = () => {
  const token = getAccessToken();

  if (!token) return null;

  return getUserFromToken(token);
};

/**
 * Login User
 *
 * @async
 * @param {*} email
 * @param {*} password
 * @returns {unknown}
 */
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) return null;

  const { token } = await response.json();

  localStorage.setItem(ACCESS_TOKEN_KEY, token);

  return getUserFromToken(token);
};

/**
 * Logout User
 *
 * @returns {*}
 */
export const logout = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
