import { getJSON } from "./client";

const BASE_URL = "http://localhost:5000/api";

export function getHallo() {
  return getJSON(`${BASE_URL}/hello`);
}
