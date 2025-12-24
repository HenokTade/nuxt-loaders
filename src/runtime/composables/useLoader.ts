import { useState } from "#app";

export const useLoader = () => {
  const isLoading = useState("nuxt-loaders-loading", () => false);

  return { isLoading };
};
