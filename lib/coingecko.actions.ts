"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) {
  throw new Error("No base URL provided.");
}
if (!API_KEY) {
  throw new Error("No API key provided.");
}

const BASE_URL_SAFE: string = BASE_URL;
const API_KEY_SAFE: string = API_KEY;

/**
 * Fetches JSON from a CoinGecko API endpoint and returns the parsed response.
 *
 * @param endpoint - Path relative to the configured CoinGecko base URL (leading slash allowed)
 * @param params - Optional query parameters to append; empty strings and null values are omitted
 * @param revalidate - Cache revalidation time in seconds for Next.js fetch caching
 * @returns The parsed JSON response from the API as `T`
 * @throws Error when the HTTP response is not OK; the error message includes the parsed error body (if available) and the response status
 */
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  // Build a proper URL with query params; avoid double slashes and ensure fetch receives a full URL
  const normalizedBase = BASE_URL_SAFE.replace(/\/$/, "");
  const normalizedEndpoint = endpoint.replace(/^\//, "");
  const url = qs.stringifyUrl(
    {
      url: `${normalizedBase}/${normalizedEndpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": API_KEY_SAFE,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => {});

    throw new Error(
      `CoinGeckoError: ${errorBody} and Response status: ${response.status}`
    );
  }

  return response.json();
}