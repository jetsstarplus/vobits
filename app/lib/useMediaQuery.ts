"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query. Returns `serverFallback` during SSR
 * and on the first hydration pass, then the live value.
 */
export function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}
