export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const normalizedUrl = url.replace(/^\//, "");
  const response = await fetch(normalizedUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return response.json();
};
