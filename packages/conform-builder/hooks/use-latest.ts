import { useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

export function useLatest<T>(value: T) {
  const ref = useRef(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
