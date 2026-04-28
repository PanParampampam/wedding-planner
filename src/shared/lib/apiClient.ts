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
    const errorText = await response.json();
    throw new Error(
      errorText.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
};
