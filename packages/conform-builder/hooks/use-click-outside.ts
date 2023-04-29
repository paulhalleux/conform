import React, { useEffect } from 'react';
import { useLatest } from './use-latest';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

const events: HandledEvents = [MOUSEDOWN, TOUCHSTART];

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: Handler | null
) {
  if (typeof document === 'undefined') {
    return;
  }

  const handlerRef = useLatest(handler);

  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (
        !ref.current ||
        !handlerRef.current ||
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      handlerRef.current(event);
    };

    events.forEach((event) => document.addEventListener(event, listener));

    return () =>
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
  }, [!handler]);
}
