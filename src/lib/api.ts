// src/lib/api.ts
export async function apiFetch(url: string, options: any = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("superadmin_token")
      : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  return res;
}
