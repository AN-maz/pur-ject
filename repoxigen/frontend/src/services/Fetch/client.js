// 1. Helper Sleep

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// 2. Build URL

export function buildURL(base, query = {}) {
  const url = new URL(base);

  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, String(v));
    }
  }

  return url.toString();
}

export async function getJSON(url, { signal } = {}) {
  try {
    const res = await fetch(url, { signal });

    if (!res.ok) {
      const text = await res.text().catch(() => "");

      throw new Error(`HTTP ${res.status} - ${text}`);
    }

    return await res.json();
  } catch (err) {
    // Tangani request yang dibatalkan

    console.log({ err });

    if (err.name === "AbortError") {
      throw new Error("Request dibatalkan");
    }

    // Network error / error lain

    throw err;
  }
}

// 4. POST JSON

export async function sendJSON(url, { method = "POST", data, signal } = {}) {
  const res = await fetch(url, {
    method,

    headers: {
      "content-type": "application/json",

      accept: "application/json",
    },

    body: JSON.stringify(data),

    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");

    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  if (res.status === 204) return null;

  return res.json();
}

// 5. GET with Timeout

export async function getJsonWithTimeout(url, { timeoutMs = 8000 } = {}) {
  const controller = new AbortController();

  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res.json();
  } finally {
    clearTimeout(t);
  }
}

// 6. GET with Retry

export async function getJsonWithRetry(url, { retries = 2 } = {}) {
  let attempt = 0;

  while (true) {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        const retryable = [502, 503, 504].includes(res.status);

        if (retryable && attempt < retries) {
          attempt++;

          const delay = 200 * 2 ** (attempt - 1);

          await sleep(delay);

          continue;
        }

        const text = await res.text().catch(() => "");

        throw new Error(`HTTP ${res.status} - ${text}`);
      }

      return await res.json();
    } catch (err) {
      if (err.name !== "AbortError" && attempt < retries) {
        attempt++;

        const delay = 200 * 2 ** (attempt - 1);

        console.log(`Retry attempt ${attempt} after ${delay}ms`); // Log biar tau

        await sleep(delay);

        continue;
      }

      throw err;
    }
  }
}
