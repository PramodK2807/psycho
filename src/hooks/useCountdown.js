import { useEffect, useRef, useState } from "react";

/**
 * Countdown based on a fixed end timestamp, so it stays accurate even if the
 * browser throttles timers (for example when the tab is in the background).
 * Calls onExpire exactly once when the time reaches zero.
 */
export function useCountdown(totalSeconds, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    const endsAt = Date.now() + totalSeconds * 1000;
    let expired = false;
    setSecondsLeft(totalSeconds);

    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0 && !expired) {
        expired = true;
        clearInterval(id);
        onExpireRef.current?.();
      }
    };

    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [totalSeconds]);

  return secondsLeft;
}
