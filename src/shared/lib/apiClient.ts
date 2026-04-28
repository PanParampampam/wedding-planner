export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const normalizedUrl = url.startsWith("http")
    ? url
    : url.startsWith("/")
      ? url
      : `/${url}`;

  const response = await fetch(normalizedUrl, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });
  if (!response.ok) {
    const text = await response.text();
    let message: string;
    try {
      const errorJson = JSON.parse(text);
      message =
        errorJson.message || `Request failed with status ${response.status}`;
    } catch {
      message = `Request failed with status ${response.status}`;
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};
