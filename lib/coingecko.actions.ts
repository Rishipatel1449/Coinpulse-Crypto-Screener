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
