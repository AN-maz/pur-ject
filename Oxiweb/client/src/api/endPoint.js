import {
  getJSON,
  sendJSON,
  buildURL,
  getJsonWithTimeout,
  getJsonWithRetry,
} from "./client.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

console.log("API URL yang dipakai:", BASE_URL); 

export function getPosts(params) {
  const url = buildURL(`${BASE_URL}/posts`, params);

  return getJSON(url);
}

export function createPost(payload) {
  return sendJSON(`${BASE_URL}/posts`, {
    method: "POST",

    data: payload,
  });
}

export function getPostsTestTimeout(ms) {
  return getJsonWithTimeout(`${BASE_URL}/posts`, { timeoutMs: ms });
}

export function getPostsTestRetry(url = BASE_URL) {
  return getJsonWithRetry(url, { retries: 3 });
}
