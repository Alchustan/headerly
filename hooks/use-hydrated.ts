import * as React from "react"

// Returns false during SSR and the first client render, keeping theme-dependent
// controls hydration-safe without an effect-driven state update.
export function useHydrated() {
  return React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )
}
